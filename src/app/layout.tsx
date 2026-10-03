import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { SiteContentProvider } from "@/components/site-content";
import { clinic } from "@/data/clinic";
import { getSiteContent } from "@/lib/cms/store";
import { themeStyle } from "@/lib/cms/theme";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

const sourceSerif = Source_Serif_4({
  subsets: ["cyrillic", "latin"],
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  title: {
    default: `${clinic.legalName} — прототип`,
    template: `%s · ${clinic.name}`,
  },
  description:
    "Семейная стоматология «Две улыбки»: два врача, два кресла, одна семья. Приём только для взрослых, понятный план, без конвейера.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  return (
    <html lang="ru" style={themeStyle(content.theme)}>
      <body className={`${manrope.variable} ${sourceSerif.variable} font-sans antialiased`}>
        <SiteContentProvider content={content}>
          <AppShell>{children}</AppShell>
        </SiteContentProvider>
      </body>
    </html>
  );
}
