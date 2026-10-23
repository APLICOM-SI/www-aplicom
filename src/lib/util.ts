import { getCollection, type CollectionEntry } from 'astro:content';

export type Program = CollectionEntry<'programi'>;

export function datum(d?: Date) {
  if (!d) return '';
  return `${d.getUTCDate()}. ${d.getUTCMonth() + 1}. ${d.getUTCFullYear()}`;
}

export function evri(v?: number | null) {
  if (v == null) return '';
  return v.toLocaleString('sl-SI', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

/** Posodobljen v zadnjih 14 dneh od izgradnje strani. */
export function jeNov(d?: Date) {
  return !!d && Date.now() - d.getTime() < 14 * 864e5;
}

export async function programi(arhiv = false) {
  const vsi = await getCollection('programi', (p) => p.data.arhiv === arhiv);
  return vsi.sort((a, b) => a.data.vrstni_red - b.data.vrstni_red || a.data.naziv.localeCompare(b.data.naziv, 'sl'));
}

export async function zadnjePosodobitve(n: number) {
  const vsi = await programi(false);
  return vsi
    .filter((p) => p.data.datum)
    .sort((a, b) => b.data.datum!.getTime() - a.data.datum!.getTime())
    .slice(0, n);
}

/** Zunanje povezave (prenosi, PDF) odpiramo v novem zavihku. */
export function zunanja(url?: string) {
  return !!url && /^https?:\/\//.test(url);
}
