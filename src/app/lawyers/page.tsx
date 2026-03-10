"use client";

import "./lawyers.css";
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
const LAW_LINKS = [
  { label: "Problems", href: "#problems" },
  { label: "Expertise", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Security", href: "#security" },
  { label: "Optimize", href: "#optimization-form" },
];

const lawProblems = [
  {
    id: "discovery-lag",
    num: "01/",
    title: "Discovery Latency",
    desc: "Large-scale e-discovery portals often stall during high-volume document retrieval. We optimize index rendering for millisecond access.",
  },
  {
    id: "case-friction",
    num: "02/",
    title: "Management Stutter",
    desc: "Case management dashboards that lag cost billable hours. We ensure 60fps interaction on every data entry point.",
  },
  {
    id: "client-portal",
    num: "03/",
    title: "Secure Portal Lag",
    desc: "Encrypted client portals shouldn't mean slow loading. We leverage edge-based encryption for fast, compliant access.",
  },
  {
    id: "lead-bounce",
    num: "04/",
    title: "High-Intent Bounce",
    desc: "If your intake form lags, elite clients look elsewhere. We reduce 'search-to-submit' friction by 80%.",
  },
];

const lawServices = [
  {
    id: "litigation-ux",
    title: "Attorney Workspaces",
    tags: ["Fluid UI", "PWA Ready", "Real-time Sync", "Zero-Lag Discovery"],
    desc: "We transform clunky case file systems into high-performance digital workspaces designed for the intensity of litigation.",
    gradient: "linear-gradient(135deg,#0c0c0e 0%,#1e3a8a10 60%,#1e3a8a20 100%)",
    image: "/law-discovery.png",
  },
  {
    id: "security-opt",
    title: "Restricted Discovery",
    tags: ["HIPAA Ready", "GDPR Compliant", "Edge Encryption", "Audit Logs"],
    desc: "Speed without compromise. We implement military-grade encryption layers that deliver millisecond response times.",
    gradient: "linear-gradient(135deg,#0c0c0e 0%,#0f172a 60%,#0c0c0e 100%)",
    image: "/law-security.png",
  },
];

const lawStats = [
  {
    num: "0.4s",
    unit: "LCP",
    label: "Portal Readiness",
    desc: "Average Largest Contentful Paint for complex legal dashboards following our optimization.",
  },
  {
    num: "100%",
    unit: "Secure",
    label: "Encryption Integrity",
    desc: "Uncompromising security maintained while achieving 100/100 Lighthouse performance scores.",
  },
];

const beforeAfterLaw = [
  {
    id: 1,
    name: "Sterling & Associates",
    year: "Before: 9.4s",
    label: "Optimized",
    type: "After: 1.1s",
    price: "+112% Client Conversion",
    desc: "Optimized global e-discovery portal and intake pipeline for high-net-worth litigation.",
    bg: "/law-hero.png",
    large: true,
  },
];

const lawPartners = [
  "Latham & Watkins",
  "Kirkland & Ellis",
  "Skadden",
  "Fullbright",
  "Clifford Chance",
  "Freshfields",
  "Allen & Overy",
  "Linklaters",
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
    <section className="lw-hero">
      <div
        className="lw-hero-bg"
        style={{ transform: `translateY(${offset * 0.3}px)` }}
      />
      <div className="lw-hero-overlay" />
      <HeroParticles theme="clinic" />
      <div className="lw-container">
        <div className="lw-hero-inner">
          <p className="lw-hero-eyebrow">
            MonkDA · Precision Legal Engineering
          </p>
          <h1 className="lw-hero-heading">
            <span>Precision</span>
            <span>
              Advocacy <em>at Scale.</em>
            </span>
          </h1>
          <p className="lw-hero-sub">
            We optimize mission-critical legal platforms for zero-lag
            performance. From complex e-discovery portals to secure client
            dashboads, we deliver the engineering edge.
          </p>
          <div className="lw-hero-actions">
            <a href="#optimization-form" className="lw-btn lw-btn--primary">
              Optimize My Firm for $1{" "}
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
    <section className="lw-section" id="problems">
      <div className="lw-container">
        <h2
          className={`lw-large-heading lw-reveal${visible ? " lw-revealed" : ""}`}
          ref={ref}
        >
          <span>Critical</span>
          <span className="lw-lh-indent lw-lh-accent">Inefficiencies.</span>
        </h2>
        <div className="lw-grid">
          {lawProblems.map((p) => (
            <div key={p.id} className="lw-card">
              <span className="lw-card-num">{p.num}</span>
              <h3 className="lw-card-heading">{p.title}</h3>
              <p className="lw-card-desc">{p.desc}</p>
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
    <section className="lw-section" id="services">
      <div className="lw-container">
        <h2
          className={`lw-large-heading lw-reveal${visible ? " lw-revealed" : ""}`}
          ref={ref}
        >
          <span>Legal</span>
          <span className="lw-lh-indent lw-lh-accent">Expertise.</span>
        </h2>
        <div style={{ marginTop: "5rem" }}>
          {lawServices.map((s, i) => (
            <div key={s.id} className="lw-service-panel">
              <div className="lw-service-text">
                <h3 className="lw-service-heading">{s.title}</h3>
                <div className="lw-service-tags">
                  {s.tags.map((t) => (
                    <span key={t} className="lw-service-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="lw-card-desc">{s.desc}</p>
              </div>
              <div
                className="lw-service-visual"
                style={{ background: s.gradient }}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="lw-service-img"
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
    <section className="lw-section">
      <div className="lw-container">
        <div className="lw-stats-grid">
          {lawStats.map((s, i) => (
            <div key={i} className="lw-stat-card">
              <div className="lw-stat-num">
                {s.num}
                <span>.</span>
              </div>
              <span className="lw-stat-label">{s.label}</span>
              <p className="lw-card-desc">{s.desc}</p>
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
    <section className="lw-section" id="results">
      <div className="lw-container">
        <div ref={ref} className={`lw-reveal${visible ? " lw-revealed" : ""}`}>
          <h2 className="lw-large-heading">
            <span>Proven</span>
            <span className="lw-lh-indent lw-lh-accent">Verdict.</span>
          </h2>
        </div>
        <div style={{ marginTop: "5rem" }}>
          {beforeAfterLaw.map((c) => (
            <div
              key={c.id}
              className="lw-card"
              style={{
                padding: 0,
                overflow: "hidden",
                height: "500px",
              }}
            >
              <Image
                src={c.bg}
                alt={c.name}
                fill
                style={{ objectFit: "cover", opacity: 0.3 }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  padding: "4rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3 className="lw-card-heading" style={{ fontSize: "2.5rem" }}>
                  {c.name}
                </h3>
                <p
                  className="lw-lh-accent"
                  style={{ fontWeight: 700, marginBottom: "1rem" }}
                >
                  {c.year} → {c.type}
                </p>
                <p
                  className="lw-card-desc"
                  style={{ color: "#fff", maxWidth: "600px" }}
                >
                  {c.desc}
                </p>
                <div style={{ marginTop: "2rem" }}>
                  <span
                    style={{
                      background: "var(--lw-accent)",
                      color: "#fff",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "0.5rem",
                      fontWeight: 700,
                    }}
                  >
                    {c.price}
                  </span>
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
    <section className="lw-partners-section" id="partners">
      <div className="lw-container">
        <h2
          className={`lw-large-heading lw-reveal${visible ? " lw-revealed" : ""}`}
          ref={ref}
        >
          <span>The</span>
          <span className="lw-lh-indent lw-lh-accent">Alliance.</span>
        </h2>
        <div className="lw-partners-grid">
          {lawPartners.map((p) => (
            <div key={p} className="lw-partner-cell">
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  const { ref, visible } = useReveal();
  return (
    <section className="lw-section" id="optimization-form">
      <div className="lw-container">
        <div ref={ref} className={`lw-reveal${visible ? " lw-revealed" : ""}`}>
          <p className="lw-hero-eyebrow">Discovery Audit</p>
          <h2 className="lw-hero-heading" style={{ marginBottom: "4rem" }}>
            Optimize your
            <br />
            firm <em>today.</em>
          </h2>

          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              padding: "4rem",
              borderRadius: "1.5rem",
              border: "1px solid var(--lw-border)",
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
                placeholder="Firm Name"
                style={{
                  padding: "1rem",
                  background: "#000",
                  border: "1px solid var(--lw-border)",
                  borderRadius: "0.5rem",
                  color: "#fff",
                }}
              />
              <input
                type="email"
                placeholder="Senior Partner Email"
                style={{
                  padding: "1rem",
                  background: "#000",
                  border: "1px solid var(--lw-border)",
                  borderRadius: "0.5rem",
                  color: "#fff",
                }}
              />
              <button
                className="lw-btn lw-btn--primary"
                style={{ gridColumn: "1 / -1", justifyContent: "center" }}
              >
                Request Audit for $1
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const LAW_FOOTER_COLS = [
  {
    title: "Services",
    links: [
      { label: "Attorney Workspaces", href: "#services" },
      { label: "Discovery Opt.", href: "#services" },
      { label: "Secure Intake", href: "#optimization-form" },
      { label: "Lead Capture", href: "#optimization-form" },
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
      { label: "Legal Insights", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Contact", href: "https://www.monkda.com/contact" },
    ],
  },
];

export default function LawyersPage() {
  return (
    <div className="lw-page">
      <CustomCursor />
      <Navbar
        links={LAW_LINKS}
        ctaLabel="Fix My Site"
        ctaHref="#optimization-form"
      />
      <main>
        <Hero />
        <ProblemSection />
        <Services />
        <Statistics />
        <ResultsSection />
        <Partners />
        <StrapiBlogSection
          categorySlug="lawyer"
          accent="var(--lw-accent)"
          heading="Legal"
          headingAccent="Insights."
        />
        <ContactCTA />
      </main>
      <MonkDAFooter
        accent="var(--lw-accent)"
        bg="var(--lw-bg)"
        tagline="Precision engineering for the world's elite law firms. Verdict: Speed."
        entity="MonkDA Legal Optimization"
        cols={LAW_FOOTER_COLS}
        tickers={[
          "60FPS Discovery",
          "Zero-Lag Litigation",
          "MonkDA Legal",
          "Millisecond Discovery",
          "Secure Edge Performance",
        ]}
      />
    </div>
  );
}
