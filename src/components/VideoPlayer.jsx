import React from "react";
import { Clapperboard, Play } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

/**
 * Video player.
 * - If a real `src` exists it renders an HTML5 <video> element.
 * - Otherwise it shows a beautiful "Visual story coming soon" state —
 *   never a broken player. The database already supports video_url.
 */
export default function VideoPlayer({ title, src = null, poster = null }) {
  const { t } = useLanguage();

  if (src) {
    return (
      <div className="overflow-hidden rounded-2xl border border-midnight/10 bg-black shadow-lg">
        <video
          controls
          poster={poster || undefined}
          preload="metadata"
          className="aspect-video w-full"
          aria-label={title || "Video"}
        >
          <source src={src} />
          {t("common.video.soon")}
        </video>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-midnight/10 bg-gradient-to-br from-midnight-800 via-midnight-700 to-midnight-900 shadow-lg">
      <div className="pattern-dots-light pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative flex aspect-video flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <Clapperboard className="h-7 w-7 text-saffron" aria-hidden="true" />
          </div>
          <span className="absolute -inset-2 rounded-3xl border border-saffron/30 ripple-ring" aria-hidden="true" />
        </div>
        <div>
          <p className="font-display text-lg font-bold text-white">{title || t("common.video.soon")}</p>
          <p className="mt-1.5 max-w-sm text-sm text-white/60">{t("location.video.soon")}</p>
          <p className="mt-1 max-w-sm text-xs text-white/40">{t("location.video.soon2")}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold text-saffron-300">
          <Play className="h-3 w-3" aria-hidden="true" />
          {t("common.video.soon")}
        </span>
      </div>
    </div>
  );
}
