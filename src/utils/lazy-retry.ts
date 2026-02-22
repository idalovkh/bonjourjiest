/**
 * Retry wrapper for dynamic imports.
 * On ChunkLoadError (Safari/iOS) retries the import before propagating the error.
 */
const isChunkError = (err: unknown): boolean => {
  const msg = err instanceof Error ? err.message : String(err);
  return (
    /loading chunk .* failed/i.test(msg) ||
    /chunkloaderror/i.test(msg) ||
    /failed to fetch dynamically imported module/i.test(msg) ||
    /importing a module script failed/i.test(msg) ||
    /error loading dynamically imported module/i.test(msg) ||
    /failed to fetch/i.test(msg) ||
    /load failed/i.test(msg) ||
    /network request failed/i.test(msg)
  );
};

export function lazyRetry<T>(
  importFn: () => Promise<{ default: T }>,
  retries = 2,
  delayMs = 1000
): Promise<{ default: T }> {
  return importFn().catch((err) => {
    if (retries > 0 && isChunkError(err)) {
      return new Promise<{ default: T }>((resolve, reject) => {
        setTimeout(() => {
          lazyRetry(importFn, retries - 1, delayMs).then(resolve, reject);
        }, delayMs);
      });
    }
    throw err;
  });
}
