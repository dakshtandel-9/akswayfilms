"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LOGO_URL = "https://res.cloudinary.com/dlk0wvka6/image/upload/v1777889152/aksway_h8rcff.png";
const FADE_AT_MS = 1600;
const REMOVE_AT_MS = 2000;

export default function Loader() {
  const [fadeOut, setFadeOut] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), FADE_AT_MS);
    const removeTimer = setTimeout(() => setRemoved(true), REMOVE_AT_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position:       "fixed",
        inset:          0,
        zIndex:         9999,
        background:     "#0A0A0A",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        gap:            "28px",
        opacity:        fadeOut ? 0 : 1,
        transition:     "opacity 400ms ease-out",
        pointerEvents:  fadeOut ? "none" : "auto",
      }}
    >
      <Image
        src={LOGO_URL}
        alt="Aksway"
        width={240}
        height={80}
        priority
        style={{ height: "clamp(40px, 5vw, 64px)", width: "auto", display: "block" }}
      />

      <div className="aks-loader-ring" />

      <style>{`
        .aks-loader-ring {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid rgba(212, 175, 55, 0.18);
          border-top-color: #D4AF37;
          animation: aks-spin 0.9s linear infinite;
        }
        @keyframes aks-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
