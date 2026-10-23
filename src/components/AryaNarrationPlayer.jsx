import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw, RotateCw, Square, Volume2, AlertTriangle } from "lucide-react";
import { useGuide } from "../context/GuideContext";
import { useLanguage } from "../context/LanguageContext";
import { SUPPORTED_LANGUAGES } from "../services/translationService";

/** Approximate characters spoken per second — used for the ±10s skips. */
const CHARS_PER_SECOND = 14;

/**
 * Narration transport for Arya. Every control performs a real action:
 * play / pause / resume / stop, ±10 seconds (by re-speaking from a
 * computed character offset), playback speed and language display.
 */
export default function AryaNarrationPlayer({ text, title, compact = false }) {
  const { t, lang, setLang } = useLanguage();
  const { state, progress, speak, pause, resume, stop, rate, changeRate, voiceMode, hasVoice } = useGuide();
  const [offset, setOffset] = useState(0);

  const total = text?.length || 0;
  const speaking = state === "speaking";
  const loading = state === "loading";
  const errored = state === "error";

  // Reset the skip offset whenever the narration text or language changes
  useEffect(() => {
    setOffset(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, lang]);

  const absoluteProgress = useMemo(() => {
    if (!total) return 0;
    const spokenInSegment = progress * (total - offset);
    return Math.min(1, (offset + spokenInSegment) / total);
  }, [progress, offset, total]);

  const estTotalSeconds = total / CHARS_PER_SECOND / (rate || 1);
  const elapsedSeconds = absoluteProgress * estTotalSeconds;

  const fmt = (s) => {
    if (!isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const speakFrom = (charIndex) => {
    const start = Math.max(0, Math.min(total - 1, Math.round(charIndex)));
    setOffset(start);
    speak(text.slice(start));
  };

  const handlePlay = () => {
    if (speaking) {
      pause();
    } else if (absoluteProgress > 0 && absoluteProgress < 1) {
      resume();
    } else {
      setOffset(0);
      speak(text);
    }
  };

  const skip = (seconds) => {
    const deltaChars = seconds * CHARS_PER_SECOND * (rate || 1);
    const current = absoluteProgress * total;
    speakFrom(current + deltaChars);
  };

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === lang);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-midnight-800 to-midnight-900 text-white shadow-xl">
      <div className={compact ? "p-3.5" : "p-4 sm:p-5"}>
        {/* header row */}
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{title}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold text-white/50">
              <Volume2 className="h-3 w-3" aria-hidden="true" />
              {voiceMode === "ai" ? t("arya.voiceReal") : t("arya.voiceDemo")}
              <span aria-hidden="true">•</span>
              {currentLang?.native}
            </p>
          </div>
          <span
            className={`chip shrink-0 ${
              speaking ? "chip-gold !bg-saffron/20 !text-saffron-300 !border-saffron/40" : "chip-light"
            }`}
          >
            {loading ? t("arya.state.loading") : speaking ? t("arya.state.speaking") : t("arya.state.idle")}
          </span>
        </div>

        {/* progress */}
        <div className="mt-3 flex items-center gap-2">
          <span className="w-9 text-[11px] font-semibold text-white/45 tabular-nums">{fmt(elapsedSeconds)}</span>
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-saffron-300 to-saffron transition-[width] duration-200"
              style={{ width: `${absoluteProgress * 100}%` }}
            />
          </div>
          <span className="w-9 text-right text-[11px] font-semibold text-white/45 tabular-nums">
            {fmt(estTotalSeconds)}
          </span>
        </div>

        {/* transport */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            onClick={() => skip(-10)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-saffron/60 hover:text-saffron disabled:opacity-40"
            aria-label={t("arya.back10")}
            title={t("arya.back10")}
            disabled={!total}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            onClick={handlePlay}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-saffron-600 text-midnight shadow-lg transition-transform hover:scale-105"
            aria-label={speaking ? t("arya.pause") : t("arya.listen")}
          >
            {speaking ? (
              <Pause className="h-5 w-5" fill="currentColor" aria-hidden="true" />
            ) : (
              <Play className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true" />
            )}
          </button>

          <button
            onClick={() => skip(10)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-saffron/60 hover:text-saffron disabled:opacity-40"
            aria-label={t("arya.fwd10")}
            title={t("arya.fwd10")}
            disabled={!total}
          >
            <RotateCw className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            onClick={() => {
              stop();
              setOffset(0);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-red-400/60 hover:text-red-300"
            aria-label={t("arya.stop")}
            title={t("arya.stop")}
          >
            <Square className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
          </button>

          {/* speed */}
          <label className="ml-auto flex items-center gap-1.5 text-[11px] font-bold text-white/55">
            {t("arya.speed")}
            <select
              value={rate}
              onChange={(e) => changeRate(Number(e.target.value))}
              className="rounded-md border border-white/15 bg-midnight-700 px-1.5 py-1 text-[11px] font-bold text-white focus:outline-none"
              aria-label={t("arya.speed")}
            >
              {[0.75, 1, 1.25, 1.5].map((r) => (
                <option key={r} value={r}>{r}×</option>
              ))}
            </select>
          </label>

          {/* language */}
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-white/55">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="rounded-md border border-white/15 bg-midnight-700 px-1.5 py-1 text-[11px] font-bold text-white focus:outline-none"
              aria-label={t("arya.language")}
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.native}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* honest notices */}
      {!hasVoice && (
        <p className="flex items-start gap-2 border-t border-amber-400/20 bg-amber-400/10 px-4 py-2 text-[11px] leading-relaxed text-amber-200">
          <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
          {t("arya.noVoice")}
        </p>
      )}
      {errored && (
        <p className="border-t border-red-400/20 bg-red-500/10 px-4 py-2 text-[11px] font-semibold text-red-300">
          {t("arya.state.error")}
        </p>
      )}
      {voiceMode !== "ai" && (
        <p className="border-t border-white/10 px-4 py-2 text-[10px] leading-relaxed text-white/35">
          {t("arya.voiceNote")}
        </p>
      )}
    </div>
  );
}
