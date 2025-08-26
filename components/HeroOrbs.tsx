function HeroOrbs() {
  return (
    <>
      <style jsx>{`
        @keyframes orbA {
          0% { transform: translate(-8%, -6%) scale(1); }
          50% { transform: translate(6%, 8%) scale(1.15); }
          100% { transform: translate(-8%, -6%) scale(1); }
        }
        @keyframes orbB {
          0% { transform: translate(10%, -4%) scale(1.05); }
          50% { transform: translate(-6%, 6%) scale(1.2); }
          100% { transform: translate(10%, -4%) scale(1.05); }
        }
        @keyframes orbC {
          0% { transform: translate(-4%, 10%) scale(1); }
          50% { transform: translate(8%, -6%) scale(1.12); }
          100% { transform: translate(-4%, 10%) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .orb { animation: none !important; }
        }
      `}</style>

      {/* IMPORTANT: z-0 (not -z-10) so it sits above the page background but below hero text */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(transparent 31px, rgba(255,255,255,0.08) 32px), linear-gradient(90deg, transparent 31px, rgba(255,255,255,0.08) 32px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* glowing orbs */}
        <span
          className="orb absolute -left-20 -top-16 h-80 w-80 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(105,189,255,0.28), rgba(105,189,255,0) 70%)",
            filter: "blur(22px)",
            animation: "orbA 18s ease-in-out infinite",
          }}
        />
        <span
          className="orb absolute right-0 top-1/4 h-96 w-96 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(105,189,255,0.22), rgba(105,189,255,0) 70%)",
            filter: "blur(24px)",
            animation: "orbB 22s ease-in-out infinite",
          }}
        />
        <span
          className="orb absolute left-1/3 -bottom-16 h-[22rem] w-[22rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.16), rgba(255,255,255,0) 70%)",
            filter: "blur(26px)",
            animation: "orbC 20s ease-in-out infinite",
          }}
        />
        {/* gentle top fade so they don’t crowd the header */}
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,1) 40%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,1) 40%)",
          }}
        />
      </div>
    </>
  );
}
