// ------------------------------------------------------------------
// TempleVerse — demo dataset assembler.
// Merges every language layer into the base English entities so that
// each entity exposes: { ...enFields, translations: { ta, hi, te, ml } }
// The Supabase service produces the exact same shape.
// ------------------------------------------------------------------

import { DEMO_TEMPLES } from "./temples";
import { DEMO_LOCATIONS } from "./locations";
import { DEMO_GUIDED_STEPS } from "./guidedSteps";
import { TA_TRANSLATIONS } from "./taTranslations";
import { TA_EXTRA } from "./taExtra";
import { HI_TRANSLATIONS } from "./hiTranslations";
import { TE_TRANSLATIONS } from "./teTranslations";
import { ML_TRANSLATIONS } from "./mlTranslations";

export const DEMO_LANGUAGES = [
  { code: "en", name: "English", native_name: "English" },
  { code: "hi", name: "Hindi", native_name: "हिन्दी" },
  { code: "te", name: "Telugu", native_name: "తెలుగు" },
  { code: "ta", name: "Tamil", native_name: "தமிழ்" },
  { code: "ml", name: "Malayalam", native_name: "മലയാളം" },
];

const TA_ALL = { ...TA_TRANSLATIONS, ...TA_EXTRA };

const LAYERS = {
  ta: TA_ALL,
  hi: HI_TRANSLATIONS,
  te: TE_TRANSLATIONS,
  ml: ML_TRANSLATIONS,
};

function attachTranslations(entity) {
  const translations = {};
  for (const code of Object.keys(LAYERS)) {
    const record = LAYERS[code][entity.id];
    if (record) translations[code] = record;
  }
  return { ...entity, translations };
}

export const TEMPLES = DEMO_TEMPLES.map(attachTranslations);
export const LOCATIONS = DEMO_LOCATIONS.map(attachTranslations);
export const GUIDED_STEPS = DEMO_GUIDED_STEPS.map(attachTranslations);
