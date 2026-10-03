"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (!res.ok) {
      setError("Неверный пароль");
      return;
    }
    router.push(search.get("next") || "/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f2ea] px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-[0_8px_32px_rgb(28_24_20_/_0.08)]">
        <p className="text-xs tracking-[0.18em] text-[#6f675e] uppercase">Админка</p>
        <h1 className="mt-2 font-serif text-3xl">Вход для клиники</h1>
        <p className="mt-3 text-sm text-[#6f675e]">
          Пароль по умолчанию: <code className="rounded bg-[#ece4d6] px-1.5 py-0.5">ulybki2026</code>. Можно сменить через
          переменную <code className="rounded bg-[#ece4d6] px-1.5 py-0.5">ADMIN_PASSWORD</code>.
        </p>
        <label className="mt-6 block text-sm">
          Пароль
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[#ddd4c6] bg-[#f7f2ea] px-4 py-3 outline-none focus:border-[#3c5a4c]"
            autoFocus
          />
        </label>
        {error ? <p className="mt-3 text-sm text-[#b85a3e]">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-xl bg-[#3c5a4c] py-3 text-sm text-[#f7f2ea] disabled:opacity-60"
        >
          {busy ? "Вход…" : "Войти"}
        </button>
      </form>
    </div>
  );
}
