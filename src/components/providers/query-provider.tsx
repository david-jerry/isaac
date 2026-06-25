"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { getQueryClient } from "@/lib/get-query-client"

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // NB: not useState — getQueryClient() already guarantees a stable client in
  // the browser and a fresh one on the server.
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      )}
    </QueryClientProvider>
  )
}
