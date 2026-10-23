-- ============================================================
-- TEMPLEVERSE — PostgreSQL schema for Supabase
-- Interactive Temple Exploration Platform + AI Temple Guide
--
-- 5 temples • 38 locations • 5 languages • grounded AI guide
--
-- Run this file first, then supabase/seed.sql.
-- ============================================================

-- ---------- Languages ----------
create table if not exists public.languages (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,             -- en | hi | te | ta | ml | ...
  name text not null,
  native_name text not null,
  bcp47 text,                            -- voice tag, e.g. ta-IN
  created_at timestamptz not null default now()
);

-- ---------- Temples ----------
create table if not exists public.temples (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  location text,
  city text,
  state text,
  country text not null default 'India',
  latitude double precision,
  longitude double precision,
  description text,
  history text,
  architecture_summary text,
  cultural_significance text,
  main_deity text,
  architectural_style text,
  historical_period text,
  unesco boolean not null default false,
  image_url text,
  image_credit text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.temple_translations (
  id uuid primary key default gen_random_uuid(),
  temple_id uuid not null references public.temples (id) on delete cascade,
  language_id uuid not null references public.languages (id) on delete cascade,
  name text,
  description text,
  history text,
  architecture_summary text,
  cultural_significance text,
  main_deity text,
  architectural_style text,
  historical_period text,
  unique (temple_id, language_id)
);

-- ---------- Historical timeline ----------
create table if not exists public.temple_timeline (
  id uuid primary key default gen_random_uuid(),
  temple_id uuid not null references public.temples (id) on delete cascade,
  year_label text not null,
  event text not null,
  display_order integer not null default 0
);

-- ---------- Locations / sub-shrines ----------
create table if not exists public.temple_locations (
  id uuid primary key default gen_random_uuid(),
  temple_id uuid not null references public.temples (id) on delete cascade,
  name text not null,
  type text,               -- entrance|gopuram|tower|mandapam|hall|shrine|pond|chariot|gallery|complex
  description text,
  story text,
  architecture text,
  rituals text,
  significance text,
  latitude double precision,
  longitude double precision,
  map_x numeric,           -- 0–100 position on the interactive map
  map_y numeric,
  image_url text,          -- NULL when no verified photograph exists
  image_credit text,
  audio_url text,
  video_url text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.location_translations (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references public.temple_locations (id) on delete cascade,
  language_id uuid not null references public.languages (id) on delete cascade,
  name text,
  description text,
  story text,
  architecture text,
  rituals text,
  significance text,
  unique (location_id, language_id)
);

-- ---------- Stories (long-form, optional per location) ----------
create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references public.temple_locations (id) on delete cascade,
  temple_id uuid references public.temples (id) on delete cascade,
  title text,
  body text,
  is_tradition boolean not null default false,  -- TRUE = traditional account, not documented history
  display_order integer not null default 0
);

create table if not exists public.story_translations (
  id uuid primary key default gen_random_uuid(),
  story_id uuid not null references public.stories (id) on delete cascade,
  language_id uuid not null references public.languages (id) on delete cascade,
  title text,
  body text,
  unique (story_id, language_id)
);

-- ---------- Guided exploration ----------
create table if not exists public.guided_steps (
  id uuid primary key default gen_random_uuid(),
  temple_id uuid not null references public.temples (id) on delete cascade,
  location_id uuid not null references public.temple_locations (id) on delete cascade,
  step_number integer not null,
  title text,
  description text,
  created_at timestamptz not null default now(),
  unique (temple_id, step_number)
);

create table if not exists public.guided_step_translations (
  id uuid primary key default gen_random_uuid(),
  step_id uuid not null references public.guided_steps (id) on delete cascade,
  language_id uuid not null references public.languages (id) on delete cascade,
  title text,
  description text,
  unique (step_id, language_id)
);

-- ---------- Images & media ----------
create table if not exists public.images (
  id uuid primary key default gen_random_uuid(),
  temple_id uuid references public.temples (id) on delete cascade,
  location_id uuid references public.temple_locations (id) on delete cascade,
  url text not null,
  caption text,
  credit text,
  subject text,                          -- what the photograph actually shows
  verified boolean not null default false,  -- only verified images are rendered
  display_order integer not null default 0
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references public.temple_locations (id) on delete cascade,
  temple_id uuid references public.temples (id) on delete cascade,
  type text not null check (type in ('audio', 'video')),
  title text,
  url text,
  language_id uuid references public.languages (id) on delete set null
);

-- ---------- Narration (AI voice pipeline) ----------
-- narration_scripts holds the text Arya speaks; narrations caches the
-- rendered audio produced by the server-side TTS provider.
create table if not exists public.narration_scripts (
  id uuid primary key default gen_random_uuid(),
  temple_id uuid references public.temples (id) on delete cascade,
  location_id uuid references public.temple_locations (id) on delete cascade,
  step_id uuid references public.guided_steps (id) on delete cascade,
  language_id uuid not null references public.languages (id) on delete cascade,
  script text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.narrations (
  id uuid primary key default gen_random_uuid(),
  script_id uuid not null references public.narration_scripts (id) on delete cascade,
  language_id uuid not null references public.languages (id) on delete cascade,
  provider text,                         -- openai | google | azure | elevenlabs
  voice_id text,
  audio_url text,
  duration_seconds numeric,
  created_at timestamptz not null default now()
);

-- ---------- Sources & citations ----------
create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  source_type text,                      -- UNESCO | ASI | State Tourism | Temple Administration
  created_at timestamptz not null default now()
);

create table if not exists public.temple_sources (
  temple_id uuid not null references public.temples (id) on delete cascade,
  source_id uuid not null references public.sources (id) on delete cascade,
  primary key (temple_id, source_id)
);

create table if not exists public.location_sources (
  location_id uuid not null references public.temple_locations (id) on delete cascade,
  source_id uuid not null references public.sources (id) on delete cascade,
  primary key (location_id, source_id)
);

-- ---------- AI guide analytics (optional) ----------
create table if not exists public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  temple_id uuid references public.temples (id) on delete set null,
  location_id uuid references public.temple_locations (id) on delete set null,
  language_id uuid references public.languages (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_questions (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.ai_conversations (id) on delete cascade,
  question text not null,
  detected_intent text,
  answered boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- Offline downloads (prototype bookkeeping) ----------
create table if not exists public.offline_downloads (
  id uuid primary key default gen_random_uuid(),
  temple_id uuid not null references public.temples (id) on delete cascade,
  device_id text,
  downloaded_at timestamptz not null default now(),
  unique (temple_id, device_id)
);

-- ============================================================
-- ROW LEVEL SECURITY — public users may READ published content only.
-- No write policy is exposed to the anon key.
-- ============================================================
do $$
declare tbl text;
begin
  foreach tbl in array array[
    'languages','temples','temple_translations','temple_timeline',
    'temple_locations','location_translations','stories','story_translations',
    'guided_steps','guided_step_translations','images','media',
    'narration_scripts','narrations','sources','temple_sources',
    'location_sources','offline_downloads'
  ] loop
    execute format('alter table public.%I enable row level security;', tbl);
    execute format(
      'drop policy if exists "Public read %1$s" on public.%1$I;', tbl
    );
    execute format(
      'create policy "Public read %1$s" on public.%1$I for select using (true);', tbl
    );
  end loop;
end $$;

-- AI analytics tables stay closed to anonymous reads.
alter table public.ai_conversations enable row level security;
alter table public.ai_questions enable row level security;

-- ---------- Indexes ----------
create index if not exists idx_temple_translations_temple on public.temple_translations (temple_id);
create index if not exists idx_temple_timeline_temple on public.temple_timeline (temple_id);
create index if not exists idx_locations_temple on public.temple_locations (temple_id);
create index if not exists idx_location_translations_location on public.location_translations (location_id);
create index if not exists idx_guided_steps_temple on public.guided_steps (temple_id);
create index if not exists idx_images_temple on public.images (temple_id);
create index if not exists idx_media_location on public.media (location_id);
create index if not exists idx_narration_scripts_lang on public.narration_scripts (language_id);
create index if not exists idx_temple_sources_temple on public.temple_sources (temple_id);
