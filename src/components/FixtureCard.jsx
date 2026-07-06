import { CREST_HOME, CREST_AWAY } from '../data/fixtures.js'
import './FixtureCard.css'

export default function FixtureCard({ fixture, index = 0 }) {
  return (
    <article className="board-row reveal" style={{ '--reveal-delay': `${index * 0.08}s` }}>
      <div className="board-meta">
        <span className="board-date">{fixture.date}</span>
        <span className="board-comp">{fixture.competition}</span>
      </div>

      <div className="board-line">
        <div className="board-team">
          <img src={CREST_HOME} alt="" />
          <span>Athlone</span>
        </div>

        {fixture.played ? (
          <div className="board-score" aria-label={`Full time ${fixture.homeScore} to ${fixture.awayScore}`}>
            <span>{fixture.homeScore}</span>
            <span className="board-score-sep">:</span>
            <span>{fixture.awayScore}</span>
          </div>
        ) : (
          <div className="board-score board-score--next">
            <span className="board-live-dot" aria-hidden />
            <span>{fixture.throwIn}</span>
          </div>
        )}

        <div className="board-team board-team--away">
          <span>Roscommon</span>
          <img src={CREST_AWAY} alt="" />
        </div>
      </div>

      <div className="board-foot">
        <span>{fixture.venue}</span>
        <span>REF · {fixture.referee}</span>
        <span>{fixture.played ? 'FULL TIME' : 'UPCOMING'}</span>
      </div>
    </article>
  )
}
