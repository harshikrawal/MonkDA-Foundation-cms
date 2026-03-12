"use client";

import "./automobile.css";
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
   NAV CONFIG
   ════════════════════════════════════════════════════════ */
const AUTO_LINKS = [
  { label: "Problems", href: "#problems" },
  { label: "Efficiency", href: "#results" },
  { label: "Expertise", href: "#services" },
  { label: "Manufacturers", href: "#partners" },
  { label: "Journal", href: "#journal" },
  { label: "Optimize", href: "#optimization-form" },
];

/* ════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════ */
const autoOptimizationProblems = [
  {
    id: "asset-bloat",
    title: "High-Res Asset Bloat",
    desc: "4K car configurators and high-fidelity video b-rolls are killing your speed. We deliver 8K quality at 200KB payloads.",
    icon: "",
  },
  {
    id: "configurator-lag",
    title: "Configurator Stutter",
    desc: "Interactive 360° views often lag on mobile. We use GPU-accelerated rendering to ensure silky smooth customization.",
    icon: "",
  },
  {
    id: "showroom-bounce",
    title: "Showroom Drop-off",
    desc: "If your virtual showroom doesn't load in under 2 seconds, 40% of luxury buyers leave for a competitor.",
    icon: "",
  },
  {
    id: "global-cdn",
    title: "Global Latency",
    desc: "Manufacturers serving global markets often face latency issues. We implement edge-delivered caching for instant access.",
    icon: "",
  },
];

const autoOptimizationServices = [
  {
    id: "visuals",
    title: "Visual Fidelity",
    tags: ["WebP/Avif", "Dynamic Sizing", "Lazy-Loading", "HDR Color"],
    desc: "We prioritize visual impact while minimizing data footprints. Your cars look better, your site runs faster.",
    gradient: "linear-gradient(135deg,#0c0c0e 0%,#1a1018 60%,#2d0a06 100%)",
    image: "/auto-visual-fidelity.png",
  },
  {
    id: "interactivity",
    title: "Fluid Motion",
    tags: ["Canvas API", "WebGL Opt.", "Smooth Scroll", "Micro-Anims"],
    desc: "Interactive elements should feel like driving a supercar—responsive and precise. No input lag, ever.",
    gradient: "linear-gradient(135deg,#0c0c0e 0%,#1c100c 60%,#3d1000 100%)",
    image: "/auto-fluid-motion.png",
  },
  {
    id: "conversions",
    title: "Lead Capture",
    tags: ["Booking API", "Form UX", "Instant Feedback", "CRM Sync"],
    desc: "We bridge the gap between digital window shopping and confirmed test drives with high-CRO form design.",
    gradient: "linear-gradient(135deg,#0c0c0e 0%,#101420 60%,#0a1a30 100%)",
    image: "/auto-lead-capture.png",
  },
];

const beforeAfterCars = [
  {
    id: 1,
    name: "Elite Motors Portal",
    year: "Before: 7.4s",
    label: "Optimized",
    type: "After: 0.9s",
    price: "+85% Test Drives",
    location: "MonkDA Performance Division",
    desc: "Optimized interactive 3D configurator and high-res inventory filters.",
    bg: "/auto-showroom.png",
    large: true,
  },
  {
    id: 2,
    name: "Volta Global",
    year: "Before: 5.2s",
    label: "Optimized",
    type: "After: 1.2s",
    price: "+150% Mobile Traffic",
    location: "MonkDA Tech Division",
    desc: "Fixed rendering bottlenecks in mobile view for the EV Saloon launch.",
    bg: "/auto-hero.png",
    large: false,
  },
];

const autoStats = [
  {
    num: "0.2s",
    unit: "TTL",
    label: "Time to Lead",
    desc: "Average response time for inventory search queries after optimization.",
    color: "linear-gradient(135deg,#1c0800,#3d1000,#550e00)",
  },
  {
    num: "400%",
    unit: "ROI",
    label: "Efficiency",
    desc: "Average increase in configurator completion rates for dealerships.",
    color: "linear-gradient(135deg,#0c0c0e,#1c1018,#2a0c0a)",
  },
  {
    num: "98/100",
    unit: "Score",
    label: "Mobile Performance",
    desc: "Target Lighthouse metric achieved for global manufacturer portals.",
    color: "linear-gradient(135deg,#0c0c0e,#0a1a30,#0d2545)",
  },
];

const autoPartners = [
  "Ferrari",
  "McLaren",
  "Lamborghini",
  "Porsche",
  "Tesla",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Aston Martin",
  "Bentley",
];

