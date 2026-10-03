"use client";

import Link from "next/link";
import { useSiteContent } from "./site-content";

export function JournalBlock() {
  const { media, journal, home } = useSiteContent();
  const journalWide = media.journalWide;
  const journalTall = media.journalTall;
  const featured = journal.find((item) => item.featured) ?? journal[0];
  const side = journal.filter((item) => item.slug !== featured?.slug).slice(0, 2);

  if (!featured) return null;

  const featuredImage = featured.hero.src || featured.image || journalWide;

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex rounded-md bg-cream px-3 py-1 text-[11px] tracking-[0.16em] text-muted uppercase">
              {home.journalEyebrow}
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">{home.journalTitle}</h2>
          </div>
          <Link href="/zhurnal" className="mb-1 shrink-0 text-sm text-muted transition hover:text-ink">
            Все публикации →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-[28rem]">
          <Link
            href={`/zhurnal/${featured.slug}`}
            className="grid min-h-[22rem] grid-rows-2 overflow-hidden rounded-[1.75rem] bg-sage-dark lg:min-h-0"
          >
            <div className="flex flex-col justify-between p-6 sm:p-8">
              <h3 className="max-w-md font-serif text-2xl leading-snug text-paper sm:text-3xl">{featured.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">
                {(featured.excerpt || "").replace(/<[^>]+>/g, "")}
              </p>
            </div>
            <div className="relative min-h-[10rem]">
              <img src={featuredImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
              <span className="absolute bottom-5 left-5 inline-flex rounded-xl bg-paper px-4 py-2 text-sm text-ink shadow-[0_3px_12px_rgb(28_24_20_/_0.08)]">
                Читать полностью
              </span>
            </div>
          </Link>

          {side.map((article) => {
            const image = article.hero.src || article.image || journalTall;
            return (
              <Link
                key={article.slug}
                href={`/zhurnal/${article.slug}`}
                className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem] bg-sage-dark lg:min-h-0"
              >
                <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/10" />
                <h3 className="absolute inset-x-0 bottom-0 p-5 font-serif text-xl leading-snug text-paper sm:p-6 sm:text-[1.35rem]">
                  {article.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
