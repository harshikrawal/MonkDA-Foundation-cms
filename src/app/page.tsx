"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import HeroParticles from "@/components/HeroParticles";
import MonkDAFooter from "@/components/MonkDAFooter";
import StrapiBlogSection from "@/components/StrapiBlogSection";
import Image from "next/image";

/* ─── DATA ────────────────────────────────────────────── */

const optimizationProblems = [
  {
    id: "speed",
    title: "Slow Load Time",
    desc: "Every second delay drops conversions by 7%. Most Real Estate portals take 5+ seconds to be interactive.",
    icon: "",
  },
  {
    id: "cwv",
    title: "Poor Web Vitals",
    desc: "Google's 2024 algorithm penalizes property listings that fail Core Web Vitals. Our $1 fix solves this.",
    icon: "",
  },
  {
    id: "bounce",
    title: "High Bounce Rate",
    desc: "Users leave if they wait. We ensure your HD property images load instantly without losing quality.",
    icon: "",
  },
  {
    id: "mobile",
    title: "Mobile Lag",
    desc: "80% of buyers search on mobile. If your site isn't buttery smooth on iPhone, you're losing deals.",
    icon: "",
  },
];

const optimizationServices = [
  {
    id: "speed",
    title: "Atomic Speed",
    tags: ["0.4s LCP", "99/100 Mobile", "Server-Side", "Next-Gen Format"],
    description:
      "We rewrite the way your site handles traffic. From image compression to script deferral, we make it fly.",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)",
    image: "/re-speed.png",
  },
  {
    id: "cro",
    title: "Conversion Engine",
    tags: ["Heatmaps", "AB Testing", "Lead Forms", "CTAs"],
    description:
      "A fast site is useless if it doesn't convert. We optimize your booking forms and CTA placements.",
    gradient: "linear-gradient(135deg,#0d1b2a 0%,#1b263b 60%,#415a77 100%)",
    image: "/re-cro.png",
  },
  {
    id: "trust",
    title: "Trust & Growth",
    tags: ["SEO Audit", "Meta Data", "Security", "SSL"],
    description:
      "Higher rankings, safer transactions. We ensure your business is perceived as the authority.",
    gradient: "linear-gradient(135deg,#10002b 0%,#240046 60%,#3c096c 100%)",
    image: "/re-trust.png",
  },
];

const beforeAfterCases = [
  {
    id: 1,
    name: "Luxury Soho Portal",
    year: "Before: 6.2s",
    label: "Optimized",
    type: "After: 0.8s",
    price: "+124% Leads",
    location: "London, UK",
    desc: "Massive reduction in bounce rate by optimizing heavy listing assets.",
    bg: "/re-soho.png",
    large: true,
  },
  {
    id: 2,
    name: "Estate Direct",
    year: "Before: 4.8s",
    label: "Optimized",
    type: "After: 1.1s",
    price: "+42% Conversion",
    location: "Kensington",
    desc: "Fixed CLS issues and improved mobile scores from 34 to 92.",
    bg: "/re-kensington.png",
    large: false,
  },
];

const stats = [
  {
    stat: "0.4s",
    desc: "Average Largest Contentful Paint (LCP) after optimization.",
    client: "Speed Bench",
    color: "linear-gradient(135deg,#0f0c29,#302b63)",
  },
  {
    stat: "100/100",
    desc: "Google Lighthouse SEO and Accessibility scores achieved.",
    client: "Perfect Score",
    color: "linear-gradient(135deg,#141e30,#243b55)",
  },
  {
    stat: "82%",
    desc: "Average reduction in image payload without quality loss.",
    client: "Data Savings",
    color: "linear-gradient(135deg,#10002b,#3c096c)",
  },
  {
    stat: "$1",
    desc: "The cost to prove our worth on your most important page.",
    client: "No Risk",
    color: "linear-gradient(135deg,#0d1b2a,#415a77)",
  },
];

const nichePartners = [
  "Zoopla",
  "Rightmove",
  "Zillow",
  "Redfin",
  "Realtor.com",
  "Knight Frank",
  "Savills",
  "Compass",
];

