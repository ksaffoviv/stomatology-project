import { BookButton } from "@/components/book-button";
import { RichText } from "@/components/rich-text";
import { getSiteContent } from "@/lib/cms/store";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Цены" };
export const dynamic = "force-dynamic";

export default async function PricesPage() {
  const { prices, pricesPage } = await getSiteContent();
  const downloadHref = pricesPage.downloadHref || "/api/prices/download";
  const downloadLabel = pricesPage.downloadLabel || "Скачать полный прайс (демо)";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-muted uppercase">{pricesPage.eyebrow}</p>
      <h1 className="mt-2 font-serif text-4xl">{pricesPage.title}</h1>
      <RichText as="p" className="mt-4 text-ink-soft" html={pricesPage.lead} />

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-ink">Весь прайс одним файлом</p>
          <p className="mt-1 text-sm text-muted">
            Демо-выгрузка актуального списка из админки. На запуске можно заменить на PDF клиники.
          </p>
        </div>
        <a
          href={downloadHref}
          download
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-sage px-5 py-3 text-sm text-paper shadow-[0_3px_12px_rgb(28_24_20_/_0.08)] hover:bg-sage-dark"
        >
          {downloadLabel}
        </a>
      </div>

      <div className="mt-10 divide-y divide-line rounded-3xl border border-line px-5">
        {prices.map((row) => (
          <div key={row.title} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <p>{row.title}</p>
              <p className="text-sm text-muted">{row.note}</p>
            </div>
            <p className="font-serif text-2xl">{row.price}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-3xl bg-cream p-6">
        <p className="font-serif text-2xl">{pricesPage.noteTitle}</p>
        <RichText as="p" className="mt-2 text-sm text-muted" html={pricesPage.noteText} />
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <BookButton>Записаться на консультацию</BookButton>
          <a
            href={downloadHref}
            download
            className="inline-flex items-center justify-center rounded-xl border border-ink/25 bg-white px-5 py-3 text-sm shadow-[0_3px_12px_rgb(28_24_20_/_0.06)]"
          >
            {downloadLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
