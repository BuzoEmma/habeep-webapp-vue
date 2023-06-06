import { useGeolocation } from './useGeolocation'
import { computed } from 'vue'
import axiosDefault from 'axios'

//manage locations
const { coords } = useGeolocation()
const currPos = computed(() => ({
    lat: coords.value.latitude,
    lng: coords.value.longitude
}))

async function getOtherPostion(address) {
    try {
        const getCoords = await axiosDefault.get(`https://api.geoapify.com/v1/geocode/search?text=${address.toLowerCase()}&apiKey=cc38699e9c01400eaacbaef549b67acc`)

        if (getCoords.data.features[0].geometry.coordinates[0]) {
            return {
                lat: getCoords.data.features[0].geometry.coordinates[0],
                lng: getCoords.data.features[0].geometry.coordinates[1]
            }
        } else {
            return {
                lat: 0.000,
                lng: 0.000,
            }
        }
    } catch (error) {
        console.log('Cannot get Location')
        return false

    }
}


function haversineDistance(pos1, pos2) {
    try {
        const R = 3958.8 // Radius of the Earth in miles
        const rlat1 = pos1.lat * (Math.PI / 180) // Convert degrees to radians
        const rlat2 = pos2.lat * (Math.PI / 180) // Convert degrees to radians
        const difflat = rlat2 - rlat1 // Radian difference (latitudes)
        const difflon = (pos2.lng - pos1.lng) * (Math.PI / 180) // Radian difference (longitudes)
        const d =
            2 *
            R *
            Math.asin(
                Math.sqrt(
                    Math.sin(difflat / 2) * Math.sin(difflat / 2) +
                    Math.cos(rlat1) *
                    Math.cos(rlat2) *
                    Math.sin(difflon / 2) *
                    Math.sin(difflon / 2)
                )
            )
        return d
    } catch (error) {
        return 0
    }
}

async function calculateDistance(address) {
    try {
        const otherPos = await getOtherPostion(address)
        if (otherPos) {
            const distance = haversineDistance(currPos.value, otherPos)
            return distance * 1.609
        } else return null
    } catch (error) {
        return null
    }
}


export default calculateDistance;