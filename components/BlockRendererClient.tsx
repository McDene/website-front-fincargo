"use client";

import Image from "next/image";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

export default function BlockRendererClient({
  content,
}: {
  readonly content: BlocksContent;
}) {
  if (!content) return null;

  return (
    <BlocksRenderer
      content={content}
      blocks={{
        // Gestion des images avec Next.js Image
        image: ({ image }) => (
          <Image
            src={image.url}
            width={image.width}
            height={image.height}
            alt={image.alternativeText || ""}
            className="my-4"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ),
        // Gestion des paragraphes
        paragraph: ({ children }) => (
          <p className="text-lg leading-relaxed my-2">{children}</p>
        ),
        // Gestion des titres H1 à H4
        heading: ({ level, children }) => {
          const Tag = `h${level}` as keyof JSX.IntrinsicElements;
          return (
            <Tag
              className={`text-${Math.max(5 - level, 2)}xl font-semibold my-4`}
            >
              {children}
            </Tag>
          );
        },
        // Gestion des listes
        list: ({ format, children }) => {
          const ListTag = format === "unordered" ? "ul" : "ol";
          return (
            <ListTag className="list-inside list-disc my-4 ml-5 text-lg leading-relaxed">
              {children}
            </ListTag>
          );
        },
        // Utiliser "list-item" pour les éléments de liste
        "list-item": ({ children }) => <li className="my-2">{children}</li>,
        // Gestion des liens hypertexte
        link: ({ url, children }) => (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {children}
          </a>
        ),
      }}
    />
  );
}
