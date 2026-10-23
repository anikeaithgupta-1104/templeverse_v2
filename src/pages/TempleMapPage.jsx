import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Compass, Map as MapIcon } from "lucide-react";
import { getTempleBySlug } from "../services/templeService";
import { useLanguage } from "../context/LanguageContext";
import { useGuideContext } from "../context/GuideContext";
import useSmartBack from "../hooks/useSmartBack";
import TempleMap from "../components/TempleMap";
import AryaPanel from "../components/AryaPanel";
import AryaCard from "../components/AryaCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

export default function TempleMapPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
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
  useGuideContext(temple, null);

  if (error) return <ErrorState title={t("common.error.title")} message={t("common.error.desc")} onRetry={load} />;
  if (!temple) return <LoadingSpinner label={t("common.loading.temple")} full />;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <button onClick={goBack} className="btn btn-outline btn-sm">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t("map.backToTemple")}
      </button>

      <div className="mt-5 flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron to-saffron-600 text-midnight shadow-lg">
          <MapIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold text-midnight sm:text-3xl">{t("map.title")}</h1>
          <p className="truncate text-sm text-midnight-700/60">{name(temple)}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_24rem]">
        <div className="min-w-0">
          <TempleMap
            temple={temple}
            locations={temple.locations}
            onExplore={(location) => navigate(`/temple/${temple.slug}/location/${location.id}`)}
          />

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to={`/temple/${temple.slug}/guided`} className="btn btn-primary">
              <Compass className="h-4 w-4" aria-hidden="true" />
              {t("temple.guided")}
            </Link>
            <Link to={`/temple/${temple.slug}`} className="btn btn-outline">
              {t("map.backToTemple")}
            </Link>
          </div>

          <div className="mt-8 lg:hidden">
            <AryaCard dense />
          </div>
        </div>

        <div className="hidden lg:block">
          <AryaPanel chatHeight="20rem" sticky />
        </div>
      </div>
    </main>
  );
}
