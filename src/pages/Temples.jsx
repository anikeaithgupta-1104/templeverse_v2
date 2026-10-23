import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { getTemples, getStates } from "../services/templeService";
import { useLanguage } from "../context/LanguageContext";
import TempleCard from "../components/TempleCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import Reveal from "../components/Reveal";

export default function Temples() {
  const { t } = useLanguage();
  const [temples, setTemples] = useState(null);
  const [states, setStates] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");

  const load = () => {
    setError(false);
    setTemples(null);
    Promise.all([getTemples({ search, state: stateFilter }), getStates()])
      .then(([list, stateList]) => {
        setTemples(list);
        setStates(stateList);
      })
      .catch(() => setError(true));
  };

  useEffect(load, [search, stateFilter]);

  const shownCount = useMemo(() => temples?.length ?? 0, [temples]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* header */}
      <div className="mx-auto max-w-3xl text-center">
        <span className="chip chip-gold">🗺</span>
        <h1 className="mt-4 font-display text-3xl font-bold text-midnight sm:text-4xl">{t("temples.title")}</h1>
        <p className="mx-auto mt-3 max-w-xl text-midnight-700/70">{t("temples.subtitle")}</p>
      </div>

      {/* search + filter */}
      <div className="mx-auto mt-9 flex max-w-3xl flex-col gap-3 rounded-2xl border border-midnight/8 bg-white/80 p-3 shadow-sm backdrop-blur sm:flex-row sm:p-4">
        <label className="relative flex-1">
          <span className="sr-only">{t("temples.search")}</span>
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-midnight-700/40" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("temples.search")}
            className="w-full rounded-xl border border-midnight/15 bg-white py-3 pr-10 pl-11 text-sm font-semibold text-midnight shadow-sm transition-colors placeholder:text-midnight-700/35 focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/30"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-midnight-700/50 hover:text-red-500"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </label>

        <label className="relative sm:w-56">
          <span className="sr-only">{t("temples.filter")}</span>
          <SlidersHorizontal className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-midnight-700/40" aria-hidden="true" />
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="w-full appearance-none rounded-xl border border-midnight/15 bg-white py-3 pr-8 pl-11 text-sm font-semibold text-midnight shadow-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/30"
          >
            <option value="">{t("temples.filter")}</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* results count */}
      {temples && (
        <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.15em] text-midnight-700/45">
          {shownCount} {t("temples.count")}
        </p>
      )}

      {/* content */}
      {error ? (
        <ErrorState title={t("common.error.title")} message={t("common.error.desc")} onRetry={load} />
      ) : !temples ? (
        <LoadingSpinner label={t("common.loading.temple")} full />
      ) : shownCount === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-midnight/5">
            <Search className="h-7 w-7 text-midnight-700/40" aria-hidden="true" />
          </span>
          <h2 className="font-display text-xl font-bold text-midnight">{t("temples.empty.title")}</h2>
          <p className="max-w-sm text-sm text-midnight-700/60">{t("temples.empty.desc")}</p>
          <button
            className="btn btn-outline btn-sm mt-2"
            onClick={() => {
              setSearch("");
              setStateFilter("");
            }}
          >
            {t("temples.empty.clear")}
          </button>
        </div>
      ) : (
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {temples.map((temple, i) => (
            <Reveal key={temple.id} delay={i * 100}>
              <TempleCard temple={temple} />
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
