"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  Flame,
  History,
  Play,
  RotateCcw,
  Shield,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react"

import { GameButton } from "./game-ui"

// --- Game config ---
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const LEVEL_THRESHOLDS = [0, 150, 400, 750, 1200]
const BG = "#0f0f0f" // matches the site's --background base
const BRAND_FALLBACK = "#e0613c"

/** Resolve the `--brand` token to a canvas-usable `rgb()` string (oklch → sRGB). */
function resolveBrand(): string {
  try {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--brand")
      .trim()
    if (!raw) return BRAND_FALLBACK
    const canvas = document.createElement("canvas")
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext("2d")
    if (!ctx) return BRAND_FALLBACK
    ctx.fillStyle = "#010203"
    ctx.fillStyle = raw
    if (ctx.fillStyle === "#010203") return BRAND_FALLBACK
    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
    return `rgb(${r}, ${g}, ${b})`
  } catch {
    return BRAND_FALLBACK
  }
}

interface Entity {
  x: number
  y: number
  width: number
  height: number
}
interface Alien extends Entity {
  speed: number
  hp: number
  color: string
}
interface Laser extends Entity {
  vx: number
  vy: number
}
interface PowerUp extends Entity {
  type: "TRIPLE_SHOT" | "SHIELD"
  speed: number
  color: string
}
interface Particle extends Entity {
  vx: number
  vy: number
  alpha: number
  color: string
}

