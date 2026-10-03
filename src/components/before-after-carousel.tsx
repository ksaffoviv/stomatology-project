"use client";

import { useRef, type ReactNode } from "react";
import type { BeforeAfterItem } from "@/lib/cms/types";
import { BeforeAfterSlider } from "./before-after-slider";

export function BeforeAfterCarousel({ items }: { items: BeforeAfterItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const showArrows = items.length > 1;

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-ba-slide]");
    const step = card ? card.getBoundingClientRect().width + 20 : 340;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 8) return;
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

  if (items.length === 0) {
    return <p className="mt-8 text-sm text-muted">Пока нет работ до/после. Добавьте их в админке → «Пациентам».</p>;
  }

  return (
    <div className="relative mt-8">
      {showArrows ? (
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-muted">{items.length} работ · листайте стрелками</p>
          <div className="flex gap-3">
            <ArrowButton label="Предыдущая работа" onClick={() => scrollByCard(-1)}>
              <ChevronLeft />
            </ArrowButton>
            <ArrowButton label="Следующая работа" onClick={() => scrollByCard(1)}>
              <ChevronRight />
            </ArrowButton>
          </div>
        </div>
      ) : null}

      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            data-ba-slide
            className="w-[min(86vw,22rem)] shrink-0 snap-start sm:w-[22rem]"
          >
            <BeforeAfterSlider
              before={item.before}
              after={item.after}
              title={item.title}
              tag={item.tag}
              note={item.note}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-white text-ink shadow-[0_6px_16px_rgb(28_24_20_/_0.12)] transition hover:border-sage hover:bg-sage hover:text-paper"
    >
      {children}
    </button>
  );
}

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M11.5 4.5 7 9l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M6.5 4.5 11 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
