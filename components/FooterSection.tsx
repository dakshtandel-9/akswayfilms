import Link from "next/link";
import Image from "next/image";
import type { FooterContent } from "@/lib/validations";

const LOGO_URL = "https://res.cloudinary.com/dlk0wvka6/image/upload/v1777889152/aksway_h8rcff.png";

interface FooterSectionProps {
  content: FooterContent | null;
}

const FALLBACK: FooterContent = {
  copyright_text: "© 2025 Aksway Photography. All rights reserved.",
  tagline:        "Capturing your eternal moments",
  social_links: {
    instagram: "https://instagram.com/aksway.in",
    facebook:  "",
    youtube:   "",
    whatsapp:  "919876543210",
  },
  quick_links: [
    { label: "Home",       href: "#home" },
    { label: "Portfolio",  href: "#portfolio" },
    { label: "Packages",   href: "#packages" },
    { label: "About",      href: "#about" },
    { label: "Contact",    href: "#contact" },
  ],
};

const NAV_SECTIONS = [
  { label: "Home",       href: "#home" },
  { label: "Portfolio",  href: "#portfolio" },
  { label: "Packages",   href: "#packages" },
  { label: "About",      href: "#about" },
  { label: "Contact",    href: "#contact" },
];

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" stroke="currentColor" strokeWidth="1.5"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}
function WhatsappIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" fillOpacity="0.9"/>
    </svg>
  );
}

