import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";

/* ------------------------------- Layout bits ------------------------------ */

function SectionWrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6">{children}</div>;
}

// darker banner rows for contrast (no gradient)
function Band({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-28" style={{ backgroundColor: "#2f3b46" }}>
      <SectionWrap>{children}</SectionWrap>
    </section>
  );
}

/* -------------------------- Typewriter section title --------------------- */

function TypingTitle({
  as = "h2",
  text,
  className = "",
}: {
  as?: "h1" | "h2";
  text: string;
  className?: string;
}) {
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
    const id = setTimeout(() => setChars((c) => c + 1), 48);
    return () => clearTimeout(id);
  }, [started, chars, text.length]);

  const Tag = as as any;
  return (
    <div ref={ref}>
      <Tag className={className}>
        <span aria-label={text}>{text.slice(0, chars)}</span>
        <span className="inline-block w-[0.55ch] border-r-2 border-white/80 ml-[1px] align-middle animate-pulse" />
      </Tag>
      {as === "h2" && (
        <motion.div
          className="h-[3px] w-24 bg-[#69bdff] rounded-full mt-3"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={started ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
      )}
    </div>
  );
}

/* ------------------------------ Word canvas ------------------------------ */
/** Modern hero: big phrases, no boxes, sequential blur→crisp pop-in. */

type WordSpec = {
  text: string;
  top: string; // percentages in container
  left: string;
  size: number; // clamp base size
  weight?: number;
  opacity?: number;
};

const WORDS: WordSpec[] = [
  { text: "Screened",           top: "26%", left: "20%", size: 30, weight: 800 },
  { text: "Ready-to-interview", top: "28%", left: "56%", size: 32, weight: 800 },
  { text: "ATS-first handoff",  top: "32%", left: "84%", size: 28, weight: 800 },
  { text: "US-only",            top: "64%", left: "26%", size: 30, weight: 800 },
  { text: "Culture add",        top: "66%", left: "56%", size: 30, weight: 800 },
  { text: "Weekly cadence",     top: "68%", left: "82%", size: 28, weight: 800 },
];

