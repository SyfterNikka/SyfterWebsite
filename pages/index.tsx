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

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const bubbleStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const bubbleIn: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.88 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

const statIn: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

/* ---------------------------------- */
/* Utilities                          */
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

/* Centered container for section content */
function SectionWrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6">{children}</div>;
}

/* Title row: left-aligned heading + animated underline (content below is centered) */
function SectionTitle({ children }: { children: string }) {
  return (
    <div className="mx-auto max-w-6xl px-6">
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
/* WHY SYFTER – Kinetic words/tabs    */
/* ---------------------------------- */
type Feature = { key: string; title: string; desc: string; drift: number };

function WordsTabs() {
  const items: Feature[] = [
    {
      key: "certify",
      title: "Syfter Certify",
      desc:
        "A 5-step trust protocol to verify identity, communication, experience, and readiness — so every candidate is real and ready.",
      drift: 10,
    },
    { key: "aiproofed", title: "AI Proofed", desc: "Human-reviewed to avoid automation blind spots.", drift: 6 },
    { key: "fast", title: "Fast Hiring", desc: "Reduce time to hire to under 5 days.", drift: 8 },
    { key: "people", title: "People First", desc: "We don’t fill seats — we grow teams.", drift: 7 },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const active = items[activeIdx];

  // Arrow up/down keyboard support
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
        className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 items-start"
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Why Syfter features"
      >
        {/* LEFT: big words (floating) */}
        <div className="md:col-span-3 relative">
          <ul className="space-y-6 md:space-y-7">
            {items.map((it, idx) => {
              const isActive = idx === activeIdx;
              return (
                <li key={it.key} className="relative">
                  {/* Active accent bar */}
                  <motion.span
                    className="absolute -left-4 md:-left-5 top-1/2 -translate-y-1/2 h-1 rounded-full bg-[#69bdff]"
                    initial={false}
                    animate={{ width: isActive ? 28 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    aria-hidden
                  />
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

        {/* RIGHT: sticky description */}
        <div className="md:col-span-2 md:sticky md:top-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="text-sm uppercase tracking-wider text-white/70">Why Syfter</div>
              <div className="mt-2 text-2xl font-semibold">{active.title}</div>
              <p className="mt-3 text-white/90 leading-relaxed">{active.desc}</p>
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
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const rainOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.45, 0]);
  const mistOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.05, 0.55, 1]);
  const mistOpacitySpring = useSpring(mistOpacity, { stiffness: 110, damping: 24, mass: 0.45 });

  // Navbar: transparent + auto-hide on scroll down + compact height + bottom border after 80px
  const [navHidden, setNavHidden] = useState(false);
  const [navCompact, setNavCompact] = useState(false);
  const [navBorder, setNavBorder] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setNavHidden(y > last && y > 140); // hide when scrolling down past hero
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
  const c1 = useCountUp(128, statsActive);
  const c2 = useCountUp(5, statsActive);
  const c3 = useCountUp(98, statsActive);

  return (
    <>
      <Head>
        <title>Syfter, Precision Staffing Made Human</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* NAV — transparent, shrinks, adds subtle bottom border after scroll; no blur */}
      <header
        className={
          "fixed top-0 inset-x-0 z-50 transition-transform duration-300 " +
          (navHidden ? "-translate-y-full" : "translate-y-0")
        }
      >
        <div
          className={
            "mx-auto max-w-7xl px-6 " + (navBorder ? "border-b border-white/10" : "")
          }
        >
          <nav
            className="flex items-center justify-between transition-[height] duration-300"
            style={{ height: navCompact ? 40 : 56 }}
          >
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

      {/* PAGE */}
      <main
        id="top"
        className="min-h-screen text-white"
        style={{ background: "linear-gradient(to bottom, #3e4e5e 0%, #28303b 100%)" }}
      >
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

        {/* WHY SYFTER — words left, description right (content centered; heading left) */}
        <section id="whysyfter" className="relative py-24">
          <SectionTitle>Why Syfter</SectionTitle>
          <WordsTabs />
        </section>

        {/* STATS — centered cards with sweep underline */}
        <section id="trusted" ref={statsRef} className="py-24">
          <SectionTitle>Trusted Results</SectionTitle>
          <SectionWrap>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center"
            >
              {[
                { val: c1, label: "HIRES PLACED", suffix: "" },
                { val: c2, label: "AVG. FILL TIME (DAYS)", suffix: "" },
                { val: c3, label: "RETENTION RATE", suffix: "%" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  variants={statIn}
                  className="w-full max-w-xs rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                >
                  <div className="relative">
                    <div className="text-[56px] leading-none font-extrabold tracking-tight">
                      {s.val}
                      {s.suffix}
                    </div>
                    {/* Sweep underline */}
                    <motion.div
                      className="mx-auto mt-3 h-[3px] w-16 bg-[#69bdff] rounded-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 * i }}
                      style={{ transformOrigin: "left" }}
                    />
                  </div>
                  <p className="mt-4 text-xs tracking-widest text-white/70">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </SectionWrap>
        </section>

        {/* EXEC TEAM — heading left; content centered; staggered bubble pop-in */}
        <section id="exec" className="py-24">
          <SectionTitle>Executive Team</SectionTitle>
          <SectionWrap>
            <motion.div
              variants={bubbleStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-items-center"
            >
              {[
                { name: "Steven Perlman", title: "CEO", img: "/team/steve.jpg" },
                { name: "Matt Hall", title: "CRO", img: "/team/matt.jpg" },
                { name: "Nikka Winchell", title: "CRO", img: "/team/nikka.jpg" },
                { name: "Ira Plutner", title: "CFO", img: "/team/ira.jpg" },
              ].map((m, i) => (
                <motion.figure key={i} variants={bubbleIn} className="flex flex-col items-center text-center">
                  <div className="w-44 h-44 rounded-full overflow-hidden shadow-2xl border border-white/10">
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <figcaption className="mt-4">
                    <div className="text-base font-bold">{m.name}</div>
                    <div className="text-sm text-white/80">{m.title}</div>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </SectionWrap>
        </section>

        {/* TESTIMONIALS (unchanged, content centered by SectionWrap) */}
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

        {/* CONTACT (content centered; heading left) */}
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
