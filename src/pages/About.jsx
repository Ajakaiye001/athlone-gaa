import PageHeader from './PageHeader.jsx'
import AboutSection from '../sections/AboutSection.jsx'
import SummerCamp from '../sections/SummerCamp.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import Newsletter from '../components/Newsletter.jsx'
import Footer from '../components/Footer.jsx'
import useReveal from '../hooks/useReveal.js'
import './About.css'

export default function About() {
  const ref = useReveal({ threshold: 0.2 })

  return (
    <>
      <PageHeader
        no="01"
        kicker="EST. 1905 · CO. WESTMEATH"
        title="The Club"
        lead="Shaped by dedication, teamwork and local pride. Welcoming players and families from every part of Athlone for 120 years."
      />

      <AboutSection />
      <SummerCamp />
      <Testimonials />

      <section className="contact grain" id="contact" ref={ref}>
        <div className="container">
          <p className="tag reveal">
            <span className="tag-no">07</span> FIND US
          </p>
          <div className="contact-grid">
            <h2 className="display reveal" style={{ '--reveal-delay': '0.1s' }}>
              The gate is always open
            </h2>
            <dl className="contact-list reveal" style={{ '--reveal-delay': '0.2s' }}>
              <div>
                <dt>GROUNDS</dt>
                <dd>The Clubhouse, Athlone, Co. Westmeath</dd>
              </div>
              <div>
                <dt>EMAIL</dt>
                <dd>
                  <a href="mailto:info@athlonegaa.ie">info@athlonegaa.ie</a>
                </dd>
              </div>
              <div>
                <dt>TRAINING</dt>
                <dd>Tuesday and Thursday, 19:30, under lights</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  )
}
