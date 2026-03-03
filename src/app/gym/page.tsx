"use client";

import "./gym.css";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import HeroParticles from "@/components/HeroParticles";
import MonkDAFooter from "@/components/MonkDAFooter";
import StrapiBlogSection from "@/components/StrapiBlogSection";
import Image from "next/image";

/* ════════════════════════════════════════════════════════
   SCROLL REVEAL HOOK
   ════════════════════════════════════════════════════════ */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════ */
const GYM_LINKS = [
  { label: "Problems", href: "#problems" },
  { label: "Expertise", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Partners", href: "#partners" },
  { label: "Safety", href: "#security" },
  { label: "Optimize", href: "#optimization-form" },
];

const gymProblems = [
  {
    id: "booking-lag",
    num: "01/",
    title: "Class Booking Stutter",
    desc: "Peak-hour bookings and class scheduling portals often freeze. We optimize data fetching for 200ms confirmation times.",
  },
  {
    id: "visual-bloat",
    num: "02/",
    title: "High-Res Asset Bloat",
    desc: "Cinema-quality gym trailers and 4K trainer profiles are killing your mobile speed. We deliver 8K quality at 150KB payloads.",
  },
  {
    id: "member-churn",
    num: "03/",
    title: "Dashboard Friction",
    desc: "If members take 5+ seconds to log a workout, they stop using the app. We ensure 60fps interaction on every tap.",
  },
  {
    id: "global-cdn",
    num: "04/",
    title: "Network Latency",
    desc: "Franchises serving global members face latency issues. We implement edge-delivered caching for instant dashboard access.",
  },
];

const gymServices = [
  {
    id: "member-portal",
    title: "Member Dashboards",
    tags: ["Fluid UI", "PWA Ready", "Workout Logging", "Instant Stats"],
    desc: "We transform clunky membership portals into high-performance web apps that feel like native iOS experiences.",
    gradient: "linear-gradient(135deg,#0c0c0e 0%,#fbbf2405 60%,#fbbf2415 100%)",
    img: "/gym-app.jpg",
  },
  {
    id: "media-opt",
    title: "Cinematic Speed",
    tags: ["WebP/Avif", "Video Streaming", "Vercel Blob", "CDN Edge"],
    desc: "Your high-energy gym content should load as fast as a heartbeat. We optimize 4K video for 0s buffer times.",
    gradient: "linear-gradient(135deg,#0c0c0e 0%,#1a1018 60%,#2d1a06 100%)",
    img: "/gym-hero.jpg",
  },
];

const gymStats = [
  {
    num: "0.2s",
    unit: "TTL",
    label: "Booking Speed",
    desc: "Average time to confirm a class booking after our $1 optimization engine.",
    color: "linear-gradient(135deg,#0c0c0e,#1a1a10,#2d1a06)",
  },
  {
    num: "98/100",
    unit: "Score",
    label: "Mobile Performance",
    desc: "Lighthouse mobile score achieved for Tier-1 boutique gym conglomerates.",
    color: "linear-gradient(135deg,#0c0c0e,#0a1a30,#0d2545)",
  },
];

const beforeAfterGyms = [
  {
    id: 1,
    name: "Apex Fitness Global",
    year: "Before: 7.2s",
    label: "Optimized",
    type: "After: 0.8s",
    price: "+140% Mobile Enrollment",
    location: "Boutique Group",
    desc: "Optimized complex class schedule API and high-res trainer video b-rolls.",
    bg: "/gym-interior.jpg",
    large: true,
  },
  {
    id: 2,
    name: "Raw Athletics",
    year: "Before: 4.8s",
    label: "Optimized",
    type: "After: 0.4s",
    price: "+85% Member Retention",
    location: "Studio Network",
    desc: "Refined member dashboard performance for zero-lag workout tracking.",
    bg: "/gym-training.jpg",
    large: false,
  },
];

const gymPartners = [
  "Equinox",
  "Virgin Active",
  "David Lloyd",
  "Gold's Gym",
  "Anytime Fitness",
  "F45 Training",
  "Barry's",
  "SoulCycle",
  "PureGym",
  "The Gym Group",
];

const gymProcess = [
  {
    step: "01",
    title: "Deep Audit",
    desc: "We analyze your member portal's critical path. From API latency to hydration bottlenecks, we find the friction.",
  },
  {
    step: "02",
    title: "Atomic Refactor",
    desc: "We implement our $1 optimization on your highest-traffic page. No downtime, just pure performance gains.",
  },
  {
    step: "03",
    title: "Global Scale",
    desc: "We roll out the engine across your entire franchise network, ensuring 100/100 Lighthouse scores globally.",
  },
];

const gymArticles = [
  {
    cat: "Performance",
    title:
      "Retention by speed: How 1s lag costs boutique gyms 15% in membership",
    slug: "#",
  },
  {
    cat: "Video",
    title: "Streaming the Burn: Optimizing 4K fitness classes for mobile CDNs",
    slug: "#",
  },
  {
    cat: "UX",
    title:
      "Zero-Lag Dashboards: Why members stop logging when the app stutters",
    slug: "#",
  },
];

/* ════════════════════════════════════════════════════════
   COMPONENTS
   ════════════════════════════════════════════════════════ */

function Hero() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const fn = () => setOffset(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section className="gym-hero">
      <div
        className="gym-hero-bg"
        style={{ transform: `translateY(${offset * 0.3}px)` }}
      />
      <HeroParticles theme="automobile" />{" "}
      {/* Using automobile (red/orange) for energy vibes */}
      <div className="gym-container">
        <div className="gym-hero-inner">
          <p className="gym-hero-eyebrow">
            MonkDA · Digital Athletic Performance
          </p>
          <h1 className="gym-hero-heading">
            <span>Peak Speed</span>
            <span>
              at <em>Any Scale.</em>
            </span>
          </h1>
          <p className="gym-hero-sub">
            We optimize high-energy fitness platforms for zero-lag performance.
            From boutique class booking systems to global nutrition dashboards,
            we deliver the engineering edge.
          </p>
          <div
            className="gym-hero-actions"
            style={{ display: "flex", gap: "2rem" }}
          >
            <a href="#optimization-form" className="gym-btn">
              Get My $1 Performance Boost{" "}
              <span style={{ marginLeft: "1rem" }}>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const { ref, visible } = useReveal();
  return (
    <section className="gym-section" id="problems">
      <div className="gym-container">
        <h2
          className={`gym-large-heading gym-reveal${visible ? " gym-revealed" : ""}`}
          ref={ref}
        >
          <span>Performance</span>
          <span className="gym-lh-indent gym-lh-accent">Gaps.</span>
        </h2>
        <div className="gym-grid">
          {gymProblems.map((p) => (
            <div key={p.id} className="gym-card">
              <span className="gym-card-num">{p.num}</span>
              <h3 className="gym-card-heading">{p.title}</h3>
              <p className="gym-card-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OfferSection() {
  return (
    <section
      className="gym-section"
      id="offer"
      style={{
        position: "relative",
        background: "#080a10",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/gym-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
          filter: "grayscale(100%) brightness(0.5)",
          pointerEvents: "none",
        }}
      />
      <div
        className="gym-container"
        style={{ position: "relative", zIndex: 1 }}
      >
        <h2 className="gym-large-heading">
          <span>The</span>
          <span
            className="gym-lh-indent gym-lh-accent"
            style={{ fontStyle: "italic" }}
          >
            $1 Power Squeeze.
          </span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "5rem",
            marginTop: "5rem",
          }}
        >
          <p className="gym-hero-sub">
            Your members expect the same intensity from your portal as they do
            from their HIIT sessions. If your dashboard lags, they churn.
          </p>
          <p className="gym-hero-sub">
            We'll optimize your most mission-critical class booking page or
            member dashboard for $1. Immediate results or we part ways.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const { ref, visible } = useReveal();
  return (
    <section className="gym-section" id="process">
      <div className="gym-container">
        <h2
          className={`gym-large-heading gym-reveal${visible ? " gym-revealed" : ""}`}
          ref={ref}
        >
          <span>The</span>
          <span className="gym-lh-indent gym-lh-accent">3-Step Sprint.</span>
        </h2>
        <div className="gym-grid">
          {gymProcess.map((p) => (
            <div key={p.step} className="gym-card">
              <span className="gym-card-num">{p.step}/</span>
              <h3 className="gym-card-heading">{p.title}</h3>
              <p className="gym-card-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { ref, visible } = useReveal();
  return (
    <section className="gym-section" id="services">
      <div className="gym-container">
        <h2
          className={`gym-large-heading gym-reveal${visible ? " gym-revealed" : ""}`}
          ref={ref}
        >
          <span>Engineering</span>
          <span className="gym-lh-indent gym-lh-accent">The Burn.</span>
        </h2>
        <div style={{ marginTop: "5rem" }}>
          {gymServices.map((s, i) => (
            <div key={s.id} className="gym-service-panel">
              <div className="gym-service-text">
                <h3 className="gym-service-heading">{s.title}</h3>
                <div className="gym-service-tags">
                  {s.tags.map((t) => (
                    <span key={t} className="gym-service-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="gym-card-desc">{s.desc}</p>
              </div>
              <div className="gym-service-visual">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  className="gym-service-img"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Statistics() {
  const { ref, visible } = useReveal();
  return (
    <section className="gym-section">
      <div className="gym-container">
        <div className="gym-stats-grid">
          {gymStats.map((s, i) => (
            <div
              key={i}
              className="gym-stat-card"
              style={{ background: s.color + "10" }}
            >
              <div className="gym-stat-num">
                {s.num}
                <span>.</span>
              </div>
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                {s.label}
              </span>
              <p className="gym-card-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  const { ref, visible } = useReveal();
  return (
    <section className="gym-section" id="results">
      <div className="gym-container">
        <div
          ref={ref}
          className={`gym-reveal${visible ? " gym-revealed" : ""}`}
        >
          <h2 className="gym-large-heading">
            <span>Proven</span>
            <span className="gym-lh-indent gym-lh-accent">Outcomes.</span>
          </h2>
        </div>
        <div className="gym-case-grid">
          {beforeAfterGyms.map((c) => (
            <div
              key={c.id}
              className={`gym-case-card ${c.large ? "gym-case-card--large" : ""}`}
            >
              <Image src={c.bg} alt={c.name} fill className="gym-case-img" />
              <div className="gym-case-content">
                <div style={{ pointerEvents: "auto" }}>
                  <h3 className="gym-card-heading">{c.name}</h3>
                  <p
                    style={{
                      color: "var(--gym-accent)",
                      fontWeight: 700,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {c.year} → {c.type}
                  </p>
                  <p
                    className="gym-card-desc"
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      marginBottom: "2rem",
                      maxWidth: "450px",
                    }}
                  >
                    {c.desc}
                  </p>
                  <div
                    style={{
                      background: "var(--gym-accent)",
                      color: "#000",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "0.5rem",
                      display: "inline-block",
                      fontWeight: 900,
                    }}
                  >
                    {c.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const { ref, visible } = useReveal();
  return (
    <section className="gym-partners-section" id="partners">
      <div className="gym-partners-bg" />
      <div className="gym-partners-overlay" />
      <div
        className="gym-container"
        style={{ position: "relative", zIndex: 1 }}
      >
        <h2
          className={`gym-large-heading gym-reveal${visible ? " gym-revealed" : ""}`}
          ref={ref}
        >
          <span>Network</span>
          <span className="gym-lh-indent gym-lh-accent">Elite.</span>
        </h2>
        <p
          className={`gym-partners-sub gym-reveal${visible ? " gym-revealed" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          Accelerating the world's most prestigious athletic clubs and fitness
          franchises through precision engineering.
        </p>
        <div className="gym-partners-grid">
          {gymPartners.map((p, i) => (
            <div
              key={p}
              className={`gym-partner-cell gym-reveal${visible ? " gym-revealed" : ""}`}
              style={{ transitionDelay: `${0.1 * (i % 5)}s` }}
            >
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnicalDeepDive() {
  const { ref, visible } = useReveal();
  const techCards = [
    {
      title: "60FPS Hydration",
      desc: "Our engine ensures your workout dashboards are interactive in under 100ms, even on low-tier mobile hardware.",
    },
    {
      title: "Binary Video Shaking",
      desc: "We optimize high-energy trainer videos via binary shaking, reducing video buffer rates to zero for global members.",
    },
    {
      title: "Global CDN Mesh",
      desc: "Your boutique brand identity is delivered through a high-speed CDN mesh, ensuring instant image loads worldwide.",
    },
    {
      title: "Core Web Vitals Elite",
      desc: "We optimize for LCP and CLS to ensure your class schedule is Google-favored and user-friendly.",
    },
  ];

  return (
    <section className="gym-section" id="tech-deep-dive">
      <div className="gym-container">
        <h2
          className={`gym-large-heading gym-reveal${visible ? " gym-revealed" : ""}`}
          ref={ref}
        >
          <span>The</span>
          <span className="gym-lh-indent gym-lh-accent">Athletic Engine.</span>
        </h2>
        <div className="gym-grid" style={{ marginTop: "5rem" }}>
          {techCards.map((t, i) => (
            <div
              key={i}
              className="gym-card"
              style={{
                background: "rgba(251,191,36,0.03)",
                border: "1px solid rgba(251,191,36,0.1)",
              }}
            >
              <h3 className="gym-card-heading" style={{ fontSize: "1.5rem" }}>
                {t.title}
              </h3>
              <p className="gym-card-desc">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const { ref, visible } = useReveal();
  return (
    <section
      id="security"
      className="gym-section"
      style={{ background: "#060608" }}
    >
      <div className="gym-container">
        <div
          ref={ref}
          className={`gym-reveal${visible ? " gym-revealed" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          <div>
            <h3
              className="gym-large-heading"
              style={{ color: "var(--gym-accent)", marginBottom: "2rem" }}
            >
              Secure <br />
              <span style={{ color: "#fff", fontStyle: "italic" }}>
                Athletics.
              </span>
            </h3>
            <p className="gym-hero-sub" style={{ fontSize: "1.1rem" }}>
              Member privacy and financial data are never compromised. We only
              require frontend staging access or restricted developer roles for
              performance tuning.
            </p>
            <p className="gym-hero-sub" style={{ fontSize: "1.1rem" }}>
              Payment systems, member PII, and attendance records are never
              stored on our systems. We refine the visual engine while your
              database remains a fortress.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: "-15%",
                background:
                  "radial-gradient(circle, #fbbf2410 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <div
              style={{
                position: "relative",
                borderRadius: "3rem",
                overflow: "hidden",
                border: "1px solid rgba(251,191,36,0.2)",
              }}
            >
              <Image
                src="/security.png"
                alt="Gym Data Security"
                width={800}
                height={600}
                style={{ objectFit: "cover", width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  const { ref, visible } = useReveal();
  return (
    <section className="gym-section" id="optimization-form">
      <div className="gym-container">
        <div
          ref={ref}
          className={`gym-reveal${visible ? " gym-revealed" : ""}`}
        >
          <p className="gym-hero-eyebrow">Ready for $1?</p>
          <h2 className="gym-hero-heading" style={{ marginBottom: "4rem" }}>
            Unleash peak
            <br />
            performance <em>today.</em>
          </h2>

          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              padding: "4rem",
              borderRadius: "3rem",
              border: "1px solid var(--gym-border)",
            }}
          >
            <form
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "2rem",
              }}
            >
              <input
                type="text"
                placeholder="Gym Logo Name"
                style={{
                  padding: "1.2rem",
                  background: "#000",
                  border: "1px solid var(--gym-border)",
                  borderRadius: "1rem",
                  color: "#fff",
                }}
              />
              <input
                type="email"
                placeholder="Work Email"
                style={{
                  padding: "1.2rem",
                  background: "#000",
                  border: "1px solid var(--gym-border)",
                  borderRadius: "1rem",
                  color: "#fff",
                }}
              />
              <input
                type="url"
                placeholder="Booking URL"
                style={{
                  padding: "1.2rem",
                  background: "#000",
                  border: "1px solid var(--gym-border)",
                  borderRadius: "1rem",
                  color: "#fff",
                }}
              />
              <button
                className="gym-btn"
                style={{ gridColumn: "1 / -1", justifyContent: "center" }}
              >
                Optimize My Dashboard for $1
              </button>
            </form>
          </div>
        </div>

        <div className="gym-grid" style={{ marginTop: "5rem" }}>
          {gymArticles.map((a, i) => (
            <a
              key={i}
              href={a.slug}
              className="gym-card"
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "280px",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--gym-accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: "1.5rem",
                  }}
                >
                  {a.cat}
                </span>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 400 }}>
                  {a.title}
                </h3>
              </div>
              <span style={{ color: "var(--gym-accent)", fontWeight: 700 }}>
                Read More ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   PAGE ROOT
   ════════════════════════════════════════════════════════ */
const GYM_FOOTER_COLS = [
  {
    title: "Services",
    links: [
      { label: "Dashboard Opt.", href: "#services" },
      { label: "Booking Speed", href: "#problems" },
      { label: "High-Res Scaling", href: "#results" },
      { label: "Performance Audit", href: "#optimization-form" },
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
      { label: "Athletic Journal", href: "#" },
      { label: "Network Elite", href: "#partners" },
      { label: "Contact", href: "#optimization-form" },
    ],
  },
];

export default function GymPage() {
  return (
    <div className="gym-page">
      <CustomCursor />
      <Navbar
        links={GYM_LINKS}
        ctaLabel="Get $1 Fix"
        ctaHref="#optimization-form"
      />
      <main>
        <Hero />
        <ProblemSection />
        <Services />
        <Statistics />
        <OfferSection />
        <TechnicalDeepDive />
        <ProcessSection />
        <ResultsSection />
        <Partners />
        <TrustSection />
        <StrapiBlogSection
          categorySlug="gym"
          accent="var(--gym-accent)"
          heading="Athletic"
          headingAccent="Insights."
        />
        <ContactCTA />
      </main>
      <MonkDAFooter
        accent="var(--gym-accent)"
        bg="var(--gym-bg)"
        tagline="The performance engine for athletic elite. Zero lag, pure performance."
        entity="MonkDA Gym Optimization"
        cols={GYM_FOOTER_COLS}
        tickers={[
          "Lighthouse 100/100",
          "0.2s Confirmations",
          "MonkDA Elite",
          "Zero Buffer Video",
          "60FPS Member UX",
        ]}
      />
    </div>
  );
}
