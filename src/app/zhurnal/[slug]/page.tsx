import { BookButton } from "@/components/book-button";
import { PhotoSlot } from "@/components/photo-slot";
import { RichText } from "@/components/rich-text";
import { getSiteContent } from "@/lib/cms/store";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { journal } = await getSiteContent();
  const article = journal.find((item) => item.slug === slug);
  return { title: article?.title ?? "Статья" };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const { journal } = await getSiteContent();
  const article = journal.find((item) => item.slug === slug);
  if (!article) notFound();

  const related = journal.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link href="/zhurnal" className="text-sm text-muted">
        ← Все публикации
      </Link>

      <span className="mt-8 inline-flex rounded-md border border-line bg-white px-3 py-1 text-[11px] tracking-[0.16em] text-sage-dark uppercase">
        Журнал · {article.tag}
      </span>
      <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">{article.title}</h1>
      <div className="mt-3 h-1 w-16 rounded-full bg-sage" />
      <p className="mt-4 text-sm text-muted">Чтение {article.readTime}</p>
      <RichText as="p" className="mt-4 text-lg leading-relaxed text-ink-soft" html={article.excerpt} />

      <div className="mt-8">
        <PhotoSlot
          label={article.hero.label}
          hint={article.hero.hint}
          src={article.hero.src || undefined}
          className="aspect-[21/9]"
        />
      </div>

      {article.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="flex items-center gap-3 font-serif text-2xl text-sage-dark sm:text-3xl">
            <span className="h-8 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
            {section.heading}
          </h2>
          {section.paragraphs.map((paragraph, index) => (
            <RichText
              key={`${index}-${paragraph.slice(0, 24)}`}
              as="p"
              className="mt-4 text-[15px] leading-relaxed text-ink-soft"
              html={paragraph}
            />
          ))}
          {section.photoLabel || section.photoSrc ? (
            <div className="mt-6">
              <PhotoSlot
                label={section.photoLabel || "Фото"}
                hint={section.photoHint}
                src={section.photoSrc || undefined}
                className="aspect-[2/1]"
              />
            </div>
          ) : null}
        </section>
      ))}

      {article.closing ? (
        <RichText as="p" className="mt-10 text-[15px] leading-relaxed text-ink-soft" html={article.closing} />
      ) : null}

      {article.gallery.length > 0 ? (
        <section className="mt-12">
          <h2 className="flex items-center gap-3 font-serif text-2xl text-sage-dark sm:text-3xl">
            <span className="h-8 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
            Кадры к статье
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {article.gallery.map((slot, index) => (
              <PhotoSlot
                key={`${slot.label}-${index}`}
                label={slot.label}
                hint={slot.hint}
                src={slot.src || undefined}
                className="aspect-[16/10]"
              />
            ))}
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="flex items-center gap-3 font-serif text-2xl text-sage-dark sm:text-3xl">
            <span className="h-8 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
            Ещё публикации
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <article
                key={item.slug}
                className="flex flex-col rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-[0_6px_24px_rgb(28_24_20_/_0.08)] ring-1 ring-sage/20"
              >
                <h3 className="font-serif text-xl leading-snug">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{(item.excerpt || "").replace(/<[^>]+>/g, "")}</p>
                <Link
                  href={`/zhurnal/${item.slug}`}
                  className="mt-4 inline-flex items-center justify-center rounded-xl border border-sage bg-white px-5 py-3 text-sm font-medium text-sage-dark hover:bg-sage hover:text-paper"
                >
                  Читать
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-12 rounded-[1.75rem] bg-sage-dark px-6 py-8 text-paper sm:flex sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-serif text-2xl">Нужен разбор вашей ситуации?</p>
          <p className="mt-2 text-sm text-cream/80">Запишитесь на консультацию — план соберём на приёме.</p>
        </div>
        <BookButton variant="cream" className="mt-5 sm:mt-0">
          Записаться
        </BookButton>
      </section>
    </div>
  );
}
