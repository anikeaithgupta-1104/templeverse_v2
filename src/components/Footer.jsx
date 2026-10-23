import React from "react";
import { Link } from "react-router-dom";
import { Landmark, Wifi, Database } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { dataSource } from "../services/templeService";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 bg-midnight text-white">
      <div className="pattern-dots-light pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <Landmark className="h-4.5 w-4.5 text-saffron" aria-hidden="true" />
              </span>
              <span className="font-display text-xl font-bold">
                TEMPLE<span className="text-gold-grad">VERSE</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {t("brand.tagline")}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="chip chip-light">🗺 5 Temples</span>
              <span className="chip chip-light">🌐 5 Languages</span>
              <span className="chip chip-light">🤖 AI Guide</span>
            </div>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-saffron">
              {t("nav.explore")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/temples" className="text-white/70 transition-colors hover:text-saffron">
                  {t("footer.links.temples")}
                </Link>
              </li>
              <li>
                <Link to="/temple/brihadeeswarar/guided" className="text-white/70 transition-colors hover:text-saffron">
                  {t("footer.links.guided")}
                </Link>
              </li>
              <li>
                <Link to="/offline" className="text-white/70 transition-colors hover:text-saffron">
                  {t("footer.links.offline")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 transition-colors hover:text-saffron">
                  {t("footer.links.about")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Prototype note */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-saffron">
              {t("about.title")}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {t("offline.note")}
            </p>
            <div className="mt-4 flex items-center gap-2">
              {dataSource.mode === "supabase" ? (
                <span className="chip chip-green !bg-white/10 !text-emerald-300">
                  <Database className="h-3 w-3" aria-hidden="true" />
                  {t("common.supabaseMode")}
                </span>
              ) : (
                <span className="chip chip-light">
                  <Wifi className="h-3 w-3" aria-hidden="true" />
                  {t("common.demoMode")}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>🛕 TempleVerse © {year} — {t("footer.note")}</p>
          <p>{t("footer.tech")}</p>
        </div>
      </div>
    </footer>
  );
}
