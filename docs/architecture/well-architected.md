# Well-Architected Framework — Isaac Portfolio

This project follows the **AWS Well-Architected Framework (WAF)** as its guiding
principle. Every significant decision and every `CHANGELOG.md` entry is tagged
to one of the six pillars below. When proposing a change, state which pillar(s)
it serves and whether it trades off against another.

> Scope note: this is a front-end marketing/portfolio site, so some pillars
> (e.g. Cost) apply mostly through hosting/CDN and bundle size rather than
> server infrastructure.

---

## 1. Operational Excellence

Run, monitor, and improve the project predictably.

- **Changelog discipline** — every change recorded in `CHANGELOG.md` with date +
  time, rationale, affected files, pillar tag, and the git ref to revert to.
- **Conventional commits** — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`,
  `perf:`. One logical change per commit.
- **Milestone tags** — annotated git tags (`v0.x.0-<name>`) at each milestone so
  any prior state is one `git checkout` away.
- **Single source of context** — `CLAUDE.md` + `docs/STATUS.md` always reflect
  where the project is.

## 2. Security

Protect the site and its visitors.

- No secrets in the repo; use environment variables (`.env.local`, git-ignored).
- Add security headers (CSP, `X-Content-Type-Options`, `Referrer-Policy`) via
  `next.config.ts` before any external embeds/analytics ship.
- Validate and sanitize any future form input (contact form) with Zod on the
  server side; never trust client input.
- Keep dependencies patched; review `pnpm audit` before releases.

## 3. Reliability

The site renders correctly and degrades gracefully.

- TanStack Query owns async/data state with sane `staleTime` + retry
  (`src/lib/get-query-client.ts`); loading and empty states are explicit.
- Respect `prefers-reduced-motion` so animations never break the experience.
- `pnpm build` must pass before tagging a milestone — it catches RSC/client
  boundary and type errors.
- Add error boundaries / `error.tsx` + `not-found.tsx` as routes grow.

## 4. Performance Efficiency

Fast first paint, smooth interaction.

- Turbopack dev/build; React Server Components by default — `"use client"` only
  at the smallest interactive leaf.
- `next/font` self-hosts fonts; use `next/image` for all raster imagery.
- Animations are code-split to client leaves; GSAP `useGSAP` scopes + cleans up
  to avoid leaks. Lazy-load heavy/below-the-fold visuals.
- Watch bundle size; prefer `motion` for declarative UI, GSAP for timeline/scroll.

## 5. Cost Optimization

Minimize hosting and bandwidth cost.

- Favor static generation / ISR so pages serve from CDN edge, not compute.
- Optimize and right-size images; avoid shipping unused dependencies.
- Keep the dependency surface lean — every added package is a cost decision.

## 6. Sustainability

Reduce wasted compute and data transfer.

- Lean bundles and optimized assets reduce energy per visit.
- `prefers-reduced-motion` and conditional rendering avoid unnecessary work.
- Cache aggressively (static assets, query cache) to cut repeat transfer.
