"use client";

import { useState } from "react";
import { emptyServiceDetails, slugify } from "@/lib/cms/defaults";
import type {
  JournalArticle,
  Service,
  SiteContent,
} from "@/lib/cms/types";
import { Field, LinesField, MediaField, RichTextField } from "./admin-fields";

type Setter = (content: SiteContent) => void;

export function ServicesAdminSection({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: Setter;
}) {
  const [openSlug, setOpenSlug] = useState<string | null>(content.services[0]?.slug ?? null);

  function updateService(index: number, next: Service) {
    setContent({
      ...content,
      services: content.services.map((item, i) => (i === index ? next : item)),
    });
  }

  function addService() {
    const slug = `usluga-${Date.now()}`;
    const next: Service = {
      slug,
      title: "Новая услуга",
      short: "",
      group: content.serviceGroups[0] ?? "Терапия",
      fromPrice: "от 0 ₽",
      doctor: content.doctors[0]?.shortName ?? "",
      image: "",
      text: "",
      details: emptyServiceDetails(),
    };
    setContent({ ...content, services: [...content.services, next] });
    setOpenSlug(slug);
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-3xl">Услуги</h2>
          <p className="mt-2 text-sm text-[#6f675e]">
            Список на /uslugi, карточки на главной и полный текст страницы каждой услуги.
          </p>
        </div>
        <button type="button" onClick={addService} className="rounded-xl bg-[#3c5a4c] px-4 py-2 text-sm text-white">
          Добавить услугу
        </button>
      </div>

      <div className="mt-6 grid gap-3 rounded-2xl border border-[#eee6da] p-4">
        <Field
          label="Группы направлений (каждая с новой строки)"
          value={content.serviceGroups.join("\n")}
          multiline
          onChange={(v) =>
            setContent({
              ...content,
              serviceGroups: v.split("\n").map((line) => line.trim()).filter(Boolean),
            })
          }
        />
        <Field
          label="Страница /uslugi: надзаголовок"
          value={content.servicesPage.eyebrow}
          onChange={(v) => setContent({ ...content, servicesPage: { ...content.servicesPage, eyebrow: v } })}
        />
        <Field
          label="Страница /uslugi: заголовок"
          value={content.servicesPage.title}
          onChange={(v) => setContent({ ...content, servicesPage: { ...content.servicesPage, title: v } })}
        />
        <Field
          label="Страница /uslugi: текст"
          value={content.servicesPage.lead}
          multiline
          onChange={(v) => setContent({ ...content, servicesPage: { ...content.servicesPage, lead: v } })}
        />
      </div>

      <div className="mt-6 grid gap-3">
        {content.services.map((service, index) => {
          const open = openSlug === service.slug;
          const d = service.details;
          return (
            <div key={service.slug} className="rounded-2xl border border-[#eee6da]">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                onClick={() => setOpenSlug(open ? null : service.slug)}
              >
                <span>
                  <span className="font-medium">{service.title}</span>
                  <span className="ml-2 text-sm text-[#6f675e]">
                    {service.group} · {service.fromPrice}
                  </span>
                </span>
                <span className="text-sm text-[#6f675e]">{open ? "Свернуть" : "Редактировать"}</span>
              </button>
              {open ? (
                <div className="grid gap-3 border-t border-[#eee6da] p-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm text-[#b85a3e]"
                      onClick={() =>
                        setContent({
                          ...content,
                          services: content.services.filter((_, i) => i !== index),
                        })
                      }
                    >
                      Удалить услугу
                    </button>
                  </div>
                  <Field
                    label="Название"
                    value={service.title}
                    onChange={(v) => updateService(index, { ...service, title: v })}
                  />
                  <Field
                    label="Адрес страницы (slug)"
                    value={service.slug}
                    onChange={(v) => updateService(index, { ...service, slug: slugify(v) || service.slug })}
                  />
                  <RichTextField label="Коротко" value={service.short} onChange={(v) => updateService(index, { ...service, short: v })} />
                  <RichTextField label="Текст на странице" value={service.text} onChange={(v) => updateService(index, { ...service, text: v })} />
                  <MediaField
                    label="Фото карточки услуги (на главной и в списке)"
                    value={service.image}
                    onChange={(image) => updateService(index, { ...service, image })}
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block text-sm">
                      <span className="text-[#6f675e]">Группа</span>
                      <select
                        value={service.group}
                        onChange={(e) => updateService(index, { ...service, group: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#ddd4c6] bg-[#f7f2ea] px-3 py-2"
                      >
                        {content.serviceGroups.map((group) => (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Field label="Цена от" value={service.fromPrice} onChange={(v) => updateService(index, { ...service, fromPrice: v })} />
                    <label className="block text-sm">
                      <span className="text-[#6f675e]">Врач</span>
                      <select
                        value={service.doctor}
                        onChange={(e) => updateService(index, { ...service, doctor: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#ddd4c6] bg-[#f7f2ea] px-3 py-2"
                      >
                        <option value="">Не выбран</option>
                        {content.doctors.map((doctor) => (
                          <option key={doctor.slug} value={doctor.shortName}>
                            {doctor.shortName}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Field label="Длительность" value={d.duration} onChange={(v) => updateService(index, { ...service, details: { ...d, duration: v } })} />
                    <Field label="Визиты" value={d.visits} onChange={(v) => updateService(index, { ...service, details: { ...d, visits: v } })} />
                  </div>
                  <RichTextField label="Доп. текст" value={d.extra} onChange={(v) => updateService(index, { ...service, details: { ...d, extra: v } })} />
                  <LinesField label="Абзацы страницы (каждый с новой строки)" value={d.body} onChange={(v) => updateService(index, { ...service, details: { ...d, body: v } })} />
                  <LinesField label="Как проходит (шаги)" value={d.steps} onChange={(v) => updateService(index, { ...service, details: { ...d, steps: v } })} />
                  <LinesField label="Что входит" value={d.includes} onChange={(v) => updateService(index, { ...service, details: { ...d, includes: v } })} />
                  <LinesField label="Кому подходит" value={d.suitable} onChange={(v) => updateService(index, { ...service, details: { ...d, suitable: v } })} />
                  <LinesField label="Когда другой путь" value={d.notFor} onChange={(v) => updateService(index, { ...service, details: { ...d, notFor: v } })} />
                  <Field label="Что важно знать" value={d.important} multiline onChange={(v) => updateService(index, { ...service, details: { ...d, important: v } })} />
                  <Field label="После визита" value={d.aftercare} multiline onChange={(v) => updateService(index, { ...service, details: { ...d, aftercare: v } })} />
                  <Field label="После визита: ещё" value={d.aftercareMore} multiline onChange={(v) => updateService(index, { ...service, details: { ...d, aftercareMore: v } })} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {d.photoSlots.map((slot, slotIndex) => (
                      <MediaField
                        key={`${service.slug}-${slotIndex}`}
                        label={`${slot.label || `Фото ${slotIndex + 1}`} — загрузить`}
                        value={slot.src}
                        onChange={(src) =>
                          updateService(index, {
                            ...service,
                            details: {
                              ...d,
                              photoSlots: d.photoSlots.map((item, i) => (i === slotIndex ? { ...item, src } : item)),
                            },
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function JournalAdminSection({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: Setter;
}) {
  const [openSlug, setOpenSlug] = useState<string | null>(content.journal[0]?.slug ?? null);

  function update(index: number, next: JournalArticle) {
    setContent({
      ...content,
      journal: content.journal.map((item, i) => (i === index ? next : item)),
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-3xl">Журнал</h2>
          <p className="mt-2 text-sm text-[#6f675e]">Статьи на /zhurnal и их полные страницы.</p>
        </div>
        <button
          type="button"
          className="rounded-xl bg-[#3c5a4c] px-4 py-2 text-sm text-white"
          onClick={() => {
            const slug = `statya-${Date.now()}`;
            setContent({
              ...content,
              journal: [
                ...content.journal,
                {
                  slug,
                  title: "Новая статья",
                  excerpt: "",
                  body: "",
                  image: "",
                  featured: false,
                  tag: "Статья",
                  readTime: "5 минут",
                  hero: { label: "Обложка", hint: "", src: "" },
                  sections: [{ heading: "Раздел", paragraphs: [""], photoLabel: "", photoHint: "", photoSrc: "" }],
                  closing: "",
                  gallery: [
                    { label: "Кадр 1", hint: "", src: "" },
                    { label: "Кадр 2", hint: "", src: "" },
                    { label: "Кадр 3", hint: "", src: "" },
                  ],
                },
              ],
            });
            setOpenSlug(slug);
          }}
        >
          Добавить статью
        </button>
      </div>

      <div className="mt-6 grid gap-3 rounded-2xl border border-[#eee6da] p-4">
        <Field label="Страница журнала: надзаголовок" value={content.journalPage.eyebrow} onChange={(v) => setContent({ ...content, journalPage: { ...content.journalPage, eyebrow: v } })} />
        <Field label="Страница журнала: заголовок" value={content.journalPage.title} onChange={(v) => setContent({ ...content, journalPage: { ...content.journalPage, title: v } })} />
        <Field label="Страница журнала: текст" value={content.journalPage.lead} multiline onChange={(v) => setContent({ ...content, journalPage: { ...content.journalPage, lead: v } })} />
      </div>

      <div className="mt-6 grid gap-3">
        {content.journal.map((article, index) => {
          const open = openSlug === article.slug;
          return (
            <div key={article.slug} className="rounded-2xl border border-[#eee6da]">
              <button type="button" className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left" onClick={() => setOpenSlug(open ? null : article.slug)}>
                <span className="font-medium">{article.title}</span>
                <span className="text-sm text-[#6f675e]">{open ? "Свернуть" : "Редактировать"}</span>
              </button>
              {open ? (
                <div className="grid gap-3 border-t border-[#eee6da] p-4">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={article.featured}
                        onChange={(e) => update(index, { ...article, featured: e.target.checked })}
                      />
                      На главной крупно
                    </label>
                    <button
                      type="button"
                      className="text-sm text-[#b85a3e]"
                      onClick={() => setContent({ ...content, journal: content.journal.filter((_, i) => i !== index) })}
                    >
                      Удалить
                    </button>
                  </div>
                  <Field label="Заголовок" value={article.title} onChange={(v) => update(index, { ...article, title: v })} />
                  <Field
                    label="Адрес страницы (slug)"
                    value={article.slug}
                    onChange={(v) => update(index, { ...article, slug: slugify(v) || article.slug })}
                  />
                  <RichTextField label="Кратко" value={article.excerpt} onChange={(v) => update(index, { ...article, excerpt: v })} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Тег" value={article.tag} onChange={(v) => update(index, { ...article, tag: v })} />
                    <Field label="Время чтения" value={article.readTime} onChange={(v) => update(index, { ...article, readTime: v })} />
                  </div>
                  <MediaField label="Обложка статьи" value={article.hero.src} onChange={(src) => update(index, { ...article, hero: { ...article.hero, src } })} />
                  <RichTextField label="Заключение" value={article.closing} onChange={(v) => update(index, { ...article, closing: v })} />
                  {article.sections.map((section, sIndex) => (
                    <div key={sIndex} className="rounded-xl border border-[#f0e8da] p-3">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Раздел {sIndex + 1}</p>
                        <button
                          type="button"
                          className="text-sm text-[#b85a3e]"
                          onClick={() =>
                            update(index, {
                              ...article,
                              sections: article.sections.filter((_, i) => i !== sIndex),
                            })
                          }
                        >
                          Удалить раздел
                        </button>
                      </div>
                      <div className="mt-2 grid gap-2">
                        <Field
                          label="Заголовок раздела"
                          value={section.heading}
                          onChange={(v) =>
                            update(index, {
                              ...article,
                              sections: article.sections.map((item, i) => (i === sIndex ? { ...item, heading: v } : item)),
                            })
                          }
                        />
                        {section.paragraphs.map((paragraph, pIndex) => (
                          <div key={pIndex} className="grid gap-1">
                            <RichTextField
                              label={`Абзац ${pIndex + 1}`}
                              value={paragraph}
                              onChange={(v) =>
                                update(index, {
                                  ...article,
                                  sections: article.sections.map((item, i) =>
                                    i === sIndex
                                      ? {
                                          ...item,
                                          paragraphs: item.paragraphs.map((p, pi) => (pi === pIndex ? v : p)),
                                        }
                                      : item,
                                  ),
                                })
                              }
                            />
                            <button
                              type="button"
                              className="justify-self-start text-xs text-[#b85a3e]"
                              onClick={() =>
                                update(index, {
                                  ...article,
                                  sections: article.sections.map((item, i) =>
                                    i === sIndex
                                      ? { ...item, paragraphs: item.paragraphs.filter((_, pi) => pi !== pIndex) }
                                      : item,
                                  ),
                                })
                              }
                            >
                              Удалить абзац
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="justify-self-start rounded-lg border border-[#ddd4c6] px-3 py-1.5 text-sm"
                          onClick={() =>
                            update(index, {
                              ...article,
                              sections: article.sections.map((item, i) =>
                                i === sIndex ? { ...item, paragraphs: [...item.paragraphs, ""] } : item,
                              ),
                            })
                          }
                        >
                          Добавить абзац
                        </button>
                        <MediaField
                          label="Фото раздела"
                          value={section.photoSrc}
                          onChange={(photoSrc) =>
                            update(index, {
                              ...article,
                              sections: article.sections.map((item, i) => (i === sIndex ? { ...item, photoSrc } : item)),
                            })
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="justify-self-start rounded-xl border border-[#ddd4c6] px-3 py-1.5 text-sm"
                    onClick={() =>
                      update(index, {
                        ...article,
                        sections: [
                          ...article.sections,
                          { heading: "Новый раздел", paragraphs: [""], photoLabel: "", photoHint: "", photoSrc: "" },
                        ],
                      })
                    }
                  >
                    Добавить раздел
                  </button>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {article.gallery.map((slot, gIndex) => (
                      <MediaField
                        key={gIndex}
                        label={slot.label || `Галерея ${gIndex + 1}`}
                        value={slot.src}
                        onChange={(src) =>
                          update(index, {
                            ...article,
                            gallery: article.gallery.map((item, i) => (i === gIndex ? { ...item, src } : item)),
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PatientsAdminSection({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: Setter;
}) {
  const p = content.patientsPage;
  return (
    <div>
      <h2 className="font-serif text-3xl">Пациентам</h2>
      <p className="mt-2 text-sm text-[#6f675e]">Страница /patsientam: тексты, до/после, подготовка.</p>
      <div className="mt-6 grid gap-3">
        <Field label="Надзаголовок" value={p.eyebrow} onChange={(v) => setContent({ ...content, patientsPage: { ...p, eyebrow: v } })} />
        <Field label="Заголовок" value={p.title} onChange={(v) => setContent({ ...content, patientsPage: { ...p, title: v } })} />
        <Field label="Лид" value={p.lead} multiline onChange={(v) => setContent({ ...content, patientsPage: { ...p, lead: v } })} />
        <Field label="До/после: надзаголовок" value={p.beforeAfterEyebrow} onChange={(v) => setContent({ ...content, patientsPage: { ...p, beforeAfterEyebrow: v } })} />
        <Field label="До/после: заголовок" value={p.beforeAfterTitle} onChange={(v) => setContent({ ...content, patientsPage: { ...p, beforeAfterTitle: v } })} />
        <RichTextField label="До/после: текст" value={p.beforeAfterLead} onChange={(v) => setContent({ ...content, patientsPage: { ...p, beforeAfterLead: v } })} />
        <Field label="Подготовка: надзаголовок" value={p.prepEyebrow} onChange={(v) => setContent({ ...content, patientsPage: { ...p, prepEyebrow: v } })} />
        <Field label="Подготовка: заголовок" value={p.prepTitle} onChange={(v) => setContent({ ...content, patientsPage: { ...p, prepTitle: v } })} />
        <RichTextField label="Подготовка: текст" value={p.prepLead} onChange={(v) => setContent({ ...content, patientsPage: { ...p, prepLead: v } })} />
        <Field label="Формы: заголовок" value={p.formsTitle} onChange={(v) => setContent({ ...content, patientsPage: { ...p, formsTitle: v } })} />
        <RichTextField label="Формы: текст" value={p.formsLead} onChange={(v) => setContent({ ...content, patientsPage: { ...p, formsLead: v } })} />
        <Field label="CTA: заголовок" value={p.ctaTitle} onChange={(v) => setContent({ ...content, patientsPage: { ...p, ctaTitle: v } })} />
        <RichTextField label="CTA: текст" value={p.ctaText} onChange={(v) => setContent({ ...content, patientsPage: { ...p, ctaText: v } })} />
        <LinesField
          label="Пункты анамнеза (чекбоксы)"
          value={content.anamnesisFlags}
          onChange={(anamnesisFlags) => setContent({ ...content, anamnesisFlags })}
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h3 className="font-serif text-xl">Карточки на главной</h3>
        <button
          type="button"
          className="rounded-xl bg-[#3c5a4c] px-3 py-1.5 text-sm text-white"
          onClick={() =>
            setContent({
              ...content,
              patientsCards: [...content.patientsCards, { href: "/patsientam", tag: "Раздел", title: "Новая карточка", text: "" }],
            })
          }
        >
          Добавить
        </button>
      </div>
      <div className="mt-3 grid gap-3">
        {content.patientsCards.map((item, index) => (
          <div key={index} className="grid gap-2 rounded-xl border border-[#eee6da] p-3">
            <Field
              label="Тег"
              value={item.tag}
              onChange={(v) =>
                setContent({
                  ...content,
                  patientsCards: content.patientsCards.map((row, i) => (i === index ? { ...row, tag: v } : row)),
                })
              }
            />
            <Field
              label="Заголовок"
              value={item.title}
              onChange={(v) =>
                setContent({
                  ...content,
                  patientsCards: content.patientsCards.map((row, i) => (i === index ? { ...row, title: v } : row)),
                })
              }
            />
            <RichTextField
              label="Текст"
              value={item.text}
              onChange={(v) =>
                setContent({
                  ...content,
                  patientsCards: content.patientsCards.map((row, i) => (i === index ? { ...row, text: v } : row)),
                })
              }
            />
            <Field
              label="Ссылка"
              value={item.href}
              onChange={(v) =>
                setContent({
                  ...content,
                  patientsCards: content.patientsCards.map((row, i) => (i === index ? { ...row, href: v } : row)),
                })
              }
            />
            <button
              type="button"
              className="justify-self-start text-sm text-[#b85a3e]"
              onClick={() =>
                setContent({
                  ...content,
                  patientsCards: content.patientsCards.filter((_, i) => i !== index),
                })
              }
            >
              Удалить
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl">Работы до и после</h3>
          <p className="mt-1 text-sm text-[#6f675e]">
            Каждый блок — шторка «до/после» на странице /patsientam. Можно добавлять сколько угодно.
          </p>
        </div>
        <button
          type="button"
          className="rounded-xl bg-[#3c5a4c] px-4 py-2 text-sm text-white"
          onClick={() =>
            setContent({
              ...content,
              patientBeforeAfter: [
                ...content.patientBeforeAfter,
                {
                  title: `Работа ${content.patientBeforeAfter.length + 1}`,
                  tag: "Результат",
                  note: "Кратко опишите, что сделали.",
                  before: "",
                  after: "",
                },
              ],
            })
          }
        >
          Добавить работу
        </button>
      </div>
      {content.patientBeforeAfter.length === 0 ? (
        <p className="mt-3 rounded-xl border border-dashed border-[#ddd4c6] px-4 py-6 text-sm text-[#6f675e]">
          Пока нет блоков. Нажмите «Добавить работу», загрузите фото «до» и «после».
        </p>
      ) : null}
      <div className="mt-3 grid gap-3">
        {content.patientBeforeAfter.map((item, index) => {
          const update = (patch: Partial<typeof item>) =>
            setContent({
              ...content,
              patientBeforeAfter: content.patientBeforeAfter.map((row, i) => (i === index ? { ...row, ...patch } : row)),
            });
          const move = (dir: -1 | 1) => {
            const next = [...content.patientBeforeAfter];
            const target = index + dir;
            if (target < 0 || target >= next.length) return;
            [next[index], next[target]] = [next[target], next[index]];
            setContent({ ...content, patientBeforeAfter: next });
          };
          return (
            <div key={index} className="rounded-2xl border border-[#eee6da] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium">
                  Блок {index + 1}
                  {item.title ? ` · ${item.title}` : ""}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button type="button" className="text-sm text-[#6f675e]" onClick={() => move(-1)} disabled={index === 0}>
                    ↑ Выше
                  </button>
                  <button
                    type="button"
                    className="text-sm text-[#6f675e]"
                    onClick={() => move(1)}
                    disabled={index === content.patientBeforeAfter.length - 1}
                  >
                    ↓ Ниже
                  </button>
                  <button
                    type="button"
                    className="text-sm text-[#b85a3e]"
                    onClick={() =>
                      setContent({
                        ...content,
                        patientBeforeAfter: content.patientBeforeAfter.filter((_, i) => i !== index),
                      })
                    }
                  >
                    Удалить блок
                  </button>
                </div>
              </div>
              <div className="mt-3 grid gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Название работы" value={item.title} onChange={(v) => update({ title: v })} />
                  <Field label="Тег (например: Коронка)" value={item.tag} onChange={(v) => update({ tag: v })} />
                </div>
                <Field label="Описание" value={item.note} multiline onChange={(v) => update({ note: v })} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <MediaField label="Фото «До»" value={item.before} onChange={(before) => update({ before })} />
                  <MediaField label="Фото «После»" value={item.after} onChange={(after) => update({ after })} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h3 className="font-serif text-xl">Подготовка к приёму</h3>
        <button
          type="button"
          className="rounded-xl bg-[#3c5a4c] px-3 py-1.5 text-sm text-white"
          onClick={() =>
            setContent({
              ...content,
              visitPrep: [...content.visitPrep, { title: "Новый пункт", text: "" }],
            })
          }
        >
          Добавить
        </button>
      </div>
      <div className="mt-3 grid gap-3">
        {content.visitPrep.map((item, index) => (
          <div key={index} className="grid gap-2 rounded-xl border border-[#eee6da] p-3">
            <Field
              label="Заголовок"
              value={item.title}
              onChange={(v) =>
                setContent({
                  ...content,
                  visitPrep: content.visitPrep.map((row, i) => (i === index ? { ...row, title: v } : row)),
                })
              }
            />
            <Field
              label="Текст"
              value={item.text}
              multiline
              onChange={(v) =>
                setContent({
                  ...content,
                  visitPrep: content.visitPrep.map((row, i) => (i === index ? { ...row, text: v } : row)),
                })
              }
            />
            <button
              type="button"
              className="justify-self-start text-sm text-[#b85a3e]"
              onClick={() => setContent({ ...content, visitPrep: content.visitPrep.filter((_, i) => i !== index) })}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SituationsAdminSection({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: Setter;
}) {
  return (
    <div>
      <h2 className="font-serif text-3xl">Ситуации и шаги визита</h2>
      <p className="mt-2 text-sm text-[#6f675e]">Блоки на главной: «ваш случай» и «что будет на первой встрече».</p>

      <div className="mt-6 flex items-center justify-between">
        <h3 className="font-serif text-xl">Ситуации</h3>
        <button
          type="button"
          className="rounded-xl bg-[#3c5a4c] px-3 py-1.5 text-sm text-white"
          onClick={() =>
            setContent({
              ...content,
              situations: [...content.situations, { tag: "Сейчас", label: "Новый запрос", hint: "", href: "/uslugi" }],
            })
          }
        >
          Добавить
        </button>
      </div>
      <div className="mt-3 grid gap-3">
        {content.situations.map((item, index) => (
          <div key={index} className="grid gap-2 rounded-xl border border-[#eee6da] p-3 sm:grid-cols-2">
            <Field
              label="Тег"
              value={item.tag}
              onChange={(v) =>
                setContent({
                  ...content,
                  situations: content.situations.map((row, i) => (i === index ? { ...row, tag: v } : row)),
                })
              }
            />
            <Field
              label="Заголовок"
              value={item.label}
              onChange={(v) =>
                setContent({
                  ...content,
                  situations: content.situations.map((row, i) => (i === index ? { ...row, label: v } : row)),
                })
              }
            />
            <Field
              label="Подсказка"
              value={item.hint}
              onChange={(v) =>
                setContent({
                  ...content,
                  situations: content.situations.map((row, i) => (i === index ? { ...row, hint: v } : row)),
                })
              }
            />
            <Field
              label="Ссылка"
              value={item.href}
              onChange={(v) =>
                setContent({
                  ...content,
                  situations: content.situations.map((row, i) => (i === index ? { ...row, href: v } : row)),
                })
              }
            />
            <button
              type="button"
              className="text-sm text-[#b85a3e] sm:col-span-2"
              onClick={() => setContent({ ...content, situations: content.situations.filter((_, i) => i !== index) })}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h3 className="font-serif text-xl">Шаги первого визита</h3>
        <button
          type="button"
          className="rounded-xl bg-[#3c5a4c] px-3 py-1.5 text-sm text-white"
          onClick={() =>
            setContent({
              ...content,
              visitSteps: [
                ...content.visitSteps,
                {
                  n: String(content.visitSteps.length + 1),
                  label: `Шаг ${content.visitSteps.length + 1}`,
                  title: "Новый шаг",
                  text: "",
                },
              ],
            })
          }
        >
          Добавить
        </button>
      </div>
      <div className="mt-3 grid gap-3">
        {content.visitSteps.map((item, index) => (
          <div key={index} className="grid gap-2 rounded-xl border border-[#eee6da] p-3">
            <Field
              label="Метка"
              value={item.label}
              onChange={(v) =>
                setContent({
                  ...content,
                  visitSteps: content.visitSteps.map((row, i) => (i === index ? { ...row, label: v } : row)),
                })
              }
            />
            <Field
              label="Заголовок"
              value={item.title}
              onChange={(v) =>
                setContent({
                  ...content,
                  visitSteps: content.visitSteps.map((row, i) => (i === index ? { ...row, title: v } : row)),
                })
              }
            />
            <Field
              label="Текст"
              value={item.text}
              multiline
              onChange={(v) =>
                setContent({
                  ...content,
                  visitSteps: content.visitSteps.map((row, i) => (i === index ? { ...row, text: v } : row)),
                })
              }
            />
            <button
              type="button"
              className="justify-self-start text-sm text-[#b85a3e]"
              onClick={() => setContent({ ...content, visitSteps: content.visitSteps.filter((_, i) => i !== index) })}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
