"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ─── Nav data ────────────────────────────────────────── */
const NAV_LINKS = [
  { name: "Home",      href: "#home" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Packages",  href: "#packages" },
  { name: "About",     href: "#about" },
];

/* ─── Helper: detect active section based on hash ───── */
function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onHash = () => setActive(window.location.hash.replace("#", "") || "home");
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return active;
}

/* ─── Component ─────────────────────────────────────── */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active                      = useActiveSection();

  if (pathname?.startsWith("/dashboard") || pathname === "/login") return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* ── Header bar ──────────────────────────────────── */}
      <header
        role="banner"
        className="site-header"
        style={{
          position:             "fixed",
          top:                  0,
          left:                 0,
          right:                0,
          zIndex:               201,
          height:               scrolled ? "60px" : "70px",
          transition:           "height 400ms cubic-bezier(0.25,0,0,1), background 400ms cubic-bezier(0.25,0,0,1), border-color 400ms cubic-bezier(0.25,0,0,1)",
          background:           scrolled ? "rgba(10,10,10,0.82)" : "transparent",
          backdropFilter:       scrolled ? "blur(20px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
          borderBottom:         scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          display:              "flex",
          alignItems:           "center",
        }}
      >
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            width:          "100%",
            maxWidth:       "1440px",
            margin:         "0 auto",
            padding:        "0 clamp(20px, 4vw, 96px)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            id="header-logo"
            aria-label="Aksway Photography — Home"
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}
          >
            <span
              style={{
                width:          "34px",
                height:         "34px",
                borderRadius:   "50%",
                border:         "1.5px solid #D4AF37",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                transition:     "transform 350ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 350ms cubic-bezier(0.25,0,0,1)",
                flexShrink:     0,
              }}
              className="logo-circle"
            >
              <span
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "15px",
                  color:         "#D4AF37",
                  lineHeight:    1,
                  letterSpacing: "0.04em",
                }}
              >
                A
              </span>
            </span>

            <span
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(26px, 2.4vw, 34px)",
                fontWeight:    400,
                letterSpacing: "0.12em",
                color:         "#FFFFFF",
                lineHeight:    1,
              }}
            >
              AKS<span style={{ color: "#D4AF37" }}>WAY</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Main navigation"
            className="desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: "clamp(20px, 3vw, 44px)" }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  id={`nav-${link.name.toLowerCase()}`}
                  style={{
                    fontFamily:    "var(--font-display)",
                    fontSize:      "clamp(18px, 1.5vw, 22px)",
                    fontWeight:    400,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color:          isActive ? "#D4AF37" : scrolled ? "rgba(160,160,160,1)" : "rgba(255,255,255,0.9)",
                    textDecoration: "none",
                    position:       "relative",
                    paddingBottom:  "4px",
                    transition:     "color 200ms cubic-bezier(0.25,0,0,1)",
                  }}
                  className="nav-link"
                  data-active={isActive}
                >
                  {link.name}
                  <span
                    style={{
                      position:     "absolute",
                      bottom:       0,
                      left:         0,
                      height:       "2px",
                      width:        isActive ? "100%" : "0%",
                      background:   "#D4AF37",
                      borderRadius: "1px",
                      transition:   "width 350ms cubic-bezier(0.25,0,0,1)",
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right — CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a
              href="#contact"
              id="header-cta-book"
              style={{
                fontFamily:     "var(--font-display)",
                fontSize:       "clamp(16px, 1.3vw, 20px)",
                fontWeight:     400,
                letterSpacing:  "0.12em",
                textTransform:  "uppercase",
                color:          "#D4AF37",
                textDecoration: "none",
                border:         "1px solid #D4AF37",
                borderRadius:   "var(--radius-md)",
                padding:        "6px 22px",
                transition:     "background 200ms cubic-bezier(0.25,0,0,1), color 200ms cubic-bezier(0.25,0,0,1), transform 200ms cubic-bezier(0.25,0,0,1)",
                display:        "inline-block",
                whiteSpace:     "nowrap",
              }}
              className="cta-book desktop-only"
            >
              Book Now
            </a>

            {/* Hamburger — mobile/tablet only */}
            <button
              id="header-mobile-toggle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              style={{
                background:    "none",
                border:        "none",
                cursor:        "pointer",
                padding:       "8px",
                color:         "#FFFFFF",
                flexDirection: "column",
                gap:           "5px",
                alignItems:    "flex-end",
                transition:    "color 200ms ease",
              }}
              className="hamburger-btn"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display:         "block",
                    height:          "1.5px",
                    background:      "currentColor",
                    borderRadius:    "2px",
                    transition:      "transform 350ms cubic-bezier(0.25,0,0,1), opacity 200ms ease, width 350ms cubic-bezier(0.25,0,0,1)",
                    width:           i === 1 && mobileOpen ? "0px" : i === 2 ? (mobileOpen ? "24px" : "16px") : "24px",
                    transformOrigin: "center",
                    transform:
                      mobileOpen
                        ? i === 0 ? "translateY(6.5px) rotate(45deg)"
                        : i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                        : "scaleX(0)"
                        : "none",
                    opacity: i === 1 && mobileOpen ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ────────────────── */}
      <div
        id="mobile-nav-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        200,
          background:    "#0A0A0A",
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          justifyContent:"center",
          gap:           "32px",
          transition:    "opacity 400ms cubic-bezier(0.25,0,0,1), visibility 400ms",
          opacity:       mobileOpen ? 1 : 0,
          visibility:    mobileOpen ? "visible" : "hidden",
          pointerEvents: mobileOpen ? "all" : "none",
        }}
      >
        {/* Brand watermark */}
        <span
          aria-hidden="true"
          style={{
            position:      "absolute",
            bottom:        "8%",
            right:         "6%",
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(60px, 18vw, 160px)",
            color:         "rgba(212,175,55,0.04)",
            letterSpacing: "0.06em",
            lineHeight:    1,
            userSelect:    "none",
            pointerEvents: "none",
          }}
        >
          AKSWAY
        </span>

        {/* Mobile links */}
        <nav aria-label="Mobile navigation links" style={{ textAlign: "center" }}>
          {NAV_LINKS.map((link, idx) => (
            <div key={link.name} style={{ overflow: "hidden", marginBottom: "16px" }}>
              <Link
                href={link.href}
                id={`mobile-nav-${link.name.toLowerCase()}`}
                onClick={closeMobile}
                style={{
                  fontFamily:      "var(--font-display)",
                  fontSize:        "clamp(44px, 10vw, 80px)",
                  fontWeight:      400,
                  letterSpacing:   "0.06em",
                  color:           "#FFFFFF",
                  textDecoration:  "none",
                  display:         "block",
                  lineHeight:      1.1,
                  transition:      "color 200ms cubic-bezier(0.25,0,0,1), transform 350ms cubic-bezier(0.25,0,0,1)",
                  transform:       mobileOpen ? "translateY(0)" : "translateY(100%)",
                  transitionDelay: mobileOpen ? `${idx * 60}ms` : "0ms",
                }}
                className="mobile-nav-link"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </nav>

        {/* Mobile CTA */}
        <a
          href="#contact"
          id="mobile-cta-book"
          onClick={closeMobile}
          style={{
            fontFamily:      "var(--font-display)",
            fontSize:        "20px",
            fontWeight:      400,
            letterSpacing:   "0.14em",
            textTransform:   "uppercase",
            color:           "#0A0A0A",
            textDecoration:  "none",
            background:      "#D4AF37",
            padding:         "14px 44px",
            borderRadius:    "var(--radius-md)",
            display:         "inline-block",
            transition:      "transform 350ms cubic-bezier(0.25,0,0,1), opacity 400ms cubic-bezier(0.25,0,0,1)",
            opacity:         mobileOpen ? 1 : 0,
            transform:       mobileOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            transitionDelay: mobileOpen ? `${NAV_LINKS.length * 60 + 40}ms` : "0ms",
          }}
        >
          Book Now
        </a>
      </div>

      {/* ── Scoped styles ─── */}
      <style>{`
        .nav-link { transition: color 200ms cubic-bezier(0.25,0,0,1) !important; }
        .nav-link:hover { color: #FFFFFF !important; }
        .nav-link[data-active="true"] { color: #D4AF37 !important; }

        .logo-circle:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 0 16px rgba(212,175,55,0.3) !important;
        }

        .cta-book:hover {
          background: rgba(212,175,55,0.10) !important;
          transform: translateY(-1px) !important;
        }

        .mobile-nav-link:hover {
          color: #D4AF37 !important;
          transform: translateX(8px) !important;
        }

        .hamburger-btn:hover { color: #D4AF37 !important; }

        /* hamburger hidden by default, shown on small screens */
        .hamburger-btn { display: none; }

        /* ── Tablet & Mobile (≤ 1023px): hamburger replaces nav ── */
        @media (max-width: 1023px) {
          .desktop-nav  { display: none !important; }
          .desktop-only { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }

        @media (min-width: 1024px) {
          .hamburger-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
