import React from "react";
import { useMemo } from "react";
import { BookOpen, Eye, Headphones, MessageCircle, Square } from "lucide-react";
import AryaAvatar from "./AryaAvatar";
import { useGuide } from "../context/GuideContext";
import { useLanguage } from "../context/LanguageContext";
import { generateNarrationScript, getSuggestedQuestions } from "../services/templeGuideService";

/**
 * Compact "Ask Arya" action block shown on temple, map and location
 * pages. Every button performs a real action.
 */
export default function AryaCard({ onReadMore = null, dense = false }) {
  const { t } = useLanguage();
  const { state, context, speak, stop, ask, setOpen } = useGuide();
  const speaking = state === "speaking";

  const script = useMemo(() => (context ? generateNarrationScript(context) : ""), [context]);
  const lookQuestion = useMemo(() => {
    const list = getSuggestedQuestions(context);
    return list[1] || t("arya.look");
  }, [context, t]);

  if (!context) return null;

  const openChatWith = (question) => {
    setOpen(true);
    if (question) ask(question);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-saffron/25 bg-gradient-to-br from-midnight-700 to-midnight-900 p-5 text-white shadow-xl">
      <div className="pattern-arch pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="pattern-dots-light pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="relative flex items-start gap-4">
        <AryaAvatar state={state} size={dense ? 60 : 72} />
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-bold">{t("arya.name")}</p>
          <p className="text-[11px] font-semibold text-saffron-300">{t("arya.role")}</p>
          <p className="mt-1.5 text-sm text-white/80">{t("arya.askTitle")}</p>
        </div>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2">
        {speaking ? (
          <button onClick={stop} className="btn btn-primary btn-sm">
            <Square className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
            {t("arya.stop")}
          </button>
        ) : (
          <button onClick={() => speak(script)} className="btn btn-primary btn-sm" disabled={!script}>
            <Headphones className="h-4 w-4" aria-hidden="true" />
            {t("arya.listenStory")}
          </button>
        )}

        <button onClick={() => openChatWith(null)} className="btn btn-ghost-light btn-sm">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {t("arya.ask")}
        </button>

        <button onClick={() => openChatWith(lookQuestion)} className="btn btn-ghost-light btn-sm">
          <Eye className="h-4 w-4" aria-hidden="true" />
          {t("arya.look")}
        </button>

        {onReadMore && (
          <button onClick={onReadMore} className="btn btn-ghost-light btn-sm">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            {t("arya.readMore")}
          </button>
        )}
      </div>
    </div>
  );
}
