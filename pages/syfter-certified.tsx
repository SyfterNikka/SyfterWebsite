import Head from "next/head";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const SYFTER_BLUE = "#69bdff";
const BG_TOP = "#3e4e5e";
const BG_BOTTOM = "#28303b";

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

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 flex-shrink-0 text-white" aria-hidden>
      <path d="M12 3l7 3v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-3z" stroke="currentColor" strokeOpacity="0.9" strokeWidth="1.25"/>
      <path d="M8.5 12.5l2.5 2.5 4.5-5" stroke="currentColor" strokeOpacity="0.9" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function HeroBackdrop() {
  const prefersReduced = useReducedMotion();
  const easeInOut: [number, number, number, number] = [0.42, 0, 0.58, 1];
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-40 -left-40 w-[55vw] h-[55vw] rounded-full"
        style={{ background: `radial-gradient(closest-side, ${SYFTER_BLUE}22, transparent 65%)`, filter: "blur(20px)" }}
        animate={prefersReduced ? undefined : { x: [0, 8, -6, 0], y: [0, -6, 8, 0] }}
        transition={prefersReduced ? undefined : { duration: 22, repeat: Infinity, ease: easeInOut }}
      />
      <motion.div
        className="absolute -bottom-24 -right-32 w-[45vw] h-[45vw] rounded-full"
        style={{ background: `radial-gradient(closest-side, #ffffff1a, transparent 60%)`, filter: "blur(24px)" }}
        animate={prefersReduced ? undefined : { x: [0, 8, -6, 0], y: [0, -6, 8, 0] }}
        transition={prefersReduced ? undefined : { duration: 22, repeat: Infinity, ease: easeInOut }}
      />
    </div>
  );
}

function TrustRow({ title, desc, benefit }: { title: string; desc: string; benefit: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45 }}
      className="flex items-start gap-4"
    >
      <ShieldIcon />
      <div>
        <h3 className="text-white text-lg sm:text-xl font-semibold">{title}</h3>
        <p className="text-white/70 mt-1">{desc}</p>
        <p className="text-white/80 mt-2 italic"><span className="font-medium not-italic">Benefit:</span> {benefit}</p>
      </div>
    </motion.div>
  );
}

export default function CertifiedPage() {
  const bg = useMemo(() => ({ background: `linear-gradient(to bottom, ${BG_TOP}, ${BG_BOTTOM})` }), []);

  return (
    <main className="relative min-h-screen overflow-x-clip" style={bg}>
      <Head>
        <title>Syfter Certified — Secure Hiring</title>
      </Head>

      <div className="pointer-events-none fixed inset-0 -z-10" style={bg} />

      {/* HERO */}
      <div className="relative">
        <HeroBackdrop />
        <SectionWrap id="hero" className="pt-28 pb-24 md:pt-36 md:pb-28 text-center">
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
            className="text-white/80 mt-4 max-w-2xl mx-auto"
          >
            The PreCheck of hiring. A secure, human verified trust layer that helps teams move faster, smarter, and with confidence.
          </motion.p>
        </SectionWrap>
      </div>

      {/* Why secure hiring */}
      <SectionWrap id="why">
        <TypingSectionTitle label="Secure" highlight="hiring" />
        <div className="mt-6 grid md:grid-cols-2 gap-6 text-white/85">
          <p>Great teams need speed and trust. Syfter Certified adds a practical verification layer that reduces fraud risk while keeping your process simple and fast.</p>
          <ul className="space-y-3">
            <li className="flex items-start"><ShieldIcon /><span>Real humans on real video, no blurred or generated backgrounds.</span></li>
            <li className="flex items-start"><ShieldIcon /><span>Location confidence and identity integrity checked before handoff.</span></li>
            <li className="flex items-start"><ShieldIcon /><span>Public profile cross checks to validate resume claims.</span></li>
          </ul>
        </div>
      </SectionWrap>

      {/* 5-Point Protocol as vertical list */}
      <SectionWrap id="protocol">
        <TypingSectionTitle label="5-Point" highlight="Trust Protocol" />
        <div className="mt-10 space-y-10">
          <TrustRow
            title="Human Verified Presence"
            desc="Live human to human video screen with real backgrounds, recorded and transcribed."
            benefit="Confirms the candidate is real, present, and personally accountable."
          />
          <TrustRow
            title="Geo Location Check"
            desc="We confirm stated location validity through our Syfter Trust process."
            benefit="Prevents remote fraud and misrepresentation."
          />
          <TrustRow
            title="AI Interview Prevention"
            desc="Pre vetted open ended questions asked live, with real time monitoring for AI assistance."
            benefit="Maximizes real human responses and disables AI help."
          />
          <TrustRow
            title="Multi Channel Validation"
            desc="We cross reference resume claims with publicly available profiles."
            benefit="Minimizes identity fraud and verifies work history integrity."
          />
          <TrustRow
            title="Syfter Trust Guarantee"
            desc="A signed commitment that affirms identity, location, and exclusive engagement."
            benefit="Adds an extra layer of protection and accountability."
          />
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
