import useReveal from '../hooks/useReveal.js'
import { settings } from '../content.js'
import './Tickets.css'

// Two ways to buy GAA match tickets: online via Ticketmaster, or in person
// from selected Centra and SuperValu stores. URLs come from Site Settings.
export default function Tickets() {
  const ref = useReveal({ threshold: 0.15 })

  return (
    <section className="tickets grain" id="tickets" ref={ref}>
      <div className="container">
        <p className="tag reveal">
          <span className="tag-no">★</span> BUY TICKETS
        </p>
        <h2 className="display reveal" style={{ '--reveal-delay': '0.1s' }}>
          Get to the game
        </h2>
        <p className="tickets-lead reveal" style={{ '--reveal-delay': '0.15s' }}>
          Tickets for Athlone GAA championship games are sold online through Ticketmaster and over
          the counter at selected Centra and SuperValu stores. Buy early: big games sell out.
        </p>

        <div className="tickets-grid">
          <article className="ticket-route ticket-route--online reveal" style={{ '--reveal-delay': '0.2s' }}>
            <span className="ticket-route-no">01</span>
            <h3 className="display">Online</h3>
            <p>
              The fastest way. Buy on Ticketmaster, show the ticket on your phone at the turnstile.
            </p>
            {settings.ticketmasterUrl && (
              <a className="stamp stamp--leather" href={settings.ticketmasterUrl} target="_blank" rel="noreferrer">
                Buy on Ticketmaster <span className="stamp-arrow">↗</span>
              </a>
            )}
          </article>

          <article className="ticket-route ticket-route--store reveal" style={{ '--reveal-delay': '0.3s' }}>
            <span className="ticket-route-no">02</span>
            <h3 className="display">In store</h3>
            <p>
              Prefer to pay at the till? Tickets are stocked at selected Centra and SuperValu
              stores nationwide. Find your nearest shop:
            </p>
            <div className="ticket-store-links">
              {settings.centraUrl && (
                <a className="stamp" href={settings.centraUrl} target="_blank" rel="noreferrer">
                  Centra stores <span className="stamp-arrow">↗</span>
                </a>
              )}
              {settings.supervaluUrl && (
                <a className="stamp" href={settings.supervaluUrl} target="_blank" rel="noreferrer">
                  SuperValu stores <span className="stamp-arrow">↗</span>
                </a>
              )}
            </div>
          </article>
        </div>

        <p className="tickets-note reveal">
          Under-16s go free at most league games. Season tickets and clubhouse enquiries:{' '}
          <a href="mailto:info@athlonegaa.ie">info@athlonegaa.ie</a>
        </p>
      </div>
    </section>
  )
}
