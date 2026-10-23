import React from "react";
import { useEffect, useRef, useState } from "react";
import { Info, Mic, MicOff, Send, Trash2, Volume2 } from "lucide-react";
import { useGuide } from "../context/GuideContext";
import { useLanguage } from "../context/LanguageContext";
import { startListening, supportsSpeechRecognition } from "../services/voiceService";
import AryaAvatar from "./AryaAvatar";

/**
 * Chat with Arya. Answers are produced by templeGuideService from the
 * current temple/location records only — never invented.
 */
export default function GuideChat({ height = "26rem" }) {
  const { t, lang } = useLanguage();
  const { messages, ask, clearChat, suggestions, state, setState, speak } = useGuide();
  const [input, setInput] = useState("");
  const [micError, setMicError] = useState("");
  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);

  const micAvailable = supportsSpeechRecognition();
  const listening = state === "listening";

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, state]);

  useEffect(() => () => recognitionRef.current?.abort?.(), []);

  const submit = (e) => {
    e?.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput("");
    ask(q);
  };

  const toggleMic = () => {
    setMicError("");
    if (!micAvailable) {
      setMicError(t("arya.mic.unsupported"));
      return;
    }
    if (listening) {
      recognitionRef.current?.stop?.();
      setState("idle");
      return;
    }
    setState("listening");
    recognitionRef.current = startListening(lang, {
      onResult: (transcript) => {
        setState("idle");
        ask(transcript);
      },
      onError: (err) => {
        setState("idle");
        setMicError(err === "not-allowed" ? "Microphone permission was denied." : t("arya.mic.unsupported"));
      },
      onEnd: () => setState((s) => (s === "listening" ? "idle" : s)),
    });
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-midnight/10 bg-white">
      {/* messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto bg-cream-100/60 p-4"
        style={{ maxHeight: height, minHeight: "12rem" }}
        role="log"
        aria-live="polite"
        aria-label="Conversation with Arya"
      >
        {messages.map((m) => (
          <div key={m.id} className={`msg-in flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            {m.role === "arya" ? (
              <AryaAvatar state="idle" size={30} showRing={false} className="mt-0.5" />
            ) : (
              <span className="mt-0.5 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-midnight text-[11px] font-extrabold text-saffron">
                You
              </span>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                m.role === "user"
                  ? "rounded-tr-sm bg-midnight text-white"
                  : "rounded-tl-sm border border-midnight/8 bg-white text-midnight-700"
              }`}
            >
              {m.untranslated && (
                <span className="mb-1.5 inline-flex items-center gap-1 rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                  <Info className="h-2.5 w-2.5" aria-hidden="true" />
                  {t("arya.untranslated")}
                </span>
              )}
              <p className="whitespace-pre-line">{m.text}</p>
              {m.role === "arya" && (
                <button
                  onClick={() => speak(m.text)}
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-saffron-600 hover:text-saffron"
                >
                  <Volume2 className="h-3 w-3" aria-hidden="true" />
                  {t("arya.listen")}
                </button>
              )}
            </div>
          </div>
        ))}

        {state === "thinking" && (
          <div className="msg-in flex items-center gap-2.5">
            <AryaAvatar state="thinking" size={30} showRing={false} />
            <span className="rounded-2xl rounded-tl-sm border border-midnight/8 bg-white px-3.5 py-2.5 text-sm font-semibold text-midnight-700/70">
              {t("arya.state.thinking")}
            </span>
          </div>
        )}
      </div>

      {/* suggested questions */}
      <div className="border-t border-midnight/8 bg-white px-3 pt-2.5">
        <p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-midnight-700/40">
          {t("arya.suggested")}
        </p>
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-2">
          {suggestions.map((q) => (
            <button
              key={q}
              onClick={() => ask(q)}
              className="shrink-0 rounded-full border border-saffron/35 bg-saffron/8 px-3 py-1.5 text-xs font-bold text-saffron-600 transition-colors hover:bg-saffron/18"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* composer */}
      <form onSubmit={submit} className="flex items-center gap-2 border-t border-midnight/8 bg-white p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("arya.placeholder")}
          aria-label={t("arya.placeholder")}
          className="min-w-0 flex-1 rounded-xl border border-midnight/15 bg-cream-100/60 px-3.5 py-2.5 text-sm font-semibold text-midnight placeholder:text-midnight-700/35 focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/25"
        />
        <button
          type="button"
          onClick={toggleMic}
          aria-label={t("arya.mic")}
          title={micAvailable ? t("arya.mic") : t("arya.mic.unsupported")}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
            listening
              ? "border-emerald-500 bg-emerald-500 text-white"
              : micAvailable
                ? "border-midnight/15 text-midnight-700/70 hover:border-saffron hover:text-saffron-600"
                : "border-midnight/10 text-midnight-700/30"
          }`}
        >
          {micAvailable ? <Mic className="h-4 w-4" aria-hidden="true" /> : <MicOff className="h-4 w-4" aria-hidden="true" />}
        </button>
        <button
          type="submit"
          aria-label={t("arya.send")}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-saffron to-saffron-600 text-midnight shadow-md transition-transform hover:scale-105"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
        {messages.length > 1 && (
          <button
            type="button"
            onClick={clearChat}
            aria-label={t("arya.clear")}
            title={t("arya.clear")}
            className="flex h-10 w-9 shrink-0 items-center justify-center rounded-xl text-midnight-700/40 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </form>

      {micError && (
        <p className="border-t border-amber-200 bg-amber-50 px-4 py-2 text-[11px] font-semibold text-amber-800">{micError}</p>
      )}
      <p className="flex items-center gap-1.5 border-t border-midnight/8 bg-white px-4 py-2 text-[10px] text-midnight-700/40">
        <Info className="h-3 w-3 shrink-0" aria-hidden="true" />
        {t("arya.grounded")}
      </p>
    </div>
  );
}
