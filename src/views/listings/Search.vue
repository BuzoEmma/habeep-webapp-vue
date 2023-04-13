<template>
    <div class="w-screen min-w-full flex flex-col items-center bg-white h-full min-h-screen overflow-y-auto"
        resize="changeWidth">
        <MainNavbar v-if="(screenWidth > 767)" @search="searchDB" />

        <div class="flex flex-row items-center justify-between w-full px-6 2xl:px-44 md:px-20 my-4" v-else>
            <div class="flex flex-row items-center gap-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0A1045"
                    class="w-6 h-6 cursor-pointer" @click="$router.go(-1)">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span class="text-xl text-webapp font-medium">Search Results</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" @click="toggleSearch" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="#0A1045" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        </div>


        <div
            class="body px-6 2xl:px-44 md:px-20 mb-10 w-full flex flex-col h-full items-center md:items-start gap-y-8 mt-3">
            <div class="flex flex-row items-center w-full px-2 relative" v-if="onSearchBar" v-motion
                :initial="{ opacity: 0.5, y: -100 }" :enter="{ opacity: 1, y: 0 }" :leave="{ y: 100, opacity: 0.2, }">
                <input type="text" placeholder="Search products" v-model="searchData" @keydown="checkForEnter"
                    class=" border border-black pl-2 outline-none h-10 w-full">
                <div class="search-btn w-8 h-8 bg-black absolute right-3 grid place-items-center cursor-pointer"
                    @click="searchDB(searchData)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                </div>
            </div>
            <div class="flex flex-row w-full items-center justify-between">
                <p class="text-webapp text-lg w-full md:block hidden"><span class="text-primary font-medium">{{
                    products.length }}</span>
                    ads result found
                    in <span class="font-medium capitalize">{{ $route.query.location ? $route.query.location :
                        'Nigeria' }}</span></p>

                <!-- filters -->
                <div class="flex flex-row items-center h-fit gap-x-4 w-full md:w-min relative transition-all">
                    <div @click="toggleDropdown('sort')"
                        class="border border-gray-300 md:w-56 w-1/2 py-2 justify-center flex flex-row items-center gap-x-2 rounded-full cursor-pointer ">
                        <span class="md:text-lg text-webapp text-sm flex flex-row gap-x-1"> Sort:
                            <span class="hidden md:flex flex-row items-center w-full flex-nowrap">{{ sortValue }}</span>
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate-180': onSortDropdown }" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="#9A9A9D" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>

                    <div @click="toggleDropdown('location')"
                        class="border border-gray-300 py-2 md:w-min w-1/2 px-3 flex flex-row items-center justify-center gap-x-4 rounded-full cursor-pointer">
                        <span class="md:text-lg text-webapp">{{ currentCity }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate-180': onLocationDropdown }" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="#9A9A9D" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>

                    <!-- sort dropdown -->
                    <div v-if="(onSortDropdown && onDropdown)"
                        class="flex flex-col drop-shadow-md shadow-xl bg-white rounded-xl gap-y-3 border p-4 border-gray-300 absolute top-16 z-10"
                        style="width: 220px">
                        <div class="flex flex-row items-center justify-between">
                            <span class="text-sm font-medium">Sort by</span>
                            <svg xmlns="http://www.w3.org/2000/svg" @click="toggleDropdown('sort')" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="#71759D" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <p class="text-sm text-webapp mt-2 cursor-pointer"
                            :class="{ 'text-blue-600': sortValue === 'Recommended' }" @click="changeSortValue(1)">
                            Recommended
                        </p>
                        <hr>
                        <p class="text-sm text-webapp mt-2 cursor-pointer"
                            :class="{ 'text-blue': sortValue === 'Newest_first' }" @click="changeSortValue(2)">Newest
                            first
                        </p>
                        <hr>
                        <p class="text-sm text-webapp mt-2 cursor-pointer"
                            :class="{ 'text-blue-600': sortValue === 'Oldest first' }" @click="changeSortValue(3)">Oldest
                            first
                        </p>
                    </div>

                    <!-- location dropdown -->
                    <div v-if="(onLocationDropdown && onDropdown)"
                        class="flex flex-col location drop-shadow-md overflow-y-auto shadow-xl bg-white rounded-xl gap-y-3 border p-4 border-gray-300 absolute top-16 right-0 z-10"
                        style="width: 220px; max-height: 394px;">
                        <div class="flex flex-row items-center justify-between">
                            <span class="text-sm font-medium">
                                Location-
                                <span v-if="onState">state</span>
                                <span v-else>city</span>
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" @click="toggleDropdown('location')" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="#71759D" class="w-5 h-5 cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>


                        <div class="mt-1" v-if="onState">
                            <p class="text-sm mb-1 text-webapp cursor-pointer gap-x-2 flex flex-row"><img
                                    src="../../assets/icons/location-checked.svg" alt="">{{ currentState + ' - ' +
                                        currentCity
                                    }}</p>
                            <hr>
                        </div>
                        <div class="mt-1" v-if="!onState">
                            <p class="text-sm mb-1 text-webapp cursor-pointer gap-x-2 flex flex-row">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-4 h-4 cursor-pointer" @click="onState = true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>

                                <span class="text-primary text-sm">{{ currentState }}</span>
                            </p>
                            <hr>
                        </div>

                        <div v-if="onState" class="gap-y-2">
                            <div class="py-2" v-for="(state, index) in states" :key="(state, index)"
                                @click="changeStateModal(state, 'state')">
                                <p class="text-sm mb-1 text-webapp cursor-pointer" v-if="state.state.name !== 'Cross'">{{
                                    state.state.name }}</p>
                                <p class="text-sm mb-1 text-webapp cursor-pointer" v-else>{{ state.state.name + ' River' }}
                                </p>
                                <hr v-if="index + 1 !== states.length">
                            </div>
                        </div>

                        <div v-else>
                            <div class="py-2" v-for="(city, index) in cities" :key="(city, index)"
                                @click="changeStateModal(city.name, 'city')">
                                <p class="text-sm mb-1 text-webapp cursor-pointer">{{ city.name }}</p>
                                <hr v-if="index + 1 !== cities.length">
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- listing -->
            <div class="flex flex-row flex-auto h-full md:mt-10 w-full flex-wrap"
                :class="{ 'justify-center items-center': products.length < 1 }">

                <div class="flex flex-col items-center gap-y-3 justify-center" v-if="products.length < 1 && !searchingData">
                    <img src="../../assets/icons/no-ad.svg" alt="">
                    <span class="text-gray-300 text-lg">No match for search yet</span>
                </div>

                <div class="flex flex-col items-center gap-y-3 justify-center" v-if="searchingData === true">
                    <img src="../../assets/images/rhombus-preloader.gif" alt="">
                </div>
                <!-- listing template -->
                <div class="basis-full md:basis-1/2 xl:basis-1/4 md:px-3 md:py-3 py-5 gap-y-4 px-0" v-else
                    v-for="product in products" :key="product">
                    <div
                        class="flex flex-col items-start gap-y-2 relative border rounded-md border-gray-200 pb-2 h-fit feed">
                        <img @click="$router.push('/listings/products/' + product._id)" :src="product.images[0].link"
                            class="w-full h-full feed-image rounded-t-md"
                            v-if="product.images[0].link.includes('mp4') == false" alt="">
                        <video @click="$router.push('/listings/products/' + product._id)" :src="product.images[0].link"
                            class="w-full rounded-t-md feed-image" v-else autoplay muted></video>
                        <p class="text-webapp text-lg font-medium w-full mx-2 cursor-pointer feed-image"
                            @click="$router.push('/listings/products/' + ad._id)">
                            {{ product.title }}

                        </p>

                        <div class="location flex flex-row items-center gap-x-2 px-2">
                            <img src="../../assets/images/map-pin.png" alt="">
                            <span class="text-sm text-webapp">{{ product.location.city || product.location.address.substr(0,
                                20) }}</span>
                        </div>

                        <div class="flex flex-row items-center w-full justify-between px-2">
                            <p class="text-sm text-webapp font-medium">N{{ formatNumber(product.price) }} /
                                <span v-if="product.for === 'rent'">Year</span>
                                <span v-if="product.for === 'sale'">Forever</span>
                            </p>
                            <svg xmlns="http://www.w3.org/2000/svg" v-if="$store.state.isAuthenticated" v-motion
                                :initial="{ opacity: 0.8 }" :tapped="{ opacity: 1, y: 0, x: 0, scale: 1.2 }" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer"
                                @click="saveAd(product._id)"
                                :class="{ 'text-orange-400': $store.state.user.savedAds.includes(product._id) }">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" v-else fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer"
                                @click="$router.push('/login')">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>

                        <!-- distance of listing from you -->
                        <div class="rounded border border-white px-2 py-1 absolute top-5 right-5">
                            <span class="text-white text-sm text-center">1.8km Away</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainNavbar from '../../components/MainNavbar.vue'
import formatNumber from 'number_formatter';
import saveAd from '../../composables/saveAd'
import axiosDefault from 'axios'
import axios from "../../composables/axios";
import { useRoute } from 'vue-router';

// ui conditionals
const onSortDropdown = ref(false)
const onLocationDropdown = ref(false)
const onDropdown = ref(false)
const locationValue = ref(false)


const store = useStore()
const route = useRoute()
const url = '/listings/query';
const products = ref([])



const states = ref([])
const cities = ref([])
let onState = ref(true)
const currentState = ref(route.query.location || 'Nigeria')
const currentCity = ref('All')

const searchingData = ref(false)

const searchDB = (e) => {
    if (e.length > 0) {
        getSearch(currentCity, e)
    } else {
        getSearch(currentCity, 'all')
    }
}

const checkForEnter = (e) => {
    var key = e.keyCode || e.charCode || e.key || e.code;
    if (key == 13 || key == 'Enter') {
        getSearch(currentState.value, searchData.value)
    }
}

const onSearchBar = ref(false)

const searchData = ref('')

function toggleSearch() {
    onSearchBar.value = !onSearchBar.value
}

function saveFeedLocation() {
    store.commit('changeFeedLocation', {
        state: currentState.value,
        city: currentCity.value,
    })
}

function changeStateModal(state, type) {
    if (type === 'state') {
        onState.value = false
        currentState.value = state.state.name
        cities.value = state.cities
    }
    if (type === 'city') {
        onDropdown.value = false
        onLocationDropdown.value = false
        onState.value = true
        currentCity.value = state

        saveFeedLocation()
    }
}

async function getSearch(location, query) {
    searchingData.value = true
    products.value = []
    let data = reactive({
        location: location,
        string: query
    })

    const getProducts = await axios.post(url, data)
    products.value = []
    getProducts.data.products.forEach(product => {
        products.value.push(product)
    })

    searchingData.value = false

}

getSearch(route.query.location, route.query.name || 'all')

// filters
const sortValue = ref('Recommended')


function toggleDropdown(type) {
    if (type == 'location') {
        onSortDropdown.value = false
        if (onLocationDropdown.value === false) {
            onDropdown.value = true
            onLocationDropdown.value = true
        } else {
            onLocationDropdown.value = false
            onDropdown.value = false
        }
    }
    if (type == 'sort') {
        onLocationDropdown.value = false
        if (onSortDropdown.value === false) {
            onDropdown.value = true
            // onLocationDropdown.value = !onLocationDropdown.value
            onSortDropdown.value = true
        } else {
            onSortDropdown.value = false
            onDropdown.value = false
        }
    }
}

function changeSortValue(index) {
    if (index == 1) {
        sortValue.value = 'Recommended'
    } else if (index == 2) {
        sortValue.value = 'Newest_first'
    } else {
        sortValue.value = 'Oldest first'
    }

    toggleDropdown('sort')
}
function changeLocationValue(place) {
    locationValue.value = place

    toggleDropdown('location')
}

const screenWidth = ref(window.innerWidth)

function changeWidth() {
    screenWidth.value = window.innerWidth
}

async function getStates() {
    const getState = await axiosDefault.get('https://locus.fkkas.com/api/states');

    getState.data.data.forEach(async state => {
        const getCities = await axiosDefault.get('https://locus.fkkas.com/api/regions/' + state.alias);

        let formatted = {
            state: state,
            cities: getCities.data.data
        }

        states.value.push(formatted)

    })

    states.value = states.value.sort(function (a, b) {
        const nameA = a.state.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.state.name.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });
    store.dispatch('saveStates', states.value)
}

onMounted(() => {
    if (store.state.allStates.length !== 0) {
        states.value = store.state.allStates.sort(function (a, b) {
            const nameA = a.state.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.state.name.toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
    } else {
        getStates()
    }

})
</script>

<style scoped>
.feed-image {
    height: 100%;
    width: 100% !important;
    object-fit: cover;
    max-height: 185px !important;
}

.feed {
    height: 291px !important;
    max-height: 291px !important;
}
</style>