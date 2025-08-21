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
import BinaryRain from "@/components/BinaryRain";

/* ----------------------------- Motion presets ---------------------------- */

const fadeIn: MotionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: "easeOut" },
  viewport: { once: false, amount: 0.3 },
};

/* ------------------------------ Small helpers --------------------------- */

function SectionWrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6">{children}</div>;
}

/** Parallax translateY. (Typed as any on offset to keep TS happy across framer versions.) */
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

/** Odometer-like count with a tiny overshoot */
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
        setTimeout(() => setDisplay(target + 1), 90);
        setTimeout(() => setDisplay(target), 180);
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, startOn, durationMs]);
  return display;
}

/* ------------------------ Typewriter Section Title ----------------------- */

function TypingSectionTitle({ text }: { text: string }) {
  const [started, setStarted] = useState(false);
  const [chars, setChars] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (chars >= text.length) return;
    const t = setTimeout(() => setChars((c) => c + 1), 45); // slower typing
    return () => clearTimeout(t);
  }, [started, chars, text.length]);

  return (
    <div ref={ref} className="mx-auto max-w-7xl pl-2 pr-6">
      <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-left">
        <span aria-label={text}>{text.slice(0, chars)}</span>
        <span className="inline-block w-[0.55ch] border-r-2 border-white/80 ml-[1px] align-middle animate-pulse" />
      </h2>
      <motion.div
        className="h-[3px] w-24 bg-[#69bdff] rounded-full mt-3"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={started ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

/* --------------------------- Why Syfter words --------------------------- */

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
        {/* Background word */}
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

        {/* LEFT: kinetic words */}
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

        {/* RIGHT: wave reveal description, lowered for alignment */}
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

/* ---------------------------- Exec cards (clean) ------------------------- */

function QuoteTyper({ text, active, speed = 32 }: { text: string; active: boolean; speed?: number }) {
  const [chars, setChars] = useState(0);
  useEffect(() => {
    if (!active) {
      setChars(0);
      return;
    }
    if (chars >= text.length) return;
    const t = setTimeout(() => setChars((c) => c + 1), speed); // slower typing for exec bio
    return () => clearTimeout(t);
  }, [active, chars, text.length, speed]);
  return <span>{text.slice(0, chars)}</span>;
}

function ExecCard({
  name,
  title,
  img,
  onHover,
  delay = 0,
  parallaxStrength = 12,
}: {
  name: string;
  title: string;
  img: string;
  onHover: () => void;
  delay?: number;
  parallaxStrength?: number;
}) {
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.0, ease: "easeOut", delay }}
      className="w-[13rem] sm:w-[14rem] flex flex-col items-center text-center"
      onMouseEnter={() => {
        setHovered(true);
        onHover();
      }}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => {
        setHovered(true);
        onHover();
      }}
      onBlur={() => setHovered(false)}
      onClick={onHover}
    >
      <motion.div
        animate={prefersReduced ? undefined : { y: [0, -5, 0, 4, 0] }}
        transition={prefersReduced ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ParallaxY strength={parallaxStrength} mode="late">
          <div className="relative w-44 h-44 rounded-full overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={img}
              alt={name}
              className={"w-full h-full object-cover transition-all duration-300 " + (hovered ? "grayscale-0" : "grayscale")}
            />
            {/* soft light sweep */}
            <motion.div
              initial={false}
              animate={{ x: hovered ? "120%" : "-60%" }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              style={{ mixBlendMode: "screen" }}
            />
          </div>
        </ParallaxY>
      </motion.div>

      {/* Name/Title */}
      <figcaption className="mt-5">
        <div className="text-base font-bold">{name}</div>
        <div className="text-sm text-white/80">{title}</div>
      </figcaption>
    </motion.figure>
  );
}

/* ---------------------------- Map with heat overlay ---------------------- */

