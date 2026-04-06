import React from 'react'

export default function Hero() {
  return (
    <section className="hero container" aria-label="Hero">
      <div className="hero-copy">
        <span className="badge">Beta MVP</span>
        <h1>One app for your drive: fuel, repair, sleep, parking, and smart stops</h1>
        <p>Starting now as a mobile MVP with rapid validation—migrating to a full Linux-based stack soon. A landing-page MVP to collect early interest from truckers, RVers, and road-trippers.</p>
        <div className="cta">
          <a href="#signup" className="btn primary">Join the Pilot</a>
          <a href="#parking" className="btn secondary">View Parking Map</a>
        </div>
      </div>
      <div className="hero-visual">
        <img alt="Travel Buddy MVP visual" src="https://dummyimage.com/600x380/2b2b2b/ffffff&text=Travel+Buddy+MVP" />
      </div>
    </section>
  )
}