export default function AlienInvaders() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [gameState, setGameState] = useState<
    "START" | "PLAYING" | "GAMEOVER" | "VICTORY"
  >("START")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [leaderboard, setLeaderboard] = useState<number[]>([])
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [activePerk, setActivePerk] = useState<
    "TRIPLE_SHOT" | "SHIELD" | null
  >(null)

  const stateRef = useRef({
    player: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 80, width: 40, height: 40 },
    mouse: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 80 },
    aliens: [] as Alien[],
    lasers: [] as Laser[],
    powerUps: [] as PowerUp[],
    particles: [] as Particle[],
    stars: [] as { x: number; y: number; size: number; speed: number }[],
    activePowerUp: null as {
      type: "TRIPLE_SHOT" | "SHIELD"
      expiresAt: number
    } | null,
    lastSpawnTime: 0,
    lastShootTime: 0,
    score: 0,
    level: 1,
    lives: 3,
    brand: BRAND_FALLBACK,
    keys: { up: false, down: false, left: false, right: false },
  })

  useEffect(() => {
    stateRef.current.score = score
    stateRef.current.level = level
    stateRef.current.lives = lives
  }, [score, level, lives])

  useEffect(() => {
    stateRef.current.brand = resolveBrand()

    // Hydrate persisted values after mount (client-only) to avoid SSR mismatch.
    const savedHighScore = localStorage.getItem("alien_invaders_highscore")
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedHighScore) setHighScore(parseInt(savedHighScore, 10))
    const savedLeaderboard = localStorage.getItem("alien_invaders_leaderboard")
    if (savedLeaderboard) setLeaderboard(JSON.parse(savedLeaderboard))

    const stars = []
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * CANVAS_HEIGHT,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2,
      })
    }
    stateRef.current.stars = stars
  }, [])

  // Arrow keys / WASD move the ship alongside the mouse (only while playing, so
  // the arrows don't hijack page scrolling otherwise).
  useEffect(() => {
    if (gameState !== "PLAYING") return
    const keys = stateRef.current.keys // stable container — safe to use in cleanup
    const keyMap: Record<string, "up" | "down" | "left" | "right"> = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      w: "up",
      s: "down",
      a: "left",
      d: "right",
    }
    const setKey = (e: KeyboardEvent, pressed: boolean) => {
      const dir = keyMap[e.key]
      if (!dir) return
      keys[dir] = pressed
      e.preventDefault()
    }
    const onDown = (e: KeyboardEvent) => setKey(e, true)
    const onUp = (e: KeyboardEvent) => setKey(e, false)
    window.addEventListener("keydown", onDown)
    window.addEventListener("keyup", onUp)
    return () => {
      window.removeEventListener("keydown", onDown)
      window.removeEventListener("keyup", onUp)
      keys.up = keys.down = keys.left = keys.right = false
    }
  }, [gameState])

  const handleLeaderboardSave = (finalScore: number) => {
    const saved = localStorage.getItem("alien_invaders_leaderboard")
    let currentScores: number[] = saved ? JSON.parse(saved) : []
    currentScores.push(finalScore)
    currentScores.sort((a, b) => b - a)
    currentScores = currentScores.slice(0, 5)
    localStorage.setItem(
      "alien_invaders_leaderboard",
      JSON.stringify(currentScores),
    )
    setLeaderboard(currentScores)
    if (finalScore > highScore) {
      setHighScore(finalScore)
      localStorage.setItem("alien_invaders_highscore", finalScore.toString())
    }
  }

  const startGame = () => {
    stateRef.current.aliens = []
    stateRef.current.lasers = []
    stateRef.current.powerUps = []
    stateRef.current.particles = []
    stateRef.current.activePowerUp = null
    stateRef.current.player = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 80,
      width: 40,
      height: 40,
    }
    setScore(0)
    setLevel(1)
    setLives(3)
    setActivePerk(null)
    setGameState("PLAYING")
  }

  const handlePointerMove = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current
    if (!canvas || gameState !== "PLAYING") return
    const rect = canvas.getBoundingClientRect()
    let clientX = 0
    let clientY = 0
    if ("touches" in e) {
      if (e.touches.length === 0) return
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }
    const scaleX = CANVAS_WIDTH / rect.width
    const scaleY = CANVAS_HEIGHT / rect.height
    stateRef.current.mouse.x = Math.max(
      20,
      Math.min(CANVAS_WIDTH - 20, (clientX - rect.left) * scaleX),
    )
    stateRef.current.mouse.y = Math.max(
      40,
      Math.min(CANVAS_HEIGHT - 40, (clientY - rect.top) * scaleY),
    )
  }

  const createExplosion = (x: number, y: number, color: string, count = 12) => {
    for (let i = 0; i < count; i++) {
      stateRef.current.particles.push({
        x,
        y,
        width: 3,
        height: 3,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        alpha: 1,
        color,
      })
    }
  }

  const getLevelConfig = (currentLevel: number) => {
    switch (currentLevel) {
      case 1:
        return { speed: 1.8, spawnRate: 1200, hp: 1 }
      case 2:
        return { speed: 2.4, spawnRate: 1000, hp: 1 }
      case 3:
        return { speed: 3.0, spawnRate: 800, hp: 2 }
      case 4:
        return { speed: 3.8, spawnRate: 650, hp: 2 }
      case 5:
        return { speed: 4.8, spawnRate: 450, hp: 3 }
      default:
        return { speed: 5.0, spawnRate: 400, hp: 3 }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const updateLoop = (timestamp: number) => {
      if (gameState !== "PLAYING") return

      const brand = stateRef.current.brand
      const currentConfig = getLevelConfig(stateRef.current.level)
      const alienPalette = ["#7d7d7d", "#a8a8a8", brand, brand, "#f5f5f5"]
      const activePowerUp = stateRef.current.activePowerUp

      if (activePowerUp && timestamp > activePowerUp.expiresAt) {
        stateRef.current.activePowerUp = null
        setActivePerk(null)
      }

      ctx.fillStyle = BG
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      ctx.fillStyle = "#ffffff"
      stateRef.current.stars.forEach((star) => {
        star.y += star.speed
        if (star.y > CANVAS_HEIGHT) star.y = 0
        ctx.globalAlpha = Math.random() * 0.35 + 0.3
        ctx.fillRect(star.x, star.y, star.size, star.size)
      })
      ctx.globalAlpha = 1.0

      const p = stateRef.current.player
      const m = stateRef.current.mouse
      // Keyboard nudges the same target the mouse drives, then clamp to bounds.
      const keys = stateRef.current.keys
      const KEY_SPEED = 7
      if (keys.left) m.x -= KEY_SPEED
      if (keys.right) m.x += KEY_SPEED
      if (keys.up) m.y -= KEY_SPEED
      if (keys.down) m.y += KEY_SPEED
      m.x = Math.max(20, Math.min(CANVAS_WIDTH - 20, m.x))
      m.y = Math.max(40, Math.min(CANVAS_HEIGHT - 40, m.y))
      p.x += (m.x - p.x) * 0.2
      p.y += (m.y - p.y) * 0.2

      if (activePowerUp && activePowerUp.type === "SHIELD") {
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2.5
        ctx.shadowBlur = 14
        ctx.shadowColor = "#ffffff"
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.width * 1.1, 0, Math.PI * 2)
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      ctx.fillStyle = "#fafafa"
      ctx.beginPath()
      ctx.moveTo(p.x, p.y - p.height / 2)
      ctx.lineTo(p.x - p.width / 2, p.y + p.height / 2)
      ctx.lineTo(p.x + p.width / 2, p.y + p.height / 2)
      ctx.closePath()
      ctx.fill()

      const isTriple = activePowerUp && activePowerUp.type === "TRIPLE_SHOT"
      const fireInterval = isTriple ? 180 : 250
      if (timestamp - stateRef.current.lastShootTime > fireInterval) {
        if (isTriple) {
          stateRef.current.lasers.push(
            { x: p.x - 2, y: p.y - p.height / 2, width: 4, height: 14, vx: 0, vy: -9 },
            { x: p.x - 10, y: p.y - p.height / 4, width: 4, height: 14, vx: -2.5, vy: -8.5 },
            { x: p.x + 6, y: p.y - p.height / 4, width: 4, height: 14, vx: 2.5, vy: -8.5 },
          )
        } else {
          stateRef.current.lasers.push({
            x: p.x - 2,
            y: p.y - p.height / 2,
            width: 4,
            height: 14,
            vx: 0,
            vy: -8,
          })
        }
        stateRef.current.lastShootTime = timestamp
      }

      ctx.fillStyle = isTriple ? "#ffffff" : brand
      stateRef.current.lasers = stateRef.current.lasers.filter((laser) => {
        laser.x += laser.vx
        laser.y += laser.vy
        ctx.fillRect(laser.x, laser.y, laser.width, laser.height)
        return laser.y > 0 && laser.x > 0 && laser.x < CANVAS_WIDTH
      })

      if (timestamp - stateRef.current.lastSpawnTime > currentConfig.spawnRate) {
        stateRef.current.aliens.push({
          x: Math.random() * (CANVAS_WIDTH - 40) + 20,
          y: -30,
          width: 32,
          height: 32,
          speed: currentConfig.speed + Math.random() * 0.5,
          hp: currentConfig.hp,
          color: alienPalette[Math.min(stateRef.current.level, 5) - 1],
        })
        stateRef.current.lastSpawnTime = timestamp
      }

      stateRef.current.powerUps = stateRef.current.powerUps.filter((item) => {
        item.y += item.speed
        ctx.save()
        ctx.fillStyle = item.color
        ctx.shadowBlur = 10
        ctx.shadowColor = item.color
        ctx.translate(item.x, item.y)
        ctx.rotate((timestamp / 400) % (Math.PI * 2))
        ctx.fillRect(-item.width / 2, -item.height / 2, item.width, item.height)
        ctx.restore()

        const hitLoot =
          Math.hypot(item.x - p.x, item.y - p.y) < item.width / 2 + p.width / 2
        if (hitLoot) {
          stateRef.current.activePowerUp = {
            type: item.type,
            expiresAt: timestamp + 7000,
          }
          setActivePerk(item.type)
          createExplosion(item.x, item.y, "#ffffff", 20)
          return false
        }
        return item.y < CANVAS_HEIGHT + 20
      })

      stateRef.current.aliens = stateRef.current.aliens.filter((alien) => {
        alien.y += alien.speed
        ctx.fillStyle = alien.color
        ctx.beginPath()
        ctx.arc(alien.x, alien.y, alien.width / 2, 0, Math.PI * 2)
        ctx.fill()

        const distToPlayer = Math.hypot(alien.x - p.x, alien.y - p.y)
        if (distToPlayer < alien.width / 2 + p.width / 2) {
          createExplosion(alien.x, alien.y, alien.color)
          if (
            stateRef.current.activePowerUp &&
            stateRef.current.activePowerUp.type === "SHIELD"
          ) {
            stateRef.current.activePowerUp = null
            setActivePerk(null)
            return false
          }
          const updatedLives = stateRef.current.lives - 1
          setLives(updatedLives)
          if (updatedLives <= 0) {
            setGameState("GAMEOVER")
            handleLeaderboardSave(stateRef.current.score)
          }
          return false
        }

        if (alien.y > CANVAS_HEIGHT + 20) {
          if (
            stateRef.current.activePowerUp &&
            stateRef.current.activePowerUp.type === "SHIELD"
          ) {
            return false
          }
          const updatedLives = stateRef.current.lives - 1
          setLives(updatedLives)
          if (updatedLives <= 0) {
            setGameState("GAMEOVER")
            handleLeaderboardSave(stateRef.current.score)
          }
          return false
        }
        return true
      })

      stateRef.current.lasers.forEach((laser, lIdx) => {
        stateRef.current.aliens.forEach((alien, aIdx) => {
          const matchedHit =
            laser.x > alien.x - alien.width / 2 &&
            laser.x < alien.x + alien.width / 2 &&
            laser.y > alien.y - alien.height / 2 &&
            laser.y < alien.y + alien.height / 2
          if (matchedHit) {
            alien.hp -= 1
            stateRef.current.lasers.splice(lIdx, 1)
            if (alien.hp <= 0) {
              createExplosion(alien.x, alien.y, alien.color)
              stateRef.current.aliens.splice(aIdx, 1)
              if (Math.random() < 0.15) {
                const types: ("TRIPLE_SHOT" | "SHIELD")[] = [
                  "TRIPLE_SHOT",
                  "SHIELD",
                ]
                const dropType =
                  types[Math.floor(Math.random() * types.length)]
                stateRef.current.powerUps.push({
                  x: alien.x,
                  y: alien.y,
                  width: 18,
                  height: 18,
                  type: dropType,
                  speed: 1.5,
                  color: dropType === "TRIPLE_SHOT" ? brand : "#e5e5e5",
                })
              }
              const newScore = stateRef.current.score + 15
              setScore(newScore)
              let currentCalcLevel = 1
              for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
                if (newScore >= LEVEL_THRESHOLDS[i]) {
                  currentCalcLevel = i + 1
                  break
                }
              }
              if (currentCalcLevel > 5) {
                setGameState("VICTORY")
                handleLeaderboardSave(newScore)
              } else if (currentCalcLevel !== stateRef.current.level) {
                setLevel(currentCalcLevel)
                stateRef.current.level = currentCalcLevel
              }
            }
          }
        })
      })

      stateRef.current.particles = stateRef.current.particles.filter((pt) => {
        pt.x += pt.vx
        pt.y += pt.vy
        pt.alpha -= 0.02
        ctx.save()
        ctx.globalAlpha = Math.max(0, pt.alpha)
        ctx.fillStyle = pt.color
        ctx.fillRect(pt.x, pt.y, pt.width, pt.height)
        ctx.restore()
        return pt.alpha > 0
      })

      animationId = requestAnimationFrame(updateLoop)
    }

    if (gameState === "PLAYING") {
      animationId = requestAnimationFrame(updateLoop)
    }
    return () => cancelAnimationFrame(animationId)
    // Loop intentionally re-binds only on gameState; everything else is read
    // through stateRef, so it stays current without re-creating the loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState])

  return (
    <div className="mx-auto flex w-full max-w-6xl select-none flex-col items-stretch justify-center gap-6 rounded-2xl border border-border bg-card p-6 shadow-2xl lg:flex-row">
      {/* Game panel */}
      <div className="flex flex-1 flex-col items-center justify-center">
        {/* HUD */}
        <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-4 px-1">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Trophy className="size-5 text-brand" />
              <div>
                <span className="block text-[10px] font-bold uppercase leading-none tracking-wider text-muted-foreground">
                  Record
                </span>
                <span className="font-mono text-base font-bold text-brand">
                  {highScore}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="size-5 text-muted-foreground" />
              <div>
                <span className="block text-[10px] font-bold uppercase leading-none tracking-wider text-muted-foreground">
                  Score
                </span>
                <span className="font-mono text-lg font-bold text-foreground">
                  {score}
                </span>
              </div>
            </div>
            {activePerk ? (
              <div className="flex animate-pulse items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-semibold">
                {activePerk === "TRIPLE_SHOT" ? (
                  <>
                    <Flame className="size-3.5 text-brand" />
                    <span className="text-brand">Triple cannon</span>
                  </>
                ) : (
                  <>
                    <Shield className="size-3.5 text-foreground" />
                    <span className="text-foreground">Shield up</span>
                  </>
                )}
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Level
              </span>
              <span className="rounded bg-brand/10 px-1.5 font-mono text-base font-bold text-brand">
                {level}/5
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-border bg-muted px-3 py-1.5">
              <Shield className="mr-1 size-4 text-brand" />
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`h-5 w-3 rounded-sm transition-all duration-300 ${
                    i < lives ? "bg-brand" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative w-full touch-none overflow-hidden rounded-xl border border-border bg-background shadow-inner">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onMouseMove={handlePointerMove}
            onTouchMove={handlePointerMove}
            onTouchStart={handlePointerMove}
            role="img"
            aria-label="Alien Invaders game. Move the mouse, drag, or use the arrow keys to steer your ship; it fires automatically. Clear five waves of incoming drones."
            className="block aspect-[4/3] max-h-[65vh] w-full cursor-none"
          />

          {gameState === "START" ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 p-6 text-center backdrop-blur-sm">
              <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-brand/20 bg-brand/10 text-brand">
                <Sparkles className="size-7" />
              </div>
              <h1 className="bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Alien Invaders
              </h1>
              <p className="mt-2 max-w-sm text-xs text-muted-foreground">
                Move to aim, your cannon fires automatically. Shoot the drones
                before they reach you and clear five waves.
              </p>
              <GameButton onClick={startGame} size="lg" className="mt-6">
                <Play className="size-4 fill-current" /> Start game
              </GameButton>
            </div>
          ) : null}

          {gameState === "GAMEOVER" ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 p-6 text-center backdrop-blur-md">
              <span className="mb-2 rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Ship destroyed
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Game over
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Final score:{" "}
                <span className="font-mono font-bold text-foreground">
                  {score}
                </span>
              </p>
              <GameButton
                onClick={startGame}
                variant="outline"
                size="lg"
                className="mt-6"
              >
                <RotateCcw className="size-4" /> Play again
              </GameButton>
            </div>
          ) : null}

          {gameState === "VICTORY" ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 p-6 text-center backdrop-blur-md">
              <span className="mb-2 rounded-full border border-brand/20 bg-brand/10 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-brand">
                All waves cleared
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                You won!
              </h2>
              <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                Every wave intercepted. Nicely flown.
              </p>
              <GameButton onClick={startGame} size="lg" className="mt-6">
                <RotateCcw className="size-4" /> Play again
              </GameButton>
            </div>
          ) : null}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="flex w-full flex-col justify-between rounded-xl border border-border bg-muted/30 p-4 lg:w-64">
        <div>
          <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
            <History className="size-4 text-muted-foreground" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Best Scores
            </h3>
          </div>

          {leaderboard.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-border p-4 text-center">
              <span className="text-[11px] text-muted-foreground">
                No runs yet. Finish a game to set a score.
              </span>
            </div>
          ) : (
            <div className="space-y-1.5">
              {leaderboard.map((rankScore, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-lg border p-2 font-mono text-xs ${
                    index === 0
                      ? "border-brand/20 bg-brand/5 font-semibold text-brand"
                      : "border-border bg-muted/40 text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                        index === 0 ? "bg-brand/10" : "bg-muted"
                      }`}
                    >
                      #{index + 1}
                    </span>
                    <span>Run</span>
                  </div>
                  <span className="font-bold">{rankScore}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 space-y-2 border-t border-border pt-4">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Power-ups
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 text-brand">
              <div className="size-2.5 rounded-sm bg-brand" />
              <span>Triple shot</span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <div className="size-2.5 rounded-sm bg-foreground" />
              <span>Shield</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
