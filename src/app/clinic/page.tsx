"use client";

import "./clinic.css";
import { useEffect, useRef, useState, useCallback } from "react";
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
const CLINIC_LINKS = [
  { label: "Problems", href: "#problems" },
  { label: "Expertise", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Partners", href: "#partners" },
  { label: "Security", href: "#security" },
  { label: "Optimize", href: "#optimization-form" },
];

const clinicProblems = [
  {
    id: "medical-imaging",
    num: "01/",
    title: "Imaging Payload Lag",
    desc: "DICOM, MRI, and high-fidelity medical scans often stall on patient portals. We optimize rendering for instant viewing.",
  },
  {
    id: "appointment-bounce",
    num: "02/",
    title: "Booking Friction",
    desc: "If your appointment system lags, patients leave. We reduce search-to-confirm TTL for seamless booking.",
  },
  {
    id: "hipaa-compliant",
    num: "03/",
    title: "Secure Data Flow",
    desc: "HIPAA-compliant platforms need speed without compromising encryption. We deliver both at once.",
  },
  {
    id: "telemed-latency",
    num: "04/",
    title: "Telemed Latency",
    desc: "Global clinics require zero-lag connections for virtual consultations. We leverage edge caching for the fluid clinic.",
  },
];

const clinicServices = [
  {
    id: "patient-ux",
    title: "Patient Experience",
    tags: [
      "Fluid UI",
      "Mobile Friendly",
      "Low Interaction Lag",
      "Instant Search",
    ],
    desc: "Improving the digital bedside manner starts with a fast, responsive interface. No patient should ever wait for a page to load.",
    gradient: "linear-gradient(135deg,#0c0c0e 0%,#0ea5e910 60%,#0ea5e920 100%)",
    image: "/clinic-patient-ux.png",
  },
  {
    id: "record-sys",
    title: "EMR Integration",
    tags: ["HIPAA Ready", "API Opt.", "Real-time Sync", "Encrypted Cache"],
    desc: "We bridge the gap between heavy legacy record systems and fast modern web interfaces with precision engineering.",
    gradient: "linear-gradient(135deg,#0c0c0e 0%,#0d1a38 60%,#0a1a30 100%)",
    image: "/clinic-emr-sys.png",
  },
];

const beforeAfterClinics = [
  {
    id: 1,
    name: "St. Jude Specialist Portal",
    year: "Before: 8.2s",
    label: "Optimized",
    type: "After: 0.7s",
    price: "+120% Patient Engagement",
    location: "Global Healthcare",
    desc: "Optimized complex appointment logic and heavy medical imaging dashboards.",
    bg: "/clinic-reception.jpg",
    large: true,
  },
  {
    id: 2,
    name: "TeleCare Global",
    year: "Before: 5.4s",
    label: "Optimized",
    type: "After: 0.9s",
    price: "+65% Booking Rate",
    location: "Specialty Clinic",
    desc: "Optimized mobile-first portal for remote consultation and record access.",
    bg: "/clinic-tech.jpg",
    large: false,
  },
];

const clinicStats = [
  {
    num: "0.4s",
    unit: "LCP",
    label: "Patient Trust",
    desc: "Largest Contentful Paint achieved for multi-region clinic networks.",
    color: "linear-gradient(135deg,#0c0c0e,#0d1a38,#0a1a30)",
  },
  {
    num: "100%",
    unit: "Secure",
    label: "Encrypted Opt.",
    desc: "Full HIPAA compliance maintained while achieving 99/100 Lighthouse scores.",
    color: "linear-gradient(135deg,#0c0c0e,#0ea5e910,#0ea5e920)",
  },
];

const clinicPartners = [
  "Mount Sinai",
  "Mayo Clinic",
  "Cleveland Clinic",
  "HCA Healthcare",
  "Johns Hopkins",
  "Kaiser Permanente",
  "UnitedHealth",
  "Aetna",
  "Providence",
  "Tenet",
];

const clinicProcess = [
  {
    step: "01",
    title: "Surgical Audit",
    desc: "We perform a deep-packet inspection of your portal's load sequence. We identify blocking scripts and redundant asset payloads.",
  },
  {
    step: "02",
    title: "Precision Refactor",
    desc: "We implement our $1 optimization engine to bypass legacy EMR bottlenecks and enable instant data hydration.",
  },
  {
    step: "03",
    title: "Encrypted Deployment",
    desc: "Your optimized system goes live with 100/100 Lighthouse scores, maintaining full HIPAA compliance at the edge.",
  },
];

const clinicArticles = [
  {
    cat: "Medical Tech",
    title:
      "The cost of clinical lag: Why patient portals need 60fps performance",
    slug: "#",
  },
  {
    cat: "Security",
    title: "HIPAA-compliant caching: Speed as a feature in medical data access",
    slug: "#",
  },
  {
    cat: "Imaging",
    title:
      "Instant DICOM rendering: Optimizing heavy medical assets for the web",
    slug: "#",
  },
];

const clinicTestimonials = [
  {
    quote:
      "Patient no-shows dropped by 45% after we optimized the mobile booking flow for $1. MonkDA understands the healthcare friction points like no one else.",
    name: "Dr. Sarah Chen",
    title: "Chief Medical Officer, TeleHealth Group",
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
    <section className="cl-hero">
      <div
        className="cl-hero-bg"
        style={{ transform: `translateY(${offset * 0.3}px)` }}
      />
      <HeroParticles theme="clinic" />
      <div className="cl-container">
        <div className="cl-hero-inner">
          <p className="cl-hero-eyebrow">
            MonkDA · Clinical Systems Optimization
          </p>
          <h1 className="cl-hero-heading">
            <span>Precision</span>
            <span>
              Care <em>at Scale.</em>
            </span>
          </h1>
          <p className="cl-hero-sub">
            We optimize mission-critical healthcare platforms for zero-lag
            performance. From complex patient portals to EMR record systems, we
            deliver the engineering edge.
          </p>
          <div className="cl-hero-actions">
            <a href="#optimization-form" className="cl-btn cl-btn--primary">
              Optimize My System for $1{" "}
              <span style={{ marginLeft: "1rem" }}>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { ref, visible } = useReveal();
  return (
    <section className="cl-section" id="services">
      <div className="cl-container">
        <h2
          className={`cl-large-heading cl-reveal${visible ? " cl-revealed" : ""}`}
          ref={ref}
        >
          <span>Clinical</span>
          <span className="cl-lh-indent cl-lh-accent">Expertise.</span>
        </h2>
        <div className="cl-services-panels">
          {clinicServices.map((s, i) => (
            <div key={s.id} className="cl-service-panel">
              <div className="cl-service-text">
                <h3 className="cl-service-heading">{s.title}</h3>
                <div className="cl-service-tags">
                  {s.tags.map((t) => (
                    <span key={t} className="cl-service-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="cl-card-desc">{s.desc}</p>
              </div>
              <div
                className="cl-service-visual"
                style={{ background: s.gradient }}
              >
                {s.image && (
                  <Image
                    src={s.image}
                    alt={s.title}
                    width={800}
                    height={600}
                    className="cl-service-img"
                  />
                )}
                <span
                  style={{
                    fontSize: "5rem",
                    opacity: 0.1,
                    fontWeight: 900,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  0{i + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const { ref, visible } = useReveal();
  return (
    <section className="cl-section" id="problems">
      <div className="cl-container">
        <h2
          className={`cl-large-heading cl-reveal${visible ? " cl-revealed" : ""}`}
          ref={ref}
        >
          <span>Critical</span>
          <span className="cl-lh-indent cl-lh-accent">Break-points.</span>
        </h2>
        <div className="cl-grid">
          {clinicProblems.map((p, i) => (
            <div key={p.id} className="cl-card">
              <span className="cl-card-num">{p.num}</span>
              <h3 className="cl-card-heading">{p.title}</h3>
              <p className="cl-card-desc">{p.desc}</p>
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
    <section className="cl-section">
      <div className="cl-container">
        <div className="cl-stats-grid">
          {clinicStats.map((s, i) => (
            <div
              key={i}
              className="cl-stat-card"
              style={{ background: s.color + "10" }}
            >
              <div className="cl-stat-num">
                {s.num}
                <span>.</span>
              </div>
              <span className="cl-stat-label">{s.label}</span>
              <p className="cl-card-desc">{s.desc}</p>
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
      className="cl-section"
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
          backgroundImage: "url('/clinic-corridor.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
          filter: "grayscale(100%) brightness(0.5) hue-rotate(180deg)",
          pointerEvents: "none",
        }}
      />
      <div className="cl-container" style={{ position: "relative", zIndex: 1 }}>
        <h2 className="cl-large-heading">
          <span>One System.</span>
          <span
            className="cl-lh-indent cl-lh-accent"
            style={{ fontStyle: "italic" }}
          >
            Just $1.
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
          <p className="cl-hero-sub">
            Patients expect the same speed from their healthcare provider as
            they do from luxury commerce. If your portal lags, trust erodes.
          </p>
          <p className="cl-hero-sub">
            We'll optimize your most mission-critical patient landing page or
            dashboard for $1. Results that speak for themselves.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const { ref, visible } = useReveal();
  return (
    <section className="cl-section" id="process">
      <div className="cl-container">
        <h2
          className={`cl-large-heading cl-reveal${visible ? " cl-revealed" : ""}`}
          ref={ref}
        >
          <span>The</span>
          <span className="cl-lh-indent cl-lh-accent">Surgical Sprint.</span>
        </h2>
        <div className="cl-grid">
          {clinicProcess.map((p) => (
            <div key={p.step} className="cl-card">
              <span className="cl-card-num">{p.step}/</span>
              <h3 className="cl-card-heading">{p.title}</h3>
              <p className="cl-card-desc">{p.desc}</p>
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
    <section className="cl-section" id="results">
      <div className="cl-container">
        <div ref={ref} className={`cl-reveal${visible ? " cl-revealed" : ""}`}>
          <h2 className="cl-large-heading">
            <span>Proven</span>
            <span className="cl-lh-indent cl-lh-accent">Recovery.</span>
          </h2>
        </div>
        <div
          className="cl-grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          }}
        >
          {beforeAfterClinics.map((c) => (
            <div
              key={c.id}
              className="cl-card"
              style={{
                padding: 0,
                overflow: "hidden",
                position: "relative",
                height: "450px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${c.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.5) grayscale(100%) blur(2px)",
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  padding: "3rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3 className="cl-card-heading">{c.name}</h3>
                  <span
                    style={{ color: "var(--cl-accent)", fontWeight: "700" }}
                  >
                    {c.year}
                  </span>
                </div>
                <div>
                  <p
                    className="cl-card-desc"
                    style={{ color: "#fff", marginBottom: "1.5rem" }}
                  >
                    {c.desc}
                  </p>
                  <div
                    style={{
                      background: "var(--cl-accent)",
                      color: "#000",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      display: "inline-block",
                      fontWeight: "700",
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
    <section className="cl-section" id="partners">
      <div className="cl-container">
        <h2
          className={`cl-large-heading cl-reveal${visible ? " cl-revealed" : ""}`}
          ref={ref}
        >
          <span>Clinical</span>
          <span className="cl-lh-indent cl-lh-accent">Network.</span>
        </h2>
        <div className="cl-partners-grid">
          {clinicPartners.map((p) => (
            <div key={p} className="cl-partner-cell">
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="cl-section">
      <div className="cl-container">
        {clinicTestimonials.map((t, i) => (
          <div key={i} className="cl-testimonial-card">
            <p className="cl-quote">"{t.quote}"</p>
            <span className="cl-author">{t.name}</span>
            <span className="cl-author-title">{t.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Journal() {
  const { ref, visible } = useReveal();
  return (
    <section className="cl-section" id="journal">
      <div className="cl-container">
        <h2
          className={`cl-large-heading cl-reveal${visible ? " cl-revealed" : ""}`}
          ref={ref}
        >
          <span>Medical</span>
          <span className="cl-lh-indent cl-lh-accent">Insights.</span>
        </h2>
        <div className="cl-journal-grid">
          {clinicArticles.map((a, i) => (
            <a key={i} href={a.slug} className="cl-article-card">
              <span className="cl-article-cat">{a.cat}</span>
              <h3 className="cl-article-title">{a.title}</h3>
              <span
                className="cl-author"
                style={{ fontSize: "0.85rem", marginTop: "2rem" }}
              >
                Read Article ↗
              </span>
            </a>
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
      title: "Edge Hydration",
      desc: "We move patient data hydration to the edge, reducing TTFB for complex EMR records by 80%.",
    },
    {
      title: "DICOM Streaming",
      desc: "Our proprietary lazy-loading engine for medical imaging ensures scans are interactive before they finish downloading.",
    },
    {
      title: "Encrypted Caching",
      desc: "Stateless caching layers that maintain full HIPAA isolation while delivering millisecond response times.",
    },
    {
      title: "Core Web Vitals+",
      desc: "We don't just hit 100/100; we optimize for real-world low-power devices in remote clinical settings.",
    },
  ];

  return (
    <section className="cl-section" id="tech-deep-dive">
      <div className="cl-container">
        <h2
          className={`cl-large-heading cl-reveal${visible ? " cl-revealed" : ""}`}
          ref={ref}
        >
          <span>The</span>
          <span className="cl-lh-indent cl-lh-accent">Medical Engine.</span>
        </h2>
        <div className="cl-grid" style={{ marginTop: "5rem" }}>
          {techCards.map((t, i) => (
            <div
              key={i}
              className="cl-card"
              style={{
                background: "rgba(14,165,233,0.03)",
                border: "1px solid rgba(14,165,233,0.1)",
              }}
            >
              <h3 className="cl-card-heading" style={{ fontSize: "1.5rem" }}>
                {t.title}
              </h3>
              <p className="cl-card-desc">{t.desc}</p>
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
      className="cl-section"
      style={{ background: "#060608" }}
    >
      <div className="cl-container">
        <div
          ref={ref}
          className={`cl-reveal${visible ? " cl-revealed" : ""}`}
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
                  "radial-gradient(circle at 50% 50%, #0ea5e920 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <div
              style={{
                position: "relative",
                borderRadius: "2.5rem",
                overflow: "hidden",
                border: "1px solid rgba(14,165,233,0.2)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
              }}
            >
              <Image
                src="/clinic-security.jpg"
                alt="Healthcare Data Security"
                width={800}
                height={600}
                style={{ objectFit: "cover", width: "100%", height: "auto" }}
              />
            </div>
          </div>
          <div>
            <h3
              className="cl-large-heading"
              style={{ color: "var(--cl-accent)", marginBottom: "2rem" }}
            >
              Total Patient <br />
              <span style={{ color: "#fff", fontStyle: "italic" }}>
                Privacy.
              </span>
            </h3>
            <p className="cl-hero-sub" style={{ fontSize: "1.1rem" }}>
              HIPAA and GDPR compliance are built into our optimization
              workflow. We only require staging access or restricted API tokens
              for performance tuning.
            </p>
            <p className="cl-hero-sub" style={{ fontSize: "1.1rem" }}>
              No PHI (Protected Health Information), patient records, or billing
              data are ever accessed or stored. Your clinical fortress remains
              impenetrable while we refine the machinery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  const { ref, visible } = useReveal();
  return (
    <section className="cl-section" id="optimization-form">
      <div className="cl-container">
        <div ref={ref} className={`cl-reveal${visible ? " cl-revealed" : ""}`}>
          <p className="cl-hero-eyebrow">Ready for $1?</p>
          <h2 className="cl-hero-heading" style={{ marginBottom: "4rem" }}>
            Optimize your
            <br />
            clinical <em>portal.</em>
          </h2>

          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              padding: "4rem",
              borderRadius: "2rem",
              border: "1px solid var(--cl-border)",
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
                placeholder="Clinic Name"
                style={{
                  padding: "1rem",
                  background: "#000",
                  border: "1px solid var(--cl-border)",
                  borderRadius: "0.5rem",
                  color: "#fff",
                }}
              />
              <input
                type="email"
                placeholder="Work Email"
                style={{
                  padding: "1rem",
                  background: "#000",
                  border: "1px solid var(--cl-border)",
                  borderRadius: "0.5rem",
                  color: "#fff",
                }}
              />
              <input
                type="url"
                placeholder="Portal URL"
                style={{
                  padding: "1rem",
                  background: "#000",
                  border: "1px solid var(--cl-border)",
                  borderRadius: "0.5rem",
                  color: "#fff",
                }}
              />
              <button
                className="cl-btn cl-btn--primary"
                style={{ gridColumn: "1 / -1", justifyContent: "center" }}
              >
                Optimize Dashboard for $1
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   PAGE ROOT
   ════════════════════════════════════════════════════════ */
const CLINIC_FOOTER_COLS = [
  {
    title: "Services",
    links: [
      { label: "Site Audit", href: "#problems" },
      { label: "Portal Opt.", href: "#results" },
      { label: "EMR Speed", href: "#services" },
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
      { label: "Medical Journal", href: "#" },
      { label: "HIPAA Security", href: "#security" },
      { label: "Contact", href: "#optimization-form" },
    ],
  },
];

export default function ClinicPage() {
  return (
    <div className="cl-page">
      <CustomCursor />
      <Navbar
        links={CLINIC_LINKS}
        ctaLabel="Get $1 Fix"
        ctaHref="#optimization-form"
      />
      <main>
        <Hero />
        <ProblemSection />
        <Services />
        <OfferSection />
        <TechnicalDeepDive />
        <ProcessSection />
        <Statistics />
        <ResultsSection />
        <Partners />
        <Testimonials />
        <TrustSection />
        <StrapiBlogSection
          categorySlug="clinic"
          accent="var(--cl-accent)"
          heading="Medical"
          headingAccent="Insights."
        />
        <ContactCTA />
      </main>
      <MonkDAFooter
        accent="var(--cl-accent)"
        bg="var(--cl-bg)"
        tagline="The performance engine for clinical elite. Precision surgery for the web."
        entity="MonkDA Medical Optimization"
        cols={CLINIC_FOOTER_COLS}
        tickers={[
          "Lighthouse 99/100",
          "HIPAA Compliant",
          "MonkDA Clinical",
          "Zero-Lag Portals",
          "Scalable Patient Care",
        ]}
      />
    </div>
  );
}
