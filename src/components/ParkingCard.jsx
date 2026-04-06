import React from 'react'

export default function ParkingCard({ name, type, fits, height, amenities, overnight, distance }) {
  const { feet, inches, meters } = height
  const heightLabel = `${feet} ft ${inches} in (${meters.toFixed(2)} m)`

  return (
    <div className="card parking-item" aria-label={`Parking Stop ${name}`} style={{ padding: 12 }}>
      <strong>{name}</strong><br/>
      <span className="muted">{type} • {fits}</span>
      <span className="clearance" aria-label="Height clearance">
        Height Clearance: {heightLabel}
      </span>
      <ul className="amenities" aria-label="Amenities" style={{ marginTop: 6 }}>
        {amenities.map((a, i) => <li key={i}>{a}</li>)}
      </ul>
      <div className="footer-meta" style={{ fontSize: 12, color: '#9bb0d9' }}>
        Overnight: {overnight ? 'Yes' : 'No'} • Distance: {distance} mi
      </div>
    </div>
  )
}

