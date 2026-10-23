import React from "react";
import { useMemo, useState } from "react";
import { ArrowRight, Headphones, MessageCircle, Square, X } from "lucide-react";
import MapMarker, { getLocationIcon } from "./MapMarker";
import SmartImage from "./SmartImage";
import { useLanguage } from "../context/LanguageContext";
import { useGuide } from "../context/GuideContext";
import { generateNarrationScript, getTempleContext } from "../services/templeGuideService";

/**
 * Interactive temple map — generated entirely from database rows.
 * Selecting a marker opens a preview that connects directly to Arya:
 * Explore · Listen with Arya · Ask Arya.
 */
export default function TempleMap({ temple, locations, onExplore }) {
  const { t, lang, name, desc } = useLanguage();
  const { speak, stop, state, setOpen, ask, setContext } = useGuide();
  const [selectedId, setSelectedId] = useState(null);

  const sorted = useMemo(
    () => [...locations].sort((a, b) => a.display_order - b.display_order),
    [locations]
  );
  const selected = sorted.find((l) => l.id === selectedId) || null;
  const pond = sorted.find((l) => l.type === "pond");
  const pathPoints = sorted.map((l) => `${l.map_x},${l.map_y}`).join(" ");
  const speaking = state === "speaking";

  const listenTo = (location) => {
    if (speaking) return stop();
    const ctx = getTempleContext(temple, location, lang);
    speak(generateNarrationScript(ctx));
  };

  const askAbout = (location) => {
    const ctx = getTempleContext(temple, location, lang);
    setContext(temple, location);
    setOpen(true);
    // pass the context explicitly so the answer is about THIS shrine,
    // not the temple the page was showing a moment ago
    ask(t("arya.look"), { context: ctx });
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="relative overflow-hidden rounded-3xl border border-saffron/25 bg-gradient-to-b from-midnight-700 via-midnight-800 to-midnight-900 shadow-2xl">
        <div className="pattern-dots-light pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <rect x="3" y="3" width="94" height="94" rx="6" fill="none" stroke="rgba(245,158,11,0.28)" strokeWidth="0.7" strokeDasharray="2.5 1.6" />
          <polyline points={pathPoints} fill="none" stroke="rgba(245,158,11,0.22)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <polyline points={pathPoints} fill="none" stroke="rgba(252,211,77,0.55)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" className="path-animated" />
          {pond && (
            <g>
              <ellipse cx={pond.map_x} cy={pond.map_y} rx="9" ry="4.5" fill="rgba(56,189,248,0.16)" stroke="rgba(56,189,248,0.45)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              <ellipse cx={pond.map_x} cy={pond.map_y} rx="5" ry="2.4" fill="rgba(56,189,248,0.22)" stroke="rgba(56,189,248,0.5)" strokeWidth="0.35" vectorEffect="non-scaling-stroke" />
            </g>
          )}
          <g transform="translate(89,9)">
            <circle r="5.5" fill="rgba(255,255,255,0.06)" stroke="rgba(252,211,77,0.4)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
            <path d="M0,-3.5 L1.4,2 L0,0.8 L-1.4,2 Z" fill="#fcd34d" />
            <text x="0" y="7.4" textAnchor="middle" fontSize="4" fill="rgba(255,255,255,0.6)">N</text>
          </g>
        </svg>

        {/* aspect keeper so markers always have room */}
        <div className="pointer-events-none aspect-square w-full" aria-hidden="true" />

        {sorted.map((location) => (
          <MapMarker
            key={location.id}
            location={location}
            label={name(location).split("(")[0].trim()}
            selected={selectedId === location.id}
            onSelect={(l) => setSelectedId((cur) => (cur === l.id ? null : l.id))}
          />
        ))}

        <div className="pointer-events-none absolute top-3 left-1/2 w-max max-w-[90%] -translate-x-1/2">
          <span className="chip chip-light truncate">{t("map.title")}</span>
        </div>
      </div>

      {/* legend */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5" aria-label={t("map.legend")}>
        {[...new Set(sorted.map((l) => l.type))].map((type) => {
          const Icon = getLocationIcon(type);
          return (
            <span key={type} className="chip chip-navy">
              <Icon className="h-3 w-3 text-saffron-600" aria-hidden="true" />
              {type}
            </span>
          );
        })}
      </div>

      {/* preview + Arya actions */}
      {selected ? (
        <div className="fade-up card mt-4 overflow-hidden" role="dialog" aria-label={name(selected)}>
          <div className="flex gap-4 p-4">
            <SmartImage
              src={selected.image_url}
              alt={name(selected)}
              className="h-20 w-24 shrink-0 rounded-xl object-cover"
              showNote={false}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-display text-base leading-snug font-bold text-midnight">{name(selected)}</h4>
                <button
                  onClick={() => setSelectedId(null)}
                  className="shrink-0 rounded-lg p-1 text-midnight-700/40 hover:text-red-500"
                  aria-label={t("map.close")}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <p className="clamp-2 mt-1 text-sm text-midnight-700/70">{desc(selected)}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-midnight/8 bg-cream-100/50 p-3">
            <button className="btn btn-primary btn-sm" onClick={() => onExplore(selected)}>
              {t("map.explore")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button className="btn btn-dark btn-sm" onClick={() => listenTo(selected)}>
              {speaking ? (
                <>
                  <Square className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
                  {t("arya.stop")}
                </>
              ) : (
                <>
                  <Headphones className="h-4 w-4" aria-hidden="true" />
                  {t("arya.listen")}
                </>
              )}
            </button>
            <button className="btn btn-outline btn-sm" onClick={() => askAbout(selected)}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t("arya.ask")}
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-center text-sm font-semibold text-midnight-700/50">{t("map.subtitle")}</p>
      )}
    </div>
  );
}
