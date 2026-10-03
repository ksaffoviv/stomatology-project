const ALLOWED_TAGS = new Set(["b", "strong", "i", "em", "mark", "br", "p", "span", "u"]);

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Keep only safe inline formatting used by the admin rich-text editor. */
export function sanitizeRichText(input: string): string {
  if (!input) return "";
  if (!/[<>]/.test(input)) {
    return escapeHtml(input).replace(/\n/g, "<br>");
  }

  let html = input
    .replace(/&nbsp;/g, " ")
    .replace(/<\/?(script|style|iframe|object|embed|link|meta)[^>]*>/gi, "");

  html = html.replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (full, rawTag: string, attrs: string) => {
    const tag = rawTag.toLowerCase();
    const closing = full.startsWith("</");
    if (!ALLOWED_TAGS.has(tag)) return "";
    if (closing) return `</${tag}>`;
    if (tag === "br") return "<br>";
    if (tag === "mark") return '<mark class="rt-mark">';
    if (tag === "span") {
      const style = /style\s*=\s*["']([^"']*)["']/i.exec(attrs)?.[1] ?? "";
      if (/background/i.test(style)) return '<mark class="rt-mark">';
      return "<span>";
    }
    return `<${tag}>`;
  });

  return html;
}

export function richTextToPlain(input: string): string {
  return input
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}
