"use client";

import { createContext, useContext } from "react";
import { defaultContent } from "@/lib/cms/defaults";
import type { SiteContent } from "@/lib/cms/types";

const SiteContentContext = createContext<SiteContent>(defaultContent());

export function SiteContentProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: React.ReactNode;
}) {
  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
