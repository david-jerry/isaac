/** Mini-games shown on the /play hub. Add an entry + a sub-route to add a game. */
export interface Game {
  slug: string
  title: string
  tagline: string
  category: string
}

export const games: Game[] = [
  {
    slug: "alien-invaders",
    title: "Alien Invaders",
    tagline: "Aim, fire, and survive five waves of incoming drones.",
    category: "Arcade Shooter",
  },
  {
    slug: "tic-tac-toe",
    title: "Tic-Tac-Toe",
    tagline: "Classic X and O against the machine. Can you avoid the draw?",
    category: "Quick Puzzle",
  },
  {
    slug: "word-puzzle",
    title: "Word Builder",
    tagline: "Spell words from the letters before the clock runs out.",
    category: "Word Game",
  },
]
