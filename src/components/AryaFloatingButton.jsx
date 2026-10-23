import React from "react";
import { useEffect } from "react";
import { X } from "lucide-react";
import AryaAvatar from "./AryaAvatar";
import AryaPanel from "./AryaPanel";
import { useGuide } from "../context/GuideContext";
import { useLanguage } from "../context/LanguageContext";

/**
 * Floating "Ask Arya" launcher. Appears whenever the user is inside a
 * temple context. On small screens it opens a bottom sheet; on large
 * screens it opens a docked panel.
 */
export default function AryaFloatingButton() {
  const { t } = useLanguage();
  const { context, state, open, setOpen } = useGuide();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  if (!context) return null;

  return (
    <>
      {/* launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed right-4 bottom-4 z-40 flex items-center gap-2.5 rounded-full border border-saffron/40 bg-midnight py-2 pr-4 pl-2 shadow-2xl transition-transform hover:scale-105 lg:hidden"
          aria-label={t("arya.ask")}
        >
          <AryaAvatar state={state} size={40} showRing={false} />
          <span className="text-sm font-extrabold text-saffron-300">{t("arya.ask")}</span>
        </button>
      )}

      {/* sheet */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center lg:justify-end" role="dialog" aria-modal="true" aria-label={t("arya.role")}>
          <button
            className="absolute inset-0 bg-midnight/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label={t("common.close")}
          />
          <div className="sheet-up relative max-h-[88vh] w-full overflow-y-auto rounded-t-3xl bg-cream p-4 shadow-2xl lg:m-6 lg:max-h-[86vh] lg:w-[26rem] lg:rounded-3xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="mx-auto h-1 w-10 rounded-full bg-midnight/15 lg:hidden" aria-hidden="true" />
              <button
                onClick={() => setOpen(false)}
                className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl border border-midnight/10 text-midnight-700/60 hover:border-saffron hover:text-saffron-600"
                aria-label={t("common.close")}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <AryaPanel chatHeight="18rem" />
          </div>
        </div>
      )}
    </>
  );
}
