"use client";

import { motion } from "framer-motion";
import BlockRendererClient from "@/components/BlockRendererClient";

interface TextChild {
  text: string;
  type: string;
}

interface Paragraph {
  type: string;
  children: TextChild[];
}

interface TextSection {
  id: number;
  Title: string;
  Paragraph: Paragraph[];
}

interface InvestorData {
  MultipleText: TextSection[];
}

interface InvestorProps {
  investorData: InvestorData;
}

const fadeInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const fadeInFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function Investor({ investorData }: InvestorProps) {
  return (
    <section className="pt-24 md:pt-32 bg-gradient-to-b from-gray-300 to-white px-8">
      <div className="max-w-7xl mx-auto">
        {investorData.MultipleText.map((section, index) => (
          <motion.div
            key={section.id}
            className={`flex flex-col lg:flex-row md:items-center pb-24 md:pb-32 gap-8 ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h2
              className="text-5xl md:text-6xl hidden md:block text-darkBlue font-semibold uppercase tracking-wide"
              variants={index % 2 === 0 ? fadeInFromLeft : fadeInFromRight}
            >
              {section.Title}
            </motion.h2>
            <motion.h2 className="text-5xl md:text-7xl text-darkBlue font-semibold uppercase tracking-wide md:hidden">
              {section.Title}
            </motion.h2>
            <motion.span
              className="border-l-4 border-blue-950 h-32 hidden lg:block mx-8"
              variants={{
                hidden: { scaleY: 0 },
                visible: { scaleY: 1, transition: { duration: 0.5 } },
              }}
            ></motion.span>
            <motion.div
              className="text-xl-children-desktop hidden md:block "
              variants={index % 2 === 0 ? fadeInFromRight : fadeInFromLeft}
            >
              <BlockRendererClient content={section.Paragraph} />
            </motion.div>
            <motion.div className="text-xl-children-mobile md:hidden">
              <BlockRendererClient content={section.Paragraph} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
