<template>
    <div class="fixed w-screen h-screen top-0 opacity-50 overflow-hidden max-h-screen" v-if="onModal"
        style="background: #161622"></div>

    <!-- <div class="w-screen h-screen flex-col flex items-center justify-center">
        </div> -->

    <div class="w-full min-h-screen flex-col h-screen flex items-center justify-center">
        <img src="../../../assets/images/rhombus-preloader.gif" v-if="!agentDetails.userId" alt="">
        <div class="w-screen min-w-full flex flex-col items-center bg-white h-full min-h-screen overflow-y-auto" v-else
            :class="{ 'max-h-screen overflow-y-hidden': onModal }" resize="changeWidth">
            <MainNavbar v-if="(screenWidth > 767)" />

            <div class="flex flex-row items-center justify-between w-full px-6 2xl:px-44 md:px-20 my-4" v-else>
                <div class="flex flex-row items-center gap-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="#0A1045" class="w-6 h-6 cursor-pointer" @click="$router.go(-1)">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <span class="text-xl text-webapp font-medium capitalize">{{ agentDetails.name.fname }} Profile</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0A1045"
                    class="w-6 h-6 collapse">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>

            </div>

            <div
                class="body px-6 2xl:px-44 md:px-20 mb-10 w-full flex flex-col gap-y-8 lg:flex-row h-fit gap-x-3 items-center md:items-start  mt-10">
                <!-- agent basic info -->
                <div
                    class="agent-info flex p-4 bg-white flex-col border border-gray-300 rounded w-full lg:w-2/6 2xl:w-1/4 items-start lg:ml-3 h-fit">
                    <div class="flex flex-row gap-x-3 items-start">
                        <div class="rounded-full w-24 h-24 grid place-items-center border border-gray-100">
                            <img :src="agentDetails.profileImg"
                                class="w-24 h-24 min-h-full min-w-full rounded-full cursor-pointer"
                                v-if="agentDetails.profileImg !== 'https://i.ibb.co/gtpxMJz/21.png'" alt="">
                            <Avatar size="100%" v-else :fname="agentDetails.name.fname"
                                :lname="agentDetails.name.surname" />
                        </div>
                        <div class="flex flex-col ">
                            <span class="text-xl md:text-center text-left agent-name text-webapp font-medium">{{
                                agentDetails.name.fname + ' ' + agentDetails.name.surname
                            }}</span>
                            <p class="text-lg agent-ads-count text-sub-webapp flex flex-row gap-x-2 items-center"><img
                                    src="../../../assets/images/map-pin.png" alt="">
                                <span v-if="agentDetails.city">{{ agentDetails.city }}</span>
                                <span class="capaitalize" v-else>{{ agentDetails.nationality }}</span>
                            </p>
                        </div>
                    </div>

                    <div class="flex flex-row items-center w-full gap-x-4 mt-3">
                        <p class="text-xl font-webapp font-medium flex flex-row gap-x-1">{{ agentDetails.ads.length }}<span
                                class="text-sub-webapp text-lg">Ads</span></p>
                        <p class="text-xl font-webapp font-medium flex flex-row gap-x-1">{{
                            agentDetails.followers.length
                        }}<span class="text-sub-webapp text-lg">Followers</span></p>
                        <p class="text-xl font-webapp font-medium flex flex-row gap-x-1 cursor-pointer"
                            v-if="$store.state.isAuthenticated" @click="openModal">
                            {{ agentDetails.following.length }}<span class="text-sub-webapp text-lg">Following </span></p>
                        <p class="text-xl font-webapp font-medium flex flex-row gap-x-1 cursor-pointer" v-else>
                            {{ agentDetails.following.length }}<span class="text-sub-webapp text-lg">Following </span></p>
                    </div>

                    <h3 class="text-lg xl:text-xl font-medium  text-webapp mt-3">Bio</h3>

                    <p class="text-sub-webapp text-sm text-left w-full sm:w-5/6 lg:w-full mt-1 xl:mt-2"
                        v-if="agentDetails.bio">{{
                            agentDetails.bio
                        }}
                    </p>
                    <p class="text-sub-webapp text-sm text-left w-full sm:w-5/6 lg:w-full mt-1 xl:mt-2" v-else>
                        I'm <span v-if="agentDetails.role === 'AGENT'">an</span><span v-else>a</span> <span
                            class="font-black text-primary uppercase">{{ agentDetails.role }}</span>
                    </p>


                    <div class="flex flex-row items-center w-full gap-y-1 xl:justify-between mt-4 xl:mt-3"
                        v-if="$store.state.isAuthenticated && $store.state.user._id !== agentDetails.userId">
                        <button @click="manageAgentFollow"
                            v-if="agentDetails.followers.includes($store.state.user._id) === false"
                            class="agent-btn flex-row items-center justify-center text-sm font-medium text-white w-1/2 bg-primary">Follow</button>
                        <button @click="manageAgentFollow" v-else
                            class="agent-btn flex-row items-center justify-center text-sm font-medium text-primary w-1/2">Unfollow</button>


                        <button @click="createChatRoom()"
                            class="agent-btn flex flex-row items-center justify-center text-sm font-medium  text-primary ml-2 bg-white w-1/2">
                            <Preloader v-if="creatingRoom" />
                            <span v-else>Message</span>
                        </button>
                    </div>
                    <div class="flex flex-row items-center w-full mt-4 xl:mt-3"
                        v-if="$store.state.isAuthenticated && $store.state.user._id === agentDetails.userId">
                        <button @click="$router.push('/user/profile/' + agentDetails.userId)"
                            class="user-btn flex flex-row items-center justify-center text-sm font-medium text-black ml-2 bg-white w-full">View
                            Profile</button>
                    </div>
                    <div class="flex flex-row items-center w-full mt-4 xl:mt-3 ">
                        <ShareNetwork :popup="{ width: 400, height: 200 }" network="whatsapp" class="w-full"
                            :url="'https://habeep.org/' + agentDetails.name.username" title="Share this profile">
                            <button
                                class="agent-btn flex flex-row items-center justify-center text-sm font-medium text-primary bg-white w-full">Share
                                Profile</button>
                        </ShareNetwork>
                    </div>
                </div>


                <!-- listing -->

                <div class="flex flex-col items-start w-full lg:w-4/5">
                    <div class="flex flex-row gap-x-3 border-b border-b-gray-300 w-full">
                        <div class="cursor-pointer flex flex-row items-center justify-center w-16  pb-1"
                            @click="changeTab(1)" :class="{ 'text-blue-600 border-b-blue-700 border-b-2': openTab === 1 }">
                            Ads
                        </div>
                        <div class="cursor-pointer flex flex-row items-center justify-center w-24 pb-1"
                            @click="changeTab(2)" :class="{ 'text-blue-600 border-b-blue-700 border-b-2': openTab === 2 }">
                            Saved ads
                        </div>
                    </div>

                    <div class="ads-tab w-full h-full mt-6" v-if="(openTab === 1) && agentDetails.ads" id="ads-tab">
                        <div class="flex flex-col h-full w-full items-center gap-y-3 justify-center"
                            v-if="agentDetails.ads.length === 0">
                            <img src="../../../assets/icons/no-ad.svg" alt="">
                            <span class="text-gray-300 text-lg">No ads yet</span>
                        </div>

                        <div class="flex flex-row h-fit flex-wrap" v-else>
                            <!-- listing template -->
                            <div class="md:basis-1/2 xl:basis-1/3 basis-full md:px-3 md:py-3 py-5 px-0 "
                                v-for="ad in agentDetails.ads" :key="ad">
                                <div
                                    class="flex flex-col items-start gap-y-2 relative border rounded-md border-gray-200 pb-2 feed">
                                    <img @click="$router.push('/listings/products/' + ad._id)" :src="ad.images[0].link"
                                        class="w-full h-full rounded-t-md feed-image"
                                        v-if="ad.images[0].link.includes('mp4') == false" alt="">
                                    <video @click="$router.push('/listings/products/' + ad._id)" :src="ad.images[0].link"
                                        class="w-full rounded-t-md feed-image" v-else autoplay muted></video>
                                    <p class="text-webapp text-lg font-medium w-full mx-3 cursor-pointer"
                                        @click="$router.push('/listings/products/' + ad._id)">
                                        {{ ad.title }}
                                        <span class="text-sm ">@</span>
                                        {{ (ad.location.city || ad.location.address.substr(0, 20)) }}
                                    </p>

                                    <div class="location flex flex-row items-center gap-x-2 px-2">
                                        <img src="../../../assets/images/map-pin.png" alt="">
                                        <span class="text-sm text-webapp capitalize">{{ ad.location.city ||
                                            ad.location.address.substr(0, 20) }}</span>
                                    </div>

                                    <div class="flex flex-row items-center w-full justify-between px-3">
                                        <span class="text-sm text-webapp font-medium">
                                            ₦{{
                                                formatNumber(ad.price)
                                            }}
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" v-motion :initial="{ opacity: 0.8 }"
                                            v-if="$store.state.isAuthenticated"
                                            :tapped="{ opacity: 1, y: 0, x: 0, scale: 1.2 }" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer"
                                            @click="saveAd(ad._id)"
                                            :class="{ 'text-orange-400': $store.state.user.savedAds.includes(ad._id) }">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>

                                    </div>

                                    <div class="rounded border border-white px-2 py-1 absolute top-5 right-5"
                                        v-if="ad.distance">
                                        <span class="text-white text-sm text-center" v-if="ad.distance">{{
                                            Math.round(ad.distance) }} KM
                                            Away</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="saved-ads-tab w-full h-full mt-6" v-if="(openTab === 2) && agentDetails.savedAds"
                        id="ads-tab">
                        <div class="flex flex-col h-full w-full items-center gap-y-3 justify-center"
                            v-if="agentDetails.savedAds.length === 0">
                            <img src="../../../assets/icons/no-ad.svg" alt="">
                            <span class="text-gray-300 text-lg">No saved ads yet</span>
                        </div>
                        <div class="flex flex-row h-fit flex-wrap">

                            <!-- listing template -->
                            <div class="md:basis-1/2 xl:basis-1/3 basis-full md:px-3 md:py-3 py-5 px-0 "
                                v-for="ad in agentDetails.savedAds" :key="ad">
                                <div
                                    class="flex flex-col items-start gap-y-2 relative border rounded-md border-gray-200 pb-2 feed">
                                    <img @click="$router.push('/listings/products/' + ad._id)" :src="ad.images[0].link"
                                        class="w-full h-full rounded-t-md feed-image"
                                        v-if="ad.images[0].link.includes('mp4') == false" alt="">
                                    <video @click="$router.push('/listings/products/' + ad._id)" :src="ad.images[0].link"
                                        class="w-full rounded-t-md feed-image" v-else autoplay muted></video>
                                    <p class="text-webapp text-lg font-medium w-full mx-3 cursor-pointer"
                                        @click="$router.push('/listings/products/' + ad._id)">
                                        {{ ad.title }}
                                        <span class="text-sm ">@</span>
                                        {{ (ad.location.city || ad.location.address.substr(0, 20)) }}
                                    </p>

                                    <div class="location flex flex-row items-center gap-x-2 px-2">
                                        <img src="../../../assets/images/map-pin.png" alt="">
                                        <span class="text-sm text-webapp capitalize">{{ ad.location.city ||
                                            ad.location.address.substr(0, 20) }}</span>
                                    </div>

                                    <div class="flex flex-row items-center w-full justify-between px-3">
                                        <span class="text-sm text-webapp font-medium">
                                            ₦{{
                                                formatNumber(ad.price)
                                            }}
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" v-motion :initial="{ opacity: 0.8 }"
                                            v-if="$store.state.isAuthenticated"
                                            :tapped="{ opacity: 1, y: 0, x: 0, scale: 1.2 }" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer"
                                            @click="saveAd(ad._id)"
                                            :class="{ 'text-orange-400': $store.state.user.savedAds.includes(ad._id) }">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>

                                    </div>

                                    <div class="rounded border border-white px-2 py-1 absolute top-5 right-5"
                                        v-if="ad.distance">
                                        <span class="text-white text-sm text-center">{{ Math.round(ad.distance) }} KM
                                            Away</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Following @close="closeModal" v-if="onModal" :users="agentDetails.following" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainNavbar from '../../../components/MainNavbar.vue'
