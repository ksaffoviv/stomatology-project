"use client";

import { useEffect, useRef, useState } from "react";
import { sanitizeRichText } from "@/lib/cms/rich-text";

export function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="text-[#6f675e]">{label}</span>
      {multiline ? (
        <textarea
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="mt-1 w-full resize-y rounded-xl border border-[#ddd4c6] bg-[#f7f2ea] px-3 py-2 outline-none focus:border-[#3c5a4c]"
        />
      ) : (
        <input
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-xl border border-[#ddd4c6] bg-[#f7f2ea] px-3 py-2 outline-none focus:border-[#3c5a4c]"
        />
      )}
    </label>
  );
}

export function LinesField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <Field
      label={label}
      value={value.join("\n")}
      multiline
      onChange={(v) => onChange(v.split("\n").map((line) => line.trimEnd()).filter((line) => line.length > 0))}
    />
  );
}

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-[#eee6da] p-3 text-sm">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-12 cursor-pointer rounded" />
      <span className="flex-1">
        <span className="block text-[#6f675e]">{label}</span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[#ddd4c6] bg-[#f7f2ea] px-2 py-1"
        />
      </span>
    </label>
  );
}

export function RichTextField({
  label,
  value,
  onChange,
  hint = "Выделите фрагмент и нажмите Ж / К / Выделение",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const lastEmitted = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const next = sanitizeRichText(value || "");
    if (lastEmitted.current === value && el.innerHTML === next) return;
    if (document.activeElement === el) return;
    el.innerHTML = next || "";
  }, [value]);

  function emit() {
    const el = ref.current;
    if (!el) return;
    const html = sanitizeRichText(el.innerHTML);
    lastEmitted.current = html;
    onChange(html);
  }

  function run(command: "bold" | "italic" | "underline" | "highlight") {
    ref.current?.focus();
    if (command === "highlight") {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
      const range = sel.getRangeAt(0);
      const mark = document.createElement("mark");
      mark.className = "rt-mark";
      try {
        range.surroundContents(mark);
      } catch {
        document.execCommand("hiliteColor", false, "#e8c4b0");
      }
    } else {
      document.execCommand(command, false);
    }
    emit();
  }

  return (
    <div className="block text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[#6f675e]">{label}</span>
        <div className="flex flex-wrap gap-1">
          <ToolbarButton label="Ж" title="Жирный" onClick={() => run("bold")} className="font-bold" />
          <ToolbarButton label="К" title="Курсив" onClick={() => run("italic")} className="italic" />
          <ToolbarButton label="Ч" title="Подчёркнутый" onClick={() => run("underline")} className="underline" />
          <ToolbarButton label="Выделение" title="Выделить цветом" onClick={() => run("highlight")} />
        </div>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        className="rt-editor mt-1 min-h-[6.5rem] w-full resize-y rounded-xl border border-[#ddd4c6] bg-[#f7f2ea] px-3 py-2 outline-none focus:border-[#3c5a4c] [&_mark]:rounded [&_mark]:bg-[#e8c4b0] [&_mark]:px-1"
      />
      <p className="mt-1 text-xs text-[#6f675e]">{hint}</p>
    </div>
  );
}

function ToolbarButton({
  label,
  title,
  onClick,
  className = "",
}: {
  label: string;
  title: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded-lg border border-[#ddd4c6] bg-white px-2.5 py-1 text-xs text-[#1c1814] hover:bg-[#f7f2ea] ${className}`}
    >
      {label}
    </button>
  );
}

export function MediaField({
  label,
  value,
  onChange,
  accept = "image/*",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  accept?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = (await res.json()) as { url?: string; error?: string };
    setBusy(false);
    if (!res.ok || !data.url) {
      setError(data.error || "Не удалось загрузить");
      return;
    }
    onChange(data.url);
  }

  return (
    <div className="rounded-xl border border-[#eee6da] p-3">
      <p className="text-sm text-[#6f675e]">{label}</p>
      {value ? (
        accept.includes("video") && (value.endsWith(".mp4") || value.endsWith(".webm")) ? (
          <video src={value} className="mt-2 max-h-40 w-full rounded-lg object-cover" controls />
        ) : (
          <img src={value} alt="" className="mt-2 max-h-40 rounded-lg object-cover" />
        )
      ) : null}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-[#ddd4c6] bg-[#f7f2ea] px-2 py-1 text-sm"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        <label className="inline-flex cursor-pointer rounded-lg bg-[#3c5a4c] px-3 py-1.5 text-sm text-white">
          {busy ? "Загрузка…" : "Загрузить файл"}
          <input type="file" accept={accept} className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
        </label>
        {value ? (
          <button type="button" className="rounded-lg border border-[#ddd4c6] px-3 py-1.5 text-sm" onClick={() => onChange("")}>
            Убрать
          </button>
        ) : null}
      </div>
      {error ? <p className="mt-2 text-xs text-[#b85a3e]">{error}</p> : null}
    </div>
  );
}
