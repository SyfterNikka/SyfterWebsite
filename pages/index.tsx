import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).CountUp) {
      const { CountUp } = (window as any);

      const counters = [
        { id: "counter1", end: 3000 },
        { id: "counter2", end: 250 },
        { id: "counter3", end: 98, suffix: "%" },
      ];

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              counters.forEach(({ id, end, suffix }) => {
                const el = document.getElementById(id);
                if (el && !el.classList.contains("counted")) {
                  const countUp = new CountUp(id, end, {
                    suffix: suffix || "",
                    duration: 2,
                  });
                  if (!countUp.error) {
                    countUp.start();
                    el.classList.add("counted");
                  }
                }
              });
              observer.disconnect();
            }
          });
        },
        { threshold: 0.6 }
      );

      const targetSection = document.getElementById("stats-section");
      if (targetSection) observer.observe(targetSection);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Syfter — Precision Staffing Made Human</title>
      </Head>

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

        {/* Stats Section with CountUp */}
        <section id="stats-section" className="bg-gray-100 py-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center gap-10">
            <div>
              <p id="counter1" className="text-5xl font-bold text-blue-600">0</p>
              <p className="text-lg mt-2">Candidates Placed</p>
            </div>
            <div>
              <p id="counter2" className="text-5xl font-bold text-blue-600">0</p>
              <p className="text-lg mt-2">Companies Served</p>
            </div>
            <div>
              <p id="counter3" className="text-5xl font-bold text-blue-600">0%</p>
              <p className="text-lg mt-2">Client Satisfaction</p>
            </div>
          </div>
        </section>

        {/* Placeholder for rest of your homepage */}
        <section className="py-16 text-center">
          <p className="text-gray-400 italic">[Continue building your homepage below]</p>
        </section>

      </main>
    </>
  );
}
