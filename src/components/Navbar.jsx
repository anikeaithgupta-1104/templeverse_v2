import React from "react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Bot, Landmark, Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import OfflineBadge from "./OfflineBadge";
import { useLanguage } from "../context/LanguageContext";

const linkBase = "rounded-lg px-3 py-2.5 text-sm font-bold transition-colors hover:text-saffron-600";

function NavLinks({ onNavigate }) {
  const { t } = useLanguage();
  const links = [
    { to: "/", label: t("nav.home"), end: true },
    { to: "/temples", label: t("nav.temples"), end: false },
    { to: "/guide", label: t("nav.guide"), end: false, icon: Bot },
    { to: "/offline", label: t("nav.offline"), end: false },
    { to: "/about", label: t("nav.about"), end: false },
  ];
  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `${linkBase} flex items-center gap-1.5 ${isActive ? "text-saffron-600" : "text-midnight-700"}`
          }
        >
          {link.icon && <link.icon className="h-3.5 w-3.5" aria-hidden="true" />}
          {link.label}
        </NavLink>
      ))}
    </>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const closeMenu = () => setMobileOpen(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-midnight/5 bg-cream/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" aria-label="TempleVerse home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-midnight-700 to-midnight-900 shadow-md">
            <Landmark className="h-4 w-4 text-saffron" aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-midnight sm:text-xl">
            TEMPLE<span className="text-gold-grad">VERSE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
          <NavLinks onNavigate={closeMenu} />
        </nav>

        <div className="flex items-center gap-2">
          <OfflineBadge key={location.pathname} />
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-midnight/10 bg-white/70 text-midnight-700 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-midnight/5 bg-cream px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            <NavLinks onNavigate={closeMenu} />
            <div className="mt-3 flex items-center justify-between border-t border-midnight/10 pt-3">
              <span className="text-xs font-bold tracking-wider text-midnight-700/50 uppercase">
                {t("common.langLabel")}
              </span>
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
