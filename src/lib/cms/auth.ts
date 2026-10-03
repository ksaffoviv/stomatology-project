export const ADMIN_COOKIE = "admin_session";

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "ulybki2026";
}

export async function sessionToken() {
  const secret = process.env.ADMIN_SECRET || "dve-ulybki-admin";
  const data = new TextEncoder().encode(`${adminPassword()}:${secret}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function isValidSession(token: string | undefined) {
  if (!token) return false;
  return token === (await sessionToken());
}
