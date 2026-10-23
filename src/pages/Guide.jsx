import React from "react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Bot, Check, Compass, Map as MapIcon } from "lucide-react";
import { getTemples, getTempleBySlug } from "../services/templeService";
import { useLanguage } from "../context/LanguageContext";
import { useGuide } from "../context/GuideContext";
import AryaPanel from "../components/AryaPanel";
import AryaAvatar from "../components/AryaAvatar";
import SmartImage from "../components/SmartImage";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

/**
 * /guide — the dedicated AI Temple Guide page.
 * Choosing a temple loads its full record into Arya's context, so the
 * narration and every answer is about that temple specifically.
 */
export default function Guide() {
  const { t, name } = useLanguage();
  const { setContext, context } = useGuide();
  const [params, setParams] = useSearchParams();

  const [temples, setTemples] = useState(null);
  const [error, setError] = useState(false);
  const [loadingTemple, setLoadingTemple] = useState(false);

  const slug = params.get("temple");

  const load = () => {
    setError(false);
    setTemples(null);
    getTemples().then(setTemples).catch(() => setError(true));
  };
  useEffect(load, []);

  // Load the selected temple into Arya's knowledge context
  useEffect(() => {
    let cancelled = false;
    if (!slug) {
      setContext(null, null);
      return;
    }
    setLoadingTemple(true);
    getTempleBySlug(slug)
      .then((temple) => {
        if (cancelled) return;
        setContext(temple || null, null);
      })
      .catch(() => setError(true))
      .finally(() => !cancelled && setLoadingTemple(false));
    return () => {
      cancelled = true;
    };
  }, [slug, setContext]);

  if (error) {
    return <ErrorState title={t("common.error.title")} message={t("common.error.desc")} onRetry={load} />;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* header */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-midnight-700 to-midnight-900 p-6 text-white shadow-2xl sm:p-10">
        <div className="pattern-arch pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="pattern-dots-light pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <AryaAvatar state="idle" size={110} />
          <div>
            <span className="chip chip-light">
              <Bot className="h-3 w-3 text-saffron" aria-hidden="true" />
              {t("arya.role")}
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t("guide.hero.title")}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">{t("guide.hero.sub")}</p>
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_26rem]">
        {/* temple chooser */}
        <section aria-label={t("guide.pick")}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-bold text-midnight">
              {context ? t("guide.picked") : t("guide.pick")}
            </h2>
            {context && (
              <button onClick={() => setParams({})} className="btn btn-outline btn-sm">
                {t("guide.change")}
              </button>
            )}
          </div>

          {loadingTemple || !temples ? (
            <LoadingSpinner label={t("common.loading")} />
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {temples.map((temple) => {
                const active = temple.slug === slug;
                return (
                  <button
                    key={temple.id}
                    onClick={() => setParams({ temple: temple.slug })}
                    className={`card group overflow-hidden text-left transition-all hover:-translate-y-1 hover:shadow-xl ${
                      active ? "!border-saffron ring-2 ring-saffron/35" : ""
                    }`}
                    aria-pressed={active}
                  >
                    <div className="img-zoom relative aspect-[16/9] overflow-hidden">
                      <SmartImage
                        src={temple.image_url}
                        alt={name(temple)}
                        className="h-full w-full object-cover"
                        showNote={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" />
                      {active && (
                        <span className="chip chip-gold absolute top-3 right-3 !bg-saffron !text-midnight">
                          <Check className="h-3 w-3" aria-hidden="true" />
                          {t("guide.picked")}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-display text-lg leading-snug font-bold text-midnight group-hover:text-saffron-600">
                        {name(temple)}
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-midnight-700/55">
                        {temple.city}, {temple.state}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* deep links once a temple is chosen */}
          {context?.temple && (
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={`/temple/${context.temple.slug}`} className="btn btn-dark btn-sm">
                {t("temple.explore")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to={`/temple/${context.temple.slug}/map`} className="btn btn-outline btn-sm">
                <MapIcon className="h-4 w-4" aria-hidden="true" />
                {t("temple.viewMap")}
              </Link>
              <Link to={`/temple/${context.temple.slug}/guided`} className="btn btn-outline btn-sm">
                <Compass className="h-4 w-4" aria-hidden="true" />
                {t("temple.guided")}
              </Link>
            </div>
          )}
        </section>

        {/* Arya */}
        <AryaPanel chatHeight="22rem" sticky />
      </div>
    </main>
  );
}
