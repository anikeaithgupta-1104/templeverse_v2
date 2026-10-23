import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Flame, MapPin } from "lucide-react";
import SmartImage from "./SmartImage";
import { useLanguage } from "../context/LanguageContext";

/** Temple card used on the Home page and the Temples discovery page. */
export default function TempleCard({ temple }) {
  const { t, L, name, desc } = useLanguage();

  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <Link
        to={`/temple/${temple.slug}`}
        className="img-zoom relative block aspect-[16/10] overflow-hidden"
        aria-label={name(temple)}
      >
        <SmartImage src={temple.image_url} alt={name(temple)} className="h-full w-full object-cover" showNote={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/75 via-transparent to-transparent" />
        <span className="chip chip-gold absolute top-3 left-3">{temple.state}</span>
        {temple.unesco && (
          <span className="chip absolute top-3 right-3 border border-white/25 bg-midnight/70 text-[10px] text-white">
            UNESCO
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl leading-snug font-bold tracking-tight text-midnight transition-colors group-hover:text-saffron-600">
          <Link to={`/temple/${temple.slug}`}>{name(temple)}</Link>
        </h3>

        <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-midnight-700/60">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-saffron-600" aria-hidden="true" />
          {temple.city}, {temple.state}
        </p>

        <p className="clamp-3 mt-3 text-sm leading-relaxed text-midnight-700/75">{desc(temple)}</p>

        <dl className="mt-4 space-y-1.5 text-xs">
          <div className="flex gap-2">
            <dt className="flex shrink-0 items-center gap-1 font-extrabold text-midnight-700/45 uppercase">
              <Flame className="h-3 w-3 text-saffron-600" aria-hidden="true" />
              {t("temple.deity")}
            </dt>
            <dd className="clamp-2 font-semibold text-midnight-700/80">{L(temple, "main_deity")}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="flex shrink-0 items-center gap-1 font-extrabold text-midnight-700/45 uppercase">
              <Calendar className="h-3 w-3 text-saffron-600" aria-hidden="true" />
              {t("temple.period")}
            </dt>
            <dd className="clamp-2 font-semibold text-midnight-700/80">{L(temple, "historical_period")}</dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="chip chip-navy">
            {temple.location_count} {t("temple.shrines")}
          </span>
          <span className="chip chip-navy">🇬🇧 🇮🇳 5</span>
        </div>

        <div className="flex-1" />
        <Link
          to={`/temple/${temple.slug}`}
          className="btn btn-primary btn-sm mt-5 w-full"
          aria-label={`${t("temple.explore")}: ${name(temple)}`}
        >
          {t("temple.explore")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
