"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

interface ParagraphItem {
  type: string;
  children: Array<{ text: string; type: string }>;
}

interface TextSection {
  id: number;
  Title: string;
  Paragraph: ParagraphItem[];
}

interface EsgPolicyProps {
  esgPolicyData: {
    id: number;
    documentId: string;
    MultipleText: TextSection[];
  };
}

const parallaxVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
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
    <section className="relative py-16 md:py-28 bg-gradient-to-b from-gray-300 to-white overflow-hidden">
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          y: scrollY * 0.2,
        }}
      >
        <Image
          src="/logo/logo_fincargo_blue.svg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-10"
        />
      </motion.div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        {esgPolicyData.MultipleText.map((section, index) => {
          const combinedParagraph = section.Paragraph.map((paragraph) =>
            paragraph.children.map((child) => child.text).join(" ")
          ).join("\n");

          return (
            <Section
              key={section.id}
              title={section.Title}
              paragraph={combinedParagraph}
              delay={index * 0.2}
            />
          );
        })}
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
      transition={{ duration: 0.8, delay }}
      className="max-w-7xl mx-auto pb-20 flex flex-col gap-4"
    >
      <h2 className="text-4xl md:text-5xl text-darkBlue">{title}</h2>
      <p className="text-lg text-gray-700 leading-relaxed">{paragraph}</p>
    </motion.div>
  );
}