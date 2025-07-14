import Head from 'next/head';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Head>
        <title>Syfter | Tech Staffing Reimagined</title>
        <meta name="description" content="Syfter Certified™ — The TSA PreCheck of Hiring." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-between items-center p-6 shadow-md">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Syfter</h1>
        <nav className="space-x-6 text-sm">
          <a href="#" className="hover:text-blue-500">Hire Talent</a>
          <a href="#" className="hover:text-blue-500">Find Work</a>
          <a href="#" className="hover:text-blue-500">About</a>
          <a href="#" className="hover:text-blue-500">Contact</a>
        </nav>
      </header>

      <main className="p-10 max-w-6xl mx-auto">
        <section className="text-center py-20">
          <h2 className="text-4xl font-bold mb-6">Syfter Certified™</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            The TSA PreCheck of Hiring. Trust, speed, and AI-proofed talent—built for today's market.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-blue-500 text-white px-6 py-3 text-lg rounded-xl shadow">Hire Talent</Button>
            <Button variant="outline" className="px-6 py-3 text-lg rounded-xl">Find Work</Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center py-16">
          <div>
            <h3 className="text-xl font-semibold mb-2">Verified Candidates</h3>
            <p>AI-audited resumes and background checks.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Lightning Speed</h3>
            <p>Get matched with top talent in hours—not weeks.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Zero Risk</h3>
            <p>Our guarantee: if it’s not right, we fix it fast.</p>
          </div>
        </section>

        <section className="text-center py-16">
          <h3 className="text-2xl font-semibold mb-6">Trusted by Top Tech Teams</h3>
          <div className="flex flex-wrap justify-center gap-10 opacity-80">
            <Image src="/client-logo1.png" alt="Client 1" width={100} height={50} />
            <Image src="/client-logo2.png" alt="Client 2" width={100} height={50} />
            <Image src="/client-logo3.png" alt="Client 3" width={100} height={50} />
          </div>
        </section>

        <section className="bg-gray-100 py-16 px-8 rounded-xl mt-10">
          <h4 className="text-xl font-semibold text-center mb-4">"Syfter made hiring as easy as ordering Uber. Every candidate was on point."</h4>
          <p className="text-center text-sm">– CTO, Fintech Startup</p>
        </section>
      </main>

      <footer className="text-center text-sm text-gray-500 p-6 mt-20 border-t">
        © {new Date().getFullYear()} Syfter. All rights reserved.
      </footer>
    </div>
  );
}
