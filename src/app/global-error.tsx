"use client"

import { useEffect } from "react"

/**
 * Last-resort boundary for errors thrown in the root layout itself. It replaces
 * the entire document, so it ships its own <html>/<body> and inline styles
 * (the app stylesheet may be unavailable here) — kept on-brand (dark + coral).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "1.5rem",
          textAlign: "center",
          background: "oklch(0.145 0 0)",
          color: "oklch(0.985 0 0)",
          fontFamily:
            '"Helvetica Neue", Helvetica, Arial, "Liberation Sans", sans-serif',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "oklch(0.7 0.16 33)",
          }}
        >
          Error 500
        </p>
        <h1 style={{ margin: 0, fontSize: "clamp(4rem, 18vw, 9rem)", fontWeight: 700, lineHeight: 1 }}>
          500<span style={{ color: "oklch(0.7 0.16 33)" }}>.</span>
        </h1>
        <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>
          Something went wrong
        </h2>
        <p style={{ margin: 0, maxWidth: "28rem", color: "oklch(0.708 0 0)" }}>
          A critical error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "0.5rem",
            cursor: "pointer",
            borderRadius: "0.5rem",
            border: "none",
            padding: "0.75rem 1.5rem",
            fontSize: "0.95rem",
            fontWeight: 500,
            background: "oklch(0.985 0 0)",
            color: "oklch(0.205 0 0)",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
