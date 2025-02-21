"use client";

import Image from "next/image";
import React from "react";

interface InlineNode {
  type?: string;
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  url?: string;
  children?: InlineNode[];
}

interface ContentBlock {
  type: string;
  level?: number;
  format?: string;
  children: InlineNode[];
}

interface Blog {
  Title: string;
  Introduction: ContentBlock[];
  Date: string;
  Content: ContentBlock[];
  Gallery?: { url: string }[];
}

// Fonction pour formater le texte (gras, italique, souligné, lien)
function renderInline(child: InlineNode, idx: number): React.ReactNode {
  if (child.type === "link") {
    return (
      <a
        key={idx}
        href={child.url}
        target="_blank"
        className="text-lightBlue underline"
      >
        {child.children?.map((c, i) => renderInline(c, i))}
      </a>
    );
  }

  let content: React.ReactNode = child.text;
  if (child.bold) content = <strong key={idx}>{content}</strong>;
  if (child.italic) content = <em key={idx}>{content}</em>;
  if (child.underline) content = <u key={idx}>{content}</u>;

  return content;
}

function renderInlineNodes(children: InlineNode[]): React.ReactNode {
  return children.map((child, idx) => renderInline(child, idx));
}

// Fonction pour afficher l'Introduction et le Content
function renderContent(blocks: ContentBlock[]) {
  return blocks.map((block, index) => {
    // Gestion des titres h1-h6
    if (block.type === "heading") {
      const level = block.level || 1;
      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
      const headingClass =
        level === 1
          ? "text-5xl"
          : level === 2
          ? "text-4xl"
          : level === 3
          ? "text-3xl"
          : "text-2xl";
      return (
        <HeadingTag
          key={index}
          className={`mt-16 mb-4 font-semibold text-gray-900 ${headingClass}`}
        >
          {renderInlineNodes(block.children)}
        </HeadingTag>
      );
    }

    // Gestion des paragraphes
    if (block.type === "paragraph") {
      return (
        <p key={index} className="text-lg leading-relaxed mb-4 text-gray-700">
          {renderInlineNodes(block.children)}
        </p>
      );
    }

    // Gestion des citations
    if (block.type === "quote") {
      return (
        <blockquote
          key={index}
          className="border-l-4 border-gray-500 pl-4 italic text-gray-600 mb-4"
        >
          {renderInlineNodes(block.children)}
        </blockquote>
      );
    }

    // Gestion des listes
    if (block.type === "list") {
      if (block.format === "unordered") {
        return (
          <ul key={index} className="list-disc list-inside mb-4">
            {block.children.map((item, itemIdx) => (
              <li key={itemIdx} className="text-lg text-gray-700">
                {item.children && renderInlineNodes(item.children)}
              </li>
            ))}
          </ul>
        );
      }
      if (block.format === "ordered") {
        return (
          <ol key={index} className="list-decimal list-inside mb-4">
            {block.children.map((item, itemIdx) => (
              <li key={itemIdx} className="text-lg text-gray-700">
                {item.children && renderInlineNodes(item.children)}
              </li>
            ))}
          </ol>
        );
      }
    }

    return null;
  });
}

export default function BlogItem({ blog }: { blog: Blog }) {
  if (!blog) return <p className="text-center">Article non trouvé.</p>;

  return (
    <article className="max-w-6xl mx-auto flex flex-col pt-16 md:pt-24 pb-56 px-8">
      {/* Titre et introduction en pleine largeur */}
      <div className="w-full max-w-6xl">
        <p className="text-gray-600 py-5">
          {new Date(blog.Date).toLocaleDateString()}
        </p>
        <h1 className="text-6xl md:text-7xl font-bold mb-12 text-gray-900">
          {blog.Title}
        </h1>
        {renderContent(blog.Introduction)}
      </div>

      {/* Contenu principal avec texte à gauche et images à droite */}
      <div className="flex flex-col lg:flex-row mt-16 lg:mt-28">
        {/* Texte en 2/3 */}
        <div className="w-full lg:w-7/12">{renderContent(blog.Content)}</div>

        {/* Images en 1/3 avec effet cascade en **2 colonnes** */}
        {blog.Gallery && blog.Gallery.length > 0 && (
          <div className="w-full lg:w-5/12 pl-0 lg:pl-10 hidden lg:block">
            <div className="flex gap-4">
              {/* Colonne 1 */}
              <div className="flex flex-col gap-6">
                {blog.Gallery.filter((_, index) => index % 2 === 0).map(
                  (image, index) => (
                    <div
                      key={index}
                      className={`relative w-48 h-72 overflow-hidden rounded-lg shadow-sm border ${
                        index === 0 ? "mt-36" : "mt-0"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`Image ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                        unoptimized
                      />
                    </div>
                  )
                )}
              </div>

              {/* Colonne 2 */}
              <div className="flex flex-col gap-6">
                {blog.Gallery.filter((_, index) => index % 2 !== 0).map(
                  (image, index) => (
                    <div
                      key={index}
                      className="relative w-48 h-72 overflow-hidden rounded-lg shadow-sm border"
                    >
                      <Image
                        src={image.url}
                        alt={`Image ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                        unoptimized
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Images en 1/3 avec effet cascade et alignement horizontal en `lg` */}
        {blog.Gallery && blog.Gallery.length > 0 && (
          <div className="w-full hidden sm:block lg:hidden pt-16">
            <div className="flex flex-wrap gap-x-6 gap-y-6 justify-center lg:justify-start">
              {blog.Gallery.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-48 h-72 overflow-hidden rounded-lg shadow-sm border ${
                    index === 0 ? "mt-0" : ""
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={`Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
