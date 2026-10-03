import Link from "next/link";
import type { ReactNode } from "react";

export function LegalPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link href="/" className="text-sm text-muted hover:text-ink">
        ← На главную
      </Link>
      <p className="mt-8 text-xs tracking-[0.18em] text-muted uppercase">{eyebrow}</p>
      <h1 className="mt-2 font-serif text-4xl leading-tight">{title}</h1>
      <p className="mt-4 rounded-2xl bg-cream px-4 py-3 text-sm text-ink-soft">
        Демо-текст для прототипа. Перед запуском клиники документы нужно согласовать с юристом и подставить реквизиты оператора.
      </p>
      <div className="legal-prose mt-8 space-y-4 text-[15px] leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}
