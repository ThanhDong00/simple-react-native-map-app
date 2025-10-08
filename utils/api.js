// Gọi API Nominatim để tìm địa điểm
export async function searchPlaces(query) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&countrycodes=VN&q=${encodeURIComponent(
      query
    )}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "ExpoOSMApp/1.0 (example@example.com)" },
    });
    return await res.json();
  } catch (e) {
    console.error("Search error", e);
    return [];
  }
}

// Gọi API OSRM để vẽ đường đi
export async function getRoute(from, to) {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${from.longitude},${from.latitude};${to.longitude},${to.latitude}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.routes || !data.routes[0]) return [];
    return data.routes[0].geometry.coordinates.map(([lon, lat]) => ({
      latitude: lat,
      longitude: lon,
    }));
  } catch (e) {
    console.error("Route error", e);
    return [];
  }
}
