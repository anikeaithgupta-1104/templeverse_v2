import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Building2, Flame, Sparkles } from "lucide-react";
import { getLocationBySlug, getAdjacentLocations } from "../services/locationService";
import { useLanguage } from "../context/LanguageContext";
import { useGuideContext } from "../context/GuideContext";
import useSmartBack from "../hooks/useSmartBack";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import SmartImage from "../components/SmartImage";
import VideoPlayer from "../components/VideoPlayer";
import AryaPanel from "../components/AryaPanel";
import AryaCard from "../components/AryaCard";
import { Sources, UntranslatedNotice } from "../components/TempleExtras";
import { getLocationIcon } from "../components/MapMarker";

const TABS = [
  { id: "story", icon: BookOpen },
  { id: "architecture", icon: Building2 },
  { id: "rituals", icon: Flame },
  { id: "significance", icon: Sparkles },
];

export default function LocationDetail() {
  const { slug, locationId } = useParams();
  const { t, C, name, desc } = useLanguage();
  const goBack = useSmartBack(`/temple/${slug}/map`);

  const [data, setData] = useState(null);
  const [adjacent, setAdjacent] = useState({ prev: null, next: null });
  const [error, setError] = useState(false);
  const [tab, setTab] = useState("story");
  const contentRef = useRef(null);

  const load = useCallback(() => {
    setError(false);
    setData(null);
    setTab("story");
    Promise.all([getLocationBySlug(slug, locationId), getAdjacentLocations(slug, locationId)])
      .then(([d, adj]) => {
        if (!d?.location) return setError(true);
        setData(d);
        setAdjacent(adj);
      })
      .catch(() => setError(true));
  }, [slug, locationId]);

  useEffect(load, [load]);
  useGuideContext(data?.temple, data?.location);

  if (error) return <ErrorState title={t("common.error.title")} message={t("common.error.desc")} onRetry={load} />;
  if (!data) return <LoadingSpinner label={t("common.loading.temple")} full />;

  const { temple, location } = data;
  const Icon = getLocationIcon(location.type);
  const tabLabel = (id) =>
    id === "story" ? t("location.story")
    : id === "architecture" ? t("location.architecture")
    : id === "rituals" ? t("location.rituals")
    : t("location.significance");

  const active = C(location, tab);
  const introduction = C(location, "description");

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* breadcrumb + back */}
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={goBack} className="btn btn-outline btn-sm">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("common.back")}
        </button>
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-bold text-midnight-700/55">
          <Link to="/temples" className="hover:text-saffron-600">{t("nav.temples")}</Link>
          <span aria-hidden="true">›</span>
          <Link to={`/temple/${temple.slug}`} className="hover:text-saffron-600">{name(temple)}</Link>
          <span aria-hidden="true">›</span>
          <Link to={`/temple/${temple.slug}/map`} className="hover:text-saffron-600">{t("map.title")}</Link>
          <span aria-hidden="true">›</span>
          <span className="text-midnight">{name(location)}</span>
        </nav>
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_24rem]">
        <div className="min-w-0">
          {/* header */}
          <header className="grid gap-6 sm:grid-cols-2">
            <div className="img-zoom arch-top-sm overflow-hidden shadow-2xl">
              <SmartImage
                src={location.image_url}
                alt={name(location)}
                className="h-64 w-full object-cover sm:h-72"
                caption={location.image_credit || null}
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="chip chip-gold w-max">
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {location.type}
              </span>
              <h1 className="mt-3 font-display text-2xl font-bold text-midnight sm:text-3xl">{name(location)}</h1>
              <UntranslatedNotice show={introduction.untranslated} />
              <p className="mt-2 leading-relaxed text-midnight-700/75">{desc(location)}</p>
            </div>
          </header>

          {/* Arya action block */}
          <div className="mt-8">
            <AryaCard onReadMore={() => contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })} dense />
          </div>

          {/* content tabs */}
          <section ref={contentRef} className="mt-10 scroll-mt-24">
            <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-midnight/10 pb-px" role="tablist" aria-label={name(location)}>
              {TABS.map(({ id, icon: TabIcon }) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => setTab(id)}
                  className={`flex shrink-0 items-center gap-2 rounded-t-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                    tab === id
                      ? "border-b-2 border-saffron bg-saffron/8 text-saffron-600"
                      : "text-midnight-700/55 hover:text-midnight"
                  }`}
                >
                  <TabIcon className="h-4 w-4" aria-hidden="true" />
                  {tabLabel(id)}
                </button>
              ))}
            </div>

            <div key={tab} className="fade-up card mt-5 p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-midnight">{tabLabel(tab)}</h2>
              <div className="mt-3">
                <UntranslatedNotice show={active.untranslated} />
                <p className="leading-relaxed text-midnight-700/85">{active.text}</p>
              </div>
            </div>
          </section>

          {/* visual story */}
          <section className="mt-10">
            <h2 className="mb-3 font-display text-xl font-bold text-midnight">{t("location.video.title")}</h2>
            <VideoPlayer src={location.video_url} title={`${name(location)} — ${t("location.video.title")}`} />
          </section>

          {/* sources */}
          <div className="mt-12">
            <Sources sources={temple.sources} />
          </div>

          {/* pager */}
          <nav className="mt-12 grid gap-4 sm:grid-cols-2" aria-label="Location navigation">
            {adjacent.prev ? (
              <Link
                to={`/temple/${temple.slug}/location/${adjacent.prev.id}`}
                className="card group flex items-center gap-3 p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <ArrowLeft className="h-4 w-4 shrink-0 text-saffron-600" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-[11px] font-extrabold tracking-wider text-midnight-700/40 uppercase">{t("location.prev")}</span>
                  <span className="block truncate text-sm font-bold text-midnight group-hover:text-saffron-600">{name(adjacent.prev)}</span>
                </span>
              </Link>
            ) : <span />}
            {adjacent.next ? (
              <Link
                to={`/temple/${temple.slug}/location/${adjacent.next.id}`}
                className="card group flex items-center justify-end gap-3 p-4 text-right transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="min-w-0">
                  <span className="block text-[11px] font-extrabold tracking-wider text-midnight-700/40 uppercase">{t("location.next")}</span>
                  <span className="block truncate text-sm font-bold text-midnight group-hover:text-saffron-600">{name(adjacent.next)}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-saffron-600" aria-hidden="true" />
              </Link>
            ) : <span />}
          </nav>
        </div>

        {/* Arya sidebar */}
        <div className="hidden lg:block">
          <AryaPanel chatHeight="20rem" sticky />
        </div>
      </div>
    </main>
  );
}
