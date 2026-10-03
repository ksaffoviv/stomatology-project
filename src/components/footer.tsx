"use client";

import Link from "next/link";
import { useSiteContent } from "./site-content";

const legalLinks = [
  { href: "/politika-personalnyh-dannyh", label: "Персональные данные" },
  { href: "/soglasie-na-obrabotku", label: "Согласие на обработку данных" },
  { href: "/politika-cookies", label: "Политика cookies" },
];

export function Footer() {
  const { clinic, nav } = useSiteContent();
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-2xl">{clinic.legalName}</p>
          <p className="mt-3 max-w-sm text-sm text-muted">{clinic.tagline}</p>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] text-muted uppercase">Разделы</p>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-sage">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] text-muted uppercase">Документы</p>
          <ul className="mt-3 space-y-2 text-sm">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-sage">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="text-xs tracking-[0.18em] text-muted uppercase">Контакты</p>
          <p className="mt-3">{clinic.address}</p>
          <p className="text-muted">{clinic.metro}</p>
          <p className="mt-2">{clinic.hours}</p>
          <a className="mt-2 block hover:text-sage" href={clinic.phoneHref}>
            {clinic.phone}
          </a>
          <a className="mt-1 block hover:text-sage" href={`mailto:${clinic.email}`}>
            {clinic.email}
          </a>
        </div>
      </div>
      <div className="border-t border-line px-4 py-4 text-center text-xs text-muted">
        <p>{clinic.disclaimer}</p>
        <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          {legalLinks.map((item, index) => (
            <span key={item.href} className="inline-flex items-center gap-3">
              {index > 0 ? <span aria-hidden className="text-line">·</span> : null}
              <Link href={item.href} className="underline-offset-2 hover:text-ink hover:underline">
                {item.label}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
