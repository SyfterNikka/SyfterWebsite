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

  // Counter animation on scroll
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
            const { end, suffix } = counters.find(c => c.id === el.id)!;
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

        {/* Hero */}
        <section
          className="text-white text-center py-40 bg-cover bg-center relative"
          style={{
            backgroundImage: "url('/HeroImage1.png')",
            backgroundPosition: "center 40%",
          }}
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
        <section id="why" className="py-20 bg-white px-6 text-center">  
        <h2 className="text-5xl font-bold mb-6 text-gray-900">Why Syfter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Syfter Certified</h4>
              <p className="text-sm text-gray-600">Screened for resilience, communication, and excellence.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">AI-Proofed</h4>
              <p className="text-sm text-gray-600">Human-reviewed to avoid automation blind spots.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Fast Hiring</h4>
              <p className="text-sm text-gray-600">Reduce time-to-hire to under 5 days.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">People First</h4>
              <p className="text-sm text-gray-600">We don’t fill seats — we grow teams.</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gray-100 py-16 text-center px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto text-gray-800">
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
        <section id="jobs" className="py-16 px-6 bg-white">
          <h2 className="text-2xl font-bold text-center mb-10">Featured Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Frontend Developer", loc: "NY, Full-Time" },
              { title: "Product Manager", loc: "Remote, Contract" },
              { title: "IT Project Manager", loc: "Chicago, Contract" },
              { title: "Data Analyst", loc: "Stousburg, Full-Time" },
            ].map((job, i) => (
              <div key={i} className="bg-gray-100 p-4 rounded border">
                <h4 className="font-semibold text-lg">{job.title}</h4>
                <p className="text-sm text-gray-600">{job.loc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#" className="text-blue-600 hover:underline">View All Jobs →</a>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 py-16 text-center px-6">
          <h2 className="text-2xl font-bold mb-6">What Our Clients Say</h2>
          <blockquote className="italic text-lg max-w-2xl mx-auto text-gray-700">
            {testimonials[activeTestimonial]}
          </blockquote>
        </section>

        {/* Footer with image */}
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
