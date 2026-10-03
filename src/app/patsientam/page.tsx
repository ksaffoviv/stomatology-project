import { BeforeAfterCarousel } from "@/components/before-after-carousel";
import { BookButton } from "@/components/book-button";
import { PatientForms } from "@/components/patient-forms";
import { getSiteContent } from "@/lib/cms/store";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Пациентам" };
export const dynamic = "force-dynamic";

export default async function PatientsPage() {
  const { patientsPage, patientBeforeAfter, visitPrep } = await getSiteContent();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-muted uppercase">{patientsPage.eyebrow}</p>
      <h1 className="mt-2 max-w-2xl font-serif text-4xl leading-tight">{patientsPage.title}</h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{patientsPage.lead}</p>

      <nav className="mt-8 flex flex-wrap gap-2">
        {[
          { href: "#do-posle", label: "До и после" },
          { href: "#podgotovka", label: "Подготовка" },
          { href: "#anamnez", label: "Анамнез" },
          { href: "#anketa", label: "Первичный пациент" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-ink/25 bg-white px-4 py-2 text-sm text-ink-soft shadow-[0_3px_12px_rgb(28_24_20_/_0.06)] hover:border-sage hover:text-ink"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <section id="do-posle" className="mt-14 scroll-mt-24">
        <span className="inline-flex rounded-md bg-cream px-3 py-1 text-[11px] tracking-[0.16em] text-muted uppercase">
          {patientsPage.beforeAfterEyebrow}
        </span>
        <h2 className="mt-4 font-serif text-3xl sm:text-4xl">{patientsPage.beforeAfterTitle}</h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">{patientsPage.beforeAfterLead}</p>
        <BeforeAfterCarousel items={patientBeforeAfter} />
      </section>

      <section id="podgotovka" className="mt-16 scroll-mt-24">
        <span className="inline-flex rounded-md bg-cream px-3 py-1 text-[11px] tracking-[0.16em] text-muted uppercase">
          {patientsPage.prepEyebrow}
        </span>
        <h2 className="mt-4 font-serif text-3xl sm:text-4xl">{patientsPage.prepTitle}</h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">{patientsPage.prepLead}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visitPrep.map((item) => (
            <article key={item.title} className="rounded-[1.75rem] border border-line bg-paper p-6">
              <h3 className="font-serif text-xl leading-snug">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl sm:text-4xl">{patientsPage.formsTitle}</h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">{patientsPage.formsLead}</p>
        <div className="mt-8">
          <PatientForms />
        </div>
      </section>

      <div className="mt-12 rounded-[1.75rem] bg-cream px-6 py-8 sm:flex sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-serif text-2xl">{patientsPage.ctaTitle}</p>
          <p className="mt-2 max-w-md text-sm text-muted">{patientsPage.ctaText}</p>
        </div>
        <BookButton className="mt-5 sm:mt-0">Оставить заявку</BookButton>
      </div>
    </div>
  );
}
