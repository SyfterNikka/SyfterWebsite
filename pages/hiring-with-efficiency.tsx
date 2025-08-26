// pages/efficiency.tsx
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { motion, useReducedMotion } from "framer-motion";

/* ---------------- Layout helper (keeps width consistent with home) ---------------- */
function SectionWrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6">{children}</div>;
}

/* ---------------- Hero visual (on-brand, no images) ---------------- */
function ModernEfficiencyVisual() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 bg-white/5">
      {/* Mesh / tint */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(60% 80% at 20% 25%, rgba(105,189,255,.12) 0%, rgba(105,189,255,0) 70%),
            radial-gradient(60% 80% at 80% 70%, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 70%),
            linear-gradient(to bottom right, rgba(255,255,255,.04), rgba(0,0,0,.10))
          `,
        }}
      />
      {/* Fine grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          backgroundPosition: "center",
        }}
      />

      {/* Animated signal lines (flow) */}
      <svg className="absolute inset-0" viewBox="0 0 1200 700" fill="none">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(105,189,255,.0)" />
            <stop offset="20%" stopColor="rgba(105,189,255,.55)" />
            <stop offset="80%" stopColor="rgba(255,255,255,.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {[
          "M 0 370 C 300 300, 450 440, 700 390 C 900 350, 1000 300, 1200 330",
          "M 0 420 C 250 420, 500 340, 800 410 C 950 450, 1100 430, 1200 420",
          "M 0 470 C 260 520, 520 440, 780 480 C 1000 510, 1100 500, 1200 520",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#g1)"
            strokeWidth={i === 1 ? 3 : 2}
            strokeLinecap="round"
            strokeDasharray="180 520"
            initial={{ pathLength: 0, strokeDashoffset: 700, opacity: 0.4 }}
            animate={
              prefersReduced
                ? { opacity: 0.4 }
                : {
                    pathLength: 1,
                    strokeDashoffset: [-700, 0],
                    opacity: [0.25, 0.65, 0.4],
                  }
            }
            transition={{
              duration: 5 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Candidate tickets gliding on rails */}
      <style jsx>{`
        @keyframes railScroll {
          0% {
            transform: translateX(20%);
            opacity: 0.0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(-120%);
            opacity: 0.0;
          }
        }
        @keyframes floatSoft {
          0% { transform: translateY(0px) }
          50% { transform: translateY(-6px) }
          100% { transform: translateY(0px) }
        }
      `}</style>

      {[
        { top: "44%", delay: "0s", label: "Screened → ATS" },
        { top: "58%", delay: "1.2s", label: "US-only" },
        { top: "70%", delay: "2.4s", label: "Culture add" },
      ].map((t, i) => (
        <div key={i} className="absolute left-[6%] right-[6%]" style={{ top: t.top }}>
          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-xl border border-white/10 bg-white/8 backdrop-blur-sm text-white/90"
            style={{
              animation: prefersReduced
                ? undefined
                : `railScroll 10s linear ${t.delay} infinite, floatSoft 6s ease-in-out infinite`,
            }}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[#69bdff] shadow-[0_0_12px_rgba(105,189,255,.9)]" />
            <span className="text-sm">{t.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Simple in-view fade helper ---------------- */
const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

/* =================================== PAGE =================================== */

export default function Efficiency() {
  return (
    <>
      <Head>
        <title>Hiring with Efficiency — Syfter</title>
        <meta
          name="description"
          content="A lightweight hiring subscription that extends your recruiting team. We source and vet — you own the candidates and run the process."
        />
      </Head>

      <main
        className="min-h-screen text-white"
        style={{ background: "linear-gradient(to bottom, #3e4e5e 0%, #28303b 100%)" }}
      >
        {/* spacer for your fixed nav */}
        <div className="h-12" />

        {/* HERO */}
        <section className="py-20">
          <SectionWrap>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Copy */}
              <div>
                <motion.h1
                  className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
                  {...fadeIn}
                >
                  Hiring with <span className="italic text-[#69bdff]">Efficiency</span>
                </motion.h1>

                <motion.p className="mt-6 text-xl leading-relaxed text-white/90" {...fadeIn}>
                  A lightweight subscription that extends your recruiting team. We source and vet.{" "}
                  <span className="font-semibold">You own the candidates</span> and run your process.
                </motion.p>

                <motion.div className="mt-8 flex flex-wrap gap-4" {...fadeIn}>
                  <a
                    href="#pricing"
                    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 bg-[#69bdff] text-gray-900 font-semibold shadow-[0_8px_30px_rgba(105,189,255,.35)] hover:brightness-110 transition"
                  >
                    View pricing
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 border border-white/20 bg-white/[.04] hover:bg-white/[.07] transition"
                  >
                    Talk to us
                  </a>
                </motion.div>

                <motion.ul className="mt-8 space-y-3 text-white/90" {...fadeIn}>
                  <li className="flex items-start gap-3">
                    <span className="mt-[6px] h-2 w-2 rounded-full bg-[#69bdff]" />
                    Qualified candidates delivered weekly
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-[6px] h-2 w-2 rounded-full bg-[#69bdff]" />
                    ATS-first: candidates are yours from day one
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-[6px] h-2 w-2 rounded-full bg-[#69bdff]" />
                    Syfter Certify vetting for signal over noise
                  </li>
                </motion.ul>
              </div>

              {/* Visual */}
              <ModernEfficiencyVisual />
            </div>
          </SectionWrap>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20">
          <SectionWrap>
            <motion.h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" {...fadeIn}>
              How it works
            </motion.h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  t: "Kickoff & calibration",
                  d: "Define role profiles, must-haves, and culture signals.",
                },
                {
                  t: "Sourcing & vetting",
                  d: "We deliver qualified, US-based candidates weekly.",
                },
                {
                  t: "You own the process",
                  d: "Add to your ATS, schedule interviews, make offers.",
                },
              ].map((s, i) => (
                <motion.div
                  key={s.t}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.05 }}
                >
                  <div className="h-10 w-10 rounded-xl bg-[#69bdff]/20 ring-1 ring-[#69bdff]/30 grid place-items-center font-bold">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
                  <p className="mt-2 text-white/80 leading-relaxed">{s.d}</p>
                </motion.div>
              ))}
            </div>
          </SectionWrap>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-20">
          <SectionWrap>
            <motion.h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" {...fadeIn}>
              Simple, transparent pricing
            </motion.h2>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Tier 1 */}
              <motion.div
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
                {...fadeIn}
              >
                <div className="text-4xl font-extrabold">$500</div>
                <div className="text-white/70 mt-1">per month, per role</div>
                <div className="mt-2 text-white/90">Includes 5 qualified candidates</div>
                <ul className="mt-6 space-y-2 text-white/80">
                  <li>• Delivered weekly</li>
                  <li>• Your ATS, your process</li>
                  <li>• Syfter Certify screening</li>
                </ul>
              </motion.div>

              {/* Tier 2 */}
              <motion.div
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: 0.05 }}
              >
                <div className="text-4xl font-extrabold">$750</div>
                <div className="text-white/70 mt-1">per month, per role</div>
                <div className="mt-2 text-white/90">Includes 10 qualified candidates</div>
                <ul className="mt-6 space-y-2 text-white/80">
                  <li>• Delivered weekly</li>
                  <li>• Your ATS, your process</li>
                  <li>• Syfter Certify screening</li>
                </ul>
              </motion.div>
            </div>
          </SectionWrap>
        </section>

        {/* FAQ (lightweight) */}
        <section className="py-16">
          <SectionWrap>
            <motion.h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" {...fadeIn}>
              FAQ
            </motion.h2>

            <div className="mt-8 space-y-4">
              {[
                {
                  q: "Do we owe placement fees later?",
                  a: "No. This is a subscription service. You own the candidates immediately.",
                },
                {
                  q: "Can you work inside our ATS?",
                  a: "Yes. We can handoff via your ATS or deliver in your preferred format.",
                },
                {
                  q: "What roles does this work best for?",
                  a: "Tech, product, GTM, and back-office roles where steady qualified flow beats volume.",
                },
              ].map((item, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <summary className="cursor-pointer list-none font-semibold">
                    {item.q}
                    <span className="float-right opacity-60 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-white/80 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </SectionWrap>
        </section>

        {/* CTA */}
        <section id="contact" className="py-16">
          <SectionWrap>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
              <h3 className="text-2xl font-bold">Ready to hire with efficiency?</h3>
              <p className="text-white/80 mt-2">
                We’ll calibrate on role profiles and start sourcing this week.
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
