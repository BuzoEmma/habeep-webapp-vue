<template>
    <div v-if="!onImageViewer"
        class="w-screen min-w-full flex flex-col items-center bg-white h-full min-h-screen overflow-y-auto scroll-smooth"
        @resize="changeWidth">
        <MainNavbar v-if="(screenWidth > 767)" />

        <img src="../../assets/images/rhombus-preloader.gif" class="m-auto" v-if="!processingProduct || !product.price"
            alt="">
        <div v-else
            class="body px-0 2xl:px-44 xl:px-20 mb-16 w-full flex flex-col h-fit items-center pb-10 md:items-start gap-y-8 mt-0 relative">

            <!-- product display images for desktop view -->
            <div class="product-img-grid desktop-view xl:flex flex-row items-center w-full mt-10 hidden">
                <div class="relative h-full display-img w-1/2">
                    <img :src="carouselImg.link" class=" h-full rounded-lg feed-image w-full"
                        v-if="carouselImg.link.toString().includes('mp4') == false" @click="enterImageViewer()" alt="">
                    <video :src="carouselImg.link" @click="enterImageViewer()" loop
                        class="w-full h-full rounded-lg feed-image" v-else autoplay muted></video>

                    <div class="w-full absolute flex flex-row top-5 items-center justify-between px-2">
                        <img src="../../assets/icons/back-img.svg" @click="$router.go(-1)" class="cursor-pointer" alt="">
                        <div class="flex flex-row gap-x-3 items-center">
                            <ShareNetwork network="whatsapp" popup.width="500px" popup.height="500px"
                                :url="'https://habeep.org/' + $route.fullPath"
                                :title="'Purchase this awesome house at ₦' + formatNumber(product.price)"
                                :description="product.description" :media="product.images[0].link">
                                <img src="../../assets/icons/share.svg" class="cursor-pointer" alt="">
                            </ShareNetwork>
                            <div class="grid place-items-center relative p-1" v-if="$store.state.isAuthenticated">
                                <img src="../../assets/icons/heart.svg" class="cursor-pointer" alt="">
                                <svg xmlns="http://www.w3.org/2000/svg" v-motion :initial="{ opacity: 0.8 }"
                                    :tapped="{ opacity: 1, y: 0, x: 0, scale: 1.2 }" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor"
                                    class="w-6 h-6 absolute top-3 text-white cursor-pointer" @click="saveAd(product._id)"
                                    :class="{ 'text-orange-400': $store.state.user.savedAds.includes(product._id) }">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex h-full flex-col w-1/2 pl-2 gap-y-2">
                    <div class="flex flex-row h-1/2 w-full items-center gap-2">
                        <div class="h-full w-1/2  cursor-pointer gap-2 overflow-hidden rounded-lg"
                            v-for="image in images.slice(1, 3)" :key="image">
                            <img :src="image.link" class=" h-full w-full rounded-lg feed-image-short"
                                v-if="image.link && image.link.toString().includes('mp4') === false"
                                @click="enterImageViewer()" :key="image" alt="">
                            <video :src="image.link" @click="enterImageViewer()" loop
                                class="w-full rounded-lg feed-image-short" v-else autoplay muted></video>
                        </div>
                    </div>
                    <div class=" flex flex-row h-1/2 w-full items-center gap-2">
                        <div class="w-1/2 cursor-pointer h-full overflow-hidden rounded-lg"
                            v-for="image in images.slice(3, 5)" :key="image">
                            <img :src="image.link" class=" h-full w-full rounded-md feed-image-short"
                                v-if="image.link && image.link.toString().includes('mp4') == false"
                                @click="enterImageViewer()" alt="">
                            <video :src="image.link" @click="enterImageViewer()" loop
                                class="w-full rounded-md feed-image-short" v-else autoplay muted></video>
                        </div>
                    </div>
                </div>
            </div>

            <!-- product display images for mobile / carousel -->

            <div class="product-img-carousel mobile-view xl:hidden flex items-center w-full relative">

                <div class="w-full absolute flex flex-row top-5 items-center justify-between md:px-8 px-2 z-10">
                    <img src="../../assets/icons/back-img.svg" @click="$router.go(-1)" class="cursor-pointer" alt="">
                    <div class="flex flex-row gap-x-3 items-center">
                        <ShareNetwork :popup="{ width: 400, height: 200 }" network="twitter"
                            :url="'https://habeep.org' + $route.fullPath"
                            :title="product.title + ' at ₦' + formatNumber(product.price)"
                            :description="product.description" :media="product.images[0].link">
                            <img src="../../assets/icons/share.svg" class="cursor-pointer" alt="">
                        </ShareNetwork>

                        <div class="grid place-items-center relative" v-if="$store.state.isAuthenticated">
                            <img src="../../assets/icons/heart.svg" class="cursor-pointer" alt="">
                            <svg xmlns="http://www.w3.org/2000/svg" v-motion :initial="{ opacity: 0.8 }"
                                v-if="$store.state.isAuthenticated" :tapped="{ opacity: 1, y: 0, x: 0, scale: 1.2 }"
                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-6 h-6 absolute top-2 text-white cursor-pointer" @click="saveAd(product._id)"
                                :class="{ 'text-orange-400': $store.state.user.savedAds.includes(product._id) }">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <img :src="carouselImg.link" class=" h-full w-full feed-image"
                    v-if="carouselImg.link && carouselImg.link.toString().includes('mp4') == false"
                    @click="enterImageViewer()" alt="">
                <video :src="carouselImg.link" loop class="w-full feed-image" @click="enterImageViewer()" v-else autoplay
                    muted></video>
                <!-- <img :src="images[activeCarouselImg - 1].link" class="h-full w-full new-img" :class="{'hidden': changeCarouselImg}"> -->

                <div class="flex flex-row items-center w-full absolute bottom-5 justify-between md:px-8 px-2">
                    <!-- just to take space 🤞 -->
                    <div class="px-6 py-2 rounded opacity-70 collapse" style="background: #161622;">
                        <span class="text-sm text-white font-medium">1/5</span>
                    </div>

                    <div class="flex flex-row items-center gap-x-1">
                        <div class="carousel-indicator md:w-4 md:h-4 h-3 w-3 rounded-full cursor-pointer"
                            @click="changeCarouselImg(indicator)"
                            :class="{ 'bg-white': indicator === activeCarouselImg, 'bg-gray-400': indicator !== activeCarouselImg }"
                            v-for="indicator in images.length" :key="indicator"></div>
                    </div>

                    <!-- main one now 😎 -->
                    <div class="px-6 py-2 rounded opacity-70" style="background: #161622;">
                        <span class="text-sm text-white font-medium">{{ (activeCarouselImg + '/' +
                            images.length)
                        }}</span>
                    </div>
                </div>
            </div>

            <!-- product details -->
            <div class="flex flex-col md:flex-row items-start w-full gap-x-4 h-fit justify-between px-6 sm:px-7 xl:px-0">
                <!-- product info -->
                <div class="flex flex-col items-start md:w-2/3 w-full xl:w-4/6 h-full pt-2">
                    <!-- top product info -->
                    <div class="flex flex-row main-info items-center w-full justify-between">
                        <div class="flex flex-col gap-y-2 w-fit">
                            <p
                                class="text-webapp text-2xl md:text-xl xl:text-2xl font-semibold xl:font-medium product-name">
                                {{ product.title }}</p>
                            <p
                                class="text-sub-webapp text-lg md:text-sm xl:text-lg product-location flex flex-row items-center gap-x-2">
                                <img src="../../assets/icons/map-pin-blue.svg" alt="">{{
                                    product.location.address + ', ' +
                                    product.location.city
                                }}
                            </p>
                        </div>
                        <div class="md:flex hidden flex-col ">
                            <p class="text-webapp text-2xl md:text-xl xl:text-2xl font-medium product-price">
                                <PriceFormatter :from="product.priceCurrency" :to="$store.state.user.currency"
                                    :amount="product.price" />
                            </p>
                            <p v-if="product.for === 'rent'"
                                class="text-sm  xl:text-lg font-medium product-price text-webapp flex flex-row justify-end">
                                Rent
                            </p>
                            <p v-else
                                class="text-sub-webapp text-sm xl:text-lg product-duration flex flex-row justify-end ">Sale
                            </p>

                        </div>
                    </div>

                    <div class="flex flex-row py-2 border-y mt-8 border-y-gray-200 w-full divide-x">
                        <div class="flex flex-col gap-y-2 items-center w-64 md:w-auto md:pr-20"
                            v-if="product.type !== 'land'">
                            <span class="text-2xl font-medium text-webapp">{{ product.bedrooms }}</span>
                            <span class="text-sm text-sub-webapp">Bedroom</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center w-64" v-if="product.type !== 'land'">
                            <span class="text-2xl font-medium text-webapp">{{ product.bedrooms }}</span>
                            <span class="text-sm text-sub-webapp">Bathroom</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center w-64" v-if="product.type === 'land'">
                            <span class="text-2xl font-medium text-webapp">{{ product.plots }}</span>
                            <span class="text-sm text-sub-webapp">Plots</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center w-64">
                            <span class="text-2xl font-medium text-webapp">{{ formatNumber(product.size) }}</span>
                            <span class="text-sm text-sub-webapp">Square feet</span>
                        </div>
                    </div>

                    <p class="text-xl font-medium mt-8 text-webapp">Features</p>
                    <div class="flex flex-row py-3 border-y mt-2 border-y-gray-200 w-full gap-x-3 overflow-x-auto flex-no-wrap"
                        v-if="product.type !== 'land'">
                        <div class="flex flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                            v-if="product.features.includes('electricity')">
                            <img src="../../assets/icons/light.svg" alt="">
                            <span class="text-sm text-sub-webapp">Electricity</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                            v-if="product.features.includes('water')">
                            <img src="../../assets/icons/water.svg" alt="">
                            <span class="text-sm text-sub-webapp">Water</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                            v-if="product.features.includes('parking')">
                            <img src="../../assets/icons/parking.svg" alt="">
                            <span class="text-sm text-sub-webapp">Parking</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                            v-if="product.features.includes('pool')">
                            <img src="../../assets/icons/pool.svg" alt="">
                            <span class="text-sm text-sub-webapp">Pool</span>
                        </div>
                    </div>
                    <div class="flex flex-row py-3 border-y mt-2 border-y-gray-200 w-full gap-x-3 overflow-x-auto flex-no-wrap"
                        v-else>
                        <div class="flex flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                            v-if="product.features.includes('access_road')">
                            <img src="../../assets/icons/listings/road.svg" class="w-5 h-5" alt="">
                            <span class="text-sm text-sub-webapp text-center">Access road</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                            v-if="product.features.includes('security')">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6 text-webapp">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                            <span class="text-sm text-sub-webapp">Security</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                            v-if="product.features.includes('surveyed')">
                            <img src="../../assets/icons/listings/surveyed.svg" class="w-6 h-6" alt="">
                            <span class="text-sm text-sub-webapp">Surveyed</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                            v-if="product.features.includes('c-of-o')">
                            <img src="../../assets/icons/listings/certificate.svg" class="w-6 h-6" alt="">
                            <span class="text-sm text-sub-webapp">C of O</span>
                        </div>
                    </div>
                </div>

                <!-- agent info desktop -->
                <div
                    class="agent-info md:flex hidden p-4 bg-white flex-col w-2/3 xl:w-2/6 2xl:w-1/4 items-start ml-3 h-fit">
                    <h3 class="text-lg xl:text-xl font-medium  text-webapp">Description</h3>

                    <div class="text-sub-webapp text-lg text-left mt-1 xl:mt-3">
                        <pre class="w-full whitespace-pre-wrap"
                            v-if="!openFullDesc">{{ product.description.slice(0, 250) }}<span class="text-primary cursor-pointer" v-if="product.description.length > 250" @click="openFullDesc = true">... Read more</span></pre>
                        <pre class="w-full whitespace-pre-wrap"
                            v-else>{{ product.description }} <span class="text-primary cursor-pointer" v-if="product.description.length > 250" @click="openFullDesc = false">..Hide</span></pre>
                    </div>
                    <hr class="my-3 text-gray-300 w-full">

                    <div class="flex flex-col xl:flex-row items-center w-full gap-y-1 xl:justify-between mt-1 xl:mt-3">

                        <button @click="changeAdStatus('CLOSED')" v-if="product.status === 'AVAILABLE'"
                            class="agent-btn cursor-pointer flex flex-row items-center justify-center text-sm font-medium  mr-2 text-white ml-2 bg-primary w-full">
                            <span v-if="!updatingStatus">Close ad</span>
                            <Preloader v-else />
                        </button>
                        <button @click="changeAdStatus('AVAILABLE')" v-else
                            class="agent-btn cursor-pointer flex flex-row items-center justify-center text-sm font-medium  w-1/2 mr-2 text-white ml-2 bg-primary xl:w-full">
                            <span v-if="!updatingStatus">Publish ad</span>
                            <Preloader v-else />
                        </button>
                    </div>
                </div>

                <!-- agent info mobile -->
                <div class="flex md:hidden p-4 bg-white mt-4 flex-col  items-start w-full h-fit">

                    <h3 class="text-lg font-medium text-webapp">Description</h3>

                    <div class="text-sub-webapp text-sm text-left mt-1 xl:mt-3">
                        <pre class="w-full whitespace-pre-wrap"
                            v-if="!openFullDesc">{{ product.description.slice(0, 250) }}<span class="text-primary" v-if="product.description.length > 250" @click="openFullDesc = true">... Read more</span></pre>
                        <pre class="w-full whitespace-pre-wrap"
                            v-else>{{ product.description }} <span class="text-primary" v-if="product.description.length > 250" @click="openFullDesc = false">..Hide</span></pre>
                    </div>

                    <div
                        class="flex md:hidden py-5  flex-row items-center fixed bottom-0 px-4 z-10 left-0 bg-white w-screen justify-between mt-4 border-t pt-2 border-t-gray-300">
                        <div class="flex flex-col">
                            <p class="text-webapp text-xl xl:text-2xl font-medium product-price">
                                <PriceFormatter :from="product.priceCurrency" :to="$store.state.user.currency"
                                    :amount="product.price" />
                            </p>

                            <p v-if="product.for === 'rent'"
                                class="text-sm md:text-xl xl:text-2xl font-medium product-price text-webapp">Rent
                            </p>
                            <p v-else
                                class="text-sub-webapp text-sm md:text-sm xl:text-lg product-duration flex flex-row justify-start ">
                                Sale</p>
                        </div>

                        <button @click="changeAdStatus('CLOSED')" v-if="product.status === 'AVAILABLE'"
                            class="agent-btn cursor-pointer flex flex-row items-center justify-center text-sm font-medium  w-3/5 mr-2 text-white ml-2 bg-primary xl:w-1/2">
                            <span v-if="!updatingStatus">Close ad</span>
                            <Preloader v-else />
                        </button>
                        <button @click="changeAdStatus('AVAILABLE')" v-else
                            class="agent-btn cursor-pointer flex flex-row items-center justify-center text-sm font-medium  w-3/5 mr-2 text-white ml-2 bg-primary xl:w-1/2">
                            <span v-if="!updatingStatus">Publish ad</span>
                            <Preloader v-else />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- image viewer -->
    <div v-else class="view-img w-screen flex flex-col items-center h-screen lg:p-8 overflow-hidden xl:p-12"
        style="background: #161622;">
        <div class="flex flex-row items-center w-full justify-between lg:p-0 p-6">
            <img src="../../assets/icons/x-bg.svg" @click="exitImageViewer()" class="cursor-pointer" alt="">
            <p class="text-2xl font-medium text-white">{{ (activeCarouselImg + '/' + images.length) }}</p>
            <div class="collapse"></div>
        </div>

        <div class="mt-6 flex flex-row items-center justify-between w-full h-fit gap-x-2 relative">
            <img src="../../assets/icons/back-circle.svg" v-if="activeCarouselImg > 1"
                @click="changeCarouselImg(activeCarouselImg - 1)" class="cursor-pointer lg:block absolute left-3 z-10"
                alt="">
            <div class="image-container h-fit flex flex-col items-center justify-center w-full">
                <img :src="carouselImg.link" v-if="carouselImg && carouselImg.link.includes('mp4') == false"
                    class="w-full h-full feed-image" alt="">
                <video :src="carouselImg.link" loop class="md:w-4/5 w-full rounded-lg feed-image"
                    @click="enterImageViewer()" v-else controls autoplay></video>
            </div>
            <img src="../../assets/icons/next-circle.svg" @click="changeCarouselImg(activeCarouselImg + 1)"
                v-if="activeCarouselImg < images.length" class="cursor-pointer lg:block absolute right-3 z-10" alt="">
        </div>

        <Toast :msg="errorMsg" type="danger" v-if="errorMsg.length > 0" />
        <Toast :msg="newMsg" type="success" v-if="newMsg.length > 0" />
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import MainNavbar from '../../components/MainNavbar.vue'
import axios from "../../composables/axios";
import { useRoute, useRouter } from 'vue-router'
import formatNumber from "number_formatter"
import saveAd from '../../composables/saveAd'
import { useStore } from 'vuex';


