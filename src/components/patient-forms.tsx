"use client";

import { FormEvent, useState } from "react";
import { useSiteContent } from "./site-content";

const fieldClass =
  "mt-1 w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-sage";

export function PatientForms() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
      <AnamnesisForm />
      <FirstVisitForm />
    </div>
  );
}

function AnamnesisForm() {
  const { anamnesisFlags } = useSiteContent();
  const [sent, setSent] = useState(false);
  const [flags, setFlags] = useState<string[]>([]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  function toggle(flag: string) {
    setFlags((prev) => (prev.includes(flag) ? prev.filter((item) => item !== flag) : [...prev, flag]));
  }

  if (sent) {
    return (
      <div id="anamnez" className="scroll-mt-24 rounded-[1.75rem] bg-cream p-6 sm:p-8">
        <p className="text-[11px] tracking-[0.16em] text-muted uppercase">Анамнез</p>
        <h3 className="mt-2 font-serif text-2xl">Анкета принята в прототипе</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          На живом сайте ответы уйдут врачу до визита. Сейчас ничего не сохраняем — это макет формы.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setFlags([]);
          }}
          className="mt-6 rounded-xl bg-ink px-5 py-3 text-sm text-paper shadow-[0_5px_14px_rgb(28_24_20_/_0.16)]"
        >
          Заполнить ещё раз
        </button>
      </div>
    );
  }

  return (
    <form
      id="anamnez"
      onSubmit={onSubmit}
      className="scroll-mt-24 rounded-[1.75rem] bg-cream p-6 sm:p-8"
    >
      <p className="text-[11px] tracking-[0.16em] text-muted uppercase">Здоровье</p>
      <h3 className="mt-2 font-serif text-2xl leading-snug">Анкета стоматологического анамнеза</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        Нужна, чтобы обезболивание и план не спорили с вашими лекарствами и хроническими состояниями.
      </p>

      <label className="mt-6 block text-sm">
        Имя
        <input required name="name" className={fieldClass} />
      </label>
      <label className="mt-4 block text-sm">
        Год рождения
        <input required name="year" inputMode="numeric" className={fieldClass} />
      </label>

      <p className="mt-6 text-sm font-medium">Отметьте, что относится к вам</p>
      <ul className="mt-3 space-y-2">
        {anamnesisFlags.map((flag) => (
          <li key={flag}>
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-paper px-4 py-3 text-sm">
              <input
                type="checkbox"
                checked={flags.includes(flag)}
                onChange={() => toggle(flag)}
                className="mt-0.5 accent-[#3c5a4c]"
              />
              <span>{flag}</span>
            </label>
          </li>
        ))}
      </ul>

      <label className="mt-4 block text-sm">
        Аллергии и препараты, которые принимаете постоянно
        <textarea name="meds" rows={3} className={`${fieldClass} resize-none`} />
      </label>
      <label className="mt-4 block text-sm">
        Что беспокоит в зубах и дёснах сейчас
        <textarea name="complaint" rows={3} className={`${fieldClass} resize-none`} />
      </label>

      <label className="mt-4 flex items-start gap-3 text-sm text-ink-soft">
        <input required type="checkbox" className="mt-1 accent-[#3c5a4c]" />
        <span>Понимаю, что это прототип: данные не уходят в клинику и не хранятся.</span>
      </label>

      <button type="submit" className="mt-6 rounded-xl bg-ink px-5 py-3 text-sm text-paper shadow-[0_5px_14px_rgb(28_24_20_/_0.16)]">
        Отправить анкету
      </button>
    </form>
  );
}

function FirstVisitForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div id="anketa" className="scroll-mt-24 rounded-[1.75rem] bg-cream p-6 sm:p-8">
        <p className="text-[11px] tracking-[0.16em] text-muted uppercase">Первый визит</p>
        <h3 className="mt-2 font-serif text-2xl">Спасибо, форма заполнена</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          В рабочей версии администратор увидит заявку и перезвонит. Сейчас это только вёрстка.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 rounded-xl bg-ink px-5 py-3 text-sm text-paper shadow-[0_5px_14px_rgb(28_24_20_/_0.16)]"
        >
          Заполнить ещё раз
        </button>
      </div>
    );
  }

  return (
    <form
      id="anketa"
      onSubmit={onSubmit}
      className="scroll-mt-24 rounded-[1.75rem] bg-cream p-6 sm:p-8"
    >
      <p className="text-[11px] tracking-[0.16em] text-muted uppercase">Первый визит</p>
      <h3 className="mt-2 font-serif text-2xl leading-snug">Анкета для первичных пациентов</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        Коротко: кто вы, что мешает жить и к кому удобнее. Лечение в этой форме не назначаем.
      </p>

      <label className="mt-6 block text-sm">
        Имя
        <input required name="name" className={fieldClass} />
      </label>
      <label className="mt-4 block text-sm">
        Телефон
        <input required name="phone" inputMode="tel" placeholder="+7 (" className={fieldClass} />
      </label>
      <label className="mt-4 block text-sm">
        Что беспокоит
        <textarea
          required
          name="reason"
          rows={3}
          placeholder="Боль, чистка, коронка, имплант — своими словами"
          className={`${fieldClass} resize-none`}
        />
      </label>
      <label className="mt-4 block text-sm">
        Когда последний раз были у стоматолога
        <input name="lastVisit" className={fieldClass} />
      </label>
      <label className="mt-4 block text-sm">
        К кому удобнее
        <select name="doctor" className={fieldClass}>
          <option value="">Пока не знаю</option>
          <option>А. С. Волков — терапия и ортопедия</option>
          <option>М. С. Волков — хирургия и имплант</option>
        </select>
      </label>
      <label className="mt-4 block text-sm">
        Как узнали о клинике
        <input name="source" className={fieldClass} />
      </label>

      <label className="mt-4 flex items-start gap-3 text-sm text-ink-soft">
        <input required type="checkbox" className="mt-1 accent-[#3c5a4c]" />
        <span>Согласен, что это демо-форма и заявка никуда не отправляется.</span>
      </label>

      <button type="submit" className="mt-6 rounded-xl bg-ink px-5 py-3 text-sm text-paper shadow-[0_5px_14px_rgb(28_24_20_/_0.16)]">
        Отправить анкету
      </button>
    </form>
  );
}
