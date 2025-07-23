// Home.tsx
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import BinaryRain from "@/components/BinaryRain";

const fadeInMotion = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: [0.42, 0, 0.58, 1] as any },
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
          {["Why Syfter", "Find Work", "Hire Talent", "Certify", "Executive Team", "Contact"].map((t, i) => (
            <a key={i} href={`#${t.toLowerCase().replace(/ /g, "")}`} className="hover:text-blue-300 transition">{t}</a>
          ))}
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">Get Started</button>
      </header>

      <main className="pt-10 min-h-screen text-white bg-[#28303b]">
        {/* Hero Section */}
        <section
          className="relative h-screen overflow-hidden text-white"
          style={{ background: "linear-gradient(to bottom, #3e4e5e, #28303b)" }}
        >
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
          <h2 className="text-5xl font-bold mb-14">Why Syfter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {["Syfter Certified", "AI-Proofed", "Fast Hiring", "People First"].map((title, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.3, duration: 1 }} viewport={{ once: true }} className="p-4">
                <h4 className="text-xl font-semibold mb-2">{title}</h4>
                <p className="text-sm">{[
                  "Screened for resilience, communication, and excellence.",
                  "Human-reviewed to avoid automation blind spots.",
                  "Reduce time-to-hire to under 5 days.",
                  "We don’t fill seats — we grow teams."
                ][i]}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Syfter Certify */}
        <motion.section id="certify" className="bg-[#28303b] py-20 text-center px-6" {...fadeInMotion}>
          <h2 className="text-3xl font-bold mb-6">What is Syfter Certify?</h2>
          <p className="max-w-3xl mx-auto text-lg mb-6">Our certified candidates are screened using a combination of technical interviews, transcript insights, and alignment with your JD. Every profile includes:</p>
          <ul className="max-w-2xl mx-auto text-left space-y-3 list-disc list-inside">
            <li>Core Strengths aligned to your stack</li>
            <li>Unique insights from transcript & LinkedIn</li>
            <li>Candidate Quote for culture fit</li>
            <li>Why [Candidate] – our detailed recommendation</li>
            <li>Two-bullet summaries of latest roles</li>
            <li>Technical Q&A snapshot</li>
          </ul>
        </motion.section>

        {/* Executive Team */}
        <motion.section id="executiveteam" className="bg-[#3e4e5e] py-20 text-center px-6" {...fadeInMotion}>
          <h2 className="text-3xl font-bold mb-10">Executive Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {["Steve Perlman", "Matt Hall", "Nikka Winchell", "Ira Plutner"].map((name, i) => (
              <div key={i} className="bg-[#1e3a5f] p-6 rounded text-white shadow-md">
                <h4 className="text-xl font-semibold mb-2">{name}</h4>
                <p className="text-sm">{["Founder & CEO", "CRO", "CRO", "CFO"][i]}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section className="bg-[#28303b] py-20 text-center px-6" {...fadeInMotion} ref={countersRef}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {["hires placed", "avg. fill time (days)", "retention rate"].map((label, i) => (
              <div key={i}><div className="text-4xl font-bold mb-2">{counts[i]}{i === 2 ? "%" : ""}</div><p className="text-lg font-medium">{label}</p></div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section className="bg-transparent py-20 text-center px-6" {...fadeInMotion}>
          <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
          <motion.blockquote key={activeTestimonial} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="italic text-lg max-w-2xl mx-auto">
            {testimonials[activeTestimonial]}
          </motion.blockquote>
        </motion.section>

        {/* Contact */}
        <motion.section id="contact" className="text-white text-center py-20 bg-[#3e4e5e]" {...fadeInMotion}>
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">Let's Build the Future of Work</h2>
            <p className="mb-6 text-lg">Join hundreds of companies who trust Syfter to hire smarter, faster, and with clarity.</p>
            <p className="mb-6">NYC • Denver • Remote-First</p>
            <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded hover:bg-gray-100 transition">Contact Us</button>
          </div>
        </motion.section>
      </main>
    </>
  );
}
