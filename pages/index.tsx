import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import BinaryRain from "../components/BinaryRain";

const easeInOutCubic: [number, number, number, number] = [0.42, 0, 0.58, 1];

const fadeInMotion = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: {
    duration: 1.2,
    ease: easeInOutCubic as unknown as import("framer-motion").Easing,
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
      <Head>
        <title>Syfter — Precision Staffing Made Human</title>
      </Head>

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#2c3b4a]/40 text-white py-4 px-6 flex justify-between items-center transition-all duration-300">
        <div className="text-xl font-bold">Syfter</div>
        <nav className="space-x-6 hidden md:flex text-sm font-medium">
          {["Why Syfter", "Find Work", "Hire Talent", "Contact"].map((t, i) => (
            <a key={i} href={`#${t.toLowerCase().replace(" ", "")}`} className="hover:text-blue-300 transition">{t}</a>
          ))}
        </nav>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">Get Started</button>
      </header>

      <main className="pt-20 bg-gradient-to-b from-[#43494f] to-[#272e36] text-white">

        {/* Hero */}
        <section className="relative h-screen overflow-hidden">
          <BinaryRain />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
            <motion.h1 className="text-6xl font-bold mb-4" {...fadeInMotion}>
              Hire <span className="italic text-blue-400">{displayText}</span>
            </motion.h1>
            <motion.p className="text-xl mb-8" {...fadeInMotion}>
              Syfter Certified talent delivered faster, smarter, better.
            </motion.p>
            <motion.div className="flex justify-center gap-6" {...fadeInMotion}>
              <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200">Find Talent</button>
              <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200">Find Jobs</button>
            </motion.div>
          </div>

          {/* Smooth hero bottom fade */}
          <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0), #272e36)" }} />
        </section>

        {/* Why Syfter */}
        <motion.section id="whysyfter" className="pt-24 pb-14 text-center text-white" {...fadeInMotion}>
          <h2 className="text-5xl font-bold mb-14">Why Syfter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {[
              { title: "Syfter Certified", text: "Screened for resilience, communication, and excellence." },
              { title: "AI-Proofed", text: "Human-reviewed to avoid automation blind spots." },
              { title: "Fast Hiring", text: "Reduce time-to-hire to under 5 days." },
              { title: "People First", text: "We don’t fill seats — we grow teams." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3, duration: 1, ease: easeInOutCubic }}
                viewport={{ once: true }}
                className="p-4"
              >
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section className="py-20 text-center px-6" {...fadeInMotion}>
          <div ref={countersRef}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
              <div><div className="text-4xl font-bold mb-2">{counts[0]}</div><p className="text-lg font-medium">hires placed</p></div>
              <div><div className="text-4xl font-bold mb-2">{counts[1]}</div><p className="text-lg font-medium">avg. fill time (days)</p></div>
              <div><div className="text-4xl font-bold mb-2">{counts[2]}%</div><p className="text-lg font-medium">retention rate</p></div>
            </div>
          </div>
        </motion.section>

        {/* Jobs */}
        <motion.section id="findwork" className="py-20 px-6" {...fadeInMotion}>
          <h2 className="text-3xl font-bold text-center mb-10">Featured Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Frontend Developer", loc: "NY, Full-Time" },
              { title: "Product Manager", loc: "Remote, Contract" },
              { title: "IT Project Manager", loc: "Chicago, Contract" },
              { title: "Data Analyst", loc: "Stousburg, Full-Time" },
            ].map((job, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-[#1e3a5f] p-4 rounded border border-[#69bdff] text-white transition"
              >
                <h4 className="font-semibold text-lg">{job.title}</h4>
                <p className="text-sm">{job.loc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section className="bg-[#1e3a5f] py-20 text-center px-6" {...fadeInMotion}>
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

        {/* Footer */}
        <motion.section id="contact" className="text-white text-center py-20 bg-[#1e3a5f]" {...fadeInMotion}>
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">Let's Build the Future of Work</h2>
            <p className="mb-6 text-lg">Join hundreds of companies who trust Syfter to hire smarter, faster, and with clarity.</p>
            <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded hover:bg-gray-100 transition">
              Contact Us
            </button>
          </div>
        </motion.section>
      </main>
    </>
  );
}
