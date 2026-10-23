import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Bot, Sparkles, Square, Headphones } from "lucide-react";
import { getTemples } from "../services/templeService";
import { useLanguage } from "../context/LanguageContext";
import { useGuide } from "../context/GuideContext";
import TempleCard from "../components/TempleCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import Reveal from "../components/Reveal";
import SmartImage from "../components/SmartImage";
import AryaAvatar from "../components/AryaAvatar";
import SacredThreads from "../components/SacredThreads";

const HERO_IMAGE =
  "https://images.pexels.com/photos/37809031/pexels-photo-37809031.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

export default function Home() {
  const { t, name } = useLanguage();
  const { setContext, state, speak, stop } = useGuide();
  const speaking = state === "speaking";
  const greeting = t("guide.hero.sub");
  const navigate = useNavigate();
  const [temples, setTemples] = useState(null);
  const [error, setError] = useState(false);

  // The homepage has no temple context — Arya greets generically here.
  useEffect(() => setContext(null, null), [setContext]);

  const load = () => {
    setError(false);
    setTemples(null);
    getTemples().then(setTemples).catch(() => setError(true));
  };
  useEffect(load, []);

  const locationTotal = temples?.reduce((sum, x) => sum + (x.location_count || 0), 0);

  return (
    <main>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-midnight text-white">
        <div className="pattern-arch pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 animate-spin-slow rounded-full border border-saffron/15" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="chip chip-light fade-up">
              <Sparkles className="h-3 w-3 text-saffron" aria-hidden="true" />
              {t("hero.badge")}
            </span>

            <h1 className="fade-up mt-5 font-display text-4xl leading-[1.1] font-bold sm:text-5xl lg:text-[3.4rem]" style={{ animationDelay: "80ms" }}>
              {t("hero.title")}
            </h1>

            <p className="fade-up mt-5 max-w-xl leading-relaxed text-white/80 sm:text-lg" style={{ animationDelay: "150ms" }}>
              {t("hero.subtitle")}
            </p>

            <div className="fade-up mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "220ms" }}>
              <Link to="/temples" className="btn btn-primary">
                🗺️ {t("hero.cta.primary")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/guide" className="btn btn-ghost-light">
                <Bot className="h-4 w-4" aria-hidden="true" />
                {t("hero.cta.guide")}
              </Link>
            </div>

            <dl className="fade-up mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6" style={{ animationDelay: "300ms" }}>
              {[
                { value: temples?.length ?? "5", label: t("hero.stat.temples") },
                { value: locationTotal ?? "38", label: t("hero.stat.locations") },
                { value: "5", label: t("hero.stat.languages") },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-bold text-gold-grad">{s.value}</dd>
                  <dd className="mt-0.5 text-xs font-semibold text-white/50">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* hero visual with Arya attached */}
          <div className="fade-up relative mx-auto w-full max-w-md lg:max-w-none" style={{ animationDelay: "180ms" }}>
            <div className="absolute -inset-3 rounded-[11rem_11rem_1.5rem_1.5rem] bg-gradient-to-b from-saffron/25 to-transparent blur-xl" aria-hidden="true" />
            <div className="arch-top relative overflow-hidden border-4 border-white/10 shadow-2xl">
              <SmartImage
                src={HERO_IMAGE}
                alt="Brihadeeswarar Temple at dawn, Thanjavur"
                className="h-80 w-full object-cover sm:h-[26rem]"
                showNote={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/75 via-transparent to-transparent" />
              <div className="absolute right-4 bottom-4 left-4">
                <p className="font-display text-lg font-bold">Brihadeeswarar Temple</p>
                <p className="text-xs text-white/60">Thanjavur, Tamil Nadu • c. 1010 CE • UNESCO</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== FEATURED TEMPLES ==================== */}
      <section className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="chip chip-gold">🛕</span>
              <h2 className="mt-3 font-display text-3xl font-bold text-midnight sm:text-4xl">{t("featured.title")}</h2>
              <p className="mt-2 max-w-2xl text-midnight-700/70">{t("featured.subtitle")}</p>
            </div>
            <Link to="/temples" className="btn btn-outline btn-sm">
              {t("hero.cta.primary")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        {error ? (
          <ErrorState title={t("common.error.title")} message={t("common.error.desc")} onRetry={load} />
        ) : !temples ? (
          <LoadingSpinner label={t("common.loading.temple")} />
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {temples.map((temple, i) => (
              <Reveal key={temple.id} delay={i * 90}>
                <TempleCard temple={temple} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Sacred connections are woven into discovery, not isolated in navigation. */}
      <SacredThreads variant="discovery" limit={3} />

      {/* ==================== MEET ARYA (functional) ==================== */}
      <section className="relative bg-midnight py-20 text-white">
        <div className="pattern-dots-light pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
              <div className="mx-auto lg:mx-0">
                <AryaAvatar state="idle" size={190} />
              </div>

              <div>
                <span className="chip chip-light">
                  <Bot className="h-3 w-3 text-saffron" aria-hidden="true" />
                  {t("arya.role")}
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{t("guide.hero.title")}</h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-white/80">{t("guide.hero.sub")}</p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => (speaking ? stop() : speak(greeting))}
                    className="btn btn-primary"
                  >
                    {speaking ? (
                      <>
                        <Square className="h-4 w-4" fill="currentColor" aria-hidden="true" />
                        {t("arya.stop")}
                      </>
                    ) : (
                      <>
                        <Headphones className="h-4 w-4" aria-hidden="true" />
                        {t("arya.listen")}
                      </>
                    )}
                  </button>
                  <Link to="/guide" className="btn btn-ghost-light">
                    <Bot className="h-4 w-4" aria-hidden="true" />
                    {t("arya.ask")}
                  </Link>
                </div>

                {/* jump straight into a temple with Arya — real navigation */}
                {temples && (
                  <div className="mt-7">
                    <p className="text-[11px] font-extrabold tracking-wider text-white/40 uppercase">
                      {t("guide.pick")}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {temples.map((temple) => (
                        <button
                          key={temple.id}
                          onClick={() => navigate(`/temple/${temple.slug}/guided`)}
                          className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold text-white/80 transition-colors hover:border-saffron/60 hover:text-saffron-300"
                        >
                          {name(temple)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-midnight-700 to-midnight-900 px-6 py-12 text-center text-white shadow-2xl sm:px-12">
            <div className="pattern-arch pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="pattern-dots-light pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
            <h2 className="relative font-display text-3xl font-bold sm:text-4xl">{t("cta.title")}</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-white/80">{t("cta.subtitle")}</p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/temples" className="btn btn-primary">
                {t("cta.button")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/guide" className="btn btn-ghost-light">
                <Bot className="h-4 w-4" aria-hidden="true" />
                {t("hero.cta.guide")}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
