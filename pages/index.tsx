import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  // Typing animation setup
  const words = ["Smarter", "Faster", "Securely", "Intuitively"];
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
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        setDisplayText(currentWord.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  // Dynamic counters
  useEffect(() => {
    const animateCount = (id: string, end: number, suffix = "") => {
      const el = document.getElementById(id);
      if (!el) return;

      let current = 0;
      const steps = 60;
      const increment = end / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          el.textContent = `${end}${suffix}`;
          clearInterval(timer);
        } else {
          el.textContent = `${Math.floor(current)}${suffix}`;
        }
      }, 16);
    };

    animateCount("counter1", 1200, "+");
    animateCount("counter2", 5, " days");
    animateCount("counter3", 92, "%");
  }, []);

  return (
    <>
      <Head>
        <title>Syfter — Precision Staffing Made Human</title>
      </Head>

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">Syfter</div>
        <nav className="space-x-6 hidden md:flex">
          <a href="#why" className="hover:text-blue-600">Why Syfter</a>
          <a href="#jobs" className="hover:text-blue-600">Find Work</a>
          <a href="#hire" className="hover:text-blue-600">Hire Talent</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">Get Started</button>
      </header>

      <main className="pt-20">

        {/* Hero Banner with Image */}
        <section
          className="text-white text-center py-40 bg-cover bg-center relative"
          style={{ backgroundImage: "url('/HeroImage1.png')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-4">
              Hire <span className="italic text-gray-300">{displayText}</span>
            </h1>
            <p className="text-lg mb-8">Syfter Certified talent delivered faster, smarter, better.</p>
            <div className="flex justify-center gap-6">
              <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200">Find Talent</button>
              <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200">Find Jobs</button>
            </div>
          </div>
        </section>

        {/* Why Syfter */}
        <section id="why" className="py-16 bg-white px-6 text-center">
          <h2 className="text-2xl font-bold mb-10">Why Syfter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div>
              <div className="text-4xl mb-2">✅</div>
              <h4 className="font-semibold">Syfter Certified</h4>
              <p className="text-sm">Screened for resilience, communication, and excellence.</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🤖</div>
              <h4 className="font-semibold">AI-Proofed</h4>
              <p className="text-sm">Human-reviewed to avoid automation blind spots.</p>
            </div>
            <div>
              <div className="text-4xl mb-2">⚡</div>
              <h4 className="font-semibold">Fast Hiring</h4>
              <p className="text-sm">Reduce time-to-hire to under 5 days.</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🌱</div>
              <h4 className="font-semibold">People First</h4>
              <p className="text-sm">We don’t fill seats — we grow teams.</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gray-100 py-12 text-center px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-blue-600 font-bold text-xl">
            <div>💼 <span id="counter1">0</span> hires placed</div>
            <div>⏱️ <span id="counter2">0</span> average fill time</div>
            <div>🔁 <span id="counter3">0</span> retention rate</div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t py-6 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">© {new Date().getFullYear()} Syfter. All rights reserved.</div>
          <form className="flex items-center gap-2">
            <input type="email" placeholder="Email address" className="border px-3 py-2 text-sm rounded" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Subscribe</button>
          </form>
        </footer>
      </main>
    </>
  );
}
