import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Calendar, CheckCircle2, Compass, Download,
  Flame, Landmark, MapPin, Trash2,
} from "lucide-react";
import { getTempleBySlug } from "../services/templeService";
import { saveTempleOffline, removeTempleOffline, isTempleOffline } from "../lib/offline";
import { useLanguage } from "../context/LanguageContext";
import { useGuideContext } from "../context/GuideContext";
import useSmartBack from "../hooks/useSmartBack";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import SmartImage from "../components/SmartImage";
import LocationCard from "../components/LocationCard";
import TempleMap from "../components/TempleMap";
import AryaPanel from "../components/AryaPanel";
import AryaCard from "../components/AryaCard";
import SacredThreads from "../components/SacredThreads";
import { Timeline, Gallery, Sources, UntranslatedNotice } from "../components/TempleExtras";

export default function TempleDetail() {
  const { slug } = useParams();
  const { t, name, C } = useLanguage();
  const navigate = useNavigate();
  const goBack = useSmartBack("/temples");

  const [temple, setTemple] = useState(null);
  const [error, setError] = useState(false);
  const [offline, setOffline] = useState(false);
  const [toast, setToast] = useState("");

  const load = useCallback(() => {
    setError(false);
    setTemple(null);
    getTempleBySlug(slug)
      .then((data) => {
        if (!data) return setError(true);
        setTemple(data);
        setOffline(isTempleOffline(data.slug));
      })
      .catch(() => setError(true));
  }, [slug]);

  useEffect(load, [load]);
  useGuideContext(temple, null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  if (error) return <ErrorState title={t("common.error.title")} message={t("common.error.desc")} onRetry={load} />;
  if (!temple) return <LoadingSpinner label={t("common.loading.temple")} full />;

  const handleDownload = () => {
    saveTempleOffline({ temple, locations: temple.locations, guided_steps: temple.guided_steps });
    setOffline(true);
    setToast("✓ " + t("temple.offline.yes"));
  };
  const handleRemove = () => {
    removeTempleOffline(temple.slug);
    setOffline(false);
    setToast(t("temple.offline.remove"));
  };

  const history = C(temple, "history");
  const architecture = C(temple, "architecture_summary");
  const culture = C(temple, "cultural_significance");
  const description = C(temple, "description");

  const facts = [
    { icon: Calendar, label: t("temple.period"), value: C(temple, "historical_period").text },
    { icon: Flame, label: t("temple.deity"), value: C(temple, "main_deity").text },
    { icon: Landmark, label: t("temple.style"), value: C(temple, "architectural_style").text },
    { icon: MapPin, label: t("common.langLabel"), value: "🇬🇧 EN · हि · తె · த · മ" },
  ];

  return (
    <main>
      {/* ==================== HERO ==================== */}
      <section className="relative">
        <div className="relative h-[56vh] min-h-[440px] w-full overflow-hidden">
          <SmartImage src={temple.image_url} alt={name(temple)} className="h-full w-full object-cover" showNote={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/25" />
          <div className="pattern-arch absolute inset-0 opacity-40" aria-hidden="true" />
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
            <button
              onClick={goBack}
              className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur transition-colors hover:border-saffron/60 hover:text-saffron-300"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              {t("common.back")}
            </button>

            <h1 className="font-display text-3xl font-bold text-white sm:text-5xl">{name(temple)}</h1>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-white/85">
              <MapPin className="h-4 w-4 text-saffron" aria-hidden="true" />
              {temple.location}, {temple.state}, {temple.country}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">{description.text}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {temple.unesco && <span className="chip chip-gold">UNESCO World Heritage</span>}
              <span className="chip chip-light">
                {temple.locations.length} {t("temple.shrines")}
              </span>
              {offline && (
                <span className="chip !border-emerald-400/40 !bg-emerald-500/20 !text-emerald-300">
                  <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                  {t("temple.offline.yes")}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ACTIONS + FACTS ==================== */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <div className="card flex flex-wrap items-center gap-3 p-4">
          <Link to={`/temple/${temple.slug}/guided`} className="btn btn-primary">
            <Compass className="h-4 w-4" aria-hidden="true" />
            {t("temple.guided")}
          </Link>
          <Link to={`/temple/${temple.slug}/map`} className="btn btn-dark">
            <Landmark className="h-4 w-4" aria-hidden="true" />
            {t("temple.viewMap")}
          </Link>
          {offline ? (
            <button onClick={handleRemove} className="btn btn-outline btn-sm">
              <Trash2 className="h-4 w-4 text-red-500" aria-hidden="true" />
              {t("temple.offline.remove")}
            </button>
          ) : (
            <button onClick={handleDownload} className="btn btn-outline btn-sm">
              <Download className="h-4 w-4" aria-hidden="true" />
              {t("temple.download")}
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="card flex items-start gap-3 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-saffron/12 text-saffron-600">
                <f.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-extrabold tracking-wider text-midnight-700/45 uppercase">{f.label}</p>
                <p className="mt-0.5 text-sm font-bold text-midnight">{f.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== MAIN GRID ==================== */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_24rem]">
          <div className="min-w-0 space-y-14">
            {/* interactive map */}
            <section aria-label={t("map.title")}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-bold text-midnight sm:text-3xl">{t("map.title")}</h2>
                  <p className="mt-2 text-sm text-midnight-700/65">{t("map.subtitle")}</p>
                </div>
                <Link to={`/temple/${temple.slug}/map`} className="btn btn-outline btn-sm">
                  {t("temple.viewMap")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-6">
                <TempleMap
                  temple={temple}
                  locations={temple.locations}
                  onExplore={(loc) => navigate(`/temple/${temple.slug}/location/${loc.id}`)}
                />
              </div>
            </section>

            {/* locations */}
            <section aria-label={t("temple.locations")}>
              <h2 className="font-display text-2xl font-bold text-midnight sm:text-3xl">{t("temple.locations")}</h2>
              <p className="mt-2 text-sm text-midnight-700/65">{t("temple.locations.sub")}</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {temple.locations.map((location) => (
                  <LocationCard key={location.id} templeSlug={temple.slug} location={location} />
                ))}
              </div>
            </section>

            {/* history */}
            <section aria-label={t("temple.history")}>
              <h2 className="font-display text-2xl font-bold text-midnight sm:text-3xl">{t("temple.history")}</h2>
              <div className="card relative mt-5 overflow-hidden p-6 sm:p-8">
                <div className="pattern-lines pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="relative">
                  <UntranslatedNotice show={history.untranslated} />
                  <p className="leading-relaxed text-midnight-700/85">{history.text}</p>
                </div>
              </div>
            </section>

            {/* architecture */}
            <section aria-label={t("temple.architecture")}>
              <h2 className="font-display text-2xl font-bold text-midnight sm:text-3xl">{t("temple.architecture")}</h2>
              <div className="card mt-5 p-6 sm:p-8">
                <UntranslatedNotice show={architecture.untranslated} />
                <p className="leading-relaxed text-midnight-700/85">{architecture.text}</p>
              </div>
            </section>

            {/* cultural significance */}
            <section aria-label={t("temple.culture")}>
              <h2 className="font-display text-2xl font-bold text-midnight sm:text-3xl">{t("temple.culture")}</h2>
              <div className="card mt-5 p-6 sm:p-8">
                <UntranslatedNotice show={culture.untranslated} />
                <p className="leading-relaxed text-midnight-700/85">{culture.text}</p>
              </div>
            </section>

            <SacredThreads templeSlug={temple.slug} limit={3} />

            <Gallery items={temple.gallery} templeName={name(temple)} />
            <Timeline items={temple.timeline} />
            <Sources sources={temple.sources} />
          </div>

          {/* Arya sidebar (desktop) */}
          <div className="hidden lg:block">
            <AryaPanel chatHeight="20rem" sticky />
          </div>

          {/* Arya card (mobile / tablet) */}
          <div className="lg:hidden">
            <AryaCard />
          </div>
        </div>
      </div>

      {toast && (
        <div className="fade-up fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-midnight px-5 py-3 text-sm font-bold text-white shadow-2xl lg:bottom-6" role="status">
          {toast}
        </div>
      )}
    </main>
  );
}
