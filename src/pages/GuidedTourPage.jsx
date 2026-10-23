import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import { getTempleBySlug } from "../services/templeService";
import { useLanguage } from "../context/LanguageContext";
import useSmartBack from "../hooks/useSmartBack";
import GuidedTour from "../components/GuidedTour";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

export default function GuidedTourPage() {
  const { slug } = useParams();
  const { t, name } = useLanguage();
  const goBack = useSmartBack(`/temple/${slug}`);

  const [temple, setTemple] = useState(null);
  const [error, setError] = useState(false);

  const load = useCallback(() => {
    setError(false);
    setTemple(null);
    getTempleBySlug(slug)
      .then((data) => (data ? setTemple(data) : setError(true)))
      .catch(() => setError(true));
  }, [slug]);

  useEffect(load, [load]);

  if (error) return <ErrorState title={t("common.error.title")} message={t("common.error.desc")} onRetry={load} />;
  if (!temple) return <LoadingSpinner label={t("common.loading.temple")} full />;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <button onClick={goBack} className="btn btn-outline btn-sm">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t("common.back")}
      </button>

      <div className="mt-5 mb-8 flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron to-saffron-600 text-midnight shadow-lg">
          <Compass className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold text-midnight sm:text-3xl">{t("guided.title")}</h1>
          <p className="truncate text-sm text-midnight-700/60">
            {name(temple)} • {temple.guided_steps.length} {t("guided.count")}
          </p>
        </div>
      </div>

      <GuidedTour temple={temple} />
    </main>
  );
}
