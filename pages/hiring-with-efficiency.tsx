import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
                  Hiring with <span className="italic text-[#69bdff]">Efficiency</span>
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
              </div>

              {/* hero visual */}
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <Image
                    src="/blog/remote-ops.jpg" // swap to any nice abstract you have handy
                    alt="Efficient hiring visual"
                    fill
                    className="object-cover opacity-90"
                  />
                  {/* floating chips */}
                  <div className="absolute inset-0">
                    {["Screened", "US-only", "Ready-to-interview", "Culture add"].map((chip, i) => (
                      <motion.span
                        key={chip}
                        className="absolute rounded-full bg-[#69bdff]/15 border border-[#69bdff]/30 text-sm text-white/90 px-3 py-1 backdrop-blur-sm"
                        style={{
                          left: `${20 + i * 18}%`,
                          top: `${18 + (i % 2 === 0 ? 4 : 12)}%`,
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 * i }}
                      >
                        {chip}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionWrap>
        </section>

        {/* WHY THIS / VALUE */}
        <section className="py-18 md:py-24">
          <TypingSectionTitle text="Built for Lean, Serious Teams" />
          <SectionWrap>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  h: "Own your pipeline",
                  p: "Every candidate is handed off into your ATS. You control comms, process, and offer.",
                },
                {
                  h: "Zero bloat",
                  p: "We filter the market noise and send only candidates that pass Syfter Certify.",
                },
                {
                  h: "Predictable cost",
                  p: "Subscription pricing keeps spend tight while keeping the top of funnel warm.",
                },
              ].map((b, i) => (
                <motion.article
                  key={b.h}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-2xl font-semibold">{b.h}</h3>
                  <p className="mt-3 text-white/80">{b.p}</p>
                </motion.article>
              ))}
            </div>
          </SectionWrap>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-18 md:py-24">
          <TypingSectionTitle text="How It Works" />
          <SectionWrap>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  h: "Kickoff",
                  p: "30-min intake. Role, must-haves, culture, and compensation realities.",
                },
                {
                  step: "02",
                  h: "Source & Vet",
                  p: "We outreach, qualify, and Syfter-Certify for signal and readiness.",
                },
                {
                  step: "03",
                  h: "Hand-off",
                  p: "Qualified candidates land directly in your ATS as yours to own.",
                },
                {
                  step: "04",
                  h: "Refresh",
                  p: "Weekly drops keep your pipeline fresh. Pause or scale per role.",
                },
              ].map((s, i) => (
                <motion.article
                  key={s.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="text-[#69bdff] text-sm font-semibold">{s.step}</div>
                  <h3 className="mt-2 text-xl font-semibold">{s.h}</h3>
                  <p className="mt-2 text-white/80">{s.p}</p>
                </motion.article>
              ))}
            </div>
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
