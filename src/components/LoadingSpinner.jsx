import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ label = "Loading…", full = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        full ? "min-h-[50vh]" : "py-16"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="relative">
        <div className="h-14 w-14 rounded-full border-4 border-saffron/20 border-t-saffron animate-spin" />
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-5 w-5 text-saffron" aria-hidden="true" />
        </span>
      </div>
      <p className="text-sm font-semibold text-midnight-700">{label}</p>
    </div>
  );
}
