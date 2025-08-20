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

// ---------- Shared motion presets (string eases to keep TS happy)
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

const itemUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

// ---------- Count-up hook
function useCountUp(target: number, startOn = true, durationMs = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!startOn) return;
    let raf: number;
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

// ---------- Slight-left container helper
function SectionWrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl pl-4 pr-6">{children}</div>;
}

// ---------- Section title (left, growing underline)
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

export default function Home() {
  // ---------- Hero typewriter
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

  // ---------- Scroll-controlled BinaryRain blending
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const rainOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.45, 0]);
  const mistOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.05, 0.55, 1]);
  const mistOpacitySpring = useSpring(mistOpacity, {
    stiffness: 110,
    damping: 24,
    mass: 0.45,
  });

  // ---------- Section parallax backplates (subtle drama for Why Syfter)
  const plateRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: plateProg } = useScroll({
    target: plateRef,
    offset: ["start end", "end start"],
  });
  const plateY = useTransform(plateProg, [0, 1], [40, -40]);
  const plateY2 = useTransform(plateProg, [0, 1], [-30, 30]); // second word
  const plateOpacity = useTransform(plateProg, [0, 0.5, 1], [0.0, 0.15, 0.0]);

  // ---------- Stats trigger
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsActive, setStatsActive] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setStatsActive(entry.isIntersecting),
      { threshold: 0.35 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);
  const c1 = useCountUp(128, statsActive);
  const c2 = useCountUp(5, statsActive);
  const c3 = useCountUp(98, statsActive);

  // ---------- Testimonials
  const testimonials = useMemo(
    () => [
      "“Syfter delivered top candidates in days.” — SaaS Manager",
      "“Recruiting this fast? Unreal.” — Tech Startup CEO",
      "“Candidate quality, unmatched.” — Healthcare Director",
    ],
    []
  );
  const [tIndex, setTIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setTIndex((p) => (p + 1) % testimonials.length),
      5600
    );
    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <>
      <Head>
        <title>Syfter, Precision Staffing Made Human</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* NAVBAR — transparent & minimal */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-7xl pl-4 pr-6">
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

      {/* PAGE BACKGROUND — unified gradient */}
      <main
        id="top"
        className="min-h-screen text-white"
        style={{ background: "linear-gradient(to bottom, #3e4e5e 0%, #28303b 100%)" }}
      >
        {/* HERO */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          {/* Binary layer with scroll fade */}
          <motion.div className="absolute inset-0" style={{ opacity: rainOpacity }}>
            <BinaryRain />
          </motion.div>

          {/* Bottom-up mist to blend into gradient smoothly */}
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

          {/* Floating background words for subtle drama */}
          <div aria-hidden className="absolute inset-0 pointer-events-none select-none">
            <SectionWrap>
              <motion.div
                className="absolute left-6 top-24 text-7xl font-extrabold text-white/5"
                style={{ y: plateY, opacity: plateOpacity }}
              >
                HIRE
              </motion.div>
              <motion.div
                className="absolute right-8 bottom-20 text-7xl font-extrabold text-white/5"
                style={{ y: plateY2, opacity: plateOpacity }}
              >
                TALENT
              </motion.div>
            </SectionWrap>
          </div>

          {/* Hero Copy with typewriter */}
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

        {/* WHY SYFTER — circle-based + big “Syfter Certify” reveal */}
        <section id="whysyfter" ref={plateRef} className="relative py-24">
          <SectionTitle>Why Syfter</SectionTitle>

          {/* Decorative parallax plate */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-12 -z-10 h-64 w-[70%] -translate-x-1/2 rounded-3xl"
            style={{
              y: plateY,
              opacity: plateOpacity,
              background:
                "radial-gradient(60% 80% at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
            }}
          />

          <SectionWrap>
            {/* Top row: the big interactive circle */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <motion.div
                className="group relative col-span-1 md:col-span-2 aspect-square rounded-full ring-1 ring-white/10 bg-white/5 overflow-hidden"
                initial={{ scale: 0.98, y: 16 }}
                whileInView={{ scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-3xl md:text-4xl font-extrabold tracking-tight">Syfter Certify</div>
                </div>
                {/* Hover reveal overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative h-full w-full grid place-items-center p-8 text-center">
                    <p className="text-white/95 max-w-[32ch] text-lg leading-relaxed">
                      A 5-step trust protocol to verify identity, communication, experience, and readiness—so every
                      candidate is real and ready.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Side: smaller circles */}
              <div className="grid grid-cols-1 gap-8">
                {[
                  { t: "AI Proofed", d: "Human-reviewed to avoid automation blind spots." },
                  { t: "Fast Hiring", d: "Reduce time to hire to under 5 days." },
                  { t: "People First", d: "We don’t fill seats — we grow teams." },
                ].map((f, i) => (
                  <motion.div
                    key={f.t}
                    className="group relative aspect-square rounded-full ring-1 ring-white/10 bg-white/5 overflow-hidden"
                    initial={{ scale: 0.98, y: 16 }}
                    whileInView={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.06 }}
                    viewport={{ once: true, amount: 0.4 }}
                  >
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="px-6 text-center text-xl font-semibold">{f.t}</div>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="relative h-full w-full grid place-items-center p-6 text-center">
                        <p className="text-white/95 text-base leading-relaxed">{f.d}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionWrap>
        </section>

        {/* STATS — left aligned with animated underline */}
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

        {/* EXEC TEAM — left-aligned; bubbles pop in (no image fade) */}
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
                  key={tIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                  className="italic text-lg text-white/90"
                >
                  {testimonials[tIndex]}
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </SectionWrap>
        </section>

        {/* CONTACT / FOOTER */}
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
