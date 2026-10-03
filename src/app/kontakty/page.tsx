import { BookButton } from "@/components/book-button";
import { getSiteContent } from "@/lib/cms/store";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Контакты" };
export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const { clinic, contactsPage } = await getSiteContent();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-muted uppercase">{contactsPage.eyebrow}</p>
      <h1 className="mt-2 font-serif text-4xl">{contactsPage.title}</h1>
      <p className="mt-4 max-w-2xl text-ink-soft">{contactsPage.lead}</p>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 text-ink-soft">
          <p>
            <span className="block text-sm text-muted">Адрес</span>
            {clinic.address}
          </p>
          <p>
            <span className="block text-sm text-muted">Ориентир</span>
            {clinic.metro}
          </p>
          <p>
            <span className="block text-sm text-muted">Режим</span>
            {clinic.hours}
          </p>
          <p>
            <span className="block text-sm text-muted">Телефон</span>
            <a href={clinic.phoneHref}>{clinic.phone}</a>
          </p>
          <p>
            <span className="block text-sm text-muted">Почта</span>
            {clinic.email}
          </p>
          <p>
            <span className="block text-sm text-muted">Мессенджер</span>
            {clinic.messenger}
          </p>
          <BookButton className="mt-4">Оставить заявку</BookButton>
        </div>
        <div className="min-h-72 overflow-hidden rounded-3xl bg-cream">
          <iframe
            title="Карта клиники"
            src={clinic.mapEmbed}
            className="h-full min-h-72 w-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
