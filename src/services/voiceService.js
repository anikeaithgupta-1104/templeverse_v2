// ------------------------------------------------------------------
// TempleVerse — voice service.
//
// TWO LEVELS, chosen automatically:
//
//  LEVEL 1 "AI Voice Demo"  (always available, no key required)
//     Uses the browser's built-in SpeechSynthesis engine. This is a
//     browser text-to-speech voice — it is NOT a proprietary AI voice
//     and the UI labels it honestly as "AI Voice Demo".
//
//  LEVEL 2 "AI Voice"       (enabled with VITE_AI_VOICE_ENABLED=true)
//     Posts the text to a SERVER-SIDE endpoint (default /api/tts)
//     which holds the provider credentials. No API key is ever read
//     or shipped in this frontend bundle. Any provider (OpenAI TTS,
//     Google Cloud TTS, Azure Speech, ElevenLabs...) can sit behind
//     that endpoint without changing a single component.
// ------------------------------------------------------------------

/** BCP-47 tags used to pick a matching system voice per app language. */
export const LANGUAGE_VOICE_TAGS = {
  en: ["en-IN", "en-GB", "en-US", "en"],
  hi: ["hi-IN", "hi"],
  te: ["te-IN", "te"],
  ta: ["ta-IN", "ta-LK", "ta"],
  ml: ["ml-IN", "ml"],
};

const AI_VOICE_ENABLED = import.meta.env.VITE_AI_VOICE_ENABLED === "true";
const AI_VOICE_ENDPOINT = import.meta.env.VITE_AI_VOICE_ENDPOINT || "/api/tts";

/** Which engine will actually be used for playback. */
export function getVoiceMode() {
  if (AI_VOICE_ENABLED) return "ai";
  return supportsSpeech() ? "demo" : "unsupported";
}

export function supportsSpeech() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function supportsSpeechRecognition() {
  return (
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
  );
}

/* ------------------------------------------------------------------
   Voice inventory
------------------------------------------------------------------ */
let voiceCache = [];

export function getAvailableVoices() {
  if (!supportsSpeech()) return [];
  const list = window.speechSynthesis.getVoices();
  if (list && list.length) voiceCache = list;
  return voiceCache;
}

/** Resolve the best available system voice for an app language code. */
export function pickVoice(langCode, preferredVoiceURI = null) {
  const voices = getAvailableVoices();
  if (!voices.length) return null;

  if (preferredVoiceURI) {
    const exact = voices.find((v) => v.voiceURI === preferredVoiceURI);
    if (exact) return exact;
  }

  const tags = LANGUAGE_VOICE_TAGS[langCode] || LANGUAGE_VOICE_TAGS.en;
  for (const tag of tags) {
    const match = voices.find((v) => v.lang?.toLowerCase() === tag.toLowerCase());
    if (match) return match;
  }
  for (const tag of tags) {
    const prefix = tag.split("-")[0].toLowerCase();
    const match = voices.find((v) => v.lang?.toLowerCase().startsWith(prefix));
    if (match) return match;
  }
  return null;
}

/** True when the device actually has a voice for this language. */
export function hasVoiceFor(langCode) {
  return Boolean(pickVoice(langCode));
}

/** Voices offered in the "change voice" selector, for the current language. */
export function getVoicesForLanguage(langCode) {
  const tags = (LANGUAGE_VOICE_TAGS[langCode] || []).map((t) => t.split("-")[0].toLowerCase());
  return getAvailableVoices().filter((v) =>
    tags.some((prefix) => v.lang?.toLowerCase().startsWith(prefix))
  );
}

