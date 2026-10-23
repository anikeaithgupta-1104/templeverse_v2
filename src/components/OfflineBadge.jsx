import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Download, WifiOff } from "lucide-react";
import { getOfflineDownloads, isOnline } from "../lib/offline";
import { useLanguage } from "../context/LanguageContext";

/**
 * Navbar offline indicator — shows the number of temples saved on
 * this device, and highlights when the device is offline.
 */
export default function OfflineBadge() {
  const { t } = useLanguage();
  const [count, setCount] = useState(getOfflineDownloads().length);
  const [online, setOnline] = useState(isOnline());

  useEffect(() => {
    const sync = () => {
      setCount(getOfflineDownloads().length);
      setOnline(isOnline());
    };
    window.addEventListener("storage", sync);
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  return (
    <Link
      to="/offline"
      aria-label={t("nav.offline")}
      title={t("nav.offline")}
      className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
        !online && count > 0
          ? "border-saffron/60 bg-saffron/15 text-saffron"
          : "border-midnight/10 bg-white/70 text-midnight-700 hover:border-saffron/50"
      }`}
    >
      {!online ? (
        <WifiOff className="h-4.5 w-4.5" aria-hidden="true" />
      ) : (
        <Download className="h-4.5 w-4.5" aria-hidden="true" />
      )}
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-saffron px-1 text-[10px] font-extrabold text-midnight">
          {count}
        </span>
      )}
    </Link>
  );
}
