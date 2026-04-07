import { useEffect, useRef, useState } from 'react'
import leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { fetchTruckStops } from '../utils/fetchTruckStops'
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
  const markersRef = useRef({})
  const [loading, setLoading] = useState(false)
  const [stopCount, setStopCount] = useState(0)

  // Default to Chicago as starting location
  const defaultCenter = { lat: 41.8781, lng: -87.6298 }

  // Function to load truck stops for current map view
  const loadStopsForMap = async (map) => {
    const center = map.getCenter()
    const bounds = map.getBounds()
    
    // Calculate radius based on zoom level (farther zoom = larger radius)
    const zoom = map.getZoom()
    const radiusKm = zoom > 10 ? 20 : zoom > 8 ? 50 : 100
    
    setLoading(true)
    const stops = await fetchTruckStops(center.lat, center.lng, radiusKm)
    setStopCount(stops.length)
    
    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove())
    markersRef.current = {}
    
    // Add new markers
    stops.forEach(stop => {
      const marker = leaflet.marker([stop.lat, stop.lng])
        .addTo(map)
        .bindPopup(`
          <b>${stop.name}</b><br>
          ${stop.location}<br>
          🅿️ ${stop.parkingSpots} spots<br>
          🛠️ ${stop.amenities.join(', ')}
        `)
      
      markersRef.current[stop.id] = marker
    })
    
    setLoading(false)
  }

  useEffect(() => {
    if (mapRef.current) return

    // Initialize map centered on Chicago
    const map = leaflet.map('map').setView([defaultCenter.lat, defaultCenter.lng], 7)

    leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CartoDB',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map)

    mapRef.current = map
    
    // Load initial stops
    loadStopsForMap(map)
    
    // Listen for map movement to reload stops
    map.on('moveend', () => {
      loadStopsForMap(map)
    })
    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    const query = e.target.search.value
    if (!query.trim() || !mapRef.current) return
    
    // Simple geocoding (for demo - use Nominatim API)
    setLoading(true)
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`)
      const data = await response.json()
      
      if (data && data[0]) {
        const lat = parseFloat(data[0].lat)
        const lng = parseFloat(data[0].lon)
        mapRef.current.setView([lat, lng], 12)
        await loadStopsForMap(mapRef.current)
      } else {
        alert('Location not found. Try "Chicago, IL" or "Kansas City"')
      }
    } catch (error) {
      console.error('Geocoding error:', error)
      alert('Could not search for that location')
    }
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSearch} style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          name="search"
          type="text"
          placeholder="Search any city (e.g., Fulton, MO or Chicago, IL)"
          style={{ flex: 1, padding: '0.5rem', fontSize: '1rem' }}
        />
        <button type="submit">Find Truck Stops</button>
      </form>
      {loading && (
        <div style={{ textAlign: 'center', padding: '0.5rem', background: '#f0f0f0', borderRadius: '8px', marginBottom: '0.5rem' }}>
          🔍 Loading truck stops...
        </div>
      )}
      {!loading && stopCount > 0 && (
        <div style={{ textAlign: 'center', padding: '0.5rem', background: '#e0e7ff', borderRadius: '8px', marginBottom: '0.5rem' }}>
          📍 Found {stopCount} truck stops in this area
        </div>
      )}
      <div id="map" style={{ height: '500px', width: '100%', borderRadius: '12px', zIndex: 1 }} />
    </div>
  )
}
