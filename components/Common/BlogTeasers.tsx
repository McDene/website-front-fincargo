import Link from "next/link";
import Image from "next/image";

export interface BlogTeaserItem {
  title: string;
  slug: string;
  date?: string;
  imageUrl?: string | null;
}

export default function BlogTeasers({
  items,
  heading = "Latest VAT articles",
}: {
  items: BlogTeaserItem[];
  heading?: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
          {heading}
        </h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((p) => (
            <article
              key={p.slug}
              className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 ring-1 ring-slate-900/5 shadow-sm hover:shadow-md transition"
            >
              <div className="relative aspect-[16/9] bg-slate-50">
                {p.imageUrl ? (
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 380px, 90vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-slate-400">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2H3v2Z" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M7 10h10M7 7h6" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-5">
                {p.date && (
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    {p.date}
                  </p>
                )}
                <h3 className="mt-1 text-lg font-bold text-slate-900 line-clamp-2">{p.title}</h3>
                <div className="mt-4">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-darkBlue hover:text-lightBlue"
                  >
                    Read article
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12h14m-6-7 7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

