const KEY = "pp-wish";

export function readWish(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function toggleWish(id: string) {
  const next = readWish();
  const saved = next.includes(id) ? next.filter((item) => item !== id) : [...next, id];
  localStorage.setItem(KEY, JSON.stringify(saved));
  window.dispatchEvent(new Event("pp-wish"));
  return saved;
}
