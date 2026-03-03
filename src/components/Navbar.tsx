"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  /** "dark" = white logo lines (for dark hero bg), "light" = dark lines */
  variant?: "dark" | "light";
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "Properties", href: "#properties" },
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Insights", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({
  links = DEFAULT_LINKS,
  ctaLabel = "Book Valuation",
  ctaHref = "#contact",
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Lock body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ── Navbar bar ── */}
      <motion.header
        className="nav-root"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <a
          href="/"
          aria-label="Home"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            width={72}
            height={58}
            priority
            style={{ objectFit: "contain" }}
          />
        </a>

        {/* Right: CTA + hamburger */}
        <div className="nav-right">
          <a href={ctaHref} className="hire-btn" aria-label={ctaLabel}>
            <span>{ctaLabel}</span>
            <span className="hire-arrow" aria-hidden="true">
              →
            </span>
          </a>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="hamburger-btn"
          >
            <span className="ham-line" />
            <span className="ham-line ham-line--short" />
          </button>
        </div>
      </motion.header>

      {/* ── Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar Panel ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="sidebar"
            ref={menuRef}
            className="sidebar-panel"
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 40 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Close */}
            <button
              onClick={() => setMenuOpen(false)}
              className="sidebar-close"
              aria-label="Close menu"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <line x1="2" y1="2" x2="14" y2="14" />
                <line x1="14" y1="2" x2="2" y2="14" />
              </svg>
            </button>

            {/* Links */}
            <nav className="sidebar-nav">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="sidebar-link"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.06 + i * 0.055,
                    duration: 0.38,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* CTA */}
            <motion.a
              href={ctaHref}
              className="sidebar-cta"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.44,
                duration: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span>{ctaLabel}</span>
              <span aria-hidden="true">→</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
