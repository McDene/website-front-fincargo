"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface TextSection {
  id: number;
  Title: string;
  Paragraph: string;
}

interface EsgPolicyProps {
  esgPolicyData: {
    id: number;
    documentId: string;
    MultipleText: TextSection[];
  };
}

const parallaxVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function EsgPolicy({ esgPolicyData }: EsgPolicyProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-white">
      {/* Brand glows background */}
      <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen">
        <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_10%_-10%,rgba(103,232,249,0.10),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(191,219,254,0.10),transparent)]" />
      </div>

      {/* Subtle parallax logo watermark */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: scrollY * 0.08 }}>
        <Image
          src="/logo/logo_fincargo_blue.svg"
          alt="Fincargo watermark"
          fill
          className="object-cover opacity-5"
          priority={false}
        />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {esgPolicyData.MultipleText.map((section, index) => (
          <Section
            key={section.id}
            title={section.Title}
            paragraph={section.Paragraph}
            delay={index * 0.08}
          />
        ))}
      </div>
    </section>
  );
}

interface SectionProps {
  title: string;
  paragraph: string;
  delay: number;
}

function Section({ title, paragraph, delay }: SectionProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={parallaxVariants}
      transition={{ duration: 0.55, delay }}
      className="mx-auto pb-16 md:pb-20 flex flex-col gap-5"
    >
      <div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-slate-900">
          {title}
        </h2>
        <span className="mt-3 block h-1.5 w-16 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400" />
      </div>
      <ReactMarkdown className="prose prose-slate max-w-none text-slate-700 md:prose-lg leading-relaxed">
        {paragraph}
      </ReactMarkdown>
    </motion.div>
  );
}
