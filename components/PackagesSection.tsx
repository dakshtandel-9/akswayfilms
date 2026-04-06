interface Package {
  id: string;
  name: string;
  price_inr: number;
  badge?: string;
  features: string[];
  is_highlighted: boolean;
}

interface Addon {
  id: string;
  name: string;
  price_display: string;
  description?: string;
}

interface PackagesSectionProps {
  packages: Package[];
  addons:   Addon[];
}

const FALLBACK_PACKAGES: Package[] = [
  {
    id: "1",
    name: "Essential",
    price_inr: 25000,
    features: ["6 Hours Coverage", "1 Photographer", "300+ Edited Photos", "Online Gallery", "Print-ready Files"],
    is_highlighted: false,
    badge: "",
  },
  {
    id: "2",
    name: "Signature",
    price_inr: 45000,
    badge: "Most Popular",
    features: ["Full Day Coverage", "2 Photographers", "600+ Edited Photos", "Pre-wedding Shoot", "Cinematic Highlight", "Premium Album"],
    is_highlighted: true,
  },
  {
    id: "3",
    name: "Cinematic",
    price_inr: 75000,
    features: ["2-Day Coverage", "2 Photographers + 1 Videographer", "900+ Edited Photos", "Cinematic Film", "Drone Shots", "Premium Album", "Same-day Slideshow"],
    is_highlighted: false,
    badge: "",
  },
];

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

