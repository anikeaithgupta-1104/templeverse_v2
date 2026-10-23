# TempleVerse — improvement notes

## Added
- A new **Connections** discovery page at `#/connections`, linked from the main navigation.
- Cross-temple relationship discovery based on architectural family, deity-name overlap, and curated story/tradition themes.
- Search, starting-temple selection, and filters for architecture, shared deities, and stories.
- Relationship explanations on each result and a note distinguishing curated thematic connections from claims of shared historical origin.

## Important follow-up recommendations
1. Move the curated `STORY_THEMES` catalogue into database tables (`temple_themes`, `temple_theme_links`) so editors can cite a source for every story connection.
2. Add source URLs and confidence/evidence labels to each relationship; avoid treating text overlap alone as proof of a shared story.
3. Add tests for search, route rendering, empty/error states, and relationship scoring.
4. Run `npm ci && npm run build` in a clean environment before deployment. The uploaded `node_modules` was incomplete for this Linux environment (Rollup's optional Linux binary is missing), so a production build could not be verified here.

## Existing project observations
- The app already has a local demo-data fallback when Supabase is unconfigured or fails, which is useful for resilience.
- `dist/index.html` is a generated single-file build artifact and should be regenerated from source during deployment rather than edited directly.
- Keep server-side AI provider secrets out of `VITE_*` environment variables; those variables are exposed to browser code.
