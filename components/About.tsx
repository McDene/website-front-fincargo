"use client";

import { motion } from "framer-motion";

const fadeInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const fadeInFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const scaleUp = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: { opacity: 1, scaleY: 1, transition: { duration: 0.5 } },
};

interface ContentChild {
  text: string;
}

interface Content {
  type: string;
  children: ContentChild[];
}

interface AboutData {
  id: number;
  Title: string;
  Content: Content[];
}

interface AboutProps {
  aboutData?: AboutData[];
}

export default function About({ aboutData = [] }: AboutProps) {
  return (
    <section className="pt-24 md:pt-32 bg-gradient-to-b from-gray-300 to-white px-8">
      <div className="max-w-7xl mx-auto">
        {Array.isArray(aboutData) && aboutData.length > 0
          ? aboutData.map((section, index) => (
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
                  className="text-5xl md:text-7xl hidden md:block text-darkBlue font-semibold uppercase tracking-wide text-center lg:text-left"
                  variants={index % 2 === 0 ? fadeInFromLeft : fadeInFromRight}
                >
                  {section.Title}
                </motion.h2>
                <motion.h2 className="text-5xl md:text-7xl text-darkBlue font-semibold uppercase tracking-wide md:hidden">
                  {section.Title}
                </motion.h2>
                <motion.span
                  className="border-l-4 border-blue-950 h-32 hidden lg:block mx-8"
                  variants={scaleUp}
                ></motion.span>
                <motion.p
                  className="text-xl md:text-2xl hidden md:block leading-relaxed text-justify"
                  variants={index % 2 === 0 ? fadeInFromRight : fadeInFromLeft}
                >
                  {section.Content[0]?.children[0]?.text || ""}
                </motion.p>
                <motion.p className="text-xl md:text-2xl leading-relaxed text-justify md:hidden">
                  {section.Content[0]?.children[0]?.text || ""}
                </motion.p>
              </motion.div>
            ))
          : null}
      </div>
    </section>
  );
}
