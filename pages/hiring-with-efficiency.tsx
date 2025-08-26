// pages/efficiency.tsx
import React from "react";
import Head from "next/head";
import { motion, useReducedMotion } from "framer-motion";

/* ----------------------------- Shared helpers ---------------------------- */
function SectionWrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6">{children}</div>;
}

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

/* ------------------------ Software-y hero visualization ------------------- */
function NetworkPanel() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-white/5 ring-1 ring-white/10">
      {/* soft mesh tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 15% 25%, rgba(105,189,255,.14) 0%, rgba(105,189,255,0) 70%), radial-gradient(60% 80% at 85% 75%, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 70%), linear-gradient(to bottom right, rgba(255,255,255,.03), rgba(0,0,0,.10))",
        }}
      />

      {/* fine grid */}
      <div
        className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          backgroundPosition: "center",
        }}
      />

      {/* animated signal paths */}
      <svg className="absolute inset-0" viewBox="0 0 1200 700" fill="none">
        <defs>
          <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(105,189,255,0)" />
            <stop offset="20%" stopColor="rgba(105,189,255,.75)" />
            <stop offset="80%" stopColor="rgba(255,255,255,.45)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {[
          "M 0 360 C 280 300, 520 420, 780 390 C 980 365, 1080 330, 1200 340",
          "M 0 420 C 280 450, 520 340, 820 410 C 980 450, 1100 440, 1200 420",
          "M 0 490 C 260 520, 540 470, 860 520 C 1000 545, 1100 520, 1200 540",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#stroke)"
            strokeWidth={i === 1 ? 3 : 2}
            strokeLinecap="round"
            strokeDasharray="220 640"
            initial={{ pathLength: 0, strokeDashoffset: 800, opacity: 0.35 }}
            animate={
              prefersReduced
                ? { opacity: 0.35 }
                : {
                    pathLength: 1,
                    strokeDashoffset: [-800, 0],
                    opacity: [0.25, 0.7, 0.4],
                  }
            }
            transition={{ duration: 6 + i * 0.7, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* flowing candidate “tickets” (no bubbles; sleek pills) */}
      <style jsx>{`
        @keyframes glide {
          0% {
            transform: translateX(15%);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            transform: translateX(-120%);
            opacity: 0;
          }
        }
      `}</style>

      {[
        { top: "44%", label: "Syfter-Certify ✓   Screened signal", delay: "0s" },
        { top: "60%", label: "US-only talent   Ready-to-Interview", delay: "1.2s" },
        { top: "72%", label: "ATS-first handoff   You own the candidates", delay: "2.4s" },
      ].map((row, i) => (
        <div key={i} className="absolute left-[8%] right-[8%]" style={{ top: row.top }}>
          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[.06] backdrop-blur-sm text-white shadow-[0_6px_30px_rgba(0,0,0,.15)] ring-1 ring-white/10"
            style={{
              animation: prefersReduced ? undefined : `glide 11s linear ${row.delay} infinite`,
            }}
          >
            <span className="h-2 w-2 rounded-full bg-[#69bdff] shadow-[0_0_12px_rgba(105,189,255,.9)]" />
            <span className="text-[13px] tracking-tight">{row.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

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
        <section className="py-20">
          <SectionWrap>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h1
                  className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
                  {...fadeIn}
                >
                  Hiring with <span className="italic text-[#69bdff]">Efficiency</span>
                </motion.h1>

                <motion.p className="mt-6 text-xl leading-relaxed text-white/90" {...fadeIn}>
                  A subscription that extends your recruiting team. We source and vet.{" "}
                  <span className="font-semibold">You own the candidates</span> from day one and run
                  the process in your ATS.
                </motion.p>

                <motion.div className="mt-7 flex flex-wrap gap-3" {...fadeIn}>
                  {[
                    "Weekly delivery",
                    "US-only talent",
                    "Syfter-Certify signal",
                    "ATS-first handoff",
                  ].map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-sm bg-white/8 ring-1 ring-white/15"
                    >
                      {t}
                    </span>
                  ))}
                </motion.div>

                <motion.div className="mt-8 flex flex-wrap gap-4" {...fadeIn}>
                  <a
                    href="#pricing"
                    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 bg-[#69bdff] text-gray-900 font-semibold shadow-[0_8px_30px_rgba(105,189,255,.35)] hover:brightness-110 transition"
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

              <NetworkPanel />
            </div>
          </SectionWrap>
        </section>

        {/* WHAT YOU GET */}
        <section className="py-18">
          <SectionWrap>
            <motion.h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" {...fadeIn}>
              What you get
            </motion.h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  className="rounded-3xl bg-white/6 ring-1 ring-white/10 p-6 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.05 }}
                >
                  <div className="h-10 w-10 rounded-xl bg-[#69bdff]/20 ring-1 ring-[#69bdff]/30 grid place-items-center font-bold">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{card.t}</h3>
                  <p className="mt-2 text-white/80 leading-relaxed">{card.d}</p>
                </motion.div>
              ))}
            </div>
          </SectionWrap>
        </section>

        {/* WHO IT’S FOR + WHY IT’S DIFFERENT (software-y chips) */}
        <section className="py-18">
          <SectionWrap>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <motion.h3 className="text-2xl font-bold" {...fadeIn}>
                  Who it’s for
                </motion.h3>
                <motion.div className="mt-4 flex flex-wrap gap-3" {...fadeIn}>
                  {["HR & People teams", "In-house recruiting", "Founder-led hiring", "Lean TA orgs"].map(
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
              </div>

              <div>
                <motion.h3 className="text-2xl font-bold" {...fadeIn}>
                  Why it’s different
                </motion.h3>
                <motion.ul className="mt-4 space-y-2 text-white/90" {...fadeIn}>
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
          </SectionWrap>
        </section>

        {/* HOW IT WORKS — step rail (no boxes, just rail + nodes) */}
        <section className="py-20">
          <SectionWrap>
            <motion.h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" {...fadeIn}>
              How it works
            </motion.h2>

            <div className="mt-12 relative">
              <div className="h-[2px] w-full bg-white/10 rounded-full" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                {[
                  { t: "Kickoff + calibration", d: "Role profiles, must-haves, culture signals." },
                  { t: "Sourcing & vetting", d: "US-only, Syfter-Certify screened." },
                  { t: "Weekly delivery", d: "Fresh, qualified slate every week." },
                  { t: "You run the process", d: "Your ATS, your interviews, your offers." },
                ].map((s, i) => (
                  <motion.div
                    key={s.t}
                    className="relative"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.05 }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-[#69bdff] shadow-[0_0_18px_rgba(105,189,255,.9)] ring-2 ring-white/20" />
                    <h4 className="text-lg font-semibold text-center">{s.t}</h4>
                    <p className="text-white/80 leading-relaxed text-center mt-2">{s.d}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionWrap>
        </section>

        {/* PRICING — glass panels, accent bar, no templates vibes */}
        <section id="pricing" className="py-20">
          <SectionWrap>
            <motion.h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" {...fadeIn}>
              Simple, transparent pricing
            </motion.h2>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  price: "$500",
                  sub: "per month, per role",
                  note: "Includes 5 qualified candidates",
                },
                {
                  price: "$750",
                  sub: "per month, per role",
                  note: "Includes 10 qualified candidates",
                },
              ].map((p, i) => (
                <motion.div
                  key={p.price}
                  className="relative overflow-hidden rounded-3xl bg-white/6 ring-1 ring-white/10 p-6 backdrop-blur-md"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.05 }}
                >
                  <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#69bdff] to-white/60" />
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
          </SectionWrap>
        </section>

        {/* CTA */}
        <section id="contact" className="py-16">
          <SectionWrap>
            <div className="rounded-3xl bg-white/6 ring-1 ring-white/10 p-8 text-center backdrop-blur-sm">
              <h3 className="text-2xl font-bold">Ready to hire with efficiency?</h3>
              <p className="text-white/80 mt-2">
                We’ll calibrate roles this week and start your first slate.
              </p>
              <a
                href="mailto:hello@syfter.com"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 bg-[#69bdff] text-gray-900 font-semibold mt-6 hover:brightness-110 transition"
              >
                Get started
              </a>
            </div>
          </SectionWrap>
        </section>
      </main>
    </>
  );
}
