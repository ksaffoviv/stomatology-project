import { NextResponse } from "next/server";
import { getBookings } from "@/lib/cms/store";

export const runtime = "nodejs";

export async function GET() {
  const bookings = await getBookings();
  return NextResponse.json(bookings);
}
