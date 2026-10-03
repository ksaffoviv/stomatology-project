"use client";

import { useRef } from "react";
import { RichText } from "./rich-text";
import { useSiteContent } from "./site-content";

export function OffersBlock() {
  const { offers, home } = useSiteContent();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-offer-slide]");
    const step = card ? card.getBoundingClientRect().width + 16 : 400;
    const max = el.scrollWidth - el.clientWidth;
    if (direction === 1 && el.scrollLeft >= max - 8) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    if (direction === -1 && el.scrollLeft <= 8) {
      el.scrollTo({ left: max, behavior: "smooth" });
      return;
    }
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-sage/25 bg-white/80 px-5 py-8 shadow-[0_6px_24px_rgb(28_24_20_/_0.05)] ring-1 ring-sage/10 sm:px-8 sm:py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-md bg-cream px-3 py-1 text-[11px] tracking-[0.16em] text-muted uppercase">
              {home.offersEyebrow}
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              {home.offersTitle}
            </h2>
            <RichText as="p" className="mt-4 text-[15px] leading-relaxed text-ink-soft" html={home.offersLead} />
          </div>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              aria-label="Назад"
              onClick={() => scrollByCard(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-white text-ink shadow-[0_6px_16px_rgb(28_24_20_/_0.16)] hover:border-sage hover:bg-sage hover:text-paper"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label="Вперёд"
              onClick={() => scrollByCard(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-white text-ink shadow-[0_6px_16px_rgb(28_24_20_/_0.16)] hover:border-sage hover:bg-sage hover:text-paper"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto py-5 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          >
            {offers.map((offer) => (
              <div
                key={offer.title}
                data-offer-slide
                className="relative h-[18rem] w-[85%] shrink-0 origin-center snap-start overflow-hidden rounded-[1.75rem] bg-transparent shadow-none transition duration-300 ease-out hover:z-10 hover:scale-[1.03] hover:shadow-none sm:h-[20rem] sm:w-[calc(50%-0.5rem)]"
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="h-full w-full object-contain"
                />
              </div>
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
      <path d="M11.5 4.5 7 9l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M6.5 4.5 11 9l-4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
