import type { SiteContent } from "./types";

/** CSS variables for the public site theme. Safe for Server and Client Components. */
export function themeStyle(theme: SiteContent["theme"]): Record<string, string> {
  return {
    "--color-paper": theme.paper,
    "--color-cream": theme.cream,
    "--color-sage": theme.sage,
    "--color-sage-dark": theme.sageDark,
    "--color-terracotta": theme.terracotta,
    "--color-terracotta-dark": theme.terracottaDark,
    "--color-ink": theme.ink,
    "--color-ink-soft": theme.inkSoft,
    "--color-muted": theme.muted,
    "--color-line": theme.line,
  };
}