/* ------------------------------------------------------------------
   LEVEL 2 — server-side AI provider (credentials stay on the server)
------------------------------------------------------------------ */
export async function generateAIVoice(text, language) {
  const response = await fetch(AI_VOICE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language }),
  });
  if (!response.ok) throw new Error(`TTS request failed (${response.status})`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

/** Public alias used by the player. Returns an audio URL or null. */
export async function generateSpeech(text, language) {
  if (!AI_VOICE_ENABLED) return null;
  return generateAIVoice(text, language);
}

/* ------------------------------------------------------------------
   Playback controller
------------------------------------------------------------------ */
const state = {
  utterance: null,
  audio: null,
  language: "en",
  rate: 1,
  voiceURI: null,
  totalChars: 0,
  spokenChars: 0,
  listeners: new Set(),
  status: "idle", // idle | loading | speaking | paused | error
};

function emit(patch = {}) {
  const snapshot = {
    status: state.status,
    language: state.language,
    rate: state.rate,
    progress: state.totalChars ? Math.min(1, state.spokenChars / state.totalChars) : 0,
    ...patch,
  };
  state.listeners.forEach((fn) => {
    try {
      fn(snapshot);
    } catch {
      /* listener errors must never break playback */
    }
  });
}

export function subscribe(listener) {
  state.listeners.add(listener);
  return () => state.listeners.delete(listener);
}

export function getStatus() {
  return state.status;
}

export function changeLanguage(langCode) {
  state.language = langCode;
  state.voiceURI = null;
}

export function changeVoice(voiceURI) {
  state.voiceURI = voiceURI;
}

export function setRate(rate) {
  state.rate = rate;
  if (state.audio) state.audio.playbackRate = rate;
}

export function stopSpeech() {
  if (supportsSpeech()) window.speechSynthesis.cancel();
  if (state.audio) {
    state.audio.pause();
    state.audio = null;
  }
  state.utterance = null;
  state.spokenChars = 0;
  state.status = "idle";
  emit();
}

export function pauseSpeech() {
  if (state.audio) {
    state.audio.pause();
  } else if (supportsSpeech()) {
    window.speechSynthesis.pause();
  }
  if (state.status === "speaking") {
    state.status = "paused";
    emit();
  }
}

export function resumeSpeech() {
  if (state.audio) {
    state.audio.play().catch(() => {});
  } else if (supportsSpeech()) {
    window.speechSynthesis.resume();
  }
  if (state.status === "paused") {
    state.status = "speaking";
    emit();
  }
}

/**
 * Speak a block of text in the given language.
 * Resolves when speech finishes (or is cancelled).
 */
export async function speakText(text, langCode = state.language, options = {}) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (!clean) return;

  stopSpeech();
  state.language = langCode;
  state.totalChars = clean.length;
  state.spokenChars = 0;

  // ---- Level 2: real AI voice through the server ----
  if (AI_VOICE_ENABLED) {
    try {
      state.status = "loading";
      emit();
      const url = await generateSpeech(clean, langCode);
      if (url) {
        const audio = new Audio(url);
        audio.playbackRate = state.rate;
        state.audio = audio;
        state.status = "speaking";
        emit();
        audio.ontimeupdate = () => {
          if (audio.duration) {
            state.spokenChars = (audio.currentTime / audio.duration) * state.totalChars;
            emit();
          }
        };
        audio.onended = () => {
          state.status = "idle";
          state.spokenChars = state.totalChars;
          emit();
          options.onEnd?.();
        };
        audio.onerror = () => {
          state.status = "error";
          emit();
        };
        await audio.play();
        return;
      }
    } catch (err) {
      console.warn("TempleVerse: AI voice unavailable, using browser voice.", err);
    }
  }

  // ---- Level 1: browser SpeechSynthesis ("AI Voice Demo") ----
  if (!supportsSpeech()) {
    state.status = "error";
    emit({ reason: "unsupported" });
    return;
  }

  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(clean);
    const voice = pickVoice(langCode, state.voiceURI);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = (LANGUAGE_VOICE_TAGS[langCode] || ["en-IN"])[0];
    }
    utterance.rate = state.rate;
    utterance.pitch = 1.02;

    utterance.onstart = () => {
      state.status = "speaking";
      emit();
    };
    utterance.onboundary = (e) => {
      if (typeof e.charIndex === "number") {
        state.spokenChars = e.charIndex;
        emit();
      }
    };
    utterance.onend = () => {
      state.spokenChars = state.totalChars;
      state.status = "idle";
      state.utterance = null;
      emit();
      options.onEnd?.();
      resolve();
    };
    utterance.onerror = (e) => {
      // "interrupted"/"canceled" happen on normal stop — not real errors
      if (e.error === "interrupted" || e.error === "canceled") {
        resolve();
        return;
      }
      state.status = "error";
      emit({ reason: e.error });
      resolve();
    };

    state.utterance = utterance;
    window.speechSynthesis.speak(utterance);
  });
}

/* ------------------------------------------------------------------
   Speech recognition (voice questions) — optional, degrades safely
------------------------------------------------------------------ */
export function startListening(langCode, { onResult, onError, onEnd } = {}) {
  if (!supportsSpeechRecognition()) {
    onError?.("unsupported");
    return null;
  }
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new Recognition();
  recognition.lang = (LANGUAGE_VOICE_TAGS[langCode] || ["en-IN"])[0];
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;

  recognition.onresult = (event) => {
    const transcript = event.results?.[0]?.[0]?.transcript;
    if (transcript) onResult?.(transcript);
  };
  recognition.onerror = (event) => onError?.(event.error || "error");
  recognition.onend = () => onEnd?.();

  try {
    recognition.start();
  } catch {
    onError?.("start-failed");
    return null;
  }
  return recognition;
}

// Keep the voice list warm — some browsers populate it asynchronously.
if (supportsSpeech()) {
  getAvailableVoices();
  window.speechSynthesis.onvoiceschanged = () => getAvailableVoices();
}
