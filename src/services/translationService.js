// ------------------------------------------------------------------
// TempleVerse — translation service.
//
// Content policy: when a piece of TEMPLE CONTENT has no verified
// translation in the active language, we do NOT silently substitute
// another language. `translateContent()` returns a flag so the UI can
// display "Translation unavailable" next to the English fallback.
//
// UI chrome (buttons, labels) falls back to English silently, which
// is standard practice and keeps the interface usable.
// ------------------------------------------------------------------

import { UI_STRINGS } from "../data/uiStrings";
import { EXTRA_STRINGS } from "../data/uiStringsMore";

export const SUPPORTED_LANGUAGES = [
  { code: "en", flag: "🇬🇧", label: "English", native: "English", bcp47: "en-IN" },
  { code: "hi", flag: "🇮🇳", label: "Hindi", native: "हिन्दी", bcp47: "hi-IN" },
  { code: "te", flag: "🇮🇳", label: "Telugu", native: "తెలుగు", bcp47: "te-IN" },
  { code: "ta", flag: "🇮🇳", label: "Tamil", native: "தமிழ்", bcp47: "ta-IN" },
  { code: "ml", flag: "🇮🇳", label: "Malayalam", native: "മലയാളം", bcp47: "ml-IN" },
];

export const LANGUAGE_CODES = SUPPORTED_LANGUAGES.map((l) => l.code);

/* Merge base dictionary with the extra/override dictionary per language. */
const DICTIONARIES = LANGUAGE_CODES.reduce((acc, code) => {
  acc[code] = { ...(UI_STRINGS[code] || {}), ...(EXTRA_STRINGS[code] || {}) };
  return acc;
}, {});

const EN = DICTIONARIES.en;

/** UI string lookup with English fallback. */
export function t(key, lang) {
  const dict = DICTIONARIES[lang] || EN;
  return dict[key] ?? EN[key] ?? key;
}

/**
 * Resolve a CONTENT field for a language.
 * @returns {{ text: string, untranslated: boolean, language: string }}
 */
export function translateContent(entity, field, lang) {
  if (!entity) return { text: "", untranslated: false, language: lang };
  if (lang !== "en") {
    const localized = entity.translations?.[lang]?.[field];
    if (localized) return { text: localized, untranslated: false, language: lang };
  }
  const english = entity[field] ?? "";
  return { text: english, untranslated: Boolean(english) && lang !== "en", language: "en" };
}

/** Convenience: just the text (used where the badge isn't needed). */
export function getTranslation(entity, field, lang) {
  return translateContent(entity, field, lang).text;
}

/** Back-compatible helper used across the components. */
export function getLocalizedField(entity, field, lang) {
  return translateContent(entity, field, lang).text;
}

export function getLocalizedName(entity, lang) {
  return getLocalizedField(entity, "name", lang) || entity?.name || "";
}

export function getLocalizedDescription(entity, lang) {
  return getLocalizedField(entity, "description", lang);
}

/** Very small heuristic language detector (script based). */
export function detectLanguage(text = "") {
  if (/[\u0B80-\u0BFF]/.test(text)) return "ta";
  if (/[\u0C00-\u0C7F]/.test(text)) return "te";
  if (/[\u0D00-\u0D7F]/.test(text)) return "ml";
  if (/[\u0900-\u097F]/.test(text)) return "hi";
  return "en";
}

/** Which languages actually have a verified record for this entity. */
export function availableLanguagesFor(entity) {
  if (!entity) return ["en"];
  return ["en", ...Object.keys(entity.translations || {})];
}

export function bcp47(lang) {
  return SUPPORTED_LANGUAGES.find((l) => l.code === lang)?.bcp47 || "en-IN";
}