export default function FooterSection({ content }: FooterSectionProps) {
  const c       = content ?? FALLBACK;
  const links   = c.quick_links?.length ? c.quick_links : NAV_SECTIONS;
  const socials = c.social_links ?? {};

  return (
    <footer
      id="footer"
      style={{
        background:   "rgb(6,6,6)",
        borderTop:    "1px solid rgba(255,255,255,0.06)",
        paddingTop:   "clamp(48px, 8vh, 80px)",
        overflow:     "hidden",
        position:     "relative",
      }}
    >

      <div
        style={{
          maxWidth: "1440px",
          margin:   "0 auto",
          padding:  "0 clamp(20px, 4vw, 96px)",
          position: "relative",
          zIndex:   1,
        }}
      >
        <div className="footer-grid">

          {/* Brand col */}
          <div className="footer-brand">
            {/* Logo */}
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display:        "inline-flex",
                alignItems:     "center",
                marginBottom:   "20px",
              }}
            >
              <Image
                src={LOGO_URL}
                alt="Aksway Photography"
                width={240}
                height={80}
                style={{ height: "clamp(44px, 4vw, 60px)", width: "auto", display: "block" }}
              />
            </Link>

            {c.tagline && (
              <p
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "clamp(14px, 1.2vw, 16px)",
                  letterSpacing: "0.08em",
                  color:         "rgba(160,160,160,0.7)",
                  lineHeight:    1.6,
                  marginBottom:  "28px",
                  maxWidth:      "260px",
                }}
              >
                {c.tagline}
              </p>
            )}

            {/* Social icons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {socials.instagram && (
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="social-icon">
                  <InstagramIcon />
                </a>
              )}
              {socials.facebook && (
                <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FacebookIcon />
                </a>
              )}
              {socials.youtube && (
                <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="social-icon">
                  <YoutubeIcon />
                </a>
              )}
              {socials.whatsapp && (
                <a href={`https://wa.me/${socials.whatsapp}`} target="_blank" rel="noopener noreferrer" className="social-icon">
                  <WhatsappIcon />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(16px, 1.4vw, 20px)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:         "#FFFFFF",
                marginBottom:  "20px",
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontSize:      "clamp(14px, 1.2vw, 17px)",
                      letterSpacing: "0.06em",
                      color:         "rgba(160,160,160,0.7)",
                      textDecoration:"none",
                      transition:    "color 200ms ease",
                      display:       "inline-flex",
                      alignItems:    "center",
                      gap:           "8px",
                    }}
                    className="footer-link"
                  >
                    <span
                      style={{
                        display:    "inline-block",
                        width:      "16px",
                        height:     "1px",
                        background: "#D4AF37",
                        flexShrink: 0,
                        transition: "width 200ms ease",
                      }}
                      className="footer-link-line"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info col */}
          <div>
            <h4
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(16px, 1.4vw, 20px)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:         "#FFFFFF",
                marginBottom:  "20px",
              }}
            >
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { icon: "📍", label: "Honnavar, Karnataka" },
                { icon: "📷", label: "Wedding · Pre-wedding · Haldi" },
                { icon: "✨", label: "Available across Karnataka & Goa" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <span style={{ fontSize: "14px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                  <span
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontSize:      "clamp(13px, 1.1vw, 15px)",
                      letterSpacing: "0.04em",
                      color:         "rgba(160,160,160,0.7)",
                      lineHeight:    1.4,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Book CTA col */}
          <div className="footer-cta-col">
            <div
              style={{
                background:    "radial-gradient(ellipse at top, rgba(212,175,55,0.08) 0%, transparent 70%)",
                border:        "1px solid rgba(212,175,55,0.2)",
                borderRadius:  "16px",
                padding:       "clamp(24px, 3vw, 36px)",
                textAlign:     "center",
              }}
            >
              <p
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "clamp(22px, 2vw, 28px)",
                  letterSpacing: "0.04em",
                  color:         "#FFFFFF",
                  lineHeight:    1.2,
                  marginBottom:  "8px",
                }}
              >
                Ready to Book?
              </p>
              <p
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "13px",
                  letterSpacing: "0.06em",
                  color:         "rgba(160,160,160,0.6)",
                  marginBottom:  "24px",
                }}
              >
                Limited dates available
              </p>
              <a
                href="#contact"
                style={{
                  display:        "inline-block",
                  background:     "#D4AF37",
                  borderRadius:   "8px",
                  padding:        "12px 28px",
                  fontFamily:     "var(--font-display)",
                  fontSize:       "clamp(15px, 1.2vw, 18px)",
                  letterSpacing:  "0.1em",
                  textTransform:  "uppercase",
                  color:          "#0A0A0A",
                  textDecoration: "none",
                  transition:     "opacity 200ms ease, transform 200ms ease",
                }}
                className="footer-book-btn"
              >
                Book Now
              </a>
            </div>
          </div>

        </div>

        {/* Big brand name block — top 70% visible */}
        <div
          style={{
            width:      "100%",
            overflow:   "hidden",
            height:     "clamp(56px, 12.6vw, 196px)",   /* 70% of font size */
            marginTop:  "clamp(32px, 5vh, 64px)",
            flexShrink: 0,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.02) 0%, transparent 100%)",
            borderTop:  "1px solid rgba(255,255,255,0.03)",
            display:    "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(80px, 18vw, 280px)",
              fontWeight:    900,
              letterSpacing: "0.02em",
              lineHeight:    1,
              color:         "#FFFFFF",
              whiteSpace:    "nowrap",
              userSelect:    "none",
            }}
          >
            AKSWAYFILMS
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop:      "1px solid rgba(255,255,255,0.06)",
            marginTop:      "20px",
            paddingTop:     "24px",
            paddingBottom:  "24px",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            flexWrap:       "wrap",
            gap:            "12px",
          }}
        >
          <span
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "13px",
              letterSpacing: "0.06em",
              color:         "rgba(100,100,100,0.8)",
            }}
          >
            {c.copyright_text}
          </span>
          <span
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "12px",
              letterSpacing: "0.06em",
              color:         "rgba(100,100,100,0.5)",
            }}
          >
            Made with love in Honnavar
          </span>
        </div>
      </div>



      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: clamp(32px, 5vw, 64px);
          align-items: start;
        }
        .social-icon {
          width:          40px;
          height:         40px;
          border-radius:  8px;
          border:         1px solid rgba(255,255,255,0.1);
          display:        flex;
          align-items:    center;
          justify-content: center;
          color:          rgba(160,160,160,0.6);
          text-decoration: none;
          transition:     all 300ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .social-icon:hover {
          color:         #D4AF37;
          border-color:  rgba(212,175,55,0.4);
          background:    rgba(212,175,55,0.06);
          transform:     translateY(-2px);
        }
        .footer-link { transition: all 200ms ease; }
        .footer-link:hover { color: #D4AF37 !important; transform: translateX(4px); }
        .footer-link:hover .footer-link-line { width: 24px !important; }
        .footer-book-btn:hover { opacity: 0.88; transform: translateY(-1.5px); box-shadow: 0 4px 12px rgba(212,175,55,0.2); }

        @media (max-width: 1023px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
          .footer-cta-col { grid-column: span 2; }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer-cta-col { grid-column: span 1; }
        }
      `}</style>
    </footer>
  );
}
