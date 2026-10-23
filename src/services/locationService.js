// ------------------------------------------------------------------
// Location service — location-level queries built on the same
// catalogue used by templeService.
// ------------------------------------------------------------------

import { getTempleBySlug } from "./templeService";

export async function getLocationBySlug(slug, locationId) {
  const temple = await getTempleBySlug(slug);
  if (!temple) return null;
  const location = temple.locations.find((l) => l.id === locationId) || null;
  return { temple, location };
}

/** Previous / next location in display order (for pager navigation). */
export async function getAdjacentLocations(slug, locationId) {
  const temple = await getTempleBySlug(slug);
  if (!temple) return { prev: null, next: null };
  const index = temple.locations.findIndex((l) => l.id === locationId);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? temple.locations[index - 1] : null,
    next: index < temple.locations.length - 1 ? temple.locations[index + 1] : null,
  };
}
