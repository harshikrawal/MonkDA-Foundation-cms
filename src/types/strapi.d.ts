/* ─────────────────────────────────────────────────────────────────────────
   Strapi v5 REST API — shared TypeScript types
   ───────────────────────────────────────────────────────────────────────── */

/** Generic wrapper around every Strapi list response */
export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/** Generic wrapper around every Strapi single-item response */
export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

/** Strapi media / image */
export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

/** Blog category */
export interface Category {
  id: number;
  name: string;
  slug: string;
}

/**
 * Rich-text block content as returned by Strapi v5 Blocks field.
 * Cast to `any[]` for rendering — use @strapi/blocks-react-renderer.
 */
export type BlocksContent = object[];

/** Blog post (list shape — no full content) */
export interface PostListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  cover: StrapiMedia | null;
  category: Category | null;
}

/** Blog post (detail shape — includes full block content) */
export interface PostDetail extends PostListItem {
  content: BlocksContent;
}
