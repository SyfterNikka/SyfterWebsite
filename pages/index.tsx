import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import BinaryRain from "@/components/BinaryRain";

const fadeInMotion: MotionProps = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: {
    duration: 1.2,
    ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
  },
  viewport: { once: false, amount: 0.3 },
};

export default function Home() {
  const words = ["Smarter", "Faster", "Securely", "Syfter"];
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const delay = deleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayText(word.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex + 1 === word.length) setTimeout(() => setDeleting(true), 1200);
      } else {
        setDisplayText(word.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  const [counts, setCounts] = useState([0, 0, 0]);
  const countersRef = useRef<HTMLDivElement | null>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        const targets = [128, 5, 98];
        const steps = 30;
        let step = 0;
        const interval = setInterval(() => {
          step++;
          setCounts(targets.map((t) => Math.round((t * step) / steps)));
          if (step === steps) clearInterval(interval);
        }, 33);
      }
    }, { threshold: 0.5 });
    if (countersRef.current) observer.observe(countersRef.current);
    return () => observer.disconnect();
  }, []);

  const testimonials = [
    "“Syfter delivered top candidates in days.” — SaaS Manager",
    "“Recruiting this fast? Unreal.” — Tech Startup CEO",
    "“Candidate quality = unmatched.” — Healthcare Director"
  ];
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head><title>Syfter — Precision Staffing Made Human</title></Head>
      <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md text-white py-3 px-6 flex justify-between items-center">
        <div className="text-xl font-bold text-white">Syfter</div>
        <nav className="space-x-6 hidden md:flex text-sm font-medium text-white">
          {["Why Syfter", "Find Work", "Hire Talent", "Contact"].map((t, i) => (
            <a key={i} href={`#${t.toLowerCase().replace(" ", "")}`} className="hover:text-blue-300 transition">{t}</a>
          ))}
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">Get Started</button>
      </header>

      <main className="pt-10 min-h-screen text-white" style={{ background: "linear-gradient(to bottom, #3e4e5e, #28303b)" }}>
        {/* Hero Section */}
        <section className="relative h-screen overflow-hidden text-white">
          <BinaryRain />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
            <motion.h1 className="text-6xl font-bold mb-4" {...fadeInMotion}>
              Hire <span className="italic text-[#69bdff]">{displayText}</span>
            </motion.h1>
            <motion.p className="text-xl mb-8 max-w-2xl mx-auto" {...fadeInMotion}>
              Syfter Certified talent delivered faster, smarter, better.
            </motion.p>
            <motion.div className="flex justify-center gap-6" {...fadeInMotion}>
              <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200">Find Talent</button>
              <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200">Find Jobs</button>
            </motion.div>
          </div>
        </section>

        {/* Why Syfter */}
        <motion.section id="whysyfter" className="pt-20 pb-10 text-center bg-[#3e4e5e]" {...fadeInMotion}>
          <h2 className="text-5xl font-bold mb-14 underline decoration-[#69bdff] underline-offset-8">Why Syfter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {["Syfter Certified", "AI-Proofed", "Fast Hiring", "People First"].map((title, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.2, duration: 1.4, ease: [0.42, 0, 0.58, 1] }}
                viewport={{ once: true }}
                className="flex items-center justify-center h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 rounded-full bg-gray-200 text-black mx-auto shadow-md p-6"
              >
                <span className="text-lg font-semibold text-center leading-tight">{title}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section className="py-20 text-center px-6" {...fadeInMotion} ref={countersRef}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div><div className="text-4xl font-bold mb-2">{counts[0]}</div><p className="text-lg font-medium">hires placed</p></div>
            <div><div className="text-4xl font-bold mb-2">{counts[1]}</div><p className="text-lg font-medium">avg. fill time (days)</p></div>
            <div><div className="text-4xl font-bold mb-2">{counts[2]}%</div><p className="text-lg font-medium">retention rate</p></div>
          </div>
        </motion.section>

        {/* Executive Team */}
        <motion.section className="py-20 text-center bg-[#3e4e5e]" {...fadeInMotion}>
          <h2 className="text-4xl font-bold mb-12 inline-block border-b-4 border-[#69bdff] pb-1">Executive Team</h2>
          <div className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto">
            {["Steve Perlman, CEO", "Matt Hall, CRO", "Nikka Winchell, CRO", "Ira Plutner, CFO"].map((person, i) => (
              <motion.div
                key={i}
                className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-center font-semibold text-gray-800 shadow-md"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3, duration: 1 }}
                viewport={{ once: true }}
              >
                <span className="text-sm px-2">{person}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Syfter Certify */}
        <motion.section className="py-20 text-center bg-[#28303b]" {...fadeInMotion}>
          <h2 className="text-4xl font-bold mb-10 inline-block border-b-4 border-[#69bdff] pb-1">Syfter Certify</h2>
          <p className="mb-10 max-w-xl mx-auto text-lg">The Precheck of Hiring. We implement a 5-step trust protocol to ensure every candidate is real, qualified, and ready.</p>
          <div className="flex flex-wrap justify-center gap-6">
            {["AI Interview Detection", "Geo-Verification", "Communication Review", "Experience Verification", "Syfter Badge Approval"].map((step, i) => (
              <motion.div
                key={i}
                className="bg-[#1e3a5f] text-white px-6 py-3 rounded-full border border-[#69bdff] shadow-md"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {step}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section className="bg-transparent py-20 text-center px-6" {...fadeInMotion}>
          <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
          <motion.blockquote
            key={activeTestimonial}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="italic text-lg max-w-2xl mx-auto"
          >
            {testimonials[activeTestimonial]}
          </motion.blockquote>
        </motion.section>

        {/* Footer / Contact */}
        <motion.section id="contact" className="text-white text-center py-20 bg-transparent" {...fadeInMotion}>
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">Let's Build the Future of Work</h2>
            <p className="mb-6 text-lg">Join hundreds of companies who trust Syfter to hire smarter, faster, and with clarity.</p>
            <p className="mb-4 text-md">New York, NY | Denver, CO | Remote Nationwide</p>
            <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded hover:bg-gray-100 transition">Contact Us</button>
          </div>
        </motion.section>
      </main>
    </>
  );
}
