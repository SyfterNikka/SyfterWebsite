import Head from "next/head";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const SYFTER_BLUE = "#69bdff";
const BG_TOP = "#3e4e5e"; // gray-blue
const BG_BOTTOM = "#28303b"; // charcoal

function SectionWrap({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative w-full max-w-6xl mx-auto px-6 sm:px-8 py-20 ${className}`}>
      {children}
    </section>
  );
}

function TypingSectionTitle({ label, highlight }: { label: string; highlight?: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5 }}
      className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white"
    >
      {label} {highlight ? <em className="not-italic text-[1.05em] text-[color:var(--syfter-blue)]" style={{ ['--syfter-blue' as any]: SYFTER_BLUE }}>{highlight}</em> : null}
    </motion.h2>
  );
}

function Dot() {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/10 border border-white/10 mr-3">
      <span className="w-2 h-2 rounded-full bg-white/80" />
    </span>
  );
}

function Shield({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 3l7 3v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-3z" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.25"/>
      <path d="M8.5 12.5l2.5 2.5 4.5-5" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function GridBackdrop() {
  // subtle software/security vibe grid
  return (
    <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none opacity-[0.12] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

function HeroBackdrop() {
  const prefersReduced = useReducedMotion();
  const anim = prefersReduced ? {} : { animate: { x: [0, 8, -6, 0], y: [0, -6, 8, 0] }, transition: { duration: 22, repeat: Infinity, ease: "easeInOut" } };
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <motion.div
        {...anim}
        className="absolute -top-40 -left-40 w-[55vw] h-[55vw] rounded-full"
        style={{ background: `radial-gradient(closest-side, ${SYFTER_BLUE}22, transparent 65%)`, filter: "blur(20px)" }}
      />
      <motion.div
        {...anim}
        className="absolute -bottom-24 -right-32 w-[45vw] h-[45vw] rounded-full"
        style={{ background: `radial-gradient(closest-side, #ffffff1a, transparent 60%)`, filter: "blur(24px)" }}
      />
    </div>
  );
}

function TrustCard({ title, desc, benefit, icon }: { title: string; desc: string; benefit: string; icon?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <div className="flex items-center gap-3 text-white">
        {icon}
        <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-white/70 mt-2">{desc}</p>
      <p className="text-white/80 mt-3 italic"><span className="font-medium not-italic">Benefit:</span> {benefit}</p>
    </motion.div>
  );
}

function FivePointShield() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-white/90 text-sm tracking-wide">
        5-Point Trust Protocol
      </div>
    </div>
  );
}

