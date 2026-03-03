import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getAllPostSlugs } from "@/lib/strapi";
import Navbar from "@/components/Navbar";
import MonkDAFooter from "@/components/MonkDAFooter";
import CustomCursor from "@/components/CustomCursor";
import type { Metadata } from "next";

export const revalidate = 60;

/* ── Inline styles ───────────────────────────────────────────────────────── */
const css = `
  .post-page {
    min-height: 100vh;
    background: #0f0f13;
    font-family: "DM Sans", sans-serif;
    color: #fff;
  }

  /* Back link */
  .post-back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: "Syne", sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.32);
    text-decoration: none;
    transition: color 0.2s;
    max-width: 1360px;
    margin: 0 auto;
    display: block;
    padding: 40px clamp(20px, 5vw, 72px) 0;
    width: fit-content;
  }
  .post-back:hover { color: rgba(255,255,255,0.7); }

  /* Hero */
  .post-hero {
    max-width: 1360px;
    margin: 0 auto;
    padding: 48px clamp(20px, 5vw, 72px) 0;
  }
  .post-category-badge {
    display: inline-flex;
    align-items: center;
    font-family: "Syne", sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 999px;
    border: 1px solid #d4af6e40;
    color: #d4af6e;
    margin-bottom: 20px;
  }
  .post-title {
    font-family: "Syne", sans-serif;
    font-size: clamp(32px, 5vw, 64px);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.08;
    max-width: 20ch;
    margin: 0 0 20px;
  }
  .post-meta {
    font-size: 13px;
    color: rgba(255,255,255,0.28);
  }

  /* Cover */
  .post-cover {
    position: relative;
    max-width: 1360px;
    margin: 48px auto 0;
    padding: 0 clamp(20px, 5vw, 72px);
  }
  .post-cover-img {
    position: relative;
    width: 100%;
    aspect-ratio: 21/9;
    border-radius: 16px;
    overflow: hidden;
    background: rgba(255,255,255,0.04);
  }
  .post-cover-img img {
    object-fit: cover;
  }

  /* Content */
  .post-content-wrap {
    max-width: 780px;
    margin: 64px auto 0;
    padding: 0 clamp(20px, 5vw, 40px) 120px;
  }

  /* Strapi block content typography */
  .post-body h1,
  .post-body h2,
  .post-body h3,
  .post-body h4 {
    font-family: "Syne", sans-serif;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.25;
    color: rgba(255,255,255,0.9);
    margin: 2em 0 0.6em;
  }
  .post-body h1 { font-size: 2.8rem; margin: 1.5em 0 0.8em; }
  .post-body h2 { font-size: 2.1rem; margin: 1.8em 0 0.8em; }
  .post-body h3 { font-size: 1.6rem; margin: 1.8em 0 0.8em; }
  .post-body p {
    font-size: 18px;
    line-height: 1.8;
    color: rgba(255,255,255,0.85);
    margin: 0 0 1.6em;
    font-weight: 400;
  }
  .post-body a {
    color: #d4af6e;
    font-weight: 600;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
    transition: all 0.2s;
  }
  .post-body a:hover { color: #fff; }
  .post-body blockquote {
    border-left: 4px solid #d4af6e;
    padding: 12px 0 12px 32px;
    margin: 3em 0;
    background: rgba(212,175,110,0.03);
    color: rgba(255,255,255,0.9);
    font-style: italic;
    font-size: 1.2rem;
    line-height: 1.6;
  }
  .post-body ul, .post-body ol {
    padding-left: 24px;
    color: rgba(255,255,255,0.85);
    line-height: 1.8;
    margin-bottom: 2em;
    font-size: 18px;
  }
  .post-body li { margin-bottom: 12px; }
  .post-body pre {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 20px;
    overflow-x: auto;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 1.5em;
  }
  .post-body code {
    background: rgba(255,255,255,0.08);
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 0.88em;
  }
  .post-body img {
    max-width: 100%;
    border-radius: 12px;
    margin: 1.5em 0;
  }
  .post-body hr {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.08);
    margin: 2.5em 0;
  }
`;

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function getStrapiImageUrl(url: string): string {
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"}${url}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Renders Strapi v5 Blocks content as plain HTML-matching JSX.
 * For production, replace with @strapi/blocks-react-renderer.
 */
function renderBlocks(blocks: object[]): React.ReactNode {
  return blocks.map((block, i) => {
    const b = block as Record<string, unknown>;
    const type = b.type as string;
    const children = b.children as Array<Record<string, unknown>>;

    const textContent =
      children
        ?.map((child) => {
          let text = child.text as string;
          if (child.bold) text = `<strong>${text}</strong>`;
          if (child.italic) text = `<em>${text}</em>`;
          if (child.underline) text = `<u>${text}</u>`;
          if (child.code) text = `<code>${text}</code>`;
          return text;
        })
        .join("") ?? "";

    switch (type) {
      case "paragraph":
        return <p key={i} dangerouslySetInnerHTML={{ __html: textContent }} />;
      case "heading": {
        const level = (b.level as number) ?? 2;
        const headingTags: Record<
          number,
          "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
        > = {
          1: "h1",
          2: "h2",
          3: "h3",
          4: "h4",
          5: "h5",
          6: "h6",
        };
        const Tag = headingTags[Math.min(Math.max(level, 1), 6)] ?? "h2";
        return (
          <Tag key={i} dangerouslySetInnerHTML={{ __html: textContent }} />
        );
      }
      case "list": {
        const ordered = (b.format as string) === "ordered";
        const Tag = ordered ? "ol" : "ul";
        const items = (b.children as Array<Record<string, unknown>>).map(
          (item, j) => {
            const itemText = (item.children as Array<Record<string, unknown>>)
              ?.map((c) => c.text as string)
              .join("");
            return (
              <li key={j} dangerouslySetInnerHTML={{ __html: itemText }} />
            );
          },
        );
        return <Tag key={i}>{items}</Tag>;
      }
      case "quote":
        return (
          <blockquote
            key={i}
            dangerouslySetInnerHTML={{ __html: textContent }}
          />
        );
      case "code":
        return (
          <pre key={i}>
            <code dangerouslySetInnerHTML={{ __html: textContent }} />
          </pre>
        );
      case "image": {
        const imgUrl = getStrapiImageUrl(
          ((b.image as Record<string, unknown>)?.url as string) ?? "",
        );
        const alt =
          ((b.image as Record<string, unknown>)?.alternativeText as string) ??
          "";
        return imgUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={imgUrl} alt={alt} />
        ) : null;
      }
      default:
        return null;
    }
  });
}

