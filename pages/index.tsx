import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import BinaryRain from "../components/BinaryRain";
import { motion, Transition } from "framer-motion";

export default function Home() {
  const words = ["Smarter", "Faster", "Securely", "Syfter"];
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

  const testimonials = [
    "“Syfter delivered top candidates in days. I was blown away.” — SaaS Hiring Manager",
    "“I've never seen recruiting move this fast. Total pros.” — Tech Startup CEO",
    "“Their candidate quality was unmatched.” — Healthcare Director",
  ];
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const countsRef = useRef<HTMLDivElement | null>(null);
  const [counts, setCounts] = useState([0, 0, 0]);
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const targets = [128, 5, 98];
          let step = 0;
          const interval = setInterval(() => {
            step++;
            setCounts(targets.map(t => Math.round((t * step) / 30)));
            if (step === 30) clearInterval(interval);
          }, 40);
        }
      },
      { threshold: 0.5 }
    );
    if (countsRef.current) observer.observe(countsRef.current);
    return () => observer.disconnect();
  }, []);

const sectionMotion = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.8, ease: "easeInOut" as Transition["ease"] },
  viewport: { once: false, amount: 0.2 },
};

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3 },
    }),
  };

  return (
    <>
      <Head>
        <title>Syfter — Secure Hiring Made Human</title>
      </Head>

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md text-white py-4 px-6 flex justify-between items-center transition">
        <div className="text-xl font-bold text-white">Syfter</div>
        <nav className="space-x-6 hidden md:flex text-sm font-medium text-white">
          <a href="#why" className="hover:text-syfterBlue transition">Why Syfter</a>
          <a href="#jobs" className="hover:text-syfterBlue transition">Find Work</a>
          <a href="#hire" className="hover:text-syfterBlue transition">Hire Talent</a>
          <a href="#contact" className="hover:text-syfterBlue transition">Contact</a>
        </nav>
        <button className="bg-syfterBlue text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
          Get Started
        </button>
      </header>

      <main className="pt-20 bg-gradient-to-b from-[#5a6673] via-[#38424d] to-[#1a1f27] text-white">

        {/* Hero */}
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
          <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none z-10"
               style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0), #1e3a5f)" }} />
        </section>

        {/* Why Syfter */}
        <motion.section id="why" className="pt-20 pb-10 bg-[#1e3a5f] text-center text-white" {...sectionMotion}>
          <h2 className="text-5xl font-bold mb-14">Why Syfter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {[
              { title: "Syfter Certified", text: "Screened for resilience, communication, and excellence." },
              { title: "AI-Proofed", text: "Human-reviewed to avoid automation blind spots." },
              { title: "Fast Hiring", text: "Reduce time-to-hire to under 5 days." },
              { title: "People First", text: "We don’t fill seats — we grow teams." },
            ].map((item, i) => (
              <motion.div key={i} custom={i} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: false }}>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section className="py-20 text-center px-6" {...sectionMotion} ref={countsRef}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div><div className="text-4xl font-bold mb-2">{counts[0]}</div><p className="text-lg">Hires placed</p></div>
            <div><div className="text-4xl font-bold mb-2">{counts[1]}</div><p className="text-lg">Avg. fill time (days)</p></div>
            <div><div className="text-4xl font-bold mb-2">{counts[2]}%</div><p className="text-lg">Retention rate</p></div>
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
              <motion.div key={i} className="bg-[#1e3a5f] p-4 rounded border border-[#69bdff] hover:scale-105 transition-transform">
                <h4 className="font-semibold text-lg">{job.title}</h4>
                <p className="text-sm">{job.loc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section className="bg-[#1e3a5f] py-20 text-center px-6" {...sectionMotion}>
          <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
          <motion.blockquote className="italic text-lg max-w-2xl mx-auto" key={activeTestimonial} {...sectionMotion}>
            {testimonials[activeTestimonial]}
          </motion.blockquote>
        </motion.section>

        {/* Footer */}
        <motion.section id="contact" className="py-20 text-center text-white bg-[#0b192f]" {...sectionMotion}>
          <h2 className="text-3xl font-bold mb-4">Let's Build the Future of Work</h2>
          <p className="mb-6 text-lg">Join hundreds of companies who trust Syfter to hire smarter, faster, and with clarity.</p>
          <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded hover:bg-gray-200 transition">
            Contact Us
          </button>
        </motion.section>
      </main>
    </>
  );
}
