import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import BinaryRain from "../components/BinaryRain";
import { motion } from "framer-motion";

// Typing animation
const words = ["Smarter", "Faster", "Securely", "Syfter"];
export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = deleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayText(currentWord.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        setDisplayText(currentWord.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  // Stats counter
  const [counts, setCounts] = useState([0, 0, 0]);
  const countersRef = useRef<HTMLDivElement | null>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const targetCounts = [128, 5, 98];
          const duration = 1000;
          const steps = 30;
          const stepTime = duration / steps;
          let currentStep = 0;

          const interval = setInterval(() => {
            currentStep++;
            setCounts(targetCounts.map((target) =>
              Math.round((target * currentStep) / steps)
            ));
            if (currentStep === steps) clearInterval(interval);
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );

    if (countersRef.current) observer.observe(countersRef.current);
    return () => observer.disconnect();
  }, []);

const sectionMotion = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: {
    duration: 1.2,
    ease: "easeInOut", 
  },
  viewport: { once: false, amount: 0.3 },
};


  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.4,
        duration: 1.2,
        ease: [0.42, 0, 0.58, 1],
      },
    }),
  };

  return (
    <>
      <Head>
        <title>Syfter — Precision Staffing Made Human</title>
      </Head>

      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-slate-600/90 to-slate-800/80 backdrop-blur shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="text-xl font-bold text-white">Syfter</div>
        <nav className="space-x-6 hidden md:flex text-sm font-medium text-white">
          <a href="#why" className="hover:text-blue-400 transition">Why Syfter</a>
          <a href="#jobs" className="hover:text-blue-400 transition">Find Work</a>
          <a href="#hire" className="hover:text-blue-400 transition">Hire Talent</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">Get Started</button>
      </header>

      <main className="pt-20 bg-gradient-to-b from-slate-500 via-slate-700 to-[#1e3a5f] text-white">

        {/* HERO */}
        <section className="relative h-screen overflow-hidden bg-black text-white">
          <BinaryRain />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
            <motion.h1 className="text-6xl font-bold mb-4" {...sectionMotion}>
              Hire <span className="italic text-syfterBlue">{displayText}</span>
            </motion.h1>
            <motion.p className="text-xl mb-8" {...sectionMotion}>
              Syfter Certified talent delivered faster, smarter, better.
            </motion.p>
            <motion.div className="flex justify-center gap-6" {...sectionMotion}>
              <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200">
                Find Talent
              </button>
              <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200">
                Find Jobs
              </button>
            </motion.div>
          </div>
          <div
            className="absolute bottom-0 left-0 w-full h-64 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(30,58,95,0.3) 50%, #1e3a5f 100%)",
            }}
          />
        </section>

        {/* WHY SYFTER */}
        <motion.section id="why" className="pt-20 pb-10 bg-[#1e3a5f] text-center text-white" {...sectionMotion}>
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
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
              >
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section className="py-20 text-center px-6" {...sectionMotion} ref={countersRef}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold mb-2">{counts[0]}</div>
              <p className="text-lg font-medium">hires placed</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{counts[1]}</div>
              <p className="text-lg font-medium">avg. fill time (days)</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{counts[2]}%</div>
              <p className="text-lg font-medium">retention rate</p>
            </div>
          </div>
        </motion.section>

        {/* Jobs */}
        <motion.section id="jobs" className="py-20 px-6" {...sectionMotion}>
          <h2 className="text-3xl font-bold text-center mb-10">Featured Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Frontend Developer", loc: "NY, Full-Time" },
              { title: "Product Manager", loc: "Remote, Contract" },
              { title: "IT Project Manager", loc: "Chicago, Contract" },
              { title: "Data Analyst", loc: "Stousburg, Full-Time" },
            ].map((job, i) => (
              <div key={i} className="bg-[#1e3a5f] p-4 rounded border border-[#69bdff] text-white">
                <h4 className="font-semibold text-lg">{job.title}</h4>
                <p className="text-sm">{job.loc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section className="bg-[#1e3a5f] py-20 text-center px-6" {...sectionMotion}>
          <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
          <blockquote className="italic text-lg max-w-2xl mx-auto">
            “Syfter delivered top candidates in days. I was blown away.”
          </blockquote>
        </motion.section>

        {/* Footer */}
        <motion.section
          id="contact"
          className="text-white text-center py-20 bg-[#1e3a5f]"
          {...sectionMotion}
        >
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
