/** Stable 8-digit public identifier derived from the internal id (mock — the backend will provide it). */
export function projectPublicId(id: string) {
  if (id === 'cardiosense') return '51671512';
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return String(10_000_000 + (hash % 90_000_000));
}
