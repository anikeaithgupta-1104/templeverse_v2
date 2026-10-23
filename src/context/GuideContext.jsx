import React from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";
import {
  answerTempleQuestion,
  generateNarrationScript,
  getSuggestedQuestions,
  getTempleContext,
  phrase,
} from "../services/templeGuideService";
import {
  getVoiceMode,
  hasVoiceFor,
  pauseSpeech,
  resumeSpeech,
  setRate as setVoiceRate,
  speakText,
  stopSpeech,
  subscribe,
} from "../services/voiceService";

const GuideContext = createContext(null);

/**
 * Global Arya state: where the user is, what Arya is doing, the
 * conversation, and the narration transport controls.
 */
export function GuideProvider({ children }) {
  const { lang, t } = useLanguage();

  const [temple, setTemple] = useState(null);
  const [location, setLocation] = useState(null);
  const [state, setState] = useState("idle"); // idle|speaking|listening|thinking|loading|error
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [rate, setRateState] = useState(1);
  const [spokenText, setSpokenText] = useState("");

  const thinkTimer = useRef(null);

  /* --- keep Arya's state in sync with the voice engine --- */
  useEffect(() => {
    const unsubscribe = subscribe((snapshot) => {
      setProgress(snapshot.progress);
      if (snapshot.status === "speaking") setState("speaking");
      else if (snapshot.status === "loading") setState("loading");
      else if (snapshot.status === "error") setState("error");
      else if (snapshot.status === "idle") setState((s) => (s === "listening" ? s : "idle"));
      else if (snapshot.status === "paused") setState("idle");
    });
    return () => {
      unsubscribe();
      stopSpeech();
    };
  }, []);

  /* --- stop narration when the page context changes --- */
  const setContext = useCallback((nextTemple, nextLocation = null) => {
    setTemple(nextTemple || null);
    setLocation(nextLocation || null);
  }, []);

  const context = useMemo(
    () => (temple ? getTempleContext(temple, location, lang) : null),
    [temple, location, lang]
  );

  /* --- greet once per temple/language, in the chat --- */
  useEffect(() => {
    if (!context) return;
    const p = phrase(lang);
    const greeting = context.location
      ? p.atLocation(context.locationName, context.templeName)
      : p.atTemple(context.templeName);
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.role === "arya" && last.text === greeting) return prev;
      return [...prev, { id: `g-${Date.now()}`, role: "arya", text: greeting, kind: "context" }];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context?.templeName, context?.locationName, lang]);

  /* --- narration --- */
  const speak = useCallback(
    async (text) => {
      const clean = String(text || "").trim();
      if (!clean) return;
      setSpokenText(clean);
      await speakText(clean, lang);
    },
    [lang]
  );

  const narrateCurrent = useCallback(async () => {
    if (!context) return;
    const script = generateNarrationScript(context);
    await speak(script);
  }, [context, speak]);

  const stop = useCallback(() => {
    stopSpeech();
    setState("idle");
    setProgress(0);
  }, []);

  const pause = useCallback(() => {
    pauseSpeech();
    setState("idle");
  }, []);

  const resume = useCallback(() => {
    resumeSpeech();
    setState("speaking");
  }, []);

  const changeRate = useCallback((value) => {
    setRateState(value);
    setVoiceRate(value);
  }, []);

  /* --- conversation --- */
  const ask = useCallback(
    async (question, { speakAnswer = true, context: override = null } = {}) => {
      const q = String(question || "").trim();
      if (!q) return;
      // `override` lets a caller (e.g. a map marker) ask about a place
      // before the page-level context has re-rendered.
      const activeContext = override || context;
      setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text: q }]);
      setState("thinking");

      clearTimeout(thinkTimer.current);
      await new Promise((resolve) => {
        thinkTimer.current = setTimeout(resolve, 420); // brief, natural pause
      });

      let answer;
      try {
        answer = answerTempleQuestion(q, activeContext);
      } catch (err) {
        console.warn("Arya could not build an answer:", err);
        setState("error");
        setMessages((prev) => [
          ...prev,
          { id: `e-${Date.now()}`, role: "arya", text: t("arya.state.error"), kind: "error" },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "arya",
          text: answer.text,
          kind: answer.intent,
          untranslated: answer.untranslated,
          sources: answer.sources,
        },
      ]);
      setState("idle");
      if (speakAnswer) await speak(answer.text);
    },
    [context, speak, t]
  );

  const clearChat = useCallback(() => setMessages([]), []);

  const value = useMemo(
    () => ({
      // context
      temple,
      location,
      context,
      setContext,
      // visual state
      state,
      setState,
      progress,
      open,
      setOpen,
      spokenText,
      // narration
      speak,
      narrateCurrent,
      stop,
      pause,
      resume,
      rate,
      changeRate,
      voiceMode: getVoiceMode(),
      hasVoice: hasVoiceFor(lang),
      // chat
      messages,
      ask,
      clearChat,
      suggestions: getSuggestedQuestions(context),
    }),
    [
      temple, location, context, setContext, state, progress, open, spokenText,
      speak, narrateCurrent, stop, pause, resume, rate, changeRate, messages, ask, clearChat, lang,
    ]
  );

  return <GuideContext.Provider value={value}>{children}</GuideContext.Provider>;
}

export function useGuide() {
  const ctx = useContext(GuideContext);
  if (!ctx) throw new Error("useGuide must be used inside <GuideProvider>");
  return ctx;
}

/** Registers the current page's temple/location with Arya. */
export function useGuideContext(temple, location = null) {
  const { setContext } = useGuide();
  useEffect(() => {
    setContext(temple, location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temple?.id, location?.id]);
}
