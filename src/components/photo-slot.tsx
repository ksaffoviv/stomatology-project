type Props = {
  label: string;
  hint: string;
  src?: string;
  className?: string;
};

export function PhotoSlot({ label, hint, src, className = "aspect-[16/10]" }: Props) {
  if (src) {
    return (
      <figure className={`relative overflow-hidden rounded-[1.75rem] bg-white ${className}`}>
        <img src={src} alt="" className="h-full w-full object-cover" />
        <figcaption className="absolute bottom-3 left-3 rounded-md bg-paper/95 px-3 py-1 text-xs text-ink">
          {label}
        </figcaption>
      </figure>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center overflow-hidden rounded-[1.75rem] border border-dashed border-sage/35 bg-white px-4 py-4 text-center shadow-[0_6px_24px_rgb(28_24_20_/_0.06)] ${className}`}
    >
      <span className="inline-flex rounded-md bg-cream px-3 py-1 text-[11px] tracking-[0.16em] text-sage-dark uppercase">
        {label}
      </span>
      <p className="mt-2 max-w-xs text-xs leading-relaxed text-ink-soft">{hint}</p>
      <p className="mt-2 text-[11px] text-muted">Место под фото · демо</p>
    </div>
  );
}
