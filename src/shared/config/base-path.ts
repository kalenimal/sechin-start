/** Sub-path the site is served from ("" at a domain root, "/sechin-platform" on GitHub Pages). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Prefixes root-relative URLs that Next does not handle itself: plain <a>/<img>, window.location, manifest. */
export const withBasePath = (path: string) => (path.startsWith('/') ? `${basePath}${path}` : path);