import Following from './components/modal/Following.vue'
import axios from "../../../composables/axios";
import formatNumber from "number_formatter"
import saveAd from '../../../composables/saveAd'
import calculateDistance from '../../../composables/getAdDistance.js'
import { useStore } from 'vuex';

const route = useRoute()
const router = useRouter()
const store = useStore()

const title = ref('Habeep | ' + route.params.username + ' Profile')
const content = ref('View more information about @' + route.params.username)
const img = ref('https://i.ibb.co/DtbR0BW/user.png')
import { useHead } from '@vueuse/head'

useHead({
    title: () => title.value,
    meta: [
        { charset: 'utf-8' },
        { name: 'description', content: () => content.value },
        { name: 'og:title', content: () => title.value },
        { name: 'og:url', content: 'https://habeep.org/' + route.params.username },
        { name: 'og:website', content: 'website' },
        { name: 'og:description', content: () => content.value },

        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
})


const url1 = '/listings/ads/get/'
const url2 = '/profile/get-agent/';

const openTab = ref(1)
const onModal = ref(false)

const agentDetails = ref({})
const ads = ref([])


async function getAgent() {
    try {
        const getAgent = await axios.get(url2 + route.params.username)
        agentDetails.value = getAgent.data.agent
        title.value = 'Habeep | ' + agentDetails.value.name.username + ' Profile'
        img.value = agentDetails.value.profileImg

        useHead({
            link: [
                { rel: 'icon', href: () => img.value },
                { rel: 'shortcut icon', href: () => img.value },
            ],
            meta: [
                { name: 'og:image', content: () => img.value },
            ]
        })

        // set google seo
        const structuredData = {
            "@context": "http:\/\/schema.org\/",
            "name": agentDetails.value.name.fname + ' ' + agentDetails.value.name.surname,
            "@type": "Person",
            "email": agentDetails.value.email,
            "sameAs": [
                `https:\/\/habeep.org\/${agentDetails.value.name.username}`,
            ]
        }

        const script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);

        agentDetails.value.ads.forEach(async product => {
            const distance = await calculateDistance(product.location.city || product.location.address + ', Nigeria')
            product.distance = distance
        })
    } catch (error) {
        router.replace({ name: 'not-found-route' })
    }
}

