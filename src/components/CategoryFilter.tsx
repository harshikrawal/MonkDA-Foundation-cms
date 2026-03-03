"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Category } from "@/types/strapi";

/* ── Inline styles ───────────────────────────────────────────────────────── */
const css = `
  .cat-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }

  .cat-filter-btn {
    display: inline-flex;
    align-items: center;
    font-family: "Syne", sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 8px 18px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    background: transparent;
    color: rgba(255,255,255,0.38);
    cursor: pointer;
    transition: color 0.22s, border-color 0.22s, background 0.22s;
  }
  .cat-filter-btn:hover {
    color: rgba(255,255,255,0.75);
    border-color: rgba(255,255,255,0.25);
    background: rgba(255,255,255,0.04);
  }
  .cat-filter-btn.active {
    color: #0f0f13;
    border-color: transparent;
  }
`;

/* ── Component ───────────────────────────────────────────────────────────── */

interface CategoryFilterProps {
  categories: Category[];
  accent?: string;
}

export default function CategoryFilter({
  categories,
  accent = "#d4af6e",
}: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "";

  function navigate(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <style>{css}</style>
      <div className="cat-filter" role="group" aria-label="Filter by category">
        {/* "All" pill */}
        <button
          className={`cat-filter-btn${active === "" ? " active" : ""}`}
          style={active === "" ? { background: accent } : {}}
          onClick={() => navigate("")}
          aria-pressed={active === ""}
        >
          All
        </button>

        {categories.map((cat) => {
          const isActive = active === cat.slug;
          return (
            <button
              key={cat.id}
              className={`cat-filter-btn${isActive ? " active" : ""}`}
              style={isActive ? { background: accent } : {}}
              onClick={() => navigate(cat.slug)}
              aria-pressed={isActive}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </>
  );
}
