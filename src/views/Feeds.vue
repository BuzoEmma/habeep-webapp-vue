<template>
    <div class="absolute w-screen h-screen flex flex-row items-center justify-center lg:hidden z-10" v-if="onDropdown" style="background-color: rgb(22, 22, 34, 0.5)">

        <div v-if="(onSortDropdown && onDropdown)"
            class="flex flex-col drop-shadow-md shadow-xl my-auto bg-white rounded-xl gap-y-3 border p-4 border-gray-300 z-10"
            style="width: 220px">
            <div class="flex flex-row items-center justify-between" @click="toggleDropdown('sort')">
                <span class="text-lg text-webapp font-medium">Sort:</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="#71759D" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>

            <p class="text-sm text-webapp mt-2 cursor-pointer" :class="{ 'text-blue-600': sortValue === 'Recommended' }"
                @click="changeSortValue(1)">Recommended</p>
            <p class="text-sm text-webapp mt-2 cursor-pointer" :class="{ 'text-blue-600': sortValue === 'Newest first' }"
                @click="changeSortValue(2)">Newest first</p>
            <p class="text-sm text-webapp mt-2 cursor-pointer" :class="{ 'text-blue-600': sortValue === 'Oldest first' }"
                @click="changeSortValue(3)">Oldest first</p>

            <hr class="my-4">

            <span class="text-webapp text-lg font-medium">Location:</span>
            <div class="flex flex-row items-center justify-between mt-4 w-full" @click="toggleDropdown('location')">
                <span class="text-primary text-lg font-medium ">{{ currentCity }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6 text-gray-300 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>

        </div>

        <!-- location dropdown -->
        <div v-if="(onLocationDropdown && onDropdown)"
            class="flex flex-col location drop-shadow-md overflow-y-auto shadow-xl bg-white rounded-xl gap-y-3 border p-4 border-gray-300 z-10"
            style="width: 220px; max-height: 394px;">
            <div class="flex flex-row items-center justify-between">
                <span class="text-sm font-medium">
                    Location-
                    <span v-if="onState">state</span>
                    <span v-else>city</span>
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" @click="toggleDropdown('location')" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="#71759D" class="w-5 h-5 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>


            <div class="mt-1" v-if="onState">
                <p class="text-sm mb-1 text-webapp cursor-pointer gap-x-2 flex flex-row"><img
                        src="../assets/icons/location-checked.svg" alt="">{{ currentState + ' - ' + currentCity
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

    <div class="w-screen min-w-full flex flex-col items-center main bg-white h-screen min-h-full overflow-y-auto"
        :class="{ 'max-h-screen overflow-y-hidden overflow-hidden opacity-40': onDropdown && screenWidth < 1024 }"
        resize="changeWidth">
        <MainNavbar @toggleSearch="toggleSearch" />

        <div
            class="body px-0 2xl:px-44 md:px-20 mb-10 w-full flex flex-col h-full items-center md:items-start  gap-y-3 mt-3">
            <!-- mobile search bar -->
            <div class="flex flex-row items-center w-full px-2 relative" v-if="onSearchBar" v-motion
                :initial="{ opacity: 0.2, y: -100 }" :enter="{ opacity: 1, y: 0 }" :leave="{ y: 100, opacity: 0, }">
                <input type="text" placeholder="Search products" v-model="searchData"
                    class=" border border-black pl-2 outline-none h-10 w-full">
                <div class="search-btn w-8 h-8 bg-black absolute right-3 grid place-items-center cursor-pointer"
                    @click="$router.push('/listings/search?name=' + searchData)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
            </div>
            <div class="flex flex-row w-full mt-2 items-center justify-between">
                <div
                    class="flex flex-row items-center tabs gap-x-4 border-b flex-nowrap border-gray-200 lg:overflow-x-hidden overflow-x-scroll px-6">
                    <img src="../assets/icons/Filter.svg" alt="" class="cursor-pointer lg:hidden"
                        @click="toggleDropdown('sort')">
                    <span class="text-sub-webapp pb-2 cursor-pointer text-sm md:text-lg" @click="changeHouseType('all')"
                        :class="{ 'border-b-2 font-medium text-blue-600 border-b-blue-600 text-primary': activeType === 'all' }">All</span>
                    <span class="text-sub-webapp pb-2 cursor-pointer text-sm md:text-lg"
                        @click="changeHouseType('apartment')"
                        :class="{ 'border-b-2 font-medium text-blue-600 border-b-blue-600 text-primary': activeType === 'apartment' }">Apartment</span>
                    <span class="text-sub-webapp pb-2 cursor-pointer text-sm md:text-lg"
                        @click="changeHouseType('bungalow')"
                        :class="{ 'border-b-2 font-medium text-blue-600 border-b-blue-600 text-primary': activeType === 'bungalow' }">Bungalow</span>
                    <span class="text-sub-webapp pb-2 cursor-pointer text-sm md:text-lg" @click="changeHouseType('duplex')"
                        :class="{ 'border-b-2 font-medium text-blue-600 border-b-blue-600 text-primary': activeType === 'duplex' }">Duplex</span>
                    <span class="text-sub-webapp pb-2 cursor-pointer text-sm md:text-lg" @click="changeHouseType('flat')"
                        :class="{ 'border-b-2 font-medium text-blue-600 border-b-blue-600 text-primary': activeType === 'flat' }">Flat</span>
                    <span class="text-sub-webapp pb-2 cursor-pointer text-sm md:text-lg" @click="changeHouseType('office')"
                        :class="{ 'border-b-2 font-medium text-blue-600 border-b-blue-600 text-primary': activeType === 'office' }">Office</span>
                    <span class="text-sub-webapp pb-2 cursor-pointer text-sm md:text-lg whitespace-nowrap w-full"
                        @click="changeHouseType('room_parlor')"
                        :class="{ 'border-b-2 font-medium text-blue-600 border-b-blue-600 text-primary': activeType === 'room_parlor' }">Room
                        & Parlour</span>
                    <span class="text-sub-webapp pb-2 cursor-pointer text-sm md:text-lg whitespace-nowrap w-full"
                        @click="changeHouseType('land')"
                        :class="{ 'border-b-2 font-medium text-blue-600 border-b-blue-600 text-primary': activeType === 'land' }">Land</span>
                </div>

                <!-- filters -->
                <div class="flex flex-row items-center h-fit gap-x-4 transition-all" :class="{'relative': onDropdown}">
                    <div @click="toggleDropdown('sort')"
                        class="border border-gray-300 w-56 py-1 justify-center hidden lg:flex flex-row items-center gap-x-2 rounded-full cursor-pointer ">
                        <span class="md:text-lg text-webapp text-sm flex flex-row gap-x-1"> Sort:
                            <span class="hidden md:flex flex-row items-center w-full flex-nowrap">{{ sortValue }}</span>
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate-180': onSortDropdown }" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="#9A9A9D" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>

                    <div @click="toggleDropdown('location')"
                        class="border border-gray-300 py-1 px-3 hidden lg:flex flex-row items-center gap-x-4 rounded-full cursor-pointer">
                        <span class="md:text-lg text-webapp">{{ currentCity || 'Nigeria' }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate-180': onLocationDropdown }" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="#9A9A9D" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>

                    <!-- sort dropdown -->
                    <div v-if="(onSortDropdown && onDropdown)"
                        class="lg:flex hidden flex-col drop-shadow-md shadow-xl bg-white rounded-xl gap-y-3 border p-4 border-gray-300 absolute top-16 z-10"
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
                            :class="{ 'text-blue': sortValue === 'Newest first' }" @click="changeSortValue(2)">Newest
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
                        class="lg:flex hidden flex-col location drop-shadow-md overflow-y-auto shadow-xl bg-white rounded-xl gap-y-3 border p-4 border-gray-300 absolute top-16 right-0 z-10"
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
                                    src="../assets/icons/location-checked.svg" alt="">{{ currentState + ' - ' + currentCity
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




            <!-- feeds sections -->
            <div class="flex flex-row flex-auto h-full md:mt-10 w-full flex-wrap px-6"
                :class="{ 'justify-center items-center': filteredFeeds.length < 1 }">

                <img src="../assets/images/rhombus-preloader.gif" class="m-auto" v-if="fetchingFeeds === true" alt="">

                <div class="flex flex-col items-center gap-y-3 md:justify-center"
                    v-if="filteredFeeds.length < 1 && !started && !fetchingFeeds">
                    <img src="../assets/icons/no-ad.svg" alt="">
                    <span class="text-gray-300 text-lg">No feeds for {{ activeType }} yet</span>
                </div>
                <!-- listing template -->
                <div class="basis-full md:basis-1/2 xl:basis-1/4 md:px-3 md:py-3 py-5 gap-y-4 px-0" v-else
                    v-for="feed in filteredFeeds" :key="feed">
                    <div class="flex flex-col items-start gap-y-2 border rounded-md border-gray-200 pb-2 feed">
                        <img :src="feed.images[0].link" @click="$router.push('/listings/products/' + feed._id)" alt=""
                            class="w-full feed-image rounded-t-md"
                            v-if="feed.images[0].link && feed.images[0].link.includes('mp4') == false">
                        <video :src="feed.images[0].link" @click="$router.push('/listings/products/' + feed._id)"
                            class="w-full rounded-t-md feed-image" v-else autoplay muted loop preload="metadata"></video>
                        <p class="text-webapp text-lg font-medium w-full px-2 cursor-pointer"
                            @click="$router.push('/listings/products/' + feed._id)">{{ feed.title }}</p>

                        <div class="location flex flex-row items-center gap-x-2 px-2"
                            @click="$router.push('/listings/products/' + feed._id)">
                            <img src="../assets/images/map-pin.png" alt="">
                            <span class="text-sm text-webapp">{{ feed.location.city || feed.location.address.substr(0, 20)
                            }}</span>
                        </div>

                        <div class="flex flex-row items-center w-full justify-between px-2">
                            <p @click="$router.push('/listings/products/' + feed._id)"
                                class="text-sm text-webapp font-medium">₦{{ formatNumber(feed.price) }} /
                                <span v-if="feed.for === 'rent'">Rent</span>
                                <span v-if="feed.for === 'sale'">Sale</span>
                            </p>
                            <svg xmlns="http://www.w3.org/2000/svg" v-motion :initial="{ opacity: 0.8 }"
                                v-if="$store.state.isAuthenticated" :tapped="{ opacity: 1, y: 0, x: 0, scale: 1.2 }"
                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-6 h-6 cursor-pointer" @click="saveAd(feed._id)"
                                :class="{ 'text-orange-400': $store.state.user.savedAds.includes(feed._id) }">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>

                        <!-- distance of listing from you -->
                        <div class="rounded border border-white px-2 py-1 absolute top-5 right-5" v-if="feed.distance"
                            style="background: rgba(211,211,211, 0.5);">
                            <span class="text-white text-sm text-center">{{ Math.round(feed.distance) }} KM Away</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- feed section end -->

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import formatNumber from "number_formatter"
import axiosDefault from 'axios'
import { useStore } from 'vuex'
import { useRoute, useRouter } from "vue-router";
import MainNavbar from '../components/HomeNavbar.vue'
import calculateDistance from '../composables/getAdDistance.js'
import axios from "../composables/axios";
import saveAd from "../composables/saveAd";

const store = useStore()

const route = useRoute()
const router = useRouter()

if (route.query.reloadApp) {
    router.replace({ query: null });
    setTimeout(() => {
        router.go()
    }, 1000);
}



// ui conditionals
const onSortDropdown = ref(false)
const onLocationDropdown = ref(false)
const onDropdown = ref(false)


const activeType = ref('all')
const states = ref([])
const cities = ref([])
let onState = ref(true)
const currentState = ref('Abuja')
const currentCity = ref('Gwagwalada')

currentState.value = store.state.feedLocation.state

if(store.state.feedLocation.state) {
    currentState.value = store.state.feedLocation.state
}
if(store.state.feedLocation.city) {
    currentCity.value = store.state.feedLocation.city
}


// fetch feeds

const fetchingFeeds = ref(false)
const feeds = ref([])
const started = ref(false)
const filteredFeeds = ref([])
const errorMsg = ref('')

const url = '/listings/feeds';

function filterType() {
    let newFeeds = feeds.value
    if (activeType.value === 'all') {
        filteredFeeds.value = newFeeds
    } else {
        let filtered = newFeeds.filter(feed => {
            return feed.type.toLowerCase() === activeType.value.toLowerCase()
        })

        filteredFeeds.value = filtered
    }

    const uniqueIds = [];
    const uniqueFeeds = filteredFeeds.value.filter(element => {
        const isDuplicate = uniqueIds.includes(element._id);
        if (!isDuplicate) {
            uniqueIds.push(element._id);
            return true;
        }
        return false;
    });

    filteredFeeds.value = uniqueFeeds
}

async function getFeeds() {
    try {
        fetchingFeeds.value = true
        started.value = true
        const getFeeds = await axios.get(url)
        fetchingFeeds.value = false

        if (getFeeds.data) {
            feeds.value = getFeeds.data.feed
        }

        // feeds.value.forEach(async feed => {
        //     const distance = await calculateDistance(feed.location.address + ', ' + feed.location.city || 'Calabar')
        //     feed.distance = distance
        // })

        started.value = false

        filterType()

    } catch (error) {
        errorMsg.value = 'Error getting feeds'
    }
}



// filters
const sortValue = ref('Recommended')

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

const onSearchBar = ref(false)

const searchData = ref('')

function toggleSearch() {
    onSearchBar.value = !onSearchBar.value
}

function changeHouseType(type) {
    activeType.value = type

    filterType()
}

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
        sortValue.value = 'Newest first'
    } else {
        sortValue.value = 'Oldest first'
    }
    toggleDropdown('sort')
}

function saveFeedLocation() {
    store.commit('changeFeedLocation', {
        state: currentState.value,
        city: currentCity.value,
    })
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
    getFeeds()
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
.location::-webkit-scrollbar {
    width: 6px;
}


.location::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #71759D;
    border-radius: 10px;
}

.location::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
}

.main::-webkit-scrollbar {
    width: 6px;
}


.main::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: #71759D;
    border-radius: 10px;
}

.main::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
}

.tabs::-webkit-scrollbar {
    display: none;
}

.tabs::-webkit-scrollbar-thumb {
    width: 0px;
    display: none;
    background-color: white;
    border-radius: 10px;
}

.feed-image {
    height: 100%;
    width: 100% !important;
    object-fit: cover;
    max-height: 185px !important;
}
</style>