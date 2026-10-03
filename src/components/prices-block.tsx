"use client";

import { BookButton } from "@/components/book-button";
import { RichText } from "@/components/rich-text";
import { useSiteContent } from "@/components/site-content";
import Link from "next/link";

export function PricesBlock() {
  const { pricePreview, home } = useSiteContent();
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-cream px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-md bg-paper px-3 py-1 text-[11px] tracking-[0.16em] text-muted uppercase">
              {home.pricesEyebrow}
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">{home.pricesTitle}</h2>
            <RichText as="p" className="mt-4 text-[15px] leading-relaxed text-ink-soft" html={home.pricesLead} />
          </div>
          <aside className="w-full shrink-0 rounded-2xl bg-white px-6 py-5 lg:w-72">
            <p className="text-[11px] tracking-[0.16em] text-muted uppercase">{home.pricesAsideTitle}</p>
            <RichText as="p" className="mt-3 text-sm leading-relaxed text-ink-soft" html={home.pricesAside} />
          </aside>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pricePreview.map((item) => (
            <article key={item.title} className="flex flex-col rounded-[1.75rem] bg-white p-6">
              <span className="inline-flex self-start rounded-md bg-cream px-3 py-1 text-[11px] tracking-[0.16em] text-muted uppercase">
                {item.tag}
              </span>
              <h3 className="mt-4 font-serif text-2xl leading-snug">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{item.text}</p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p className="font-serif text-3xl tracking-tight">{item.price}</p>
                <BookButton variant="outline">Записаться</BookButton>
              </div>
            </article>
          ))}

          <Link href="/tseny" className="flex flex-col justify-between rounded-[1.75rem] bg-white p-6 text-ink">
            <div>
              <span className="inline-flex rounded-md bg-cream px-3 py-1 text-[11px] tracking-[0.16em] text-muted uppercase">
                Прайс
              </span>
              <h3 className="mt-4 font-serif text-2xl leading-snug">{home.pricesCardTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{home.pricesCardText}</p>
            </div>
            <p className="mt-8 text-sm font-medium text-ink">Смотреть все цены →</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
