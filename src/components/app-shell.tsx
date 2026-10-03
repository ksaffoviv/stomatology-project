"use client";

import { usePathname } from "next/navigation";
import { BookingProvider } from "./booking-context";
import { BookingModal } from "./booking-modal";
import { Header } from "./header";
import { Footer } from "./footer";
import { MobileBar } from "./mobile-bar";
import { PageMotion } from "./page-motion";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <BookingProvider>
      <PageMotion />
      <Header />
      <main className="pb-24 sm:pb-0">{children}</main>
      <Footer />
      <MobileBar />
      <BookingModal />
    </BookingProvider>
  );
}
