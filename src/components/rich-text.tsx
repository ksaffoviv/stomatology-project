import { sanitizeRichText } from "@/lib/cms/rich-text";

type Props = {
  html: string;
  className?: string;
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3";
};

/** Renders CMS text with optional bold / italic / highlight markup. */
export function RichText({ html, className, as: Tag = "div" }: Props) {
  const safe = sanitizeRichText(html ?? "");
  if (!safe) return null;
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: safe }} />;
}
