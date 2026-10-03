import { NextResponse } from "next/server";
import { addBooking } from "@/lib/cms/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    phone?: string;
    comment?: string;
    doctor?: string;
  } | null;
  if (!body?.name?.trim() || !body?.phone?.trim()) {
    return NextResponse.json({ error: "Укажите имя и телефон" }, { status: 400 });
  }
  const item = await addBooking({
    name: body.name.trim(),
    phone: body.phone.trim(),
    comment: (body.comment ?? "").trim(),
    doctor: (body.doctor ?? "").trim(),
  });
  return NextResponse.json(item);
}
