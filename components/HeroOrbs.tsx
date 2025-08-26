// components/HeroOrbs.tsx
import { useReducedMotion } from "framer-motion";

export default function HeroOrbs() {
  const reduce = useReducedMotion();
  if (reduce) return null; // respects OS "Reduce Motion"

  return (
    <>
      <style jsx>{`
        @keyframes driftA { 0%{transform:translate3d(0,0,0)} 50%{transform:translate3d(4%, -6%,0)} 100%{transform:translate3d(0,0,0)} }
        @keyframes driftB { 0%{transform:translate3d(0,0,0)} 50%{transform:translate3d(-6%, 5%,0)} 100%{transform:translate3d(0,0,0)} }
        @keyframes driftC { 0%{transform:translate3d(0,0,0)} 50%{transform:translate3d(5%, 6%,0)} 100%{transform:translate3d(0,0,0)} }
      `}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute left-[8%] top-[18%] w-[46vw] h-[46vw] rounded-full blur-[80px]"
          style={{
            background: "#69BDFF",
            opacity: 0.18,
            animation: "driftA 22s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-[6%] top-[28%] w-[52vw] h-[52vw] rounded-full blur-[90px]"
          style={{
            background: "#8EC5FF",
            opacity: 0.14,
            animation: "driftB 28s ease-in-out infinite -4s",
          }}
        />
        <div
          className="absolute left-[28%] bottom-[-12%] w-[44vw] h-[44vw] rounded-full blur-[90px]"
          style={{
            background: "#2EB5FF",
            opacity: 0.16,
            animation: "driftC 26s ease-in-out infinite -10s",
          }}
        />
      </div>
    </>
  );
}
