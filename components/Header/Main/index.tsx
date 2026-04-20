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
import { SUPPORTED_UI_LOCALES, type LanguageCore, detectClientRegion } from "@/lib/i18n";

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
  const [clientRegion, setClientRegion] = useState<"global" | "be" | null>(null);
  useEffect(() => {
    // Détecter la région uniquement côté client pour éviter les mismatches d'hydratation
    setClientRegion(detectClientRegion());
  }, []);

  const navItems: NavTopItem[] = [
    {
      label: "Solutions",
      children: [
        { label: "Order Management", href: "/order-management" },
        { label: "E-Waybill", href: "/e-waybill" },
        { label: "Invoice Integrity & Automation", href: "/invoice-integrity" },
        { label: "E-Invoicing", href: "/e-invoicing" },
        { label: "Supply Chain Finance", href: "/financial-services" },
        { label: "Analytics & Intelligence", href: "/analytics" },
        { label: "Integration & Connectivity", href: "/integration" },
      ],
    },
    {
      label: "Financial Institutions",
      children: [
        { label: "SCF for Banks", href: "/scf-banks" },
        { label: "SCF for Asset Managers & Credit Funds", href: "/scf-asset-managers" },
        { label: "SCF for Insurers & Credit Insurers", href: "/scf-insurers" },
      ],
    },
    {
      label: "Industries",
      children: [
        { label: "Transport & Logistics", href: "/industries/transport-logistics" },
        { label: "Government & Public Authorities", href: "/industries/government" },
        { label: "Wholesale & Distribution", href: "/industries/wholesale-distribution" },
        { label: "Manufacturing", href: "/industries/manufacturing" },
        { label: "Consumer Goods", href: "/industries/consumer-goods" },
        { label: "Healthcare", href: "/industries/healthcare" },
      ],
    },
  ];

  // Keep legacy menu for IntersectionObserver active-section tracking
  const menu = useMemo(
    () => [
      { name: "Solutions", anchor: "#services", id: "services" },
      { name: "Benefits", anchor: "#benefit", id: "benefit" },
    ],
    []
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
  const [, setActiveHash] = useState<string>("");
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
              {/* Globe icon to go back to global site when on BE domain */}
              {clientRegion === "be" && (
                <a
                  href="https://www.fincargo.ai"
                  className="inline-flex items-center justify-center px-1.5 py-1"
                  aria-label="Go to global site"
                  title="Global site"
                >
                  <IconGlobe className="h-4 w-4" />
                </a>
              )}
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

              <DropdownNav items={navItems} sticky={sticky} isHome={isHomePath} localizeHref={localizeHref} />

              <div className="flex items-center gap-3">
                <Link href={localizeHref("/get-started")}>
                  <button
                    data-analytics-action="cta_click"
                    data-analytics-category="Header"
                    data-analytics-label="Get Started"
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition shadow-sm ring-1 ${
                      sticky || !isHomePath
                        ? "bg-darkBlue text-white ring-darkBlue hover:bg-lightBlue hover:ring-lightBlue"
                        : "bg-white text-blue-950 ring-white hover:bg-slate-100"
                    }`}
                  >
                    {t("get_started")}
                  </button>
                </Link>
                <LanguageSwitcher />
                {/* Globe icon to go back to global site when on BE domain */}
                {clientRegion === "be" && (
                  <a
                    href="https://www.fincargo.ai"
                    className="inline-flex items-center justify-center px-2 py-1.5"
                    aria-label="Global site"
                    title="Global site"
                  >
                    <IconGlobe className="h-4 w-4" />
                  </a>
                )}
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
// DropdownNav
// -----------------

type NavChild = { label: string; href: string };
type NavTopItem = { label: string; href?: string; children?: NavChild[] };

function DropdownNav({
  items,
  sticky,
  isHome = true,
  localizeHref,
}: {
  items: NavTopItem[];
  sticky: boolean;
  isHome?: boolean;
  localizeHref: (href: string) => string;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const dark = sticky || !isHome;
  const textColor = dark ? "text-blue-950" : "text-white";
  const hoverBg = dark ? "hover:bg-slate-100" : "hover:bg-white/10";

  return (
    <nav aria-label="Primary" ref={ref} className="flex items-center gap-1">
      {items.map((item) => {
        if (!item.children) {
          return (
            <Link
              key={item.label}
              href={localizeHref(item.href!)}
              className={`px-4 py-2 text-[15px] rounded-full font-semibold transition ${textColor} ${hoverBg}`}
              prefetch={false}
            >
              {item.label}
            </Link>
          );
        }
        return (
          <div key={item.label} className="relative">
            <button
              onClick={() => setOpen(open === item.label ? null : item.label)}
              className={`flex items-center gap-1 px-4 py-2 text-[15px] rounded-full font-semibold transition ${textColor} ${hoverBg}`}
            >
              {item.label}
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${open === item.label ? "rotate-180" : ""}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open === item.label && (
              <div className="absolute left-0 top-full mt-2 w-80 rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl ring-1 ring-black/5 z-50">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={localizeHref(child.href)}
                    onClick={() => setOpen(null)}
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition"
                    prefetch={false}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

// Small EU flag (blue with 12 stars) for the BE header link
function IconGlobe({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15.3 15.3 0 0 1 0 18a15.3 15.3 0 0 1 0-18z" />
    </svg>
  );
}
