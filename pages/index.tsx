import BinaryRain from "../components/BinaryRain";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
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

  // Counter animation
  useEffect(() => {
    const animateCount = (el: HTMLElement, end: number, suffix = "") => {
      let start = 0;
      const duration = 1500;
      const startTime = performance.now();

      const step = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(progress * end);
        el.textContent = `${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const counters = [
      { id: "counter1", end: 1200, suffix: "+" },
      { id: "counter2", end: 5, suffix: " days" },
      { id: "counter3", end: 92, suffix: "%" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const { end, suffix } = counters.find((c) => c.id === el.id)!;
            animateCount(el, end, suffix);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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

  return (
    <>
      <Head>
        <title>Syfter — Precision Staffing Made Human</title>
      </Head>

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-[#0f172a] shadow-md py-4 px-6 flex justify-between items-center">
        <div className="text-xl font-bold text-syfterBlue">Syfter</div>
        <nav className="space-x-6 hidden md:flex">
          <a href="#why" className="hover:text-syfterBlue text-white">Why Syfter</a>
          <a href="#jobs" className="hover:text-syfterBlue text-white">Find Work</a>
          <a href="#hire" className="hover:text-syfterBlue text-white">Hire Talent</a>
          <a href="#contact" className="hover:text-syfterBlue text-white">Contact</a>
        </nav>
        <button className="bg-syfterBlue text-white px-4 py-2 rounded hover:bg-blue-400 text-sm">
          Get Started
        </button>
      </header>

      <main className="pt-20 bg-gradient-to-b from-[#0f172a] via-[#1e3a5f] to-[#2d3e50] text-white">

        {/* Hero */}
        <section className="relative h-[600px] overflow-hidden bg-black text-white">
          <BinaryRain />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
            <h1 className="text-5xl font-bold mb-4">
              Hire <span className="italic text-syfterBlue">{displayText}</span>
            </h1>
            <p className="text-lg mb-8">
              Syfter Certified talent delivered faster, smarter, better.
            </p>
            <div className="flex justify-center gap-6">
              <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200">
                Find Talent
              </button>
              <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200">
                Find Jobs
              </button>
            </div>
          </div>
        </section>

        {/* Why Syfter */}
<section id="why" className="pt-16 pb-12 px-6 text-center bg-[#1f2c3e]">
  <h2 className="text-5xl font-bold mb-14 text-white">Why Syfter</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto text-white">
    <div className="flex flex-col items-center">
      <svg className="w-8 h-8 text-syfterBlue mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7" />
      </svg>
      <h4 className="text-xl font-semibold mb-2">Syfter Certified</h4>
      <p className="text-sm text-gray-300">Screened for resilience, communication, and excellence.</p>
    </div>
    <div className="flex flex-col items-center">
      <svg className="w-8 h-8 text-syfterBlue mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h4 className="text-xl font-semibold mb-2">AI-Proofed</h4>
      <p className="text-sm text-gray-300">Human-reviewed to avoid automation blind spots.</p>
    </div>
    <div className="flex flex-col items-center">
      <svg className="w-8 h-8 text-syfterBlue mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
      </svg>
      <h4 className="text-xl font-semibold mb-2">Fast Hiring</h4>
      <p className="text-sm text-gray-300">Reduce time-to-hire to under 5 days.</p>
    </div>
    <div className="flex flex-col items-center">
      <svg className="w-8 h-8 text-syfterBlue mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M3 20h5v-2a4 4 0 00-3-3.87M12 12a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
      <h4 className="text-xl font-semibold mb-2">People First</h4>
      <p className="text-sm text-gray-300">We don’t fill seats — we grow teams.</p>
    </div>
  </div>
</section>

{/* Stats */}
<section className="bg-[#22354a] py-16 text-center px-6 text-white">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
    <div>
      <div id="counter1" className="text-4xl font-bold mb-2">0</div>
      <p className="text-lg font-medium">hires placed</p>
    </div>
    <div>
      <div id="counter2" className="text-4xl font-bold mb-2">0</div>
      <p className="text-lg font-medium">average fill time</p>
    </div>
    <div>
      <div id="counter3" className="text-4xl font-bold mb-2">0</div>
      <p className="text-lg font-medium">retention rate</p>
    </div>
  </div>
</section>

{/* Jobs */}
<section id="jobs" className="py-16 px-6 bg-[#253e5b] text-white">
  <h2 className="text-2xl font-bold text-center mb-10">Featured Jobs</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
    {[
      { title: "Frontend Developer", loc: "NY, Full-Time" },
      { title: "Product Manager", loc: "Remote, Contract" },
      { title: "IT Project Manager", loc: "Chicago, Contract" },
      { title: "Data Analyst", loc: "Stousburg, Full-Time" },
    ].map((job, i) => (
      <div key={i} className="bg-[#1f2c3e] p-4 rounded border border-blue-900">
        <h4 className="font-semibold text-lg">{job.title}</h4>
        <p className="text-sm text-gray-300">{job.loc}</p>
      </div>
    ))}
  </div>
  <div className="text-center mt-8">
    <a href="#" className="text-syfterBlue hover:underline">View All Jobs →</a>
  </div>
</section>

        {/* Testimonials */}
        <section className="py-16 text-center px-6">
          <h2 className="text-2xl font-bold mb-6 text-white">What Our Clients Say</h2>
          <blockquote className="italic text-lg max-w-2xl mx-auto text-gray-300">
            {testimonials[activeTestimonial]}
          </blockquote>
        </section>

        {/* Footer Image */}
        <section
          className="relative text-white text-center py-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('/FooterImage1.png')",
            backgroundPosition: "center 15%",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">Let's Build the Future of Work</h2>
            <p className="mb-6 text-lg">
              Join hundreds of companies who trust Syfter to hire smarter, faster, and with clarity.
            </p>
            <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded hover:bg-gray-100 transition">
              Contact Us
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
