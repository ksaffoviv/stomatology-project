"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { defaultTheme } from "@/lib/cms/defaults";
import type {
  BookingRequest,
  Doctor,
  FaqItem,
  NavItem,
  Offer,
  PricePreview,
  PriceRow,
  ReviewItem,
  ReviewSource,
  SiteContent,
  TextBlock,
} from "@/lib/cms/types";
import {
  ColorField,
  Field,
  MediaField,
  RichTextField,
} from "./admin-fields";
import {
  JournalAdminSection,
  PatientsAdminSection,
  ServicesAdminSection,
  SituationsAdminSection,
} from "./page-sections";

type Tab =
  | "theme"
  | "nav"
  | "contacts"
  | "photos"
  | "texts"
  | "blocks"
  | "services"
  | "situations"
  | "patients"
  | "journal"
  | "prices"
  | "doctors"
  | "offers"
  | "faq"
  | "reviews"
  | "bookings";

const tabs: { id: Tab; label: string }[] = [
  { id: "theme", label: "Цвета и кнопки" },
  { id: "nav", label: "Меню и ссылки" },
  { id: "photos", label: "Фото и видео" },
  { id: "texts", label: "Тексты страниц" },
  { id: "services", label: "Услуги" },
  { id: "situations", label: "Ситуации и шаги" },
  { id: "patients", label: "Пациентам" },
  { id: "journal", label: "Журнал / статьи" },
  { id: "blocks", label: "Новые блоки" },
  { id: "prices", label: "Прайс" },
  { id: "doctors", label: "Врачи" },
  { id: "offers", label: "Акции" },
  { id: "contacts", label: "Контакты" },
  { id: "faq", label: "Вопросы" },
  { id: "reviews", label: "Отзывы" },
  { id: "bookings", label: "Заявки" },
];

