# Project Status — Isaac Portfolio

> Living snapshot of where the project is. Update this whenever the phase changes,
> alongside a `CHANGELOG.md` entry. For full history see `CHANGELOG.md` and `git log`.

**Last updated:** 2026-06-23
**Current phase:** Landing page built from the design — translating remaining detail
**Latest milestone tag:** `v0.3.0-foundation`

## Done

- ✅ Next.js 16 scaffold (TS, Tailwind v4, App Router, Turbopack, pnpm) — `v0.1.0-scaffold`
- ✅ shadcn/ui (radix-nova / neutral) + base components — `v0.2.0-shadcn`
- ✅ TanStack Query (SSR-safe) + `next-themes` providers
- ✅ GSAP (`useGSAP` + ScrollTrigger) and Motion wired and proven on the page
- ✅ Portfolio skeleton: Hero/About/Projects/Contact sections
- ✅ Responsive header from design: animated desktop nav + GSAP/Motion fullscreen
  mobile overlay (links + socials), reusable `Logo`, coral `--brand` token; footer
  rebuilt to match the design
- ✅ Multi-page routing (`/projects`, `/about`, `/contact`) with route-based active
  nav (`useActiveNav`); shell (`Navbar`/`Footer`) in the root layout
- ✅ Loading skeletons (`loading.tsx`) for every route + on-brand 404/500 pages
  (`not-found.tsx`, `error.tsx`, `global-error.tsx`)
- ✅ Typed placeholder content (`src/data`, `src/types`)
- ✅ Full landing page from the design: Hero, IntroMetrics, FeaturedProjects,
  Process (+ "Cut the noise" line), AreasOfWork, Services accordion — composed in
  `src/app/page.tsx` with `NN / 06` section markers
- ✅ Floating `ScrollProgress` control (root layout): docks bottom-right on scroll,
  ring fills toward page end, click → smooth scroll to top (reduced-motion aware)
- ✅ `Accordion` + `Placeholder` primitives; process line-art uses Lucide stand-ins
- ✅ Context + change-tracking system (`CLAUDE.md`, `docs/`, `CHANGELOG.md`)

## Next

- ⏳ Swap in the licensed **Helvetica Now Display** font (system-Helvetica stand-in
  for now; `next/font/local` stub ready in `src/app/layout.tsx`).
- ⏳ Connect the Figma file; translate tokens (color/type/spacing) into `globals.css`.
- ⏳ Replace placeholder copy and case studies with real content.
- ⏳ Add a dark/light mode toggle in the navbar (provider already in place).
- ⏳ Contact form + backend + Zod validation (Security pillar).
- ⏳ Security headers in `next.config.ts`; analytics (consent-gated).
- ⏳ Deployment config + Lighthouse/perf budget.

## Quick orientation for Claude Code

- Read `CLAUDE.md` first (conventions, WAF principle, revert playbook).
- Animation entrypoint: `src/lib/gsap.ts`; data hook example: `src/hooks/use-projects.ts`.
- To roll back, use the tags above with the Revert Playbook in `CLAUDE.md`.
