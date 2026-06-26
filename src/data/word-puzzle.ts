/**
 * Letter sets for the Word Builder game. Each round's `words` is the full list
 * of accepted answers formable from `letters` (3+ letters). The game scores
 * found words by length and, when time runs out, reveals the ones missed.
 */
export interface WordRound {
  letters: string
  words: string[]
}

export const wordRounds: WordRound[] = [
  {
    letters: "PLANETS",
    words: [
      "plan", "plane", "planet", "planets", "plant", "plants", "plate",
      "plates", "petal", "petals", "pastel", "staple", "pleat", "pleats",
      "pant", "pants", "plea", "pleas", "leap", "leaps", "slate", "stale",
      "steal", "tales", "late", "neat", "lane", "lanes", "salt", "slant",
      "splat", "spent", "slept", "pane", "panes", "lean",
    ],
  },
  {
    letters: "GARDENS",
    words: [
      "garden", "gardens", "danger", "dangers", "grand", "grade", "grades",
      "range", "ranges", "anger", "angers", "sedan", "snare", "sander",
      "gander", "ganders", "dean", "deans", "dare", "dares", "dear", "dears",
      "read", "reads", "sane", "sand", "send", "gear", "gears", "near",
      "nears", "earn", "earns", "rage", "rages", "sage",
    ],
  },
  {
    letters: "MASTERY",
    words: [
      "master", "mastery", "stream", "steamy", "smart", "smear", "steam",
      "meaty", "meats", "mates", "tamer", "tamers", "teams", "rates", "stare",
      "tears", "years", "yeast", "mare", "mares", "mate", "meat", "team",
      "tear", "star", "rate", "tray", "stay", "easy", "rays",
    ],
  },
  {
    letters: "FRIENDS",
    words: [
      "friend", "friends", "finder", "finders", "fired", "fries", "fiend",
      "fiends", "diner", "diners", "rinse", "rinsed", "snide", "dines",
      "fined", "finer", "rides", "rinds", "nerds", "sired", "dries", "fends",
      "dine", "ride", "ides", "reds", "ends", "fins", "fire", "side",
    ],
  },
  {
    letters: "THUNDER",
    words: [
      "thunder", "hunter", "hunters", "turned", "under", "trend", "trends",
      "unred", "nude", "nudes", "dune", "dunes", "herd", "herds", "hunt",
      "hunts", "hurt", "hurts", "turn", "turns", "rude", "rued", "tend",
      "tends", "reds", "runs", "rust", "rent", "rents", "dust", "tuner",
      "tuners",
    ],
  },
  {
    letters: "COURAGE",
    words: [
      "courage", "rogue", "rogues", "argue", "argues", "grace", "graces",
      "cargo", "cargos", "care", "cares", "race", "races", "cage", "cages",
      "rage", "rages", "cure", "cures", "core", "cores", "sour", "soar",
      "gear", "gears", "acre", "acres", "urge", "urges", "car", "ear", "age",
    ],
  },
]
