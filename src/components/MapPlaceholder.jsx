	mport { useEffect, useRef, useState } from 'react'
import leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import parkingStops from '../data/parkingStops.js'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = leaflet.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})
leaflet.Marker.prototype.options.icon = DefaultIcon

export default function MapPlaceholder() {
  const mapRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (mapRef.current) return

    const firstStop = parkingStops[0]
    const map = leaflet.map('map').setView([firstStop.lat, firstStop.lng], 6)

    leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CartoDB',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map)

    // Add markers
    parkingStops.forEach(stop => {
      leaflet.marker([stop.lat, stop.lng])
        .addTo(map)
        .bindPopup(`<b>${stop.name}</b><br>${stop.location}<br>${stop.parkingSpots} spots<br>${stop.amenities.join(', ')}`)
    })

    mapRef.current = map
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const found = parkingStops.find(stop =>
      stop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stop.location.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (found && mapRef.current) {
      mapRef.current.setView([found.lat, found.lng], 10)
      mapRef.current.eachLayer(layer => {
        if (layer instanceof leaflet.Marker && layer.getPopup()?.getContent()?.includes(found.name)) {
          layer.openPopup()
        }
      })
    } else {
      alert('No matching parking stop found. Try "Iowa", "South", or "Little".')
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch} style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Search by name or city (e.g., Iowa, Dillon)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: '0.5rem', fontSize: '1rem' }}
        />
        <button type="submit">Find on Map</button>
      </form>
      <div id="map" style={{ height: '400px', width: '100%', borderRadius: '12px', zIndex: 1 }} />
    </div>
  )
}
