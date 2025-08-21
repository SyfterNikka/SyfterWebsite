// pages/index.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionProps,
} from "framer-motion";
import type { Variants } from "framer-motion";
import BinaryRain from "@/components/BinaryRain";

/* ---------------------------------- */
/* Motion presets                      */
/* ---------------------------------- */
const fadeIn: MotionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: "easeOut" },
  viewport: { once: false, amount: 0.3 },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const statIn: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

/* ---------------------------------- */
/* Utilities                           */
/* ---------------------------------- */
function useOdometer(target: number, startOn = true, durationMs = 1600) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!startOn) return;
    let raf = 0;
    let start: number | null = null;
    const animate = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / durationMs);
      const v = Math.round(target * (1 - Math.pow(1 - p, 3)));
      setDisplay(v);
      if (p < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        // tiny overshoot flicker
        setTimeout(() => setDisplay(target + 1), 90);
        setTimeout(() => setDisplay(target), 180);
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, startOn, durationMs]);
  return display;
}

/* Section content centered */
function SectionWrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6">{children}</div>;
}

/* Title row: left-aligned heading + underline */
function SectionTitle({ children }: { children: string }) {
  return (
    <div className="mx-auto max-w-7xl pl-2 pr-6">
      <motion.h2
        className="text-5xl md:text-6xl font-extrabold tracking-tight text-left"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {children}
      </motion.h2>
      <motion.div
        className="h-[3px] w-24 bg-[#69bdff] rounded-full mt-3"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

/* ---------------------------------- */
/* Parallax helper (TS-safe via any)   */
/* ---------------------------------- */
function ParallaxY({
  children,
  strength = 12,
  mode = "default",
}: {
  children: React.ReactNode;
  strength?: number;
  mode?: "default" | "late";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const offsets = mode === "late" ? ["start 85%", "end 15%"] : ["start 80%", "end 20%"];
  const { scrollYProgress } = useScroll({ target: ref, offset: offsets as any });

  const yRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReduced ? 0 : strength, prefersReduced ? 0 : -strength]
  );
  const y = useSpring(yRaw, { stiffness: 120, damping: 18, mass: 0.4 });

  return (
    <div ref={ref}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ---------------------------------- */
/* Ocean extras for Exec Team          */
/* ---------------------------------- */
function OceanRippleDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <filter id="ripple">
        <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="2" seed="3" result="noise">
          <animate attributeName="baseFrequency" dur="4s" values="0.012 0.016;0.02 0.024;0.012 0.016" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="6">
          <animate attributeName="scale" dur="3.6s" values="3;7;3" repeatCount="indefinite" />
        </feDisplacementMap>
      </filter>
    </svg>
  );
}

/* Gentle background bubbles for depth */
function OceanBackgroundBubbles() {
  return (
    <>
      <style jsx global>{`
        @keyframes rise {
          0% { transform: translateY(40px) scale(0.9); opacity: 0; }
          40% { opacity: .14; }
          100% { transform: translateY(-260px) scale(1.04); opacity: 0; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {[
          { left: "12%", size: 120, dur: 18, delay: 0 },
          { left: "28%", size: 70,  dur: 14, delay: 3 },
          { left: "46%", size: 90,  dur: 20, delay: 1.2 },
          { left: "62%", size: 110, dur: 17, delay: 2.6 },
          { left: "78%", size: 80,  dur: 15, delay: 4.2 },
        ].map((b, i) => (
          <span
            key={i}
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animation: `rise ${b.dur}s linear ${b.delay}s infinite`,
            }}
            className="absolute bottom-0 rounded-full bg-white/6 blur-md"
          />
        ))}
      </div>
    </>
  );
}

/* Team card with tide-reveal bio + grayscale→color + bobbing + subtle tilt */
function TeamCardOcean({
  name,
  title,
  img,
  bio,
  isActive,
  onActive,
  delay = 0,
  parallaxStrength = 12,
}: {
  name: string;
  title: string;
  img: string;
  bio: string;
  isActive: boolean;
  onActive: () => void;
  delay?: number;
  parallaxStrength?: number;
}) {
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [rx, setRx] = useState(0);
  const [ry, setRy] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setRy(px * 6);
    setRx(-py * 6);
  };

  const onLeave = () => {
    setHovered(false);
    setRx(0);
    setRy(0);
  };

  const show = hovered || isActive;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.0, ease: "easeOut", delay }}
      className="relative flex flex-col items-center text-center"
      onMouseEnter={onActive}
      onFocus={onActive}
    >
      {/* slow bob */}
      <motion.div
        animate={prefersReduced ? undefined : { y: [0, -5, 0, 4, 0] }}
        transition={prefersReduced ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* parallax drift */}
        <ParallaxY strength={parallaxStrength} mode="late">
          <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={onLeave}
            onMouseMove={onMove}
            style={{
              transform: prefersReduced ? undefined : `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`,
              willChange: "transform, filter, clip-path",
            }}
            className={
              "relative w-44 h-44 rounded-full overflow-hidden border shadow-2xl " +
              (show ? "border-white/20" : "border-white/10")
            }
          >
            {/* avatar grayscale->color; ripple only while hovered/active */}
            <img
              src={img}
              alt={name}
              className={
                "w-full h-full object-cover transition-all duration-300 " +
                (show ? "grayscale-0" : "grayscale")
              }
              style={{ filter: show ? "url(#ripple)" : undefined }}
            />

            {/* Tide reveal overlay wiping upward */}
            <motion.div
              aria-hidden
              initial={false}
              animate={show ? { clipPath: "inset(0% 0% 0% 0% round 0% 0% 0% 0%)" } : { clipPath: "inset(100% 0% 0% 0% round 50% 50% 0% 0%)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(105,189,255,0.10) 0%, rgba(105,189,255,0.18) 40%, rgba(105,189,255,0.0) 100%)",
                mixBlendMode: "screen",
              }}
            />
            {/* subtle light sweep */}
            <motion.div
              initial={false}
              animate={{ x: show ? "120%" : "-60%" }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/12 to-transparent"
              style={{ mixBlendMode: "screen" }}
            />
          </div>
        </ParallaxY>
      </motion.div>

      {/* Caption */}
      <figcaption className="mt-5">
        <div className={"text-base font-bold " + (show ? "text-white" : "text-white/90")}>{name}</div>
        <div className={"text-sm " + (show ? "text-white/80" : "text-white/60")}>{title}</div>
      </figcaption>

      {/* Slide-in bio panel on hover/active (desktop) */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-4 w-56 text-left rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-[2px]"
          >
            <div className="text-sm text-white/90">{bio}</div>
            <div className="mt-3 h-[2px] w-10 bg-[#69bdff] rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.figure>
  );
}

/* ---------------------------------- */
/* WHY SYFTER – Kinetic words + wave reveal desc + bg word */
type Feature = { key: string; title: string; desc: string; drift: number; bgWord: string };

function WordsTabs() {
  const items: Feature[] = [
    {
      key: "certify",
      title: "Syfter Certify",
      desc:
        "A 5-step trust protocol to verify identity, communication, experience, and readiness — so every candidate is real and ready.",
      drift: 10,
      bgWord: "VERIFY",
    },
    { key: "aiproofed", title: "AI Proofed", desc: "Human-reviewed to avoid automation blind spots.", drift: 6, bgWord: "TRUST" },
    { key: "fast", title: "Fast Hiring", desc: "Reduce time to hire to under 5 days.", drift: 8, bgWord: "SPEED" },
    { key: "people", title: "People First", desc: "We don’t fill seats — we grow teams.", drift: 7, bgWord: "PEOPLE" },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const active = items[activeIdx];

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + items.length) % items.length);
    }
  };

  return (
    <SectionWrap>
      <div
        className="relative grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 items-start"
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Why Syfter features"
      >
        {/* Floating background word for drama */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.bgWord}
            className="pointer-events-none absolute inset-0 select-none"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.06, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="absolute left-4 top-8 text-[12vw] leading-none font-extrabold tracking-tight text-white/5">
              {active.bgWord}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* LEFT: big words */}
        <div className="md:col-span-3 relative mt-16">
          <ul className="space-y-6 md:space-y-7">
            {items.map((it, idx) => {
              const isActive = idx === activeIdx;
              return (
                <li key={it.key} className="relative">
                  <motion.button
                    type="button"
                    onMouseEnter={() => setActiveIdx(idx)}
                    onFocus={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className="block select-none text-left outline-none focus:ring-0"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <motion.span
                      animate={{
                        y: [0, -it.drift, 0, it.drift, 0],
                        x: isActive ? 6 : 0,
                        scale: isActive ? 1.06 : 1,
                      }}
                      transition={{
                        y: { duration: 9 + idx, repeat: Infinity, ease: "easeInOut" },
                        x: { duration: 0.25, ease: "easeOut" },
                        scale: { duration: 0.25, ease: "easeOut" },
                      }}
                      className={
                        "font-extrabold tracking-tight leading-none " +
                        (isActive ? "text-5xl md:text-7xl " : "text-5xl md:text-6xl ") +
                        (isActive ? "text-white" : "text-white/40 hover:text-white/80")
                      }
                  >
                      {it.title}
                    </motion.span>
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT: wave-reveal description, lowered for alignment */}
        <div className="md:col-span-2 md:sticky md:top-24 mt-12 md:mt-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              exit={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <p className="text-xl md:text-2xl leading-relaxed text-white/90">{active.desc}</p>
              <motion.div
                className="mt-4 h-[3px] w-16 bg-[#69bdff] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionWrap>
  );
}

/* ---------------------------------- */
/* Page                                */
/* ---------------------------------- */
export default function Home() {
  // Hero typewriter
  const words = useMemo(() => ["Smarter", "Faster", "Securely", "Syfter"], []);
  const [displayText, setDisplayText] = useState("");
  const [w, setW] = useState(0);
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[w];
    const delay = del ? 40 : 90;
    const t = setTimeout(() => {
      if (!del) {
        setDisplayText(word.slice(0, i + 1));
        setI((p) => p + 1);
        if (i + 1 === word.length) setTimeout(() => setDel(true), 1100);
      } else {
        setDisplayText(word.slice(0, i - 1));
        setI((p) => p - 1);
        if (i - 1 === 0) {
          setDel(false);
          setW((p) => (p + 1) % words.length);
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [i, del, w, words]);

  // Hero rain blend
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] as any });
  const rainOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.45, 0]);
  const mistOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.05, 0.55, 1]);
  const mistOpacitySpring = useSpring(mistOpacity, { stiffness: 110, damping: 24, mass: 0.45 });

  // Navbar behavior
  const [navHidden, setNavHidden] = useState(false);
  const [navCompact, setNavCompact] = useState(false);
  const [navBorder, setNavBorder] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setNavHidden(y > last && y > 140);
      setNavCompact(y > 80);
      setNavBorder(y > 80);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stats trigger
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsActive, setStatsActive] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => setStatsActive(entry.isIntersecting), { threshold: 0.35 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);
  const d1 = useOdometer(128, statsActive);
  const d2 = useOdometer(5, statsActive);
  const d3 = useOdometer(98, statsActive);

  // Exec team active focus index for depth-of-field
  const [activeExec, setActiveExec] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Syfter — Precision Staffing Made Human</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* NAV — transparent, shrinks, bottom border after scroll; no blur */}
      <header
        className={
          "fixed top-0 inset-x-0 z-50 transition-transform duration-300 " +
          (navHidden ? "-translate-y-full" : "translate-y-0")
        }
      >
        <div className={"mx-auto max-w-7xl px-6 " + (navBorder ? "border-b border-white/10" : "")}>
          <nav
            className="flex items-center justify-between transition-[height] duration-300"
            style={{ height: navCompact ? 40 : 56 }}
          >
            <a href="#top" className="text-base md:text-lg font-semibold tracking-tight text-white/90 hover:text-white transition-colors">
              Syfter
            </a>
            <div className="hidden md:flex items-center gap-8 text-sm text-white/80">
              {[
                { t: "Why Syfter", id: "whysyfter" },
                { t: "Find Work", id: "findwork" },
                { t: "Hire Talent", id: "hiretalent" },
                { t: "Contact", id: "contact" },
              ].map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className="relative hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#69bdff] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {l.t}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* PAGE */}
      <main id="top" className="min-h-screen text-white" style={{ background: "linear-gradient(to bottom, #3e4e5e 0%, #28303b 100%)" }}>
        {/* HERO */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          <motion.div className="absolute inset-0" style={{ opacity: rainOpacity }}>
            <BinaryRain />
          </motion.div>

          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: mistOpacitySpring,
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,1) 100%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,1) 100%)",
              background:
                "linear-gradient(to bottom, rgba(62,78,94,0) 0%, rgba(62,78,94,0.12) 35%, rgba(40,48,59,0.5) 70%, rgba(40,48,59,0.9) 100%)",
            }}
          />

          <SectionWrap>
            <div className="relative z-10 flex h-[calc(100vh-0px)] flex-col items-center justify-center text-center">
              <motion.h1 className="text-6xl md:text-7xl font-extrabold tracking-tight" {...fadeIn}>
                Hire <span className="italic text-[#69bdff]">{displayText}</span>
              </motion.h1>
              <motion.p className="mt-5 text-xl max-w-2xl leading-relaxed text-white/90" {...fadeIn}>
                Syfter Certified talent delivered faster, smarter, better.
              </motion.p>
            </div>
          </SectionWrap>
        </section>

        {/* WHY SYFTER */}
        <section id="whysyfter" className="relative py-24">
          <SectionTitle>Why Syfter</SectionTitle>
          <WordsTabs />
        </section>

        {/* TRUSTED RESULTS — odometer + light sweep + parallax */}
        <section id="trusted" ref={statsRef} className="py-24">
          <SectionTitle>Trusted Results</SectionTitle>
          <SectionWrap>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 items-start gap-10 md:gap-0 md:divide-x md:divide-white/10 text-center"
            >
              {[{ val: d1, label: "HIRES PLACED", suffix: "", strength: 10 },
                { val: d2, label: "AVG. FILL TIME (DAYS)", suffix: "", strength: 14 },
                { val: d3, label: "RETENTION RATE", suffix: "%", strength: 12 }].map((s, i) => (
                <motion.div key={i} variants={statIn} className="px-2 md:px-10">
                  <div className="relative inline-block">
                    <ParallaxY strength={s.strength}>
                      <div className="text-[56px] leading-none font-extrabold tracking-tight">
                        {s.val}{s.suffix}
                      </div>
                    </ParallaxY>
                    {/* light sweep under number */}
                    <motion.div
                      className="mx-auto mt-3 h-[3px] w-16 bg-[#69bdff] rounded-full overflow-hidden relative"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 * i }}
                      style={{ transformOrigin: "left" }}
                    >
                      <motion.span
                        className="absolute inset-y-0 left-0 w-8 bg-white/50"
                        initial={{ x: -32, opacity: 0 }}
                        whileInView={{ x: 80, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 * i }}
                        style={{ filter: "blur(3px)" }}
                      />
                    </motion.div>
                  </div>
                  <p className="mt-4 text-xs tracking-widest text-white/70">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </SectionWrap>
        </section>

        {/* EXEC TEAM — tide-reveal bios + depth focus + ocean vibe */}
        <section id="exec" className="py-24 relative">
          <SectionTitle>Executive Team</SectionTitle>
          <OceanRippleDefs />
          <OceanBackgroundBubbles />

          <SectionWrap>
            <div
              className={
                "mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 justify-items-center " +
                (activeExec !== null ? "md:[&>*:not(:nth-child(" + ((activeExec ?? 0) + 1) + "))]:opacity-60" : "")
              }
            >
              {[
                { name: "Steven Perlman", title: "CEO", img: "/team/steve.jpg", bio: "Ex-Oracle | Built high-scale hiring ops." , strength: 12 },
                { name: "Matt Hall", title: "CRO", img: "/team/matt.jpg", bio: "Enterprise GTM leader | FinTech & SaaS.", strength: 16 },
                { name: "Nikka Winchell", title: "CRO", img: "/team/nikka.jpg", bio: "Brand + revenue architect | Ops obsessive.", strength: 14 },
                { name: "Ira Plutner", title: "CFO", img: "/team/ira.jpg", bio: "Finance & FP&A | Growth-stage operator.", strength: 10 },
              ].map((m, i) => (
                <div key={i} onMouseLeave={() => setActiveExec(null)}>
                  <TeamCardOcean
                    name={m.name}
                    title={m.title}
                    img={m.img}
                    bio={m.bio}
                    isActive={activeExec === i}
                    onActive={() => setActiveExec(i)}
                    delay={i * 0.12}
                    parallaxStrength={m.strength}
                  />
                </div>
              ))}
            </div>
          </SectionWrap>
        </section>

        {/* TESTIMONIALS (kept simple & classy) */}
        <section className="py-24">
          <SectionTitle>What Our Clients Say</SectionTitle>
          <SectionWrap>
            <div className="mt-10 min-h-[96px] text-center">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={displayText + "-t"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                  className="italic text-lg text-white/90"
                >
                  “Recruiting this fast? Unreal.” — Tech Startup CEO
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </SectionWrap>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24">
          <SectionTitle>Let’s Build the Future of Work</SectionTitle>
          <SectionWrap>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
              <div className="text-center md:text-left">
                <p className="mb-6 text-lg leading-relaxed text-white/90">
                  Join hundreds of companies who trust Syfter to hire smarter, faster, and with clarity.
                </p>
                <p className="mb-4 text-md text-white/80">New York, NY, Denver, CO, Remote Nationwide</p>
              </div>
              <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg border border-white/10">
                <img src="/MAP.jpg" alt="US Coverage Map" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="mt-12 text-center text-white/60 text-sm">
              © {new Date().getFullYear()} Syfter. All rights reserved.
            </div>
          </SectionWrap>
        </section>
      </main>
    </>
  );
}
