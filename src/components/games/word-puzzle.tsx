"use client"

import { useEffect, useRef, useState } from "react"
import { Play, RotateCcw, Shuffle, Timer, Trophy } from "lucide-react"

import { wordRounds, type WordRound } from "@/data/word-puzzle"
import { GameButton, cx } from "./game-ui"

const DURATION = 90 // seconds

function scoreFor(len: number) {
  if (len <= 3) return 10
  if (len === 4) return 20
  if (len === 5) return 40
  if (len === 6) return 70
  return 110
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/** Can `word` be spelled from the multiset of `letters`? */
function formable(word: string, letters: string) {
  const pool: Record<string, number> = {}
  for (const ch of letters.toLowerCase()) pool[ch] = (pool[ch] ?? 0) + 1
  for (const ch of word) {
    if (!pool[ch]) return false
    pool[ch] -= 1
  }
  return true
}

function ratingFor(pct: number) {
  if (pct >= 1) return "Perfect — every word found"
  if (pct >= 0.75) return "Lexicon Pro"
  if (pct >= 0.5) return "Wordsmith"
  if (pct >= 0.25) return "Getting there"
  return "Warm-up"
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, "0")}`
}

export default function WordPuzzle() {
  const [status, setStatus] = useState<"idle" | "playing" | "over">("idle")
  const [round, setRound] = useState<WordRound | null>(null)
  const [tiles, setTiles] = useState<string[]>([])
  const [found, setFound] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(DURATION)
  const [input, setInput] = useState("")
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(
    null,
  )
  const [best, setBest] = useState(0)
  const recorded = useRef(false)

  useEffect(() => {
    const saved = Number(localStorage.getItem("word_puzzle_best"))
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (Number.isFinite(saved) && saved > 0) setBest(saved)
  }, [])

  // Countdown.
  useEffect(() => {
    if (status !== "playing") return
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id)
          setStatus("over")
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [status])

  // Save best once per finished game.
  useEffect(() => {
    if (status !== "over" || recorded.current) return
    recorded.current = true
    setBest((prev) => {
      if (score <= prev) return prev
      localStorage.setItem("word_puzzle_best", score.toString())
      return score
    })
  }, [status, score])

  const start = () => {
    const next = wordRounds[Math.floor(Math.random() * wordRounds.length)]
    recorded.current = false
    setRound(next)
    setTiles(shuffle(next.letters.split("")))
    setFound([])
    setScore(0)
    setTimeLeft(DURATION)
    setInput("")
    setFeedback(null)
    setStatus("playing")
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!round || status !== "playing") return
    const word = input.trim().toLowerCase()
    setInput("")
    if (!word) return
    if (word.length < 3) return setFeedback({ ok: false, msg: "3+ letters" })
    if (!formable(word, round.letters))
      return setFeedback({ ok: false, msg: "Use only the given letters" })
    if (found.includes(word))
      return setFeedback({ ok: false, msg: "Already found" })
    if (!round.words.includes(word))
      return setFeedback({ ok: false, msg: "Not in the word list" })

    const pts = scoreFor(word.length)
    setFound((f) => [word, ...f])
    setScore((s) => s + pts)
    setFeedback({ ok: true, msg: `+${pts} · ${word}` })
  }

  const missed = round ? round.words.filter((w) => !found.includes(w)) : []
  const pct = round ? found.length / round.words.length : 0

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-2xl">
      {/* HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Trophy className="size-5 text-brand" />
            <div>
              <span className="block text-[10px] font-bold uppercase leading-none tracking-wider text-muted-foreground">
                Best
              </span>
              <span className="font-mono text-base font-bold text-brand">
                {best}
              </span>
            </div>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase leading-none tracking-wider text-muted-foreground">
              Score
            </span>
            <span className="font-mono text-lg font-bold text-foreground">
              {score}
            </span>
          </div>
        </div>
        <div
          className={cx(
            "flex items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-1.5 font-mono text-base font-bold",
            status === "playing" && timeLeft <= 10
              ? "text-brand"
              : "text-foreground",
          )}
        >
          <Timer className="size-4 text-muted-foreground" aria-hidden />
          <span aria-label={`${timeLeft} seconds left`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {status === "idle" ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border py-12 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Word Builder</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Spell as many words as you can from the letters before the clock runs
            out. Longer words score more. Time-up reveals what you missed.
          </p>
          <GameButton onClick={start} size="lg">
            <Play className="size-4 fill-current" /> Start
          </GameButton>
        </div>
      ) : null}

      {status === "playing" && round ? (
        <>
          {/* Letter tiles */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {tiles.map((letter, i) => (
              <span
                key={`${letter}-${i}`}
                className="grid size-12 place-items-center rounded-lg border border-border bg-muted text-xl font-bold uppercase"
              >
                {letter}
              </span>
            ))}
            <GameButton
              onClick={() => setTiles((t) => shuffle(t))}
              variant="ghost"
              size="icon"
              aria-label="Shuffle letters"
              className="ml-1"
            >
              <Shuffle className="size-4" />
            </GameButton>
          </div>

          {/* Entry */}
          <form onSubmit={submit} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Type a word"
              placeholder="Type a word and press Enter"
              className="h-11 flex-1 rounded-lg border border-border bg-background px-4 text-base lowercase outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/40"
            />
            <GameButton type="submit" size="lg">
              Enter
            </GameButton>
          </form>

          {/* Feedback (announced to screen readers) */}
          <p
            role="status"
            aria-live="polite"
            className={cx(
              "min-h-5 text-center text-sm",
              feedback?.ok ? "text-brand" : "text-muted-foreground",
            )}
          >
            {feedback?.msg ?? " "}
          </p>

          {/* Found words */}
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              Found · {found.length}/{round.words.length}
            </p>
            <div className="flex min-h-9 flex-wrap gap-1.5">
              {found.map((w) => (
                <span
                  key={w}
                  className="rounded-full border border-brand/25 bg-brand/5 px-2.5 py-0.5 text-xs text-foreground"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : null}

      {status === "over" && round ? (
        <div className="flex flex-col gap-5">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              {ratingFor(pct)}
            </span>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Time! You scored{" "}
              <span className="font-mono text-brand">{score}</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              You found {found.length} of {round.words.length} words.
            </p>
          </div>

          {missed.length ? (
            <div>
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                Words you missed ({missed.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {missed.map((w) => (
                  <span
                    key={w}
                    className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-sm text-brand">
              You found every word. Flawless.
            </p>
          )}

          <div className="flex justify-center">
            <GameButton onClick={start} size="lg">
              <RotateCcw className="size-4" /> Play again
            </GameButton>
          </div>
        </div>
      ) : null}
    </div>
  )
}
