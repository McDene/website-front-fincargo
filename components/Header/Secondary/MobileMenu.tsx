"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  motion,
  AnimatePresence,
  Variants,
  useReducedMotion,
} from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

interface MobileMenuProps {
  menuOpen: boolean;
  toggleMenu: () => void;
  menuItems: { name: string; anchor: string }[];
  pathname: string;
}

// Animations
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};
const panelVariants: Variants = {
  hidden: { y: "-100%", opacity: 0.6 },
  visible: { y: 0, opacity: 1 },
  exit: { y: "-100%", opacity: 0.6 },
};

export default function MobileMenu({
  menuOpen,
  toggleMenu,
  menuItems,
}: MobileMenuProps) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  // Body scroll lock (defensive even if header handles it)
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ESC to close
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, toggleMenu]);

  // Focus trap within the panel
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!menuOpen) return;
    // focus close button on open
    closeBtnRef.current?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (!panelRef.current) return;
      const selectors = [
        "a[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        "input[type='text']:not([disabled])",
        "select:not([disabled])",
        "[tabindex]:not([tabindex='-1'])",
      ].join(",");
      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(selectors)
      ).filter(
        (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [menuOpen]);

  const transition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 260, damping: 28, mass: 0.8 },
    [reduceMotion]
  );

  return (
    <AnimatePresence>
      {menuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={toggleMenu}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            ref={panelRef}
            className="fixed inset-0 z-50 flex h-screen flex-col bg-gradient-to-b from-darkBlue to-black text-white pt-[max(env(safe-area-inset-top),1rem)] pb-[max(env(safe-area-inset-bottom),1rem)]"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
            transition={transition}
          >
            {/* Top bar */}
            <div className="w-full flex items-center justify-between px-5">
              <Link
                href="/"
                aria-label="Fincargo home"
                onClick={toggleMenu}
                className="flex-shrink-0"
              >
                <Image
                  src="/logo/logo_fincargo_white.svg"
                  alt="Fincargo"
                  width={160}
                  height={42}
                  priority={false}
                />
              </Link>
              <button
                ref={closeBtnRef}
                onClick={toggleMenu}
                className="inline-flex items-center justify-center rounded-full p-2 ring-1 ring-white/20 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>

            {/* Menu items */}
            <nav
              aria-label="Mobile primary"
              className="flex flex-1 flex-col items-center gap-6 px-6 overflow-y-auto pt-16"
            >
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.anchor}
                  onClick={toggleMenu}
                  className="text-2xl font-semibold text-white/95 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA buttons */}
            <div className="mt-10 flex items-center justify-center gap-4 p-6">
              <a
                href="https://app.fincargo.ai/register"
                target="_blank"
                rel="noreferrer"
                className="w-full max-w-xs text-center"
              >
                <span className="inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-lg font-semibold bg-white text-blue-950 hover:bg-slate-100 transition shadow-sm">
                  {t("register")}
                </span>
              </a>
              <a
                href="https://app.fincargo.ai/login"
                target="_blank"
                rel="noreferrer"
                className="w-full max-w-xs text-center"
              >
                <span className="inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-lg font-semibold bg-white/10 ring-1 ring-white/20 text-white hover:bg-white/15 transition">
                  {t("login")}
                </span>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
