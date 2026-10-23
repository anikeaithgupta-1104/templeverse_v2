import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  DownloadCloud,
  MapPin,
  Trash2,
  Wifi,
  WifiOff,
  ArrowRight,
  Info,
} from "lucide-react";
import { getOfflineDownloads, removeTempleOffline, isOnline } from "../lib/offline";
import { useLanguage } from "../context/LanguageContext";
import SmartImage from "../components/SmartImage";

export default function Offline() {
  const { t, name } = useLanguage();
  const [downloads, setDownloads] = useState([]);
  const [online, setOnline] = useState(isOnline());

  const refresh = () => {
    setDownloads(getOfflineDownloads());
    setOnline(isOnline());
  };

  useEffect(() => {
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("online", refresh);
    window.addEventListener("offline", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("online", refresh);
      window.removeEventListener("offline", refresh);
    };
  }, []);

  const handleRemove = (slug) => {
    removeTempleOffline(slug);
    refresh();
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* header */}
      <div className="text-center">
        <span className="chip chip-gold">
          {online ? <Wifi className="h-3 w-3" aria-hidden="true" /> : <WifiOff className="h-3 w-3" aria-hidden="true" />}
          {online ? t("offline.online") : t("offline.offline")}
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-midnight sm:text-4xl">{t("offline.title")}</h1>
        <p className="mx-auto mt-3 max-w-xl text-midnight-700/70">{t("offline.subtitle")}</p>
      </div>

      {/* downloads */}
      {downloads.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-midnight/15 bg-white/50 py-20 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-saffron/12">
            <DownloadCloud className="h-8 w-8 text-saffron-600" aria-hidden="true" />
          </span>
          <h2 className="font-display text-xl font-bold text-midnight">{t("offline.empty.title")}</h2>
          <p className="max-w-sm text-sm text-midnight-700/60">{t("offline.empty.desc")}</p>
          <Link to="/temples" className="btn btn-primary btn-sm mt-2">
            {t("offline.empty.cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <ul className="mt-10 space-y-5">
          {downloads.map(({ temple, locations, savedAt }) => (
            <li key={temple.slug} className="card overflow-hidden">
              <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
                <SmartImage
                  src={temple.image_url}
                  alt={name(temple)}
                  className="h-36 w-full shrink-0 rounded-xl object-cover sm:h-24 sm:w-40"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-xl font-bold text-midnight">{name(temple)}</h2>
                    <span className="chip chip-green">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      {t("offline.available")}
                    </span>
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-midnight-700/60">
                    <MapPin className="h-3.5 w-3.5 text-saffron-600" aria-hidden="true" />
                    {temple.location}, {temple.state}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="chip chip-navy">
                      {locations?.length ?? 0} {t("offline.locations")}
                    </span>
                    <span className="chip chip-navy">EN · हिन्दी · తెలుగు · தமிழ் · മലയാളം</span>
                    {savedAt && (
                      <span className="chip chip-navy">
                        {t("offline.downloaded")}: {new Date(savedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                  <Link to={`/temple/${temple.slug}`} className="btn btn-primary btn-sm w-full sm:w-auto">
                    {t("offline.open")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <button
                    onClick={() => handleRemove(temple.slug)}
                    className="btn btn-outline btn-sm w-full !text-red-500 sm:w-auto"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    {t("offline.remove")}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* online / offline distinction note */}
      <div className="mt-10 rounded-2xl border border-saffron/30 bg-saffron/8 p-5">
        <h3 className="flex items-center gap-2 text-sm font-extrabold text-midnight">
          <Info className="h-4 w-4 text-saffron-600" aria-hidden="true" />
          {t("offline.available")} vs {t("offline.requires")}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-midnight-700/75">{t("offline.note")}</p>
      </div>
    </main>
  );
}
