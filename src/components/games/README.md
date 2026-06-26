# Games — drop-in mini-games

Each game is a single self-contained client component. They depend only on:

- **React** (`"use client"` — they use hooks + canvas/DOM).
- **lucide-react** (icons).
- **Tailwind CSS** with a small set of design tokens (below).
- **`game-ui.tsx`** (in this folder) — a tiny `cx()` + `GameButton`. No other
  project imports.

No shadcn, no `@/lib/utils`, no app state. To use a game on another platform,
copy three things:

1. the game file (e.g. `word-puzzle.tsx`)
2. its data file (e.g. `src/data/word-puzzle.ts`) where applicable
3. `game-ui.tsx`

…then render the default export anywhere.

## Theming — works with **your** brand

All colours come from CSS custom properties, so the games adopt the host's brand
automatically. The **only** variable you must set is `--brand` (the accent used
for buttons, highlights, and — in Alien Invaders — the bullets/particles, which
are resolved from `--brand` at runtime via a 1×1 canvas).

Define these on `:root` (and `.dark`) — shadcn-compatible names, any colour space:

```css
:root {
  --background: #ffffff;        /* page surface            */
  --foreground: #0a0a0a;        /* primary text            */
  --card: #ffffff;             /* panel surface           */
  --muted: #f4f4f5;            /* subtle fills/tiles       */
  --muted-foreground: #71717a; /* secondary text          */
  --border: #e4e4e7;           /* hairlines/outlines       */
  --brand: oklch(0.68 0.16 33); /* YOUR accent colour      */
  --brand-foreground: #ffffff; /* text on brand buttons    */
}
```

Tailwind must map them (Tailwind v4 `@theme`):

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-brand: var(--brand);
  --color-brand-foreground: var(--brand-foreground);
}
```

Change `--brand` and every game retints — buttons, tiles, scores, the shooter's
projectiles — without touching the components.

## Games

| File | Default export | Data |
| --- | --- | --- |
| `alien-invaders.tsx` | `AlienInvaders` | — (self-contained) |
| `tic-tac-toe.tsx` | `TicTacToe` | — |
| `word-puzzle.tsx` | `WordPuzzle` | `src/data/word-puzzle.ts` (letter sets) |

All persist high scores to `localStorage` (namespaced keys) and respect
`prefers-reduced-motion`.
