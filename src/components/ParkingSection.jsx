import React from 'react'
import ParkingCard from './ParkingCard.jsx'
import data from '../data/parkingStops.js'

export default function ParkingSection() {
  return (
    <section id="parking" className="container parking-section" aria-label="Parking & Stops">
      <h2>Parking & Stops (New) — Height-aware for trucks and RVs</h2>
      <div className="parking-grid">
        {data.map((p) => (
          <ParkingCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  )
}

