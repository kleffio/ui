"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "../utils"

const PARTICLES = [
  { x: 13, y: -4, delay: -40, scale: 1 },
  { x: 24, y: 3, delay: -220, scale: 0.75 },
  { x: 9, y: 4, delay: -400, scale: 0.9 },
  { x: 18, y: -3, delay: -580, scale: 0.65 },
  { x: 29, y: -5, delay: -760, scale: 0.8 },
  { x: 34, y: 5, delay: -940, scale: 0.7 },
  { x: 16, y: 6, delay: -1120, scale: 0.58 },
  { x: 38, y: -2, delay: -1300, scale: 0.72 },
  { x: 27, y: 1, delay: -1480, scale: 0.52 },
]

const PARTICLE_DECAY_MS = 1400

function particleStyle({ x, y, delay, scale }: (typeof PARTICLES)[number]) {
  return {
    "--progress-particle-x": `${x}px`,
    "--progress-particle-y": `${y}px`,
    "--progress-particle-delay": `${delay}ms`,
    "--progress-particle-scale": scale,
  } as React.CSSProperties
}

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const progressValue = typeof value === "number" ? Math.max(0, Math.min(100, value)) : 0
  const [particlesActive, setParticlesActive] = React.useState(false)
  const previousProgressValue = React.useRef(progressValue)
  const particleTimeout = React.useRef<number | null>(null)

  React.useEffect(() => {
    if (previousProgressValue.current === progressValue) {
      return
    }

    previousProgressValue.current = progressValue

    if (particleTimeout.current) {
      window.clearTimeout(particleTimeout.current)
    }

    if (progressValue <= 0) {
      setParticlesActive(false)
      return
    }

    setParticlesActive(true)
    particleTimeout.current = window.setTimeout(() => {
      setParticlesActive(false)
    }, PARTICLE_DECAY_MS)
  }, [progressValue])

  React.useEffect(() => {
    return () => {
      if (particleTimeout.current) {
        window.clearTimeout(particleTimeout.current)
      }
    }
  }, [])

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-1.5 w-full overflow-visible",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden rounded-full border border-white/[0.06] bg-white/[0.08] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]"
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="ui-progress-indicator relative size-full flex-1 rounded-full bg-primary shadow-[0_0_14px_rgba(245,181,23,0.35)]"
          style={{ transform: `translateX(-${100 - progressValue}%)` }}
        />
      </span>

      <span
        aria-hidden="true"
        data-active={particlesActive}
        className="ui-progress-particles pointer-events-none absolute top-1/2 h-7 w-12 -translate-x-px -translate-y-1/2 overflow-visible"
        style={{ left: `${progressValue}%` }}
      >
        <span className="absolute inset-0">
          {PARTICLES.map((particle, index) => (
            <span key={index} className="ui-progress-particle" style={particleStyle(particle)} />
          ))}
        </span>
      </span>
    </ProgressPrimitive.Root>
  )
}

export { Progress }