export function AdminApp() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("theme");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => setContent(data as SiteContent));
    fetch("/api/admin/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data as BookingRequest[]));
  }, []);

  async function save() {
    if (!content) return;
    setSaving(true);
    setStatus("");
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    if (!res.ok) {
      setStatus("Не удалось сохранить");
      return;
    }
    setStatus("Сохранено. Обновите сайт (F5), чтобы увидеть изменения.");
    router.refresh();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (!content) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f4f0e8] text-sm">Загрузка админки…</div>;
  }

  const t = content.theme;

  return (
    <div className="min-h-screen bg-[#efe8dc] text-[#1c1814]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <aside className="lg:w-64 lg:shrink-0">
          <div className="rounded-3xl bg-white p-5 lg:sticky lg:top-4">
            <p className="text-xs tracking-[0.16em] text-[#6f675e] uppercase">Админка</p>
            <h1 className="mt-1 font-serif text-2xl">Две улыбки</h1>
            <p className="mt-2 text-xs leading-relaxed text-[#6f675e]">
              Фото, статьи, цвета, тексты, услуги и прайс — всё здесь. Не забудьте нажать «Сохранить».
            </p>
            <nav className="mt-5 grid max-h-[55vh] gap-1 overflow-y-auto pr-1">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`rounded-xl px-3 py-2 text-left text-sm ${
                    tab === item.id ? "bg-[#3c5a4c] text-[#f7f2ea]" : "hover:bg-[#f7f2ea]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-5 grid gap-2">
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="rounded-xl py-2.5 text-sm text-white disabled:opacity-60"
                style={{ background: t.terracotta }}
              >
                {saving ? "Сохранение…" : "Сохранить изменения"}
              </button>
              <a href="/" target="_blank" className="rounded-xl border border-[#ddd4c6] py-2.5 text-center text-sm">
                Открыть сайт
              </a>
              <button type="button" onClick={logout} className="text-sm text-[#6f675e]">
                Выйти
              </button>
            </div>
            {status ? <p className="mt-3 text-xs leading-relaxed text-[#3c5a4c]">{status}</p> : null}
          </div>
        </aside>

        <main className="min-w-0 flex-1 rounded-3xl bg-white p-5 sm:p-8">
          {tab === "theme" ? <ThemeSection content={content} setContent={setContent} /> : null}
          {tab === "nav" ? <NavSection content={content} setContent={setContent} /> : null}
          {tab === "photos" ? <PhotosSection content={content} setContent={setContent} /> : null}
          {tab === "texts" ? <TextsSection content={content} setContent={setContent} /> : null}
          {tab === "services" ? <ServicesAdminSection content={content} setContent={setContent} /> : null}
          {tab === "situations" ? <SituationsAdminSection content={content} setContent={setContent} /> : null}
          {tab === "patients" ? <PatientsAdminSection content={content} setContent={setContent} /> : null}
          {tab === "journal" ? <JournalAdminSection content={content} setContent={setContent} /> : null}
          {tab === "blocks" ? <BlocksSection content={content} setContent={setContent} /> : null}
          {tab === "prices" ? <PricesSection content={content} setContent={setContent} /> : null}
          {tab === "doctors" ? <DoctorsSection content={content} setContent={setContent} /> : null}
          {tab === "offers" ? <OffersSection content={content} setContent={setContent} /> : null}
          {tab === "contacts" ? <ContactsSection content={content} setContent={setContent} /> : null}
          {tab === "faq" ? <FaqSection content={content} setContent={setContent} /> : null}
          {tab === "reviews" ? <ReviewsSection content={content} setContent={setContent} /> : null}
          {tab === "bookings" ? <BookingsSection bookings={bookings} /> : null}
        </main>
      </div>
    </div>
  );
}

function ThemeSection({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
}) {
  const t = content.theme;
  function set(key: keyof SiteContent["theme"], value: string) {
    setContent({ ...content, theme: { ...content.theme, [key]: value } });
  }
  return (
    <div>
      <h2 className="font-serif text-3xl">Цвета, кнопки и ссылки</h2>
      <p className="mt-2 text-sm text-[#6f675e]">
        Фон, кнопки «Записаться», цвет текста и ссылок. После сохранения обновите сайт.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <ColorField label="Фон сайта" value={t.paper} onChange={(v) => set("paper", v)} />
        <ColorField label="Кремовые блоки" value={t.cream} onChange={(v) => set("cream", v)} />
        <ColorField label="Кнопки шапки / ссылки (sage)" value={t.sage} onChange={(v) => set("sage", v)} />
        <ColorField label="Тёмный sage (hover)" value={t.sageDark} onChange={(v) => set("sageDark", v)} />
        <ColorField label="Кнопки «Записаться»" value={t.terracotta} onChange={(v) => set("terracotta", v)} />
        <ColorField label="Терракота тёмная" value={t.terracottaDark} onChange={(v) => set("terracottaDark", v)} />
        <ColorField label="Основной текст" value={t.ink} onChange={(v) => set("ink", v)} />
        <ColorField label="Текст мягкий" value={t.inkSoft} onChange={(v) => set("inkSoft", v)} />
        <ColorField label="Подписи / muted" value={t.muted} onChange={(v) => set("muted", v)} />
        <ColorField label="Линии и рамки" value={t.line} onChange={(v) => set("line", v)} />
      </div>
      <button
        type="button"
        className="mt-6 rounded-xl border border-[#ddd4c6] px-4 py-2 text-sm"
        onClick={() => setContent({ ...content, theme: { ...defaultTheme } })}
      >
        Вернуть исходные цвета
      </button>
      <div className="mt-8 rounded-2xl p-6" style={{ background: t.paper, color: t.ink }}>
        <p className="text-sm" style={{ color: t.muted }}>
          Предпросмотр кнопок и ссылок
        </p>
        <p className="mt-2 text-sm" style={{ color: t.inkSoft }}>
          Мягкий текст абзаца на сайте
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <span className="rounded-xl px-5 py-3 text-sm text-white" style={{ background: t.terracotta }}>
            Записаться
          </span>
          <span className="rounded-xl px-5 py-3 text-sm text-white" style={{ background: t.sage }}>
            Кнопка шапки
          </span>
          <span className="rounded-xl px-5 py-3 text-sm" style={{ background: t.cream, color: t.ink }}>
            Блок
          </span>
          <span className="px-2 py-3 text-sm underline" style={{ color: t.sage }}>
            Пример ссылки
          </span>
        </div>
      </div>
    </div>
  );
}

function NavSection({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
}) {
  function update(next: NavItem[]) {
    setContent({ ...content, nav: next });
  }
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-3xl">Меню и ссылки</h2>
          <p className="mt-2 text-sm text-[#6f675e]">Пункты в шапке и подвале сайта.</p>
        </div>
        <button
          type="button"
          className="rounded-xl bg-[#3c5a4c] px-4 py-2 text-sm text-white"
          onClick={() => update([...content.nav, { href: "/", label: "Новый пункт" }])}
        >
          Добавить пункт
        </button>
      </div>
      <div className="mt-6 grid gap-3">
        {content.nav.map((item, index) => (
          <div key={`${item.href}-${index}`} className="grid gap-2 rounded-xl border border-[#eee6da] p-3 sm:grid-cols-[1fr_1fr_auto]">
            <Field
              label="Название"
              value={item.label}
              onChange={(v) => update(content.nav.map((row, i) => (i === index ? { ...row, label: v } : row)))}
            />
            <Field
              label="Ссылка (например /uslugi)"
              value={item.href}
              onChange={(v) => update(content.nav.map((row, i) => (i === index ? { ...row, href: v } : row)))}
            />
            <button type="button" className="self-end text-sm text-[#b85a3e]" onClick={() => update(content.nav.filter((_, i) => i !== index))}>
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhotosSection({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
}) {
  const media = content.media;
  function set(key: keyof SiteContent["media"], value: string) {
    setContent({ ...content, media: { ...media, [key]: value } });
  }
  return (
    <div>
      <h2 className="font-serif text-3xl">Фото и видео</h2>
      <p className="mt-2 text-sm text-[#6f675e]">
        Общие медиа главной. Фото услуг, статей, врачей и «до/после» — в разделах Услуги, Журнал, Врачи, Пациентам.
      </p>
      <div className="mt-6 grid gap-4">
        <MediaField
          label="Логотип"
          value={content.clinic.logo}
          onChange={(logo) => setContent({ ...content, clinic: { ...content.clinic, logo } })}
        />
        <MediaField label="Видео в шапке главной" value={media.heroVideo} onChange={(v) => set("heroVideo", v)} accept="video/mp4,video/webm,image/*" />
        <MediaField label="Постер видео в шапке" value={media.heroPoster} onChange={(v) => set("heroPoster", v)} />
        <MediaField label="Видео блока «О клинике»" value={media.clinicVideo} onChange={(v) => set("clinicVideo", v)} accept="video/mp4,video/webm,image/*" />
        <MediaField label="Постер ролика клиники" value={media.clinicPoster} onChange={(v) => set("clinicPoster", v)} />
        <Field label="Заголовок ролика клиники" value={media.clinicVideoTitle} onChange={(v) => set("clinicVideoTitle", v)} />
        <Field label="Подпись к ролику" value={media.clinicCaption} onChange={(v) => set("clinicCaption", v)} multiline />
        <MediaField
          label="Фото карточек услуг (если у услуги нет своего фото)"
          value={media.serviceCardImage}
          onChange={(v) => set("serviceCardImage", v)}
        />
        <MediaField label="Широкое фото журнала на главной (запасное)" value={media.journalWide} onChange={(v) => set("journalWide", v)} />
        <MediaField label="Вертикальное фото журнала на главной (запасное)" value={media.journalTall} onChange={(v) => set("journalTall", v)} />
      </div>
    </div>
  );
}

function TextsSection({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
}) {
  const home = content.home;
  function setHome(key: keyof SiteContent["home"], value: string) {
    setContent({ ...content, home: { ...home, [key]: value } });
  }
  return (
    <div>
      <h2 className="font-serif text-3xl">Тексты и заголовки</h2>
      <p className="mt-2 text-sm text-[#6f675e]">
        Редактируйте тексты блоков. Для абзацев доступны жирный, курсив и цветовое выделение.
      </p>
      <div className="mt-6 grid gap-4">
        <SectionTitle>Главная — шапка</SectionTitle>
        <Field label="Надзаголовок" value={home.kicker} onChange={(v) => setHome("kicker", v)} />
        <RichTextField label="Заголовок главной" value={home.title} onChange={(v) => setHome("title", v)} />
        <RichTextField label="Лид главной" value={home.lead} onChange={(v) => setHome("lead", v)} />
        <Field label="Часы в карточке" value={home.hoursShort} onChange={(v) => setHome("hoursShort", v)} />

        <SectionTitle>Первая встреча</SectionTitle>
        <Field label="Надзаголовок" value={home.visitEyebrow} onChange={(v) => setHome("visitEyebrow", v)} />
        <Field label="Заголовок" value={home.visitTitle} onChange={(v) => setHome("visitTitle", v)} />
        <RichTextField label="Текст" value={home.visitLead} onChange={(v) => setHome("visitLead", v)} />
        <RichTextField label="Нижняя подпись" value={home.visitFooter} onChange={(v) => setHome("visitFooter", v)} />

        <SectionTitle>Ситуации</SectionTitle>
        <Field label="Надзаголовок" value={home.situationsEyebrow} onChange={(v) => setHome("situationsEyebrow", v)} />
        <Field label="Заголовок" value={home.situationsTitle} onChange={(v) => setHome("situationsTitle", v)} />
        <RichTextField label="Текст" value={home.situationsLead} onChange={(v) => setHome("situationsLead", v)} />
        <Field label="Боковой блок: заголовок" value={home.situationsAsideTitle} onChange={(v) => setHome("situationsAsideTitle", v)} />
        <RichTextField label="Боковой блок: текст" value={home.situationsAside} onChange={(v) => setHome("situationsAside", v)} />

        <SectionTitle>Семья / о формате</SectionTitle>
        <Field label="Надзаголовок" value={home.familyEyebrow} onChange={(v) => setHome("familyEyebrow", v)} />
        <Field label="Заголовок" value={home.familyTitle} onChange={(v) => setHome("familyTitle", v)} />
        <RichTextField label="Абзац 1" value={home.familyP1} onChange={(v) => setHome("familyP1", v)} />
        <RichTextField label="Абзац 2" value={home.familyP2} onChange={(v) => setHome("familyP2", v)} />
        <Field label="Карточка: заголовок" value={home.familyBoxTitle} onChange={(v) => setHome("familyBoxTitle", v)} />
        <RichTextField label="Карточка: текст" value={home.familyBoxText} onChange={(v) => setHome("familyBoxText", v)} />
        <Field label="Боковой: заголовок" value={home.familyAsideTitle} onChange={(v) => setHome("familyAsideTitle", v)} />
        <RichTextField label="Боковой: текст" value={home.familyAside} onChange={(v) => setHome("familyAside", v)} />
        <RichTextField label="Нижняя подпись" value={home.familyFooter} onChange={(v) => setHome("familyFooter", v)} />

        <SectionTitle>Услуги на главной</SectionTitle>
        <Field label="Надзаголовок" value={home.servicesEyebrow} onChange={(v) => setHome("servicesEyebrow", v)} />
        <Field label="Заголовок" value={home.servicesTitle} onChange={(v) => setHome("servicesTitle", v)} />
        <RichTextField label="Текст" value={home.servicesLead} onChange={(v) => setHome("servicesLead", v)} />

        <SectionTitle>Врачи на главной</SectionTitle>
        <Field label="Надзаголовок" value={home.teamEyebrow} onChange={(v) => setHome("teamEyebrow", v)} />
        <Field label="Заголовок" value={home.teamTitle} onChange={(v) => setHome("teamTitle", v)} />
        <RichTextField label="Текст" value={home.teamLead} onChange={(v) => setHome("teamLead", v)} />
        <Field label="Боковой: заголовок" value={home.teamAsideTitle} onChange={(v) => setHome("teamAsideTitle", v)} />
        <RichTextField label="Боковой: текст" value={home.teamAside} onChange={(v) => setHome("teamAside", v)} />

        <SectionTitle>Акции на главной</SectionTitle>
        <Field label="Надзаголовок" value={home.offersEyebrow} onChange={(v) => setHome("offersEyebrow", v)} />
        <Field label="Заголовок" value={home.offersTitle} onChange={(v) => setHome("offersTitle", v)} />
        <RichTextField label="Текст" value={home.offersLead} onChange={(v) => setHome("offersLead", v)} />

        <SectionTitle>Цены на главной</SectionTitle>
        <Field label="Надзаголовок" value={home.pricesEyebrow} onChange={(v) => setHome("pricesEyebrow", v)} />
        <Field label="Заголовок" value={home.pricesTitle} onChange={(v) => setHome("pricesTitle", v)} />
        <RichTextField label="Текст" value={home.pricesLead} onChange={(v) => setHome("pricesLead", v)} />
        <Field label="Боковой: заголовок" value={home.pricesAsideTitle} onChange={(v) => setHome("pricesAsideTitle", v)} />
        <RichTextField label="Боковой: текст" value={home.pricesAside} onChange={(v) => setHome("pricesAside", v)} />
        <Field label="Карточка: заголовок" value={home.pricesCardTitle} onChange={(v) => setHome("pricesCardTitle", v)} />
        <RichTextField label="Карточка: текст" value={home.pricesCardText} onChange={(v) => setHome("pricesCardText", v)} />

        <SectionTitle>Пациентам и журнал на главной</SectionTitle>
        <Field label="Пациентам: надзаголовок" value={home.patientsEyebrow} onChange={(v) => setHome("patientsEyebrow", v)} />
        <Field label="Пациентам: заголовок" value={home.patientsTitle} onChange={(v) => setHome("patientsTitle", v)} />
        <RichTextField label="Пациентам: текст" value={home.patientsLead} onChange={(v) => setHome("patientsLead", v)} />
        <Field label="Журнал: надзаголовок" value={home.journalEyebrow} onChange={(v) => setHome("journalEyebrow", v)} />
        <Field label="Журнал: заголовок" value={home.journalTitle} onChange={(v) => setHome("journalTitle", v)} />

        <SectionTitle>FAQ и нижний призыв</SectionTitle>
        <Field label="FAQ: заголовок" value={home.faqTitle} onChange={(v) => setHome("faqTitle", v)} />
        <Field label="Нижний призыв: заголовок" value={home.ctaTitle} onChange={(v) => setHome("ctaTitle", v)} />
        <RichTextField label="Нижний призыв: текст" value={home.ctaText} onChange={(v) => setHome("ctaText", v)} />

        <SectionTitle>Страница «О клинике»</SectionTitle>
        <Field label="Надзаголовок" value={content.about.eyebrow} onChange={(v) => setContent({ ...content, about: { ...content.about, eyebrow: v } })} />
        <Field label="Заголовок" value={content.about.title} onChange={(v) => setContent({ ...content, about: { ...content.about, title: v } })} />
        <RichTextField label="Текст" value={content.about.lead} onChange={(v) => setContent({ ...content, about: { ...content.about, lead: v } })} />
        <Field
          label="Пункты (каждый с новой строки)"
          value={content.about.highlights.join("\n")}
          onChange={(v) => setContent({ ...content, about: { ...content.about, highlights: v.split("\n").filter(Boolean) } })}
          multiline
        />
        <RichTextField label="Примечание" value={content.about.note} onChange={(v) => setContent({ ...content, about: { ...content.about, note: v } })} />

        <SectionTitle>Страницы: цены, врачи, контакты</SectionTitle>
        <Field label="Цены: надзаголовок" value={content.pricesPage.eyebrow} onChange={(v) => setContent({ ...content, pricesPage: { ...content.pricesPage, eyebrow: v } })} />
        <Field label="Цены: заголовок" value={content.pricesPage.title} onChange={(v) => setContent({ ...content, pricesPage: { ...content.pricesPage, title: v } })} />
        <RichTextField label="Цены: текст" value={content.pricesPage.lead} onChange={(v) => setContent({ ...content, pricesPage: { ...content.pricesPage, lead: v } })} />
        <Field label="Цены: заголовок заметки" value={content.pricesPage.noteTitle} onChange={(v) => setContent({ ...content, pricesPage: { ...content.pricesPage, noteTitle: v } })} />
        <RichTextField label="Цены: текст заметки" value={content.pricesPage.noteText} onChange={(v) => setContent({ ...content, pricesPage: { ...content.pricesPage, noteText: v } })} />
        <Field label="Врачи: надзаголовок" value={content.doctorsPage.eyebrow} onChange={(v) => setContent({ ...content, doctorsPage: { ...content.doctorsPage, eyebrow: v } })} />
        <Field label="Врачи: заголовок" value={content.doctorsPage.title} onChange={(v) => setContent({ ...content, doctorsPage: { ...content.doctorsPage, title: v } })} />
        <RichTextField label="Врачи: текст" value={content.doctorsPage.lead} onChange={(v) => setContent({ ...content, doctorsPage: { ...content.doctorsPage, lead: v } })} />
        <Field label="Контакты: надзаголовок" value={content.contactsPage.eyebrow} onChange={(v) => setContent({ ...content, contactsPage: { ...content.contactsPage, eyebrow: v } })} />
        <Field label="Контакты: заголовок" value={content.contactsPage.title} onChange={(v) => setContent({ ...content, contactsPage: { ...content.contactsPage, title: v } })} />
        <RichTextField label="Контакты: текст" value={content.contactsPage.lead} onChange={(v) => setContent({ ...content, contactsPage: { ...content.contactsPage, lead: v } })} />
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="mt-4 border-t border-[#eee6da] pt-6 font-serif text-xl first:mt-0 first:border-0 first:pt-0">{children}</h3>;
}

function BlocksSection({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
}) {
  const blocks = content.home.extraBlocks;
  function update(next: TextBlock[]) {
    setContent({ ...content, home: { ...content.home, extraBlocks: next } });
  }
  function add() {
    update([
      ...blocks,
      {
        id: `block-${Date.now()}`,
        title: "Новый блок",
        text: "Напишите текст, который появится на главной.",
        image: "",
        visible: true,
      },
    ]);
  }
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl">Новые блоки текста</h2>
          <p className="mt-2 text-sm text-[#6f675e]">Появятся на главной перед картой и отзывами.</p>
        </div>
        <button type="button" onClick={add} className="rounded-xl bg-[#3c5a4c] px-4 py-2 text-sm text-white">
          Добавить блок
        </button>
      </div>
      <div className="mt-6 grid gap-4">
        {blocks.length === 0 ? <p className="text-sm text-[#6f675e]">Пока нет дополнительных блоков.</p> : null}
        {blocks.map((block, index) => (
          <div key={block.id} className="rounded-2xl border border-[#eee6da] p-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={block.visible}
                  onChange={(e) => update(blocks.map((item, i) => (i === index ? { ...item, visible: e.target.checked } : item)))}
                />
                Показывать на сайте
              </label>
              <button type="button" className="text-sm text-[#b85a3e]" onClick={() => update(blocks.filter((_, i) => i !== index))}>
                Удалить
              </button>
            </div>
            <div className="mt-3 grid gap-3">
              <Field label="Заголовок" value={block.title} onChange={(v) => update(blocks.map((item, i) => (i === index ? { ...item, title: v } : item)))} />
              <RichTextField label="Текст" value={block.text} onChange={(v) => update(blocks.map((item, i) => (i === index ? { ...item, text: v } : item)))} />
              <MediaField label="Фото блока (необязательно)" value={block.image} onChange={(v) => update(blocks.map((item, i) => (i === index ? { ...item, image: v } : item)))} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PricesSection({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
}) {
  function movePrice(index: number, dir: -1 | 1) {
    const next = [...content.prices];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setContent({ ...content, prices: next });
  }
  return (
    <div>
      <h2 className="font-serif text-3xl">Прайс</h2>
      <p className="mt-2 text-sm text-[#6f675e]">Полный список на странице «Цены» и карточки-ориентир на главной.</p>

      <div className="mt-6 grid gap-3 rounded-2xl border border-[#eee6da] p-4">
        <Field
          label="Страница цен: заголовок заметки"
          value={content.pricesPage.noteTitle}
          onChange={(v) => setContent({ ...content, pricesPage: { ...content.pricesPage, noteTitle: v } })}
        />
        <RichTextField
          label="Страница цен: текст заметки"
          value={content.pricesPage.noteText}
          onChange={(v) => setContent({ ...content, pricesPage: { ...content.pricesPage, noteText: v } })}
        />
        <Field
          label="Текст кнопки скачивания прайса"
          value={content.pricesPage.downloadLabel}
          onChange={(v) => setContent({ ...content, pricesPage: { ...content.pricesPage, downloadLabel: v } })}
        />
        <Field
          label="Ссылка на файл прайса (по умолчанию /api/prices/download)"
          value={content.pricesPage.downloadHref}
          onChange={(v) => setContent({ ...content, pricesPage: { ...content.pricesPage, downloadHref: v } })}
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h3 className="font-serif text-xl">Строки прайса</h3>
        <button
          type="button"
          className="rounded-xl bg-[#3c5a4c] px-3 py-1.5 text-sm text-white"
          onClick={() => setContent({ ...content, prices: [...content.prices, { title: "Новая позиция", note: "", price: "0 ₽" }] })}
        >
          Добавить строку
        </button>
      </div>
      <div className="mt-3 grid gap-3">
        {content.prices.map((row, index) => (
          <PriceRowEditor
            key={`${row.title}-${index}`}
            row={row}
            onChange={(next) => setContent({ ...content, prices: content.prices.map((item, i) => (i === index ? next : item)) })}
            onRemove={() => setContent({ ...content, prices: content.prices.filter((_, i) => i !== index) })}
            onUp={() => movePrice(index, -1)}
            onDown={() => movePrice(index, 1)}
          />
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <h3 className="font-serif text-xl">Карточки на главной</h3>
        <button
          type="button"
          className="rounded-xl bg-[#3c5a4c] px-3 py-1.5 text-sm text-white"
          onClick={() =>
            setContent({
              ...content,
              pricePreview: [...content.pricePreview, { tag: "Новое", title: "Услуга", text: "", price: "0 ₽" }],
            })
          }
        >
          Добавить карточку
        </button>
      </div>
      <div className="mt-3 grid gap-3">
        {content.pricePreview.map((row, index) => (
          <PreviewEditor
            key={`${row.title}-${index}`}
            row={row}
            onChange={(next) =>
              setContent({ ...content, pricePreview: content.pricePreview.map((item, i) => (i === index ? next : item)) })
            }
            onRemove={() => setContent({ ...content, pricePreview: content.pricePreview.filter((_, i) => i !== index) })}
          />
        ))}
      </div>
    </div>
  );
}

function PriceRowEditor({
  row,
  onChange,
  onRemove,
  onUp,
  onDown,
}: {
  row: PriceRow;
  onChange: (row: PriceRow) => void;
  onRemove: () => void;
  onUp: () => void;
  onDown: () => void;
}) {
  return (
    <div className="grid gap-2 rounded-xl border border-[#eee6da] p-3 sm:grid-cols-[1fr_1fr_8rem_auto]">
      <input
        className="rounded-lg border border-[#ddd4c6] bg-[#f7f2ea] px-3 py-2 text-sm"
        placeholder="Название"
        value={row.title}
        onChange={(e) => onChange({ ...row, title: e.target.value })}
      />
      <input
        className="rounded-lg border border-[#ddd4c6] bg-[#f7f2ea] px-3 py-2 text-sm"
        placeholder="Пояснение"
        value={row.note}
        onChange={(e) => onChange({ ...row, note: e.target.value })}
      />
      <input
        className="rounded-lg border border-[#ddd4c6] bg-[#f7f2ea] px-3 py-2 text-sm"
        placeholder="Цена"
        value={row.price}
        onChange={(e) => onChange({ ...row, price: e.target.value })}
      />
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="text-sm text-[#6f675e]" onClick={onUp}>
          ↑
        </button>
        <button type="button" className="text-sm text-[#6f675e]" onClick={onDown}>
          ↓
        </button>
        <button type="button" className="text-sm text-[#b85a3e]" onClick={onRemove}>
          Удалить
        </button>
      </div>
    </div>
  );
}

function PreviewEditor({
  row,
  onChange,
  onRemove,
}: {
  row: PricePreview;
  onChange: (row: PricePreview) => void;
  onRemove: () => void;
}) {
  return (
    <div className="grid gap-2 rounded-xl border border-[#eee6da] p-3">
      <div className="grid gap-2 sm:grid-cols-3">
        <input className="rounded-lg border border-[#ddd4c6] bg-[#f7f2ea] px-3 py-2 text-sm" value={row.tag} onChange={(e) => onChange({ ...row, tag: e.target.value })} />
        <input className="rounded-lg border border-[#ddd4c6] bg-[#f7f2ea] px-3 py-2 text-sm" value={row.title} onChange={(e) => onChange({ ...row, title: e.target.value })} />
        <input className="rounded-lg border border-[#ddd4c6] bg-[#f7f2ea] px-3 py-2 text-sm" value={row.price} onChange={(e) => onChange({ ...row, price: e.target.value })} />
      </div>
      <textarea className="rounded-lg border border-[#ddd4c6] bg-[#f7f2ea] px-3 py-2 text-sm" rows={2} value={row.text} onChange={(e) => onChange({ ...row, text: e.target.value })} />
      <button type="button" className="justify-self-start text-sm text-[#b85a3e]" onClick={onRemove}>
        Удалить карточку
      </button>
    </div>
  );
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-zа-я0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || `vrach-${Date.now()}`
  );
}

function DoctorsSection({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
}) {
  function update(index: number, next: Doctor) {
    setContent({ ...content, doctors: content.doctors.map((item, i) => (i === index ? next : item)) });
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl">Врачи</h2>
        <button
          type="button"
          className="rounded-xl bg-[#3c5a4c] px-3 py-1.5 text-sm text-white"
          onClick={() =>
            setContent({
              ...content,
              doctors: [
                ...content.doctors,
                {
                  slug: `vrach-${Date.now()}`,
                  shortName: "Врач",
                  name: "Новый врач",
                  role: "Стоматолог",
                  titleLine: "",
                  specialties: [],
                  experience: "",
                  focus: "",
                  cardNote: "",
                  bio: "",
                  accepts: "Только взрослые",
                  photo: "",
                  video: "",
                },
              ],
            })
          }
        >
          Добавить врача
        </button>
      </div>
      <div className="mt-6 grid gap-5">
        {content.doctors.map((doctor, index) => (
          <div key={doctor.slug} className="rounded-2xl border border-[#eee6da] p-4">
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-[#b85a3e]"
                onClick={() => setContent({ ...content, doctors: content.doctors.filter((_, i) => i !== index) })}
              >
                Удалить
              </button>
            </div>
            <div className="grid gap-3">
              <Field label="Имя" value={doctor.name} onChange={(v) => update(index, { ...doctor, name: v })} />
              <Field label="Адрес страницы (slug)" value={doctor.slug} onChange={(v) => update(index, { ...doctor, slug: slugify(v) || doctor.slug })} />
              <Field label="Кратко в заявке" value={doctor.shortName} onChange={(v) => update(index, { ...doctor, shortName: v })} />
              <Field label="Роль" value={doctor.role} onChange={(v) => update(index, { ...doctor, role: v })} />
              <Field label="Специализация" value={doctor.titleLine} onChange={(v) => update(index, { ...doctor, titleLine: v })} />
              <Field
                label="Теги через запятую"
                value={doctor.specialties.join(", ")}
                onChange={(v) => update(index, { ...doctor, specialties: v.split(",").map((s) => s.trim()).filter(Boolean) })}
              />
              <Field label="Стаж" value={doctor.experience} onChange={(v) => update(index, { ...doctor, experience: v })} />
              <Field label="Фокус / направление" value={doctor.focus} onChange={(v) => update(index, { ...doctor, focus: v })} multiline />
              <Field label="Кого принимает" value={doctor.accepts} onChange={(v) => update(index, { ...doctor, accepts: v })} />
              <RichTextField label="Текст на карточке" value={doctor.cardNote} onChange={(v) => update(index, { ...doctor, cardNote: v })} />
              <RichTextField label="Биография" value={doctor.bio} onChange={(v) => update(index, { ...doctor, bio: v })} />
              <MediaField label="Фото врача" value={doctor.photo} onChange={(v) => update(index, { ...doctor, photo: v })} />
              <MediaField label="Видео врача (необязательно)" value={doctor.video} onChange={(v) => update(index, { ...doctor, video: v })} accept="video/mp4,video/webm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OffersSection({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
}) {
  function update(index: number, next: Offer) {
    setContent({ ...content, offers: content.offers.map((item, i) => (i === index ? next : item)) });
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl">Акции</h2>
          <p className="mt-2 text-sm text-[#6f675e]">Баннеры и тексты акций на главной.</p>
        </div>
        <button
          type="button"
          className="rounded-xl bg-[#3c5a4c] px-3 py-1.5 text-sm text-white"
          onClick={() =>
            setContent({
              ...content,
              offers: [...content.offers, { tag: "Акция", title: "Новая акция", text: "", price: "", hint: "", image: "" }],
            })
          }
        >
          Добавить
        </button>
      </div>
      <div className="mt-6 grid gap-4">
        {content.offers.map((offer, index) => (
          <div key={`${offer.title}-${index}`} className="rounded-2xl border border-[#eee6da] p-4">
            <button
              type="button"
              className="mb-3 text-sm text-[#b85a3e]"
              onClick={() => setContent({ ...content, offers: content.offers.filter((_, i) => i !== index) })}
            >
              Удалить
            </button>
            <div className="grid gap-3">
              <Field label="Тег" value={offer.tag} onChange={(v) => update(index, { ...offer, tag: v })} />
              <Field label="Название" value={offer.title} onChange={(v) => update(index, { ...offer, title: v })} />
              <RichTextField label="Текст" value={offer.text} onChange={(v) => update(index, { ...offer, text: v })} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Цена / выгода" value={offer.price} onChange={(v) => update(index, { ...offer, price: v })} />
                <Field label="Подсказка" value={offer.hint} onChange={(v) => update(index, { ...offer, hint: v })} />
              </div>
              <MediaField label="Баннер акции" value={offer.image} onChange={(v) => update(index, { ...offer, image: v })} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsSection({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
}) {
  const c = content.clinic;
  function set(key: keyof SiteContent["clinic"], value: string) {
    setContent({ ...content, clinic: { ...c, [key]: value } });
  }
  return (
    <div>
      <h2 className="font-serif text-3xl">Контакты клиники</h2>
      <div className="mt-6 grid gap-3">
        <Field label="Название" value={c.name} onChange={(v) => set("name", v)} />
        <Field label="Полное название" value={c.legalName} onChange={(v) => set("legalName", v)} />
        <Field label="Слоган" value={c.tagline} onChange={(v) => set("tagline", v)} />
        <Field label="Телефон" value={c.phone} onChange={(v) => set("phone", v)} />
        <Field label="Почта" value={c.email} onChange={(v) => set("email", v)} />
        <Field label="Мессенджер" value={c.messenger} onChange={(v) => set("messenger", v)} />
        <Field label="Адрес" value={c.address} onChange={(v) => set("address", v)} />
        <Field label="Метро / ориентир" value={c.metro} onChange={(v) => set("metro", v)} />
        <Field label="Часы работы" value={c.hours} onChange={(v) => set("hours", v)} />
        <Field label="Ссылка на Яндекс.Карты" value={c.mapLink} onChange={(v) => set("mapLink", v)} />
        <Field label="Код встраивания карты (src iframe)" value={c.mapEmbed} onChange={(v) => set("mapEmbed", v)} multiline />
        <Field label="Правовая строка в подвале" value={c.disclaimer} onChange={(v) => set("disclaimer", v)} multiline />
      </div>
    </div>
  );
}

function FaqSection({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
}) {
  function update(index: number, next: FaqItem) {
    setContent({ ...content, faq: content.faq.map((item, i) => (i === index ? next : item)) });
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl">Вопросы</h2>
        <button
          type="button"
          className="rounded-xl bg-[#3c5a4c] px-3 py-1.5 text-sm text-white"
          onClick={() => setContent({ ...content, faq: [...content.faq, { q: "Новый вопрос", a: "" }] })}
        >
          Добавить
        </button>
      </div>
      <div className="mt-6 grid gap-3">
        {content.faq.map((item, index) => (
          <div key={`${item.q}-${index}`} className="rounded-xl border border-[#eee6da] p-3">
            <Field label="Вопрос" value={item.q} onChange={(v) => update(index, { ...item, q: v })} />
            <div className="mt-2">
              <RichTextField label="Ответ" value={item.a} onChange={(v) => update(index, { ...item, a: v })} />
            </div>
            <button
              type="button"
              className="mt-2 text-sm text-[#b85a3e]"
              onClick={() => setContent({ ...content, faq: content.faq.filter((_, i) => i !== index) })}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsSection({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
}) {
  const reviews = content.reviews;
  function updateItem(index: number, next: ReviewItem) {
    setContent({ ...content, reviews: { ...reviews, items: reviews.items.map((item, i) => (i === index ? next : item)) } });
  }
  function updateSource(index: number, next: ReviewSource) {
    setContent({
      ...content,
      reviews: { ...reviews, sources: reviews.sources.map((item, i) => (i === index ? next : item)) },
    });
  }
  return (
    <div>
      <h2 className="font-serif text-3xl">Отзывы</h2>
      <div className="mt-6 grid gap-3">
        <Field label="Оценка" value={reviews.rating} onChange={(v) => setContent({ ...content, reviews: { ...reviews, rating: v } })} />
        <Field
          label="Количество отзывов"
          value={String(reviews.count)}
          onChange={(v) => setContent({ ...content, reviews: { ...reviews, count: Number(v) || 0 } })}
        />
        <Field label="Ссылка на Яндекс" value={reviews.yandexHref} onChange={(v) => setContent({ ...content, reviews: { ...reviews, yandexHref: v } })} />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h3 className="font-serif text-xl">Ссылки на площадки</h3>
        <button
          type="button"
          className="rounded-xl bg-[#3c5a4c] px-3 py-1.5 text-sm text-white"
          onClick={() =>
            setContent({
              ...content,
              reviews: { ...reviews, sources: [...reviews.sources, { label: "Площадка", href: "https://" }] },
            })
          }
        >
          Добавить ссылку
        </button>
      </div>
      <div className="mt-3 grid gap-3">
        {reviews.sources.map((item, index) => (
          <div key={`${item.label}-${index}`} className="grid gap-2 rounded-xl border border-[#eee6da] p-3 sm:grid-cols-[1fr_1fr_auto]">
            <Field label="Название" value={item.label} onChange={(v) => updateSource(index, { ...item, label: v })} />
            <Field label="Ссылка" value={item.href} onChange={(v) => updateSource(index, { ...item, href: v })} />
            <button
              type="button"
              className="self-end text-sm text-[#b85a3e]"
              onClick={() =>
                setContent({
                  ...content,
                  reviews: { ...reviews, sources: reviews.sources.filter((_, i) => i !== index) },
                })
              }
            >
              Удалить
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h3 className="font-serif text-xl">Цитаты</h3>
        <button
          type="button"
          className="rounded-xl bg-[#3c5a4c] px-3 py-1.5 text-sm text-white"
          onClick={() =>
            setContent({
              ...content,
              reviews: { ...reviews, items: [...reviews.items, { name: "Пациент", source: "Яндекс Карты", text: "" }] },
            })
          }
        >
          Добавить отзыв
        </button>
      </div>
      <div className="mt-3 grid gap-3">
        {reviews.items.map((item, index) => (
          <div key={`${item.name}-${index}`} className="rounded-xl border border-[#eee6da] p-3">
            <div className="grid gap-2 sm:grid-cols-2">
              <Field label="Имя" value={item.name} onChange={(v) => updateItem(index, { ...item, name: v })} />
              <Field label="Источник" value={item.source} onChange={(v) => updateItem(index, { ...item, source: v })} />
            </div>
            <div className="mt-2">
              <RichTextField label="Текст" value={item.text} onChange={(v) => updateItem(index, { ...item, text: v })} />
            </div>
            <button
              type="button"
              className="mt-2 text-sm text-[#b85a3e]"
              onClick={() =>
                setContent({ ...content, reviews: { ...reviews, items: reviews.items.filter((_, i) => i !== index) } })
              }
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingsSection({ bookings }: { bookings: BookingRequest[] }) {
  const sorted = useMemo(() => bookings, [bookings]);
  return (
    <div>
      <h2 className="font-serif text-3xl">Заявки с сайта</h2>
      <p className="mt-2 text-sm text-[#6f675e]">Приходят из формы «Записаться».</p>
      <div className="mt-6 grid gap-3">
        {sorted.length === 0 ? <p className="text-sm text-[#6f675e]">Заявок пока нет.</p> : null}
        {sorted.map((item) => (
          <article key={item.id} className="rounded-2xl border border-[#eee6da] p-4">
            <p className="text-xs text-[#6f675e]">{new Date(item.createdAt).toLocaleString("ru-RU")}</p>
            <p className="mt-1 font-medium">{item.name}</p>
            <p className="text-sm">{item.phone}</p>
            {item.doctor ? <p className="mt-1 text-sm text-[#6f675e]">Врач: {item.doctor}</p> : null}
            {item.comment ? <p className="mt-2 text-sm">{item.comment}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
