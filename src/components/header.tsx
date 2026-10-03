"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSiteContent } from "./site-content";
import { useBooking } from "./booking-context";

export function Header() {
  const { clinic, nav } = useSiteContent();
  const { openBooking } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-4 py-4 sm:px-6 sm:py-5">
        <Link href="/" className="flex min-w-0 items-center gap-3.5" onClick={() => setMenuOpen(false)}>
          {clinic.logo.startsWith("/uploads/") ? (
            <img
              src={clinic.logo}
              alt=""
              className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
            />
          ) : (
            <Image
              src={clinic.logo}
              alt=""
              width={64}
              height={64}
              className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
              priority
            />
          )}
          <span className="min-w-0">
            <span className="block font-serif text-2xl leading-none tracking-tight sm:text-[1.65rem]">
              {clinic.name}
            </span>
            <span className="mt-1 block truncate text-xs font-medium tracking-[0.12em] text-ink-soft uppercase">
              Семейная клиника
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-[15px] font-medium lg:flex xl:gap-7">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink hover:text-sage">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={clinic.phoneHref} className="hidden text-base font-medium whitespace-nowrap sm:block">
            {clinic.phone}
          </a>
          <button
            type="button"
            onClick={() => openBooking()}
            className="hidden rounded-xl bg-sage px-5 py-2.5 text-[15px] font-medium text-paper shadow-[0_5px_14px_rgb(28_24_20_/_0.14)] ring-1 ring-sage-dark/35 sm:inline-flex"
          >
            Записаться
          </button>
          <button
            type="button"
            className="rounded-xl border border-ink/25 bg-white px-4 py-2.5 text-[15px] font-medium shadow-[0_3px_12px_rgb(28_24_20_/_0.06)] lg:hidden"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            Меню
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-line px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3 text-base">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <a href={clinic.phoneHref}>{clinic.phone}</a>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openBooking();
              }}
              className="rounded-xl bg-terracotta py-3 text-paper shadow-[0_5px_14px_rgb(184_90_62_/_0.28)] ring-1 ring-terracotta-dark/40"
            >
              Записаться
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
