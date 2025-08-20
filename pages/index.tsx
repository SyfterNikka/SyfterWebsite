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

// Motion presets
const easeOut = [0.22, 1, 0.36, 1] as const;
const easeOutCubic = [0.2, 0, 0, 1] as const;

const fadeIn: MotionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: easeOut },
  viewport: { once: false, amount: 0.3 },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeOutCubic } },
};

// Count-up hook
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

// Left-aligned animated section title
function SectionTitle({ children }: { children: string }) {
  return (
    <div className="mx-auto max-w-6xl px-6 text-left">
      <motion.h2
        className="text-5xl md:text-6xl font-extrabold tracking-tight"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {children}
      </motion.h2>
      <motion.div
        className="h-[3px] w-24 bg-[#69bdff] rounded-full mt-3"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOut }}
        viewport={{ once: true, amount: 0.6 }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {children}
      </motion.h2>
      <motion.div
        className="h-[3px] w-24 bg-[#69bdff] rounded-full mt-3"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOut }}
        viewport={{ once: true, amount: 0.6 }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

export default function Home() {
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

  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const rainOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.45, 0]);
  const mistOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.05, 0.55, 1]);
  const mistOpacitySpring = useSpring(mistOpacity, { stiffness: 110, damping: 24, mass: 0.45 });

  const plateRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: plateProg } = useScroll({ target: plateRef, offset: ["start end", "end start"] });
  const plateY = useTransform(plateProg, [0, 1], [40, -40]);
  const plateOpacity = useTransform(plateProg, [0, 0.5, 1], [0.0, 0.15, 0.0]);

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
    const id = setInterval(() => setTIndex((p) => (p + 1) % testimonials.length), 5600);
    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <>
      <Head>
        <title>Syfter, Precision Staffing Made Human</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mt-4 flex h-12 items-center justify-between">
            <a href="#top" className="text-base md:text-lg font-semibold tracking-tight text-white/90 hover:text-white transition-colors">Syfter</a>
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
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
            <motion.h1 className="text-6xl md:text-7xl font-extrabold tracking-tight" {...fadeIn}>
              Hire <span className="italic text-[#69bdff]">{displayText}</span>
            </motion.h1>
            <motion.p className="mt-5 text-xl max-w-2xl leading-relaxed text-white/90" {...fadeIn}>
              Syfter Certified talent delivered faster, smarter, better.
            </motion.p>
          </div>
        </section>

        {/* WHY SYFTER */}
        <section id="whysyfter" ref={plateRef} className="relative py-24">
          <SectionTitle>Why Syfter</SectionTitle>
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-12 -z-10 h-64 w-[70%] -translate-x-1/2 rounded-3xl"
            style={{ y: plateY, opacity: plateOpacity, background: "radial-gradient(60% 80% at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)" }}
          />
          <div className="mx-auto max-w-6xl px-6 mt-12">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {[
                { title: "Syfter Certified", body: "Screened for resilience, communication, and excellence." },
                { title: "AI Proofed", body: "Human reviewed to avoid automation blind spots." },
                { title: "Fast Hiring", body: "Reduce time to hire to under 5 days." },
                { title: "People First", body: "We don’t fill seats, we grow teams." },
              ].map((card, idx) => (
                <motion.article
                  key={idx}
                  variants={itemUp}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/7 transition"
                >
                  <div className="flex items-start gap-5">
                    <div className="mt-1 h-12 w-12 rounded-xl bg-[#69bdff]/20 ring-1 ring-[#69bdff]/30 grid place-items-center text-white/90 font-extrabold">
                      {idx + 1}
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-semibold tracking-tight">{card.title}</h3>
                      <p className="mt-2 text-white/80 leading-relaxed md:max-w-[46ch]">{card.body}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* STATS */}
        <section id="trusted" ref={statsRef} className="py-24">
          <SectionTitle>Trusted Results</SectionTitle>
          <div className="mx-auto max-w-5xl px-6 mt-10 text-left">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
          </div>
        </section>

        {/* EXEC TEAM — float-in + gentle idle bob */}
        <section id="exec" className="py-24">
          <SectionTitle>Executive Team</SectionTitle>
          <div className="mx-auto max-w-5xl px-6 mt-10 text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 place-items-center"
            >
              {[
                { name: "Steven Perlman", title: "CEO", img: "/team/steve.jpg" },
                { name: "Matt Hall", title: "CRO", img: "/team/matt.jpg" },
                { name: "Nikka Winchell", title: "CRO", img: "/team/nikka.jpg" },
                { name: "Ira Plutner", title: "CFO", img: "/team/ira.jpg" },
              ].map((m, i) => (
                <motion.figure
                  key={i}
                  variants={itemUp}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: easeOut, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className="w-44 h-44 rounded-full overflow-hidden shadow-2xl border border-white/10"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                  </motion.div>
                  <figcaption className="mt-4">
                    <div className="text-base font-bold">{m.name}</div>
                    <div className="text-sm text-white/80">{m.title}</div>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24">
          <SectionTitle>What Our Clients Say</SectionTitle>
          <div className="mx-auto max-w-3xl px-6 mt-10 text-left">
            <div className="min-h-[96px]">
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
          </div>
        </section>

        {/* CONTACT / FOOTER */}
        <section id="contact" className="py-24">
          <SectionTitle>Let’s Build the Future of Work</SectionTitle>
          <div className="mx-auto max-w-6xl px-6 mt-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
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
        </section>
      </main>
    </>
  );
}
