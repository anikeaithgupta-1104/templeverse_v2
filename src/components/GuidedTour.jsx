import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Headphones, MapPin, MessageCircle, Pause, Square } from "lucide-react";
import SmartImage from "./SmartImage";
import AryaAvatar from "./AryaAvatar";
import { useLanguage } from "../context/LanguageContext";
import { useGuide } from "../context/GuideContext";
import { UntranslatedNotice } from "./TempleExtras";
import {
  generateStepNarration,
  getTempleContext,
  phrase,
} from "../services/templeGuideService";

/**
 * ARYA'S TEMPLE JOURNEY — a step-by-step guided walk.
 * Every step is data-driven; Arya narrates the step in the active
 * language and stays available for questions at each stop.
 */
export default function GuidedTour({ temple }) {
  const { t, lang, C, name } = useLanguage();
  const { speak, stop, pause, state, setContext, setOpen, ask } = useGuide();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const steps = useMemo(
    () =>
      (temple.guided_steps || [])
        .slice()
        .sort((a, b) => a.step_number - b.step_number)
        .map((step) => ({
          ...step,
          location: temple.locations.find((l) => l.id === step.location_id) || null,
        })),
    [temple]
  );

  const total = steps.length;
  const step = steps[index];
  const location = step?.location || null;
  const speaking = state === "speaking";

  // Arya always knows which stop we are at
  useEffect(() => {
    setContext(temple, location);
  }, [temple, location, setContext]);

  // stop narration when moving between steps
  const go = useCallback(
    (delta) => {
      stop();
      setIndex((i) => Math.min(total - 1, Math.max(0, i + delta)));
    },
    [total, stop]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.target?.tagName === "INPUT" || e.target?.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => () => stop(), [stop]);

  if (!total || !step) return null;

  const progress = ((index + 1) / total) * 100;
  const isLast = index === total - 1;
  const title = C(step, "title");
  const description = C(step, "description");

  const narrate = () => {
    if (speaking) return pause();
    const ctx = getTempleContext(temple, location, lang);
    const intro = index === 0 ? `${phrase(lang).atTemple(name(temple))} ` : "";
    speak(intro + generateStepNarration(step, ctx));
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* progress header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm font-extrabold tracking-[0.12em] text-saffron-600 uppercase">
            <AryaAvatar state={state} size={26} showRing={false} />
            {t("guided.title")}
          </p>
          <p className="text-sm font-bold text-midnight-700/70" aria-live="polite">
            {t("guided.step")} {index + 1} {t("guided.of")} {total}
          </p>
        </div>

        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-midnight/10"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-saffron to-saffron-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                stop();
                setIndex(i);
              }}
              aria-label={`${t("guided.step")} ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-7 bg-saffron" : i < index ? "w-2.5 bg-saffron/50" : "w-2.5 bg-midnight/15 hover:bg-midnight/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* step card */}
      <div key={step.id} className="fade-up card overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative">
            <SmartImage
              src={location?.image_url}
              alt={title.text}
              className="h-56 w-full object-cover md:h-full md:min-h-[22rem]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/55 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-saffron font-display text-lg font-bold text-midnight shadow-lg">
              {step.step_number}
            </span>
            {location && (
              <Link
                to={`/temple/${temple.slug}/location/${location.id}`}
                className="chip chip-light absolute bottom-4 left-4 hover:bg-white/20"
              >
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {name(location)}
              </Link>
            )}
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <AryaAvatar state={state} size={52} />
              <div className="min-w-0">
                <h3 className="font-display text-2xl leading-tight font-bold text-midnight">{title.text}</h3>
                <p className="text-[11px] font-bold text-saffron-600">{t("arya.role")}</p>
              </div>
            </div>

            <div className="mt-4">
              <UntranslatedNotice show={description.untranslated} />
              <p className="leading-relaxed text-midnight-700/80">{description.text}</p>
            </div>

            {/* per-step Arya controls */}
            <div className="mt-5 flex flex-wrap gap-2">
              <button onClick={narrate} className="btn btn-primary btn-sm">
                {speaking ? (
                  <>
                    <Pause className="h-4 w-4" aria-hidden="true" />
                    {t("arya.pause")}
                  </>
                ) : (
                  <>
                    <Headphones className="h-4 w-4" aria-hidden="true" />
                    {t("arya.listen")}
                  </>
                )}
              </button>
              {speaking && (
                <button onClick={stop} className="btn btn-outline btn-sm">
                  <Square className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
                  {t("arya.stop")}
                </button>
              )}
              <button
                onClick={() => {
                  setOpen(true);
                  ask(t("arya.look"));
                }}
                className="btn btn-outline btn-sm"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {t("arya.ask")}
              </button>
            </div>

            {/* navigation */}
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
              <button
                className="btn btn-outline btn-sm disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => go(-1)}
                disabled={index === 0}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {t("guided.prev")}
              </button>

              {isLast ? (
                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => {
                    stop();
                    navigate(`/temple/${temple.slug}`);
                  }}
                >
                  <Check className="h-4 w-4" aria-hidden="true" />
                  {t("guided.finish")}
                </button>
              ) : (
                <button className="btn btn-dark btn-sm" onClick={() => go(1)}>
                  {t("guided.next")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              )}

              <Link to={`/temple/${temple.slug}/map`} className="btn btn-outline btn-sm">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {t("guided.openMap")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-midnight-700/40">⌨ {t("guided.hint")}</p>
    </div>
  );
}
