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
        paragraph: ({ children }) => (
          <p className="text-lg leading-relaxed my-4 whitespace-pre-line">
            {children}
          </p>
        ),

        heading: ({ level, children }) => {
          const Tag = `h${level}` as keyof JSX.IntrinsicElements;
          const textSize = `text-${Math.max(5 - level, 2)}xl`;
          return (
            <Tag className={`${textSize} font-semibold my-6`}>{children}</Tag>
          );
        },
        list: ({ format, children }) => {
          const ListTag = format === "unordered" ? "ul" : "ol";
          return (
            <ListTag className="list-inside list-disc my-4 ml-5 text-lg leading-relaxed">
              {children}
            </ListTag>
          );
        },
        "list-item": ({ children }) => <li className="my-2">{children}</li>,
        link: ({ url, children }) => (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lightBlue "
          >
            {children}
          </a>
        ),
      }}
    />
  );
}