const url = '/listings/ads/get/';
const url2 = '/profile/get-agent/';

const carouselImg = ref(null)

const route = useRoute()
const router = useRouter()
const store = useStore()
const processingProduct = ref(false)
const product = ref({})
const agentDetails = ref({})

const changingCarousel = ref(false)
const inNewCarousel = ref(false)
const activeCarouselImg = ref(1)
const onImageViewer = ref(false)
const openFullDesc = ref(false)

const images = ref(null)


const getProduct = async () => {
    processingProduct.value = true
    const getProduct = await axios.get(url + route.params.id)
    processingProduct.value = true

    product.value = getProduct.data.product
    images.value = getProduct.data.product.images
    carouselImg.value = getProduct.data.product.images[0]

    data.description = product.value.description
    data.title = product.value.title
    data.price = product.value.price
    data.for = product.value.for

    getAgent(product.value.agentId)
}
async function getAgent(agentId) {
    const getAgent = await axios.get(url2 + agentId)
    agentDetails.value = getAgent.data.agent

    if (agentDetails.value.userId !== store.state.user._id) {
        router.replace('/not-found')
    }
}

function changeCarouselImg(value) {
    // changingCarousel.value = true
    let image = images.value[value - 1]
    activeCarouselImg.value = value
    carouselImg.value = image
}

