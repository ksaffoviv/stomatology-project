"use client";

import { FormEvent, useState } from "react";
import { useSiteContent } from "./site-content";
import { useBooking } from "./booking-context";

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const rest = digits.startsWith("8") || digits.startsWith("7") ? digits.slice(1) : digits;
  const d = rest.slice(0, 10);
  if (!d) return "";
  let out = "+7";
  if (d.length) out += ` (${d.slice(0, 3)}`;
  if (d.length >= 3) out += `) ${d.slice(3, 6)}`;
  if (d.length >= 6) out += `-${d.slice(6, 8)}`;
  if (d.length >= 8) out += `-${d.slice(8, 10)}`;
  return out;
}

export function BookingModal() {
  const { clinic } = useSiteContent();
  const { open, doctor, closeBooking } = useBooking();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  if (!open) return null;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!consent || sending) return;
    setSending(true);
    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, comment, doctor: doctor ?? "" }),
      });
      setSent(true);
    } finally {
      setSending(false);
    }
  }

  function onClose() {
    setSent(false);
    setName("");
    setPhone("");
    setComment("");
    setConsent(false);
    closeBooking();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/45 p-0 sm:items-center sm:p-6">
      <button className="absolute inset-0 cursor-default" aria-label="Закрыть" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-t-3xl bg-paper p-6 shadow-none sm:rounded-3xl sm:p-8">
        {sent ? (
          <div className="space-y-4">
            <p className="font-serif text-3xl">Заявка принята</p>
            <p className="text-muted">
              Заявка сохранена. Администратор увидит её в разделе «Заявки» админки.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-sage px-5 py-3 text-sm text-paper shadow-[0_5px_14px_rgb(28_24_20_/_0.14)] ring-1 ring-sage-dark/35"
            >
              Хорошо
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <p className="text-xs tracking-[0.18em] text-muted uppercase">Запись</p>
              <h2 className="mt-1 font-serif text-3xl">Оставьте заявку</h2>
              <p className="mt-2 text-sm text-muted">
                Перезвоним и подскажем, к кому из двух врачей семьи лучше прийти.
                {doctor ? ` Предпочтение: ${doctor}.` : ""}
              </p>
            </div>
            <label className="block text-sm">
              Имя
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-sage"
              />
            </label>
            <label className="block text-sm">
              Телефон
              <input
                required
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(maskPhone(e.target.value))}
                placeholder="+7 ("
                className="mt-1 w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-sage"
              />
            </label>
            <label className="block text-sm">
              Комментарий
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Что беспокоит и какое время удобнее"
                className="mt-1 w-full resize-none rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-sage"
              />
            </label>
            <label className="flex gap-3 text-sm text-muted">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1"
                required
              />
              <span>
                Согласен на{" "}
                <a href="/soglasie-na-obrabotku" target="_blank" rel="noreferrer" className="text-sage underline underline-offset-2">
                  обработку персональных данных
                </a>{" "}
                и принимаю{" "}
                <a
                  href="/politika-personalnyh-dannyh"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sage underline underline-offset-2"
                >
                  политику конфиденциальности
                </a>
                .
              </span>
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={sending}
                className="rounded-xl bg-terracotta px-5 py-3 text-sm text-paper shadow-[0_5px_14px_rgb(184_90_62_/_0.28)] ring-1 ring-terracotta-dark/40 disabled:opacity-60"
              >
                {sending ? "Отправка…" : "Отправить"}
              </button>
              <a href={clinic.phoneHref} className="rounded-xl border border-ink/25 bg-white px-5 py-3 text-center text-sm shadow-[0_3px_12px_rgb(28_24_20_/_0.06)]">
                Позвонить {clinic.phone}
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
