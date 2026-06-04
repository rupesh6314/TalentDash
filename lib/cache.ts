export function cacheHeaders(ttlSeconds: number, staleWhileRevalidate?: number) {
  return {
    'Cache-Control': `s-maxage=${ttlSeconds}, stale-while-revalidate=${staleWhileRevalidate || ttlSeconds * 10}`,
  };
}