function changeTab(tab) {
    openTab.value = tab
}

function openModal() {
    onModal.value = true
}
function closeModal() {
    onModal.value = false
}



const creatingRoom = ref(false)

async function createChatRoom() {
    try {
        if (store.state.isAuthenticated) {
            creatingRoom.value = true
            const create = await axios.post('/messaging/create-room', {
                users: [store.state.user._id, agentDetails.value.userId]
            })

            creatingRoom.value = false
            router.push('/chats?roomId=' + create.data.room._id)
        } else {
            router.push('/login?redirect=' + route.fullPath)
        }
    } catch (error) {
        creatingRoom.value = false
    }
}

const screenWidth = ref(window.innerWidth)

function changeWidth() {
    screenWidth.value = window.innerWidth
}

async function manageAgentFollow() {
    if (!agentDetails.value.followers.includes(store.state.user._id)) {
        let data = {
            userId: agentDetails.value.userId,
            activity: 'follow'
        }

        agentDetails.value.followers.push(store.state.user._id)
        await axios.post('/profile/follows/update', data)
    } else {
        let data = {
            userId: agentDetails.value.userId,
            activity: 'unfollow'
        }

        agentDetails.value.followers.splice(agentDetails.value.followers.indexOf(store.state.user._id))
        await axios.post('/profile/follows/update', data)
    }
}

onMounted(() => {
    getAgent()
})
</script>

<style scoped>
.agent-btn {
    border: 1px solid #3E64F9;
    border-radius: 5px;
    height: 50px;
}

.user-btn {
    border: 1px solid #D9DDEE;
    border-radius: 5px;
    height: 50px;
}

.feed-image {
    height: 164px;
    width: 100% !important;
    object-fit: cover;
    max-height: 164px !important;
}
</style>