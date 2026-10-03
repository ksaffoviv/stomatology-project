"use client";

import Link from "next/link";
import { RichText } from "./rich-text";
import { useSiteContent } from "./site-content";

export function PatientsBlock() {
  const { home, patientsCards } = useSiteContent();

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-md border border-line bg-white px-3 py-1 text-[11px] tracking-[0.16em] text-sage-dark uppercase">
              {home.patientsEyebrow}
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-[2.5rem]">
              {home.patientsTitle}
            </h2>
            <RichText as="p" className="mt-4 text-[15px] leading-relaxed text-ink-soft" html={home.patientsLead} />
          </div>
          <Link
            href="/patsientam"
            className="inline-flex items-center justify-center self-start rounded-xl border border-ink/25 bg-white px-5 py-3 text-sm shadow-[0_3px_12px_rgb(28_24_20_/_0.06)] sm:self-auto"
          >
            Весь раздел
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {patientsCards.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-[0_6px_24px_rgb(28_24_20_/_0.08)] transition hover:border-sage/40 hover:shadow-[0_10px_32px_rgb(28_24_20_/_0.12)] sm:p-7"
            >
              <span className="inline-flex rounded-md bg-cream px-3 py-1 text-[11px] tracking-[0.16em] text-sage-dark uppercase">
                {item.tag}
              </span>
              <h3 className="mt-4 font-serif text-[1.35rem] leading-snug text-ink sm:text-2xl">{item.title}</h3>
              <RichText as="p" className="mt-3 text-sm leading-relaxed text-ink-soft" html={item.text} />
              <p className="mt-5 text-sm font-medium text-sage-dark">Открыть →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
