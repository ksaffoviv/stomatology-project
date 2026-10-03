import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/lib/cms/store";
import type { SiteContent } from "@/lib/cms/types";

export const runtime = "nodejs";

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as SiteContent | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
  }
  const saved = await saveSiteContent(body);
  revalidatePath("/", "layout");
  return NextResponse.json(saved);
}
