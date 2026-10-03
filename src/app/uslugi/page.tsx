import { BookButton } from "@/components/book-button";
import { RichText } from "@/components/rich-text";
import { getSiteContent } from "@/lib/cms/store";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Услуги" };
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const { services, serviceGroups, servicesPage } = await getSiteContent();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <span className="inline-flex rounded-md border border-line bg-white px-3 py-1 text-[11px] tracking-[0.16em] text-sage-dark uppercase">
        {servicesPage.eyebrow}
      </span>
      <h1 className="mt-4 font-serif text-4xl text-ink sm:text-5xl">{servicesPage.title}</h1>
      <div className="mt-3 h-1 w-16 rounded-full bg-sage" />
      <RichText as="p" className="mt-4 max-w-2xl text-ink-soft" html={servicesPage.lead} />
      <div className="mt-10 space-y-12">
        {serviceGroups.map((group) => {
          const items = services.filter((service) => service.group === group);
          if (items.length === 0) return null;
          return (
            <section key={group}>
              <h2 className="flex items-center gap-3 font-serif text-2xl text-sage-dark sm:text-3xl">
                <span className="h-8 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
                {group}
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {items.map((service) => (
                  <article
                    key={service.slug}
                    className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-[0_6px_24px_rgb(28_24_20_/_0.08)] ring-1 ring-sage/20 transition hover:border-sage/40 hover:shadow-[0_10px_32px_rgb(28_24_20_/_0.12)] hover:ring-sage/40"
                  >
                    <h3 className="font-serif text-2xl text-ink">{service.title}</h3>
                    <RichText as="p" className="mt-2 text-sm text-muted" html={service.short} />
                    <p className="mt-4 text-sm text-ink-soft">Врач: {service.doctor}</p>
                    <p className="mt-1 font-serif text-xl text-sage-dark">{service.fromPrice}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href={`/uslugi/${service.slug}`}
                        className="inline-flex items-center justify-center rounded-xl border border-sage bg-white px-5 py-3 text-sm font-medium text-sage-dark shadow-[0_3px_12px_rgb(28_24_20_/_0.06)] hover:bg-sage hover:text-paper"
                      >
                        Подробнее
                      </Link>
                      <BookButton variant="sage">Записаться</BookButton>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
