import { BookButton } from "@/components/book-button";
import { DoctorMedia } from "@/components/doctor-media";
import { getSiteContent } from "@/lib/cms/store";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Врачи" };
export const dynamic = "force-dynamic";

export default async function DoctorsPage() {
  const { doctors, doctorsPage } = await getSiteContent();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-muted uppercase">{doctorsPage.eyebrow}</p>
      <h1 className="mt-2 font-serif text-4xl">{doctorsPage.title}</h1>
      <p className="mt-4 max-w-2xl text-ink-soft">{doctorsPage.lead}</p>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {doctors.map((doctor) => (
          <article key={doctor.slug} className="overflow-hidden rounded-3xl bg-cream">
            <DoctorMedia name={doctor.name} photo={doctor.photo} video={doctor.video} />
            <div className="p-6 sm:p-8">
              <p className="text-sm text-muted">{doctor.role}</p>
              <h2 className="mt-1 font-serif text-3xl">{doctor.name}</h2>
              <p className="mt-2 text-sm">
                {doctor.specialties.join(" · ")} · стаж {doctor.experience}
              </p>
              <p className="mt-4 text-ink-soft">{doctor.bio}</p>
              <p className="mt-4 text-sm text-muted">{doctor.accepts}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/vrachi/${doctor.slug}`}
                  className="rounded-xl border border-ink/25 bg-white px-5 py-3 text-sm shadow-[0_3px_12px_rgb(28_24_20_/_0.06)]"
                >
                  Профиль
                </Link>
                <BookButton doctor={doctor.shortName}>Записаться</BookButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
