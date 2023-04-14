<template>
    <div class="fixed w-screen h-screen top-0 opacity-50 overflow-hidden max-h-screen" v-if="onModal"
        style="background: #161622"></div>

    <!-- <div class="w-screen h-screen flex-col flex items-center justify-center">
        </div> -->

    <div class="w-full min-h-screen flex-col h-screen flex items-center justify-center">
        <img src="../../../assets/images/rhombus-preloader.gif"  v-if="!agentDetails.id" alt="">
        <div class="w-screen min-w-full flex flex-col items-center bg-white h-full min-h-screen overflow-y-auto" v-else
            :class="{ 'max-h-screen overflow-y-hidden': onModal }" resize="changeWidth">
            <MainNavbar v-if="(screenWidth > 767)" />

            <div class="flex flex-row items-center justify-between w-full px-6 2xl:px-44 md:px-20 my-4" v-else>
                <div class="flex flex-row items-center gap-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="#0A1045" class="w-6 h-6 cursor-pointer" @click="$router.go(-1)">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <span class="text-xl text-webapp font-medium">Agent profile</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0A1045"
                    class="w-6 h-6">
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
                            <img :src="agentDetails.profileImg" class="w-24 rounded-full h-24" alt="">
                        </div>
                        <div class="flex flex-col ">
                            <span class="text-xl md:text-center text-left agent-name text-webapp font-medium">{{
                                agentDetails.name.fname + ' ' + agentDetails.name.surname
                            }}</span>
                            <p class="text-lg agent-ads-count text-sub-webapp flex flex-row gap-x-2 items-center"><img
                                    src="../../../assets/images/map-pin.png" alt="">{{ agentDetails.city }}</p>
                        </div>
                    </div>

                    <div class="flex flex-row items-center w-full gap-x-4 mt-3">
                        <p class="text-xl font-webapp font-medium flex flex-row gap-x-1">{{ agentDetails.ads.length }}<span
                                class="text-sub-webapp text-lg">Ads</span></p>
                        <p class="text-xl font-webapp font-medium flex flex-row gap-x-1">{{
                            agentDetails.followers.length
                        }}<span class="text-sub-webapp text-lg">Followers</span></p>
                        <p class="text-xl font-webapp font-medium flex flex-row gap-x-1 cursor-pointer" @click="openModal">
                            {{ agentDetails.following.length }}<span class="text-sub-webapp text-lg">Following </span></p>
                    </div>

                    <h3 class="text-lg xl:text-xl font-medium  text-webapp mt-3">Bio</h3>

                    <p class="text-sub-webapp text-sm text-left w-full sm:w-5/6 lg:w-full mt-1 xl:mt-2">{{
                        agentDetails.bio
                    }}
                    </p>


                    <div class="flex flex-row items-center w-full gap-y-1 xl:justify-between mt-4 xl:mt-3"
                        v-if="$store.state.user._id !== agentDetails.userId">
                        <button
                            class="agent-btn flex-row items-center justify-center text-sm font-medium text-white text-primary w-1/2 bg-primary"
                            @click="FollowUser">Follow</button>
                        <button
                            class="agent-btn flex flex-row items-center justify-center text-sm font-medium  text-primary ml-2 bg-white w-1/2">Message</button>
                    </div>
                    <div class="flex flex-row items-center w-full mt-4 xl:mt-3" v-else>
                        <button @click="$router.push('/user/profile/' + $route.params.id)"
                            class="agent-btn flex flex-row items-center justify-center text-sm font-medium  text-primary ml-2 bg-white w-full">View
                            Profile</button>
                    </div>
                </div>


                <!-- listing -->

                <div class="flex flex-col items-start w-full lg:w-4/5">
                    <div class="flex flex-row gap-x-3 border-b border-b-gray-300 w-full">
                        <div class="cursor-pointer flex flex-row items-center justify-center w-16  pb-1"
                            @click="changeTab(1)" :class="{ 'text-blue-600 border-b-blue-700 border-b-2': openTab === 1 }">
                            Ads
                        </div>
                        <div class="cursor-pointer hidden flex-row items-center justify-center w-24 pb-1"
                            v-if="$store.state.user._id && agentDetails.userId === $store.state.user._id" @click="changeTab(2)"
                            :class="{ 'text-blue-600 border-b-blue-700 border-b-2': openTab === 2 }">
                            Saved ads
                        </div>
                    </div>

                    <div class="ads-tab w-full h-full mt-6" v-if="(openTab === 1) && agentDetails.ads" id="ads-tab">
                        <div class="flex flex-row flex-auto h-fit  flex-wrap">

                            <!-- listing template -->
                            <div class="md:basis-1/2 xl:basis-1/3 md:px-3 md:py-3 py-5 px-0 " v-for="ad in agentDetails.ads"
                                :key="ad">
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
                                        <span class="text-sm ">at</span>
                                        {{ (ad.location.city || ad.location.address.substr(0, 20)) }}
                                    </p>

                                    <div class="location flex flex-row items-center gap-x-2 px-2">
                                        <img src="../../../assets/images/map-pin.png" alt="">
                                        <span class="text-sm text-webapp capitalize">{{ ad.location.city ||
                                            ad.location.address.substr(0, 20) }}</span>
                                    </div>

                                    <div class="flex flex-row items-center w-full justify-between px-3">
                                        <span class="text-sm text-webapp font-medium">
                                            N{{
                                                formatNumber(ad.price)
                                            }}
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" v-motion :initial="{ opacity: 0.8 }"
                                            :tapped="{ opacity: 1, y: 0, x: 0, scale: 1.2 }" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer"
                                            @click="saveAd(ad._id)"
                                            :class="{ 'text-orange-400': $store.state.user.savedAds.includes(ad._id) }">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>

                                    </div>

                                    <div class="rounded border border-white px-2 py-1 absolute top-5 right-5">
                                        <span class="text-white text-sm text-center">Around you</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Following @close="closeModal" v-if="onModal" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MainNavbar from '../../../components/MainNavbar.vue'
import Following from './components/modal/Following.vue'
import axios from "../../../composables/axios";
import formatNumber from "number_formatter"
import saveAd from '../../../composables/saveAd'

const route = useRoute()

const url1 = '/listings/ads/get/'
const url2 = '/profile/get-agent/';

const openTab = ref(1)
const onModal = ref(false)

const agentDetails = ref({})
const ads = ref([])

async function getAgent() {
    const getAgent = await axios.get(url2 + route.params.id)
    agentDetails.value = getAgent.data.agent
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


const screenWidth = ref(window.innerWidth)

function changeWidth() {
    screenWidth.value = window.innerWidth
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

.feed-image {
    height: 164px;
    width: 100% !important;
    object-fit: cover;
    max-height: 164px !important;
}

.feed {
    height: 291px !important;
    max-height: 291px !important;
}</style>