/* ── generateStaticParams ────────────────────────────────────────────────── */

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

/* ── generateMetadata ────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    if (!post) return { title: "Post Not Found | MonkDA" };
    return {
      title: `${post.title} | MonkDA Blog`,
      description: post.excerpt,
      openGraph: post.cover
        ? { images: [getStrapiImageUrl(post.cover.url)] }
        : undefined,
    };
  } catch {
    return { title: "MonkDA Blog" };
  }
}

/* ── Page Component ──────────────────────────────────────────────────────── */

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const coverUrl = post.cover ? getStrapiImageUrl(post.cover.url) : null;

  return (
    <>
      <style>{css}</style>
      <CustomCursor />
      <Navbar />
      <div className="post-page">
        {/* Back */}
        <Link href="/blog" className="post-back">
          ← Back to Blog
        </Link>

        {/* Hero */}
        <header className="post-hero">
          {post.category && (
            <span className="post-category-badge">{post.category.name}</span>
          )}
          <h1 className="post-title">{post.title}</h1>
          <p className="post-meta">{formatDate(post.publishedAt)}</p>
        </header>

        {/* Cover */}
        {coverUrl && (
          <div className="post-cover">
            <div className="post-cover-img">
              <Image
                src={coverUrl}
                alt={post.cover?.alternativeText ?? post.title}
                fill
                priority
                sizes="(max-width: 1360px) 100vw, 1360px"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <article className="post-content-wrap">
          <div className="post-body">
            {post.content && Array.isArray(post.content)
              ? renderBlocks(post.content)
              : null}
          </div>
        </article>
      </div>
      <MonkDAFooter />
    </>
  );
}
