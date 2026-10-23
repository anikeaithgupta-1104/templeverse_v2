import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SmartImage from "./SmartImage";
import { useLanguage } from "../context/LanguageContext";
import { getLocationIcon } from "./MapMarker";

/**
 * Location card used in the temple detail page grid.
 * Navigates to the location detail page.
 */
export default function LocationCard({ templeSlug, location }) {
  const { t, name, desc } = useLanguage();
  const Icon = getLocationIcon(location.type);

  return (
    <Link
      to={`/temple/${templeSlug}/location/${location.id}`}
      className="card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="img-zoom relative aspect-[16/10] overflow-hidden">
        <SmartImage src={location.image_url} alt={name(location)} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 chip chip-light">
          <Icon className="h-3 w-3" aria-hidden="true" />
          {location.type}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h4 className="font-display text-lg leading-snug font-bold text-midnight group-hover:text-saffron-600">
          {name(location)}
        </h4>
        <p className="clamp-2 mt-1.5 text-sm text-midnight-700/70">{desc(location)}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-saffron-600">
          {t("map.explore")}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
