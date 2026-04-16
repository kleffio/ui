"use client"

import * as React from "react"

import { cn } from "../utils"

type OrbStatus = "active" | "popped" | "returning"

type AmbientOrbFieldProps = {
  className?: string
  edgeScrimSide?: "left" | "right"
  showEdgeScrim?: boolean
  revealDelayMs?: number
  staggerMs?: number
}

type OrbConfig = {
  positionClassName: string
  driftClassName: string
  duration: string
  delay?: string
}

const ORB_REAPPEAR_DELAY_MS = 5000
const ORB_FADE_IN_MS = 1800
const ORB_INITIAL_STAGGER_MS = 200

const ORBS: OrbConfig[] = [
  {
    positionClassName:
      "left-[-20%] top-[-22%] h-[56rem] w-[56rem] sm:h-[72rem] sm:w-[72rem]",
    driftClassName: "ui-orb-core--drift-forward",
    duration: "16s",
  },
  {
    positionClassName:
      "left-[-10%] top-[34%] h-[38rem] w-[38rem] sm:h-[52rem] sm:w-[52rem]",
    driftClassName: "ui-orb-core--drift-reverse",
    duration: "19s",
  },
  {
    positionClassName:
      "left-[24%] top-[-6%] h-[28rem] w-[28rem] sm:h-[38rem] sm:w-[38rem]",
    driftClassName: "ui-orb-core--drift-forward",
    duration: "22s",
    delay: "-7s",
  },
  {
    positionClassName:
      "left-[8%] bottom-[-18%] h-[34rem] w-[34rem] sm:h-[46rem] sm:w-[46rem]",
    driftClassName: "ui-orb-core--drift-reverse",
    duration: "24s",
    delay: "-11s",
  },
  {
    positionClassName:
      "left-[48%] top-[6%] h-[26rem] w-[26rem] sm:h-[38rem] sm:w-[38rem]",
    driftClassName: "ui-orb-core--drift-reverse",
    duration: "19s",
  },
]

function AmbientOrbField({
  className,
  edgeScrimSide = "right",
  showEdgeScrim = true,
  revealDelayMs = 0,
  staggerMs = ORB_INITIAL_STAGGER_MS,
}: AmbientOrbFieldProps) {
  const [orbStates, setOrbStates] = React.useState<OrbStatus[]>(
    () => ORBS.map(() => "popped")
  )
  const timeoutsRef = React.useRef<number[][]>(ORBStatesToTimeouts())

  React.useEffect(() => {
    setOrbStates(ORBS.map(() => "popped"))

    ORBS.forEach((_, index) => {
      scheduleOrbReturn(index, revealDelayMs + index * staggerMs)
    })

    return () => {
      for (const timers of timeoutsRef.current) {
        for (const timer of timers) {
          window.clearTimeout(timer)
        }
      }
    }
  }, [revealDelayMs, staggerMs])

  function clearOrbTimers(index: number) {
    for (const timer of timeoutsRef.current[index]) {
      window.clearTimeout(timer)
    }
    timeoutsRef.current[index] = []
  }

  function scheduleOrbReturn(index: number, delayMs: number) {
    clearOrbTimers(index)

    const returningTimer = window.setTimeout(() => {
      setOrbStates((current) =>
        current.map((state, currentIndex) =>
          currentIndex === index ? "returning" : state
        )
      )

      const activeTimer = window.setTimeout(() => {
        setOrbStates((current) =>
          current.map((state, currentIndex) =>
            currentIndex === index ? "active" : state
          )
        )
        timeoutsRef.current[index] = []
      }, ORB_FADE_IN_MS)

      timeoutsRef.current[index] = [activeTimer]
    }, delayMs)

    timeoutsRef.current[index] = [returningTimer]
  }

  function handlePop(index: number) {
    if (orbStates[index] !== "active") {
      return
    }

    setOrbStates((current) =>
      current.map((state, currentIndex) =>
        currentIndex === index ? "popped" : state
      )
    )

    scheduleOrbReturn(index, ORB_REAPPEAR_DELAY_MS)
  }

  return (
    <div aria-hidden="true" className={cn("ui-orb-field absolute inset-0 overflow-hidden", className)}>
      {ORBS.map((orb, index) => {
        const status = orbStates[index]

        return (
          <button
            key={`${orb.positionClassName}-${index}`}
            type="button"
            tabIndex={-1}
            disabled={status !== "active"}
            onClick={() => handlePop(index)}
            className={cn(
              "ui-orb-shell absolute m-0 border-0 bg-transparent p-0 outline-none",
              orb.positionClassName,
              status === "popped" && "ui-orb-shell--popped",
              status === "returning" && "ui-orb-shell--returning"
            )}
          >
            <span
              className={cn("ui-orb-core", orb.driftClassName)}
              style={
                {
                  "--ui-orb-duration": orb.duration,
                  "--ui-orb-delay": orb.delay ?? "0s",
                } as React.CSSProperties
              }
            />
          </button>
        )
      })}
      {showEdgeScrim && (
        <span
          className={cn(
            "ui-orb-edge-scrim absolute inset-y-0 w-[18%] min-w-24 max-w-48",
            edgeScrimSide === "left"
              ? "ui-orb-edge-scrim--left left-0"
              : "right-0"
          )}
        />
      )}
    </div>
  )
}

function ORBStatesToTimeouts() {
  return ORBS.map(() => [] as number[])
}

export { AmbientOrbField }
