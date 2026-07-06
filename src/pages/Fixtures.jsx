import PageHeader from './PageHeader.jsx'
import FixturesBoard from '../sections/FixturesBoard.jsx'
import Ticker from '../components/Ticker.jsx'
import Newsletter from '../components/Newsletter.jsx'
import Footer from '../components/Footer.jsx'

const TICKER = [
  'FT · ATHLONE 0-17 : 1-23 ROSCOMMON · ALLIANZ HL',
  'FT · ATHLONE 2-10 : 1-11 ROSCOMMON · ALLIANZ FL',
  'NEXT · SUN 10 MAY · LEINSTER SFC QF · THROW-IN 2PM',
  'NEXT · SUN 14 JUN · CHRISTY RING CUP · THROW-IN 1:30PM',
]

export default function Fixtures() {
  return (
    <>
      <PageHeader
        no="02"
        kicker="SEASON 2026"
        title="Match Day"
        lead="Every game across football and hurling: throw-in times, venues and full-time scores."
      />
      <Ticker items={TICKER} tone="navy" duration={30} />
      <FixturesBoard />
      <Newsletter />
      <Footer />
    </>
  )
}