function MapWithHeat() {
  // Major markets. Tweak positions to match your /MAP.jpg.
  const heatpoints = [
    { top: "42%", left: "78%" }, // NYC
    { top: "38%", left: "81%" }, // Boston
    { top: "46%", left: "75%" }, // DC
    { top: "60%", left: "81%" }, // Miami
    { top: "40%", left: "64%" }, // Chicago
    { top: "55%", left: "57%" }, // Dallas
    { top: "60%", left: "55%" }, // Houston
    { top: "48%", left: "50%" }, // Denver
    { top: "44%", left: "20%" }, // SF
    { top: "56%", left: "18%" }, // LA
    { top: "36%", left: "16%" }, // Seattle
    { top: "58%", left: "34%" }, // Phoenix
    { top: "56%", left: "70%" }, // Atlanta
    { top: "58%", left: "58%" }, // Austin
  ];

  return (
    <>
      {/* soft, slow pulse */}
      <style jsx global>{`
        @keyframes pulseHeat {
          0% { transform: translate(-50%, -50%) scale(0.96); opacity: .35; }
          50% { transform: translate(-50%, -50%) scale(1.08); opacity: .55; }
          100% { transform: translate(-50%, -50%) scale(0.96); opacity: .35; }
        }
      `}</style>

      {/* No border/shadow — just image + overlays */}
      <div className="relative w-full h-96 overflow-hidden">
        <img
          src="/MAP.jpg"
          alt="US Coverage Map"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Heat overlay wrapper — global intensity knob via opacity */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0.75 }}
        >
          {heatpoints.map((p, i) => (
            <div key={i}>
              {/* Core (small, a bit brighter) */}
              <span
                className="absolute"
                style={{
                  top: p.top,
                  left: p.left,
                  width: 70,
                  height: 70,
                  transform: "translate(-50%, -50%)",
                  background:
                    "radial-gradient(circle, rgba(105,189,255,0.18) 0%, rgba(105,189,255,0.00) 70%)",
                  filter: "blur(6px)",
                  animation: "pulseHeat 5.2s ease-in-out infinite",
                  animationDelay: `${i * 0.25}s`,
                }}
              />
              {/* Halo (larger, very soft) */}
              <span
                className="absolute"
                style={{
                  top: p.top,
                  left: p.left,
                  width: 150,
                  height: 150,
                  transform: "translate(-50%, -50%)",
                  background:
                    "radial-gradient(circle, rgba(105,189,255,0.12) 0%, rgba(105,189,255,0.05) 45%, rgba(255,255,255,0) 70%)",
                  filter: "blur(14px)",
                  animation: "pulseHeat 6.2s ease-in-out infinite",
                  animationDelay: `${0.8 + i * 0.25}s`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------------------------------- Page --------------------------------- */

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

  // Hero blend
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

  /* Exec bio quote (shared bar, no layout jump) */
  const [execQuote, setExecQuote] = useState("");
  const execQuotes = [
    "Built high-scale hiring teams. Exec Coach. LinkedIn aficionado.",
    "Enterprise GTM leader across SaaS & FinTech. Recruiting expert.",
    "Brand + revenue architect. Ops-obsessed.",
    "Finance & FP&A at growth-stage companies. Numbers guru.",
  ];

  return (
    <>
      <Head>
        <title>Syfter — Precision Staffing Made Human</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* NAV */}
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

      {/* PAGE BACKGROUND */}
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
          <TypingSectionTitle text="Why Syfter" />
          <WordsTabs />
        </section>

        {/* TRUSTED RESULTS */}
        <section id="trusted" ref={statsRef} className="py-24">
          <TypingSectionTitle text="Trusted Results" />
          <SectionWrap>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 items-start gap-10 md:gap-0 md:divide-x md:divide-white/10 text-center">
              {[
                { val: d1, label: "HIRES PLACED", suffix: "", strength: 10 },
                { val: d2, label: "AVG. FILL TIME (DAYS)", suffix: "", strength: 14 },
                { val: d3, label: "RETENTION RATE", suffix: "%", strength: 12 },
              ].map((s, i) => (
                <div key={i} className="px-2 md:px-10">
                  <div className="relative inline-block">
                    <ParallaxY strength={s.strength}>
                      <div className="text-[56px] leading-none font-extrabold tracking-tight">
                        {s.val}
                        {s.suffix}
                      </div>
                    </ParallaxY>
                    {/* light sweep underline */}
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
                </div>
              ))}
            </div>
          </SectionWrap>
        </section>

        {/* EXECUTIVE TEAM */}
        <section id="exec" className="py-24 relative">
          <TypingSectionTitle text="Executive Team" />
          <SectionWrap>
            {/* Grid with unified quote bar below (no layout jump) */}
            <div
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 justify-items-center"
              onMouseLeave={() => setExecQuote("")}
            >
              <ExecCard
                name="Steven Perlman"
                title="CEO"
                img="/team/steve.jpg"
                onHover={() => setExecQuote(execQuotes[0])}
                delay={0.0}
                parallaxStrength={12}
              />
              <ExecCard
                name="Matt Hall"
                title="CRO"
                img="/team/matt.jpg"
                onHover={() => setExecQuote(execQuotes[1])}
                delay={0.12}
                parallaxStrength={16}
              />
              <ExecCard
                name="Nikka Winchell"
                title="CRO"
                img="/team/nikka.jpg"
                onHover={() => setExecQuote(execQuotes[2])}
                delay={0.24}
                parallaxStrength={14}
              />
              <ExecCard
                name="Ira Plutner"
                title="CFO"
                img="/team/ira.jpg"
                onHover={() => setExecQuote(execQuotes[3])}
                delay={0.36}
                parallaxStrength={10}
              />
            </div>

            {/* Reserved height quote area so section height stays constant */}
            <div className="mt-8 min-h-[64px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {execQuote ? (
                  <motion.div
                    key={execQuote}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-center text-xl md:text-2xl text-white/95"
                  >
                    <QuoteTyper text={execQuote} active={!!execQuote} speed={32} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.0 }}
                    exit={{ opacity: 0 }}
                    className="text-xl md:text-2xl"
                  />
                )}
              </AnimatePresence>
            </div>
          </SectionWrap>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24">
          <TypingSectionTitle text="What Our Clients Say" />
          <SectionWrap>
            <div className="mt-10 min-h-[110px] text-center">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={displayText + "-t"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                  className="relative italic font-medium text-2xl md:text-3xl leading-snug text-white/95"
                >
                  <span className="absolute -left-6 -top-4 text-5xl text-white/30 select-none">“</span>
                  Recruiting this fast? Unreal. — Tech Startup CEO
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </SectionWrap>
        </section>

        {/* CONTACT / MAP */}
        <section id="contact" className="py-24">
          <TypingSectionTitle text="Let’s Build the Future of Work" />
          <SectionWrap>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
              <div className="text-center md:text-left">
                <p className="mb-6 text-lg leading-relaxed text-white/90">
                  Join hundreds of companies who trust Syfter to hire smarter, faster, and with clarity.
                </p>
                <p className="mb-4 text-md text-white/80">New York, NY • Denver, CO • Remote Nationwide</p>
              </div>
              {/* Heat map (no border, no shadow) */}
              <MapWithHeat />
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
