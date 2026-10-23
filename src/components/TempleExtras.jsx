import React from "react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Info, X } from "lucide-react";
import SmartImage from "./SmartImage";
import { useLanguage } from "../context/LanguageContext";

/* ==================================================================
   Historical timeline
================================================================== */
export function Timeline({ items = [] }) {
  const { t } = useLanguage();
  if (!items.length) return null;
  return (
    <section aria-label={t("temple.timeline")}>
      <h2 className="font-display text-2xl font-bold text-midnight sm:text-3xl">{t("temple.timeline")}</h2>
      <ol className="relative mt-6 space-y-5 border-l-2 border-saffron/25 pl-6">
        {items.map((item, i) => (
          <li key={`${item.year}-${i}`} className="relative">
            <span
              className="absolute top-1.5 -left-[31px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-saffron bg-cream"
              aria-hidden="true"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
            </span>
            <p className="text-xs font-extrabold tracking-wide text-saffron-600 uppercase">{item.year}</p>
            <p className="mt-1 text-sm leading-relaxed text-midnight-700/80">{item.event}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ==================================================================
   Gallery with an accessible lightbox
================================================================== */
export function Gallery({ items = [], templeName = "" }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(null);
  const openItem = index !== null ? items[index] : null;

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length]);

  if (!items.length) return null;

  return (
    <section aria-label={t("temple.gallery")}>
      <h2 className="font-display text-2xl font-bold text-midnight sm:text-3xl">{t("temple.gallery")}</h2>
      <p className="mt-2 text-sm text-midnight-700/60">{t("temple.gallery.sub")}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item, i) => (
          <button
            key={item.url + i}
            onClick={() => setIndex(i)}
            className="img-zoom group relative aspect-[4/3] overflow-hidden rounded-xl border border-midnight/10 shadow-sm transition-shadow hover:shadow-lg"
            aria-label={`${item.caption || templeName} — open image ${i + 1}`}
          >
            <SmartImage src={item.url} alt={item.caption || templeName} className="h-full w-full object-cover" showNote={false} />
            <span className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {openItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={openItem.caption || templeName}
        >
          <button className="absolute inset-0" onClick={() => setIndex(null)} aria-label={t("common.close")} />
          <button
            onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
            className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur hover:border-saffron"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <figure className="relative max-h-[85vh] w-full max-w-3xl">
            <SmartImage
              src={openItem.url}
              alt={openItem.caption || templeName}
              className="max-h-[75vh] w-full rounded-2xl object-contain"
              showNote={false}
            />
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {openItem.caption}
              {openItem.credit && <span className="block text-xs text-white/45">{openItem.credit}</span>}
              <span className="mt-1 block text-xs text-white/40">
                {index + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
          <button
            onClick={() => setIndex((i) => (i + 1) % items.length)}
            className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur hover:border-saffron"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={() => setIndex(null)}
            className="absolute top-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur hover:border-saffron"
            aria-label={t("common.close")}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}

/* ==================================================================
   Sources & references — every link opens the real published source
================================================================== */
export function Sources({ sources = [] }) {
  const { t } = useLanguage();
  if (!sources.length) return null;
  return (
    <section aria-label={t("temple.sources")}>
      <h2 className="font-display text-2xl font-bold text-midnight sm:text-3xl">{t("temple.sources")}</h2>
      <p className="mt-2 text-sm text-midnight-700/60">{t("temple.sources.sub")}</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {sources.map((s) => (
          <li key={s.id}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex items-start gap-3 p-4 transition-all hover:-translate-y-0.5 hover:border-saffron/40 hover:shadow-lg"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-saffron/12 text-saffron-600">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-midnight group-hover:text-saffron-600">{s.title}</span>
                <span className="mt-0.5 block text-xs text-midnight-700/55">{s.type}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ==================================================================
   "Translation unavailable" notice — honest, never silent
================================================================== */
export function UntranslatedNotice({ show }) {
  const { t } = useLanguage();
  if (!show) return null;
  return (
    <p className="mb-3 flex items-start gap-2 rounded-lg border border-amber-300/60 bg-amber-50 px-3 py-2 text-[11px] leading-relaxed font-semibold text-amber-900">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>
        {t("content.untranslated")} — {t("content.untranslated.sub")}
      </span>
    </p>
  );
}
