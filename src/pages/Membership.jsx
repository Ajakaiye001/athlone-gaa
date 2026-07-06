import { useState } from 'react'
import PageHeader from './PageHeader.jsx'
import Newsletter from '../components/Newsletter.jsx'
import Footer from '../components/Footer.jsx'
import useReveal from '../hooks/useReveal.js'
import './Membership.css'

const PLANS = [
  { name: 'Juvenile', price: '€60', detail: 'Under 18s. Includes the summer camp discount.' },
  { name: 'Adult Player', price: '€120', detail: 'Full playing membership, every code.' },
  { name: 'Family', price: '€180', detail: 'Two adults plus all children in one household.' },
  { name: 'Social', price: '€40', detail: 'Support the club and vote at the AGM.' },
]

export default function Membership() {
  const ref = useReveal({ threshold: 0.05 })
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', plan: 'Adult Player' })

  function submit(e) {
    e.preventDefault()
    if (form.name.trim() && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) setSent(true)
  }

  return (
    <>
      <PageHeader
        no="06"
        kicker="ONE CLUB, ONE PARISH"
        title="Join Us"
        lead="Player, parent or supporter: pick a membership and the registrar will be in touch. New members welcome all year."
      />

      <section className="join container" ref={ref}>
        <div className="join-plans" role="radiogroup" aria-label="Membership plan">
          {PLANS.map((p, i) => (
            <label
              key={p.name}
              className={`join-plan reveal ${form.plan === p.name ? 'is-active' : ''}`}
              style={{ '--reveal-delay': `${i * 0.07}s` }}
            >
              <input
                type="radio"
                name="plan"
                value={p.name}
                checked={form.plan === p.name}
                onChange={() => setForm({ ...form, plan: p.name })}
              />
              <span className="join-plan-check" aria-hidden />
              <span className="join-plan-name display">{p.name}</span>
              <span className="join-plan-price">{p.price} / YEAR</span>
              <span className="join-plan-detail">{p.detail}</span>
            </label>
          ))}
        </div>

        {sent ? (
          <div className="join-done reveal is-inview" role="status">
            <h3 className="display">You're on the panel, {form.name.split(' ')[0]}</h3>
            <p>
              Your {form.plan} membership request is in. The registrar will email {form.email} with
              payment details before the week is out.
            </p>
          </div>
        ) : (
          <form className="join-form reveal" style={{ '--reveal-delay': '0.2s' }} onSubmit={submit}>
            <h3>YOUR DETAILS</h3>
            <label>
              <span>FULL NAME</span>
              <input
                type="text"
                placeholder="SEÁN Ó CATHÁIN"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </label>
            <label>
              <span>EMAIL</span>
              <input
                type="email"
                placeholder="YOUR@EMAIL.IE"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </label>
            <button type="submit" className="stamp stamp--solid">
              Request membership <span className="stamp-arrow">→</span>
            </button>
          </form>
        )}
      </section>

      <Newsletter />
      <Footer />
    </>
  )
}
