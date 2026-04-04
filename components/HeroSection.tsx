"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import type { HeroSlide } from "@/lib/validations";

interface HeroSectionProps {
  slides: HeroSlide[];
}

const MAX_THUMBS = 4;
const TRANSITION_MS = 450;

export default function HeroSection({ slides }: HeroSectionProps) {
  const [current, setCurrent]   = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [shifting, setShifting] = useState(false);
  const [clipInset, setClipInset] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
  const lockRef    = useRef(false);
  const thumbRowRef = useRef<HTMLDivElement>(null);

  const n = slides.length;

  const getClipFromFirstThumb = () => {
    const el = thumbRowRef.current?.querySelector<HTMLElement>(".hero-thumb");
    if (el) {
      const r = el.getBoundingClientRect();
      return {
        top:    r.top,
        right:  window.innerWidth - r.right,
        bottom: window.innerHeight - r.bottom,
        left:   r.left,
      };
    }
    return {
      top:    window.innerHeight - 200,
      right:  36,
      bottom: 36,
      left:   window.innerWidth * 0.7,
    };
  };

  const goTo = useCallback(
    (slideIdx: number) => {
      if (lockRef.current || slideIdx === current || n <= 1) return;
      lockRef.current = true;

      const clip = getClipFromFirstThumb();
      setClipInset(clip);
      setIncoming(slideIdx);
      setShifting(true);

      setTimeout(() => {
        setCurrent(slideIdx);
        setIncoming(null);
        setShifting(false);
        lockRef.current = false;
      }, TRANSITION_MS);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current, n]
  );

  const next = useCallback(() => goTo((current + 1) % n), [goTo, current, n]);
  const prev = useCallback(() => goTo((current - 1 + n) % n), [goTo, current, n]);

  useEffect(() => {
    if (n <= 1) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next, n]);

  if (!slides || n === 0) return null;

  const slide = slides[current];

  const numThumbs = Math.min(n - 1, MAX_THUMBS);
  const thumbList = Array.from({ length: numThumbs }, (_, i) => {
    const idx = (current + 1 + i) % n;
    return { idx, slide: slides[idx] };
  });

  const hasEntering  = n > MAX_THUMBS + 1;
  const enteringIdx  = hasEntering ? (current + MAX_THUMBS + 1) % n : null;
  const enteringSlide = enteringIdx !== null ? slides[enteringIdx] : null;

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-black hero-section"
      style={{ height: "100svh", minHeight: "500px" }}
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {slide.image_url && (
          <Image
            src={slide.image_url}
            alt={slide.alt_text ?? slide.headline}
            fill priority
            className="object-cover object-center"
            sizes="100vw"
          />
        )}
      </div>

      {/* ── Incoming slide clip-path expand ── */}
      {incoming !== null && (
        <div
          className="hero-incoming absolute inset-0"
          style={{
            ["--ci-top" as string]:    `${clipInset.top}px`,
            ["--ci-right" as string]:  `${clipInset.right}px`,
            ["--ci-bottom" as string]: `${clipInset.bottom}px`,
            ["--ci-left" as string]:   `${clipInset.left}px`,
            zIndex: 5,
          }}
        >
          {slides[incoming].image_url && (
            <Image
              src={slides[incoming].image_url}
              alt={slides[incoming].alt_text ?? slides[incoming].headline}
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          )}
        </div>
      )}

      {/* ── Gradient overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 6,
          background: [
            "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0) 100%)",
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 18%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.6) 100%)",
          ].join(", "),
        }}
      />

      {/* ── Text content ── */}
      <div
        className="hero-text-col absolute top-0 bottom-0 left-0 flex flex-col justify-center"
        style={{ zIndex: 110 }}
      >
        <div className="hero-content-inner">
          {/* Subheadline */}
          <p
            key={`sub-${current}`}
            className="hero-text hero-sub uppercase font-medium"
            style={{
              fontFamily:    "var(--font-display)",
              color:         "#D4AF37",
              letterSpacing: "0.3em",
              marginBottom:  "12px",
            }}
          >
            {slide.subheadline}
          </p>

          {/* Main headline */}
          <h1
            key={`h-${current}`}
            className="hero-text hero-h1 text-white leading-tight"
            style={{
              fontFamily:    "var(--font-display)",
              animationDelay:"80ms",
              margin:        0,
            }}
          >
            {slide.headline}
          </h1>

          {/* CTA */}
          {slide.cta_text && slide.cta_link && (
            <a
              key={`cta-${current}`}
              href={slide.cta_link}
              className="hero-text hero-cta-btn"
              style={{
                fontFamily:     "var(--font-display)",
                animationDelay: "160ms",
                display:        "inline-block",
                border:         "1px solid #D4AF37",
                color:          "#D4AF37",
                textTransform:  "uppercase",
                letterSpacing:  "0.12em",
                textDecoration: "none",
                transition:     "background 200ms ease, color 200ms ease",
                borderRadius:   "6px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#D4AF37";
                (e.currentTarget as HTMLAnchorElement).style.color      = "#0A0A0A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color      = "#D4AF37";
              }}
            >
              {slide.cta_text}
            </a>
          )}
        </div>
      </div>

      {/* ── Bottom controls — unified bar ── */}
      {n > 1 && (
        <div className="hero-bottom-bar" style={{ zIndex: 40 }}>

          {/* Prev / Next arrows */}
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="hero-arrow-btn flex items-center justify-center rounded-full border border-white/20 text-white/50 hover:border-white/50 hover:text-white transition-all bg-white/5 hover:bg-white/10"
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                <path d="M8.5 4L5.5 7L8.5 10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="hero-arrow-btn flex items-center justify-center rounded-full border border-white/20 text-white/50 hover:border-white/50 hover:text-white transition-all bg-white/5 hover:bg-white/10"
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                <path d="M5.5 4L8.5 7L5.5 10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Progress line — desktop only */}
          <div className="hero-progress-line">
            <div
              className="absolute left-0 top-0 h-full bg-[#D4AF37] transition-all duration-500 ease-out"
              style={{ width: `${((current + 1) / n) * 100}%` }}
            />
          </div>

          {/* Slide number — desktop only */}
          <div
            className="hero-slide-count select-none flex-shrink-0"
            style={{ fontFamily: "var(--font-display)", color: "rgba(255,255,255,0.9)" }}
          >
            <span className="hero-slide-num">
              {(current + 1).toString().padStart(2, "0")}
            </span>
          </div>

          {/* Dots — mobile only */}
          <div className="hero-dots">
            {Array.from({ length: n }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width:        i === current ? "24px" : "6px",
                  height:       "6px",
                  borderRadius: "3px",
                  background:   i === current ? "#D4AF37" : "rgba(255,255,255,0.35)",
                  border:       "none",
                  cursor:       "pointer",
                  padding:      0,
                  transition:   "width 300ms ease, background 300ms ease",
                }}
              />
            ))}
          </div>

        </div>
      )}

      {/* ── Thumbnail strip — desktop only ── */}
      {n > 1 && (
        <div
          ref={thumbRowRef}
          className={`hero-thumbs-row${shifting ? " shifting" : ""}`}
          style={{ zIndex: 100 }}
        >
          {thumbList.map(({ idx, slide: s }, i) => (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              className={`hero-thumb${i === 0 ? " thumb-exit" : ""}`}
              onClick={() => goTo(idx)}
            >
              {s.image_url && (
                <Image
                  src={s.image_url}
                  alt={s.alt_text ?? s.headline}
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 25vw, (max-width: 1023px) 24vw, 12vw"
                />
              )}
              <div className="absolute inset-0 bg-black/20" />
              {i === 0 && <span className="hero-thumb-label">Next</span>}
            </button>
          ))}

          {shifting && enteringSlide && enteringSlide.image_url && (
            <button
              className="hero-thumb thumb-enter"
              aria-label="Upcoming slide"
              tabIndex={-1}
              style={{ pointerEvents: "none" }}
            >
              <Image
                src={enteringSlide.image_url}
                alt={enteringSlide.alt_text ?? enteringSlide.headline}
                fill
                className="object-cover"
                sizes="8vw"
              />
              <div className="absolute inset-0 bg-black/20" />
            </button>
          )}
        </div>
      )}

      <style>{`
        /* ─── Text animations ─────────────────────── */
        @keyframes heroTextIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-text {
          animation: heroTextIn 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* ─── Background expand ───────────────────── */
        @keyframes heroExpand {
          from {
            clip-path: inset(
              var(--ci-top) var(--ci-right) var(--ci-bottom) var(--ci-left)
              round 20px
            );
          }
          to { clip-path: inset(0px 0px 0px 0px round 0px); }
        }
        .hero-incoming {
          animation: heroExpand ${TRANSITION_MS}ms ease-in forwards;
        }

        /* ─── Text column ─────────────────────────── */
        .hero-text-col {
          width: clamp(260px, 52vw, 760px);
          padding: 0 clamp(20px, 4vw, 96px);
        }
        .hero-content-inner {
          padding: 0;
        }
        .hero-sub   { font-size: clamp(10px, 1.1vw, 13px); }
        .hero-h1    { font-size: clamp(36px, 5.5vw, 80px); }
        .hero-cta-btn {
          margin-top:  clamp(18px, 2.5vw, 28px);
          padding:     clamp(8px, 1vw, 12px) clamp(20px, 2.5vw, 32px);
          font-size:   clamp(11px, 1vw, 14px);
        }

        /* ─── Unified bottom bar ──────────────────── */
        .hero-bottom-bar {
          position:    absolute;
          bottom:      clamp(24px, 4vh, 52px);
          left:        50%;
          right:       clamp(20px, 4vw, 96px);
          display:     flex;
          align-items: center;
          gap:         clamp(12px, 2vw, 24px);
        }
        .hero-arrow-btn {
          width:  clamp(40px, 4vw, 52px);
          height: clamp(40px, 4vw, 52px);
          flex-shrink: 0;
        }
        .hero-progress-line {
          flex:     1;
          height:   2px;
          background: rgba(255,255,255,0.12);
          position: relative;
          min-width: 0;
        }
        .hero-slide-count { display: flex; align-items: baseline; }
        .hero-slide-num {
          font-size:   clamp(24px, 3.2vw, 48px);
          line-height: 1;
          font-weight: 500;
        }

        /* ─── Dots — mobile only ──────────────────── */
        .hero-dots {
          display: none;
          gap: 6px;
          align-items: center;
        }

        /* ─── Thumbnail strip ─────────────────────── */
        .hero-thumbs-row {
          position:   absolute;
          top:        50%;
          left:       50%;
          transform:  translate(0, -50%);
          width:      clamp(300px, 46vw, 820px);
          display:    flex;
          flex-direction: row;
          gap:        12px;
          overflow:   hidden;
          padding:    20px;
        }
        .hero-thumb {
          position:     relative;
          width:        clamp(90px, calc((46vw - 40px) / 3.6), 210px);
          flex-shrink:  0;
          aspect-ratio: 9 / 14;
          border-radius: 18px;
          overflow:     hidden;
          border:       1.5px solid rgba(212,175,55,0.5);
          cursor:       pointer;
          box-shadow:   none;
          /* Remove blue tap highlight on iOS/Android */
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }
        .hero-thumbs-row:not(.shifting) .hero-thumb:hover {
          transform:    scale(1.04) translateY(-3px);
          border-color: rgba(212,175,55,1);
          transition:   transform 0.2s ease, border-color 0.2s ease;
        }
        .hero-thumbs-row.shifting .hero-thumb {
          transform: translateX(calc(-1 * (clamp(90px, calc((46vw - 40px) / 3.6), 210px) + 12px)));
          transition:
            transform ${TRANSITION_MS}ms ease-in,
            opacity   350ms ease;
        }
        .hero-thumbs-row.shifting .hero-thumb.thumb-exit { opacity: 0; }

        @keyframes thumbSlideIn {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-1 * (clamp(90px, calc((46vw - 40px) / 3.6), 210px) + 12px))); }
        }
        .hero-thumbs-row.shifting .hero-thumb.thumb-enter {
          animation: thumbSlideIn ${TRANSITION_MS}ms ease-in forwards;
        }

        .hero-thumb-label {
          position:      absolute;
          bottom:        6px;
          left:          50%;
          transform:     translateX(-50%);
          color:         #fff;
          font-size:     0.55rem;
          font-family:   var(--font-display);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity:       0.85;
          white-space:   nowrap;
          pointer-events: none;
        }

        /* ═══════════════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════════════════ */

        /* ── Tablet (768px – 1023px) ─────────────── */
        @media (max-width: 1023px) {
          /* Thumbnails: same as desktop — horizontal row from center */
          .hero-thumbs-row {
            top:       50%;
            left:      50%;
            right:     auto;
            width:     48vw;
            transform: translateY(-50%);
            flex-direction: row;
            gap:       10px;
            padding:   12px;
            overflow:  hidden;
          }
          /* Show only 2 thumbnails on tablet */
          .hero-thumb:nth-child(n+3) { display: none !important; }
          .hero-thumb {
            width:     calc((48vw - 44px) / 2);
            max-width: none;
          }

          /* Text: left half */
          .hero-text-col { width: 50%; }

          /* Heading on tablet */
          .hero-h1  { font-size: clamp(32px, 5vw, 56px); }
          .hero-sub { font-size: clamp(10px, 1.3vw, 13px); }

          /* bottom bar tighter on tablet */
          .hero-arrow-btn { width: 44px; height: 44px; }
        }

        /* ── Mobile (≤ 767px) ────────────────────── */
        @media (max-width: 767px) {
          /* Thumbnails: horizontal row pinned to BOTTOM, starting from center */
          .hero-thumbs-row {
            top:       auto;
            bottom:    clamp(72px, 13vh, 100px);
            left:      50%;
            right:     auto;
            width:     calc(50vw - 4px);
            transform: none;
            flex-direction: row;
            gap:       6px;
            padding:   8px;
            overflow:  hidden;
          }
          /* Show only 2 thumbnails on mobile */
          .hero-thumb:nth-child(n+3) { display: none !important; }
          .hero-thumb {
            width:         calc((50vw - 38px) / 2);
            max-width:     none;
            border-radius: 12px;
            border-width:  1px;
          }
          .hero-thumb-label { display: none !important; }

          /* Fix sliding animation to use actual mobile thumb width */
          .hero-thumbs-row.shifting .hero-thumb {
            transform: translateX(calc(-1 * (calc((50vw - 38px) / 2) + 6px)));
          }

          /* Hide slide count & progress line — show dots */
          .hero-progress-line { display: none !important; }
          .hero-slide-count   { display: none !important; }
          .hero-dots          { display: flex !important; }

          /* Bottom bar: arrows on left, dots on right */
          .hero-bottom-bar {
            justify-content: space-between;
            bottom: clamp(20px, 5vh, 40px);
            left:   clamp(16px, 5vw, 28px);
            right:  clamp(16px, 5vw, 28px);
            gap: 12px;
          }
          .hero-arrow-btn {
            width:  40px;
            height: 40px;
            -webkit-tap-highlight-color: transparent;
            outline: none;
          }

          /* Text: full width, CENTERED on screen */
          .hero-text-col {
            width:           100%;
            left:            0 !important;
            padding:         0 clamp(20px, 7vw, 40px);
            justify-content: center;
            align-items:     center;
            text-align:      center;
            padding-bottom:  0;
          }

          .hero-sub { font-size: 9px; letter-spacing: 0.25em; }
          .hero-h1  { font-size: clamp(28px, 8vw, 46px); }
          .hero-cta-btn {
            margin-top: 14px;
            padding:    8px 22px;
            font-size:  11px;
          }
        }

        /* ── Small mobile (≤ 480px) ──────────────── */
        @media (max-width: 480px) {
          .hero-h1  { font-size: clamp(24px, 8.5vw, 38px); }
          .hero-sub { letter-spacing: 0.2em; }
          .hero-thumbs-row { gap: 4px; padding: 6px; }
        }
      `}</style>
    </section>
  );
}

