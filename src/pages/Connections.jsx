import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Landmark, Search, Sparkles, Users } from "lucide-react";
import { getTempleConnections } from "../services/templeConnections";
import { useLanguage } from "../context/LanguageContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import SmartImage from "../components/SmartImage";

const FILTERS = [
  { id: "all", label: "All connections" },
  { id: "architecture", label: "Architecture" },
  { id: "deity", label: "Shared deities" },
  { id: "story", label: "Stories & traditions" },
];

export default function Connections() {
  const { name } = useLanguage();
  const [groups, setGroups] = useState(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState("all");
  const load = () => { setError(false); getTempleConnections().then(setGroups).catch(() => setError(true)); };
  useEffect(() => { load(); }, []);
  const results = useMemo(() => (groups || []).filter(({ temple, connections }) => {
    if (selected !== "all" && temple.id !== selected) return false;
    const q = query.trim().toLowerCase();
    return (!q || `${temple.name} ${temple.city} ${temple.main_deity} ${temple.architectural_style}`.toLowerCase().includes(q)) &&
      connections.some((c) => filter === "all" || c.reasons.some((r) => r.type === filter));
  }).map((group) => ({ ...group, connections: group.connections.filter((c) => (filter === "all" || c.reasons.some((r) => r.type === filter)) && (!query.trim() || `${c.temple.name} ${c.temple.city} ${c.temple.main_deity} ${c.temple.architectural_style} ${c.reasons.map((r) => r.detail).join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()))) })), [groups, query, filter, selected]);

  return <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
    <section className="relative overflow-hidden rounded-[2rem] bg-midnight px-6 py-10 text-white sm:px-10 sm:py-14">
      <div className="pattern-arch pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative max-w-3xl">
        <span className="chip chip-light"><Sparkles className="h-3 w-3 text-saffron" /> The sacred connections atlas</span>
        <h1 className="mt-5 font-display text-3xl font-bold sm:text-5xl">Temples are chapters in a larger story.</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-white/75">Discover how India's sacred places connect through architectural lineages, shared deities, and living stories — not just by where they appear on a map.</p>
      </div>
      <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
        {[{ icon: Landmark, title: "Architecture", text: "Styles, dynasties & design" }, { icon: Users, title: "Deities", text: "Shared forms of the divine" }, { icon: BookOpen, title: "Stories", text: "Myths, rituals & traditions" }].map(({icon: Icon,title,text}) => <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4"><Icon className="h-5 w-5 text-saffron"/><p className="mt-3 font-bold">{title}</p><p className="mt-1 text-sm text-white/60">{text}</p></div>)}
      </div>
    </section>

    <div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto]">
      <label className="relative block"><span className="sr-only">Search temples and connections</span><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-midnight/40"/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search temples, deities, cities, or traditions…" className="w-full rounded-xl border border-midnight/15 bg-white py-3 pl-11 pr-4 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/25"/></label>
      <select aria-label="Choose a temple" value={selected} onChange={(e)=>setSelected(e.target.value)} className="rounded-xl border border-midnight/15 bg-white px-4 py-3 text-sm font-semibold"><option value="all">Every temple</option>{(groups||[]).map(({temple})=><option key={temple.id} value={temple.id}>{temple.name}</option>)}</select>
    </div>
    <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter connection type">{FILTERS.map((item)=><button key={item.id} onClick={()=>setFilter(item.id)} aria-pressed={filter===item.id} className={`rounded-full px-4 py-2 text-sm font-bold transition ${filter===item.id?"bg-midnight text-white":"border border-midnight/15 bg-white text-midnight/70 hover:border-saffron"}`}>{item.label}</button>)}</div>
    {error ? <ErrorState title="Connections could not load" message="Please check your connection and try again." onRetry={load}/> : !groups ? <LoadingSpinner label="Mapping sacred connections…" full/> : <div className="mt-8 space-y-10">
      {results.map(({temple,connections})=><section key={temple.id} className="rounded-3xl border border-midnight/10 bg-white p-5 shadow-sm sm:p-7">
        <div className="grid gap-5 sm:grid-cols-[180px_1fr]">
          <Link to={`/temple/${temple.slug}`} className="block overflow-hidden rounded-2xl"><SmartImage src={temple.image_url} alt={name(temple)} className="h-40 w-full object-cover transition hover:scale-105" showNote={false}/></Link>
          <div><p className="text-xs font-extrabold uppercase tracking-[.16em] text-saffron-700">Connection starting point</p><h2 className="mt-2 font-display text-2xl font-bold text-midnight"><Link to={`/temple/${temple.slug}`} className="hover:text-saffron-700">{name(temple)} <ArrowRight className="inline h-4 w-4"/></Link></h2><p className="mt-1 text-sm text-midnight/60">{temple.city}, {temple.state} · {temple.architectural_style}</p><p className="mt-2 text-sm text-midnight/75">Main deity: {temple.main_deity}</p></div>
        </div>
        {connections.length ? <div className="mt-6 grid gap-3 lg:grid-cols-2">{connections.map(({temple:other,reasons})=><article key={other.id} className="rounded-2xl border border-midnight/10 bg-cream/50 p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-display text-lg font-bold text-midnight">{other.name}</h3><p className="mt-1 text-xs text-midnight/55">{other.city}, {other.state}</p></div><span className="rounded-full bg-saffron/15 px-2.5 py-1 text-[11px] font-bold text-saffron-800">{reasons.length} {reasons.length===1?"link":"links"}</span></div><div className="mt-3 space-y-2">{reasons.map((r)=><div key={r.type} className="text-sm"><span className="font-bold text-midnight">{r.label}:</span> <span className="text-midnight/65">{r.detail}</span></div>)}</div><Link to={`/temple/${other.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-saffron-700 hover:text-midnight">Explore temple <ArrowRight className="h-4 w-4"/></Link></article>)}</div> : <p className="mt-5 rounded-xl bg-cream p-4 text-sm text-midnight/65">No matches for this filter yet. Try another connection type.</p>}
      </section>)}
      {!results.length && <p className="py-12 text-center text-midnight/60">No temples match this search. Try a different term or clear the temple filter.</p>}
      <p className="text-xs leading-relaxed text-midnight/50">Editorial note: connections are based on the catalogue's recorded architecture, deity names, and curated tradition themes. Similarity is a discovery aid; it does not imply that every temple shares the same historical origin or story.</p>
    </div>}
  </main>;
}
