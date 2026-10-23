import React from "react";
import { useLanguage } from "../context/LanguageContext";

/**
 * ARYA — the TempleVerse AI guide character.
 *
 * A hand-built SVG portrait of a young Indian heritage guide, so that
 * every visual state can be genuinely animated:
 *   idle      → slow breathing + periodic blinking
 *   speaking  → mouth movement, head bob, blinking
 *   listening → microphone ring pulse
 *   thinking  → thought dots
 *   loading   → processing ring
 *   error     → calm, neutral expression
 */
export default function AryaAvatar({ state = "idle", size = 128, showRing = true, className = "" }) {
  const { t } = useLanguage();
  const speaking = state === "speaking";
  const listening = state === "listening";
  const thinking = state === "thinking";
  const loading = state === "loading";

  const stateLabel =
    speaking ? t("arya.state.speaking")
    : listening ? t("arya.state.listening")
    : thinking ? t("arya.state.thinking")
    : loading ? t("arya.state.loading")
    : state === "error" ? t("arya.state.error")
    : t("arya.state.idle");

  return (
    <div
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Arya — ${stateLabel}`}
    >
      {/* halo / state ring */}
      {showRing && (
        <>
          <span
            className={`absolute inset-0 rounded-full ${
              speaking ? "bg-saffron/20" : listening ? "bg-emerald-400/20" : "bg-saffron/10"
            } blur-md transition-colors`}
            aria-hidden="true"
          />
          {(speaking || listening) && (
            <span
              className={`absolute -inset-1 rounded-full border-2 ripple-ring ${
                listening ? "border-emerald-400/60" : "border-saffron/60"
              }`}
              aria-hidden="true"
            />
          )}
          {loading && (
            <span
              className="absolute -inset-1 rounded-full border-2 border-transparent border-t-saffron animate-spin"
              aria-hidden="true"
            />
          )}
        </>
      )}

      <svg
        viewBox="0 0 200 200"
        className={`relative h-full w-full ${speaking ? "arya-bob" : "arya-breathe"}`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="aryaBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#18294e" />
            <stop offset="100%" stopColor="#0b1730" />
          </linearGradient>
          <linearGradient id="aryaSkin" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#e0a878" />
            <stop offset="55%" stopColor="#c98a5b" />
            <stop offset="100%" stopColor="#a86f45" />
          </linearGradient>
          <linearGradient id="aryaKurta" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="55%" stopColor="#f0a92c" />
            <stop offset="100%" stopColor="#c97d15" />
          </linearGradient>
          <linearGradient id="aryaHair" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#2a2118" />
            <stop offset="100%" stopColor="#120d09" />
          </linearGradient>
          <clipPath id="aryaClip">
            <circle cx="100" cy="100" r="96" />
          </clipPath>
        </defs>

        {/* backdrop */}
        <circle cx="100" cy="100" r="96" fill="url(#aryaBg)" />
        <g clipPath="url(#aryaClip)">
          {/* temple silhouette behind him */}
          <g opacity="0.22" fill="#f59e0b">
            <path d="M40 200 V150 Q40 128 56 128 Q72 128 72 150 V200 Z" />
            <path d="M128 200 V150 Q128 128 144 128 Q160 128 160 150 V200 Z" />
            <path d="M100 96 L118 132 H82 Z" opacity="0.5" />
          </g>
          <circle cx="100" cy="72" r="46" fill="#f59e0b" opacity="0.08" />

          {/* shoulders / kurta */}
          <path
            d="M28 200 Q30 156 62 143 L100 133 L138 143 Q170 156 172 200 Z"
            fill="url(#aryaKurta)"
          />
          {/* shawl over shoulder */}
          <path d="M100 133 L138 143 Q152 148 158 162 L120 200 H100 Z" fill="#b45309" opacity="0.35" />
          {/* collar */}
          <path d="M86 137 L100 156 L114 137 L100 131 Z" fill="#8a5a10" opacity="0.55" />
          <path d="M100 156 V186" stroke="#8a5a10" strokeWidth="2.5" opacity="0.5" strokeLinecap="round" />

          {/* neck */}
          <path d="M86 108 h28 v24 q-14 10 -28 0 Z" fill="#b1764b" />

          {/* ears */}
          <ellipse cx="59" cy="86" rx="7" ry="10" fill="url(#aryaSkin)" />
          <ellipse cx="141" cy="86" rx="7" ry="10" fill="url(#aryaSkin)" />

          {/* face */}
          <path
            d="M62 78 Q62 40 100 40 Q138 40 138 78 L138 92 Q138 122 100 122 Q62 122 62 92 Z"
            fill="url(#aryaSkin)"
          />

          {/* hair */}
          <path
            d="M60 80 Q56 38 100 34 Q144 38 140 80 Q136 62 120 57 Q108 68 88 62 Q70 60 64 80 Z"
            fill="url(#aryaHair)"
          />
          <path d="M60 80 Q58 66 66 58" stroke="#120d09" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M140 80 Q142 66 134 58" stroke="#120d09" strokeWidth="5" fill="none" strokeLinecap="round" />

          {/* eyebrows */}
          <path d="M74 76 Q83 71 92 76" stroke="#241a12" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <path d="M108 76 Q117 71 126 76" stroke="#241a12" strokeWidth="3.4" fill="none" strokeLinecap="round" />

          {/* eyes */}
          <g>
            <ellipse cx="83" cy="87" rx="8" ry="5.6" fill="#fff" />
            <ellipse cx="117" cy="87" rx="8" ry="5.6" fill="#fff" />
            <circle cx="83.5" cy="87.5" r="3.6" fill="#231a12" />
            <circle cx="117.5" cy="87.5" r="3.6" fill="#231a12" />
            <circle cx="85" cy="86" r="1.2" fill="#fff" opacity="0.9" />
            <circle cx="119" cy="86" r="1.2" fill="#fff" opacity="0.9" />
            {/* eyelids — animated blink */}
            <g className="arya-blink">
              <ellipse cx="83" cy="87" rx="8.6" ry="6" fill="url(#aryaSkin)" />
              <ellipse cx="117" cy="87" rx="8.6" ry="6" fill="url(#aryaSkin)" />
            </g>
          </g>

          {/* nose */}
          <path d="M100 90 Q97 99 100 103 Q103 104 105 102" stroke="#9c6236" strokeWidth="2.4" fill="none" strokeLinecap="round" />

          {/* mouth — morphs while speaking */}
          <g className={speaking ? "arya-mouth-speaking" : ""} style={{ transformOrigin: "100px 110px" }}>
            {speaking ? (
              <ellipse cx="100" cy="110" rx="9" ry="6" fill="#6d2f2a" />
            ) : (
              <path d="M90 109 Q100 116 110 109" stroke="#7a3a2e" strokeWidth="3.2" fill="none" strokeLinecap="round" />
            )}
            {speaking && <ellipse cx="100" cy="113.5" rx="5.5" ry="2.2" fill="#b7615a" opacity="0.85" />}
          </g>

          {/* tilak */}
          <path d="M100 60 q3 8 0 12 q-3 -4 0 -12 Z" fill="#c2410c" opacity="0.8" />
        </g>

        {/* rim */}
        <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(245,158,11,0.45)" strokeWidth="2.5" />
      </svg>

      {/* thinking dots */}
      {thinking && (
        <span className="absolute -top-1 -right-1 flex items-center gap-1 rounded-full bg-midnight px-2 py-1.5 shadow-lg" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-saffron arya-dot"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </span>
      )}

      {/* speaking waveform */}
      {speaking && (
        <span className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-end gap-[3px] rounded-full bg-midnight px-2.5 py-1.5 shadow-lg" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="wave-bar w-[3px] rounded-full bg-saffron"
              style={{ height: 12, animationDelay: `${i * 0.11}s` }}
            />
          ))}
        </span>
      )}

      {/* listening mic */}
      {listening && (
        <span className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-emerald-600 px-2.5 py-1 shadow-lg" aria-hidden="true">
          <span className="h-2 w-2 animate-ping rounded-full bg-white" />
          <span className="text-[10px] font-extrabold text-white">●</span>
        </span>
      )}
    </div>
  );
}