function WordCanvas() {
  return (
    <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-white/5 ring-1 ring-white/10">
      {/* subtle mesh + hairline grid (very light) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 12% 18%, rgba(255,255,255,.05) 0%, rgba(255,255,255,0) 60%), radial-gradient(60% 80% at 88% 82%, rgba(255,255,255,.05) 0%, rgba(255,255,255,0) 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "center",
        }}
      />

      {/* big words — staggered, blur->crisp */}
      {WORDS.map((w, i) => (
        <motion.div
          key={w.text}
          className="absolute pointer-events-none select-none"
          style={{
            top: w.top,
            left: w.left,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
          whileInView={{ opacity: 0.95, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.22 }}
        >
          <div
            className="tracking-tight bg-clip-text text-transparent"
            style={{
              // modern gradient text
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,.95), rgba(255,255,255,.75))",
              fontWeight: w.weight ?? 800,
              fontSize: `clamp(${w.size - 8}px, ${w.size / 10}vw + ${w.size - 16}px, ${
                w.size + 8
              }px)`,
              textShadow: "0 1px 0 rgba(0,0,0,.15)",
              opacity: w.opacity ?? 1,
              whiteSpace: "nowrap",
            }}
          >
            {w.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* --------------------------------- Motion preset -------------------------- */

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

/* =================================== PAGE =================================== */

export default function Efficiency() {
  return (
    <>
      <Head>
        <title>Hiring with Efficiency — Syfter</title>
        <meta
          name="description"
          content="A lightweight subscription that extends your recruiting team. We source and vet; you own the candidates and run your process."
        />
      </Head>

      <main
        className="min-h-screen text-white"
        style={{ background: "linear-gradient(to bottom, #3e4e5e 0%, #28303b 100%)" }}
      >
        <div className="h-12" />

        {/* HERO */}
        <section className="py-28">
          <SectionWrap>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                <TypingTitle
                  as="h1"
                  text="Hiring with Efficiency"
                  className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
                />

                <motion.p className="mt-6 text-xl leading-relaxed text-white/90" {...fadeUp}>
                  A subscription that extends your recruiting team. We source and vet.{" "}
                  <span className="font-semibold">You own the candidates</span> from day one and run
                  the process in your ATS.
                </motion.p>

                <motion.div className="mt-8 flex flex-wrap gap-3" {...fadeUp}>
                  {["Weekly delivery", "US-only talent", "Syfter-Certify signal", "ATS-first handoff"].map(
                    (t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full text-sm bg-white/8 ring-1 ring-white/15"
                      >
                        {t}
                      </span>
                    )
                  )}
                </motion.div>

                <motion.div className="mt-10 flex flex-wrap gap-4" {...fadeUp}>
                  <a
                    href="#pricing"
                    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 bg-[#69bdff] text-gray-900 font-semibold hover:brightness-110 transition"
                  >
                    View pricing
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 bg-white/[.06] ring-1 ring-white/15 hover:bg-white/[.10] transition"
                  >
                    Talk to us
                  </a>
                </motion.div>
              </div>

              {/* Right: modern word animation, no boxes */}
              <WordCanvas />
            </div>
          </SectionWrap>
        </section>

        {/* WHAT YOU GET — banner */}
        <Band>
          <TypingTitle as="h2" text="What you get" className="text-4xl md:text-5xl font-extrabold tracking-tight" />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-14">
            {[
              {
                t: "Qualified slate, weekly",
                d: "Consistent flow of pre-vetted candidates so your pipeline never stalls.",
              },
              {
                t: "You own the candidates",
                d: "ATS-first delivery. Add, schedule, and advance in your system.",
              },
              {
                t: "Syfter-Certify screening",
                d: "Identity, communication, readiness — human-reviewed for signal over noise.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.t}
                className="rounded-3xl bg-white/6 ring-1 ring-white/10 p-9 backdrop-blur-sm hover:-translate-y-1 transition-transform"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65, ease: "easeOut", delay: i * 0.06 }}
              >
                <div className="h-10 w-10 rounded-xl bg-[#69bdff]/20 ring-1 ring-[#69bdff]/30 grid place-items-center font-bold">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{card.t}</h3>
                <p className="mt-2 text-white/80 leading-relaxed">{card.d}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-18 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <motion.h3 className="text-2xl font-bold" {...fadeUp}>
                Who it’s for
              </motion.h3>
              <motion.div className="mt-4 flex flex-wrap gap-3" {...fadeUp}>
                {["HR & People teams", "In-house recruiting", "Founder-led hiring", "Lean TA orgs"].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-sm bg-white/8 ring-1 ring-white/15">
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>

            <div>
              <motion.h3 className="text-2xl font-bold" {...fadeUp}>
                Why it’s different
              </motion.h3>
              <motion.ul className="mt-4 space-y-3 text-white/90" {...fadeUp}>
                {[
                  "Not an agency engagement — pure candidate feed you own",
                  "Predictable throughput (5 or 10 / month / role)",
                  "Human-reviewed + automation guardrails (no AI spam)",
                  "Designed to amplify your existing process, not replace it",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-3">
                    <span className="mt-[7px] h-2 w-2 rounded-full bg-[#69bdff]" />
                    {li}
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </Band>

        {/* HOW IT WORKS */}
        <section className="py-28">
          <SectionWrap>
            <TypingTitle
              as="h2"
              text="How it works"
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
            />

            <div className="mt-16 relative">
              {/* progress sweep */}
              <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full w-56 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  initial={{ x: "-20%" }}
                  whileInView={{ x: "110%" }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-14 mt-12">
                {[
                  { t: "Kickoff + calibration", d: "Role profiles, must-haves, culture signals." },
                  { t: "Sourcing & vetting", d: "US-only, Syfter-Certify screened." },
                  { t: "Weekly delivery", d: "Fresh, qualified slate every week." },
                  { t: "You run the process", d: "Your ATS, your interviews, your offers." },
                ].map((s, i) => (
                  <motion.div
                    key={s.t}
                    className="relative text-center"
                    initial={{ opacity: 0, y: 26, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.55 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-white/70 ring-2 ring-white/20" />
                    <h4 className="text-lg font-semibold">{s.t}</h4>
                    <p className="text-white/80 leading-relaxed mt-2">{s.d}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionWrap>
        </section>

        {/* PRICING — banner */}
        <Band>
          <TypingTitle
            as="h2"
            text="Simple, transparent pricing"
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          />

          <div id="pricing" className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-14">
            {[
              { price: "$500", sub: "per month, per role", note: "Includes 5 qualified candidates" },
              { price: "$750", sub: "per month, per role", note: "Includes 10 qualified candidates" },
            ].map((p, i) => (
              <motion.div
                key={p.price}
                className="relative overflow-hidden rounded-3xl bg-white/6 ring-1 ring-white/10 p-9 backdrop-blur-sm hover:-translate-y-1 transition-transform"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65, ease: "easeOut", delay: i * 0.06 }}
              >
                <div className="absolute inset-x-0 top-0 h-[3px] bg-[#69bdff]" />
                <div className="text-4xl font-extrabold">{p.price}</div>
                <div className="text-white/70 mt-1">{p.sub}</div>
                <div className="mt-2 text-white/90">{p.note}</div>
                <ul className="mt-6 space-y-2 text-white/80">
                  <li>• Weekly delivery cadence</li>
                  <li>• ATS-first handoff (you own candidates)</li>
                  <li>• Syfter-Certify screening included</li>
                </ul>
              </motion.div>
            ))}
          </div>
        </Band>

        {/* CTA */}
        <section id="contact" className="py-24">
          <SectionWrap>
            <motion.div
              className="rounded-3xl bg-white/6 ring-1 ring-white/10 p-10 text-center backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold">Ready to hire with efficiency?</h3>
              <p className="text-white/80 mt-2">We’ll calibrate roles this week and start your first slate.</p>
              <a
                href="mailto:hello@syfter.com"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 bg-[#69bdff] text-gray-900 font-semibold mt-6 hover:brightness-110 transition"
              >
                Get started
              </a>
            </motion.div>
          </SectionWrap>
        </section>
      </main>
    </>
  );
}
