"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import HeroParticles from "@/components/HeroParticles";
import MonkDAFooter from "@/components/MonkDAFooter";
import StrapiBlogSection from "@/components/StrapiBlogSection";

/* ─── DATA ────────────────────────────────────────────── */

const badges = [
  { name: "Clutch", rating: "4.9", verified: true, color: "#FF3D2E", brand: "Clutch" },
  { name: "Google", rating: "5.0", verified: true, color: "#4285F4", brand: "Google" },
  { name: "GoodFirms", rating: "4.8", verified: true, color: "#00A651", brand: "GoodFirms" },
  { name: "TechBehemoths", rating: "4.9", verified: true, color: "#4A90D9", brand: "Tech" },
];

const painPoints = [
  { id: "1", title: "Bleeding Revenue", desc: "Every second delay drops conversions by 7%.", icon: "💸" },
  { id: "2", title: "Failing Web Vitals", desc: "Google penalizes your rankings for failing LCP and CLS.", icon: "📉" },
  { id: "3", title: "High Bounce Rate", desc: "53% of mobile users abandon sites taking >3s to load.", icon: "📱" },
  { id: "4", title: "Ads Burning Money", desc: "Low quality scores driving up your CPA on Google Ads.", icon: "🔥" },
  { id: "5", title: "Bloated DOM", desc: "Too many nodes crushing the browser main thread.", icon: "📦" },
  { id: "6", title: "Dead Code Load", desc: "Loading megabytes of unused CSS and JavaScript.", icon: "🗑️" },
  { id: "7", title: "Third-party Drag", desc: "Non-critical tags blocking your main interactions.", icon: "🛑" },
  { id: "8", title: "Image Bloat", desc: "Serving unoptimized JPEGs instead of Next-Gen formats.", icon: "🖼️" },
];

const processSteps = [
  {
    id: "step-1",
    title: "Full Audit in 48 Hrs",
    desc: "Complete Core Web Vitals breakdown & bottleneck discovery.",
    tags: ["LCP", "INP", "CLS", "TTFB"],
  },
  {
    id: "step-2",
    title: "Actionable Fix Report",
    desc: "A step-by-step roadmap prioritizing high-impact wins.",
    tags: ["Effort Matrix", "Code Snippets", "Asset Config"],
  },
  {
    id: "step-3",
    title: "100% Guaranteed",
    desc: "If you find zero value, your $1 is refunded immediately.",
    tags: ["Zero Risk", "No Questions", "Instant Refund"],
  },
];

