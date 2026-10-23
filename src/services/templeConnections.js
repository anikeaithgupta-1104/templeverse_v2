import { getTemples } from "./templeService";

// Curated themes are deliberately separate from historical prose: similarity is a
// discovery aid, not a claim that two temples share an identical origin story.
const STORY_THEMES = {
  temple_brihadeeswarar: ["shiva worship", "chola legacy", "living temple traditions", "sacred dance and music"],
  temple_meenakshi: ["shiva and parvati", "divine marriage", "living temple traditions", "sacred dance and music"],
  temple_konark: ["surya worship", "solar mythology", "stone chariot symbolism", "temple sculpture"],
  temple_tirumala: ["vishnu worship", "sacred pilgrimage", "divine manifestation", "living temple traditions"],
  temple_shore: ["shiva and vishnu", "pallava legacy", "coastal sacred landscape", "temple sculpture"],
};

const normalize = (value = "") => String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
const deityTokens = (value = "") => {
  const text = normalize(value);
  const known = ["shiva", "parvati", "meenakshi", "sundareswarar", "vishnu", "venkateswara", "srinivasa", "balaji", "surya"];
  return known.filter((name) => text.includes(name));
};
const architectureFamily = (value = "") => {
  const text = normalize(value);
  if (text.includes("dravidian")) return "dravidian";
  if (text.includes("kalinga") || text.includes("odishan")) return "kalinga";
  if (text.includes("nagara")) return "nagara";
  return text.split(" ")[0] || "";
};

export async function getTempleConnections() {
  const temples = await getTemples();
  return temples.map((temple) => {
    const stories = STORY_THEMES[temple.id] || [];
    const connections = temples.filter((other) => other.id !== temple.id).map((other) => {
      const reasons = [];
      const family = architectureFamily(temple.architectural_style);
      if (family && family === architectureFamily(other.architectural_style)) reasons.push({ type: "architecture", label: "Related architecture", detail: `${temple.architectural_style} / ${other.architectural_style}` });
      const sharedDeities = deityTokens(temple.main_deity).filter((deity) => deityTokens(other.main_deity).includes(deity));
      if (sharedDeities.length) reasons.push({ type: "deity", label: "Shared deity tradition", detail: sharedDeities.map((x) => x[0].toUpperCase() + x.slice(1)).join(", ") });
      const otherStories = STORY_THEMES[other.id] || [];
      const sharedStories = stories.filter((story) => otherStories.includes(story));
      if (sharedStories.length) reasons.push({ type: "story", label: "Connected stories & traditions", detail: sharedStories.join(", ") });
      const score = reasons.reduce((sum, reason) => sum + ({ architecture: 2, deity: 3, story: 2 }[reason.type]), 0);
      return { temple: other, reasons, score };
    }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || a.temple.name.localeCompare(b.temple.name));
    return { temple, connections };
  });
}
