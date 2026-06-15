import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#090909",
          backgroundImage:
            "radial-gradient(900px 600px at 12% -10%, rgba(106,76,245,0.45), transparent 60%), radial-gradient(800px 600px at 110% 120%, rgba(212,77,240,0.35), transparent 60%)",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          color: "#fff",
        }}
      >
        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderRadius: 16,
              background: "#1c1c1c",
              border: "1px solid #333",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
                stroke="#fff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
            {SITE.name}
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            Rip any video off X.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 30,
              color: "#a3a3a3",
              letterSpacing: -0.5,
            }}
          >
            Videos, photos &amp; GIFs — no app, no API, no watermark.
          </div>
        </div>

        {/* faux input row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              height: 70,
              borderRadius: 14,
              background: "#141414",
              border: "1px solid #2a2a2a",
              padding: "0 24px",
              fontSize: 26,
              color: "#7a7a7a",
            }}
          >
            Paste an X / Twitter post link…
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: 70,
              borderRadius: 100,
              background: "#fff",
              color: "#000",
              padding: "0 34px",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            Rip it →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
