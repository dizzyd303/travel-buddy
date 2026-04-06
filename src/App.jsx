import React from 'react'
import Hero from './components/Hero.jsx'
import ParkingSection from './components/ParkingSection.jsx'
import SignUpForm from './components/SignUpForm.jsx'
import MapPlaceholder from './components/MapPlaceholder.jsx'

export default function App() {
  return (
    <div className="app">
      <Hero />
      <ParkingSection />
      <MapPlaceholder />
      <section id="signup" className="container">
        <SignUpForm />
      </section>
      <footer className="container footer">
        © 2026 Travel Buddy MVP. Privacy-first. Data used for testing only.
      </footer>
    </div>
  )
}

