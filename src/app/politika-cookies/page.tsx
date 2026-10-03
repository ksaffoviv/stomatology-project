import { LegalPage } from "@/components/legal-page";
import { getSiteContent } from "@/lib/cms/store";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Политика использования cookies" };
export const dynamic = "force-dynamic";

export default async function CookiesPolicyPage() {
  const { clinic } = await getSiteContent();

  return (
    <LegalPage eyebrow="Документы" title="Политика использования cookies">
      <p>
        Сайт {clinic.name} может использовать файлы cookie и сходные технологии, чтобы сохранять настройки,
        обеспечивать работу форм и понимать, как посетители пользуются страницами.
      </p>
      <h2 className="font-serif text-2xl text-ink">Какие cookie применяем</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>необходимые — авторизация админки, безопасность сессии;</li>
        <li>функциональные — запоминание выбранных параметров интерфейса;</li>
        <li>аналитические (если подключены) — обезличенная статистика посещений.</li>
      </ul>
      <h2 className="font-serif text-2xl text-ink">Управление</h2>
      <p>
        Вы можете ограничить или удалить cookie в настройках браузера. Часть функций сайта при этом может
        работать некорректно.
      </p>
      <p>
        Подробнее об обработке данных — в{" "}
        <Link href="/politika-personalnyh-dannyh" className="text-sage underline underline-offset-2">
          Политике обработки персональных данных
        </Link>
        .
      </p>
    </LegalPage>
  );
}
