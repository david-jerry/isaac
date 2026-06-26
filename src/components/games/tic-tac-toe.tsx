"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { RotateCcw } from "lucide-react"

import { GameButton, cx } from "./game-ui"

type Cell = "X" | "O" | null

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function getWinner(board: Cell[]): { player: "X" | "O"; line: number[] } | null {
  for (const line of LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a] as "X" | "O", line }
    }
  }
  return null
}

/** Strong-but-beatable opponent: win > block > centre > corner > side. */
function aiMove(board: Cell[]): number {
  const empties = board.reduce<number[]>((acc, cell, i) => {
    if (!cell) acc.push(i)
    return acc
  }, [])
  for (const i of empties) {
    const test = [...board]
    test[i] = "O"
    if (getWinner(test)?.player === "O") return i
  }
  for (const i of empties) {
    const test = [...board]
    test[i] = "X"
    if (getWinner(test)?.player === "X") return i
  }
  if (board[4] === null) return 4
  const corners = [0, 2, 6, 8].filter((i) => board[i] === null)
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)]
  const sides = [1, 3, 5, 7].filter((i) => board[i] === null)
  if (sides.length) return sides[Math.floor(Math.random() * sides.length)]
  return -1
}

export default function TicTacToe() {
  const reduce = useReducedMotion()
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const [turn, setTurn] = useState<"X" | "O">("X")
  const [scores, setScores] = useState({ win: 0, loss: 0, draw: 0 })
  const recorded = useRef(false)

  const result = getWinner(board)
  const isDraw = !result && board.every(Boolean)
  const over = !!result || isDraw

  useEffect(() => {
    // Hydrate persisted scores after mount (client-only) to avoid an SSR mismatch.
    const saved = localStorage.getItem("tic_tac_toe_scores")
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setScores(JSON.parse(saved))
  }, [])

  // Record the outcome once per finished game.
  useEffect(() => {
    if (!over || recorded.current) return
    recorded.current = true
    setScores((prev) => {
      const next = {
        win: prev.win + (result?.player === "X" ? 1 : 0),
        loss: prev.loss + (result?.player === "O" ? 1 : 0),
        draw: prev.draw + (isDraw ? 1 : 0),
      }
      localStorage.setItem("tic_tac_toe_scores", JSON.stringify(next))
      return next
    })
  }, [over, result, isDraw])

  // Computer's turn.
  useEffect(() => {
    if (turn !== "O" || over) return
    const timer = setTimeout(() => {
      const move = aiMove(board)
      if (move < 0) return
      setBoard((b) => {
        const next = [...b]
        next[move] = "O"
        return next
      })
      setTurn("X")
    }, 480)
    return () => clearTimeout(timer)
  }, [turn, over, board])

  const play = (i: number) => {
    if (board[i] || over || turn !== "X") return
    setBoard((b) => {
      const next = [...b]
      next[i] = "X"
      return next
    })
    setTurn("O")
  }

  const reset = () => {
    recorded.current = false
    setBoard(Array(9).fill(null))
    setTurn("X")
  }

  const status = result
    ? result.player === "X"
      ? "You win!"
      : "Computer wins"
    : isDraw
      ? "It's a draw"
      : turn === "X"
        ? "Your move"
        : "Computer thinking…"

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            You are <span className="text-brand">X</span>
          </p>
          <p className="mt-1 text-lg font-medium">{status}</p>
        </div>
        <GameButton onClick={reset} variant="outline" size="sm">
          <RotateCcw className="size-3.5" /> Reset
        </GameButton>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => {
          const inWin = result?.line.includes(i)
          const interactive = !cell && !over && turn === "X"
          return (
            <button
              key={i}
              type="button"
              onClick={() => play(i)}
              disabled={!interactive}
              aria-label={`Cell ${i + 1}${cell ? `, ${cell}` : ", empty"}`}
              className={cx(
                "grid aspect-square place-items-center rounded-lg border border-border text-5xl font-bold transition-colors sm:text-6xl",
                interactive && "hover:bg-muted",
                inWin && "border-brand/40 bg-brand/10",
              )}
            >
              {cell ? (
                <motion.span
                  initial={{ scale: reduce ? 1 : 0.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2, ease: "backOut" }}
                  className={cell === "X" ? "text-brand" : "text-foreground"}
                >
                  {cell}
                </motion.span>
              ) : null}
            </button>
          )
        })}
      </div>

      <dl className="grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
        {[
          { label: "Wins", value: scores.win, accent: true },
          { label: "Losses", value: scores.loss, accent: false },
          { label: "Draws", value: scores.draw, accent: false },
        ].map((stat) => (
          <div key={stat.label}>
            <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </dt>
            <dd
              className={cx(
                "font-mono text-xl font-bold",
                stat.accent ? "text-brand" : "text-foreground",
              )}
            >
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
