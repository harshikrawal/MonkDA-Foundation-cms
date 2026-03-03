"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PostListItem } from "@/types/strapi";

const BASE = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

interface StrapiBlogSectionProps {
  /** Category slug to fetch, e.g. "real-estate", "automobile", "gym", "clinic", "lawyer" */
  categorySlug: string;
  /** Accent colour — defaults to gold */
  accent?: string;
  /** Section heading line 1 */
  heading?: string;
  /** Section heading line 2 (accented) */
  headingAccent?: string;
  /** CSS class prefix for the page — e.g. "re", "ap", "gym", "cl", "lw" */
  cssPrefix?: string;
}

/**
 * A self-contained client component that fetches blog posts from Strapi
 * filtered by category slug and renders them in a styled grid.
 */
export default function StrapiBlogSection({
  categorySlug,
  accent = "#d4af6e",
  heading = "Latest",
  headingAccent = "Insights.",
  cssPrefix = "re",
}: StrapiBlogSectionProps) {
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const params = new URLSearchParams({
          "populate[cover][fields][0]": "url",
          "populate[cover][fields][1]": "alternativeText",
          "populate[category][fields][0]": "name",
          "populate[category][fields][1]": "slug",
          "fields[0]": "title",
          "fields[1]": "slug",
          "fields[2]": "excerpt",
          "fields[3]": "publishedAt",
          "sort[0]": "publishedAt:desc",
          "pagination[pageSize]": "6",
          "filters[category][slug][$eq]": categorySlug,
        });

        const url = `${BASE}/api/posts?${params.toString()}`;
        console.log("[StrapiBlog] Fetching:", url);
        const res = await fetch(url);
        console.log("[StrapiBlog] Status:", res.status);
        if (!res.ok) throw new Error(`Strapi error ${res.status}`);
        const contentType = res.headers.get("content-type") ?? "";
        if (!contentType.includes("application/json"))
          throw new Error("Non-JSON response");
        const json = await res.json();
        console.log("[StrapiBlog] Got posts:", json.data?.length ?? 0);
        setPosts(json.data ?? []);
      } catch (err) {
        console.error("[StrapiBlog] Fetch error:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [categorySlug]);

  return (
    <>
      <style>{`
        .strapi-blog-section {
          padding: clamp(6rem, 12vw, 10rem) 0;
          position: relative;
          background: #050508;
        }
        .strapi-blog-container {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 72px);
        }
        .strapi-blog-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 5rem;
          flex-wrap: wrap;
          gap: 2rem;
        }
        .strapi-blog-heading {
          font-family: "Syne", sans-serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 800;
          letter-spacing: -0.05em;
          line-height: 0.9;
          color: #fff;
          margin: 0;
        }
        .strapi-blog-heading-accent {
          display: block;
          font-style: italic;
          opacity: 0.9;
        }
        .strapi-blog-all {
          font-family: "Syne", sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 1rem 2.2rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          white-space: nowrap;
        }
        .strapi-blog-all:hover {
          background: #fff;
          color: #000;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .strapi-blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 2.5rem;
        }
        .strapi-blog-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1.5rem;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
        }
        .strapi-blog-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
        }
        .strapi-blog-card:hover {
          transform: translateY(-12px) scale(1.02);
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.04);
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
        }
        .strapi-blog-card:hover::before {
          opacity: 1;
        }
        .strapi-blog-card-img {
          width: 100%;
          aspect-ratio: 16/10;
          position: relative;
          overflow: hidden;
        }
        .strapi-blog-card-img img {
          transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .strapi-blog-card:hover .strapi-blog-card-img img {
          transform: scale(1.1);
        }
        .strapi-blog-card-gradient {
          width: 100%;
          height: 100%;
        }
        .strapi-blog-card-cat {
          position: absolute;
          top: 20px;
          left: 20px;
          font-family: "Syne", sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 4px;
          background: #fff;
          color: #000;
          z-index: 2;
        }
        .strapi-blog-card-body {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 1;
        }
        .strapi-blog-card-title {
          font-family: "Syne", sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 0;
          transition: color 0.3s;
        }
        .strapi-blog-card-excerpt {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.6);
          margin: 0;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .strapi-blog-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .strapi-blog-card-date {
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
        }
        .strapi-blog-card-link {
          font-family: "Syne", sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .strapi-blog-card-link span {
          transition: transform 0.3s;
        }
        .strapi-blog-card:hover .strapi-blog-card-link span {
          transform: translateX(4px);
        }

        /* Skeleton loader */
        .strapi-blog-skeleton {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 1.5rem;
          aspect-ratio: 4/5;
          animation: strapi-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes strapi-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.2; }
        }

        @media (max-width: 900px) {
          .strapi-blog-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
        }
        @media (max-width: 600px) {
          .strapi-blog-grid {
            grid-template-columns: 1fr;
          }
          .strapi-blog-heading {
            font-size: 3rem;
          }
        }
      `}</style>

      <section className="strapi-blog-section" id="blog">
        <div className="strapi-blog-container">
          <div className="strapi-blog-header">
            <h2 className="strapi-blog-heading">
              {heading}
              <span
                className="strapi-blog-heading-accent"
                style={{ color: accent }}
              >
                {headingAccent}
              </span>
            </h2>
            <Link
              href={`/blog?category=${categorySlug}`}
              className="strapi-blog-all"
            >
              View all articles →
            </Link>
          </div>

          {loading ? (
            <div className="strapi-blog-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="strapi-blog-skeleton" />
              ))}
            </div>
          ) : (
            <div className="strapi-blog-grid">
              {posts.map((post, i) => {
                const coverUrl = post.cover?.url
                  ? post.cover.url.startsWith("http")
                    ? post.cover.url
                    : `${BASE}${post.cover.url}`
                  : null;

                return (
                  <Link
                    key={post.id ?? i}
                    href={`/blog/${post.slug}`}
                    className="strapi-blog-card"
                  >
                    <div className="strapi-blog-card-img">
                      {coverUrl ? (
                        <img
                          src={coverUrl}
                          alt={post.cover?.alternativeText ?? post.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          className="strapi-blog-card-gradient"
                          style={{
                            background: `linear-gradient(135deg, hsl(${(i * 40 + 220) % 360},35%,10%), hsl(${(i * 40 + 250) % 360},40%,18%))`,
                          }}
                        />
                      )}
                      {post.category && (
                        <span className="strapi-blog-card-cat">
                          {post.category.name}
                        </span>
                      )}
                    </div>
                    <div className="strapi-blog-card-body">
                      <h3 className="strapi-blog-card-title">{post.title}</h3>
                      {post.excerpt && (
                        <p className="strapi-blog-card-excerpt">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="strapi-blog-card-footer">
                        <span className="strapi-blog-card-date">
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </span>
                        <span
                          className="strapi-blog-card-link"
                          style={{ color: accent }}
                        >
                          Read Article <span>→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
