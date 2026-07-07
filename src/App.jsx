import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ShopProvider } from './context/ShopContext.jsx'
import PageWipe from './components/PageWipe.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import BallCursor from './components/BallCursor.jsx'
import Home from './pages/Home.jsx'
import Fixtures from './pages/Fixtures.jsx'
import News from './pages/News.jsx'
import Teams from './pages/Teams.jsx'
import About from './pages/About.jsx'
import Membership from './pages/Membership.jsx'
import Shop from './pages/Shop.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <ShopProvider>
      <ScrollToTop />
      <ScrollProgress />
      <PageWipe />
      <BallCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/news" element={<News />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/about" element={<About />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </ShopProvider>
  )
}
