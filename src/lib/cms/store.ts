import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { defaultContent, emptyServiceDetails, phoneToHref } from "./defaults";
import type { BookingRequest, SiteContent } from "./types";

const dataDir = path.join(process.cwd(), "data");
const cmsPath = path.join(dataDir, "cms.json");
const bookingsPath = path.join(dataDir, "bookings.json");

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T>(base: T, overlay: unknown): T {
  if (overlay === undefined || overlay === null) return base;
  if (Array.isArray(overlay)) return overlay as T;
  if (!isObject(base) || !isObject(overlay)) return overlay as T;
  const next = { ...base } as Record<string, unknown>;
  for (const [key, value] of Object.entries(overlay)) {
    next[key] = deepMerge((base as Record<string, unknown>)[key], value);
  }
  return next as T;
}

async function ensureDir() {
  await mkdir(dataDir, { recursive: true });
}

function normalizeContent(content: SiteContent): SiteContent {
  return {
    ...content,
    services: content.services.map((service) => ({
      ...service,
      details: deepMerge(emptyServiceDetails(), service.details ?? {}),
    })),
    journal: content.journal.map((article) => ({
      ...article,
      hero: article.hero ?? { label: "Обложка", hint: "", src: "" },
      sections: article.sections ?? [],
      gallery: article.gallery ?? [],
    })),
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  const defaults = defaultContent();
  try {
    const raw = await readFile(cmsPath, "utf8");
    return normalizeContent(deepMerge(defaults, JSON.parse(raw) as unknown));
  } catch {
    return defaults;
  }
}

export async function saveSiteContent(content: SiteContent) {
  await ensureDir();
  const next = {
    ...content,
    clinic: {
      ...content.clinic,
      phoneHref: phoneToHref(content.clinic.phone) || content.clinic.phoneHref,
    },
  };
  await writeFile(cmsPath, JSON.stringify(next, null, 2), "utf8");
  return next;
}

export async function getBookings(): Promise<BookingRequest[]> {
  try {
    const raw = await readFile(bookingsPath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as BookingRequest[]) : [];
  } catch {
    return [];
  }
}

export async function addBooking(entry: Omit<BookingRequest, "id" | "createdAt">) {
  await ensureDir();
  const bookings = await getBookings();
  const item: BookingRequest = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  bookings.unshift(item);
  await writeFile(bookingsPath, JSON.stringify(bookings.slice(0, 200), null, 2), "utf8");
  return item;
}
