import { useRef, useEffect, useState } from "react";
import {
  Calendar, TrendingUp, Heart, Users, CreditCard, Star, Bell,
  LayoutDashboard, Shield, Sparkles, MapPin, Flame, Zap, ChevronRight,
} from "lucide-react";
import config from "./demo.config.js";
import App from "./App.jsx";

const iconMap = { Calendar, TrendingUp, Heart, Users, CreditCard, Star, Bell, LayoutDashboard, Shield, Sparkles, MapPin, Flame, Zap, ChevronRight };

export default function DemoWrapper() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1100);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // On small screens, just render the app directly
  if (isMobile) {
    return <App />;
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      minHeight: "100vh",
      background: config.bgWarm,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      overflow: "hidden",
      position: "fixed",
      inset: 0,
      scrollbarWidth: "none",
    }}>
      <style>{`
        div { scrollbar-width: none; }
        div::-webkit-scrollbar { display: none; }
      `}</style>
      {/* LEFT SIDEBAR */}
      <aside style={{
        width: 320,
        height: "100vh",
        overflowY: "auto",
        padding: "48px 36px 36px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        scrollbarWidth: "none",
      }}>
        {/* Prototype label */}
        <p style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color: config.accentColor,
          marginBottom: 24,
        }}>Prototype Demo</p>

        {/* Studio identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: config.accentColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 15,
            color: "#fff",
            fontWeight: 700,
            flexShrink: 0,
            overflow: "hidden",
          }}>
            {config.logoImage
              ? <img src={config.logoImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; e.target.parentElement.textContent = config.logoMark; }} />
              : config.logoMark
            }
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 700, color: config.textDark, lineHeight: 1.1 }}>
              {config.shortName}
            </div>
            <div style={{ fontSize: 13, color: config.textMuted }}>{config.subtitle}</div>
          </div>
        </div>

        {/* Feature list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
          {config.features.map((feat, i) => {
            const Icon = iconMap[feat.icon] || Star;
            return (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ marginTop: 2, flexShrink: 0 }}>
                  <Icon size={16} color={config.textMuted} strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: config.textDark, lineHeight: 1.3 }}>{feat.title}</div>
                  <div style={{ fontSize: 13, color: config.textMuted, lineHeight: 1.4, marginTop: 1 }}>{feat.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 40, paddingTop: 20 }}>
          <p style={{ fontSize: 11, color: config.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Built by {config.builderName} — {config.builderUrl}
          </p>
        </div>
      </aside>

      {/* CENTER — Phone Frame */}
      <div style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "100vh",
        paddingTop: 24,
        paddingBottom: 24,
      }}>
        <div style={{
          width: 390,
          height: "calc(100vh - 48px)",
          borderRadius: 32,
          overflow: "hidden",
          boxShadow: "0 8px 60px rgba(0,0,0,0.12), 0 2px 12px rgba(0,0,0,0.06)",
          background: "#f5f0ea",
          position: "relative",
          transform: "translateZ(0)",
          border: "1px solid rgba(0,0,0,0.06)",
        }}>
          <div style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            position: "relative",
          }}>
            <App isEmbedded={true} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <aside style={{
        width: 340,
        height: "100vh",
        overflowY: "auto",
        padding: "48px 36px 36px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        scrollbarWidth: "none",
      }}>
        {config.salesCards.map((card, i) => {
          const Icon = iconMap[card.icon] || Sparkles;
          return (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 16,
              padding: "24px 22px",
              border: "1px solid #eae6e0",
            }}>
              <Icon size={24} color={config.accentColor} strokeWidth={1.5} style={{ marginBottom: 12 }} />
              <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 20,
                fontWeight: 600,
                color: config.textDark,
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}>{card.title}</h3>
              <p style={{
                fontSize: 14,
                color: config.textMuted,
                lineHeight: 1.55,
                margin: 0,
              }}>{card.desc}</p>
            </div>
          );
        })}

        {/* CTA Card */}
        <div style={{
          background: config.accentColor,
          borderRadius: 16,
          padding: "24px 22px",
          marginTop: 4,
        }}>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 22,
            fontWeight: 600,
            color: "#fff",
            margin: "0 0 8px",
          }}>Ready to Launch?</h3>
          <p style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.55,
            margin: "0 0 16px",
          }}>Get your studio's custom member app in as little as two weeks.</p>
          <button style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background: "#fff",
            color: config.accentColor,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}>Get Started</button>
        </div>
      </aside>
    </div>
  );
}
