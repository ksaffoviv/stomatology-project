import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="font-serif text-4xl">Страница не найдена</h1>
      <p className="mt-3 text-muted">Вернитесь на главную или откройте услуги и врачей.</p>
      <Link href="/" className="mt-6 inline-block text-sm underline">
        На главную
      </Link>
    </div>
  );
}
