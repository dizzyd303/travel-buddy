import axios from 'axios'

// Overpass API query to find truck stops, rest areas, and travel centers
const buildQuery = (lat, lng, radiusKm = 50) => {
  const radiusMeters = radiusKm * 1000
  
  return `
    [out:json];
    (
      node["amenity"="truck_stop"](around:${radiusMeters},${lat},${lng});
      node["highway"="rest_area"](around:${radiusMeters},${lat},${lng});
      node["truck parking"="yes"](around:${radiusMeters},${lat},${lng});
      way["amenity"="truck_stop"](around:${radiusMeters},${lat},${lng});
      way["highway"="rest_area"](around:${radiusMeters},${lat},${lng});
    );
    out body;
    out center;
  `
}

export async function fetchTruckStops(lat, lng, radiusKm = 50) {
  try {
    const query = buildQuery(lat, lng, radiusKm)
    const response = await axios.post('https://overpass-api.de/api/interpreter', query, {
      headers: { 'Content-Type': 'text/plain' }
    })
    
    // Process the results
    const stops = response.data.elements
      .filter(el => el.lat && el.lon) // Only include elements with coordinates
      .map(el => ({
        id: el.id,
        name: el.tags?.name || el.tags?.operator || 'Truck Stop',
        location: el.tags?.city || el.tags?.town || 'Unknown location',
        lat: el.lat,
        lng: el.lon,
        amenities: getAmenities(el.tags),
        parkingSpots: estimateParkingSpots(el.tags)
      }))
    
    // Remove duplicates by name and location
    const uniqueStops = stops.filter((stop, index, self) => 
      index === self.findIndex(s => 
        s.name === stop.name && Math.abs(s.lat - stop.lat) < 0.001
      )
    )
    
    return uniqueStops.slice(0, 30) // Max 30 markers for performance
  } catch (error) {
    console.error('Error fetching truck stops:', error)
    return []
  }
}

function getAmenities(tags) {
  const amenities = []
  if (tags?.fuel) amenities.push('Fuel')
  if (tags?.restaurant) amenities.push('Restaurant')
  if (tags?.showers) amenities.push('Showers')
  if (tags?.toilets) amenities.push('Restrooms')
  if (tags?.parking) amenities.push('Parking')
  if (tags?.shop) amenities.push('Store')
  if (!amenities.length) amenities.push('Truck Parking')
  return amenities
}

function estimateParkingSpots(tags) {
  if (tags?.capacity) return parseInt(tags.capacity) || 50
  if (tags?.parking_capacity) return parseInt(tags.parking_capacity) || 50
  return Math.floor(Math.random() * 150) + 20 // Random estimate between 20-170
}
