import { BookButton } from "@/components/book-button";
import { AutoplayVideo } from "@/components/autoplay-video";
import { OffersBlock } from "@/components/offers-block";
import { ServicesBlock } from "@/components/services-block";
import { TeamBlock } from "@/components/team-block";
import { JournalBlock } from "@/components/journal-block";
import { PricesBlock } from "@/components/prices-block";
import { MapReviewsBlock } from "@/components/map-reviews-block";
import { PatientsBlock } from "@/components/patients-block";
import { RichText } from "@/components/rich-text";
import { getSiteContent } from "@/lib/cms/store";
import Link from "next/link";

export default async function HomePage() {
  const { clinic, prices, visitSteps, situations, about: aboutCopy, home, media, faq } = await getSiteContent();

  return (
    <>
      <section className="px-4 py-10 sm:px-6 lg:py-16">
        <div className="mx-auto grid max-w-6xl items-stretch gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-w-0">
            <p className="text-xs tracking-[0.2em] text-muted uppercase">{home.kicker}</p>
            <RichText
              as="h1"
              className="mt-5 font-serif text-[2rem] leading-[1.2] sm:text-4xl lg:text-5xl"
              html={home.title}
            />
            <RichText as="p" className="mt-6 text-lg leading-relaxed text-ink-soft" html={home.lead} />
            <div className="mt-10 flex flex-row flex-wrap items-center justify-start gap-x-6 gap-y-3">
              <a href={clinic.phoneHref} className="text-2xl leading-none text-ink sm:text-3xl">
                {clinic.phone}
              </a>
              <BookButton size="lg" className="px-10">
                Записаться
              </BookButton>
            </div>
            <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              <div className="rounded-xl bg-white px-4 py-4 shadow-[0_3px_12px_rgb(28_24_20_/_0.06)] ring-1 ring-line/80">
                <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">Адрес</p>
                <p className="m-0 mt-2 text-[15px] leading-snug font-medium">{clinic.address}</p>
              </div>
              <div className="rounded-xl bg-white px-4 py-4 shadow-[0_3px_12px_rgb(28_24_20_/_0.06)] ring-1 ring-line/80">
                <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">Часы</p>
                <p className="m-0 mt-2 text-[15px] leading-snug font-medium">{home.hoursShort}</p>
              </div>
              <div className="rounded-xl bg-white px-4 py-4 shadow-[0_3px_12px_rgb(28_24_20_/_0.06)] ring-1 ring-line/80">
                <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">Где</p>
                <p className="m-0 mt-2 text-[15px] leading-snug font-medium">{clinic.metro}</p>
              </div>
            </div>
          </div>
          <aside className="relative min-h-[22rem] overflow-hidden rounded-3xl bg-sage-dark lg:min-h-0">
            <AutoplayVideo src={media.heroVideo} poster={media.heroPoster} title="Видео клиники" />
          </aside>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-cream px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-md bg-paper px-3 py-1 text-[11px] tracking-[0.16em] text-muted uppercase">
                {home.visitEyebrow}
              </span>
              <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">{home.visitTitle}</h2>
              <RichText as="p" className="mt-4 text-[15px] leading-relaxed text-ink-soft" html={home.visitLead} />
            </div>
            <aside className="w-full shrink-0 rounded-2xl bg-white px-6 py-5 lg:w-64">
              <p className="text-[11px] tracking-[0.16em] text-muted uppercase">Консультация</p>
              <p className="mt-2 font-serif text-4xl tracking-tight">{prices[0]?.price ?? ""}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Если без КТ нельзя собрать точный план, консультация со снимком — {prices[1]?.price ?? ""}.
              </p>
            </aside>
          </div>

          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {visitSteps.map((step) => (
              <li key={step.n} className="rounded-2xl bg-white p-5">
                <span className="inline-flex rounded-md bg-cream px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-ink-soft uppercase">
                  {step.label}
                </span>
                <h3 className="mt-4 text-base font-semibold leading-snug">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-5 border-t border-line/80 pt-6 lg:flex-row lg:items-center lg:justify-between">
            <RichText as="p" className="max-w-xl text-sm leading-relaxed text-ink-soft" html={home.visitFooter} />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/uslugi"
                className="inline-flex items-center justify-center rounded-xl border border-ink/25 bg-white px-5 py-3 text-sm shadow-[0_3px_12px_rgb(28_24_20_/_0.06)]"
              >
                Смотреть направления
              </Link>
              <BookButton>Записаться на консультацию</BookButton>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-md bg-cream px-3 py-1 text-[11px] tracking-[0.16em] text-muted uppercase">
              {home.situationsEyebrow}
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">{home.situationsTitle}</h2>
            <RichText as="p" className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft" html={home.situationsLead} />
          </div>
          <aside className="w-full shrink-0 rounded-2xl border border-line bg-white px-6 py-5 lg:w-80">
            <p className="text-[11px] tracking-[0.16em] text-muted uppercase">{home.situationsAsideTitle}</p>
            <RichText as="p" className="mt-3 text-sm leading-relaxed text-ink-soft" html={home.situationsAside} />
          </aside>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {situations.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-2xl border border-line bg-white p-5 transition hover:border-sage"
            >
              <p className="text-[11px] tracking-[0.14em] text-muted uppercase">{item.tag}</p>
              <h3 className="mt-2 font-serif text-xl leading-snug">{item.label}</h3>
              <p className="mt-2 text-sm text-muted">{item.hint}</p>
              <p className="mt-4 text-sm">Открыть направление →</p>
            </Link>
          ))}
        </div>
      </section>

      <TeamBlock />

      <OffersBlock />

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] bg-cream px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-2 lg:items-stretch lg:px-10 lg:py-12">
          <div className="flex min-w-0 flex-col gap-4">
            <span className="inline-flex self-start rounded-md bg-paper px-3 py-1 text-[11px] tracking-[0.16em] text-muted uppercase">
              {home.familyEyebrow}
            </span>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">{home.familyTitle}</h2>
            <RichText as="p" className="text-[15px] leading-relaxed text-ink-soft" html={home.familyP1} />
            <RichText as="p" className="text-[15px] leading-relaxed text-ink-soft" html={home.familyP2} />
            <div className="rounded-[1.75rem] bg-paper p-6">
              <h3 className="font-serif text-2xl">{home.familyBoxTitle}</h3>
              <RichText as="p" className="mt-3 text-sm leading-relaxed text-ink-soft" html={home.familyBoxText} />
            </div>
            <ul className="space-y-3 rounded-[1.75rem] bg-paper p-6">
              {aboutCopy.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
            <RichText as="p" className="mt-auto text-sm leading-relaxed text-ink-soft" html={home.familyFooter} />
          </div>

          <div className="flex min-w-0 flex-col gap-4">
            <aside className="rounded-[1.75rem] bg-paper px-6 py-5">
              <p className="text-[11px] tracking-[0.16em] text-muted uppercase">{home.familyAsideTitle}</p>
              <RichText as="p" className="mt-3 text-sm leading-relaxed text-ink-soft" html={home.familyAside} />
            </aside>
            <figure className="min-w-0 flex-1">
              <div className="relative aspect-[3/4] h-full max-h-[560px] overflow-hidden rounded-[1.75rem] bg-paper p-1.5 lg:aspect-auto lg:min-h-[420px]">
                <div className="absolute inset-1.5 overflow-hidden rounded-lg">
                  <AutoplayVideo
                    src={media.clinicVideo}
                    poster={media.clinicPoster}
                    title={media.clinicVideoTitle}
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-muted">{media.clinicCaption}</figcaption>
            </figure>
            <BookButton className="mt-auto w-full">Записаться на консультацию</BookButton>
          </div>
        </div>
      </section>

      <ServicesBlock />

      <JournalBlock />

      <PatientsBlock />

      <PricesBlock />

      {home.extraBlocks.filter((block) => block.visible).length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-6">
            {home.extraBlocks
              .filter((block) => block.visible)
              .map((block) => (
                <article
                  key={block.id}
                  className="grid gap-6 overflow-hidden rounded-[2rem] border border-line bg-white p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
                >
                  <div>
                    <h2 className="font-serif text-3xl leading-tight">{block.title}</h2>
                    <RichText as="div" className="mt-4 text-[15px] leading-relaxed text-ink-soft" html={block.text} />
                  </div>
                  {block.image ? (
                    <img src={block.image} alt="" className="h-full max-h-80 w-full rounded-[1.5rem] object-cover" />
                  ) : null}
                </article>
              ))}
          </div>
        </section>
      ) : null}

      <MapReviewsBlock />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-serif text-3xl">{home.faqTitle}</h2>
        <div className="mt-8 space-y-3">
          {faq.map((item) => (
            <details key={item.q} className="rounded-2xl border border-line px-5 py-4">
              <summary className="cursor-pointer font-medium">{item.q}</summary>
              <RichText as="div" className="mt-3 text-sm text-muted" html={item.a} />
            </details>
          ))}
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 rounded-3xl bg-sage-dark px-5 py-5 text-paper sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
          <div className="max-w-xl">
            <h2 className="font-serif text-2xl leading-snug sm:text-[1.75rem]">{home.ctaTitle}</h2>
            <RichText as="p" className="mt-2 text-sm leading-relaxed text-cream/80" html={home.ctaText} />
          </div>
          <BookButton variant="cream" size="lg" className="w-full shrink-0 sm:w-auto">
            Записаться на консультацию
          </BookButton>
        </div>
      </section>
    </>
  );
}