const autoTestimonials = [
  {
    quote:
      "Wait times on our high-res configurator were costing us thousands in lost leads. MonkDA optimized our primary sales page for $1 and the results were undeniable. We've scaled our partnership since.",
    name: "Sebastian V.",
    title: "Head of Digital, Global OEM",
    bg: "#f5ece8",
  },
  {
    quote:
      "The raw immediacy of our new mobile inventory search is staggering. MonkDA has bridged the gap between digital browsing and showroom visits.",
    name: "Elena G.",
    title: "Luxury Dealership Owner",
    bg: "#eef2f5",
  },
];

const autoArticles = [
  {
    cat: "Optimization",
    title:
      "Decreasing configurator lag: Why 60fps matters for high-end automotive leads",
    slug: "#",
  },
  {
    cat: "Mobile",
    title:
      "Mobile-first inventory: How dealerships are losing 40% of traffic to slow load times",
    slug: "#",
  },
  {
    cat: "Efficiency",
    title: "MonkDA Volta E vs the world: how our optimized EV portal stacks up",
    slug: "#",
  },
  {
    cat: "Performance",
    title:
      "Web Vitals for Manufacturers: The 2025 algorithm update survival guide",
    slug: "#",
  },
];

/* ════════════════════════════════════════════════════════
   SECTION: HERO
   ════════════════════════════════════════════════════════ */
