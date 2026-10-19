/**
 * next/image loader for the static export: there is no image optimizer, so files are served as is.
 * next/image does not prefix string `src` with basePath — this loader does.
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith('/')) return src;
  // `w` keeps next/image happy (it warns when a loader ignores width); static hosts ignore the query.
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${src}?w=${width}`;
}
