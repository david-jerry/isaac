"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"

/**
 * Full-bleed, mouse-reactive dot field behind the hero (Performance/
 * Sustainability — WAF). A grid of points is rendered with a vertex shader that
 * modulates each dot's size + brightness by flowing fbm noise; moving the cursor
 * sends a wave rippling through the grid so the field appears to "wave" toward
 * the pointer. Dots are the live `--brand` token colour (resolved oklch→sRGB via
 * a 1×1 canvas, since THREE.Color can't parse oklch) so it stays on-brand.
 *
 * Dynamically imported with `ssr: false` so Three.js stays out of the SSR/initial
 * bundle. The loop pauses when the hero scrolls offscreen and everything is
 * disposed on unmount. Honors `prefers-reduced-motion` (one static frame).
 */
const BRAND_FALLBACK = "#e0613c"
const SPACING = 24 // px between dots

/** Resolve the `--brand` CSS token to a THREE-parseable `rgb(...)` string. */
function resolveBrandColor(): string {
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

    const sentinel = "#010203"
    ctx.fillStyle = sentinel
    ctx.fillStyle = raw
    if (ctx.fillStyle === sentinel) return BRAND_FALLBACK // couldn't parse token

    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
    return `rgb(${r}, ${g}, ${b})`
  } catch {
    return BRAND_FALLBACK
  }
}

/** Grid of points in clip space [-1, 1], one every ~SPACING px. */
function buildGrid(w: number, h: number) {
  const cols = Math.max(2, Math.floor(w / SPACING))
  const rows = Math.max(2, Math.floor(h / SPACING))
  const positions = new Float32Array(cols * rows * 3)
  let k = 0
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      positions[k++] = (i / (cols - 1)) * 2 - 1
      positions[k++] = (j / (rows - 1)) * 2 - 1
      positions[k++] = 0
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  return geometry
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uAspect;
  uniform float uSize;
  varying float vShade;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 g = position.xy;
    vec2 gp = vec2(g.x * uAspect, g.y);
    vec2 mp = vec2(uMouse.x * uAspect, uMouse.y);

    // Ambient flowing noise + a wave radiating from the cursor.
    float base = fbm(gp * 1.8 + vec2(uTime * 0.12, -uTime * 0.09));
    float d = distance(gp, mp);
    float wave = sin(d * 7.0 - uTime * 2.6) * exp(-d * 1.8);
    float field = base * 0.85 + wave * 0.7;

    vShade = clamp(field, 0.0, 1.0);
    gl_PointSize = uSize * (0.2 + vShade * 1.2);
    gl_Position = vec4(g, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  varying float vShade;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float dd = length(c);
    if (dd > 0.5) discard;
    float edge = smoothstep(0.5, 0.32, dd);
    float alpha = edge * (0.12 + vShade * 0.85);
    gl_FragColor = vec4(uColor, alpha);
  }
`

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      return // WebGL unavailable — degrade to the plain hero.
    }
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.Camera() // shader outputs clip space directly

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uAspect: { value: 1 },
      uSize: { value: 2.6 },
      uColor: { value: new THREE.Color(resolveBrandColor()) },
    }
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    })

    let geometry = buildGrid(
      container.clientWidth || 1,
      container.clientHeight || 1,
    )
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const resize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      uniforms.uAspect.value = w / h
      uniforms.uSize.value = 2.6 * renderer.getPixelRatio()
      const next = buildGrid(w, h)
      points.geometry = next
      geometry.dispose()
      geometry = next
    }
    resize()
    window.addEventListener("resize", resize)

    const pointer = new THREE.Vector2(0, 0)
    const smoothed = new THREE.Vector2(0, 0)
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      pointer.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      )
    }
    window.addEventListener("pointermove", onPointerMove)

    const clock = new THREE.Clock()
    let raf = 0
    let running = false

    const renderFrame = () => {
      uniforms.uTime.value = clock.getElapsedTime()
      smoothed.lerp(pointer, 0.06)
      uniforms.uMouse.value.copy(smoothed)
      renderer.render(scene, camera)
      if (running) raf = requestAnimationFrame(renderFrame)
    }

    const start = () => {
      if (running || reduce) return
      running = true
      raf = requestAnimationFrame(renderFrame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    )
    io.observe(container)

    // Always paint one frame (covers reduced-motion + initial state).
    renderer.render(scene, camera)

    return () => {
      stop()
      io.disconnect()
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onPointerMove)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [resolvedTheme])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    />
  )
}
