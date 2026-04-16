import type { CSSProperties } from "react"

type LetterWaveProps = {
  text: string
  className?: string
}

function LetterWave({ text, className }: LetterWaveProps) {
  return (
    <span className={["ui-wave-eyebrow", className].filter(Boolean).join(" ")}>
      {Array.from(text).map((character, index) => (
        <span
          key={`${character}-${index}`}
          className="ui-wave-eyebrow__char"
          style={{ "--ui-wave-index": index } as CSSProperties}
        >
          {character === " " ? "\u00A0" : character}
        </span>
      ))}
    </span>
  )
}

export { LetterWave }
