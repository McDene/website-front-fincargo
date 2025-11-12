"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import MenuButton from "./MenuButton";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LanguageSwitcherMobile from "@/components/LanguageSwitcherMobile";
import { SUPPORTED_UI_LOCALES, type LanguageCore } from "@/lib/i18n";

/**
 * Header with headroom behavior (hide on scroll down, show on scroll up),
 * glass background when sticky, and active anchor highlighting while scrolling.
 *
 * Notes:
 * - Add `scroll-mt-24` (or similar) to target sections so anchors are not hidden under the fixed header.
 * - Sections observed for active state: #benefit, #feature, #tarif, #demo.
 */
export default function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();

  // Build menu items (use hash anchors on the homepage, absolute fallback elsewhere)
  const menu = useMemo(
    () => [
      { name: t("services"), anchor: "#services", id: "services" },
      { name: t("benefits"), anchor: "#benefit", id: "benefit" },
      { name: t("pricing"), anchor: "#pricing", id: "pricing" },
      { name: t("demo"), anchor: "#demo", id: "demo" },
      { name: t("faq"), anchor: "#faq", id: "faq" },
    ],
    [t]
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);
  const prefersReduced = useMemo(
    () =>
      (typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) ||
      false,
    []
  );

  // Headroom + sticky background
  const onScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      setSticky(y > 90);
      const last = lastYRef.current;
      // Only update visibility if the change is significant
      if (Math.abs(y - last) > 5) {
        setVisible(y < last || y < 120); // stay visible near top
        lastYRef.current = y;
      }
      tickingRef.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Active anchor while scrolling (IntersectionObserver)
  const [activeHash, setActiveHash] = useState<string>("");
  useEffect(() => {
    const ids = menu.map((m) => m.id);
    const els = ids
      .map((id) =>
        typeof document !== "undefined" ? document.getElementById(id) : null
      )
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries[0]) setActiveHash(visibleEntries[0].target.id);
      },
      {
        // When the section top is 25% below the top of viewport
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [menu]);

  const toggleMenu = () => setMenuOpen((s) => !s);

  // Determine if current path is the (localized) home
  const isHomePath = useMemo(() => {
    const parts = (pathname || "/").split("/");
    const first = parts[1];
    const hasLocale = (SUPPORTED_UI_LOCALES as readonly string[]).includes(first);
    return (
      pathname === "/" ||
      (hasLocale && (parts.length === 2 || (parts.length === 3 && parts[2] === "")))
    );
  }, [pathname]);

  // Resolve anchor href respecting current locale prefix
  const resolveHref = (hash: string) => {
    const parts = (pathname || "/").split("/");
    const first = parts[1];
    const hasLocale = (SUPPORTED_UI_LOCALES as readonly string[]).includes(first);
    const currentLocale = hasLocale ? (first as LanguageCore) : undefined;
    if (isHomePath) return hash; // in-page anchor

    const prefix = currentLocale && currentLocale !== "en" ? `/${currentLocale}` : "";
    return `${prefix}/${hash}`; // e.g. /fr/#services
  };

  const localizeHref = (href: string) => {
    if (/^https?:\/\//i.test(href)) return href;
    const parts = (pathname || "/").split("/");
    const first = parts[1];
    const hasLocale = (SUPPORTED_UI_LOCALES as readonly string[]).includes(first);
    const currentLocale = hasLocale ? (first as LanguageCore) : undefined;
    if (!currentLocale || currentLocale === "en") return href;
    if (href.startsWith(`/${currentLocale}`)) return href;
    if (href === "/") return `/${currentLocale}`;
    return `/${currentLocale}${href}`;
  };

  // Determine header skin near top
  const skinClass = sticky
    ? "bg-white/75 supports-[backdrop-filter]:bg-white/60 backdrop-blur border-b border-slate-200/70 shadow-sm"
    : isHomePath
    ? "bg-transparent"
    : "bg-white/80 supports-[backdrop-filter]:bg-white/60 backdrop-blur border-b border-slate-200/60";

  return (
    <>
      {/* Skip link for a11y */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] rounded bg-slate-900 px-3 py-2 text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 z-50 w-full transition-transform duration-500 ${
          visible || prefersReduced ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className={`transition-colors duration-300 ${skinClass}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Top bar (mobile) */}
            <div className="flex items-center justify-between h-16 lg:hidden">
              <Link
                href={localizeHref("/")}
                className="flex-shrink-0"
                aria-label="Fincargo home"
              >
                <Image
                  src="/logo/logo_fincargo_blue.svg"
                  alt="Fincargo"
                  width={148}
                  height={40}
                />
              </Link>
              <div className="flex items-center gap-3">
                <LanguageSwitcherMobile />
                <MenuButton menuOpen={menuOpen} toggleMenu={toggleMenu} />
              </div>
            </div>

            {/* Main bar (desktop) */}
            <div className="hidden lg:flex items-center justify-between py-3">
              <Link
                href={localizeHref("/")}
                className="flex-shrink-0"
                aria-label="Fincargo home"
              >
                <Image
                  src="/logo/logo_fincargo_blue.svg"
                  alt="Fincargo"
                  width={160}
                  height={42}
                />
              </Link>

              <NavLinks
                items={menu.map((m) => ({
                  label: m.name,
                  href: resolveHref(m.anchor),
                  id: m.id,
                }))}
                sticky={sticky}
                activeId={activeHash}
              />

              <div className="flex items-center gap-3">
                <Link href={localizeHref("/get-started")}>
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition shadow-sm ring-1 ${
                      sticky
                        ? "bg-darkBlue text-white ring-darkBlue hover:bg-lightBlue hover:ring-lightBlue"
                        : "bg-white text-blue-950 ring-white hover:bg-slate-100"
                    }`}
                  >
                    {t("get_started")}
                  </button>
                </Link>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        menuItems={menu.map((m) => ({
          name: m.name,
          anchor: resolveHref(m.anchor),
        }))}
        pathname={pathname}
      />
    </>
  );
}

// -----------------
// NavLinks & NavItem
// -----------------

function NavLinks({
  items,
  sticky,
  activeId,
}: {
  items: { label: string; href: string; id: string }[];
  sticky: boolean;
  activeId?: string;
}) {
  return (
    <nav aria-label="Primary" className="flex items-center gap-1">
      {items.map((item) => (
        <NavItem
          key={item.id}
          href={item.href}
          text={item.label}
          active={activeId === item.id}
          sticky={sticky}
        />
      ))}
    </nav>
  );
}

function NavItem({
  href,
  text,
  active,
  sticky,
}: {
  href: string;
  text: string;
  active?: boolean;
  sticky: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-[15px] rounded-full font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 ${
        active
          ? sticky
            ? "text-blue-900 bg-blue-100/70"
            : "text-white bg-white/10"
          : ""
      } ${
        sticky
          ? "text-blue-950 hover:bg-slate-100"
          : "text-white hover:text-blue-950 hover:bg-white/90"
      }`}
      aria-current={active ? "page" : undefined}
      prefetch={false}
      scroll={true}
    >
      {text}
    </Link>
  );
}
