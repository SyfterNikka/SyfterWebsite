// pages/efficiency.tsx
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

/* ------------------------------ tiny helpers ------------------------------ */

function SectionWrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6">{children}</div>;
}

function TypingSectionTitle({ text }: { text: string }) {
  const [chars, setChars] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStarted(true),
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || chars >= text.length) return;
    const t = setTimeout(() => setChars((c) => c + 1), 45);
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
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

/* ------------------------------ micro bits ------------------------------- */

function TypeOnce({ word, speed = 55 }: { word: string; speed?: number }) {
  const [n, setN] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

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

/* ------------------------ hero word looper (clean) ----------------------- */

function WordLooper() {
  const phrases = useMemo(
    () => ["Screened", "Ready-to-interview", "ATS-first handoff", "US-only", "Culture add", "Weekly cadence"],
    []
  );
  const anchors = useMemo(
    () => [
      { top: "18%", left: "14%" },
      { top: "36%", left: "62%" },
      { top: "64%", left: "28%" },
      { top: "22%", left: "78%" },
      { top: "58%", left: "75%" },
      { top: "44%", left: "20%" },
    ],
    []
  );
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 1800);
    return () => clearInterval(id);
  }, [phrases.length]);

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

/* ---------------------------------- page ---------------------------------- */

export default function HiringWithEfficiency() {
  return (
    <>
      <Head>
        <title>Hiring with Efficiency — Syfter</title>
        <meta
          name="description"
          content="A subscription model that extends your recruiting team. We source and vet — you own the candidates."
        />
      </Head>

      <main
        className="min-h-screen text-white"
        style={{ background: "linear-gradient(to bottom, #3e4e5e 0%, #28303b 100%)" }}
      >
        {/* spacer since your global nav is fixed */}
        <div className="h-12" />

        {/* HERO */}
        <section className="relative overflow-hidden">
          <SectionWrap>
            <div className="py-24 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-5xl md:text-7xl font-extrabold tracking-tight"
                >
                  Hiring with <span className="italic text-[#69bdff]"><TypeOnce word="Efficiency" /></span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
                  className="mt-6 text-xl leading-relaxed text-white/90"
                >
                  A lightweight subscription that extends your recruiting team. We source and vet.{" "}
                  <strong>You own the candidates</strong> and run your process.
                </motion.p>

                {/* simple checklist (no pills) */}
                <ul className="mt-8 grid gap-3 text-white/85">
                  {[
                    "Qualified candidates delivered weekly",
                    "ATS-first: candidates are yours from day one",
                    "Syfter Certify vetting for signal over noise",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="mt-[6px] inline-block h-2.5 w-2.5 rounded-full bg-[#69bdff]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="#pricing"
                    className="rounded-xl bg-[#69bdff] text-gray-900 font-semibold px-5 py-3 hover:brightness-95 transition"
                  >
                    View pricing
                  </Link>
                  <Link
                    href="/#contact"
                    className="rounded-xl border border-white/20 px-5 py-3 hover:bg-white/5 transition"
                  >
                    Talk to us
                  </Link>
                </div>
              </div>

              {/* hero visual → clean word looper */}
              <div className="relative">
                <WordLooper />
              </div>
            </div>
          </SectionWrap>
        </section>

        {/* WHY THIS / VALUE (back in, but modern rows; no boxes) */}
        <section className="py-18 md:py-24">
          <TypingSectionTitle text="Built for Lean, Serious Teams" />
          <SectionWrap>
            <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  h: "Own your pipeline",
                  p: "Every candidate is handed off into your ATS. You control comms, process, and offer.",
                },
                {
                  h: "Zero bloat",
                  p: "We filter the market noise and send only candidates that pass Syfter-Certify.",
                },
                {
                  h: "Predictable cost",
                  p: "Subscription pricing keeps spend tight while keeping the top of funnel warm.",
                },
              ].map((b, i) => (
                <motion.li
                  key={b.h}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
                  className="flex gap-4"
                >
                  <CheckIcon />
                  <div>
                    <div className="text-2xl font-semibold">{b.h}</div>
                    <p className="mt-2 text-white/80">{b.p}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </SectionWrap>
        </section>

        {/* HOW IT WORKS (back in, as a clean timeline list that pops in) */}
        <section className="py-18 md:py-24">
          <TypingSectionTitle text="How It Works" />
          <SectionWrap>
            <ol className="mt-10 space-y-6">
              {[
                {
                  step: "Kickoff",
                  p: "30-min intake. Role, must-haves, culture, and compensation realities.",
                },
                {
                  step: "Source & Vet",
                  p: "We outreach, qualify, and Syfter-Certify for signal and readiness.",
                },
                {
                  step: "Hand-off",
                  p: "Qualified candidates land directly in your ATS as yours to own.",
                },
                {
                  step: "Refresh",
                  p: "Weekly drops keep your pipeline fresh. Pause or scale per role.",
                },
              ].map((s, i) => (
                <motion.li
                  key={s.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.06 }}
                  className="flex gap-4"
                >
                  <CheckIcon />
                  <div>
                    <div className="text-xl font-semibold">{s.step}</div>
                    <p className="text-white/80">{s.p}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </SectionWrap>
        </section>

        {/* PRICING (back in) */}
        <section id="pricing" className="py-18 md:py-24">
          <TypingSectionTitle text="Simple Pricing" />
          <SectionWrap>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "Starter",
                  price: "$500",
                  subtitle: "per month, per role",
                  big: "5 qualified candidates",
                  items: ["ATS handoff", "Syfter Certify vetting", "Light outreach", "Weekly refresh"],
                  featured: false,
                },
                {
                  name: "Growth",
                  price: "$750",
                  subtitle: "per month, per role",
                  big: "10 qualified candidates",
                  items: ["ATS handoff", "Syfter Certify vetting", "Expanded outreach", "Priority refresh"],
                  featured: true,
                },
              ].map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.06 }}
                  className={
                    "rounded-2xl border p-6 md:p-8 " +
                    (p.featured
                      ? "border-[#69bdff]/40 bg-[#69bdff]/10"
                      : "border-white/10 bg-white/5")
                  }
                >
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-2xl font-semibold">{p.name}</h3>
                    {p.featured && (
                      <span className="text-xs px-2 py-1 rounded-full bg-[#69bdff]/20 border border-[#69bdff]/40 text-[#69bdff]">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="mt-4 text-4xl font-extrabold tracking-tight">{p.price}</div>
                  <div className="text-sm text-white/70">{p.subtitle}</div>
                  <div className="mt-4 text-lg">{p.big}</div>
                  <ul className="mt-4 space-y-2">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-white/85">
                        <span className="mt-[7px] inline-block h-2 w-2 rounded-full bg-[#69bdff]" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      href="/#contact"
                      className={
                        "inline-flex items-center gap-2 rounded-xl px-5 py-3 transition " +
                        (p.featured
                          ? "bg-[#69bdff] text-gray-900 hover:brightness-95"
                          : "border border-white/20 hover:bg-white/5")
                      }
                    >
                      Get started
                      <span>→</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="mt-6 text-sm text-white/70">
              Need multiple roles or more volume?{" "}
              <Link href="/#contact" className="underline underline-offset-4">
                Let’s tailor it
              </Link>
              .
            </p>
          </SectionWrap>
        </section>

        {/* AGENCY VS SUBSCRIPTION (back in) */}
        <section className="py-18 md:py-24">
          <TypingSectionTitle text="Agency vs. Efficiency" />
          <SectionWrap>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold">Traditional Agency</h3>
                <ul className="mt-4 space-y-2 text-white/80">
                  {[
                    "Percentage fees on hire",
                    "Agency-owned process",
                    "High volume, mixed signal",
                  ].map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-[7px] h-2 w-2 rounded-full bg-white/30" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[#69bdff]/40 bg-[#69bdff]/10 p-6">
                <h3 className="text-xl font-semibold">Hiring with Efficiency</h3>
                <ul className="mt-4 space-y-2 text-white/90">
                  {[
                    "Flat monthly cost",
                    "You own candidates and ATS",
                    "Syfter-Certify signal, delivered weekly",
                  ].map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-[7px] h-2 w-2 rounded-full bg-[#69bdff]" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionWrap>
        </section>

        {/* FAQ (back in) */}
        <section className="py-18 md:py-24">
          <TypingSectionTitle text="FAQs" />
          <SectionWrap>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "Do we really own the candidates?",
                  a: "Yes. We hand off into your ATS or preferred workflow. You control comms and process.",
                },
                {
                  q: "How many roles can we run?",
                  a: "As many as you like. Pricing is per role so you can scale up or down based on need.",
                },
                {
                  q: "What roles do you cover?",
                  a: "Primarily technology, product, GTM, and operations across US time zones.",
                },
                {
                  q: "Can you convert to full agency if we need it?",
                  a: "Absolutely. If you want us to fully own the process, we can switch to a contingency or retained model.",
                },
              ].map((f, i) => (
                <motion.div
                  key={f.q}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="text-lg font-semibold">{f.q}</div>
                  <p className="mt-2 text-white/80">{f.a}</p>
                </motion.div>
              ))}
            </div>
          </SectionWrap>
        </section>

        {/* CTA (back in) */}
        <section className="py-24">
          <SectionWrap>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Ready to hire with <span className="italic text-[#69bdff]">efficiency</span>?
              </h3>
              <p className="mt-4 text-white/85">
                We’ll plug into your process and keep the pipeline warm — without the agency price tag.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <Link
                  href="/#contact"
                  className="rounded-xl bg-[#69bdff] text-gray-900 font-semibold px-5 py-3 hover:brightness-95 transition"
                >
                  Talk to us
                </Link>
                <Link
                  href="#pricing"
                  className="rounded-xl border border-white/20 px-5 py-3 hover:bg-white/5 transition"
                >
                  See pricing
                </Link>
              </div>
            </div>
          </SectionWrap>
        </section>
      </main>
    </>
  );
}
