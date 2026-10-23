import React from "react";
import { useMemo } from "react";
import { Sparkles } from "lucide-react";
import AryaAvatar from "./AryaAvatar";
import AryaNarrationPlayer from "./AryaNarrationPlayer";
import GuideChat from "./GuideChat";
import { useGuide } from "../context/GuideContext";
import { useLanguage } from "../context/LanguageContext";
import { generateNarrationScript } from "../services/templeGuideService";

/**
 * The full Arya experience: character + narration transport + chat.
 * Used on /guide, and as a sidebar on temple and location pages.
 */
export default function AryaPanel({ chatHeight = "24rem", sticky = false }) {
  const { t } = useLanguage();
  const { state, context } = useGuide();

  const script = useMemo(() => (context ? generateNarrationScript(context) : ""), [context]);
  const title = context
    ? context.location
      ? `${t("arya.listenStory")} — ${context.locationName}`
      : `${t("arya.listenStory")} — ${context.templeName}`
    : t("arya.role");

  return (
    <aside className={`space-y-4 ${sticky ? "lg:sticky lg:top-20" : ""}`} aria-label={t("arya.role")}>
      {/* character header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-midnight-700 to-midnight-900 p-5 text-white shadow-xl">
        <div className="pattern-arch pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="pattern-dots-light pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="relative flex items-center gap-4">
          <AryaAvatar state={state} size={78} />
          <div className="min-w-0">
            <h2 className="font-display text-xl font-bold">{t("arya.name")}</h2>
            <p className="text-xs font-semibold text-saffron-300">{t("arya.role")}</p>
            <p className="mt-1.5 truncate text-[11px] text-white/50">
              {context
                ? context.location
                  ? `${context.locationName} · ${context.templeName}`
                  : context.templeName
                : t("guide.pick")}
            </p>
          </div>
        </div>
        <span className="relative mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold text-saffron-300">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          {state === "speaking"
            ? t("arya.state.speaking")
            : state === "listening"
              ? t("arya.state.listening")
              : state === "thinking"
                ? t("arya.state.thinking")
                : state === "error"
                  ? t("arya.state.error")
                  : t("arya.state.idle")}
        </span>
      </div>

      {/* narration */}
      {script && <AryaNarrationPlayer text={script} title={title} />}

      {/* conversation */}
      <GuideChat height={chatHeight} />
    </aside>
  );
}