const testimonials = [
  {
    quote:
      "MonkDA optimized our search portal for £1 and the result was instant. We saw a 30% jump in viewing requests within the first week. Speed truly is everything.",
    name: "Amara & James Holden",
    title: "Agency Directors, Chiswick",
    bg: "#e8f4f8",
  },
  {
    quote:
      "We were failing Google's Core Web Vitals across the board. The $1 optimization fixed our rankings and now we're dominant in our local postcode again.",
    name: "Richard Tanner",
    title: "Real Estate Tech Lead",
    bg: "#f0ebe8",
  },
];

const articles = [
  {
    cat: "Market Insight",
    title:
      "London property market outlook for 2025: Where are the opportunities?",
    slug: "#",
    image: "/re-art-market.png",
  },
  {
    cat: "Buying Guide",
    title:
      "First-time buyer in London: Everything you need to know before you offer",
    slug: "#",
    image: "/re-art-buying.png",
  },
  {
    cat: "Investment",
    title:
      "Prime Central London vs. Zone 2: Which offers better long-term returns?",
    slug: "#",
    image: "/re-art-investment.png",
  },
  {
    cat: "Selling Guide",
    title: "How to present your property to achieve the maximum sale price",
    slug: "#",
    image: "/re-art-selling.png",
  },
  {
    cat: "Renting",
    title: "Landlord legislation 2025: Key compliance changes you must know",
    slug: "#",
    image: "/re-art-renting.png",
  },
  {
    cat: "Market Insight",
    title: "Interest rate cuts and their impact on London property values",
    slug: "#",
    image: "/re-art-market.png", // Reusing market image
  },
];

