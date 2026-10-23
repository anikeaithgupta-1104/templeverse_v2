import React from "react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

/**
 * Image with an honest fallback.
 *
 * TempleVerse only attaches a photograph when it can be matched to the
 * subject with confidence. Where no verified photograph exists (or the
 * image fails to load) we render an architectural placeholder instead
 * of an unrelated picture — misinformation is worse than a blank.
 */
export default function SmartImage({ src, alt, className = "", caption = null, showNote = true }) {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt ? `${alt} — ${t("image.unavailable")}` : t("image.unavailable")}
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-midnight-700 via-midnight-800 to-midnight-900 ${className}`}
      >
        <div className="pattern-dots-light absolute inset-0 opacity-25" aria-hidden="true" />
        {/* stylised gopuram silhouette */}
        <svg viewBox="0 0 200 120" className="absolute bottom-0 h-3/5 w-full opacity-[0.18]" aria-hidden="true" preserveAspectRatio="xMidYMax meet">
          <g fill="#f59e0b">
            <path d="M18 120 V70 Q18 52 34 52 Q50 52 50 70 V120 Z" />
            <path d="M150 120 V70 Q150 52 166 52 Q182 52 182 70 V120 Z" />
            <path d="M100 18 L128 62 H72 Z" />
            <rect x="72" y="62" width="56" height="58" />
            <rect x="56" y="96" width="88" height="24" opacity="0.7" />
            <circle cx="100" cy="12" r="5" />
          </g>
        </svg>
        {showNote && (
          <div className="relative px-4 text-center">
            <p className="text-[11px] font-extrabold tracking-wide text-saffron/70 uppercase">
              {t("image.unavailable")}
            </p>
            <p className="mt-1 text-[10px] leading-snug text-white/35">{t("image.unavailable.sub")}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <figure className={`relative ${caption ? "" : "contents"}`}>
      <img src={src} alt={alt || ""} loading="lazy" decoding="async" onError={() => setFailed(true)} className={className} />
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/85 to-transparent px-3 py-2 text-[11px] font-semibold text-white/80">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
