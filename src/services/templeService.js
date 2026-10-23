// ------------------------------------------------------------------
// Temple service — the single source of temple data for the app.
//
// 1. If Supabase is configured  -> fetch from PostgreSQL tables
// 2. On any error / unconfigured -> fall back to local demo data
//
// The returned shape is identical either way:
//   temple { ...fields, translations: { ta: {...} }, locations: [...], guided_steps: [...] }
// ------------------------------------------------------------------

import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { TEMPLES, LOCATIONS, GUIDED_STEPS } from "../data/demoData";

export const dataSource = {
  mode: isSupabaseConfigured ? "supabase" : "demo",
  ready: false,
};

const demoLatency = () => new Promise((resolve) => setTimeout(resolve, 350));

let cataloguePromise = null;

/* ---------------- Supabase fetching ---------------- */

async function fetchFromSupabase() {
  const [
    templesRes, translationsRes, locationsRes, locationTransRes,
    stepsRes, stepTransRes, timelineRes, templeSourcesRes,
  ] = await Promise.all([
    supabase.from("temples").select("*").eq("published", true).order("name"),
    supabase.from("temple_translations").select("*, languages(code)"),
    supabase.from("temple_locations").select("*").order("display_order"),
    supabase.from("location_translations").select("*, languages(code)"),
    supabase.from("guided_steps").select("*").order("step_number"),
    supabase.from("guided_step_translations").select("*, languages(code)"),
    supabase.from("temple_timeline").select("*").order("display_order"),
    supabase.from("temple_sources").select("temple_id, sources(*)"),
  ]);

  const fail = (label) => {
    throw new Error(`Supabase query failed: ${label}`);
  };

  if (templesRes.error) fail("temples");
  if (translationsRes.error) fail("temple_translations");
  if (locationsRes.error) fail("temple_locations");
  if (locationTransRes.error) fail("location_translations");
  if (stepsRes.error) fail("guided_steps");
  if (stepTransRes.error) fail("guided_step_translations");

  const temples = templesRes.data || [];
  const locations = locationsRes.data || [];
  const steps = stepsRes.data || [];

  // Attach translations as { [langCode]: {...fields} }
  const attachTrans = (rows, targetIdField) => {
    const map = {};
    for (const row of rows || []) {
      const targetId = row[targetIdField];
      const code = row.languages?.code || "en";
      if (!map[targetId]) map[targetId] = {};
      map[targetId][code] = { ...row, language_code: code };
    }
    return map;
  };

  const templeTrans = attachTrans(translationsRes.data, "temple_id", "temple_id");
  const locationTrans = attachTrans(locationTransRes.data, "location_id", "location_id");
  const stepTrans = attachTrans(stepTransRes.data, "step_id", "step_id");

  const toEntity = (row, transMap) => {
    const trans = transMap[row.id] || {};
    const clean = (t) => {
      const { languages, language_id, id, ...rest } = t || {};
      return rest;
    };
    const translations = {};
    for (const code of Object.keys(trans)) translations[code] = clean(trans[code]);
    return { ...row, translations };
  };

  // Timeline + sources are optional relations — never fatal if absent.
  const timelineByTemple = {};
  for (const row of timelineRes.data || []) {
    (timelineByTemple[row.temple_id] ||= []).push({ year: row.year_label, event: row.event });
  }
  const sourcesByTemple = {};
  for (const row of templeSourcesRes.data || []) {
    const s = row.sources;
    if (!s) continue;
    (sourcesByTemple[row.temple_id] ||= []).push({
      id: s.id, title: s.title, url: s.url, type: s.source_type,
    });
  }

  const shapedTemples = temples.map((row) => {
    const t = toEntity(row, templeTrans);
    return {
      ...t,
      timeline: timelineByTemple[t.id] || [],
      sources: sourcesByTemple[t.id] || [],
      gallery: [],
    };
  });
  const shapedLocations = locations.map((row) => {
    const loc = toEntity(row, locationTrans);
    return { ...loc, temple_id: loc.temple_id };
  });
  const shapedSteps = steps.map((row) => toEntity(row, stepTrans));

  return {
    temples: shapedTemples,
    locations: shapedLocations,
    guided_steps: shapedSteps,
  };
}

/* ---------------- Public API ---------------- */

async function getCatalogue() {
  if (cataloguePromise) return cataloguePromise;

  cataloguePromise = (async () => {
    if (isSupabaseConfigured) {
      try {
        const data = await fetchFromSupabase();
        dataSource.mode = "supabase";
        dataSource.ready = true;
        return data;
      } catch (err) {
        console.warn("TempleVerse: Supabase unavailable, using demo data.", err);
      }
    }
    dataSource.mode = "demo";
    dataSource.ready = true;
    await demoLatency(); // small delay so loading states are visible
    return { temples: TEMPLES, locations: LOCATIONS, guided_steps: GUIDED_STEPS };
  })();

  return cataloguePromise;
}

/** Temple list for cards, with locations attached and search/filter applied. */
export async function getTemples({ search = "", state = "" } = {}) {
  const { temples, locations } = await getCatalogue();
  const locCount = (templeId) => locations.filter((l) => l.temple_id === templeId).length;

  const query = search.trim().toLowerCase();
  const filtered = temples.filter((temple) => {
    const matchesState = !state || temple.state === state;
    const haystack = [
      temple.name,
      temple.location,
      temple.city,
      temple.state,
      temple.main_deity,
      temple.description,
      temple.translations?.ta?.name,
      temple.translations?.ta?.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchesSearch = !query || haystack.includes(query);
    return matchesState && matchesSearch;
  });

  return filtered.map((temple) => ({
    ...temple,
    location_count: locCount(temple.id),
    language_codes: ["en", "ta"],
  }));
}

export async function getTempleBySlug(slug) {
  const { temples, locations, guided_steps } = await getCatalogue();
  const temple = temples.find((t) => t.slug === slug);
  if (!temple) return null;
  const templeLocations = locations
    .filter((l) => l.temple_id === temple.id)
    .sort((a, b) => a.display_order - b.display_order);
  const steps = guided_steps
    .filter((s) => s.temple_id === temple.id)
    .sort((a, b) => a.step_number - b.step_number);
  return { ...temple, locations: templeLocations, guided_steps: steps };
}

export async function getStates() {
  const { temples } = await getCatalogue();
  return [...new Set(temples.map((t) => t.state))].sort();
}
