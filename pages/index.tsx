import { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, type MotionProps } from "framer-motion";
import BinaryRain from "@/components/BinaryRain";

// ---------- Shared Motion Presets ----------
const fadeIn: MotionProps = {
  initial: { opacity: 0, y: 40, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.9, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  viewport: { once: false, amount: 0.35 }
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.2, 0, 0, 1] } }
};

// ---------- Utils ----------
function useCountUp(target: number, startOn = true, durationMs = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!startOn) return;
    let raf: number;
    let start: number | null = null;
    const animate = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / durationMs);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3)))); // easeOutCubic
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, startOn, durationMs]);
  return value;
}

export default function Home() {
  // ---------- Hero Typing ----------
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

  // ---------- Scroll / Hero Mist Fade ----------
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  // Binary rain fades out as user scrolls down the hero
  const rainOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.45, 0]);
  // Mist rises from bottom of hero as user scrolls
  const mistOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.1, 0.6, 1]);
  const mistOpacitySpring = useSpring(mistOpacity, { stiffness: 120, damping: 26, mass: 0.4 });

  // ---------- Stats Counter Trigger ----------
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsActive, setStatsActive] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => setStatsActive(entry.isIntersecting), { threshold: 0.4 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const c1 = useCountUp(128, statsActive);
  const c2 = useCountUp(5, statsActive);
  const c3 = useCountUp(98, statsActive);

  // ---------- Testimonials ----------
  const testimonials = [
    "“Syfter delivered top candidates in days.” — SaaS Manager",
    "“Recruiting this fast? Unreal.” — Tech Startup CEO",
    "“Candidate quality, unmatched.” — Healthcare Director"
  ];
  const [tIndex, setTIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTIndex((p) => (p + 1) % testimonials.length), 5500);
    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <>
      <Head>
        <title>Syfter, Precision Staffing Made Human</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* NAVBAR */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mt-4 flex items-center justify-between rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 px-4 py-3">
            <a href="#top" className="text-lg font-semibold tracking-tight text-white">Syfter</a>
            <div className="hidden md:flex items-center gap-6 text-sm text-white/90">
              {[
                { t: "Why Syfter", id: "whysyfter" },
                { t: "Find Work", id: "findwork" },
                { t: "Hire Talent", id: "hiretalent" },
                { t: "Contact", id: "contact" }
              ].map((l) => (
                <a key={l.id} href={`#${l.id}`} className="hover:text-[#69bdff] transition-colors">
                  {l.t}
                </a>
              ))}
            </div>
            <a href="#contact" className="rounded-xl bg-[#69bdff] px-4 py-2 text-sm font-semibold text-black hover:opacity-90 transition">Get Started</a>
          </nav>
        </div>
      </header>

      {/* PAGE BACKGROUND — unified gradient */}
      <main id="top" className="min-h-screen text-white" style={{ background: "linear-gradient(to bottom, #3e4e5e 0%, #28303b 100%)" }}>
        {/* HERO */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          {/* Parallax Stars/Binary Layer */}
          <motion.div className="absolute inset-0" style={{ opacity: rainOpacity }}>
            <BinaryRain />
          </motion.div>

          {/* Subtle mist fade from bottom -> matches gradient to avoid hard stop */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: mistOpacitySpring,
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,1) 100%)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,1) 100%)",
              background: "linear-gradient(to bottom, rgba(62,78,94,0) 0%, rgba(62,78,94,0.2) 30%, rgba(40,48,59,0.6) 70%, rgba(40,48,59,1) 100%)"
            }}
          />

          {/* Hero Copy */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
            <motion.h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight" {...fadeIn}>
              Hire <span className="italic text-[#69bdff]">{displayText}</span>
            </motion.h1>
            <motion.p className="mt-5 text-lg sm:text-xl max-w-2xl" {...fadeIn}>
              Syfter Certified talent delivered faster, smarter, better.
            </motion.p>
            <motion.div className="mt-10 flex gap-4" {...fadeIn}>
              <a href="#hiretalent" className="rounded-xl bg-white text-blue-700 font-semibold py-2.5 px-6 hover:bg-gray-100 transition">Find Talent</a>
              <a href="#findwork" className="rounded-xl bg-white text-blue-700 font-semibold py-2.5 px-6 hover:bg-gray-100 transition">Find Jobs</a>
            </motion.div>
          </div>
        </section>

        {/* WHY SYFTER */}
        <section id="whysyfter" className="relative py-28">
          <div className="mx-auto max-w-6xl px-6">
            <motion.h2 className="text-5xl font-bold mb-14 inline-block border-b-4 border-[#69bdff] pb-1" {...fadeIn}>Why Syfter</motion.h2>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
              {[
                { title: "Syfter Certified", body: "Screened for resilience, communication, and excellence." },
                { title: "AI-Proofed", body: "Human-reviewed to avoid automation blind spots." },
                { title: "Fast Hiring", body: "Reduce time-to-hire to under 5 days." },
                { title: "People First", body: "We don’t fill seats, we grow teams." }
              ].map((card, idx) => (
                <motion.div key={idx} variants={itemUp} className="flex flex-col items-center text-center">
                  <div className="w-28 h-28 rounded-full bg-white text-gray-900 grid place-items-center font-bold text-sm shadow-md border border-white/50">
                    {card.title}
                  </div>
                  <p className="mt-4 text-sm text-white/90 max-w-[16rem]">{card.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* STATS */}
        <section id="trusted" ref={statsRef} className="py-24">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <motion.h2 className="text-5xl font-bold mb-12 underline decoration-[#69bdff]" {...fadeIn}>Trusted Results</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { val: c1, label: "hires placed", suffix: "" },
                { val: c2, label: "avg. fill time (days)", suffix: "" },
                { val: c3, label: "retention rate", suffix: "%" }
              ].map((s, i) => (
                <motion.div key={i} className="flex flex-col items-center" {...fadeIn}>
                  <div className="text-5xl font-extrabold mb-2">{s.val}{s.suffix}</div>
                  <p className="text-md font-medium text-white/90">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SYFTER CERTIFY */}
        <section id="syftercertify" className="py-24">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <motion.h2 className="text-4xl font-bold mb-8 inline-block border-b-4 border-[#69bdff] pb-1" {...fadeIn}>Syfter Certify</motion.h2>
            <motion.p className="mb-10 max-w-2xl mx-auto text-lg" {...fadeIn}>
              The Precheck of Hiring. We implement a 5-step trust protocol to ensure every candidate is real, qualified, and ready.
            </motion.p>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="flex flex-wrap justify-center gap-4">
              {["AI Interview Detection", "Geo-Verification", "Communication Review", "Experience Verification", "Syfter Badge Approval"].map((step, i) => (
                <motion.div key={i} variants={itemUp} className="bg-[#1e3a5f] text-white px-6 py-3 rounded-full border border-[#69bdff] shadow-md">
                  {step}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* EXEC TEAM */}
        <section id="exec" className="py-24">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <motion.h2 className="text-5xl font-bold mb-14 underline decoration-[#69bdff]" {...fadeIn}>Executive Team</motion.h2>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 place-items-center">
              {[
                { name: "Steven Perlman", title: "CEO", img: "/team/steve.jpg" },
                { name: "Matt Hall", title: "CRO", img: "/team/matt.jpg" },
                { name: "Nikka Winchell", title: "CRO", img: "/team/nikka.jpg" },
                { name: "Ira Plutner", title: "CFO", img: "/team/ira.jpg" }
              ].map((m, i) => (
                <motion.figure key={i} variants={itemUp} className="flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl border border-white/20">
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                  </div>
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
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.h2 className="text-4xl font-bold mb-8" {...fadeIn}>What Our Clients Say</motion.h2>
            <div className="min-h-[96px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={tIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="italic text-lg"
                >
                  {testimonials[tIndex]}
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* CONTACT / FOOTER */}
        <section id="contact" className="py-24">
          <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div>
              <motion.h2 className="text-3xl font-bold mb-4" {...fadeIn}>Let’s Build the Future of Work</motion.h2>
              <motion.p className="mb-6 text-lg" {...fadeIn}>Join hundreds of companies who trust Syfter to hire smarter, faster, and with clarity.</motion.p>
              <motion.p className="mb-4 text-md text-white/90" {...fadeIn}>New York, NY | Denver, CO | Remote Nationwide</motion.p>
              <a href="mailto:hello@syfter.com" className="inline-block rounded-xl bg-white text-blue-700 font-semibold py-3 px-6 hover:bg-gray-100 transition">Contact Us</a>
            </div>
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg border border-[#69bdff]/40">
              <img src="/MAP.jpg" alt="US Coverage Map" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="mt-16 text-center text-white/60 text-sm">© {new Date().getFullYear()} Syfter. All rights reserved.</div>
        </section>
      </main>
    </>
  );
}
