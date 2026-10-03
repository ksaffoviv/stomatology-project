import {
  aboutHighlights,
  aboutVideo,
  anamnesisFlags,
  clinic,
  doctors,
  faq,
  journal,
  nav,
  offers,
  patientBeforeAfter,
  pricePreview,
  prices,
  reviews,
  serviceGroups,
  services,
  situations,
  visitPrep,
  visitSteps,
} from "@/data/clinic";
import { getJournalArticle } from "@/data/journal-articles";
import { getServiceDetails } from "@/data/service-details";
import type {
  PhotoSlotContent,
  ServiceDetails,
  SiteContent,
} from "./types";

export const defaultTheme = {
  paper: "#f7f2ea",
  cream: "#ece4d6",
  sage: "#3c5a4c",
  sageDark: "#2c4338",
  terracotta: "#b85a3e",
  terracottaDark: "#9a4a33",
  ink: "#1c1814",
  inkSoft: "#3f3832",
  muted: "#6f675e",
  line: "#ddd4c6",
};

function slot(item: { label: string; hint: string; src?: string }): PhotoSlotContent {
  return { label: item.label, hint: item.hint, src: item.src ?? "" };
}

export function emptyServiceDetails(): ServiceDetails {
  return {
    duration: "",
    visits: "",
    includes: [],
    steps: [],
    aftercare: "",
    extra: "",
    body: [],
    suitable: [],
    notFor: [],
    important: "",
    aftercareMore: "",
    photoSlots: [
      { label: "Главное фото", hint: "", src: "" },
      { label: "До", hint: "", src: "" },
      { label: "После", hint: "", src: "" },
      { label: "Процесс", hint: "", src: "" },
    ],
  };
}