function Hero() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const fn = () => setOffset(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const { ref, visible } = useReveal(0.01);

  return (
    <section className="ap-hero">
      <div
        className="ap-hero-bg"
        style={{ transform: `translateY(${offset * 0.28}px)` }}
      />
      <div className="ap-hero-overlay" />
      <HeroParticles theme="automobile" />

      <div className="ap-container">
        <div
          ref={ref}
          className={`ap-hero-inner ap-reveal${visible ? " ap-revealed" : ""}`}
        >
          <p className="ap-hero-eyebrow">
            MonkDA · High-Performance Web Engineering
          </p>

          <h1 className="ap-hero-heading">
            <span>Precision</span>
            <span>
              at <em>Scale.</em>
            </span>
          </h1>

          <p className="ap-hero-sub">
            We optimize high-fidelity automotive platforms for zero-lag
            performance. From interactive configurators to global inventory
            portals, we deliver the edge.
          </p>

          <div className="ap-hero-actions">
            <a href="#optimization-form" className="ap-btn ap-btn--red">
              Get My $1 Optimization <span className="ap-btn-arrow">↗</span>
            </a>
          </div>

          <div className="ap-hero-stats">
            {[
              { num: "0.4", suf: "s", label: "LCP Target" },
              { num: "99", suf: "/100", label: "Speed Score" },
              { num: "100", suf: "%", label: "Image Perf" },
              { num: "0.2", suf: "s", label: "Search TTL" },
            ].map((s) => (
              <div key={s.label} className="ap-hero-stat-item">
                <span className="ap-hero-stat-num">
                  {s.num}
                  <span>{s.suf}</span>
                </span>
                <span className="ap-hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="ap-scroll-hint">
        <span className="ap-scroll-line" />
        <span className="ap-scroll-label">Scroll</span>
      </div> */}
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: EXPERTISE
   ════════════════════════════════════════════════════════ */
function Services() {
  const { ref, visible } = useReveal();
  return (
    <section className="ap-collections" id="services">
      <div className="ap-container">
        <div
          ref={ref}
          className={`ap-section-header ap-reveal${visible ? " ap-revealed" : ""}`}
        >
          <h2 className="ap-large-heading" style={{ color: "var(--ap-white)" }}>
            <span>Engineering</span>
            <span className="ap-lh-indent">The Edge</span>
          </h2>
          <div className="ap-section-arrow">↘</div>
        </div>
      </div>

      <div className="ap-collection-panels">
        <div className="ap-container">
          {autoOptimizationServices.map((col, i) => {
            const { ref: cref, visible: cvis } = useReveal(); // eslint-disable-line
            return (
              <div
                key={col.id}
                ref={cref}
                className={`ap-collection-panel ap-reveal${cvis ? " ap-revealed" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="ap-collection-text">
                  <h3 className="ap-collection-heading">{col.title}</h3>
                  <div className="ap-collection-tags">
                    {col.tags.map((t) => (
                      <span key={t} className="ap-collection-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="ap-collection-desc">{col.desc}</p>
                </div>
                <div
                  className="ap-collection-visual"
                  style={{ background: col.gradient }}
                >
                  {col.image && (
                    <Image
                      src={col.image}
                      alt={col.title}
                      width={800}
                      height={600}
                      className="ap-collection-img"
                    />
                  )}
                  <div className="ap-collection-visual-inner">
                    <span className="ap-collection-num">0{i + 1}</span>
                    <span className="ap-collection-visual-label">
                      {col.title}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: PROBLEMS
   ════════════════════════════════════════════════════════ */
function ProblemSection() {
  const { ref, visible } = useReveal();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="ap-philosophy" id="problems">
      <div className="ap-container">
        <div className="ap-philosophy-grid">
          <h2
            ref={ref}
            className={`ap-philosophy-heading ap-reveal${visible ? " ap-revealed" : ""}`}
          >
            The Critical{"\n"}
            <em>Bottlenecks.</em>
          </h2>

          <div className="ap-philosophy-items ap-stagger">
            {autoOptimizationProblems.map((item, i) => (
              <div key={item.id} className="ap-phil-item">
                <button
                  className="ap-phil-trigger"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <div className="ap-phil-trigger-left">
                    <span className="ap-phil-num">0{i + 1}/</span>
                    <h3 className="ap-phil-item-heading">{item.title}</h3>
                  </div>
                  <span
                    className={`ap-phil-icon ${open === i ? "ap-phil-icon--open" : ""}`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`ap-phil-body ${open === i ? "ap-phil-body--open" : ""}`}
                >
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION: $1 OFFER ───────────────────────────── */
function OfferSection() {
  const { ref, visible } = useReveal();
  return (
    <section
      className="ap-performance"
      id="offer"
      style={{
        position: "relative",
        borderBottom: "1px solid var(--ap-border)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/auto-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
          filter: "grayscale(100%) brightness(0.5)",
          pointerEvents: "none",
        }}
      />
      <div className="ap-container" style={{ paddingBlock: "8rem" }}>
        <div ref={ref} className={`ap-reveal${visible ? " ap-revealed" : ""}`}>
          <h2 className="ap-large-heading">
            <span>One Portal.</span>
            <span
              className="ap-lh-indent"
              style={{ color: "var(--ap-red)", fontStyle: "italic" }}
            >
              Just $1.
            </span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "4rem",
              marginTop: "3rem",
            }}
          >
            <p className="ap-hero-sub">
              The automotive buyer journey starts online. If your configurator
              stalls or 4K assets take seconds to load, you're losing
              high-intent prospects before they hit the showroom.
            </p>
            <p className="ap-hero-sub">
              We'll optimize your most mission-critical page for $1. If the
              performance gains don't blow you away, we won't charge you another
              cent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: RESULTS
   ════════════════════════════════════════════════════════ */
function ResultsSection() {
  const { ref, visible } = useReveal();
  return (
    <section className="ap-showroom" id="results">
      <div className="ap-container">
        <div
          ref={ref}
          className={`ap-showroom-header ap-reveal${visible ? " ap-revealed" : ""}`}
        >
          <h2 className="ap-large-heading" style={{ color: "var(--ap-white)" }}>
            <span>Proven</span>
            <span className="ap-lh-indent ap-lh-red">Outcomes</span>
          </h2>
          <div style={{ paddingBottom: "0.5rem" }}>
            <p className="ap-showroom-sub-heading">Efficiency by design.</p>
            <p className="ap-showroom-sub-text">
              Real-world metrics from optimized dealership systems and
              manufacturer portals.
            </p>
          </div>
        </div>
      </div>

      <div className="ap-container">
        <div className="ap-car-grid">
          {beforeAfterCars.map((car) => (
            <div
              key={car.id}
              className={`ap-car-card${car.large ? " ap-car-card--large" : ""}`}
            >
              <div className="ap-car-card-label-row">
                <h3 className="ap-car-card-name">{car.name}</h3>
                <span className="ap-car-card-year">{car.year}</span>
              </div>
              <div
                className="ap-car-img"
                style={{
                  backgroundImage: `url(${car.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="ap-car-overlay">
                  <p className="ap-car-desc">{car.desc}</p>
                  <ul className="ap-car-tags">
                    <li>{car.type}</li>
                    <li>{car.location}</li>
                    <li>{car.label}</li>
                  </ul>
                </div>
                <div className="ap-car-price-badge">{car.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: PERFORMANCE STATS
   ════════════════════════════════════════════════════════ */
function Performance() {
  const [active, setActive] = useState(0);
  const { ref, visible } = useReveal();
  useEffect(() => {
    const t = setInterval(
      () => setActive((p) => (p + 1) % autoStats.length),
      3000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className="ap-perf" id="performance">
      <div
        ref={ref}
        className={`ap-container ap-reveal${visible ? " ap-revealed" : ""}`}
      >
        <h2 className="ap-large-heading" style={{ color: "var(--ap-white)" }}>
          <span>The</span>
          <span className="ap-lh-indent ap-lh-red">Numbers</span>
        </h2>
      </div>

      <div className="ap-container">
        <div className="ap-perf-track">
          {autoStats.map((s, i) => (
            <div
              key={i}
              className={`ap-perf-card${active === i ? " ap-perf-card--active" : ""}`}
              onClick={() => setActive(i)}
              style={{
                background: s.color,
                transform:
                  active === i
                    ? "scale(1) translateZ(0)"
                    : `scale(0.88) translateZ(${-80 * Math.abs(active - i)}px)`,
                opacity:
                  active === i
                    ? 1
                    : Math.max(0.35, 0.6 - Math.abs(active - i) * 0.15),
              }}
            >
              <div className="ap-perf-card-inner">
                <span className="ap-perf-label">{s.label}</span>
                <div className="ap-perf-number">
                  {s.num}
                  <span>.</span>
                </div>
                <div className="ap-perf-unit">{s.unit}</div>
                <p className="ap-perf-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="ap-perf-dots">
          {autoStats.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`ap-perf-dot${active === i ? " ap-perf-dot--active" : ""}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: PARTNERS
   ════════════════════════════════════════════════════════ */
function Partners() {
  const { ref, visible } = useReveal();
  return (
    <section className="ap-partners" id="partners">
      <div
        ref={ref}
        className={`ap-container ap-reveal${visible ? " ap-revealed" : ""}`}
      >
        <div className="ap-partners-header">
          <h2 className="ap-large-heading" style={{ color: "var(--ap-white)" }}>
            <span>Portal</span>
            <span className="ap-lh-indent ap-lh-red">Network</span>
          </h2>
          <div className="ap-section-arrow">↘</div>
        </div>
        <div className="ap-partners-grid">
          {autoPartners.map((p) => (
            <div key={p} className="ap-partner-cell">
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION: TRUST & SECURITY ───────────────────── */
function TrustSection() {
  const { ref, visible } = useReveal();
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
      <div className="ap-container">
        <div
          ref={ref}
          className={`ap-reveal${visible ? " ap-revealed" : ""}`}
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
                  "radial-gradient(circle at 50% 50%, #dc262620 0%, transparent 70%)",
                filter: "blur(40px)",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "relative",
                borderRadius: "2.5rem",
                overflow: "hidden",
                border: "1px solid rgba(220,38,38,0.2)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
                zIndex: 1,
              }}
            >
              <Image
                src="/security.png"
                alt="Automotive Data Security"
                width={800}
                height={600}
                style={{ objectFit: "cover", width: "100%", height: "auto" }}
              />
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <h3
              className="ap-large-heading"
              style={{
                fontSize: "clamp(3rem, 5vw, 4.5rem)",
                marginBottom: "2.5rem",
                color: "#dc2626",
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
                className="ap-hero-sub"
                style={{ opacity: 0.95, color: "#fff", margin: 0 }}
              >
                We prioritize your intellectual property. Our optimizations only
                require staging or restricted contributor access.
              </p>
              <p
                className="ap-hero-sub"
                style={{
                  opacity: 0.65,
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                Sensitive inventory data, customer CRM records, and transaction
                histories are never accessed, stored, or processed. Your
                manufacturer portal remains a fortress, while we refine the
                machinery behind the scenes.
              </p>

              <div
                style={{ marginTop: "1rem", display: "flex", gap: "1.5rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.3rem",
                  }}
                >
                  <span
                    style={{
                      color: "#dc2626",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                  >
                    01/
                  </span>
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                    }}
                  >
                    Restricted Access
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
                    gap: "0.3rem",
                  }}
                >
                  <span
                    style={{
                      color: "#dc2626",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                  >
                    02/
                  </span>
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                    }}
                  >
                    Encrypted Ops
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

/* ════════════════════════════════════════════════════════
   SECTION: TESTIMONIALS
   ════════════════════════════════════════════════════════ */
function Testimonials() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const { ref, visible } = useReveal();

  const next = useCallback(() => {
    const newIdx = (active + 1) % autoTestimonials.length;
    setActive(newIdx);
    if (trackRef.current) {
      const card = trackRef.current.children[newIdx] as HTMLElement;
      card?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [active]);

  return (
    <section className="ap-testimonials" id="testimonials">
      <div
        ref={ref}
        className={`ap-container ap-reveal${visible ? " ap-revealed" : ""}`}
      >
        <h2 className="ap-testimonials-heading">
          Client
          <br />
          Directives.
        </h2>
        <div ref={trackRef} className="ap-test-track">
          {autoTestimonials.map((t, i) => (
            <div
              key={i}
              className="ap-test-card"
              style={{ background: t.bg }}
              onClick={() => setActive(i)}
            >
              <div>
                <div className="ap-test-stars-empty" />
                <p className="ap-test-quote">{t.quote}</p>
              </div>
              <div>
                <strong className="ap-test-name">{t.name}</strong>
                <span className="ap-test-title">{t.title}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="ap-test-next" onClick={next}>
          Next directive →
        </button>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: JOURNAL
   ════════════════════════════════════════════════════════ */
function Journal() {
  const { ref, visible } = useReveal();
  return (
    <section className="ap-journal" id="journal">
      <div
        ref={ref}
        className={`ap-container ap-reveal${visible ? " ap-revealed" : ""}`}
      >
        <div className="ap-journal-header">
          <p className="ap-journal-eyebrow">Technical Journal</p>
          <a href="#" className="ap-btn ap-btn--outline">
            All articles →
          </a>
        </div>
        <div className="ap-journal-grid">
          {autoArticles.map((a, i) => (
            <a key={i} href={a.slug} className="ap-journal-card">
              <div
                className="ap-journal-img"
                style={{
                  background: `linear-gradient(135deg, hsl(${i * 20},60%,${8 + i * 3}%), hsl(${i * 20 + 15},50%,${14 + i * 2}%))`,
                }}
              >
                <span className="ap-journal-cat-badge">{a.cat}</span>
              </div>
              <div className="ap-journal-body">
                <p className="ap-journal-cat">{a.cat}</p>
                <h3 className="ap-journal-title">{a.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: $1 LEAD FORM
   ════════════════════════════════════════════════════════ */
function ContactCTA() {
  const { ref, visible } = useReveal();
  return (
    <section className="ap-cta-section" id="optimization-form">
      <div
        ref={ref}
        className={`ap-container ap-reveal${visible ? " ap-revealed" : ""}`}
      >
        <p className="ap-cta-eyebrow">Ready for $1?</p>
        <h2 className="ap-cta-heading">
          Optimize your
          <br />
          automotive <em>portal.</em>
        </h2>

        <div
          style={{
            marginTop: "4rem",
            background: "rgba(255,255,255,0.03)",
            padding: "4rem",
            borderRadius: "2rem",
            border: "1px solid var(--ap-border)",
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
                placeholder="John Wick"
                style={{
                  padding: "1rem",
                  background: "rgba(0,0,0,0.3)",
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
                placeholder="john@automotive.com"
                style={{
                  padding: "1rem",
                  background: "rgba(0,0,0,0.3)",
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
                placeholder="https://dealership.com"
                style={{
                  padding: "1rem",
                  background: "rgba(0,0,0,0.3)",
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
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "0.5rem",
                  color: "#fff",
                  outline: "none",
                  appearance: "none",
                }}
              >
                <option>OEM Manufacturer</option>
                <option>Luxury Dealership</option>
                <option>Automotive Tech</option>
                <option>Performance Shop</option>
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1", marginTop: "1rem" }}>
              <button
                className="ap-btn ap-btn--red"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Optimize My Portal for $1
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   PAGE ROOT
════════════════════════════════════════════════════════ */
const AUTO_FOOTER_COLS = [
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
      { label: "Technical Journal", href: "#journal" },
      { label: "Security", href: "#security" },
      { label: "Contact", href: "https://www.monkda.com/contact" },
    ],
  },
];

export default function AutomobilePage() {
  return (
    <div className="ap-page">
      <CustomCursor />
      <Navbar
        links={AUTO_LINKS}
        ctaLabel="Get $1 Fix"
        ctaHref="#optimization-form"
      />
      <main>
        <Hero />
        <ProblemSection />
        <OfferSection />
        <Services />
        <ResultsSection />
        <Performance />
        <Partners />
        <TrustSection />
        <Testimonials />
        <StrapiBlogSection
          categorySlug="automobile"
          accent="var(--ap-red)"
          heading="Automotive"
          headingAccent="Journal."
        />
        <ContactCTA />
      </main>
      <MonkDAFooter
        accent="var(--ap-red)"
        bg="var(--ap-black)"
        tagline="The performance engine for the automotive elite. Precision at scale."
        entity="MonkDA Automotive Optimization"
        cols={AUTO_FOOTER_COLS}
        tickers={[
          "MonkDA Optimization",
          "60FPS Configurators",
          "Precision Web",
          "Automotive Elite",
          "Results That Speak",
          "Performance by Design",
        ]}
      />
    </div>
  );
}