// manage images viewer
function exitImageViewer() {
    onImageViewer.value = false

    const carouselInt = setInterval(() => {
        let value = activeCarouselImg.value + 1
        if (activeCarouselImg.value == images.value.length) {
            value = 1
        }
        changeCarouselImg(value)
    }, 5000);
}
function enterImageViewer() {
    onImageViewer.value = true
    clearInterval(carouselInt)
}

const carouselInt = setInterval(() => {
    let value = activeCarouselImg.value + 1
    if (activeCarouselImg.value == images.value.length) {
        value = 1
    }
    changeCarouselImg(value)
}, 5000);

const screenWidth = ref(window.innerWidth)

function changeWidth() {
    screenWidth.value = window.innerWidth
}

const newMsg = ref('')
const errorMsg = ref('')
const updatingStatus = ref(false)

async function changeAdStatus(status) {
    try {
        let data = {
            id: route.params.id,
            status: status
        }
        updatingStatus.value = true
        const update = await axios.patch('/listings/agent/change-status', data)
        product.value.status = status

        updatingStatus.value = false
        newMsg.value = update.data.message
    } catch (error) {
        updatingStatus.value = false
        if (error.response) {
            errorMsg.value = error.response.data.message
        } else {
            errorMsg.value = error.message
        }
    }
}

onMounted(() => {
    getProduct()
})

</script>

<style scoped>
.product-img-grid {
    max-height: 538px;
    height: 538px;
}

.product-img-carousel {
    max-height: 400px;
    height: 400px;
}

.agent-info {
    background: #FFFFFF;
    /* Habeep grey/grey 4 */

    border: 1px solid #EBEBEB;
    box-shadow: 0px 8px 30px -6px rgba(24, 39, 75, 0.12), 0px 14px 88px -4px rgba(24, 39, 75, 0.12);
    border-radius: 10px;
}

.agent-btn {
    border: 1px solid #3E64F9;
    border-radius: 5px;
    height: 50px;
}

.agent-btn-mobile {
    border: 1px solid #3E64F9;
    border-radius: 5px;
}

.image-container {
    height: 80vh;
}

.feed-image-short {
    width: 100% !important;
    object-fit: cover;
}

.feed-image {
    width: 100% !important;
    object-fit: cover;
    height: 100% !important;
}</style>