export default function PackagesSection({ packages, addons }: PackagesSectionProps) {
  const pkgs = packages.length > 0 ? packages : FALLBACK_PACKAGES;

  return (
    <section
      id="packages"
      style={{
        background: "rgb(17,17,17)",
        padding:    "clamp(64px, 10vh, 120px) 0",
        position:   "relative",
        overflow:   "hidden",
      }}
    >
      {/* Background watermark */}
      <span
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           "50%",
          left:          "50%",
          transform:     "translate(-50%, -50%)",
          fontFamily:    "var(--font-display)",
          fontSize:      "clamp(80px, 20vw, 260px)",
          color:         "rgba(212,175,55,0.025)",
          letterSpacing: "0.06em",
          lineHeight:    1,
          whiteSpace:    "nowrap",
          userSelect:    "none",
          pointerEvents: "none",
          zIndex:        0,
        }}
      >
        PRICE
      </span>

      <div
        style={{
          maxWidth: "1440px",
          margin:   "0 auto",
          padding:  "0 clamp(20px, 4vw, 96px)",
          position: "relative",
          zIndex:   1,
        }}
      >
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 6vh, 64px)" }}>
          <div
            style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          "12px",
              marginBottom: "20px",
            }}
          >
            <span style={{ width: "32px", height: "1px", background: "#D4AF37" }} />
            <span
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "13px",
                letterSpacing: "0.2em",
                color:         "#D4AF37",
                textTransform: "uppercase",
              }}
            >
              Packages
            </span>
            <span style={{ width: "32px", height: "1px", background: "#D4AF37" }} />
          </div>
          <h2
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(40px, 5vw, 72px)",
              lineHeight:    1.0,
              letterSpacing: "0.02em",
              color:         "#FFFFFF",
              marginBottom:  "16px",
            }}
          >
            Investment In Your Memories
          </h2>
          <p
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(15px, 1.3vw, 18px)",
              color:         "rgba(160,160,160,0.8)",
              letterSpacing: "0.04em",
            }}
          >
            Transparent pricing, timeless results
          </p>
        </div>

        {/* Cards */}
        <div className="packages-grid">
          {pkgs.map((pkg) => (
            <div
              key={pkg.id}
              className={`pkg-card${pkg.is_highlighted ? " highlighted" : ""}`}
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="pkg-badge">
                  <span
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontSize:      "11px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color:         "#0A0A0A",
                    }}
                  >
                    {pkg.badge}
                  </span>
                </div>
              )}

              {/* Name */}
              <h3
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "clamp(28px, 2.5vw, 36px)",
                  letterSpacing: "0.06em",
                  color:         pkg.is_highlighted ? "#D4AF37" : "#FFFFFF",
                  marginBottom:  "8px",
                  lineHeight:    1,
                }}
              >
                {pkg.name}
              </h3>

              {/* Divider */}
              <div
                style={{
                  width:        "40px",
                  height:       "1px",
                  background:   "rgba(212,175,55,0.4)",
                  marginBottom: "20px",
                }}
              />

              {/* Price */}
              <div style={{ marginBottom: "28px" }}>
                <span
                  style={{
                    fontFamily:    "var(--font-display)",
                    fontSize:      "13px",
                    letterSpacing: "0.1em",
                    color:         "rgba(160,160,160,0.6)",
                    textTransform: "uppercase",
                    display:       "block",
                    marginBottom:  "4px",
                  }}
                >
                  Starting at
                </span>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                  <span
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontSize:      "14px",
                      color:         "#D4AF37",
                      lineHeight:    1,
                    }}
                  >
                    ₹
                  </span>
                  <span
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontSize:      "clamp(40px, 4vw, 56px)",
                      color:         "#D4AF37",
                      lineHeight:    1,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {fmt(pkg.price_inr)}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul
                style={{
                  listStyle:   "none",
                  padding:     0,
                  margin:      "0 0 32px 0",
                  display:     "flex",
                  flexDirection:"column",
                  gap:         "12px",
                  flex:        1,
                }}
              >
                {pkg.features.map((feat, i) => (
                  <li
                    key={i}
                    style={{
                      display:    "flex",
                      alignItems: "flex-start",
                      gap:        "10px",
                    }}
                  >
                    <svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    >
                      <circle cx="8" cy="8" r="7" stroke="rgba(212,175,55,0.4)" strokeWidth="1"/>
                      <path d="M5 8l2 2 4-4" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span
                      style={{
                        fontFamily:    "var(--font-display)",
                        fontSize:      "clamp(14px, 1.1vw, 16px)",
                        letterSpacing: "0.04em",
                        color:         "rgba(200,200,200,0.85)",
                        lineHeight:    1.4,
                      }}
                    >
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                style={{
                  display:        "block",
                  textAlign:      "center",
                  fontFamily:     "var(--font-display)",
                  fontSize:       "clamp(16px, 1.3vw, 20px)",
                  letterSpacing:  "0.12em",
                  textTransform:  "uppercase",
                  textDecoration: "none",
                  padding:        "14px 24px",
                  borderRadius:   "6px",
                  border:         `1px solid ${pkg.is_highlighted ? "#D4AF37" : "rgba(212,175,55,0.4)"}`,
                  background:     pkg.is_highlighted ? "#D4AF37" : "transparent",
                  color:          pkg.is_highlighted ? "#0A0A0A" : "#D4AF37",
                  transition:     "all 200ms ease",
                }}
                className="pkg-cta"
              >
                Book This Package
              </a>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        {addons.length > 0 && (
          <div style={{ marginTop: "clamp(48px, 8vh, 80px)" }}>
            <div
              style={{
                textAlign:    "center",
                marginBottom: "32px",
              }}
            >
              <h3
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "clamp(24px, 2.5vw, 36px)",
                  letterSpacing: "0.06em",
                  color:         "#FFFFFF",
                }}
              >
                Add-Ons
              </h3>
            </div>
            <div className="addons-grid">
              {addons.map((a) => (
                <div key={a.id} className="addon-card">
                  <span
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontSize:      "clamp(15px, 1.3vw, 18px)",
                      letterSpacing: "0.06em",
                      color:         "#FFFFFF",
                      display:       "block",
                      marginBottom:  "6px",
                    }}
                  >
                    {a.name}
                  </span>
                  <span
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontSize:      "clamp(14px, 1.2vw, 17px)",
                      letterSpacing: "0.06em",
                      color:         "#D4AF37",
                    }}
                  >
                    {a.price_display}
                  </span>
                  {a.description && (
                    <span
                      style={{
                        fontFamily:    "var(--font-display)",
                        fontSize:      "13px",
                        letterSpacing: "0.04em",
                        color:         "rgba(160,160,160,0.6)",
                        display:       "block",
                        marginTop:     "4px",
                      }}
                    >
                      {a.description}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .packages-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: stretch;
        }
        .pkg-card {
          background:    rgb(26,26,26);
          border:        1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding:       clamp(24px, 3vw, 40px);
          display:       flex;
          flex-direction: column;
          position:      relative;
          transition:    border-color 300ms ease, transform 300ms ease, box-shadow 300ms ease;
        }
        .pkg-card:hover {
          border-color:  rgba(212,175,55,0.3);
          transform:     translateY(-4px);
          box-shadow:    0 16px 40px rgba(0,0,0,0.5);
        }
        .pkg-card.highlighted {
          border-color:  rgba(212,175,55,0.5);
          background:    radial-gradient(ellipse at top, rgba(212,175,55,0.06) 0%, rgb(26,26,26) 70%);
          box-shadow:    0 0 40px rgba(212,175,55,0.1);
        }
        .pkg-badge {
          position:     absolute;
          top:          -1px;
          right:        24px;
          background:   #D4AF37;
          padding:      6px 16px;
          border-radius: 0 0 8px 8px;
        }
        .pkg-cta:hover {
          background: rgba(212,175,55,0.1) !important;
          color: #D4AF37 !important;
          transform: translateY(-1px);
        }
        .pkg-card.highlighted .pkg-cta:hover {
          background: rgb(184,145,47) !important;
          color: #0A0A0A !important;
        }
        .addons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }
        .addon-card {
          background:    rgb(26,26,26);
          border:        1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding:       20px 24px;
          transition:    border-color 200ms ease;
        }
        .addon-card:hover {
          border-color: rgba(212,175,55,0.3);
        }

        @media (max-width: 1023px) {
          .packages-grid { grid-template-columns: 1fr 1fr; }
          .packages-grid > :last-child:nth-child(odd) {
            grid-column: span 2;
            max-width: 480px;
            justify-self: center;
          }
        }
        @media (max-width: 640px) {
          .packages-grid { grid-template-columns: 1fr; }
          .packages-grid > :last-child:nth-child(odd) {
            grid-column: span 1;
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
