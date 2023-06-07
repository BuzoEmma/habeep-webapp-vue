

export function useGeolocation() {
  let coords = { latitude: 0, longitude: 0 }
  let isSupported = 'navigator' in window && 'geolocation' in navigator

  let watcher = null
  if (isSupported)
    watcher = navigator.geolocation.watchPosition(
      position => (coords = position.coords)
    )
  return { coords, isSupported }
}