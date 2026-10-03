import { BookButton } from "@/components/book-button";
import { DoctorMedia } from "@/components/doctor-media";
import { getSiteContent } from "@/lib/cms/store";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { doctors } = await getSiteContent();
  const doctor = doctors.find((item) => item.slug === slug);
  return { title: doctor?.name ?? "Врач" };
}

export default async function DoctorPage({ params }: Props) {
  const { slug } = await params;
  const { doctors } = await getSiteContent();
  const doctor = doctors.find((item) => item.slug === slug);
  if (!doctor) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link href="/vrachi" className="text-sm text-muted">
        ← Оба врача
      </Link>
      <p className="mt-6 text-xs tracking-[0.18em] text-muted uppercase">{doctor.role}</p>
      <h1 className="mt-2 font-serif text-4xl">{doctor.name}</h1>
      <div className="mt-8 overflow-hidden rounded-3xl">
        <DoctorMedia name={doctor.name} photo={doctor.photo} video={doctor.video} />
      </div>
      <p className="mt-6">{doctor.specialties.join(" · ")}</p>
      <p className="mt-6 text-lg text-ink-soft">{doctor.bio}</p>
      <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted">Стаж</dt>
          <dd>{doctor.experience}</dd>
        </div>
        <div>
          <dt className="text-muted">Приём</dt>
          <dd>{doctor.accepts}</dd>
        </div>
      </dl>
      <div className="mt-8">
        <BookButton doctor={doctor.shortName}>Записаться к этому врачу</BookButton>
      </div>
    </div>
  );
}
