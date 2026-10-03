"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type BookingContextValue = {
  open: boolean;
  doctor: string;
  openBooking: (doctor?: string) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [doctor, setDoctor] = useState("");

  const openBooking = useCallback((nextDoctor = "") => {
    setDoctor(nextDoctor);
    setOpen(true);
  }, []);

  const closeBooking = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, doctor, openBooking, closeBooking }),
    [open, doctor, openBooking, closeBooking],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}
