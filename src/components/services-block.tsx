"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RichText } from "./rich-text";
import { useSiteContent } from "./site-content";

export function ServicesBlock() {
  const { media, services, serviceGroups, home } = useSiteContent();
  const servicePhoto = media.serviceCardImage;
  const [group, setGroup] = useState(serviceGroups[0] ?? "");
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () => services.filter((service) => service.group === group),
    [services, group],
  );

  useEffect(() => {
    if (!serviceGroups.includes(group) && serviceGroups[0]) {
      setGroup(serviceGroups[0]);
    }
  }, [serviceGroups, group]);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(max > 8 && el.scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    updateArrows();
  }, [group, items.length, updateArrows]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateArrows]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("a");
    const step = card ? card.getBoundingClientRect().width + 16 : 280;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex rounded-md border border-line bg-white px-3 py-1 text-[11px] tracking-[0.16em] text-sage-dark uppercase">
              {home.servicesEyebrow}
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-[2.5rem]">{home.servicesTitle}</h2>
            <RichText as="p" className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft" html={home.servicesLead} />
          </div>
          <Link
            href="/uslugi"
            className="inline-flex items-center justify-center self-start rounded-xl border border-ink/25 bg-white px-5 py-3 text-sm shadow-[0_3px_12px_rgb(28_24_20_/_0.06)] sm:self-auto"
          >
            Все услуги
          </Link>
        </div>

        <div className="mt-10 flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {serviceGroups.map((item) => {
            const active = item === group;
            return (
              <div key={item} className="flex min-w-max flex-1 flex-col">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setGroup(item)}
                  className={`whitespace-nowrap px-4 py-3.5 text-center text-sm leading-snug tracking-[0.04em] uppercase transition sm:px-5 sm:py-4 sm:text-[15px] sm:tracking-[0.06em] ${
                    active
                      ? "rounded-t-xl border border-b-0 border-sage-dark font-bold text-ink"
                      : "border border-transparent font-semibold text-ink-soft hover:text-ink"
                  }`}
                >
                  {item}
                </button>
                <div className={`h-0.5 ${active ? "bg-cream" : "bg-sage-dark"}`} />
              </div>
            );
          })}
        </div>

        <div className="relative mt-8">
          {canPrev ? (
            <button
              type="button"
              aria-label="Назад"
              onClick={() => scrollByCard(-1)}
              className="absolute top-1/2 left-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink shadow-sm"
            >
              <ChevronLeft />
            </button>
          ) : null}
          {canNext ? (
            <button
              type="button"
              aria-label="Вперёд"
              onClick={() => scrollByCard(1)}
              className="absolute top-1/2 right-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink shadow-sm"
            >
              <ChevronRight />
            </button>
          ) : null}

          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          >
            {items.map((service) => (
              <Link
                key={service.slug}
                href={`/uslugi/${service.slug}`}
                className="relative aspect-[2/3] w-[min(72vw,240px)] shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-sage-dark sm:w-[240px] lg:w-[250px]"
              >
                <img
                  src={service.image || servicePhoto}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-transparent" />
                <span className="absolute inset-x-0 top-0 p-5 text-left text-lg leading-snug font-semibold text-paper drop-shadow-[0_1px_8px_rgb(28_24_20_/_0.55)] sm:p-6">
                  {service.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M11.5 4.5 7 9l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M6.5 4.5 11 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
