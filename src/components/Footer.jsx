import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import './Footer.css'

export default function Footer() {
  const ref = useReveal({ threshold: 0.1 })

  return (
    <footer className="footer grain" ref={ref}>
      <div className="container">
        <div className="footer-top">
          <div className="footer-crest reveal">
            <img src="/assets/imgImage232.png" alt="Athlone GAA crest" />
            <p>
              Athlone GAA
              <br />
              Co. Westmeath · Est. 1905
            </p>
          </div>

          <nav className="footer-col" aria-label="Site">
            <h4>The Club</h4>
            <Link to="/">Home</Link>
            <Link to="/about">The Club</Link>
            <Link to="/teams">Teams</Link>
            <Link to="/fixtures">Fixtures &amp; Results</Link>
            <Link to="/tickets">Tickets</Link>
            <Link to="/news">News</Link>
          </nav>

          <nav className="footer-col" aria-label="Get involved">
            <h4>Get Involved</h4>
            <Link to="/membership">Membership</Link>
            <Link to="/shop">Club Shop</Link>
            <Link to="/about#summer-camp">Summer Camp</Link>
            <Link to="/news">Club Lotto</Link>
            <Link to="/about#contact">Contact</Link>
          </nav>

          <nav className="footer-col" aria-label="Social media">
            <h4>The Roar Online</h4>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook ↗
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              Twitter ↗
            </a>
          </nav>
        </div>
      </div>

      <p className="footer-wordmark display" aria-hidden>
        UP ATHLONE
      </p>

      <div className="container footer-legal">
        <span>© 2026 ATHLONE GAA. ALL RIGHTS RESERVED.</span>
        <span>MOL AN ÓIGE AGUS TIOCFAIDH SÍ</span>
      </div>
    </footer>
  )
}
