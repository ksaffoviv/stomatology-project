import { getSiteContent } from "@/lib/cms/store";
import { richTextToPlain } from "@/lib/cms/rich-text";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvCell(value: string) {
  const text = value.replace(/"/g, '""');
  return `"${text}"`;
}

export async function GET() {
  const { clinic, prices } = await getSiteContent();
  const lines = [
    ["Услуга", "Пояснение", "Цена"].map(csvCell).join(";"),
    ...prices.map((row) =>
      [row.title, row.note, row.price].map((cell) => csvCell(richTextToPlain(cell) || cell)).join(";"),
    ),
  ];

  const stamp = new Date().toISOString().slice(0, 10);
  const header = [
    `${clinic.legalName} — прайс-лист (демо)`,
    `Дата выгрузки: ${stamp}`,
    `Ориентир до записи. Итоговая стоимость — после осмотра.`,
    "",
  ].join("\r\n");

  const body = `\uFEFF${header}\r\n${lines.join("\r\n")}\r\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="prajs-dve-ulybki-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
