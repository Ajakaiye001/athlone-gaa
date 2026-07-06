import Hero from '../sections/Hero.jsx'
import AboutSection from '../sections/AboutSection.jsx'
import FixturesBoard from '../sections/FixturesBoard.jsx'
import Coaches from '../sections/Coaches.jsx'
import SummerCamp from '../sections/SummerCamp.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import ShopTeaser from '../sections/ShopTeaser.jsx'
import Newsletter from '../components/Newsletter.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FixturesBoard />
      <Coaches />
      <SummerCamp />
      <Testimonials />
      <ShopTeaser />
      <Newsletter />
      <Footer />
    </>
  )
}
