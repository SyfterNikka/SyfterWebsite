import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import BinaryRain from "@/components/BinaryRain";

const fadeInMotion = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 1.2 },
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
  const countersRef = useRef(null);
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
        <motion.section id="whysyfter" className="py-20 text-center bg-[#3e4e5e]" {...fadeInMotion}>
          <h2 className="text-5xl font-bold mb-14 underline decoration-[#69bdff]">Why Syfter</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {["Syfter Certified", "AI-Proofed", "Fast Hiring", "People First"].map((title, i) => (
              <motion.div key={i} className="flex flex-col items-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }}>
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-[#1e3a5f] font-semibold text-center text-sm shadow-lg">
                  {title}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Exec Team */}
        <motion.section id="exec" className="py-20 text-center bg-[#28303b]" {...fadeInMotion}>
          <h2 className="text-5xl font-bold mb-14 underline decoration-[#69bdff]">Executive Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {[
              { name: "Steve Perlman", title: "CEO" },
              { name: "Matt Hall", title: "CRO" },
              { name: "Nikka Winchell", title: "CRO" },
              { name: "Ira Plutner", title: "CFO" },
            ].map((member, i) => (
              <motion.div
                key={i}
                className="w-32 h-32 bg-gray-200 text-black rounded-full flex items-center justify-center text-sm font-semibold shadow-lg transform transition-transform duration-700 hover:rotate-y-180"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div>{member.name}</div>
                  <div className="text-xs font-normal">{member.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Syfter Certify */}
        <motion.section id="certify" className="py-20 text-center bg-[#3e4e5e]" {...fadeInMotion}>
          <h2 className="text-5xl font-bold mb-14 underline decoration-[#69bdff]">Syfter Certify</h2>
          <p className="text-lg max-w-xl mx-auto mb-10">The Precheck of hiring — Our 5-step trust protocol ensures candidate authenticity and quality.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {["AI Interview Detection", "Geo Verification", "Skill Assessment", "Soft Skill Check", "Final Round Review"].map((step, i) => (
              <motion.div
                key={i}
                className="w-24 h-24 bg-white text-[#1e3a5f] rounded-full flex items-center justify-center text-xs font-semibold shadow-md"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 + i * 0.2 }}
                viewport={{ once: true }}
              >
                {step}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section className="py-20 text-center px-6 bg-[#28303b]" {...fadeInMotion} ref={countersRef}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div><div className="text-4xl font-bold mb-2">{counts[0]}</div><p className="text-lg font-medium">hires placed</p></div>
            <div><div className="text-4xl font-bold mb-2">{counts[1]}</div><p className="text-lg font-medium">avg. fill time (days)</p></div>
            <div><div className="text-4xl font-bold mb-2">{counts[2]}%</div><p className="text-lg font-medium">retention rate</p></div>
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section id="contact" className="text-white text-center py-20 bg-[#3e4e5e] px-6" {...fadeInMotion}>
          <h2 className="text-4xl font-bold mb-6 underline decoration-[#69bdff]">Contact Us</h2>
          <p className="text-lg mb-4">Find us in NYC, Chicago, and Remote — or reach us anytime online.</p>
          <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded hover:bg-gray-100 transition">Reach Out</button>
        </motion.section>
      </main>
    </>
  );
}
