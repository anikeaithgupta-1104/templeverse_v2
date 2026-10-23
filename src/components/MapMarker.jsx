import React from "react";
import {
  Building2,
  Columns2,
  DoorOpen,
  Droplets,
  Flame,
  Images,
  Landmark,
  MapPin,
  Music,
  Pyramid,
  Sun,
} from "lucide-react";

/** Icon per location type — used by the map, cards and legends. */
const TYPE_ICONS = {
  entrance: DoorOpen,
  gopuram: Landmark,
  tower: Pyramid,
  mandapam: Columns2,
  hall: Building2,
  shrine: Flame,
  pond: Droplets,
  chariot: Sun,
  gallery: Images,
  complex: MapPin,
  dance: Music,
};

export function getLocationIcon(type) {
  return TYPE_ICONS[type] || MapPin;
}

/**
 * A single clickable marker on the temple map. Positioned with
 * percentage coordinates from the database (map_x / map_y).
 */
export default function MapMarker({ location, selected, onSelect, label }) {
  const Icon = getLocationIcon(location.type);

  return (
    <button
      type="button"
      onClick={() => onSelect(location)}
      aria-label={label}
      aria-pressed={selected}
      className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
      style={{ left: `${location.map_x}%`, top: `${location.map_y}%` }}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-200 group-hover:scale-110 sm:h-11 sm:w-11 ${
          selected
            ? "marker-pulse scale-110 border-saffron bg-gradient-to-br from-saffron to-saffron-600 text-midnight"
            : "border-saffron/50 bg-midnight-800/90 text-saffron backdrop-blur group-hover:border-saffron"
        }`}
      >
        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
      </span>
      <span
        className={`absolute top-full left-1/2 mt-1.5 -translate-x-1/2 rounded-md px-1.5 py-0.5 text-[10px] font-bold whitespace-nowrap transition-colors sm:text-[11px] ${
          selected ? "bg-saffron text-midnight" : "bg-midnight/80 text-white/85 backdrop-blur"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
