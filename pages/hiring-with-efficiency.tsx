// pages/efficiency.tsx
import React from "react";
import Head from "next/head";
import { motion, useReducedMotion } from "framer-motion";

/* ------------------------------- Helpers -------------------------------- */

function SectionWrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6">{children}</div>;
}

// Darker “banner” band like the homepage sections (no gradient)
function Band({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="py-28"
      style={{ backgroundColor: "#2b3945" }} // a few shades darker than the page bg
    >
      <SectionWrap>{children}</SectionWrap>
    </section>
  );
}

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

/* ------------------------------ Flow Panel ------------------------------ */
/** Clean, software-y hero visual with floating “candidate cards”.
 *  No glow. Subtle motion only. */
function FlowPanel() {
  const prefersReduced = useReducedMotion();

  return (
    <>
      <style jsx>{`
        @keyframes floatA {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes floatB {
          0% {
            transform: translateY(6px);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(6px);
          }
        }
        @keyframes floatC {
          0% {
            transform: translateY(-8px);
          }
          50% {
            transform: translateY(8px);
          }
          100% {
            transform: translateY(-8px);
          }
        }
      `}</style>

      <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-white/5 ring-1 ring-white/10">
        {/* mesh + grid */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 90% at 15% 25%, rgba(255,255,255,.06) 0%, rgba(255,255,255,0) 60%), radial-gradient(60% 80% at 85% 75%, rgba(255,255,255,.06) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            backgroundPosition: "center",
          }}
        />

        {/* floating cards */}
        <div className="absolute inset-0 grid grid-cols-3 gap-4 p-6 md:p-10">
          {[
            {
              k: "card-a",
              list: [
                { tag: "Screened", sub: "Syfter-Certify" },
                { tag: "US-only", sub: "Verified location" },
              ],
              anim: "floatA 8s ease-in-out infinite",
              delay: "0s",
            },
            {
              k: "card-b",
              list: [
                { tag: "Ready-to-interview", sub: "Availability set" },
                { tag: "Culture add", sub: "Human-reviewed" },
              ],
              anim: "floatB 9.5s ease-in-out infinite",
              delay: "0.3s",
            },
            {
              k: "card-c",
              list: [
                { tag: "ATS-first handoff", sub: "You own candidates" },
                { tag: "Weekly cadence", sub: "Predictable flow" },
              ],
              anim: "floatC 10s ease-in-out infinite",
              delay: "0.6s",
            },
          ].map((col) => (
            <div
              key={col.k}
              className="flex flex-col gap-4 justify-center"
              style={prefersReduced ? undefined : { animation: col.anim, animationDelay: col.delay }}
            >
              {col.list.map((row, i) => (
                <div
                  key={row.tag}
                  className="rounded-2xl bg-white/[.06] ring-1 ring-white/10 px-4 py-3 backdrop-blur-sm"
                >
                  <div className="text-[13px] font-semibold">{row.tag}</div>
                  <div className="text-[12px] text-white/70">{row.sub}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
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
        <section className="py-28">
          <SectionWrap>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
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

                <motion.div className="mt-8 flex flex-wrap gap-3" {...fadeIn}>
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

                <motion.div className="mt-10 flex flex-wrap gap-4" {...fadeIn}>
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

              <FlowPanel />
            </div>
          </SectionWrap>
        </section>

        {/* WHAT YOU GET — banner */}
        <Band>
          <motion.h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" {...fadeIn}>
            What you get
          </motion.h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="rounded-3xl bg-white/6 ring-1 ring-white/10 p-7 backdrop-blur-sm"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
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

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-12">
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
              <motion.ul className="mt-4 space-y-3 text-white/90" {...fadeIn}>
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

        {/* HOW IT WORKS — rail with pop-in steps */}
        <section className="py-28">
          <SectionWrap>
            <motion.h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" {...fadeIn}>
              How it works
            </motion.h2>

            <div className="mt-14 relative">
              <div className="h-[2px] w-full bg-white/10 rounded-full" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-10">
                {[
                  { t: "Kickoff + calibration", d: "Role profiles, must-haves, culture signals." },
                  { t: "Sourcing & vetting", d: "US-only, Syfter-Certify screened." },
                  { t: "Weekly delivery", d: "Fresh, qualified slate every week." },
                  { t: "You run the process", d: "Your ATS, your interviews, your offers." },
                ].map((s, i) => (
                  <motion.div
                    key={s.t}
                    className="relative"
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.1 }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-white/70 ring-2 ring-white/20" />
                    <h4 className="text-lg font-semibold text-center">{s.t}</h4>
                    <p className="text-white/80 leading-relaxed text-center mt-2">{s.d}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionWrap>
        </section>

        {/* PRICING — banner */}
        <Band>
          <motion.h2 id="pricing" className="text-4xl md:text-5xl font-extrabold tracking-tight" {...fadeIn}>
            Simple, transparent pricing
          </motion.h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
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
                className="relative overflow-hidden rounded-3xl bg-white/6 ring-1 ring-white/10 p-7 backdrop-blur-sm"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.05 }}
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
            <div className="rounded-3xl bg-white/6 ring-1 ring-white/10 p-10 text-center backdrop-blur-sm">
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
