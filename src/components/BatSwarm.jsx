import { useEffect, useRef, useState } from "react";

const BAT_COUNT = 26;

// Each bat gets randomised path & timing so they don't fly in lockstep
function makeBats() {
  return Array.from({ length: BAT_COUNT }, (_, i) => ({
    id: i,
    // start: spread along bottom-left quadrant
    startX: Math.random() * 22,          // 0–22 vw
    startY: 75 + Math.random() * 22,     // 75–97 vh
    // end: spread across top-right quadrant
    endX: 72 + Math.random() * 26,       // 72–98 vw
    endY: Math.random() * 22,            // 0–22 vh
    // slight arc via a random mid-point offset
    midOffsetX: -10 + Math.random() * 20,
    midOffsetY: -15 + Math.random() * 15,
    delay: i * 0.12 + Math.random() * 0.18, // stagger
    duration: .5 + Math.random() * 0.8,
    size: 22 + Math.random() * 18,
    rotate: -30 + Math.random() * 60,
  }));
}

// Simple bat SVG (two wing arcs + body)
function BatIcon({ size }) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 64 38"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* left wing */}
      <path d="M32 22 Q18 2 0 8 Q10 18 18 26 Q24 30 32 28Z" />
      {/* right wing */}
      <path d="M32 22 Q46 2 64 8 Q54 18 46 26 Q40 30 32 28Z" />
      {/* body */}
      <ellipse cx="32" cy="26" rx="5" ry="7" />
      {/* ears */}
      <polygon points="29,20 27,14 31,18" />
      <polygon points="35,20 37,14 33,18" />
    </svg>
  );
}

export default function BatSwarm() {
  const [bats] = useState(makeBats);
  const [active, setActive] = useState(false);
  // Visitors with "Reduce Motion" turned on never see the swarm.
  const [done, setDone] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const fired = useRef(false);

  useEffect(() => {
    if (done) return;
    function onScroll() {
      if (fired.current || window.scrollY < 10) return;
      fired.current = true;
      setActive(true);

      // remove after longest possible animation
      const max = Math.max(...bats.map(b => b.delay + b.duration));
      setTimeout(() => setDone(true), (max + 0.1) * 1000);

      window.removeEventListener("scroll", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [bats, done]);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {bats.map((b) => {
        // Build a CSS custom-property-driven keyframe via inline style
        const id = `bat-${b.id}`;
        return (
          <div
            key={b.id}
            id={id}
            style={{
              position: "absolute",
              left: `${b.startX}vw`,
              top: `${b.startY}vh`,
              color: "#081614",
              opacity: active ? 0 : 0,
              transform: `rotate(${b.rotate}deg)`,
              animation: active
                ? `bat-fly-${b.id} ${b.duration}s cubic-bezier(0.4,0,0.2,1) ${b.delay}s forwards`
                : "none",
            }}
          >
            {/* inject per-bat keyframe */}
            {active && (
              <style>{`
                @keyframes bat-fly-${b.id} {
                  0%   { opacity: 0;   transform: translate(0, 0)              rotate(${b.rotate}deg) scale(0.7); }
                  10%  { opacity: 1; }
                  50%  { transform: translate(
                            calc((${b.endX}vw - ${b.startX}vw) * 0.5 + ${b.midOffsetX}vw),
                            calc((${b.endY}vh - ${b.startY}vh) * 0.5 + ${b.midOffsetY}vh)
                          ) rotate(${b.rotate - 15}deg) scale(1); }
                  90%  { opacity: 1; }
                  100% { opacity: 0;   transform: translate(
                            calc(${b.endX}vw - ${b.startX}vw),
                            calc(${b.endY}vh - ${b.startY}vh)
                          ) rotate(${b.rotate + 10}deg) scale(0.8); }
                }
              `}</style>
            )}
            <BatIcon size={b.size} />
          </div>
        );
      })}
    </div>
  );
}
