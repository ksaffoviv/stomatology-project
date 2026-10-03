import { LegalPage } from "@/components/legal-page";
import { getSiteContent } from "@/lib/cms/store";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Согласие на обработку персональных данных" };
export const dynamic = "force-dynamic";

export default async function ConsentPage() {
  const { clinic } = await getSiteContent();

  return (
    <LegalPage eyebrow="Документы" title="Согласие на обработку персональных данных">
      <p>
        Заполняя форму на сайте {clinic.name} или отмечая соответствующий пункт, я даю согласие{" "}
        {clinic.legalName} (Оператору) на обработку моих персональных данных на условиях, изложенных ниже и в{" "}
        <Link href="/politika-personalnyh-dannyh" className="text-sage underline underline-offset-2">
          Политике обработки персональных данных
        </Link>
        .
      </p>
      <h2 className="font-serif text-2xl text-ink">Состав данных</h2>
      <p>
        Фамилия, имя, отчество (если указаны), номер телефона, адрес электронной почты, содержание обращения,
        сведения о предпочтительном времени приёма и враче.
      </p>
      <h2 className="font-serif text-2xl text-ink">Цели</h2>
      <p>
        Связь со мной для записи на приём, уточнения деталей обращения, направления напоминаний о визите и
        ответов на вопросы о услугах клиники.
      </p>
      <h2 className="font-serif text-2xl text-ink">Действия с данными</h2>
      <p>
        Сбор, запись, систематизация, хранение, уточнение, использование, передача (предоставление доступа
        уполномоченным сотрудникам и подрядчикам), обезличивание, блокирование, удаление.
      </p>
      <h2 className="font-serif text-2xl text-ink">Срок и отзыв</h2>
      <p>
        Согласие действует до его отзыва мной либо до достижения целей обработки. Отозвать согласие можно,
        написав на {clinic.email} или позвонив по телефону {clinic.phone}. Отзыв не влияет на законность
        обработки, выполненной до отзыва.
      </p>
      <p className="text-sm text-muted">
        Оператор: {clinic.legalName}, {clinic.address}.
      </p>
    </LegalPage>
  );
}
