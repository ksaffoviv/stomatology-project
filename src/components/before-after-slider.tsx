"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

type Props = {
  before: string;
  after: string;
  title: string;
  tag: string;
  note: string;
};

export function BeforeAfterSlider({ before, after, title, tag, note }: Props) {
  const labelId = useId();
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [position, setPosition] = useState(52);
  const [frameWidth, setFrameWidth] = useState(0);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const update = () => setFrameWidth(el.offsetWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, next)));
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!dragging.current) return;
      event.preventDefault();
      setFromClientX(event.clientX);
    };
    const stop = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [setFromClientX]);

  return (
    <article className="before-after-card overflow-hidden rounded-[1.75rem] bg-cream">
      <div
        ref={frameRef}
        role="slider"
        tabIndex={0}
        aria-labelledby={labelId}
        aria-valuemin={4}
        aria-valuemax={96}
        aria-valuenow={Math.round(position)}
        aria-orientation="horizontal"
        className="relative aspect-[4/5] cursor-ew-resize touch-none select-none overflow-hidden bg-sage-dark outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 sm:aspect-[3/4]"
        onPointerDown={(event) => {
          dragging.current = true;
          frameRef.current?.setPointerCapture?.(event.pointerId);
          setFromClientX(event.clientX);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
            event.preventDefault();
            setPosition((value) => Math.max(4, value - 4));
          }
          if (event.key === "ArrowRight" || event.key === "ArrowUp") {
            event.preventDefault();
            setPosition((value) => Math.min(96, value + 4));
          }
          if (event.key === "Home") {
            event.preventDefault();
            setPosition(4);
          }
          if (event.key === "End") {
            event.preventDefault();
            setPosition(96);
          }
        }}
      >
        <img
          src={after}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 z-[1] overflow-hidden" style={{ width: `${position}%` }}>
          <img
            src={before}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full max-w-none object-cover"
            style={{ width: frameWidth ? `${frameWidth}px` : "100%" }}
          />
        </div>

        <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: `${position}%` }} aria-hidden>
          <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-paper/95" />
          <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-[0_6px_18px_rgb(28_24_20_/_0.2)]">
            <ChevronPair />
          </span>
        </div>

        <span className="pointer-events-none absolute bottom-3 left-3 z-20 rounded-md bg-paper/95 px-3 py-1 text-xs">
          До
        </span>
        <span className="pointer-events-none absolute right-3 bottom-3 z-20 rounded-md bg-paper/95 px-3 py-1 text-xs">
          После
        </span>
      </div>

      <div className="p-5">
        <p className="text-[11px] tracking-[0.14em] text-muted uppercase">{tag}</p>
        <h3 id={labelId} className="mt-2 font-serif text-xl leading-snug">
          {title}
        </h3>
        {note ? <p className="mt-2 text-sm leading-relaxed text-muted">{note}</p> : null}
        <p className="mt-3 text-xs text-muted">Потяните шторку — сравните «до» и «после»</p>
      </div>
    </article>
  );
}

function ChevronPair() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M8 6.5 4.5 11 8 15.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6.5 17.5 11 14 15.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
