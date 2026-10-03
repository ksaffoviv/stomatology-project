"use client";

import { useBooking } from "./booking-context";

type Props = {
  children: React.ReactNode;
  doctor?: string;
  variant?: "sage" | "terracotta" | "ghost" | "ink" | "cream" | "outline";
  size?: "md" | "lg";
  className?: string;
};

const variants = {
  sage: "bg-sage text-paper shadow-[0_5px_14px_rgb(28_24_20_/_0.14)] ring-1 ring-sage-dark/35",
  terracotta: "bg-terracotta text-paper shadow-[0_5px_14px_rgb(184_90_62_/_0.28)] ring-1 ring-terracotta-dark/40",
  ghost: "border border-ink/25 bg-white text-ink shadow-[0_3px_12px_rgb(28_24_20_/_0.06)]",
  outline: "border border-ink bg-transparent text-ink shadow-none hover:bg-ink/5 hover:shadow-none",
  ink: "bg-ink text-paper shadow-[0_5px_14px_rgb(28_24_20_/_0.16)] ring-1 ring-ink",
  cream: "border border-ink/10 bg-cream text-ink shadow-[0_4px_14px_rgb(28_24_20_/_0.1)]",
};

const sizes = {
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base",
};

export function BookButton({
  children,
  doctor,
  variant = "terracotta",
  size = "md",
  className = "",
}: Props) {
  const { openBooking } = useBooking();

  return (
    <button
      type="button"
      onClick={() => openBooking(doctor)}
      className={`inline-flex items-center justify-center rounded-xl transition-shadow duration-200 ease-out hover:shadow-[0_10px_22px_rgb(28_24_20_/_0.2)] ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
