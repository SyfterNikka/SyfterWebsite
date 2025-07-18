"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import BinaryRain from "@/components/BinaryRain";
import { easeInOutCubic } from "@/lib/easing";

const fadeInMotion = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: easeInOutCubic },
  viewport: { once: true },
};

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollTop = window.scrollY;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          section.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #3e4e5e, #28303b)",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Hero */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center text-white bg-transparent">
        <BinaryRain />
        <div className="z-10">
          <h1 className="text-6xl font-bold mb-6">Hire</h1>
          <p className="text-xl mb-8">
            Syfter Certified talent delivered faster, smarter, better.
          </p>
          <div className="flex justify-center space-x-6">
            <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg shadow">
              Find Talent
            </button>
            <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg shadow">
              Find Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Why Syfter */}
      <motion.section
        id="whysyfter"
        className="pt-20 pb-10 text-center bg-transparent"
        {...fadeInMotion}
      >
        <h2 className="text-5xl font-bold mb-14 text-white">Why Syfter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto text-white">
          {[
            {
              title: "Syfter Certified",
              text: "Screened for resilience, communication, and excellence.",
            },
            {
              title: "AI-Proofed",
              text: "Human-reviewed to avoid automation blind spots.",
            },
            {
              title: "Fast Hiring",
              text: "Reduce time-to-hire to under 5 days.",
            },
            {
              title: "People First",
              text: "We don’t fill seats — we grow teams.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
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
      <motion.section className="py-20 text-center text-white bg-transparent" {...fadeInMotion}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <div>
            <p className="text-5xl font-bold mb-2">128</p>
            <p className="text-lg">hires placed</p>
          </div>
          <div>
            <p className="text-5xl font-bold mb-2">5</p>
            <p className="text-lg">avg. fill time (days)</p>
          </div>
          <div>
            <p className="text-5xl font-bold mb-2">98%</p>
            <p className="text-lg">retention rate</p>
          </div>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section className="py-20 text-center text-white bg-transparent" {...fadeInMotion}>
        <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Ready to build your dream team? Reach out and let’s get started.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow">
          Get In Touch
        </button>
      </motion.section>
    </div>
  );
}
