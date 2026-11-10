"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contacts, nav } from "@/content/site";
import { Logo } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-ink/90 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-5 py-3 sm:px-6">
        <a href="#top" className="flex min-h-11 items-center gap-3" onClick={() => setOpen(false)}>
          <Logo className="h-9 w-8" />
          <span className="font-display text-[12px] tracking-[0.22em] text-gold-hi sm:text-[13px]">HIVE INTELLIGENCE</span>
        </a>

        <nav aria-label="Головне меню" className="hidden items-center gap-7 text-[15px] font-medium lg:flex">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="text-text transition-colors hover:text-gold-hi">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={contacts.telegramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cut hidden min-h-11 items-center bg-gold px-5 text-[15px] font-bold text-ink transition-shadow hover:shadow-[0_0_20px_rgba(230,192,98,0.45)] lg:inline-flex [--c:9px]"
        >
          Написати в Telegram
        </a>

        <button
          type="button"
          className="relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Меню</span>
          <motion.span className="absolute h-[1.5px] w-6 bg-gold-hi" animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }} />
          <motion.span className="absolute h-[1.5px] w-6 bg-gold-hi" animate={{ opacity: open ? 0 : 1 }} />
          <motion.span className="absolute h-[1.5px] w-6 bg-gold-hi" animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }} />
        </button>
      </div>
    </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Мобільне меню"
            className="fixed inset-x-0 top-[69px] bottom-0 z-[45] overflow-y-auto border-t border-line bg-ink lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col px-5 py-6">
              {nav.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center justify-between border-b border-line text-xl font-semibold text-head">
                    {l.label}
                    <span aria-hidden="true" className="text-gold">→</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 px-5 pb-10">
              <a href={contacts.phoneHref} className="flex min-h-[52px] items-center justify-center border border-[#5A5345] text-lg font-semibold text-head">
                {contacts.phone}
              </a>
              <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer" className="btn-cut flex min-h-[52px] items-center justify-center bg-gold text-lg font-bold text-ink">
                Написати в Telegram
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
