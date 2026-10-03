import { BookButton } from "@/components/book-button";
import { RichText } from "@/components/rich-text";
import { getSiteContent } from "@/lib/cms/store";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "О клинике" };

export default async function AboutPage() {
  const { about } = await getSiteContent();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-muted uppercase">{about.eyebrow}</p>
      <h1 className="mt-2 font-serif text-4xl">{about.title}</h1>
      <RichText as="p" className="mt-5 text-lg text-ink-soft" html={about.lead} />
      <ul className="mt-10 space-y-4 text-ink-soft">
        {about.highlights.map((item) => (
          <li key={item} className="rounded-2xl bg-cream p-5">
            {item}
          </li>
        ))}
      </ul>
      <RichText as="p" className="mt-10 text-sm text-muted" html={about.note} />
      <BookButton className="mt-8">Записаться</BookButton>
    </div>
  );
}
