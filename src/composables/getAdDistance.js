import { ref } from 'vue'
import axiosDefault from 'axios'

//manage locations
async function getOtherPostion(address) {
    try {
        const getCoords = await axiosDefault.get(`https://api.geoapify.com/v1/geocode/search?text=${address.toLowerCase()}&apiKey=cc38699e9c01400eaacbaef549b67acc`)
        const datas = ref([])
        if (getCoords.data.features && getCoords.data.features.length > 0) {
            for (const data of getCoords.data.features) {
                datas.value.push({
                    lat: data.properties.lat,
                    lng: data.properties.lon
                })
            }

            return datas.value
        } else {
            return null
        }
    } catch (error) {
        return null

    }
}


function haversineDistance(lat1, lon1, lat2, lon2) {
    try {
        const r = 6371; // km
        const p = Math.PI / 180;

        const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
            + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
            (1 - Math.cos((lon2 - lon1) * p)) / 2;

        return 2 * r * Math.asin(Math.sqrt(a));
    } catch (error) {
        return 0
    }
}

function getCoordinates() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

async function calculateDistance(address) {
    try {

        let coords = { latitude: 0, longitude: 0 }
        let isSupported = 'navigator' in window && 'geolocation' in navigator

        let distances = ref([])

        if (isSupported) {

            const position = await getCoordinates()
            coords = position.coords


            const currPos = ref({
                lat: coords.latitude,
                lng: coords.longitude
            })

            const otherPos = await getOtherPostion(address)
            if (otherPos) {
                for (const pos of otherPos) {
                    const dist = haversineDistance(currPos.value.lat, currPos.value.lng, pos.lat, pos.lng)
                    distances.value.push(dist)
                }

                const minDist = Math.min(...distances.value)

                return minDist
            } else {
                return null
            }
        } else return null
    } catch (error) {
        return null
    }
}


export default calculateDistance;