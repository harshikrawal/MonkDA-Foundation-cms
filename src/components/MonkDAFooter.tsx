"use client";

import Image from "next/image";

/* ── Types ──────────────────────────────────────────────── */
export interface FooterCol {
  title: string;
  links: { label: string; href: string }[];
}

interface MonkDAFooterProps {
  accent?: string;
  bg?: string;
  tagline?: string;
  entity?: string;
  cols?: FooterCol[];
  tickers?: string[];
}

const DEFAULT_COLS: FooterCol[] = [
  {
    title: "Navigate",
    links: [
      { label: "Properties", href: "#properties" },
      { label: "Services", href: "#services" },
      { label: "Results", href: "#results" },
      { label: "Insights", href: "#blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About MonkDA", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "https://www.monkda.com/contact" },
    ],
  },
  {
    title: "Follow",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/monkda_official/",
      },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/monkda/" },
      { label: "Twitter / X", href: "https://x.com/Official_Monkda" },
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61551809824545",
      },
    ],
  },
];

const DEFAULT_TICKERS = [
  "MonkDA",
  "Premium Experiences",
  "Engineered to Thrill",
  "Beyond the Expected",
  "MonkDA",
  "Redefining Excellence",
  "Crafted with Intent",
  "MonkDA",
];

/* ── Inline styles (no globals.css dependency) ──────────── */
const css = `
  .mkd-footer {
    font-family: "DM Sans", sans-serif;
    color: #fff;
    overflow: hidden;
  }

  /* ── Ticker strip ─────────────────────────────── */
  .mkd-ticker-strip {
    overflow: hidden;
    border-top: 1px solid rgba(255,255,255,0.08);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding: 14px 0;
  }
  .mkd-ticker-track {
    display: flex;
    width: max-content;
    animation: mkd-marquee 30s linear infinite;
    will-change: transform;
  }
  .mkd-ticker-strip:hover .mkd-ticker-track {
    animation-play-state: paused;
  }
  @keyframes mkd-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .mkd-ticker-item {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
    font-family: "Syne", sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
    padding: 0 28px;
    transition: color 0.2s;
  }
  .mkd-ticker-strip:hover .mkd-ticker-item {
    color: rgba(255,255,255,0.55);
  }
  .mkd-ticker-sep {
    font-size: 18px;
    line-height: 1;
    opacity: 0.6;
  }

  /* ── Body ─────────────────────────────────────── */
  .mkd-footer-body {
    max-width: 1360px;
    margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 72px);
  }

  /* ── Top grid ─────────────────────────────────── */
  .mkd-footer-top {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: clamp(48px, 8vw, 120px);
    align-items: start;
    padding: 72px 0 56px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  @media (max-width: 860px) {
    .mkd-footer-top {
      grid-template-columns: 1fr;
      gap: 48px;
      padding: 56px 0 40px;
    }
  }

  /* ── Brand ────────────────────────────────────── */
  .mkd-footer-logo-link {
    display: inline-block;
    margin-bottom: 18px;
    opacity: 0.9;
    transition: opacity 0.2s;
  }
  .mkd-footer-logo-link:hover { opacity: 1; }

  .mkd-footer-brand-name {
    font-family: "Syne", sans-serif;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1;
    margin: 0 0 10px;
  }
  .mkd-footer-tagline {
    font-size: 14.5px;
    line-height: 1.65;
    color: rgba(255,255,255,0.36);
    max-width: 24ch;
    margin: 0 0 28px;
  }

  /* Social pills */
  .mkd-footer-socials {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .mkd-footer-social-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: "Syne", sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.42);
    padding: 7px 14px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 999px;
    transition: color 0.22s, border-color 0.22s, background 0.22s;
  }
  .mkd-footer-social-pill:hover {
    color: #fff;
    background: rgba(255,255,255,0.06);
    border-color: rgba(255,255,255,0.25);
  }

  /* ── Nav columns ──────────────────────────────── */
  .mkd-footer-nav {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px 40px;
    align-items: start;
  }
  @media (max-width: 560px) {
    .mkd-footer-nav { grid-template-columns: 1fr 1fr; }
  }

  .mkd-footer-col {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .mkd-footer-col-title {
    font-family: "Syne", sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.18);
    margin: 0 0 6px;
  }
  .mkd-footer-link {
    display: inline-block;
    font-size: 15px;
    color: rgba(255,255,255,0.45);
    text-decoration: none;
    position: relative;
    width: fit-content;
    transition: color 0.2s;
  }
  .mkd-footer-link::after {
    content: '';
    position: absolute;
    left: 0; bottom: -2px;
    width: 0; height: 1px;
    background: currentColor;
    transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .mkd-footer-link:hover { color: rgba(255,255,255,0.9); }
  .mkd-footer-link:hover::after { width: 100%; }

  /* ── Watermark ────────────────────────────────── */
  .mkd-footer-wm {
    font-family: "Syne", sans-serif;
    font-size: clamp(56px, 14vw, 180px);
    font-weight: 800;
    letter-spacing: -0.05em;
    line-height: 0.82;
    color: rgba(255,255,255,0.03);
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    padding: 24px 0 16px;
    margin: 0 -10px;
  }

  /* ── Bottom bar ───────────────────────────────── */
  .mkd-footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding: 24px 0 40px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .mkd-footer-copy {
    font-size: 12.5px;
    color: rgba(255,255,255,0.2);
    margin: 0;
  }
  .mkd-footer-legal {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  .mkd-footer-legal a {
    font-size: 12.5px;
    color: rgba(255,255,255,0.2);
    text-decoration: none;
    transition: color 0.2s;
  }
  .mkd-footer-legal a:hover { color: rgba(255,255,255,0.6); }
`;

