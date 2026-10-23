import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Landmark, Users, Sparkles, GitCompareArrows, X, MapPin } from "lucide-react";
import { getTempleConnections } from "../services/templeConnections";
import { useLanguage } from "../context/LanguageContext";
import SmartImage from "./SmartImage";

const TYPE_META = {
  architecture: { label: "Architecture", Icon: Landmark },
  deity: { label: "Shared deity", Icon: Users },
  story: { label: "Stories & traditions", Icon: BookOpen },
};

function makeExplanations(current, recommended, reasons) {
  return reasons.map((reason) => {
    if (reason.type === "architecture") {
      const family = (current.architectural_style || "").split(/[—–-]/)[0].trim() || "regional";
      return {
        type: reason.type,
        title: "Architectural tradition",
        text: `Both temples reflect the ${family} architectural tradition, expressed through their own regional and historical contexts. This is a stylistic connection; it does not by itself prove direct influence between the temples.`,
      };
    }
    if (reason.type === "deity") {
      return {
        type: reason.type,
        title: "Shared deity tradition",
        text: `Both temples are associated with ${reason.detail || "a related deity tradition"}. Visiting them together lets you compare how this tradition is worshipped and represented at each place.`,
      };
    }
    return {
      type: reason.type,
      title: "Cultural or story connection",
      text: `The curated records connect these temples through ${reason.detail || "a related cultural theme"}. Their traditions may differ, so this link is a starting point for comparison rather than a claim that they share an identical legend.`,
    };
  });
}

