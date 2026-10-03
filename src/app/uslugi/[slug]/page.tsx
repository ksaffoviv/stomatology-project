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
  const { services } = await getSiteContent();
  const service = services.find((item) => item.slug === slug);
  return { title: service?.title ?? "Услуга" };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const { services, doctors } = await getSiteContent();
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const details = service.details;
  const [hero, before, after, process] = details.photoSlots;
  const doctor = doctors.find((item) => item.shortName === service.doctor);
  const related = services.filter((item) => item.group === service.group && item.slug !== service.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link href="/uslugi" className="text-sm text-muted">
        ← Все услуги
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div>
          <span className="inline-flex rounded-md border border-line bg-white px-3 py-1 text-[11px] tracking-[0.16em] text-sage-dark uppercase">
            {service.group}
          </span>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">{service.title}</h1>
          <div className="mt-3 h-1 w-16 rounded-full bg-sage" />
          <div className="mt-6">
            <PhotoSlot
              label={hero?.label ?? "Главное фото"}
              hint={hero?.hint ?? ""}
              src={hero?.src || undefined}
              className="aspect-[21/9]"
            />
          </div>
        </div>

        <aside className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-[0_6px_24px_rgb(28_24_20_/_0.08)] ring-1 ring-sage/20">
          <p className="text-[11px] tracking-[0.16em] text-muted uppercase">Ориентир</p>
          <p className="mt-2 font-serif text-3xl text-sage-dark">{service.fromPrice}</p>
          <dl className="mt-5 space-y-3 text-sm">
            <div>
              <dt className="text-muted">Врач</dt>
              <dd className="mt-0.5">
                {doctor ? (
                  <Link href={`/vrachi/${doctor.slug}`} className="text-sage-dark underline-offset-2 hover:underline">
                    {service.doctor}
                  </Link>
                ) : (
                  service.doctor
                )}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Длительность</dt>
              <dd className="mt-0.5">{details.duration}</dd>
            </div>
            <div>
              <dt className="text-muted">Визиты</dt>
              <dd className="mt-0.5">{details.visits}</dd>
            </div>
          </dl>
          <BookButton doctor={service.doctor} variant="sage" className="mt-6 w-full">
            Записаться
          </BookButton>
        </aside>
      </div>

      <div className="mt-8">
        <RichText as="p" className="text-lg leading-relaxed text-ink-soft" html={service.short} />
        <RichText as="p" className="mt-4 leading-relaxed text-ink-soft" html={service.text} />
        {details.extra ? (
          <RichText as="p" className="mt-4 text-[15px] leading-relaxed text-muted" html={details.extra} />
        ) : null}
        {details.body.map((paragraph, index) => (
          <RichText
            key={`${index}-${paragraph.slice(0, 24)}`}
            as="p"
            className="mt-4 text-[15px] leading-relaxed text-ink-soft"
            html={paragraph}
          />
        ))}
      </div>

      <section className="mt-10">
        <h2 className="flex items-center gap-3 font-serif text-2xl text-sage-dark sm:text-3xl">
          <span className="h-8 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
          Кадры до, после и процесса
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <PhotoSlot label={before?.label ?? "До"} hint={before?.hint ?? ""} src={before?.src || undefined} className="aspect-[16/10]" />
          <PhotoSlot label={after?.label ?? "После"} hint={after?.hint ?? ""} src={after?.src || undefined} className="aspect-[16/10]" />
          <PhotoSlot label={process?.label ?? "Процесс"} hint={process?.hint ?? ""} src={process?.src || undefined} className="aspect-[16/10]" />
        </div>
      </section>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <section className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-[0_6px_24px_rgb(28_24_20_/_0.08)] ring-1 ring-sage/20 sm:p-8">
          <h2 className="flex items-center gap-3 font-serif text-2xl text-sage-dark">
            <span className="h-7 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
            Как проходит
          </h2>
          <ol className="mt-5 space-y-4">
            {details.steps.map((step, index) => (
              <li key={`${index}-${step.slice(0, 24)}`} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-sm text-paper">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-[0_6px_24px_rgb(28_24_20_/_0.08)] ring-1 ring-sage/20 sm:p-8">
          <h2 className="flex items-center gap-3 font-serif text-2xl text-sage-dark">
            <span className="h-7 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
            Что входит
          </h2>
          <ul className="mt-5 space-y-3">
            {details.includes.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-[0_6px_24px_rgb(28_24_20_/_0.08)] ring-1 ring-sage/20 sm:p-8">
          <h2 className="flex items-center gap-3 font-serif text-2xl text-sage-dark">
            <span className="h-7 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
            Кому обычно подходит
          </h2>
          <ul className="mt-5 space-y-3">
            {details.suitable.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-[0_6px_24px_rgb(28_24_20_/_0.08)] ring-1 ring-sage/20 sm:p-8">
          <h2 className="flex items-center gap-3 font-serif text-2xl text-sage-dark">
            <span className="h-7 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
            Когда лучше другой путь
          </h2>
          <ul className="mt-5 space-y-3">
            {details.notFor.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-line" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {details.important ? (
        <section className="mt-4 rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-[0_6px_24px_rgb(28_24_20_/_0.08)] ring-1 ring-sage/20 sm:p-8">
          <h2 className="flex items-center gap-3 font-serif text-2xl text-sage-dark">
            <span className="h-7 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
            Что важно знать
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{details.important}</p>
        </section>
      ) : null}

      {(details.aftercare || details.aftercareMore) ? (
        <section className="mt-4 rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-[0_6px_24px_rgb(28_24_20_/_0.08)] ring-1 ring-sage/20 sm:p-8">
          <h2 className="flex items-center gap-3 font-serif text-2xl text-sage-dark">
            <span className="h-7 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
            После визита
          </h2>
          {details.aftercare ? <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{details.aftercare}</p> : null}
          {details.aftercareMore ? <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{details.aftercareMore}</p> : null}
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="flex items-center gap-3 font-serif text-2xl text-sage-dark sm:text-3xl">
            <span className="h-8 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
            Ещё в направлении «{service.group}»
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <article
                key={item.slug}
                className="flex flex-col rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-[0_6px_24px_rgb(28_24_20_/_0.08)] ring-1 ring-sage/20"
              >
                <h3 className="font-serif text-xl">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{item.short}</p>
                <p className="mt-3 font-serif text-lg text-sage-dark">{item.fromPrice}</p>
                <Link
                  href={`/uslugi/${item.slug}`}
                  className="mt-4 inline-flex items-center justify-center rounded-xl border border-sage bg-white px-5 py-3 text-sm font-medium text-sage-dark hover:bg-sage hover:text-paper"
                >
                  Подробнее
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-12 rounded-[1.75rem] bg-sage-dark px-6 py-8 text-paper sm:flex sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-serif text-2xl">Нужен разбор вашей ситуации?</p>
          <p className="mt-2 max-w-xl text-sm text-cream/80">
            Запишитесь на консультацию — объём и цену назовём до начала работы.
          </p>
        </div>
        <BookButton doctor={service.doctor} variant="cream" className="mt-5 sm:mt-0">
          Записаться
        </BookButton>
      </section>
    </div>
  );
}
