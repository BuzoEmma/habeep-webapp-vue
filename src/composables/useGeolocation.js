

export function useGeolocation() {
  const coords = { latitude: 0, longitude: 0 }
  const isSupported = 'navigator' in window && 'geolocation' in navigator

  let watcher = null
  if (isSupported)
    watcher = navigator.geolocation.watchPosition(
      position => (coords = position.coords)
    )
  return { coords, isSupported }
}