function unsplash(id: string) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&h=900&q=60`;
}

export function defaultContent(): SiteContent {
  return {
    theme: { ...defaultTheme },
    clinic: { ...clinic },
    nav: nav.map((item) => ({ ...item })),
    media: {
      heroVideo: aboutVideo.src,
      heroPoster: aboutVideo.poster,
      clinicVideo: aboutVideo.src,
      clinicPoster: aboutVideo.poster,
      clinicCaption: aboutVideo.caption,
      clinicVideoTitle: aboutVideo.title,
      serviceCardImage: "/services/treatment.webp",
      journalWide: "/journal/wide.jpg",
      journalTall: "/journal/tall.jpg",
    },
    home: {
      kicker: "Семейная клиника · 2 врача · 2 кресла",
      title: "Спокойная стоматология без конвейера",
      lead:
        "Вас принимают два врача одной семьи. Два кресла, один план: на первом визите разбираемся в ситуации и объясняем маршрут — без давления и лишней спешки.",
      hoursShort: "10:00–19:00",
      visitEyebrow: "До лечения",
      visitTitle: "Что будет на первой встрече",
      visitLead:
        "Первый визит нужен, чтобы понять картину: осмотр, при необходимости снимок и честный разговор, что делать дальше. Лечение не продаём «с порога» — сначала договариваемся о шаге, который имеет смысл именно вам.",
      visitFooter:
        "Так начинаем и с острой болью, и если давно не были у стоматолога: один из двух врачей семьи ведёт приём сам — план не распадается «по кабинетам».",
      situationsEyebrow: "По запросу",
      situationsTitle: "Нажмите на то, что похоже на ваш случай",
      situationsLead:
        "Не нужно знать, как называется процедура. Выберите знакомое ощущение — дальше врач объяснит, что происходит и какой шаг разумный именно сейчас. Два специалиста одной семьи, поэтому маршрут короткий.",
      situationsAsideTitle: "Если неясно, к кому идти",
      situationsAside:
        "Это нормально. Напишите в заявке, что беспокоит: боль и эстетика — к Андрею Сергеевичу, удаление и имплант — к Михаилу Сергеевичу. Если сомневаетесь, разберёмся на первой консультации.",
      familyEyebrow: "Как устроено",
      familyTitle: "Два врача, два кресла, одна семья",
      familyP1:
        "Здесь нет потока «кабинет за кабинетом». Запись по времени — чтобы было понятно: кто принимает, что будет сегодня и какой шаг следующий.",
      familyP2:
        "В клинике два кресла и два врача одной семьи. Вас ведёт тот, кто отвечает за ваш план: не смена незнакомых специалистов и не очередь в коридоре. Это выбранный семейный формат, а не конвейер.",
      familyBoxTitle: "Место, где проще выдохнуть",
      familyBoxText:
        "Небольшой семейный формат помогает не потеряться: вы видите тех же двух врачей, а не новую смену каждый визит. Лечение идёт по одному плану — от консультации до следующего этапа.",
      familyAsideTitle: "Ритм без очереди",
      familyAside:
        "Нам важно, чтобы вы понимали, куда пришли и кто ведёт ваш план. Не обещаем «всё за один день» — обещаем ясный маршрут.",
      familyFooter:
        "Такой формат подходит, если хотите пройти путь целиком: с объяснениями, без суеты и с понятной связкой между терапией и хирургией.",
      teamEyebrow: "Врачи клиники",
      teamTitle: "Два врача, одна семья",
      teamLead:
        "Приём ведут братья Волковы — одна семья, два кресла. Терапия и ортопедия — у Андрея Сергеевича, хирургия и имплант — у Михаила Сергеевича. Пациента не передают «к незнакомому врачу»: план один, и оба его знают.",
      teamAsideTitle: "Как связаны",
      teamAside:
        "Если лечение затрагивает и зуб, и удаление или имплант, братья собирают маршрут вместе в клинике на два кресла. Вы видите тех же двух людей — от консультации до последнего визита.",
      offersEyebrow: "Сейчас",
      offersTitle: "Акции и спецпредложения",
      offersLead: "Условия прототипные — заменим на актуальные, когда клиника утвердит тарифы.",
      pricesEyebrow: "Цены",
      pricesTitle: "Ориентир до записи, не смета «под ключ»",
      pricesLead:
        "Здесь то, с чего обычно начинают: осмотр, снимок, чистка, кариес. Итоговая стоимость лечения появляется после того, как врач видит ситуацию — иначе это будет обещание, а не план.",
      pricesAsideTitle: "Без сюрприза в кресле",
      pricesAside:
        "Цифры прототипные. Когда клиника утвердит прайс, подставим его сюда. До этого — честный ориентир, а не витрина скидок.",
      pricesCardTitle: "Удаление, коронки, импланты — на отдельной странице",
      pricesCardText: "Короткий список не вмещает весь маршрут. Полный ориентир — там, без карусели акций.",
      faqTitle: "Вопросы до записи",
      ctaTitle: "Не знаете, как называется процедура — так и напишите",
      ctaText:
        "Опишите, что беспокоит своими словами. Подскажем, с чего лучше начать, нужен ли снимок и к кому из двух врачей семьи прийти.",
      servicesEyebrow: "Направления",
      servicesTitle: "Чем занимаемся",
      servicesLead: "Приём только для взрослых. Выберите направление — справа откроются конкретные услуги.",
      patientsEyebrow: "Пациентам",
      patientsTitle: "До приёма — без сюрпризов",
      patientsLead:
        "Результаты работ, как подготовиться и две анкеты: чтобы первый визит начался с разговора, а не с бумаги на коленях в коридоре.",
      journalEyebrow: "Журнал",
      journalTitle: "Читаем до приёма",
      extraBlocks: [],
    },
    about: {
      eyebrow: "О клинике",
      title: "Два врача, два кресла, одна семья",
      lead: `Здесь работают два врача одной семьи — ${doctors[0].shortName} и ${doctors[1].shortName}. Два кресла, сознательный формат: без потока и без кабинета «на каждого узкого специалиста». Если задача выходит за наш профиль, скажем об этом прямо.`,
      highlights: [...aboutHighlights],
      note: "На запуске здесь появятся фото кабинетов, лицензия, ИНН и юридическое имя клиники.",
    },
    pricesPage: {
      eyebrow: "Цены",
      title: "Сколько стоит первый шаг",
      lead: "Цифры в прототипе — ориентир для семейной клиники на два кресла. Подставим прайс вашей клиники.",
      noteTitle: "План и смета — после диагностики",
      noteText: "Не называем итоговую стоимость лечения до осмотра: иначе это будет гадание, а не план.",
      downloadLabel: "Скачать полный прайс (демо, CSV)",
      downloadHref: "/api/prices/download",
    },
    servicesPage: {
      eyebrow: "Услуги",
      title: "Направления клиники",
      lead:
        "Терапия, профилактика, ортодонтия, ортопедия, имплантология, хирургия и пародонтология для взрослых. Два врача одной семьи, два кресла. Если случай выходит за наш формат — скажем прямо.",
    },
    doctorsPage: {
      eyebrow: "Врачи",
      title: "Два врача одной семьи",
      lead:
        "Терапевт-ортопед и хирург-имплантолог работают вместе: два кресла, один семейный план. Имена и фото в прототипе условные — подставим реальных врачей клиники.",
    },
    contactsPage: {
      eyebrow: "Контакты",
      title: "Как добраться",
      lead: "Адрес, телефон и карта — чтобы было понятно, куда ехать и как записаться.",
    },
    journalPage: {
      eyebrow: "Журнал",
      title: "Публикации клиники",
      lead:
        "Короткие тексты про приём, восстановление и то, что обычно спрашивают до записи.",
    },
    patientsPage: {
      eyebrow: "Пациентам",
      title: "Подготовка, анкеты и результаты работ",
      lead:
        "Раздел для тех, кто уже записался или только собирается. Кадры и формы — для прототипа: на живом сайте появятся фото клиники и отправка анкет врачу.",
      beforeAfterEyebrow: "Результаты",
      beforeAfterTitle: "Работы до и после",
      beforeAfterLead:
        "Не каталог «до/после на сто случаев». Три примера, чтобы было понятно, о каком результате говорим.",
      prepEyebrow: "Перед визитом",
      prepTitle: "Подготовка к приёму",
      prepLead: "Никакой жёсткой диеты «за три дня». Ниже — то, что реально помогает первому визиту пройти спокойнее.",
      formsTitle: "Анкеты до приёма",
      formsLead: "Слева — здоровье и лекарства. Справа — знакомство, если вы у нас впервые.",
      ctaTitle: "Готовы записаться",
      ctaText: "Анкета не заменяет осмотр. После заявки перезвоним и подскажем слот.",
    },
    doctors: doctors.map((doctor) => ({
      ...doctor,
      specialties: [...doctor.specialties],
      video: doctor.video ?? "",
    })),
    serviceGroups: [...serviceGroups],
    services: services.map((service) => {
      const details = getServiceDetails(service.slug);
      return {
        slug: service.slug,
        title: service.title,
        short: service.short,
        group: service.group,
        fromPrice: service.fromPrice,
        doctor: service.doctor,
        image: service.image,
        text: service.text,
        details: {
          duration: details.duration,
          visits: details.visits,
          includes: [...details.includes],
          steps: [...details.steps],
          aftercare: details.aftercare,
          extra: details.extra,
          body: [...details.body],
          suitable: [...details.suitable],
          notFor: [...details.notFor],
          important: details.important,
          aftercareMore: details.aftercareMore,
          photoSlots: details.photoSlots.map(slot),
        },
      };
    }),
    journal: journal.map((article) => {
      const page = getJournalArticle(article.slug);
      return {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        body: article.body,
        image: article.image,
        featured: article.featured,
        tag: page.tag,
        readTime: page.readTime,
        hero: slot(page.hero),
        sections: page.sections.map((section) => ({
          heading: section.heading,
          paragraphs: [...section.paragraphs],
          photoLabel: section.photo?.label ?? "",
          photoHint: section.photo?.hint ?? "",
          photoSrc: section.photo?.src ?? "",
        })),
        closing: page.closing,
        gallery: page.gallery.map(slot),
      };
    }),
    patientBeforeAfter: patientBeforeAfter.map((item) => ({
      title: item.title,
      tag: item.tag,
      note: item.note,
      before: unsplash(item.before),
      after: unsplash(item.after),
    })),
    visitPrep: visitPrep.map((item) => ({ ...item })),
    anamnesisFlags: [...anamnesisFlags],
    patientsCards: [
      {
        href: "/patsientam#do-posle",
        tag: "Результаты",
        title: "Работы до и после",
        text: "Коротко, как меняется улыбка после реставрации, чистки или импланта. Кадры демо — заменим на фото клиники.",
      },
      {
        href: "/patsientam#podgotovka",
        tag: "Перед визитом",
        title: "Подготовка к приёму",
        text: "Что взять, как есть в этот день и что написать в заявке, если зуб болит.",
      },
      {
        href: "/patsientam#anamnez",
        tag: "Здоровье",
        title: "Анкета стоматологического анамнеза",
        text: "Аллергии, лекарства и хронические состояния — чтобы врач не собирал это с нуля в кресле.",
      },
      {
        href: "/patsientam#anketa",
        tag: "Первый визит",
        title: "Анкета для первичных пациентов",
        text: "Имя, что беспокоит и к кому удобнее. В прототипе форма никуда не уходит.",
      },
    ],
    prices: prices.map((row) => ({ ...row })),
    pricePreview: pricePreview.map((row) => ({ ...row })),
    offers: offers.map((row) => ({ ...row })),
    faq: faq.map((row) => ({ ...row })),
    visitSteps: visitSteps.map((row) => ({ ...row })),
    situations: situations.map((row) => ({ ...row })),
    reviews: {
      rating: reviews.rating,
      count: reviews.count,
      yandexHref: reviews.yandexHref,
      items: reviews.items.map((item) => ({ ...item })),
      sources: reviews.sources.map((item) => ({ ...item })),
    },
  };
}

export function phoneToHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  const normalized = digits.startsWith("8") ? `7${digits.slice(1)}` : digits;
  return `tel:+${normalized}`;
}

export function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-zа-яё0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || `item-${Date.now()}`
  );
}
