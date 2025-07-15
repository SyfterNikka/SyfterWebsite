import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Syfter - Hire Talent or Find Work</title>
      </Head>

      <main className="font-sans text-gray-800">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 text-center md:text-left">
            <div>
              <h1 className="text-4xl font-bold mb-4">Looking to Hire?</h1>
              <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200 transition">
                Find Talent
              </button>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4">Looking for Work?</h1>
              <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200 transition">
                Find Jobs
              </button>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="bg-white py-12">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center gap-10 px-6">
            <div>
              <div className="text-4xl mb-2">✅</div>
              <h3 className="text-lg font-semibold">Syfter Certified</h3>
              <p className="text-sm mt-1">
                Human, Excellence<br />
                Adaptability, Resilience,<br />
                Togetherness.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">🤖</div>
              <h3 className="text-lg font-semibold">AI-Proofed Talent</h3>
              <p className="text-sm mt-1">Expert-vetted by humans</p>
            </div>
            <div>
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="text-lg font-semibold">Fast Hiring Process</h3>
              <p className="text-sm mt-1">Speed + quality = win</p>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-12 px-6 text-center bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <blockquote className="italic text-xl">
              “Syfter was instrumental in finding top notch candidates for our team. Highly recommend!”
            </blockquote>
            <p className="mt-4 text-sm text-gray-600">— Client Name</p>
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="py-12 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Featured Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Frontend Developer", location: "New York, NV", type: "Full-Time" },
                { title: "Product Manager", location: "Chicago, IL", type: "Contract" },
                { title: "IT Project Manager", location: "Chicago, IL", type: "Contract" },
                { title: "Data Analyst", location: "Stousburg, L", type: "Full-Time" },
              ].map((job, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4 border">
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.location} • {job.type}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t py-6 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:opacity-70">🐦</a>
            <a href="#" className="hover:opacity-70">💼</a>
            <a href="#" className="hover:opacity-70">📘</a>
          </div>
          <form className="flex flex-col sm:flex-row items-center gap-2">
            <label htmlFor="email" className="text-sm">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="Email address"
              className="border rounded px-3 py-2 text-sm"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Submit
            </button>
          </form>
        </footer>
      </main>
    </>
  );
}