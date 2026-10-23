import React from "react";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "../services/translationService";
import { useLanguage } from "../context/LanguageContext";

/**
 * Language switcher dropdown (English / Tamil, extensible).
 * Appears in the navbar on desktop and inside the mobile menu.
 */
export default function LanguageSwitcher({ compact = false }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const current = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex h-10 items-center gap-2 rounded-xl border border-midnight/10 bg-white/70 px-3 text-sm font-bold text-midnight-700 transition-colors hover:border-saffron/50"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <Globe className="h-4 w-4 text-saffron-600" aria-hidden="true" />
        {!compact && (
          <>
            <span className="hidden sm:inline">{current.flag}</span>
            <span>{current.native}</span>
          </>
        )}
        <ChevronDown
          className={`h-3.5 w-3.5 text-midnight-700/50 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Language"
          className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-midnight/10 bg-white py-1 shadow-xl"
        >
          {SUPPORTED_LANGUAGES.map((option) => (
            <li key={option.code} role="option" aria-selected={lang === option.code}>
              <button
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-saffron/10 ${
                  lang === option.code ? "text-saffron-600" : "text-midnight-700"
                }`}
                onClick={() => {
                  setLang(option.code);
                  setOpen(false);
                }}
              >
                <span className="text-base" aria-hidden="true">
                  {option.flag}
                </span>
                <span className="flex-1">{option.label}</span>
                <span className="text-xs text-midnight-700/50">{option.native}</span>
                {lang === option.code && <Check className="h-4 w-4" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
