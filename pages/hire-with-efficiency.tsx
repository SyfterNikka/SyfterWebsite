// pages/efficiency.tsx
import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type MotionProps,
} from "framer-motion";

/* -----------------------------------------------------------
   Small shared helpers
----------------------------------------------------------- */

function SectionWrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6">{children}</div>;
}

/** One-time hero type for a single word (e.g., “Efficiency”) */
function TypeOnce({ word, speed = 55 }: { word: string; speed?: number }) {
  const [n, setN] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setStarted(true);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || n >= word.length) return;
    const t = setTimeout(() => setN((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [started, n, word.length, speed]);

  return (
    <span ref={ref}>
      {word.slice(0, n)}
      <span className="inline-block w-[0.55ch] border-r-2 border-white/80 ml-[1px] align-middle animate-pulse" />
    </span>
  );
}

/** Section title with a small underline + type-in */
function TypingSectionTitle({ text }: { text: string }) {
  const [n, setN] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setStarted(true);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || n >= text.length) return;
    const t = setTimeout(() => setN((c) => c + 1), 38);
    return () => clearTimeout(t);
  }, [started, n, text.length]);

  return (
    <div className="mb-6">
      <h2
        ref={ref}
        className="text-4xl md:text-5xl font-extrabold tracking-tight"
      >
        {text.slice(0, n)}
        <span className="inline-block w-[0.55ch] border-r-2 border-white/80 ml-[1px] align-middle animate-pulse" />
      </h2>
      <motion.div
        className="h-[3px] w-24 bg-[#69bdff] rounded-full mt-3"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={started ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

/* -----------------------------------------------------------
   HERO — word looper (no boxes, one phrase at a time)
----------------------------------------------------------- */

function WordLooper() {
  const prefersReduced = useReducedMotion();
  const phrases = useMemo(
    () => [
      "Screened",
      "Ready-to-interview",
      "ATS-first handoff",
      "US-only",
      "Culture add",
      "Weekly cadence",
    ],
    []
  );

  // Fixed set of anchor positions to keep it tasteful + consistent
  const anchors = useMemo(
    () => [
      { top: "18%", left: "12%" },
      { top: "36%", left: "60%" },
      { top: "64%", left: "28%" },
      { top: "22%", left: "78%" },
      { top: "58%", left: "75%" },
      { top: "44%", left: "18%" },
    ],
    []
  );

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % phrases.length),
      1800
    );
    return () => clearInterval(id);
  }, [phrases.length, prefersReduced]);

  const pos = anchors[idx % anchors.length];

  return (
    <div className="relative h-[42vh] md:h-[46vh] lg:h-[50vh]">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="absolute select-none font-extrabold"
          style={{
            top: pos.top,
            left: pos.left,
            transform: "translate(-50%, -50%)",
            fontSize: "clamp(28px, 5vw, 56px)",
            textShadow: "0 6px 22px rgba(0,0,0,0.25)",
            whiteSpace: "nowrap",
          }}
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {phrases[idx]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* -----------------------------------------------------------
   Feature rows (no boxes, no numbers) + check icon
----------------------------------------------------------- */

function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" className="text-white/25" />
      <path
        d="M6 10.5l2.4 2.3L14 7.5"
        stroke="currentColor"
        strokeWidth="2"
        className="text-[#69bdff]"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FeatureRow({
  title,
  body,
  delay = 0,
}: {
  title: string;
  body: string;
  delay?: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="flex gap-4"
    >
      <div className="mt-1">
        <CheckIcon />
      </div>
      <div>
        <div className="font-semibold text-lg">{title}</div>
        <p className="text-white/80 leading-relaxed">{body}</p>
      </div>
    </motion.li>
  );
}

/* -----------------------------------------------------------
   How it works — pops on scroll
----------------------------------------------------------- */

const howSteps = [
  {
    title: "Kickoff & role intake",
    body: "We map signals that matter: outcomes, must-haves, anti-signals.",
  },
  {
    title: "Sourcing & Syfter-Certify",
    body: "Identity, communication, readiness vetting — human-reviewed.",
  },
  {
    title: "Weekly delivery",
    body: "5 or 10 qualified candidates per role, predictable cadence.",
  },
  {
    title: "ATS-first handoff",
    body: "You own the candidates and run your process.",
  },
];

/* -----------------------------------------------------------
   Pricing
----------------------------------------------------------- */

function PriceCard({
  price,
  unit,
  label,
  bullets,
  featured,
}: {
  price: string;
  unit: string;
  label: string;
  bullets: string[];
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={
        "rounded-2xl p-6 md:p-8 border " +
        (featured ? "border-white/30 bg-white/[0.06]" : "border-white/10 bg-white/[0.03]")
      }
    >
      <div className="text-5xl font-extrabold tracking-tight">
        {price}
        <span className="text-xl font-semibold text-white/70"> {unit}</span>
      </div>
      <div className="mt-2 text-white/80">{label}</div>
      <ul className="mt-6 space-y-3">
        {bullets.map((b) => (
          <li key={b} className="flex gap-3">
            <CheckIcon className="w-4 h-4 mt-1" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* -----------------------------------------------------------
   Page
----------------------------------------------------------- */

export default function EfficiencyPage() {
  return (
    <>
      <Head>
        <title>Hiring with Efficiency — Syfter</title>
        <meta
          name="description"
          content="A lightweight hiring subscription that extends your recruiting team. We source and vet; you own the candidates and run your process."
        />
      </Head>

      <main
        className="min-h-screen text-white"
        style={{
          background: "linear-gradient(to bottom, #3e4e5e 0%, #28303b 100%)",
        }}
      >
        {/* top offset in case your navbar is fixed */}
        <div className="h-8" />

        {/* ================= Hero ================= */}
        <section className="py-20 md:py-24">
          <SectionWrap>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                  Hiring with
                  <br />
                  <span className="italic text-[#69bdff]">
                    <TypeOnce word="Efficiency" />
                  </span>
                </h1>

                <p className="mt-6 text-xl leading-relaxed text-white/90">
                  A subscription that extends your recruiting team. We source and vet.{" "}
                  <span className="font-semibold">You own the candidates</span> from day one and run
                  the process in your ATS.
                </p>

                {/* minimal, no pills */}
                <p className="mt-5 text-white/75">
                  • Weekly delivery &nbsp; • US-only talent &nbsp; • Syfter-Certify signal &nbsp; • ATS-first handoff
                </p>

                <div className="mt-8 flex gap-4">
                  <a
                    href="#pricing"
                    className="rounded-xl bg-[#69bdff] text-[#102334] font-semibold px-5 py-3 hover:brightness-110 transition"
                  >
                    View pricing
                  </a>
                  <a
                    href="#contact"
                    className="rounded-xl border border-white/20 px-5 py-3 hover:bg-white/5 transition"
                  >
                    Talk to us
                  </a>
                </div>
              </div>

              {/* Word looper (no container box) */}
              <div className="relative">
                <WordLooper />
              </div>
            </div>
          </SectionWrap>
        </section>

        {/* ======= What you get (no boxes / numbers) ======= */}
        <section className="py-12 md:py-16">
          <SectionWrap>
            <TypingSectionTitle text="What you get" />
            <ul className="mt-8 grid gap-8 md:grid-cols-2">
              <FeatureRow
                title="Qualified slate, weekly"
                body="Consistent flow of pre-vetted candidates so your pipeline never stalls."
              />
              <FeatureRow
                title="You own the candidates"
                body="ATS-first delivery. Add, schedule, and advance in your system."
                delay={0.05}
              />
              <FeatureRow
                title="Syfter-Certify screening"
                body="Identity, communication, readiness — human-reviewed for signal over noise."
                delay={0.1}
              />
              <FeatureRow
                title="Designed to amplify"
                body="Extends your existing process; we don't replace your stack."
                delay={0.15}
              />
            </ul>

            {/* Who / Why — simple, modern lists */}
            <div className="mt-14 grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-semibold">Who it’s for</h3>
                <p className="mt-4 text-white/80">
                  HR & People teams • In-house recruiting • Founder-led hiring • Lean TA orgs
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Why it’s different</h3>
                <ul className="mt-4 space-y-3">
                  {[
                    "Not an agency engagement — pure candidate feed you own",
                    "Predictable throughput (5 or 10 / month / role)",
                    "Human-reviewed + automation guardrails (no AI spam)",
                    "Built to amplify your existing process, not replace it",
                  ].map((b) => (
                    <li key={b} className="flex gap-3">
                      <CheckIcon className="w-4 h-4 mt-1" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionWrap>
        </section>

        {/* ================= How it works ================= */}
        <section id="how" className="py-12 md:py-16">
          <SectionWrap>
            <TypingSectionTitle text="How it works" />
            <ol className="mt-6 space-y-6">
              {howSteps.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.08 }}
                  className="flex gap-4"
                >
                  <div className="mt-1">
                    <CheckIcon />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{s.title}</div>
                    <p className="text-white/80">{s.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </SectionWrap>
        </section>

        {/* ================= Pricing ================= */}
        <section id="pricing" className="py-12 md:py-18">
          <SectionWrap>
            <TypingSectionTitle text="Pricing" />
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <PriceCard
                price="$500"
                unit="/mo / role"
                label="5 qualified candidates / month"
                bullets={[
                  "ATS-first delivery",
                  "Weekly cadence",
                  "US-only & screened",
                ]}
                featured
              />
              <PriceCard
                price="$750"
                unit="/mo / role"
                label="10 qualified candidates / month"
                bullets={[
                  "ATS-first delivery",
                  "Weekly cadence",
                  "US-only & screened",
                ]}
              />
            </div>
            <p className="mt-4 text-sm text-white/70">
              Cancel anytime. Volume pricing available for multi-role programs.
            </p>
          </SectionWrap>
        </section>

        {/* ================= CTA ================= */}
        <section id="contact" className="py-16">
          <SectionWrap>
            <div className="text-center">
              <TypingSectionTitle text="Ready to hire with efficiency?" />
              <p className="mx-auto max-w-2xl text-white/85">
                Let’s plug into your process and keep the pipeline moving.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <a
                  href="#pricing"
                  className="rounded-xl bg-[#69bdff] text-[#102334] font-semibold px-5 py-3 hover:brightness-110 transition"
                >
                  See pricing
                </a>
                <a
                  href="mailto:hello@syfter.com"
                  className="rounded-xl border border-white/20 px-5 py-3 hover:bg-white/5 transition"
                >
                  Talk to us
                </a>
              </div>
            </div>
          </SectionWrap>
        </section>
      </main>
    </>
  );
}
