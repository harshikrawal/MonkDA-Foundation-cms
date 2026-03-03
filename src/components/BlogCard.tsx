"use client";

import Image from "next/image";
import Link from "next/link";
import type { PostListItem } from "@/types/strapi";

/* ── Inline styles ───────────────────────────────────────────────────────── */
const css = `
  .blog-card {
    display: flex;
    flex-direction: column;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.3s cubic-bezier(0.22,1,0.36,1),
                border-color 0.3s,
                box-shadow 0.3s;
    text-decoration: none;
    color: inherit;
  }
  .blog-card:hover {
    transform: translateY(-4px);
    border-color: rgba(255,255,255,0.14);
    box-shadow: 0 16px 48px rgba(0,0,0,0.3);
  }

  /* Cover image */
  .blog-card-cover {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    background: rgba(255,255,255,0.04);
    overflow: hidden;
  }
  .blog-card-cover img {
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
  }
  .blog-card:hover .blog-card-cover img {
    transform: scale(1.04);
  }

  /* Body */
  .blog-card-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 22px 24px 26px;
    flex: 1;
  }

  /* Category badge */
  .blog-card-category {
    display: inline-flex;
    align-items: center;
    font-family: "Syne", sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 999px;
    border: 1px solid;
    width: fit-content;
    transition: opacity 0.2s;
  }

  /* Title */
  .blog-card-title {
    font-family: "Syne", sans-serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.35;
    color: rgba(255,255,255,0.88);
    margin: 0;
  }

  /* Excerpt */
  .blog-card-excerpt {
    font-size: 14px;
    line-height: 1.7;
    color: rgba(255,255,255,0.38);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Footer row */
  .blog-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .blog-card-date {
    font-size: 12px;
    color: rgba(255,255,255,0.22);
  }
  .blog-card-cta {
    font-family: "Syne", sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: rgba(255,255,255,0.4);
    transition: color 0.2s;
  }
  .blog-card:hover .blog-card-cta {
    color: rgba(255,255,255,0.85);
  }
`;

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getStrapiImageUrl(url: string): string {
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"}${url}`;
}

/* ── Component ───────────────────────────────────────────────────────────── */

interface BlogCardProps {
  post: PostListItem;
  accent?: string;
}

export default function BlogCard({ post, accent = "#d4af6e" }: BlogCardProps) {
  const coverUrl = post.cover ? getStrapiImageUrl(post.cover.url) : null;

  return (
    <>
      <style>{css}</style>
      <Link href={`/blog/${post.slug}`} className="blog-card">
        {/* Cover */}
        <div className="blog-card-cover">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={post.cover?.alternativeText ?? post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            /* Placeholder gradient */
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(135deg, ${accent}22 0%, transparent 100%)`,
              }}
            />
          )}
        </div>

        {/* Body */}
        <div className="blog-card-body">
          {post.category && (
            <span
              className="blog-card-category"
              style={{ color: accent, borderColor: `${accent}40` }}
            >
              {post.category.name}
            </span>
          )}

          <h3 className="blog-card-title">{post.title}</h3>

          {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}

          <div className="blog-card-footer">
            <span className="blog-card-date">
              {formatDate(post.publishedAt)}
            </span>
            <span className="blog-card-cta">Read more →</span>
          </div>
        </div>
      </Link>
    </>
  );
}
