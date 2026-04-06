import React from 'react'

export default function MapPlaceholder() {
  return (
    <section id="map" className="container map-section" aria-label="Parking map placeholder">
      <h2>Parking Map Preview</h2>
      <div className="map-box" aria-label="Map placeholder" style={{ border: '1px solid #334', borderRadius: 8, padding: 8 }}>
        <iframe
          title="Parking map placeholder"
          src="https://www.google.com/maps?q=truck+parking&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  )
}

