// ------------------------------------------------------------------
// Supabase client — created only when environment variables exist.
// If unconfigured, `supabase` is null and the services automatically
// fall back to the built-in demo dataset (src/data/demoData.js).
// ------------------------------------------------------------------

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
