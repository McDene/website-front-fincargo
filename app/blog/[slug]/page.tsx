import BlogItem from "@/components/Blog/BlogItem";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";

export const revalidate = 3600;

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
  Tags?: string[];
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const stringish = (v: unknown): string | undefined =>
  typeof v === "string" && v ? v : undefined;

const extractTagLabels = (rec: Record<string, unknown>): string[] => {
  const out: string[] = [];
  const push = (s?: string) => {
    const v = (s || "").trim();
    if (!v) return;
    if (!out.includes(v)) out.push(v);
  };
  const candidates: unknown[] = [];
  const tagsField = rec["tags"] as unknown;
  if (Array.isArray(tagsField)) candidates.push(...tagsField);
  if (isRecord(tagsField) && Array.isArray((tagsField["data"] as unknown[]))) {
    candidates.push(...((tagsField["data"] as unknown[]) || []));
  }
  const attr = rec["attributes"] as unknown;
  if (isRecord(attr)) {
    const atags = attr["tags"] as unknown;
    if (isRecord(atags) && Array.isArray((atags["data"] as unknown[]))) {
      candidates.push(...((atags["data"] as unknown[]) || []));
    }
  }
  for (const t of candidates) {
    if (!isRecord(t)) continue;
    const a = isRecord(t["attributes"]) ? (t["attributes"] as Record<string, unknown>) : {};
    push(stringish(t["tag"]));
    push(stringish(a["tag"]));
    push(stringish(t["name"]));
    push(stringish(a["name"]));
  }
  return out;
};

async function getBlog(slug: string): Promise<Blog | null> {
  const response = await fetchAPI(
    `/api/blogs?filters[Slug][$eq]=${slug}&populate=*`,
    "en"
  );
  if (Array.isArray(response?.data) && response.data.length > 0) {
    const fetchedBlog = response.data[0] as unknown;
    if (!isRecord(fetchedBlog)) return null;
    const blog: Blog = {
      Title: String(fetchedBlog.Title ?? ""),
      Introduction: Array.isArray((fetchedBlog as Record<string, unknown>).Introduction)
        ? ((fetchedBlog as Record<string, unknown>).Introduction as ContentBlock[])
        : [],
      Date: String(fetchedBlog.Date ?? ""),
      Content: Array.isArray((fetchedBlog as Record<string, unknown>).Content)
        ? ((fetchedBlog as Record<string, unknown>).Content as ContentBlock[])
        : [],
      Gallery: (isRecord((fetchedBlog as Record<string, unknown>).Gallery) ||
        Array.isArray((fetchedBlog as Record<string, unknown>).Gallery))
        ? ((fetchedBlog as Record<string, unknown>).Gallery as { url: string }[])
        : [],
      Tags: extractTagLabels(fetchedBlog as Record<string, unknown>),
    };
    return blog;
  }
  return null;
}

export default async function BlogIdPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  return (
    <>
      {blog ? <BlogItem blog={blog} /> : <p className="text-center">Article non trouvé.</p>}
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  // Try to pre-render known slugs; fall back gracefully when API is offline
  const res = await fetchAPI(
    "/api/blogs?pagination[pageSize]=100&fields=Slug",
    "en"
  );
  type HasSlug = { Slug?: string };
  const slugs: string[] = Array.isArray(res?.data)
    ? (res.data as HasSlug[])
        .map((b) => b?.Slug)
        .filter((s: unknown): s is string => typeof s === "string")
    : [];
  return slugs.map((slug) => ({ slug }));
}

// Build a safe text excerpt from Introduction blocks
const excerptFromBlocks = (blocks: ContentBlock[] | undefined, max = 160) => {
  if (!Array.isArray(blocks)) return "";
  const text = blocks
    .map((b) => (Array.isArray(b.children) ? b.children.map((c) => c.text || "").join(" ") : ""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const title = blog?.Title ? `${blog.Title}` : "Blog";
  const description = excerptFromBlocks(blog?.Introduction) ||
    "Article about freight finance, factoring and logistics by Fincargo.";

  // Try to use a gallery image if available
  const imageUrl = blog?.Gallery && blog.Gallery[0]?.url
    ? blog.Gallery[0].url
    : `${SITE_URL}/logo/logo-fincargo.png`;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  } as const;
}