export default function CertifiedPage() {
  const bg = useMemo(() => ({ background: `linear-gradient(to bottom, ${BG_TOP}, ${BG_BOTTOM})` }), []);

  return (
    <main className="relative min-h-screen overflow-x-clip" style={bg}>
      <Head>
        <title>Syfter Certified — Secure Hiring</title>
        <meta name="description" content="Syfter Certified is a premium trust signal for secure hiring. Human-verified presence, geo-location checks, AI interview prevention, multi-channel validation, and the Syfter Trust Guarantee." />
      </Head>

      <div className="pointer-events-none fixed inset-0 -z-10" style={bg} />

      {/* HERO */}
      <div className="relative">
        <HeroBackdrop />
        <SectionWrap id="hero" className="pt-28 pb-24 md:pt-36 md:pb-28">
          <GridBackdrop />
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight"
          >
            Syfter <em className="not-italic" style={{ color: SYFTER_BLUE, fontStyle: "italic" }}>Certified</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-white/80 mt-4 max-w-2xl"
          >
            The PreCheck of hiring. A secure, human verified trust layer that helps teams move faster, smarter, and with confidence.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="mt-8 flex gap-3">
            <a href="#protocol" className="rounded-xl px-5 py-3 bg-white/10 text-white border border-white/20 hover:bg-white/15 transition">See the protocol</a>
            <a href="/contact" className="rounded-xl px-5 py-3 border border-white/20 text-white hover:bg-white/10 transition">Request a certified candidate</a>
          </motion.div>
        </SectionWrap>
      </div>

      {/* Why secure hiring */}
      <SectionWrap id="why">
        <TypingSectionTitle label="Secure" highlight="hiring" />
        <div className="mt-6 grid md:grid-cols-2 gap-6 text-white/85">
          <p>Great teams need speed and trust. Syfter Certified adds a practical verification layer that reduces fraud risk while keeping your process simple and fast.</p>
          <ul className="space-y-3">
            <li className="flex items-start"><Dot /><span>Real humans on real video, no blurred or generated backgrounds.</span></li>
            <li className="flex items-start"><Dot /><span>Location confidence and identity integrity checked before handoff.</span></li>
            <li className="flex items-start"><Dot /><span>Public profile cross checks to validate resume claims.</span></li>
          </ul>
        </div>
      </SectionWrap>

      {/* 5-Point Protocol */}
      <SectionWrap id="protocol">
        <FivePointShield />
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <TrustCard
            title="Human Verified Presence"
            desc="Live human to human video screen with real backgrounds, recorded and transcribed."
            benefit="Confirms the candidate is real, present, and personally accountable."
            icon={<Shield className="w-7 h-7 text-white" />}
          />
          <TrustCard
            title="Geo Location Check"
            desc="We confirm stated location validity through our Syfter Trust process."
            benefit="Prevents remote fraud and misrepresentation."
            icon={<Shield className="w-7 h-7 text-white" />}
          />
          <TrustCard
            title="AI Interview Prevention"
            desc="Pre vetted open ended questions asked live, with real time monitoring for AI assistance."
            benefit="Maximizes real human responses and disables AI help."
            icon={<Shield className="w-7 h-7 text-white" />}
          />
          <TrustCard
            title="Multi Channel Validation"
            desc="We cross reference resume claims with publicly available profiles."
            benefit="Minimizes identity fraud and verifies work history integrity."
            icon={<Shield className="w-7 h-7 text-white" />}
          />
          <TrustCard
            title="Syfter Trust Guarantee"
            desc="A signed commitment that affirms identity, location, and exclusive engagement."
            benefit="Adds an extra layer of protection and accountability."
            icon={<Shield className="w-7 h-7 text-white" />}
          />
        </div>
      </SectionWrap>

      {/* How it fits your process */}
      <SectionWrap id="fit">
        <TypingSectionTitle label="Fits into" highlight="your process" />
        <div className="mt-6 grid md:grid-cols-3 gap-6 text-white/80">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-white font-semibold">Source</h3>
            <p className="mt-2">We run the checks during sourcing and screening so only trusted candidates reach you.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-white font-semibold">Share</h3>
            <p className="mt-2">You get concise write ups and links, with security signals included in the handoff.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-white font-semibold">Scale</h3>
            <p className="mt-2">Keep ownership of interviews and offers while we refresh your shortlist each cycle.</p>
          </div>
        </div>
      </SectionWrap>

      {/* FAQs */}
      <SectionWrap id="faqs">
        <TypingSectionTitle label="Common" highlight="questions" />
        <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
          {[{
            q: "Is this a separate product?",
            a: "Syfter Certified is a trust layer applied to candidates we present. It enhances our sourcing and screening without adding friction to your team.",
          },{
            q: "Do we need new tools?",
            a: "No. Updates fit into your existing tools and cadence. We prioritize speed and clarity.",
          },{
            q: "What roles does this support?",
            a: "IC and lead roles across engineering, product, data, platform, and IT where security and trust matter.",
          },{
            q: "How do you prevent AI assisted interviews?",
            a: "We use open ended prompts and live monitoring for assistance indicators, and we require real environments on video.",
          }].map((it, idx) => (
            <details key={idx} className="group p-6 cursor-pointer">
              <summary className="list-none flex items-center justify-between">
                <span className="text-white font-medium">{it.q}</span>
                <span className="ml-4 text-white/60 group-open:rotate-45 transition">+</span>
              </summary>
              <p className="text-white/70 mt-3">{it.a}</p>
            </details>
          ))}
        </div>
      </SectionWrap>

      {/* CTA */}
      <SectionWrap id="cta" className="pb-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center"
        >
          <h3 className="text-white text-2xl font-semibold">See what verified trust looks like</h3>
          <p className="text-white/70 mt-2">Request a pre certified candidate today and add a security layer to your hiring.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="/contact" className="rounded-xl px-5 py-3 bg-white/10 text-white border border-white/20 hover:bg-white/15 transition">Request now</a>
            <a href="#protocol" className="rounded-xl px-5 py-3 border border-white/20 text-white hover:bg-white/10 transition">See the 5 point protocol</a>
          </div>
        </motion.div>
      </SectionWrap>
    </main>
  );
}
