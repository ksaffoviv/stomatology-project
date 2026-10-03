"use client";

import { BookButton } from "@/components/book-button";
import { DoctorMedia } from "@/components/doctor-media";
import { RichText } from "@/components/rich-text";
import { useSiteContent } from "@/components/site-content";
import Link from "next/link";

export function TeamBlock() {
  const { doctors, home } = useSiteContent();
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-cream px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-md bg-paper px-3 py-1 text-[11px] tracking-[0.16em] text-muted uppercase">
              {home.teamEyebrow}
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">{home.teamTitle}</h2>
            <RichText as="p" className="mt-4 text-[15px] leading-relaxed text-ink-soft" html={home.teamLead} />
          </div>
          <aside className="w-full shrink-0 rounded-2xl bg-paper px-6 py-5 lg:w-72">
            <p className="text-[11px] tracking-[0.16em] text-muted uppercase">{home.teamAsideTitle}</p>
            <RichText as="p" className="mt-3 text-sm leading-relaxed text-ink-soft" html={home.teamAside} />
          </aside>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {doctors.map((doctor) => (
            <article key={doctor.slug} className="flex flex-col rounded-[1.75rem] bg-paper p-1.5 sm:p-2">
              <Link href={`/vrachi/${doctor.slug}`} className="block overflow-hidden rounded-[1.5rem]">
                <DoctorMedia
                  name={doctor.name}
                  photo={doctor.photo}
                  video={doctor.video}
                  className="aspect-[4/3] sm:aspect-[5/4]"
                />
              </Link>
              <div className="flex flex-1 flex-col px-3 pt-4 pb-2 sm:px-4">
                <h3 className="font-serif text-2xl leading-snug">{doctor.name}</h3>
                <p className="mt-1 text-sm text-muted">{doctor.titleLine}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {doctor.specialties.map((tag) => (
                    <span key={tag} className="rounded-md bg-cream px-3 py-1 text-[12px] text-ink-soft">
                      {tag}
                    </span>
                  ))}
                  <span className="rounded-md bg-cream px-3 py-1 text-[12px] text-ink-soft">
                    Стаж {doctor.experience}
                  </span>
                </div>
                <RichText as="p" className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft" html={doctor.cardNote} />
                <BookButton doctor={doctor.shortName} variant="sage" className="mt-5 w-full">
                  Записаться
                </BookButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
