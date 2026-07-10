import PageHeader from './PageHeader.jsx'
import Tickets from '../sections/Tickets.jsx'
import FixturesBoard from '../sections/FixturesBoard.jsx'
import Newsletter from '../components/Newsletter.jsx'
import Footer from '../components/Footer.jsx'

export default function TicketsPage() {
  return (
    <>
      <PageHeader
        no="02"
        kicker="MATCH DAY · SEASON 2026"
        title="Tickets"
        lead="Buy online through Ticketmaster or in person at selected Centra and SuperValu stores. Check the fixtures below and get yours before throw-in."
      />
      <Tickets />
      <FixturesBoard />
      <Newsletter />
      <Footer />
    </>
  )
}
