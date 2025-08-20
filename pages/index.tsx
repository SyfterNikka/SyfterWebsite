// pages/index.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  type MotionProps,
} from "framer-motion";
import type { Variants } from "framer-motion";
import BinaryRain from "@/components/BinaryRain";

/* ---------------------------------- */
/* Motion presets (compile-safe)      */
/* ---------------------------------- */
const fadeIn: MotionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: "easeOut" },
  viewport: { once: false, amount: 0.3 },
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ---------------------------------- */
/* Small utilities                    */
/* ---------------------------------- */
function useCountUp(target: number, startOn = true, durationMs = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!startOn) return;
    let raf = 0;
    let start: number | null = null;
    const animate = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / durationMs);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, startOn, durationMs]);
  return value;
}

/* Shared container with slight-left bias for most sections */
function SectionWrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl pl-3 pr-6">{children}</div>;
}

/* Title with animated underline */
function SectionTitle({ children }: { children: string }) {
  return (
    <SectionWrap>
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
    </SectionWrap>
  );
}

/* ---------------------------------- */
/* KineticWords (Why Syfter)          */
/* ---------------------------------- */
type Feature = { key: string; title: string; desc: string; left: string; top: string; drift: number };

function KineticWords() {
  // Max-width centered stage (no left bias here so it feels “on-screen centered”)
  // Stage is relative; words are absolutely positioned as large, floating type.
  const features: Feature[] = [
    {
      key: "certify",
      title: "Syfter Certify",
      desc:
        "A 5-step trust protocol to verify identity, communication, experience, and readiness — so every candidate is real and ready.",
      left: "10%", top: "18%", drift: 10,
    },
    {
      key: "aiproofed",
      title: "AI Proofed",
      desc: "Human-reviewed to avoid automation blind spots.",
      left: "62%", top: "14%", drift: 6,
    },
    {
      key: "fast",
      title: "Fast Hiring",
      desc: "Reduce time to hire to under 5 days.",
      left: "64%", top: "60%", drift: 8,
    },
    {
      key: "people",
      title: "People First",
      desc: "We don’t fill seats — we grow teams.",
      left: "12%", top: "64%", drift: 7,
    },
  ];

  const [active, setActive] = useState<string>("certify");

  return (
    <div className="relative mx-auto max-w-6xl px-6 h-[520px] md:h-[560px]">
      {/* Description panel (pins left and swaps text on hover) */}
      <div className="absolute left-0 top-0 md:left-2 md:top-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="max-w-[420px] rounded-2xl bg-black/40 backdrop-blur-sm ring-1 ring-white/10 p-5 hidden md:block"
          >
            <div className="text-sm uppercase tracking-wider text-white/70">Why Syfter</div>
            <div className="mt-2 text-xl font-semibold">
              {features.find(f => f.key === active)?.title}
            </div>
            <p className="mt-2 text-white/90 leading-relaxed">
              {features.find(f => f.key === active)?.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Words */}
      {features.map((f, i) => (
        <motion.button
          key={f.key}
          type="button"
          onMouseEnter={() => setActive(f.key)}
          onFocus={() => setActive(f.key)}
          onClick={() => setActive(f.key)}
          className="absolute select-none"
          style={{ left: f.left, top: f.top }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          animate={{
            scale: active === f.key ? 1.08 : 1,
            filter: active === f.key ? "none" : "blur(0px)",
          }}
          transition={{ duration: 0.28 }}
        >
          <motion.span
            // gentle perpetual drift (unique per word)
            animate={{ y: [0, -f.drift, 0, f.drift, 0] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }}
            className={
              "font-extrabold tracking-tight " +
              "text-5xl md:text-7xl " +
              (active === f.key ? "text-white" : "text-white/25 hover:text-white/70")
            }
          >
            {f.title}
          </motion.span>
        </motion.button>
      ))}

      {/* Mobile: tap cards */}
      <div className="md:hidden grid grid-cols-1 gap-3 absolute inset-x-6 bottom-0">
        {features.map((f) => {
          const open = active === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setActive(open ? "certify" : f.key)}
              className="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{f.title}</div>
                <div className="text-white/70 text-sm">{open ? "Hide" : "Show"}</div>
              </div>
              <AnimatePresence>
                {open && (
                  <motion.p
                    className="text-white/90 mt-2 leading-relaxed text-sm"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {f.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
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
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const rainOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.45, 0]);
  const mistOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.05, 0.55, 1]);
  const mistOpacitySpring = useSpring(mistOpacity, { stiffness: 110, damping: 24, mass: 0.45 });

  // Auto-hide / solidify navbar on scroll
  const [navHidden, setNavHidden] = useState(false);
  const [navSolid, setNavSolid] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setNavHidden(y > last && y > 140); // hide when scrolling down past hero
      setNavSolid(y > 80);               // add blur/film once you leave hero top
      last = y;
    };
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
  const c1 = useCountUp(128, statsActive);
  const c2 = useCountUp(5, statsActive);
  const c3 = useCountUp(98, statsActive);

  return (
    <>
      <Head>
        <title>Syfter, Precision Staffing Made Human</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Transparent Nav that hides on scroll down + blurs after hero */}
      <header
        className={
          "fixed top-0 inset-x-0 z-50 transition-transform duration-300 " +
          (navHidden ? "-translate-y-full" : "translate-y-0")
        }
      >
        <div
          className={
            "mx-auto max-w-7xl pl-3 pr-6 transition-colors duration-300 " +
            (navSolid ? "backdrop-blur-md bg-black/10 ring-1 ring-white/10 rounded-b-xl" : "")
          }
        >
          <nav className="mt-4 flex h-12 items-center justify-between">
            <a
              href="#top"
              className="text-base md:text-lg font-semibold tracking-tight text-white/90 hover:text-white transition-colors"
            >
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

      {/* Page Background */}
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

        {/* WHY SYFTER — kinetic words (centered stage, hover-to-reveal) */}
        <section id="whysyfter" className="relative py-24">
          <SectionTitle>Why Syfter</SectionTitle>
          <div className="mt-10">
            <KineticWords />
          </div>
        </section>

        {/* STATS */}
        <section id="trusted" ref={statsRef} className="py-24">
          <SectionTitle>Trusted Results</SectionTitle>
          <SectionWrap>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { val: c1, label: "hires placed", suffix: "" },
                { val: c2, label: "avg. fill time (days)", suffix: "" },
                { val: c3, label: "retention rate", suffix: "%" },
              ].map((s, i) => (
                <motion.div key={i} className="flex flex-col items-start" {...fadeIn}>
                  <div className="text-[56px] leading-none font-extrabold tracking-tight">
                    {s.val}
                    {s.suffix}
                  </div>
                  <p className="mt-2 text-sm uppercase tracking-wider text-white/70">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </SectionWrap>
        </section>

        {/* EXEC TEAM (left-aligned, pop-in one-by-one; no image fade) */}
        <section id="exec" className="py-24">
          <SectionTitle>Executive Team</SectionTitle>
          <SectionWrap>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 place-items-start">
              {[
                { name: "Steven Perlman", title: "CEO", img: "/team/steve.jpg" },
                { name: "Matt Hall", title: "CRO", img: "/team/matt.jpg" },
                { name: "Nikka Winchell", title: "CRO", img: "/team/nikka.jpg" },
                { name: "Ira Plutner", title: "CFO", img: "/team/ira.jpg" },
              ].map((m, i) => (
                <motion.figure
                  key={i}
                  initial={{ y: 22, scale: 0.96 }}
                  whileInView={{ y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
                  viewport={{ once: true, amount: 0.4 }}
                  className="flex flex-col items-start"
                >
                  <div className="w-44 h-44 rounded-full overflow-hidden shadow-2xl border border-white/10">
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <figcaption className="mt-4 text-left">
                    <div className="text-base font-bold">{m.name}</div>
                    <div className="text-sm text-white/80">{m.title}</div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </SectionWrap>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24">
          <SectionTitle>What Our Clients Say</SectionTitle>
          <SectionWrap>
            <div className="mt-10 min-h-[96px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={displayText + "-t"} // tiny motion tied to hero typewriter
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
              <div>
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
