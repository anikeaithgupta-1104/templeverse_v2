import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Context-preserving back navigation.
 *
 * If the user arrived from somewhere inside the app, go back one entry
 * so the previous scroll position and state are restored (map → location
 * → back → map). Only when there is no in-app history do we fall back
 * to an explicit route — never straight to the homepage by default.
 */
export default function useSmartBack(fallback = "/temples") {
  const navigate = useNavigate();

  return useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === "number" && idx > 0) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  }, [navigate, fallback]);
}
