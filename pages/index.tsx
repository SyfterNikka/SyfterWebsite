import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { motion, type MotionProps } from "framer-motion";
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
        const steps = 60;
        let step = 0;
        const interval = setInterval(() => {
          step++;
          setCounts(targets.map((t) => Math.round((t * step) / steps)));
          if (step === steps) clearInterval(interval);
        }, 40);
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

      <main className="pt-10 min-h-screen text-white" style={{ background: "linear-gradient(to bottom, #0a0a0a 0%, #3e4e5e 40%, #28303b 100%)" }}>

        {/* Hero */}
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
        <motion.section id="whysyfter" className="pt-28 pb-20 text-center" {...fadeInMotion}>
          <h2 className="text-5xl font-bold mb-14 inline-block border-b-4 border-[#69bdff] pb-1">Why Syfter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {["Syfter Certified", "AI-Proofed", "Fast Hiring", "People First"].map((title, i) => (
              <motion.div key={i} className="flex flex-col items-center min-h-[180px]" initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: i * 0.2, duration: 0.9 }} viewport={{ once: true }}>
                <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-center text-gray-800 font-bold px-2 text-sm leading-tight">{title}</div>
                <p className="text-sm max-w-xs text-center">
                  {title === "Syfter Certified"
                    ? "Screened for resilience, communication, and excellence."
                    : title === "AI-Proofed"
                    ? "Human-reviewed to avoid automation blind spots."
                    : title === "Fast Hiring"
                    ? "Reduce time-to-hire to under 5 days."
                    : "We don’t fill seats — we grow teams."}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section id="trusted" className="py-24 px-6 text-center text-white" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.6 }} viewport={{ once: true, amount: 0.4 }} ref={countersRef}>
          <h2 className="text-5xl font-bold mb-16 underline decoration-[#69bdff]">Trusted Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
            {[
              { target: 128, label: "hires placed" },
              { target: 5, label: "avg. fill time (days)" },
              { target: 98, label: "retention rate", suffix: "%" },
            ].map((stat, i) => (
              <motion.div key={i} className="flex flex-col items-center justify-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: i * 0.6 }} viewport={{ once: true }}>
                <div className="text-5xl font-extrabold mb-3">
                  {counts[i]}{stat.suffix || ""}
                </div>
                <p className="text-md font-medium">{stat.label}</p>
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
        
            {/* Executive Team */}
<motion.section id="exec" className="py-20 text-center bg-[#28303b]" {...fadeInMotion}>
  <h2 className="text-5xl font-bold mb-14 underline decoration-[#69bdff]">Executive Team</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-4xl mx-auto">
    {[
      { name: "Steven Perlman", title: "CEO", img: "/team/steve.jpg" },
      { name: "Matt Hall", title: "CRO", img: "/team/matt.jpg" },
      { name: "Nikka Winchell", title: "CRO", img: "/team/nikka.jpg" },
      { name: "Ira Plutner", title: "CFO", img: "/team/ira.jpg" },
    ].map((member, i) => (
      <motion.div
        key={i}
        className="w-48 h-48 flip-card mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="flip-card-inner w-full h-full rounded-full shadow-lg">
          {/* Front Face with Image */}
          <div
            className="flip-card-front rounded-full"
            style={{
              backgroundImage: `url(${member.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Back Face with Info */}
          <div className="flip-card-back rounded-full text-black">
            <div className="text-base font-bold">{member.name}</div>
            <div className="text-sm font-medium">{member.title}</div>
          </div>
        </div>
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
