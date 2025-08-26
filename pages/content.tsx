// pages/content.tsx
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ---------- Small layout helpers (local copy so this file is standalone) ---------- */

function SectionWrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6">{children}</div>;
}

function TypingSectionTitle({ text }: { text: string }) {
  // light, one-time “type” effect
  const [chars, setChars] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (chars >= text.length) return;
    const t = setTimeout(() => setChars((c) => c + 1), 55);
    return () => clearTimeout(t);
  }, [started, chars, text.length]);

  return (
    <div ref={ref} className="mx-auto max-w-7xl pl-2 pr-6">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-left">
        <span aria-label={text}>{text.slice(0, chars)}</span>
        <span className="inline-block w-[0.55ch] border-r-2 border-white/80 ml-[1px] align-middle animate-pulse" />
      </h1>
      <motion.div
        className="h-[3px] w-24 bg-[#69bdff] rounded-full mt-3"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={started ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

/* --------------------------------- Posts data --------------------------------- */
/* Replace image paths with your uploads under /public/blog/... and update hrefs when you add individual pages. */
type Post = {
  title: string;
  href: string;        // internal like '/blog/slug' or external 'https://...'
  image: string;       // e.g. '/blog/remote-ops.jpg'
  excerpt?: string;
  date?: string;       // 'YYYY-MM-DD'
  tags?: string[];
  author?: string;
};

const posts: Post[] = [
  {
    title: "Remote Hiring Is Not About Location. It’s About How You Operate.",
    href: "/blog/remote-hiring-ops",
    image: "/blog/BLOG1.avif",
    excerpt: "Remote isn’t just a location strategy — it’s an operating model.",
    date: "2025-05-19",
    tags: ["Remote", "Process"],
    author: "Steve Perlman",
  },
  {
    title: "Why Location-Based Sourcing Beats Nationwide Job Boards in Remote Tech Hiring",
    href: "/blog/location-based-sourcing",
    image: "/blog/BLOG2.avif",
    excerpt: "Precision over volume: how location focus wins in remote hiring.",
    date: "2025-05-12",
    tags: ["Strategy", "Remote"],
    author: "Steve Perlman",
  },
  {
    title: "When Candidates Ghost: A Guide to Fixing Your Hiring Process",
    href: "/blog/candidates-ghosting",
    image: "/blog/BLOG3.avif",
    excerpt: "Ghosting is feedback. Here’s how to fix the process signals causing it.",
    date: "2025-05-05",
    tags: ["Process", "Experience"],
    author: "Steve Perlman",
  },
  {
    title: "How to Win at Remote Tech Hiring in 2025: Why Location Strategy Still Matters",
    href: "/blog/remote-tech-hiring-2025",
    image: "/blog/BLOG4.avif",
    excerpt: "Remote doesn’t erase geography — it amplifies it.",
    date: "2025-04-28",
    tags: ["Strategy", "Compensation"],
    author: "Steve Perlman",
  },
];

/* --------------------------------- Card --------------------------------- */

function BlogCard({ post, idx }: { post: Post; idx: number }) {
  const Content = (
    <div className="group">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-white/5">
        {/* Cover image */}
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          priority={idx < 2}
        />
        {/* Subtle overlay for legibility on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="mt-4">
        <div className="text-sm text-white/60 flex items-center gap-2">
          {post.date && (
            <span>{new Date(post.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
          )}
          {post.author && (
            <>
              <span className="opacity-40">•</span>
              <span>{post.author}</span>
            </>
          )}
          {post.tags && post.tags.length > 0 && (
            <>
              <span className="opacity-40">•</span>
              <ul className="flex gap-2">
                {post.tags.map((t) => (
                  <li key={t} className="uppercase tracking-wider text-[10px] text-white/60">
                    {t}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <h2 className="mt-1 text-xl font-semibold leading-snug">{post.title}</h2>
        {post.excerpt && <p className="mt-2 text-white/80 leading-relaxed">{post.excerpt}</p>}

        <div className="mt-3 inline-flex items-center gap-2 text-[#69bdff] text-sm">
          Read more
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </div>
      </div>
    </div>
  );

  const isExternal = post.href.startsWith("http");
  return isExternal ? (
    <a href={post.href} target="_blank" rel="noreferrer" className="block">
      {Content}
    </a>
  ) : (
    <Link href={post.href} className="block">
      {Content}
    </Link>
  );
}

/* ---------------------------------- Page ---------------------------------- */

export default function ContentPage() {
  return (
    <>
      <Head>
        <title>Insights — Syfter</title>
        <meta name="description" content="Syfter content: hiring playbooks, remote strategy, and recruiting insights." />
      </Head>

      <main
        className="min-h-screen text-white"
        style={{ background: "linear-gradient(to bottom, #3e4e5e 0%, #28303b 100%)" }}
      >
        {/* Simple top spacing (header on your homepage is fixed) */}
        <div className="h-12" />

        <section className="py-24">
          <TypingSectionTitle text="Insights" />
          <SectionWrap>
            {/* Optional intro blurb */}
            <p className="mt-6 max-w-3xl text-white/80 leading-relaxed">
              Playbooks, frameworks, and tactics from the Syfter team on building elite hiring engines.
            </p>

            {/* Grid of posts */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.04 }}
                >
                  <BlogCard post={p} idx={i} />
                </motion.div>
              ))}
            </div>

            {/* Optional: back link or CTA */}
            <div className="mt-12 text-center">
              <Link href="/" className="text-sm text-white/80 hover:text-white transition-colors">
                ← Back to home
              </Link>
            </div>
          </SectionWrap>
        </section>
      </main>
    </>
  );
}
