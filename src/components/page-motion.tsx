"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        root.toggleAttribute("data-scrolled", window.scrollY > 12);
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = main.querySelectorAll("section");
    const seen = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-inview");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    sections.forEach((section, index) => {
      section.querySelectorAll("article, .grid > *").forEach((item, i) => {
        (item as HTMLElement).style.setProperty("--stagger", `${Math.min(i, 8) * 70}ms`);
      });
      if (index === 0) section.classList.add("is-inview");
      else seen.observe(section);
    });

    return () => seen.disconnect();
  }, [pathname]);

  return null;
}
