import React from "react";
import { Link } from "react-router-dom";
import { Compass, Home } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="relative flex min-h-[65vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
      <div className="pattern-arch pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative">
        <div className="flex items-end justify-center gap-2" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-16 rounded-t-2xl bg-gradient-to-t from-midnight-700 to-midnight-900 sm:w-20"
              style={{ height: `${70 - i * 18}px`, borderTopLeftRadius: `${50 - i * 12}px`, borderTopRightRadius: `${50 - i * 12}px` }}
            />
          ))}
        </div>
        <p className="mt-4 font-display text-7xl font-bold text-gold-grad sm:text-8xl">404</p>
        <h1 className="mt-3 font-display text-2xl font-bold text-midnight sm:text-3xl">{t("common.notfound.title")}</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-midnight-700/65">{t("common.notfound.desc")}</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn btn-primary btn-sm">
            <Home className="h-4 w-4" aria-hidden="true" />
            {t("common.home")}
          </Link>
          <Link to="/temples" className="btn btn-outline btn-sm">
            <Compass className="h-4 w-4" aria-hidden="true" />
            {t("nav.temples")}
          </Link>
        </div>
      </div>
    </main>
  );
}
