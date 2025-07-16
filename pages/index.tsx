// pages/index.tsx
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

      <main className="pt-20 bg-gradient-to-b from-[#0f172a] via-[#1e3a5f] to-[#2d3e50] text-white transition-all duration-1000">

        {/* Hero */}
        <section className="relative h-[600px] overflow-hidden bg-black text-white">
          <BinaryRain />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
            <h1 className="text-5xl font-bold mb-4">
              Hire <span className="italic text-syfterBlue">{displayText}</span>
            </h1>
            <p className="text-lg mb-8">Syfter Certified talent delivered faster, smarter, better.</p>
            <div className="flex justify-center gap-6">
              <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200">Find Talent</button>
              <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200">Find Jobs</button>
            </div>
          </div>
        </section>

       {/* Why Syfter */}
<section
  id="why"
  className="pt-12 pb-10 bg-[#1e3a5f] -mt-1 z-10 relative text-center text-white"
>
  {/* Top gradient overlay to blend with BinaryRain */}
  <div
    className="absolute top-0 left-0 w-full h-16 pointer-events-none z-10"
    style={{
      background:
        "linear-gradient(to bottom, #1e3a5f 0%, rgba(30,58,95,0.85) 40%, rgba(30,58,95,0.6) 100%)",
    }}
  />

  <h2 className="text-5xl font-bold mb-14">Why Syfter</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
    <div>
      <h4 className="text-xl font-semibold mb-2">Syfter Certified</h4>
      <p className="text-sm">
        Screened for resilience, communication, and excellence.
      </p>
    </div>
    <div>
      <h4 className="text-xl font-semibold mb-2">AI-Proofed</h4>
      <p className="text-sm">
        Human-reviewed to avoid automation blind spots.
      </p>
    </div>
    <div>
      <h4 className="text-xl font-semibold mb-2">Fast Hiring</h4>
      <p className="text-sm">Reduce time-to-hire to under 5 days.</p>
    </div>
    <div>
      <h4 className="text-xl font-semibold mb-2">People First</h4>
      <p className="text-sm">We don’t fill seats — we grow teams.</p>
    </div>
  </div>
</section>


        {/* Stats */}
        <section className="py-20 text-center px-6 fade-in transition-opacity duration-1000">
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
        <section id="jobs" className="py-20 px-6 fade-in transition-opacity duration-1000">
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
        </section>

        {/* Testimonials */}
        <section className="bg-[#1e3a5f] py-20 text-center px-6 fade-in transition-opacity duration-1000">
          <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
          <blockquote className="italic text-lg max-w-2xl mx-auto">
            {testimonials[activeTestimonial]}
          </blockquote>
        </section>

        {/* Footer */}
        <section
          className="relative text-white text-center py-20 bg-cover bg-center fade-in transition-opacity duration-1000"
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
