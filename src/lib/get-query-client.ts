import { isServer, QueryClient } from "@tanstack/react-query"

/**
 * Factory for a fresh QueryClient.
 *
 * Reliability (WAF): a non-zero `staleTime` avoids immediate refetch-on-mount
 * waterfalls and gives queries a sane default retry/cache posture. Tune per
 * query where data freshness requirements differ.
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 min — portfolio content rarely changes
        retry: 1,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

/**
 * SSR-safe accessor (official App Router pattern):
 * - Server: always a new client so requests don't share state across users.
 * - Browser: a single cached client so React doesn't recreate it on Suspense.
 */
export function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }
  return browserQueryClient
}
