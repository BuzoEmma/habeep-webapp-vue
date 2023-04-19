<template>
    <MainNavbarVue />
    <div
        class="w-screen min-w-full flex flex-col lg:flex-row items-center bg-white h-screen min-h-full overflow-y-auto overflow-x-hidden">
        <div
            class="flex flex-col items-start gap-y-3 h-2/5 lg:h-full bg-webapp justify-center w-full lg:w-2/5 px-4 md:px-10">
            <h3 class="text-white font-medium text-4xl w-full text-left">Welcome {{
                $store.state.user.fname + ' ' +
                $store.state.user.surname
            }} </h3>
            <p class="text-left sm:text-lg xl:text-xl text-gray-300 w-full">Hey, you’re in the right place to list a
                house. A few details is needed. Let’s go</p>
            <button class="mt-2 bg-primary text-white text-lg px-8 py-2 rounded"
                @click="$router.push('/agent/ads/create')">List a House</button>
        </div>

        <div
            class="form-container flex flex-col items-center relative bg-white gap-y-3 py-3 px-4 w-full lg:w-3/5 min-h-fit h-3/5 lg:h-full md:py-10 overflow-y-auto overflow-x-hidden">

            <h3 class="text-webapp font-medium text-2xl w-full text-left">Your uploads</h3>

            <div class="actions w-full flex flex-row items-center relative mt-5 px-1 py-3 justify-between flex-nowrap overflow-x-scroll">
                <div class="flex flex-row items-center h-fit gap-x-4 w-full md:w-1/3" v-if="!onSearch">
                    <button class="px-4 py-2  rounded-full border border-gray-300 text-sm whitespace-nowrap text-gray-400"
                        @click="changeAdsTab(1)" :class="{ 'on-active': adsTab === 1 }">Active
                        ads</button>
                    <button class="px-4 py-2 rounded-full border border-gray-300 text-sm whitespace-nowrap text-gray-400" v-if="!onSearch"
                        @click="changeAdsTab(2)" :class="{ 'on-active': adsTab === 2 }">Closed
                        ads</button>

                </div>
                <div class="flex flex-row items-center h-fit gap-x-4 justify-end"
                    :class="{ 'w-full': onSearch === true, 'w-2/3': !onSearch }">
                    <div :class="{ 'flex-display w-4/5': onSearch === true }"
                        class="search-bar w-3/5 hidden md:flex flex-row rounded-full border border-gray-300 items-center py-1 px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" @click="onSearch = false" fill="none" viewBox="0 0 24 24"
                            stroke-width="1" stroke="#B1B4CD" class="w-6 h-6 mt-1">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>

                        <input type="text" class=" h-full bg-transparent" placeholder="Search for your ads"
                            style="border: none !important;" v-model="search" @change="searchData('search', search)">
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" v-if="!onSearch" @click="onSearch = true" fill="none"
                        viewBox="0 0 24 24" stroke-width="2" stroke="#71759D" class="w-6 h-6 mx-4 md:hidden block">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>


                    <div class="border border-gray-300 px-4 py-2 justify-center flex flex-row items-center gap-x-2 rounded-full cursor-pointer"
                        @click="toggleDropdown('sort')">
                        <span class="text-webapp text-sm w-full">{{ sortValue }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="#9A9A9D" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>

                    <!-- sort dropdown -->
                    <div v-if="(onSortDropdown && onDropdown)"
                        class="flex flex-col drop-shadow-md shadow-xl bg-white rounded-xl gap-y-3 border p-4 border-gray-300 absolute top-14 z-10"
                        style="width: 220px">
                        <div class="flex flex-row items-center justify-between">
                            <span class="text-sm font-medium">Sort house type</span>
                        </div>

                        <p class="text-sm text-webapp mt-2 cursor-pointer" @click="changeSort('All')"
                            :class="{ 'text-primary': sortValue === 'All' }">All</p>
                        <hr>
                        <p class="text-sm text-webapp mt-2 cursor-pointer" @click="changeSort('Apartment')"
                            :class="{ 'text-primary': sortValue === 'Apartment' }">Apartment</p>
                        <hr>
                        <p class="text-sm text-webapp mt-2 cursor-pointer" @click="changeSort('Bungalow')"
                            :class="{ 'text-primary': sortValue === 'Bungalow' }">Bungalow</p>
                        <hr>
                        <p class="text-sm text-webapp mt-2 cursor-pointer" @click="changeSort('Duplex')"
                            :class="{ 'text-primary': sortValue === 'Duplex' }">Duplex</p>
                        <hr>
                        <p class="text-sm text-webapp mt-2 cursor-pointer" @click="changeSort('Flat')"
                            :class="{ 'text-primary': sortValue === 'Flat' }">Flat</p>
                        <hr>
                        <p class="text-sm text-webapp mt-2 cursor-pointer" @click="changeSort('Office')"
                            :class="{ 'text-primary': sortValue === 'Office' }">Office</p>
                        <hr>
                        <p class="text-sm text-webapp mt-2 cursor-pointer" @click="changeSort('room_parlor')"
                            :class="{ 'text-primary': sortValue === 'room_parlor' }">Room and Parlor</p>
                    </div>
                </div>
            </div>

            <!-- tab for active ads -->
            <div class="ads-tab w-full h-fit mt-6 flex flex-row"
                :class="{ 'justify-center items-center': activeProducts.length < 1 }" v-if="adsTab === 1">
                <div class="flex flex-col items-center gap-y-3 md:justify-center" v-if="activeProducts.length < 1">
                    <img src="../../../../assets/icons/no-ad.svg" alt="">
                    <span class="text-gray-300 text-lg">No active post yet</span>
                </div>
                <div class="flex flex-row w-full h-full flex-wrap" v-else>

                    <!-- listing template -->
                    <div class="basis-full md:basis-1/2 2xl:basis-1/3 p-4 border h-fit border-gray-200 rounded-lg" v-for="item in activeProducts" :key="item">
                        <div class="flex flex-col items-start gap-y-2 ad relative rounded-t-md">
                            <img @click="$router.push('/listings/products/' + item._id)" :src="item.images[0].link"
                                class="w-full h-full rounded-md feed-image" v-if="item.images[0].link.includes('mp4') == false"
                                alt="">
                            <video @click="$router.push('/listings/products/' + item._id)" :src="item.images[0].link"
                                class="w-full rounded-md feed-image" v-else autoplay muted></video>
                            <p class="text-webapp text-lg font-medium w-full  cursor-pointer"
                                @click="$router.push('/listings/products/' + item._id)">
                                {{ item.title }}
                            </p>

                            <div class="location flex flex-row items-start gap-x-2">
                                <img src="../../../../assets/images/map-pin.png" class="mt-1" alt="">
                                <span class="text-sm text-webapp capitalize">{{
                                    item.location.address ||
                                    item.location.city
                                }}</span>
                            </div>

                            <div class="flex flex-row items-center w-full justify-start">
                                <p v-if="item.for === 'rent'"><span class="text-lg text-webapp font-medium">₦{{
                                    formatNumber(item.price)
                                }}</span><span class="text-gray-400 text-sm"> / Year</span></p>
                                <p v-else><span class="text-lg text-webapp font-medium">N{{ formatNumber(item.price)
                                }}</span><span class="text-gray-500 text-sm"> / Sale</span></p>
                            </div>

                            <div class="mt-3 flex flex-row items-center justify-between gap-x-2 w-full">
                                <button @click="$router.push('/listings/agent/products/' + item._id)"
                                    class="border border-blue-700 flex flex-row justify-center items-center gap-x-2 rounded-md w-1/2 h-12">
                                    <img src="../../../../assets/icons/listings/edit.svg" alt="">
                                    <span class="text-sm text-primary">Edit ad</span>
                                </button>
                                <button class="bg-primary flex flex-row justify-center items-center rounded-md w-1/2 h-12">
                                    <span class="text-sm text-white">Close ad</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- tab for closed ads -->
            <div class="ads-tab w-full h-full mt-6 flex flex-row md:items-center justify-center" v-if="adsTab === 2">
                <div class="flex flex-col items-center gap-y-3 md:justify-center" v-if="closedProducts.length < 1">
                    <img src="../../../../assets/icons/no-ad.svg" alt="">
                    <span class="text-gray-300 text-lg">No ads yet</span>
                </div>
                <div class="flex flex-row w-full gap-3 h-fit flex-wrap" v-else>

                    <!-- listing template -->
                    <div class="basis-full md:basis-1/2 2xl:basis-1/3 ad p-4" v-for="item in closedProducts" :key="item">
                        <div class="flex flex-col items-start gap-y-2 relative ad  rounded-t-md">
                            <img @click="$router.push('/listings/products/' + item._id)" :src="item.images[0].link"
                                class="w-full h-full rounded-md feed-image" v-if="item.images[0].link.includes('mp4') == false"
                                alt="">
                            <video @click="$router.push('/listings/products/' + item._id)" :src="item.images[0].link"
                                class="w-full rounded-md feed-image" v-else autoplay muted></video>
                            <p class="text-webapp text-lg font-medium w-full mx-3 cursor-pointer"
                                @click="$router.push('/listings/products/' + item._id)">
                                {{ item.title }}
                            </p>

                            <div class="location flex flex-row items-start gap-x-2">
                                <img src="../../../../assets/images/map-pin.png" class="mt-1" alt="">
                                <span class="text-sm text-webapp capitalize">{{
                                    item.location.address ||
                                    item.location.city
                                }}</span>
                            </div>

                            <div class="flex flex-row items-center w-full justify-start">
                                <p v-if="item.for === 'rent'"><span class="text-lg text-webapp font-medium">N{{
                                    formatNumber(item.price) }}
                                    </span>
                                    <span class="text-gray-400 text-sm">/ Year</span>
                                </p>
                                <p v-else><span class="text-lg text-webapp font-medium">N{{ formatNumber(item.price)
                                }}</span><span class="text-gray-500 text-sm">/ Sale</span></p>
                            </div>

                            <div class="mt-3 flex flex-row items-center justify-between gap-x-2 w-full">
                                <button disabled
                                    class="border border-blue-700 flex flex-row justify-center cursor-default items-center gap-x-2 rounded-md w-full h-12">
                                    <span class="text-lg text-primary">Closed</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MainNavbarVue from "../../../../components/MainNavbar.vue";
import axios from "../../../../composables/axios";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import formatNumber from "number_formatter"

const store = useStore()

if (store.state.user.role !== "AGENT") {
    setTimeout(() => {
        router.go()
    }, 2000);
}

const adsTab = ref(1)

function changeAdsTab(tab) {
    adsTab.value = tab
}

const onSearch = ref(false)

const search = ref('')

const url = '/listings/agent/get-products';
let data = { length: 'all' }
const allProducts = ref([])
const activeProducts = ref([])
const mainActiveProducts = ref([])
const closedProducts = ref([])
const mainClosedProducts = ref([])

const onDropdown = ref(false)
const onSortDropdown = ref(false)
const sortValue = ref('Filter')
function toggleDropdown(type) {
    if (type == 'sort') {
        if (onSortDropdown.value === false) {
            onDropdown.value = true
            // onLocationDropdown.value = !onLocationDropdown.value
            onSortDropdown.value = true
        } else {
            onSortDropdown.value = false
        }
    }
}

function searchData(type, value) {
    function cutout(filtered) {
        if (filtered.length > 0) {
            filtered.forEach(filter => {
                let index = activeProducts.value.findIndex(filter)
                if (index) {
                    activeProducts.value.splice(index)
                }
            })
        }
    }
    if (adsTab === 1) {
        if (type === 'search') {
            let filtered = mainActiveProducts.value.filter(product => {
                return product.title.includes(value) || product.description.includes(value)
            })

            console.log(filtered)

            cutout(filtered)
            activeProducts.value.push(filtered)
        }
        if (type === 'type') {
            let filtered = mainActiveProducts.value.filter(product => {
                return product.type === value.toLowerCase()
            })

            cutout(filtered)
            activeProducts.value.push(filtered)
        }
    } else {
        if (type === 'search') {
            let filtered = mainClosedProducts.value.filter(product => {
                return product.title.includes(value) || product.description.includes(value)
            })

            cutout(filtered)
            closedProducts.value.push(filtered)
        }
        if (type === 'type') {
            let filtered = mainClosedProducts.value.filter(product => {
                return product.type === value.toLowerCase()
            })

            cutout(filtered)
            closedProducts.value.push(filtered)
        }
    }
}

function changeSort(value) {
    sortValue.value = value
    searchData('type', value)
    toggleDropdown('sort')
}

async function getAllAds() {
    const products = await axios.post(url, data)
    allProducts.value = products.data.products

    let active = allProducts.value.filter(product => {
        return product.sold === false
    })
    activeProducts.value = active
    mainActiveProducts.value = active
    let closed = allProducts.value.filter(product => {
        return product.sold === true
    })
    closedProducts.value = closed
    mainClosedProducts.value = closed
}

onMounted(() => {
    getAllAds()
})
</script>

<style scoped>
.ad-image {
    height: 164px;
    max-height: 164px !important;
}

.flex-display {
    display: flex !important;
}

input::placeholder {
    color: #71759D;
    font-size: 14px;
}

input {
    padding-left: 10px;
    outline: none;
    border: 1px solid #D9DDEE;
}

input:focus {
    border: 1px solid #1B49FF;
}

.form-container::-webkit-scrollbar {
    height: .1rem;
    width: 7px;
}

.form-container::-webkit-scrollbar-track {
    background: rgb(241, 241, 241);
    border-radius: 8px;
}

.form-container::-webkit-scrollbar-thumb {
    background: #0f154d;
    border-radius: 8px;
}

.on-active {
    border: 1px solid #1B49FF;
    color: #1B49FF;
}

.feed-image {
    height: 164px;
    width: 100% !important;
    object-fit: fill;
    max-height: 164px !important;
}
</style>