const cwvData = [
  {
    metric: "Largest Contentful Paint (LCP)",
    before: 6.2,
    after: 0.8,
    unit: "s",
    afterVal: 0.8,
  },
  {
    metric: "Cumulative Layout Shift (CLS)",
    before: 0.8,
    after: 0.02,
    unit: "",
    afterVal: 0.02,
  },
  {
    metric: "Interaction to Nxt Paint (INP)",
    before: 340,
    after: 38,
    unit: "ms",
    afterVal: 38,
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

      <div className="re-container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "4rem", alignItems: "center" }} className="hero-grid">
          <div className="re-hero-inner" style={{ paddingBlock: "2rem", width: "100%" }}>
            <p className="re-hero-eyebrow">Performance Optimization Specialists</p>
            <h1 className="re-hero-heading" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}>
              <span className="re-hero-line">Your slow site</span>
              <span className="re-hero-line re-hero-line--italic" style={{ color: "var(--re-accent)" }}>is bleeding</span>
              <span className="re-hero-line">revenue today.</span>
            </h1>
            <p className="re-hero-sub">
              We'll audit every bottleneck, identify every revenue leak, and hand you a complete prioritized fix roadmap — guaranteed. For exactly one dollar.
            </p>
            <div className="re-hero-actions">
              <a href="#offer" className="re-btn re-btn--primary" style={{ background: "var(--re-accent)", color: "#000" }}>
                Try It for $1 <span className="re-btn-arrow">↗</span>
              </a>
              <a href="#cwv" className="re-btn re-btn--ghost">
                See Results
              </a>
            </div>
            <div className="re-hero-badges" style={{ marginTop: "2rem" }}>
              <span className="re-badge">99/100 Average Speed</span>
              <span className="re-badge">Guaranteed ROI</span>
              <span className="re-badge">Zero Lock-in</span>
            </div>
          </div>
          
          {/* Right value card - Hidden on very small screens, shown as block otherwise */}
          <div style={{ 
            background: "rgba(10, 10, 15, 0.45)", 
            backdropFilter: "blur(16px)", 
            border: "1px solid rgba(255,255,255,0.08)", 
            borderRadius: "1.5rem", 
            padding: "2.5rem",
            maxWidth: "380px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.6)"
          }} className="hidden lg:block re-value-card">
            <h3 style={{ fontFamily: "var(--syne)", fontSize: "1.25rem", color: "var(--re-accent)", marginBottom: "1rem" }}>Your $1 Audit Includes</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1.5rem" }}>
               <span style={{ fontSize: "3rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>$1</span>
               <span style={{ fontSize: "1.2rem", textDecoration: "line-through", color: "rgba(255,255,255,0.4)" }}>$297</span>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.25rem", color: "rgba(255,255,255,0.85)", fontSize: "0.95rem" }}>
              <li style={{ display: "flex", gap: "0.75rem", alignItems: "start" }}>
                <span style={{ color: "var(--re-accent)", fontWeight: "bold" }}>✓</span> Core Web Vitals deep scan
              </li>
              <li style={{ display: "flex", gap: "0.75rem", alignItems: "start" }}>
                <span style={{ color: "var(--re-accent)", fontWeight: "bold" }}>✓</span> Render-blocking resources
              </li>
              <li style={{ display: "flex", gap: "0.75rem", alignItems: "start" }}>
                <span style={{ color: "var(--re-accent)", fontWeight: "bold" }}>✓</span> Image sizing/format errors
              </li>
              <li style={{ display: "flex", gap: "0.75rem", alignItems: "start" }}>
                <span style={{ color: "var(--re-accent)", fontWeight: "bold" }}>✓</span> Prioritized fix roadmap pdf
              </li>
            </ul>
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

/* ─── TRUST BADGES ───────────────────────────────────── */
function Badges() {
  return (
    <section style={{ background: "var(--re-black)", paddingBlock: "5rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="re-container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h3 style={{ fontFamily: "var(--syne)", color: "#fff", fontSize: "1.5rem", marginBottom: "0.5rem" }}>Trusted by Clients. Verified by the Industry.</h3>
          <p style={{ color: "var(--re-muted)", fontSize: "0.9rem" }}>Industry-verified 5-star ratings</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {badges.map(b => (
            <div key={b.name} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "1rem",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              transition: "transform 0.3s ease, border-color 0.3s"
            }} className="hover:-translate-y-2 hover:border-[rgba(255,255,255,0.15)] transition-all">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600, color: b.color, fontSize: "1.1rem" }}>{b.name}</span>
                {b.verified && <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>✓ Verified</span>}
              </div>
              <div style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700, marginTop: "0.5rem" }}>
                {b.rating} <span style={{ color: "var(--re-accent)", fontSize: "1rem", marginLeft: "0.25rem" }}>★★★★★</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>Reviewed on {b.brand}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROBLEM GRID ───────────────────────────────────── */
function ProblemSection() {
  return (
    <section id="problems" style={{ paddingBlock: "10rem", background: "var(--re-mid)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
      <div className="re-container">
        <div className="re-section-header" style={{ marginBottom: "5rem" }}>
          <h2 className="re-large-heading re-large-heading--white">
            <span className="re-lh-line">The Silent</span>
            <span className="re-lh-line re-lh-line--indent">Profit Killers</span>
          </h2>
          <div className="re-section-arrow" style={{ color: "rgba(255,255,255,0.04)" }}>↘</div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "2rem",
        }}>
          {painPoints.map((p) => (
            <div key={p.id} style={{
              background: "rgba(10,10,12,0.6)",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "1rem",
              padding: "2rem",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
            }} className="hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-[var(--re-accent)] transition-all overflow-hidden relative group">
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(212, 175, 110, 0.05), transparent)", opacity: 0, transition: "opacity 0.4s" }} className="group-hover:opacity-100" />
              <div style={{ fontSize: "2rem", marginBottom: "1.25rem", position: "relative", zIndex: 1 }}>{p.icon}</div>
              <h3 style={{ fontFamily: "var(--syne)", fontSize: "1.25rem", color: "#fff", marginBottom: "0.75rem", position: "relative", zIndex: 1 }}>{p.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.6, position: "relative", zIndex: 1 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESS/WHAT YOU GET ───────────────────────────── */
function ProcessSection() {
  return (
    <section className="re-services" id="process" style={{ background: "var(--re-black)", paddingBottom: "10rem", paddingTop: "10rem" }}>
      <div className="re-container">
        <div className="re-section-header">
          <h2 className="re-large-heading re-large-heading--white">
            <span className="re-lh-line">What You</span>
            <span className="re-lh-line re-lh-line--indent">Receive</span>
          </h2>
        </div>
      </div>
      <div className="re-services-panels">
        <div className="re-container">
          {processSteps.map((svc, i) => (
            <div key={svc.id} className="re-service-panel" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="re-service-text" style={{ background: "transparent" }}>
                <h3 className="re-service-heading" style={{ color: "#fff" }}>{svc.title}</h3>
                <div className="re-service-tags">
                  {svc.tags.map(t => (
                    <span key={t} className="re-service-tag" style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>{t}</span>
                  ))}
                </div>
                <p className="re-service-desc" style={{ color: "rgba(255,255,255,0.5)" }}>{svc.desc}</p>
              </div>
              <div className="re-service-visual" style={{ background: \`linear-gradient(135deg, hsl(\${220+i*15}, 30%, 12%), #0a0a0a)\` }}>
                 <div className="re-service-visual-content">
                    <span className="re-service-num">0{i + 1}</span>
                    <span className="re-service-visual-label">{svc.title}</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CWV WIDGETS PROOF ──────────────────────────────── */
function CWVProof() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="cwv" ref={ref} style={{ background: "var(--re-mid)", paddingBlock: "10rem", borderBlock: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="re-container">
        <div style={{ textAlign: "center", marginBottom: "6rem" }}>
           <h2 className="re-large-heading re-large-heading--white" style={{ alignItems: "center" }}>
             <span className="re-lh-line">Live Audit</span>
             <span className="re-lh-line" style={{ color: "var(--re-accent)" }}>Data Insights</span>
           </h2>
           <p style={{ color: "var(--re-muted)", fontSize: "1.1rem", marginTop: "2rem", maxWidth: "600px", marginInline: "auto", lineHeight: 1.6 }}>
             We visualize exactly how Google sees your site. This is an example of what your $1 report uncovers and resolves.
           </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }}>
          {cwvData.map((stat, i) => {
             // Calculate dash offset for animation
             // Perfect score is approx target (e.g. LCP 0.8s is good = >90%, let's use fixed animation ring logic)
             const circleCircumference = 2 * Math.PI * 72; // ~452.39
             // Make them fill up 90%
             const targetOffset = inView ? circleCircumference * 0.1 : circleCircumference;

             return (
               <div key={i} style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(16, 185, 129, 0.15)",
                  borderRadius: "1.5rem",
                  padding: "3rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                  transition: "all 0.5s ease"
               }}>
                  <div style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: "2.5rem", textAlign: "center", minHeight: "2.5rem" }}>
                    {stat.metric}
                  </div>
                  <div style={{ position: "relative", width: "160px", height: "160px" }}>
                    <svg width="160" height="160" viewBox="0 0 160 160" style={{ transform: "rotate(-90deg)" }}>
                      <circle cx="80" cy="80" r="72" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <circle cx="80" cy="80" r="72" fill="none" stroke="#10b981" strokeWidth="8" 
                              strokeDasharray={circleCircumference} 
                              strokeDashoffset={targetOffset} 
                              strokeLinecap="round" 
                              style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s" }} />
                    </svg>
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                       <span style={{ fontSize: "2.75rem", fontFamily: "var(--syne)", fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                         {inView ? stat.afterVal : 0}
                       </span>
                       <span style={{ fontSize: "0.8rem", color: "var(--re-muted)", marginTop: "0.25rem" }}>{stat.unit}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginTop: "3rem", width: "100%", justifyContent: "center" }}>
                     <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "0.75rem", color: "var(--re-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>Before</div>
                        <div style={{ color: "#ef4444", fontWeight: 700, fontSize: "1.1rem" }}>{stat.before}{stat.unit}</div>
                     </div>
                     <div style={{ color: "rgba(255,255,255,0.15)", fontSize: "1.5rem", fontWeight: "300" }}>→</div>
                     <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "0.75rem", color: "var(--re-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>Optimized</div>
                        <div style={{ color: "#10b981", fontWeight: 700, fontSize: "1.1rem" }}>{stat.afterVal}{stat.unit}</div>
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

/* ─── CTA ──────────────────────────────────────────────── */
function OfferSection() {
  return (
    <section id="offer" style={{ position: "relative", background: "var(--re-black)", overflow: "hidden" }}>
      {/* Decorative gradient orb */}
      <div style={{ 
        position: "absolute", 
        width: "600px", height: "600px", 
        background: "radial-gradient(circle, rgba(212, 175, 110, 0.08) 0%, transparent 60%)",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        filter: "blur(60px)",
        pointerEvents: "none"
      }} />

      <div className="re-container" style={{ paddingBlock: "10rem", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.05)", padding: "0.5rem 1.25rem", borderRadius: "99px", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", marginBottom: "2rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          The Decision
        </div>
        <h2 className="re-large-heading re-large-heading--white" style={{ marginBottom: "2rem", alignItems: "center" }}>
          <span className="re-lh-line">Ready to stop</span>
          <span className="re-lh-line re-lh-line--italic" style={{ color: "var(--re-accent)" }}>bleeding revenue?</span>
        </h2>
        <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "600px", margin: "0 auto 3rem", lineHeight: 1.6 }}>
          Get a full $297 performance audit and roadmap for exactly $1. If you don't find it completely transformative, we'll immediately refund it. No forms processing.
        </p>
        <a href="https://buy.stripe.com" className="re-btn re-btn--primary" style={{ background: "var(--re-accent)", color: "#000", fontSize: "1.1rem", padding: "1.2rem 2.5rem", boxShadow: "0 10px 30px rgba(212, 175, 110, 0.2)" }}>
          Start Audit for $1 <span className="re-btn-arrow">↗</span>
        </a>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2.5rem", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
          <span>✓ Refund guarantee</span>
          <span>✓ 48 hour turnaround</span>
          <span>✓ Zero Lock-in</span>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────── */
const faqs = [
  { q: "Why only $1? What's the catch?", a: "There is no catch. The $1 price removes your financial risk entirely and forces us to earn your trust through quality. If you see the value, you'll want to employ us further." },
  { q: "What does the $1 audit actually include?", a: "A complete Core Web Vitals analysis (LCP, CLS, INP), render-blocking resource identification, image optimization opportunities, third-party script load impact, and a prioritized fix roadmap." },
  { q: "What if I'm not happy with the audit?", a: "We refund your $1 immediately. No questions, no forms, no back-and-forth. We send it back within 24 hours of your request." },
  { q: "What platforms do you audit?", a: "We specialize in WordPress, Shopify, Next.js, and custom tech stacks. The methodology is entirely platform-agnostic." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  
  return (
    <section style={{ background: "var(--re-mid)", paddingBlock: "10rem", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
      <div className="re-container" style={{ maxWidth: "800px" }}>
        <h2 style={{ fontFamily: "var(--syne)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", marginBottom: "4rem", textAlign: "center", lineHeight: 1.1 }}>
          Every question<br/><span style={{ color: "var(--re-accent)", fontStyle: "italic" }}>answered honestly.</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ 
              background: "rgba(0,0,0,0.3)", 
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "1rem",
              overflow: "hidden"
            }}>
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                style={{ 
                  width: "100%", 
                  padding: "1.75rem 2rem", 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  background: "none", 
                  border: "none", 
                  color: "#fff", 
                  fontSize: "1.1rem", 
                  fontWeight: 600, 
                  cursor: "pointer", 
                  textAlign: "left" 
                }}
              >
                {faq.q}
                <span style={{ 
                  color: "var(--re-accent)", 
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)", 
                  transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                  fontSize: "0.8rem"
                }}>▼</span>
              </button>
              <div style={{ 
                maxHeight: open === i ? "500px" : "0", 
                padding: open === i ? "0 2rem 1.75rem 2rem" : "0 2rem 0 2rem",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: open === i ? 1 : 0,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                fontSize: "1rem"
              }}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE ROOT ──────────────────────────────────────────── */
const GLOBAL_FOOTER_COLS = [
  {
    title: "Services",
    links: [
      { label: "Site Audit", href: "#cwv" },
      { label: "Speed Opt.", href: "#process" },
      { label: "CRO Engine", href: "#process" },
      { label: "Lead Gen", href: "#offer" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About MonkDA", href: "#" },
      { label: "Insights", href: "#blog" },
      { label: "Privacy Policy", href: "#" },
      { label: "Contact", href: "https://www.monkda.com/contact" },
    ],
  },
];

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Badges />
        <ProblemSection />
        <ProcessSection />
        <CWVProof />
        <OfferSection />
        <FAQ />
        
        {/* Keeping the Blog section as requested */}
        <div id="blog" style={{ background: "var(--re-black)" }}>
          <StrapiBlogSection
            categorySlug="web-performance"
            accent="#d4af6e"
            heading="Performance"
            headingAccent="Insights."
          />
        </div>

        <MonkDAFooter
          accent="#d4af6e"
          bg="#050505"
          tagline="The optimization engine for modern web. Results that speak."
          entity="MonkDA Optimization Ltd."
          cols={GLOBAL_FOOTER_COLS}
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