export default function SacredThreads({ templeSlug, limit = 3, variant = "related" }) {
  const { name } = useLanguage();
  const [groups, setGroups] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let active = true;
    getTempleConnections()
      .then((data) => { if (active) setGroups(Array.isArray(data) ? data : []); })
      .catch(() => { if (active) setGroups([]); })
      .finally(() => { if (active) setLoaded(true); });
    return () => { active = false; };
  }, []);

  const pairs = useMemo(() => {
    if (templeSlug) {
      const group = groups.find((item) => item.temple.slug === templeSlug);
      return (group?.connections || []).slice(0, limit).map((connection) => ({
        left: group.temple, right: connection.temple, reasons: connection.reasons,
        score: connection.score || connection.reasons.length,
      }));
    }
    const seen = new Set();
    return groups.flatMap((group) => group.connections.map((connection) => {
      const key = [group.temple.id, connection.temple.id].sort().join("::");
      if (seen.has(key)) return null;
      seen.add(key);
      return { left: group.temple, right: connection.temple, reasons: connection.reasons, score: connection.score || connection.reasons.length };
    }).filter(Boolean)).sort((a, b) => b.score - a.score).slice(0, limit);
  }, [groups, templeSlug, limit]);

  if (!loaded || !pairs.length) return null;
  const discovery = variant === "discovery";
  const contextual = Boolean(templeSlug);

  return (
    <section className={discovery ? "relative overflow-hidden bg-cream py-16 sm:py-20" : ""} aria-labelledby={discovery ? "sacred-threads-title" : "temple-threads-title"}>
      {discovery && <div className="pattern-dots pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />}
      <div className={discovery ? "relative mx-auto max-w-7xl px-4 sm:px-6" : ""}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="chip chip-gold"><Sparkles className="h-3 w-3" aria-hidden="true" /> {discovery ? "Discover meaningful links" : contextual ? "Continue your discovery" : "Beyond one temple"}</span>
            <h2 id={discovery ? "sacred-threads-title" : "temple-threads-title"} className="mt-3 font-display text-2xl font-bold text-midnight sm:text-3xl">
              {discovery ? "Temples connected by stories" : contextual ? "Related temples, with context" : "Explore meaningful connections"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-midnight-700/65 sm:text-base">
              {discovery
                ? "A short introduction to each connection. Open a card to see why the temples are related."
                : contextual
                  ? "A quick reason for each recommendation. Select “View connection” for the full explanation."
                  : "See the connection at a glance, then open any pair for the full story."}
            </p>
          </div>
          <Link to="/connections" className="inline-flex items-center gap-2 rounded-xl border border-midnight/15 bg-white px-4 py-2.5 text-sm font-bold text-midnight transition hover:border-saffron hover:text-saffron-700">
            All connections <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pairs.map((pair) => {
            const { left, right, reasons } = pair;
            const lead = reasons[0];
            const meta = TYPE_META[lead?.type] || TYPE_META.story;
            const Icon = meta.Icon;
            const shortReason = lead?.detail
              ? `${meta.label}: ${lead.detail}`
              : lead?.type === "architecture"
                ? `Both reflect a ${((left.architectural_style || "").split(/[—–-]/)[0] || "regional")} architectural tradition.`
                : lead?.type === "deity"
                  ? "Explore how their deity traditions overlap."
                  : "Explore a related cultural theme.";
            return (
              <article key={`${left.id}-${right.id}`} className="group overflow-hidden rounded-2xl border border-midnight/10 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-saffron/40 hover:shadow-lg">
                <div className="grid grid-cols-2 gap-px bg-midnight/10">
                  <Link to={`/temple/${left.slug}`} className="relative block h-28 overflow-hidden bg-midnight/5 sm:h-32" aria-label={`Explore ${name(left)}`}>
                    <SmartImage src={left.image_url} alt={name(left)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" showNote={false} />
                    <span className="absolute bottom-2 left-2 rounded-full bg-midnight/85 px-2 py-1 text-[10px] font-bold text-white">{contextual ? "This temple" : "Temple"}</span>
                  </Link>
                  <Link to={`/temple/${right.slug}`} className="relative block h-28 overflow-hidden bg-midnight/5 sm:h-32" aria-label={`Explore ${name(right)}`}>
                    <SmartImage src={right.image_url} alt={name(right)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" showNote={false} />
                    <span className="absolute bottom-2 left-2 rounded-full bg-saffron-600 px-2 py-1 text-[10px] font-bold text-white">Recommended</span>
                  </Link>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-saffron-700">
                    <Icon className="h-4 w-4" aria-hidden="true" /> {meta.label}
                    {reasons.length > 1 && <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] normal-case tracking-normal text-midnight/60">+{reasons.length - 1} more</span>}
                  </div>
                  <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-2">
                    <div className="min-w-0">
                      <Link to={`/temple/${left.slug}`} className="block break-words font-display text-base font-bold leading-snug text-midnight hover:text-saffron-700">{name(left)}</Link>
                      <p className="mt-1 flex items-start gap-1 text-xs leading-relaxed text-midnight/55"><MapPin className="mt-0.5 h-3 w-3 shrink-0" />{left.city}, {left.state}</p>
                    </div>
                    <GitCompareArrows className="mt-1 h-4 w-4 text-saffron-600" aria-label="Connection between temples" />
                    <div className="min-w-0 text-right">
                      <Link to={`/temple/${right.slug}`} className="block break-words font-display text-base font-bold leading-snug text-midnight hover:text-saffron-700">{name(right)}</Link>
                      <p className="mt-1 flex items-start justify-end gap-1 text-xs leading-relaxed text-midnight/55"><MapPin className="mt-0.5 h-3 w-3 shrink-0" />{right.city}, {right.state}</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl border border-saffron/20 bg-cream/70 p-3.5">
                    <p className="text-[11px] font-extrabold uppercase tracking-wide text-midnight/60">Why it's recommended</p>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-midnight/80">{shortReason}</p>
                    <button type="button" onClick={() => setSelected(pair)} className="mt-3 inline-flex items-center gap-1.5 text-sm font-extrabold text-saffron-800 hover:text-midnight focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron">
                      View connection <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <Link to={`/temple/${right.slug}`} className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-midnight hover:text-saffron-700">
                    Explore recommended temple <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-midnight/45">Connections are discovery suggestions based on recorded attributes and curated themes; shared styles alone do not prove direct historical influence.</p>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight/65 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="connection-dialog-title" className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-cream shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-midnight/10 bg-cream/95 p-5 backdrop-blur">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-saffron-800">Temple connection</p>
                <h3 id="connection-dialog-title" className="mt-1 font-display text-xl font-bold text-midnight sm:text-2xl">{name(selected.left)} <span className="text-saffron-700">↔</span> {name(selected.right)}</h3>
              </div>
              <button type="button" onClick={() => setSelected(null)} aria-label="Close connection details" className="rounded-full border border-midnight/15 p-2 text-midnight hover:bg-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4 p-5">
              <div className="grid grid-cols-2 gap-3">
                <Link to={`/temple/${selected.left.slug}`} onClick={() => setSelected(null)} className="overflow-hidden rounded-xl border border-midnight/10 bg-white">
                  <SmartImage src={selected.left.image_url} alt={name(selected.left)} className="h-28 w-full object-cover" showNote={false} />
                  <div className="p-3"><p className="font-bold text-midnight">{name(selected.left)}</p><p className="mt-1 text-xs text-midnight/55">{selected.left.city}, {selected.left.state}</p></div>
                </Link>
                <Link to={`/temple/${selected.right.slug}`} onClick={() => setSelected(null)} className="overflow-hidden rounded-xl border border-midnight/10 bg-white">
                  <SmartImage src={selected.right.image_url} alt={name(selected.right)} className="h-28 w-full object-cover" showNote={false} />
                  <div className="p-3"><p className="font-bold text-midnight">{name(selected.right)}</p><p className="mt-1 text-xs text-midnight/55">{selected.right.city}, {selected.right.state}</p></div>
                </Link>
              </div>
              {makeExplanations(selected.left, selected.right, selected.reasons).map((explanation) => {
                const MetaIcon = TYPE_META[explanation.type]?.Icon || BookOpen;
                return <article key={explanation.type} className="rounded-xl border border-midnight/10 bg-white p-4"><h4 className="flex items-center gap-2 font-bold text-midnight"><MetaIcon className="h-4 w-4 text-saffron-700" />{explanation.title}</h4><p className="mt-2 text-sm leading-6 text-midnight/75">{explanation.text}</p></article>;
              })}
              <p className="text-xs leading-relaxed text-midnight/50">These explanations summarize the relationship encoded in the current project data. Historical claims should be supported with references before being treated as definitive.</p>
              <button type="button" onClick={() => setSelected(null)} className="w-full rounded-xl bg-midnight px-4 py-3 font-bold text-white hover:bg-midnight/90">Close details</button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
