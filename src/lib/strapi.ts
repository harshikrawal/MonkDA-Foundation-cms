/* ─────────────────────────────────────────────────────────────────────────
   src/lib/strapi.ts
   Typed fetch helper for Strapi v5 REST API
   ───────────────────────────────────────────────────────────────────────── */

import type {
  StrapiListResponse,
  Category,
  PostListItem,
  PostDetail,
} from "@/types/strapi";

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const TOKEN = process.env.STRAPI_API_TOKEN ?? "";

/* ── Core fetch helper ───────────────────────────────────────────────────── */

async function strapiRequest<T>(
  path: string,
  params: Record<string, string> = {}
): Promise<T> {
  const qs = new URLSearchParams(params).toString();
  const url = `${BASE_URL}/api${path}${qs ? `?${qs}` : ""}`;
  
  if (process.env.NODE_ENV === "development") {
    console.log(`[Strapi API] Fetching: ${url}`);
  }

  // No token needed for public READ operations which we enabled in bootstrap
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Only add Authorization if TOKEN is provided and looks valid
  if (TOKEN && TOKEN !== "your-strapi-token-here") {
    headers["Authorization"] = `Bearer ${TOKEN}`;
  }

  let res: Response;
  try {
    res = await fetch(url, { headers, next: { revalidate: 60 } });
    
    // If 401 occurred and we used a token, try one more time WITHOUT the token
    // (In case the token in .env is old/invalid but the content is actually public)
    if (res.status === 401 && headers["Authorization"]) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[Strapi API] 401 Unauthorized with token. Retrying WITHOUT token...`);
      }
      const { Authorization, ...publicHeaders } = headers;
      res = await fetch(url, { headers: publicHeaders, next: { revalidate: 60 } });
    }
  } catch (err) {
    throw new Error(`Strapi unreachable at ${url}: ${err}`);
  }

  // Guard: if we got HTML back (proxy/nginx error page), bail before JSON.parse
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      `Strapi returned non-JSON (${res.status}) — is Strapi running at ${BASE_URL}?`
    );
  }

  if (!res.ok) {
    const body = await res.text();
    console.error(`[Strapi API] ERROR ${res.status} for ${url}:`, body);
    throw new Error(`Strapi error ${res.status} at ${url}: ${body}`);
  }

  const json = await res.json();
  if (process.env.NODE_ENV === "development") {
    console.log(`[Strapi API] SUCCESS ${url} - Items:`, (json as any)?.data?.length ?? "single");
  }
  return json as T;
}

/* ── Categories ──────────────────────────────────────────────────────────── */

/** Fetch all blog categories. Returns [] when Strapi is offline. */
export async function getCategories(): Promise<Category[]> {
  try {
    const data = await strapiRequest<StrapiListResponse<Category>>(
      "/categories",
      { "sort[0]": "name:asc", "pagination[pageSize]": "100" }
    );
    return data.data;
  } catch (err) {
    console.error(`[getCategories] Failed:`, err);
    return [];
  }
}

/* ── Posts (list) ────────────────────────────────────────────────────────── */

/**
 * Fetch published posts, optionally filtered by category slug.
 * Returns [] when Strapi is offline.
 */
export async function getPosts(categorySlug?: string): Promise<PostListItem[]> {
  const params: Record<string, string> = {
    "populate": "cover,category",
    "fields[0]": "title",
    "fields[1]": "slug",
    "fields[2]": "excerpt",
    "fields[3]": "publishedAt",
    "sort[0]": "publishedAt:desc",
    "pagination[pageSize]": "50",
    "status": "published",
  };

  if (categorySlug) {
    params["filters[category][slug][$eq]"] = categorySlug;
  }

  try {
    const data = await strapiRequest<StrapiListResponse<PostListItem>>(
      "/posts",
      params
    );
    return data.data;
  } catch (err) {
    console.error(`[getPosts] Failed:`, err);
    return [];
  }
}

/* ── Post (single / detail) ──────────────────────────────────────────────── */

/** Fetch a single post by slug. Returns null when Strapi is offline. */
export async function getPost(slug: string): Promise<PostDetail | null> {
  const params: Record<string, string> = {
    "populate": "*",
    "filters[slug][$eq]": slug,
    "status": "published",
  };

  try {
    const data = await strapiRequest<StrapiListResponse<PostDetail>>(
      "/posts",
      params
    );
    if (!data.data || data.data.length === 0) {
      console.warn(`[getPost] No post found for slug: ${slug}`);
      return null;
    }
    return data.data[0];
  } catch (err) {
    console.error(`[getPost] Error fetching slug ${slug}:`, err);
    return null;
  }
}

/* ── Static params helper ────────────────────────────────────────────────── */

/** Returns all post slugs for generateStaticParams. Returns [] when offline. */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const data = await strapiRequest<StrapiListResponse<{ slug: string }>>(
      "/posts",
      {
        "fields[0]": "slug",
        "pagination[pageSize]": "200",
        "status": "published",
      }
    );
    return data.data.map((p) => p.slug);
  } catch {
    return [];
  }
}
