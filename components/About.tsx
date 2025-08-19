"use client";

import { motion, Variants } from "framer-motion";

interface ContentChild {
  text: string;
}
interface ContentBlock {
  type: string;
  children: ContentChild[];
}
interface AboutData {
  id: number | string;
  Title: string;
  Content: ContentBlock[];
}

interface AboutProps {
  aboutData?: AboutData[];
  eyebrow?: string; // optional small label above title
}

// ---- Animation helpers (smooth + consistent)
const easeOutExpo = [0.22, 1, 0.36, 1] as const;
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, when: "beforeChildren" },
  },
};
const fadeSlide = (dir: "left" | "right" = "left"): Variants => ({
  hidden: { opacity: 0, x: dir === "left" ? -32 : 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOutExpo } },
});
const growBar: Variants = {
  hidden: { opacity: 0, scaleY: 0, transformOrigin: "top" },
  show: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.6, ease: easeOutExpo, delay: 0.05 },
  },
};

function extractPlainText(blocks?: ContentBlock[]): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((b) =>
      Array.isArray(b?.children)
        ? b.children.map((c) => c?.text ?? "").join(" ")
        : ""
    )
    .filter(Boolean)
    .join("\n\n");
}

export default function About({ aboutData = [], eyebrow }: AboutProps) {
  if (!aboutData?.length) return null;

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-100 via-white to-white px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {aboutData.map((section, index) => {
          const reverse = index % 2 === 1;
          const text = extractPlainText(section.Content);
          const headingId = `about-${section.id}`;

          return (
            <motion.section
              key={section.id}
              aria-labelledby={headingId}
              className={`grid grid-cols-1 lg:grid-cols-12 items-start gap-8 md:gap-10 pb-20 md:pb-28 ${
                reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.45 }}
              variants={container}
            >
              {/* Title block */}
              <div className="lg:col-span-5">
                {eyebrow && (
                  <motion.span
                    variants={fadeSlide(reverse ? "right" : "left")}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-900/10"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500/60" />
                    {eyebrow}
                  </motion.span>
                )}

                <motion.h2
                  id={headingId}
                  className="mt-3 text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-darkBlue"
                  variants={fadeSlide(reverse ? "right" : "left")}
                >
                  {section.Title}
                </motion.h2>
              </div>

              {/* Accent bar */}
              <motion.span
                aria-hidden
                className="hidden lg:block lg:col-span-1 h-24 w-px bg-gradient-to-b from-blue-900 via-blue-700 to-cyan-500 rounded-full"
                variants={growBar}
              />

              {/* Content block */}
              <motion.div
                className="lg:col-span-6"
                variants={fadeSlide(reverse ? "left" : "right")}
              >
                <p className="text-lg md:text-2xl leading-relaxed text-slate-800 text-justify">
                  {text}
                </p>
              </motion.div>
            </motion.section>
          );
        })}
      </div>
    </section>
  );
}
