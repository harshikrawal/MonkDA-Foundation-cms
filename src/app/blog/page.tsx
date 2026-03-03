import { Suspense } from "react";
import { getCategories, getPosts } from "@/lib/strapi";
import BlogCard from "@/components/BlogCard";
import CategoryFilter from "@/components/CategoryFilter";
import Navbar from "@/components/Navbar";
import MonkDAFooter from "@/components/MonkDAFooter";
import CustomCursor from "@/components/CustomCursor";
import type { Metadata } from "next";

export const revalidate = 60; // ISR — refresh every 60 seconds

export const metadata: Metadata = {
  title: "Blog | MonkDA",
  description:
    "Insights, guides, and real estate expertise from the MonkDA team.",
};

/* ── Inline styles ───────────────────────────────────────────────────────── */
const css = `
  .blog-page {
    min-height: 100vh;
    background: #0f0f13;
    font-family: "DM Sans", sans-serif;
    color: #fff;
  }

  /* Hero */
  .blog-hero {
    max-width: 1360px;
    margin: 0 auto;
    padding: clamp(80px, 14vw, 140px) clamp(20px, 5vw, 72px) 0;
  }
  .blog-hero-eyebrow {
    font-family: "Syne", sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #d4af6e;
    margin: 0 0 18px;
  }
  .blog-hero-title {
    font-family: "Syne", sans-serif;
    font-size: clamp(38px, 6vw, 72px);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.05;
    margin: 0 0 22px;
  }
  .blog-hero-sub {
    font-size: 16px;
    line-height: 1.7;
    color: rgba(255,255,255,0.38);
    max-width: 48ch;
    margin: 0;
  }

  /* Filter bar */
  .blog-filter-bar {
    max-width: 1360px;
    margin: 56px auto 0;
    padding: 0 clamp(20px, 5vw, 72px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding-bottom: 32px;
  }

  /* Grid */
  .blog-grid-wrapper {
    max-width: 1360px;
    margin: 0 auto;
    padding: 56px clamp(20px, 5vw, 72px) 100px;
  }
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 28px;
  }

  /* Empty state */
  .blog-empty {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 80px 0;
    color: rgba(255,255,255,0.22);
    text-align: center;
  }
  .blog-empty-icon {
    font-size: 40px;
    opacity: 0.4;
  }
  .blog-empty-title {
    font-family: "Syne", sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: rgba(255,255,255,0.35);
    margin: 0;
  }
  .blog-empty-sub {
    font-size: 14px;
    color: rgba(255,255,255,0.2);
    margin: 0;
  }

  /* Loading skeleton */
  .blog-skeleton {
    border-radius: 16px;
    background: rgba(255,255,255,0.04);
    aspect-ratio: 3/4;
    animation: blog-pulse 1.5s ease-in-out infinite;
  }
  @keyframes blog-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

/* ── Page Component ──────────────────────────────────────────────────────── */

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;

  const [categories, posts] = await Promise.all([
    getCategories(),
    getPosts(category),
  ]);

  return (
    <>
      <style>{css}</style>
      <CustomCursor />
      <Navbar />
      <div className="blog-page">
        {/* Hero */}
        <header className="blog-hero">
          <p className="blog-hero-eyebrow">MonkDA Insights</p>
          <h1 className="blog-hero-title">
            Stories, Guides &amp;
            <br />
            Expert Perspective
          </h1>
          <p className="blog-hero-sub">
            Curated content from the MonkDA team — market analysis, product
            walkthroughs, and industry deep-dives.
          </p>
        </header>

        {/* Category filter */}
        <div className="blog-filter-bar">
          <Suspense>
            <CategoryFilter categories={categories} accent="#d4af6e" />
          </Suspense>
        </div>

        {/* Post grid */}
        <main className="blog-grid-wrapper">
          <div className="blog-grid">
            {posts.length === 0 ? (
              <div className="blog-empty">
                <span className="blog-empty-icon">✦</span>
                <h2 className="blog-empty-title">No posts found</h2>
                <p className="blog-empty-sub">
                  {category
                    ? `There are no posts in this category yet.`
                    : `Check back soon — content is on its way.`}
                </p>
              </div>
            ) : (
              posts.map((post) => (
                <BlogCard key={post.id} post={post} accent="#d4af6e" />
              ))
            )}
          </div>
        </main>
      </div>
      <MonkDAFooter />
    </>
  );
}