/* ─── HERO ─────────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="re-hero" ref={ref}>
      <div
        className="re-hero-bg"
        style={{ transform: `translateY(${offset * 0.3}px)` }}
      />
      <div className="re-hero-overlay" />
      <HeroParticles />

      <div className="re-container">
        <div className="re-hero-inner">
          <p className="re-hero-eyebrow">MonkDA · Real Estate Optimization</p>

          <h1 className="re-hero-heading">
            <span className="re-hero-line">Fast Sites.</span>
            <span className="re-hero-line re-hero-line--italic">More</span>
            <span className="re-hero-line">Leads.</span>
          </h1>

          <p className="re-hero-sub">
            We optimize your Real Estate portal for zero-lag performance and
            10/10 Web Vitals. Get your most important page perfected for just
            $1.
          </p>

          <div className="re-hero-actions">
            <a href="#optimization-form" className="re-btn re-btn--primary">
              Get My $1 Optimization <span className="re-btn-arrow">↗</span>
            </a>
          </div>

          <div className="re-hero-badges">
            <span className="re-badge">99/100 Mobile Speed</span>
            <span className="re-badge">0.4s LCP Target</span>
            <span className="re-badge">+120% Conv. Baseline</span>
          </div>
        </div>
      </div>

      <div className="re-scroll-hint">
        <span className="re-scroll-line" />
        <span className="re-scroll-label">Scroll</span>
      </div>
    </section>
  );
}

/* ─── SECTION: PROBLEMS ───────────────────────────── */
function ProblemSection() {
  return (
    <section
      className="re-services"
      id="problems"
      style={{ paddingBottom: "10rem", background: "#fcfbf8" }}
    >
      <div className="re-container">
        <div className="re-section-header" style={{ marginBottom: "5rem" }}>
          <h2 className="re-large-heading">
            <span className="re-lh-line">The Silent</span>
            <span className="re-lh-line re-lh-line--indent">
              Profit Killers
            </span>
          </h2>
          <div className="re-section-arrow">↘</div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2rem",
            }}
          >
            {optimizationProblems.map((p) => (
              <div
                key={p.id}
                className="re-service-panel"
                style={{
                  padding: "2.5rem",
                  background: "#fff",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                  border: "1px solid #e5e5e0",
                  borderRadius: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <h3
                  className="re-service-heading"
                  style={{ marginBottom: "0.5rem", fontSize: "1.5rem" }}
                >
                  {p.title}
                </h3>
                <p className="re-service-desc" style={{ fontSize: "0.95rem" }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ position: "sticky", top: "120px" }}>
            <div
              style={{
                position: "relative",
                aspectRatio: "3/4",
                borderRadius: "2.5rem",
                overflow: "hidden",
                boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
              }}
            >
              <Image
                src="/luxury.png"
                alt="Luxury Property Interior"
                width={600}
                height={800}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION: $1 OFFER ───────────────────────────── */
function OfferSection() {
  return (
    <section
      className="re-services"
      id="offer"
      style={{
        position: "relative",
        background: "#0a0c12",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/re-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
          filter: "grayscale(100%) brightness(0.5)",
          pointerEvents: "none",
        }}
      />
      <div className="re-container" style={{ paddingBlock: "8rem" }}>
        <h2 className="re-large-heading" style={{ marginBottom: "3rem" }}>
          <span className="re-lh-line">Our</span>
          <span
            className="re-lh-line re-lh-line--indent re-lh-line--italic"
            style={{ color: "#d4af6e" }}
          >
            $1 Single-Page Fix
          </span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "4rem",
          }}
        >
          <div>
            <p className="re-hero-sub" style={{ opacity: 0.9 }}>
              We'll optimize your most critical landing page — whether it's a
              search portal, a luxury listing, or your home page. We improve
              image compression, script caching, asset delivery, and database
              queries.
            </p>
          </div>
          <div>
            <p className="re-hero-sub" style={{ opacity: 0.9 }}>
              No long-term contract. No hidden fees. If you don't see a massive
              jump in Google PageSpeed scores, we don't ask for a second dollar.
              This is how we prove our worth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES ──────────────────────────────────────────── */
function Services() {
  const [active, setActive] = useState(0);
  return (
    <section className="re-services" id="services">
      <div className="re-container">
        <div className="re-section-header">
          <h2 className="re-large-heading">
            <span className="re-lh-line">What We</span>
            <span className="re-lh-line re-lh-line--indent">Improve</span>
          </h2>
          <div className="re-section-arrow">↘</div>
        </div>
      </div>

      <div className="re-services-panels">
        <div className="re-container">
          {optimizationServices.map((svc, i) => (
            <div
              key={svc.id}
              className={`re-service-panel ${active === i ? "re-service-panel--active" : ""}`}
              onMouseEnter={() => setActive(i)}
            >
              <div className="re-service-text">
                <h3 className="re-service-heading">{svc.title}</h3>
                <div className="re-service-tags">
                  {svc.tags.map((t) => (
                    <span key={t} className="re-service-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="re-service-desc">{svc.description}</p>
              </div>
              <div
                className="re-service-visual"
                style={{ background: svc.gradient }}
              >
                <div className="re-service-visual-content">
                  {svc.image && (
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      style={{ objectFit: "cover", opacity: 0.6 }}
                      className="re-service-img"
                    />
                  )}
                  <span className="re-service-num">0{i + 1}</span>
                  <span className="re-service-visual-label">{svc.title}</span>
                </div>
              </div>
              <div className="re-service-bg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ETHOS ─────────────────────────────────────────────── */
const ethosItems = [
  {
    n: "01",
    h: "People first, always.",
    p: "Every transaction is about more than bricks and mortar — it's about your life, your family, your future. We listen before we advise.",
  },
  {
    n: "02",
    h: "Radical transparency.",
    p: "Honest valuations, clear fee structures, and real-time updates. No smoke and mirrors — just straight-talking expertise you can trust.",
  },
  {
    n: "03",
    h: "Data-driven pricing.",
    p: "We combine 15 years of local market data with live transaction intelligence to achieve the best possible price, consistently.",
  },
  {
    n: "04",
    h: "Relentless negotiation.",
    p: "Our negotiators are among the best in London. We fight for every pound. Our vendors average 2.4% above initial valuation.",
  },
];

function Ethos() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="re-ethos">
      <div className="re-container">
        <h2 className="re-ethos-heading">
          Trusted.{"\n"}Results-driven.{"\n"}
          <em>Relentless.</em>
        </h2>
        <div className="re-ethos-items">
          {ethosItems.map((item, i) => (
            <div key={i} className="re-ethos-item">
              <button
                className="re-ethos-trigger"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <div className="re-ethos-trigger-left">
                  <span className="re-ethos-num">{item.n}/</span>
                  <h3 className="re-ethos-item-heading">{item.h}</h3>
                </div>
                <span
                  className={`re-ethos-icon ${open === i ? "re-ethos-icon--open" : ""}`}
                >
                  +
                </span>
              </button>
              <div
                className={`re-ethos-body ${open === i ? "re-ethos-body--open" : ""}`}
              >
                <p>{item.p}</p>
              </div>
              <div className="re-ethos-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROPERTIES (Results Section) ────────────────────────── */
function Properties() {
  return (
    <section className="re-properties" id="results">
      <div className="re-properties-bg-switch" />
      <div className="re-container">
        <div className="re-prop-header">
          <h2 className="re-large-heading re-large-heading--white">
            <span className="re-lh-line">Proven</span>
            <span className="re-lh-line re-lh-line--indent">Outcomes</span>
          </h2>
          <div className="re-prop-sub-wrap">
            <h3 className="re-prop-sub-heading">
              Data that speaks for itself.
            </h3>
            <p className="re-prop-sub-text">
              We don't just shave off milliseconds; we build high-performance
              search experiences that capture more leads.
            </p>
          </div>
        </div>
      </div>

      <div className="re-prop-grid-wrap">
        <div className="re-container">
          <div className="re-prop-grid">
            {beforeAfterCases.map((prop) => (
              <div
                key={prop.id}
                className={`re-prop-card ${prop.large ? "re-prop-card--large" : ""}`}
              >
                <div className="re-prop-card-label-row">
                  <h3 className="re-prop-card-name">{prop.name}</h3>
                  <p className="re-prop-card-year">{prop.year}</p>
                </div>
                <div
                  className="re-prop-card-img"
                  style={{
                    backgroundImage: `url(${prop.bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="re-prop-card-overlay">
                    <p className="re-prop-card-desc">{prop.desc}</p>
                    <ul className="re-prop-card-tags">
                      <li>{prop.type}</li>
                      <li>{prop.location}</li>
                      <li>{prop.label}</li>
                    </ul>
                  </div>
                  <div className="re-prop-price-badge">{prop.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── STATISTICS ─────────────────────────────────────────── */
function Statistics() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % stats.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="re-stats" id="results">
      <div className="re-stats-bg-switch" />
      <div className="re-container">
        <h2 className="re-large-heading re-large-heading--white">
          <span className="re-lh-line">Our</span>
          <span className="re-lh-line re-lh-line--indent">Results</span>
        </h2>
      </div>

      <div className="re-stats-carousel">
        <div className="re-container">
          <div className="re-stats-track">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`re-stat-card ${active === i ? "re-stat-card--active" : ""}`}
                onClick={() => setActive(i)}
                style={{
                  background: s.color,
                  transform:
                    active === i
                      ? "scale(1) translateZ(0)"
                      : `scale(0.88) translateZ(${-80 * Math.abs(active - i)}px)`,
                  opacity: active === i ? 1 : 0.55 - Math.abs(active - i) * 0.1,
                }}
              >
                <div className="re-stat-card-inner">
                  <span className="re-stat-client">{s.client}</span>
                  <h3 className="re-stat-number">{s.stat}</h3>
                  <p className="re-stat-desc">{s.desc}</p>
                  <a
                    href="#contact"
                    className="re-btn re-btn--white re-btn--sm"
                  >
                    Get in touch →
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="re-stats-dots">
            {stats.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`re-stats-dot ${active === i ? "re-stats-dot--active" : ""}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PARTNERS ───────────────────────────────────────────── */
function Partners() {
  return (
    <section className="re-partners" id="partners">
      <div className="re-partners-bg-switch" />
      <div className="re-container">
        <div className="re-partners-header">
          <h2 className="re-large-heading re-large-heading--white">
            <span className="re-lh-line">Portals We</span>
            <span className="re-lh-line re-lh-line--indent">Optimize</span>
          </h2>
          <div className="re-partners-arrow">↘</div>
        </div>
        <div className="re-partners-grid">
          {nichePartners.map((p) => (
            <div key={p} className="re-partner-logo">
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ───────────────────────────────────────── */
function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="re-testimonials" id="testimonials">
      <div className="re-testimonials-bg-switch" />
      <div className="re-container">
        <h2 className="re-testimonials-heading">
          What our
          <br />
          clients say
        </h2>

        <div className="re-test-desktop">
          <div className="re-test-track">
            {testimonials.map((item, i) => (
              <div
                key={i}
                className={`re-test-card ${active === i ? "re-test-card--front" : ""}`}
                style={{
                  background: item.bg,
                  transform:
                    active === i
                      ? "translate3d(0,0,0) scale(1)"
                      : `translate3d(${(i - active) * 30}px,0,-${Math.abs(i - active) * 80}px) scale(0.9)`,
                  opacity: active === i ? 1 : 0.5,
                  zIndex: testimonials.length - Math.abs(i - active),
                }}
                onClick={() => setActive(i)}
              >
                <div className="re-test-stars-empty" />
                <p className="re-test-quote">{item.quote}</p>
                <div className="re-test-footer">
                  <div>
                    <strong className="re-test-name">{item.name}</strong>
                    <span className="re-test-title">{item.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="re-test-next"
            onClick={() => setActive((a) => (a + 1) % testimonials.length)}
            aria-label="Next testimonial"
          >
            Next ›
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── ARTICLES ───────────────────────────────────────────── */
function Articles() {
  return (
    <section className="re-articles" id="blog">
      <div className="re-articles-bg-switch" />
      <div className="re-container">
        <div className="re-articles-header">
          <p className="re-articles-eyebrow">Latest Articles</p>
          <a href="#" className="re-btn re-btn--white">
            View all insights →
          </a>
        </div>
        <div className="re-articles-grid">
          {articles.map((a, i) => (
            <a key={i} href={a.slug} className="re-article-card">
              <div className="re-article-img">
                {a.image ? (
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="re-article-img-src"
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: `hsl(${220 + i * 25},40%,${12 + i * 4}%)`,
                    }}
                  />
                )}
                <span className="re-article-cat-badge">{a.cat}</span>
              </div>
              <div className="re-article-body">
                <p className="re-article-cat">{a.cat}</p>
                <h3 className="re-article-title">{a.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION: TRUST & SECURITY ───────────────────── */
function TrustSection() {
  return (
    <section
      id="security"
      style={{
        background: "#0a0a0b",
        paddingBlock: "10rem",
        borderBlock: "1px solid rgba(255,255,255,0.05)",
        overflow: "hidden",
      }}
    >
      <div className="re-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: "-20%",
                background:
                  "radial-gradient(circle at 50% 50%, #d4af6e20 0%, transparent 70%)",
                filter: "blur(40px)",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "relative",
                borderRadius: "2.5rem",
                overflow: "hidden",
                border: "1px solid rgba(212,175,110,0.2)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
                zIndex: 1,
              }}
            >
              <Image
                src="/security.png"
                alt="Data Security Interface"
                width={800}
                height={600}
                style={{ objectFit: "cover", width: "100%", height: "auto" }}
              />
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <h3
              className="re-large-heading"
              style={{
                fontSize: "clamp(3rem, 5vw, 4.5rem)",
                marginBottom: "2.5rem",
                color: "#d4af6e",
                lineHeight: "0.9",
              }}
            >
              Total Data <br />
              <span style={{ color: "#fff", fontStyle: "italic" }}>
                Safety.
              </span>
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <p
                className="re-hero-sub"
                style={{ opacity: 0.95, color: "#fff", margin: 0 }}
              >
                Security is not an afterthought—it&apos;s our foundation. We
                only require staging or restricted contributor access to perform
                optimizations.
              </p>
              <p
                className="re-hero-sub"
                style={{
                  opacity: 0.8,
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                No sensitive client data, transaction records, or proprietary
                financial documents are ever accessed or stored throughout our
                workflow. Your property portal remains 100% secure, while we
                focus exclusively on performance engineering.
              </p>

              <div
                style={{ marginTop: "1rem", display: "flex", gap: "1.5rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      color: "#d4af6e",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                  >
                    Safe
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Staging-Only Access
                  </span>
                </div>
                <div
                  style={{
                    width: "1px",
                    height: "3rem",
                    background: "rgba(255,255,255,0.1)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      color: "#d4af6e",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                  >
                    Secure
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Encrypted Workflow
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT CTA (Lead Form) ────────────────────────────── */
function ContactCTA() {
  return (
    <section className="re-contact-cta" id="optimization-form">
      <div className="re-container">
        <div className="re-cta-inner">
          <p className="re-cta-eyebrow">Ready for $1?</p>
          <h2 className="re-cta-heading">
            Get your first
            <br />
            <em>optimized page.</em>
          </h2>
          <div
            style={{
              marginTop: "4rem",
              background: "rgba(255,255,255,0.02)",
              padding: "4rem",
              borderRadius: "2rem",
              border: "1px solid rgba(255,255,255,0.05)",
              textAlign: "left",
            }}
          >
            <form
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                }}
              >
                <label
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  style={{
                    padding: "1rem",
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "0.5rem",
                    color: "#fff",
                    outline: "none",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                }}
              >
                <label
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  Work Email
                </label>
                <input
                  type="email"
                  placeholder="john@agency.com"
                  style={{
                    padding: "1rem",
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "0.5rem",
                    color: "#fff",
                    outline: "none",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                }}
              >
                <label
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  Website URL
                </label>
                <input
                  type="url"
                  placeholder="https://your-agency.com"
                  style={{
                    padding: "1rem",
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "0.5rem",
                    color: "#fff",
                    outline: "none",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                }}
              >
                <label
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  Business Type
                </label>
                <select
                  style={{
                    padding: "1rem",
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "0.5rem",
                    color: "#fff",
                    outline: "none",
                    appearance: "none",
                  }}
                >
                  <option>Real Estate Agency</option>
                  <option>PropTech SAAS</option>
                  <option>Property Management</option>
                  <option>Development Group</option>
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1", marginTop: "1rem" }}>
                <button
                  className="re-btn re-btn--primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Optimize My Page for $1
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */
const RE_FOOTER_COLS = [
  {
    title: "Services",
    links: [
      { label: "Site Audit", href: "#problems" },
      { label: "Speed Opt.", href: "#services" },
      { label: "CRO Engine", href: "#services" },
      { label: "Lead Gen", href: "#optimization-form" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Real Estate", href: "/" },
      { label: "Automobile", href: "/automobile" },
      { label: "Gym & Fitness", href: "/gym" },
      { label: "Healthcare", href: "/clinic" },
      { label: "Legal Elite", href: "/lawyers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About MonkDA", href: "#" },
      { label: "Insights", href: "#blog" },
      { label: "Privacy Policy", href: "#" },
      { label: "Contact", href: "#optimization-form" },
    ],
  },
];

/* ─── PAGE ROOT ──────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <OfferSection />
        <Services />
        <Properties />
        <Statistics />
        <Partners />
        <TrustSection />
        <Testimonials />
        <StrapiBlogSection categorySlug="real-estate" accent="#d4af6e" heading="Real Estate" headingAccent="Insights." />
        <ContactCTA />
        <MonkDAFooter
          accent="#d4af6e"
          bg="#0a0a10"
          tagline="The optimization engine for Real Estate's elite. Results that speak."
          entity="MonkDA Optimization Ltd."
          cols={RE_FOOTER_COLS}
          tickers={[
            "MonkDA Optimization",
            "Speed · CRO · SEO",
            "Prime Performance",
            "MonkDA",
            "99/100 Mobile Scores",
            "Book a Site Audit",
            "MonkDA Optimization",
            "Performance by Design",
          ]}
        />
      </main>
    </>
  );
}
