import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const testimonials = [
    "“Syfter delivered top candidates in days. I was blown away.” — SaaS Hiring Manager",
    "“I've never seen recruiting move this fast. Total pros.” — Tech Startup CEO",
    "“Their candidate quality was unmatched.” — Healthcare Director",
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Rotate testimonial every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animate counter when stats section is in view
  useEffect(() => {
    const animateCount = (id: string, end: number, suffix = "") => {
  const el = document.getElementById(id);
  if (!el) return;

  let current = 0;
  const totalSteps = 60; // Animate in 60 steps (~1 second at 16ms per frame)
  const increment = end / totalSteps;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    current += increment;
    if (step >= totalSteps) {
      el.textContent = `${end}${suffix}`;
      clearInterval(timer);
    } else {
      el.textContent = `${Math.floor(current)}${suffix}`;
    }
  }, 16); // ~60fps
};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount("counter1", 1200);
            animateCount("counter2", 5);
            animateCount("counter3", 92, "%");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.6 }
    );

    const section = document.getElementById("stats-section");
    if (section) observer.observe(section);
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
        <section className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-center py-24 px-6">
          <h1 className="text-4xl font-bold mb-4">Precision Hiring. Human-Centric. AI-Vetted.</h1>
          <p className="text-lg mb-8">Syfter Certified talent delivered faster, smarter, better.</p>
          <div className="flex justify-center gap-6">
            <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200">Find Talent</button>
            <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200">Find Jobs</button>
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

        {/* Stats Section with animated counters */}
        <section id="stats-section" className="bg-gray-100 py-12 text-center px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-blue-600 font-bold text-4xl">
            <div>
              <span id="counter1">0</span>
              <p className="text-sm font-medium text-gray-700 mt-2">Hires Placed</p>
            </div>
            <div>
              <span id="counter2">0</span>
              <p className="text-sm font-medium text-gray-700 mt-2">Day Avg. Fill Time</p>
            </div>
            <div>
              <span id="counter3">0%</span>
              <p className="text-sm font-medium text-gray-700 mt-2">Retention Rate</p>
            </div>
          </div>
        </section>

        {/* Featured Jobs */}
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

        {/* CTA */}
        <section id="contact" className="bg-blue-600 text-white py-16 text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-6 text-lg">Let Syfter help you find the right match — fast.</p>
          <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded hover:bg-gray-100 transition">Get Started</button>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t py-6 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">© 2025 Syfter. All rights reserved.</div>
          <form className="flex items-center gap-2">
            <input type="email" placeholder="Email address" className="border px-3 py-2 text-sm rounded" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Subscribe</button>
          </form>
        </footer>
      </main>
    </>
  );
}
