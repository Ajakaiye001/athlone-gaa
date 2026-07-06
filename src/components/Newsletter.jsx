import { useState } from 'react'
import useReveal from '../hooks/useReveal.js'
import './Newsletter.css'

export default function Newsletter() {
  const ref = useReveal({ threshold: 0.3 })
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // null | 'error' | 'done'

  function subscribe(e) {
    e.preventDefault()
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus('error')
      return
    }
    setStatus('done')
    setEmail('')
  }

  return (
    <section className="club-call grain" ref={ref}>
      <div className="container">
        <p className="tag reveal">
          <span className="tag-no">06</span> THE CLUB NOTES
        </p>
        <h2 className="display reveal" style={{ '--reveal-delay': '0.1s' }}>
          Never miss a throw-in
        </h2>
        <p className="club-call-sub reveal" style={{ '--reveal-delay': '0.2s' }}>
          Fixtures, results, lotto and camp news. One email a week, written by volunteers.
        </p>

        {status === 'done' ? (
          <p className="club-call-done" role="status">
            YOU'RE ON THE TEAMSHEET. TALK SUNDAY.
          </p>
        ) : (
          <form className="club-call-form reveal" style={{ '--reveal-delay': '0.3s' }} onSubmit={subscribe} noValidate>
            <input
              type="email"
              placeholder="YOUR@EMAIL.IE"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setStatus(null)
              }}
              aria-label="Email address"
            />
            <button type="submit" className="stamp stamp--leather">
              Sign up <span className="stamp-arrow">→</span>
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="club-call-error" role="alert">
            THAT EMAIL WON'T MAKE THE PANEL. CHECK IT AND GO AGAIN.
          </p>
        )}
      </div>
    </section>
  )
}
