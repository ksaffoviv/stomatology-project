"use client";

import { useSiteContent } from "./site-content";
import { useBooking } from "./booking-context";

export function MobileBar() {
  const { clinic } = useSiteContent();
  const { openBooking } = useBooking();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper p-3 sm:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a
          href={clinic.phoneHref}
          className="rounded-xl border border-ink/25 bg-white py-3 text-center text-sm shadow-[0_3px_12px_rgb(28_24_20_/_0.06)]"
        >
          Позвонить
        </a>
        <button
          type="button"
          onClick={() => openBooking()}
          className="rounded-xl bg-terracotta py-3 text-sm text-paper shadow-[0_5px_14px_rgb(184_90_62_/_0.28)] ring-1 ring-terracotta-dark/40"
        >
          Записаться
        </button>
      </div>
    </div>
  );
}