/* ── Component ───────────────────────────────────────────── */
export default function MonkDAFooter({
  accent = "#d4af6e",
  bg = "#0f0f13",
  tagline = "Extraordinary outcomes, by design.",
  entity = "MonkDA Ltd.",
  cols = DEFAULT_COLS,
  tickers = DEFAULT_TICKERS,
}: MonkDAFooterProps) {
  const year = new Date().getFullYear();
  // double the ticker items so the marquee loops seamlessly
  const doubled = [...tickers, ...tickers];

  return (
    <>
      <style>{css}</style>
      <footer className="mkd-footer" style={{ background: bg }}>
        {/* ── Ticker strip ───────────────────────── */}
        <div className="mkd-ticker-strip" style={{ background: `${accent}09` }}>
          <div className="mkd-ticker-track">
            {doubled.map((phrase, i) => (
              <span key={i} className="mkd-ticker-item">
                {phrase}
                <span className="mkd-ticker-sep" style={{ color: accent }}>
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Main body ──────────────────────────── */}
        <div className="mkd-footer-body">
          {/* Top row */}
          <div className="mkd-footer-top">
            {/* Brand */}
            <div className="mkd-footer-brand">
              <a href="/" className="mkd-footer-logo-link" aria-label="MonkDA">
                <Image
                  src="/logo.svg"
                  alt="MonkDA"
                  width={56}
                  height={46}
                  priority
                />
              </a>
              <p className="mkd-footer-brand-name" style={{ color: accent }}>
                MonkDA
              </p>
              <p className="mkd-footer-tagline">{tagline}</p>

              <div className="mkd-footer-socials">
                {[
                  {
                    label: "IG",
                    full: "Instagram",
                    href: "https://www.instagram.com/monkda_official/",
                  },
                  {
                    label: "LI",
                    full: "LinkedIn",
                    href: "https://www.linkedin.com/company/monkda/",
                  },
                  {
                    label: "TW",
                    full: "Twitter / X",
                    href: "https://x.com/Official_Monkda",
                  },
                  {
                    label: "FB",
                    full: "Facebook",
                    href: "https://www.facebook.com/profile.php?id=61551809824545",
                  },
                ].map(({ label, full, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mkd-footer-social-pill"
                    aria-label={full}
                    style={{ borderColor: `${accent}25` }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav */}
            <nav className="mkd-footer-nav" aria-label="Footer navigation">
              {cols.map((col) => (
                <div key={col.title} className="mkd-footer-col">
                  <p className="mkd-footer-col-title">{col.title}</p>
                  {col.links.map((l) => (
                    <a key={l.label} href={l.href} className="mkd-footer-link">
                      {l.label}
                    </a>
                  ))}
                </div>
              ))}
            </nav>
          </div>

          {/* Watermark */}
          <div className="mkd-footer-wm" aria-hidden="true">
            MonkDA
          </div>

          {/* Bottom */}
          <div className="mkd-footer-bottom">
            <p className="mkd-footer-copy">
              © {year} {entity} All rights reserved.
            </p>
            <div className="mkd-footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Cookie Policy</a>
              <a href="#">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
