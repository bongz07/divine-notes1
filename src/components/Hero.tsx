type HeroProps = {
  activeCount: number
  answeredCount: number
}

export function Hero({ activeCount, answeredCount }: HeroProps) {
  return (
    <header className="hero">
      <div>
        <p className="eyebrow">Divine Notes</p>
        <h1>Keep your prayers close</h1>
        <p className="subtitle">
          A lightweight prayer journal that stays on your device. Capture each intention, revisit
          answered prayers, and keep gratitude within reach.
        </p>
      </div>
      <div className="stats">
        <article>
          <span>Active</span>
          <strong>{activeCount}</strong>
        </article>
        <article>
          <span>Answered</span>
          <strong>{answeredCount}</strong>
        </article>
      </div>
    </header>
  )
}

