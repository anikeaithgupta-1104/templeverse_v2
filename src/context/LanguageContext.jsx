import React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  t as translate,
  translateContent,
  getLocalizedField,
  getLocalizedName,
  getLocalizedDescription,
  LANGUAGE_CODES,
  bcp47,
} from "../services/translationService";
import { changeLanguage as setVoiceLanguage } from "../services/voiceService";

const LanguageContext = createContext(null);
const STORAGE_KEY = "templeverse_lang";

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return LANGUAGE_CODES.includes(saved) ? saved : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable */
    }
    document.documentElement.lang = bcp47(lang);
    setVoiceLanguage(lang);
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang: setLangState,
      /** UI string */
      t: (key) => translate(key, lang),
      /** localized content text */
      L: (entity, field) => getLocalizedField(entity, field, lang),
      /** localized content with translation-availability flag */
      C: (entity, field) => translateContent(entity, field, lang),
      name: (entity) => getLocalizedName(entity, lang),
      desc: (entity) => getLocalizedDescription(entity, lang),
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
