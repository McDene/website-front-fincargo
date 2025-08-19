"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface TextSection {
  id: number | string;
  Title: string;
  Paragraph: string;
}
interface GalleryImage {
  id: number | string;
  url: string;
  alternativeText?: string;
}
interface PartnerData {
  MultipleText: TextSection[];
  Gallery: GalleryImage[];
}

export default function Partner({ partnerData }: { partnerData: PartnerData }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

  // Animations
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
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: easeOutExpo },
    },
  });
  const growBar: Variants = {
    hidden: { opacity: 0, scaleY: 0, transformOrigin: "top" },
    show: {
      opacity: 1,
      scaleY: 1,
      transition: { duration: 0.6, ease: easeOutExpo, delay: 0.05 },
    },
  };

  const normalizeUrl = (url: string) =>
    url?.startsWith("http") ? url : `${API_URL}${url}`;
  const logos = [
    ...(partnerData.Gallery || []),
    ...(partnerData.Gallery || []),
  ];

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-100 via-white to-white px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {(partnerData.MultipleText || []).map((section, index) => {
          const reverse = index % 2 === 1;
          const headingId = `partner-${section.id}`;
          return (
            <motion.section
              key={section.id}
              aria-labelledby={headingId}
              className="grid grid-cols-1 lg:grid-cols-12 items-start gap-8 md:gap-10 pb-20 md:pb-28"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.45 }}
              variants={container}
            >
              {/* Titre — order contrôlé */}
              <div
                className={`lg:col-span-5 ${
                  reverse ? "lg:order-3" : "lg:order-1"
                }`}
              >
                <motion.h2
                  id={headingId}
                  className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-darkBlue"
                  variants={fadeSlide(reverse ? "right" : "left")}
                >
                  {section.Title}
                </motion.h2>
              </div>

              {/* Barre dégradée — TOUJOURS 2ᵉ */}
              <motion.span
                aria-hidden
                className="hidden lg:block lg:col-span-1 lg:order-2 h-24 w-px bg-gradient-to-b from-blue-900 via-blue-700 to-cyan-500 rounded-full"
                variants={growBar}
              />

              {/* Contenu — order contrôlé */}
              <motion.div
                className={`lg:col-span-6 ${
                  reverse ? "lg:order-1" : "lg:order-3"
                }`}
                variants={fadeSlide(reverse ? "left" : "right")}
              >
                <ReactMarkdown
                  components={{
                    p: (props) => (
                      <p
                        className="text-lg md:text-2xl leading-relaxed text-slate-800 text-justify mb-4"
                        {...props}
                      />
                    ),
                    ul: (props) => (
                      <ul
                        className="list-disc pl-6 space-y-1 text-lg text-slate-800"
                        {...props}
                      />
                    ),
                    li: (props) => <li className="leading-7" {...props} />,
                    a: (props) => (
                      <a
                        className="underline decoration-dotted text-blue-700 hover:text-blue-800"
                        {...props}
                      />
                    ),
                  }}
                >
                  {section.Paragraph}
                </ReactMarkdown>
              </motion.div>
            </motion.section>
          );
        })}
      </div>

      {/* Marquee logos (inarrêtable) */}
      {!!(partnerData.Gallery || []).length && (
        <div className="relative mt-6 md:mt-2 select-none">
          <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" />
          <div
            className="overflow-hidden py-8 md:py-10 bg-white/70 backdrop-blur-sm ring-slate-900/5"
            aria-label="Partner logos carousel"
            role="region"
          >
            <motion.div
              className="flex gap-10 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 28, repeat: Infinity }}
            >
              {logos.map((image, idx) => (
                <div
                  key={`${image.id}-${idx}`}
                  className="flex items-center justify-center h-16 md:h-20 w-[160px] md:w-[200px]"
                >
                  <Image
                    src={normalizeUrl(image.url)}
                    alt={image.alternativeText || "Partner logo"}
                    width={200}
                    height={80}
                    className="h-12 md:h-14 w-auto object-contain opacity-80 hover:opacity-100 transition ease-linear duration-150 grayscale hover:grayscale-0"
                    draggable={false}
                    unoptimized
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
