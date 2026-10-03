import { PhotoSlot } from "@/components/photo-slot";
import { getSiteContent } from "@/lib/cms/store";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Журнал" };
export const dynamic = "force-dynamic";

export default async function JournalPage() {
  const { journal, journalPage } = await getSiteContent();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <span className="inline-flex rounded-md border border-line bg-white px-3 py-1 text-[11px] tracking-[0.16em] text-sage-dark uppercase">
        {journalPage.eyebrow}
      </span>
      <h1 className="mt-4 font-serif text-4xl text-ink sm:text-5xl">{journalPage.title}</h1>
      <div className="mt-3 h-1 w-16 rounded-full bg-sage" />
      <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{journalPage.lead}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {journal.map((article) => (
          <Link
            key={article.slug}
            href={`/zhurnal/${article.slug}`}
            className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white shadow-[0_6px_24px_rgb(28_24_20_/_0.08)] ring-1 ring-sage/20 transition hover:border-sage/40 hover:shadow-[0_10px_32px_rgb(28_24_20_/_0.12)]"
          >
            <PhotoSlot
              label={article.hero.label || "Обложка"}
              hint={article.hero.hint}
              src={article.hero.src || undefined}
              className="aspect-[16/10] rounded-none !border-0 shadow-none"
            />
            <div className="flex flex-1 flex-col p-5">
              <p className="text-[11px] tracking-[0.14em] text-sage-dark uppercase">{article.tag}</p>
              <h2 className="mt-2 font-serif text-xl leading-snug">{article.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{article.excerpt}</p>
              <p className="mt-4 text-sm font-medium text-sage-dark">Читать →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
