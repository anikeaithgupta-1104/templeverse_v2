import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Database,
  Globe,
  Headphones,
  HeartHandshake,
  Landmark,
  Map as MapIcon,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Reveal from "../components/Reveal";

export default function About() {
  const { t } = useLanguage();

  const problemSources = [
    { icon: BookOpen, label: "Signboards" },
    { icon: BookOpen, label: "Books" },
    { icon: Globe, label: "Websites" },
    { icon: Users, label: "Local guides" },
  ];

  const solution = [
    { icon: MapIcon, label: t("features.map.title"), desc: t("features.map.desc") },
    { icon: Headphones, label: t("features.audio.title"), desc: t("features.audio.desc") },
    { icon: Globe, label: t("features.lang.title"), desc: t("features.lang.desc") },
    { icon: BookOpen, label: t("features.video.title"), desc: t("features.video.desc") },
    { icon: HeartHandshake, label: t("features.culture.title"), desc: t("features.culture.desc") },
    { icon: Landmark, label: t("features.offline.title"), desc: t("features.offline.desc") },
  ];

  const whyItMatters = [
    "Improves the pilgrim experience",
    "Preserves cultural knowledge",
    "Helps younger generations connect with heritage",
    "Supports multiple Indian languages",
    "Reduces dependence on scattered information",
    "Makes temple knowledge accessible to everyone",
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* header */}
      <div className="text-center">
        <span className="chip chip-gold">🛕 TempleVerse</span>
        <h1 className="mt-4 font-display text-3xl font-bold text-midnight sm:text-5xl">{t("about.title")}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-midnight-700/70">{t("about.subtitle")}</p>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-saffron-600">
          {t("hero.badge")}
        </p>
      </div>

      {/* problem */}
      <Reveal>
        <section className="card mt-14 grid gap-8 p-8 lg:grid-cols-2 lg:p-10">
          <div>
            <h2 className="font-display text-2xl font-bold text-midnight sm:text-3xl">The Problem</h2>
            <p className="mt-4 leading-relaxed text-midnight-700/80">
              Pilgrims often visit temples without fully understanding their architecture, sub-shrines,
              rituals, mythology and cultural significance. Information is scattered across many sources —
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {problemSources.map((s) => (
                <span key={s.label} className="chip chip-navy">
                  <s.icon className="h-3.5 w-3.5 text-saffron-600" aria-hidden="true" />
                  {s.label}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-midnight-700/60">
              …and much of it is not available in the visitor's preferred language.
            </p>
          </div>
          <div className="flex items-center justify-center rounded-2xl bg-midnight p-8 text-center">
            <p className="max-w-xs font-display text-2xl leading-snug font-bold text-white">
              “I stood before a 1000-year-old temple… <span className="text-gold-grad">and understood almost nothing.</span>”
            </p>
            <p className="sr-only">A pilgrim's experience that TempleVerse addresses</p>
          </div>
        </section>
      </Reveal>

      {/* solution */}
      <Reveal>
        <section className="mt-14">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-midnight sm:text-3xl">Our Solution</h2>
            <p className="mx-auto mt-2 max-w-xl text-midnight-700/65">
              TempleVerse brings everything together in one place.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solution.map((item) => (
              <div key={item.label} className="card p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-saffron/12 text-saffron-600">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-midnight">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-midnight-700/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* why it matters */}
      <Reveal>
        <section className="relative mt-14 overflow-hidden rounded-3xl bg-midnight p-8 text-white lg:p-12">
          <div className="pattern-arch pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="pattern-dots-light pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Why It Matters</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {whyItMatters.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-saffron" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      {/* technology */}
      <Reveal>
        <section className="card mt-14 p-8 lg:p-10">
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-midnight">
            <Database className="h-5 w-5 text-saffron-600" aria-hidden="true" />
            Built for Scale
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-midnight-700/75">
            The prototype ships with 5 real temples and 38 mapped locations in 5 languages, but the
            architecture is designed for hundreds. Temples, locations, stories, guided steps, media
            and sources are stored in a relational database (Supabase / PostgreSQL) with
            multilingual translation tables — adding Kannada, Bengali or Marathi is a data-entry
            task, not a re-engineering one.
          </p>
          <p className="mt-3 max-w-3xl leading-relaxed text-midnight-700/75">
            Arya, the AI guide, never invents temple facts. Every answer is assembled from the
            retrieved records for the temple or shrine you are currently viewing, and documented
            history is always distinguished from traditional belief. Where a verified translation or
            photograph does not exist, the interface says so instead of substituting something else.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["temples", "temple_translations"],
              ["temple_locations", "location_translations"],
              ["guided_steps", "guided_step_translations"],
              ["sources", "narration_scripts"],
            ].map(([a, b]) => (
              <div key={a} className="rounded-xl bg-midnight/5 p-4">
                <p className="font-mono text-sm font-bold text-midnight">{a}</p>
                <p className="font-mono text-xs text-midnight-700/55">↳ {b}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-midnight-700/50">
            Public read access is enabled through Supabase Row Level Security. If the database is not
            configured, the app transparently falls back to an identical local demo dataset — so the
            experience never breaks during a demonstration.
          </p>
          <Link to="/temples" className="btn btn-primary mt-6">
            {t("cta.button")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </Reveal>
    </main>
  );
}
