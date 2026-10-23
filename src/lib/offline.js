// ------------------------------------------------------------------
// Offline prototype — stores downloaded temple content in
// localStorage (a full IndexedDB implementation can replace this
// module without touching any UI code).
// ------------------------------------------------------------------

const STORAGE_KEY = "templeverse_offline_v1";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

/** Save a complete temple payload (temple + locations + steps) locally. */
export function saveTempleOffline(payload) {
  const list = readAll().filter((item) => item.temple.slug !== payload.temple.slug);
  list.push({ ...payload, savedAt: Date.now() });
  return writeAll(list);
}

export function removeTempleOffline(slug) {
  return writeAll(readAll().filter((item) => item.temple.slug !== slug));
}

export function isTempleOffline(slug) {
  return readAll().some((item) => item.temple.slug === slug);
}

export function getOfflineDownloads() {
  return readAll();
}

export function getOfflineTemple(slug) {
  return readAll().find((item) => item.temple.slug === slug) || null;
}

export function isOnline() {
  return typeof navigator === "undefined" ? true : navigator.onLine;
}
