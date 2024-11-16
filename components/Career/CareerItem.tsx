"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface JobDescriptionChild {
  text: string;
  children?: { text: string }[];
}

interface JobDescription {
  type: string;
  level?: number;
  children: JobDescriptionChild[];
  image?: {
    url: string;
    alternativeText?: string;
  };
}

interface Job {
  Title: string;
  Location: string;
  Description: JobDescription[];
  Slug: string;
}

interface CareerItemProps {
  job: Job;
}

export default function CareerItem({ job }: CareerItemProps) {
  const customLoader = ({ src }: { src: string }) => src;

  return (
    <section
      className={cn("py-24 xl:py-32 lg:py-38 md:py-24 sm:py-20 bg-white px-4")}
    >
      <div className="max-w-7xl mx-auto">
        <div className="pb-12">
          <h1
            className={cn(
              "text-4xl md:text-7xl font-semibold uppercase mb-1 tracking-wide flex justify-center"
            )}
          >
            {job.Title}
          </h1>
        </div>
        <span className={cn("text-gray-600 text-lg flex justify-center")}>
          {job.Location}
        </span>

        <div className={cn("flex justify-center mt-8")}>
          <a
            href={`/contact`}
            rel="noopener noreferrer"
            className={cn(
              "bg-blue-950 text-white px-6 py-3 border-2 border-blue-950 rounded-full font-semibold hover:bg-blue-900 hover:border-blue-900 transition duration-300"
            )}
          >
            Postuler
          </a>
        </div>

        <div className={cn("prose prose-lg mt-16")}>
          {job.Description.map((desc, index) => {
            if (desc.type === "heading" && desc.level === 1) {
              return (
                <h2
                  key={index}
                  className={`text-3xl md:text-4xl font-semibold pt-4`}
                >
                  {desc.children[0].text}
                </h2>
              );
            } else if (desc.type === "heading" && desc.level === 2) {
              return (
                <h3
                  key={index}
                  className={`text-2xl md:text-3xl font-semibold pt-4`}
                >
                  {desc.children[0].text}
                </h3>
              );
            } else if (desc.type === "paragraph") {
              return (
                <p key={index} className="my-4">
                  {desc.children[0].text}
                </p>
              );
            } else if (desc.type === "list") {
              return (
                <ul key={index} className="list-disc ml-5 my-4">
                  {desc.children.map((item, idx) => (
                    <li key={idx}>
                      {item.children ? item.children[0].text : item.text}
                    </li>
                  ))}
                </ul>
              );
            } else if (desc.type === "image" && desc.image) {
              return (
                <Image
                  loader={customLoader}
                  key={index}
                  src={desc.image.url}
                  alt={desc.image.alternativeText || "Job related image"}
                  width={600}
                  height={600}
                  className="my-8 border rounded-3xl flex mx-auto mt-16"
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
}
