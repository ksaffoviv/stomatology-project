"use client";

import { useSiteContent } from "./site-content";

function Stars() {
  return (
    <span className="flex gap-0.5 text-terracotta" aria-label="Оценка 5 из 5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
          <path d="M7 1.2 8.6 5h3.7l-3 2.3L10.8 12 7 9.6 3.2 12l1.5-4.7-3-2.3h3.7L7 1.2Z" />
        </svg>
      ))}
    </span>
  );
}

export function MapReviewsBlock() {
  const { clinic, reviews } = useSiteContent();
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2 lg:items-stretch">
        <article className="flex flex-col rounded-[1.75rem] bg-cream p-5 sm:p-7">
          <span className="inline-flex self-start rounded-md bg-paper px-3 py-1 text-[11px] tracking-[0.16em] text-muted uppercase">
            Как добраться
          </span>
          <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">Клиника на карте</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{clinic.address}</p>
          <div className="relative mt-6 min-h-[22rem] flex-1 overflow-hidden rounded-2xl bg-paper">
            <iframe
              title="Карта клиники"
              src={clinic.mapEmbed}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
            />
            <div className="absolute right-4 bottom-4 left-4 rounded-2xl bg-paper/95 p-4 shadow-sm">
              <p className="font-serif text-lg leading-snug">{clinic.legalName}</p>
              <p className="mt-1 text-sm text-ink-soft">{clinic.address}</p>
              <p className="text-sm text-muted">{clinic.metro}</p>
              <a
                href={clinic.mapLink}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex rounded-xl bg-ink px-4 py-2 text-sm text-paper shadow-[0_5px_14px_rgb(28_24_20_/_0.16)]"
              >
                Открыть маршрут
              </a>
            </div>
          </div>
        </article>

        <article className="flex flex-col rounded-[1.75rem] bg-cream p-5 sm:p-7">
          <span className="inline-flex self-start rounded-md bg-paper px-3 py-1 text-[11px] tracking-[0.16em] text-muted uppercase">
            Отзывы
          </span>
          <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">Нам пишут после приёма</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            Оценка {reviews.rating}
            {reviews.count ? ` · ${reviews.count} отзывов` : ""}.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {reviews.sources.map((source) => (
              <a
                key={source.label}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-ink/25 bg-white px-3 py-1.5 text-sm text-ink-soft shadow-[0_3px_12px_rgb(28_24_20_/_0.06)] transition hover:border-sage hover:text-ink"
              >
                {source.label}
              </a>
            ))}
          </div>

          <ul className="mt-5 flex flex-1 flex-col gap-3">
            {reviews.items.map((item) => (
              <li key={`${item.name}-${item.text.slice(0, 12)}`} className="rounded-2xl bg-paper p-4">
                <Stars />
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
                <p className="mt-3 text-xs tracking-wide text-muted">
                  {item.name} · {item.source}
                </p>
              </li>
            ))}
          </ul>

          <a
            href={reviews.yandexHref}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-ink px-5 py-3 text-center text-sm text-paper shadow-[0_5px_14px_rgb(28_24_20_/_0.16)]"
          >
            Читать отзывы на Яндексе
          </a>
        </article>
      </div>
    </section>
  );
}
