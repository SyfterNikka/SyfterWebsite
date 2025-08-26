// pages/efficiency.tsx
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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

function CheckDot() {
  return <span className="mt-[6px] inline-block h-2.5 w-2.5 rounded-full bg-[#69bdff]" />;
}

/* -------------------------- Hero animated background ---------------------- */

function HeroOrbs() {
  return (
    <>
      <style jsx>{`
        @keyframes orbA {
          0% { transform: translate(-8%, -6%) scale(1); }
          50% { transform: translate(6%, 8%) scale(1.15); }
          100% { transform: translate(-8%, -6%) scale(1); }
        }
        @keyframes orbB {
          0% { transform: translate(10%, -4%) scale(1.05); }
          50% { transform: translate(-6%, 6%) scale(1.2); }
          100% { transform: translate(10%, -4%) scale(1.05); }
        }
        @keyframes orbC {
          0% { transform: translate(-4%, 10%) scale(1); }
          50% { transform: translate(8%, -6%) scale(1.12); }
          100% { transform: translate(-4%, 10%) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .orb { animation: none !important; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* faint grid to echo the brand */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(transparent 31px, rgba(255,255,255,0.08) 32px), linear-gradient(90deg, transparent 31px, rgba(255,255,255,0.08) 32px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* soft orbs */}
        <span
          className="orb absolute -left-20 -top-16 h-80 w-80 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(105,189,255,0.22), rgba(105,189,255,0) 70%)",
            filter: "blur(20px)",
            animation: "orbA 18s ease-in-out infinite",
          }}
        />
        <span
          className="orb absolute right-0 top-1/4 h-96 w-96 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(105,189,255,0.18), rgba(105,189,255,0) 70%)",
            filter: "blur(22px)",
            animation: "orbB 22s ease-in-out infinite",
          }}
        />
        <span
          className="orb absolute left-1/3 -bottom-16 h-[22rem] w-[22rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.12), rgba(255,255,255,0) 70%)",
            filter: "blur(24px)",
            animation: "orbC 20s ease-in-out infinite",
          }}
        />
        {/* top-to-bottom fade so the orbs don’t fight the nav */}
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,1) 40%, rgba(0,0,0,1))",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,1) 40%, rgba(0,0,0,1))",
          }}
        />
      </div>
    </>
  );
}

/* ------------------------- How-it-works timeline -------------------------- */

function HowItWorksTimeline() {
  const steps = [
    {
      title: "Kickoff",
      text: "30-min intake. Role, must-haves, culture, and compensation realities.",
    },
    {
      title: "Source & Vet",
      text: "We outreach, qualify, and Syfter-Certify for signal and readiness.",
    },
    {
      title: "Hand-off",
      text: "Qualified candidates land directly in your ATS as yours to own.",
    },
    {
      title: "Refresh",
      text: "Weekly drops keep your pipeline fresh. Pause or scale per role.",
    },
  ];

  return (
    <div className="mt-12">
      {/* Desktop: horizontal */}
      <div className="relative hidden md:block">
        <div className="absolute left-0 right-0 top-4 h-px bg-gradient-to-r from-white/10 via-white/20 to-white/10" />
        <div className="grid grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.06 }}
              className="relative pt-10 text-center"
            >
              <span
                className="absolute left-1/2 top-4 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-[#69bdff]"
                style={{ boxShadow: "0 0 0 8px rgba(105,189,255,0.12)" }}
              />
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-white/80">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="relative md:hidden">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/15" />
        <ul className="space-y-8 pl-10">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.06 }}
              className="relative"
            >
              <span
                className="absolute left-4 top-2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-[#69bdff]"
                style={{ boxShadow: "0 0 0 8px rgba(105,189,255,0.12)" }}
              />
              <div className="ml-2">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-white/80">{s.text}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function HiringWithEfficiency() {
  return (
    <>
      <Head>
        <title>Hire with Efficiency — Syfter</title>
        <meta
          name="description"
          content="A subscription model that extends your recruiting team. We source and vet — you own the candidates."
        />
      </Head>

      <main
        className="min-h-screen text-white"
        style={{ background: "linear-gradient(to bottom, #3e4e5e 0%, #28303b 100%)" }}
      >
        {/* spacer for fixed nav */}
        <div className="h-12" />

        {/* HERO (centered) */}
        <section className="relative overflow-hidden">
          <HeroOrbs />
          <SectionWrap>
            <div className="py-24 md:py-32 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight"
              >
                Hire with <span className="italic text-[#69bdff]">Efficiency</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
                className="mt-6 text-xl leading-relaxed text-white/90 mx-auto max-w-3xl"
              >
                A lightweight subscription that extends your recruiting team. We source and vet.{" "}
                <strong>You own the candidates</strong> and run your process.
              </motion.p>

              <ul className="mt-8 grid gap-3 text-white/85 mx-auto max-w-2xl text-left md:text-center">
                {[
                  "Qualified candidates delivered weekly",
                  "ATS-first: candidates are yours from day one",
                  "Syfter Certify vetting for signal over noise",
                ].map((t) => (
                  <li key={t} className="flex items-start md:justify-center gap-3">
                    <CheckDot />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
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
          </SectionWrap>
        </section>

        {/* BUILT FOR… (clean bullets, no boxes) */}
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
                  <CheckDot />
                  <div>
                    <div className="text-2xl font-semibold">{b.h}</div>
                    <p className="mt-2 text-white/80">{b.p}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </SectionWrap>
        </section>

        {/* HOW IT WORKS — timeline with line + nodes */}
        <section className="py-18 md:py-24">
          <TypingSectionTitle text="How It Works" />
          <SectionWrap>
            <HowItWorksTimeline />
          </SectionWrap>
        </section>

        {/* PRICING */}
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
                        <CheckDot />
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

        {/* AGENCY VS SUBSCRIPTION */}
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
                <h3 className="text-xl font-semibold">Hire with Efficiency</h3>
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

        {/* FAQ */}
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

        {/* CTA */}
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
