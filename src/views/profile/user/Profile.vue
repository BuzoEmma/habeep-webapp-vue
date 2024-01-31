<template>
    <div class="absolute z-50 w-screen h-screen flex flex-row items-center justify-center  margin-auto" v-if="onModal"
        style="background: rgb(22, 22, 34, 0.5)">

        <EditUserProfile @close="closeModal" @changePin="closeAndOpen('changePincode')"
            v-if="onModal && editProfileModal" />
        <pincodeModal @close="closeModal" @back="goBack" v-if="onModal && changePincode" />
        <FollowingPage transition="bounceUp" @close="closeModal" v-if="onModal && FollowingModal"
            :users="$store.state.user.following" v-motion :initial="{ opacity: 0.5, y: 100, x: 100 }"
            :enter="{ opacity: 1, y: 0, x: 0 }" />
        <FollowersPage @close="closeModal" v-if="onModal && FollowersModal" :users="$store.state.user.followers" v-motion
            :initial="{ opacity: 0.5, y: 100, x: 100 }" :enter="{ opacity: 1, y: 0, x: 0 }" />
        <Affiliate @close="closeModal" v-if="onModal && affiliateModal" @openReferral="closeAndOpen('referralModal')" />
        <Referrals @close="closeAndOpen('affiliateModal')" @closeModals="closeModal" v-if="onModal && referralModal" />
    </div>

    <div class="product-share w-full h-full absolute flex flex-col items-center md:justify-center justify-end z-50 overflow-hidden backdrop-blur-md bg-black bg-opacity-10"
        v-if="onProductShare === true">
        <ShareModal class="md:flex hidden" v-motion-fade :user="$store.state.user" @end-share="onProductShare = false" />
        <ShareModal class="flex md:hidden" v-motion-slide-bottom :user="$store.state.user"
            @end-share="onProductShare = false" />
    </div>

    <div class="w-screen min-w-full flex flex-col items-center main bg-white h-full min-h-screen overflow-y-auto"
        :class="{ 'max-h-screen overflow-y-hidden overflow-hidden opacity-40': onModal, 'overflow-y-hidden h-screen no-scroll-btn': onProductShare }"
        resize="changeWidth">
        <ProfileNavbar @toggleSearch="toggleSearch" />


        <div
            class="body px-6 2xl:px-44 md:px-20 mb-10 w-full flex flex-col gap-y-8 lg:flex-row h-full gap-x-3 items-center md:items-start  mt-10">

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

            <!-- user basic info -->
            <div class="w-full lg:w-2/6 max-w-fit lg:ml-3 h-fit flex flex-col items-center gap-y-8 left">
                <div class="user-info flex p-4 bg-white flex-col border items-start border-gray-200 rounded w-full h-full">
                    <div class="flex flex-row gap-x-3 items-start">
                        <div class="rounded-full w-24 h-24 grid place-items-center border">
                            <img :src="$store.state.user.userProfileImage"
                                class="w-24 h-24 min-h-full min-w-full rounded-full cursor-pointer"
                                v-if="$store.state.user.userProfileImage !== 'https://i.ibb.co/gtpxMJz/21.png'" alt="">
                            <Avatar size="100%" v-else :fname="$store.state.user.fname"
                                :lname="$store.state.user.surname" />
                        </div>
                        <div class="flex flex-col w-fit mt-2">
                            <span class="text-xl w-full whitespace-nowrap text-left agent-name text-webapp font-medium">{{
                                $store.state.user.surname + ' ' + $store.state.user.fname
                            }}</span>

                            <p class="text-lg agent-ads-count text-sub-webapp flex flex-row gap-x-2 items-center"><img
                                    src="../../../assets/images/map-pin.png" alt="">{{ $store.state.user.nationality }}</p>

                            <div
                                class="flex flex-row items-center w-full gap-x-2 mt-3 justify-between overflow-x-auto no-scroll-btn">
                                <p class="text-lg font-webapp flex flex-col items-center"
                                    v-if="$store.state.user.role === 'AGENT' && agentDetails.ads">
                                    {{ agentDetails.ads.length }}
                                    <span class="text-sub-webapp text-sm">Ads
                                    </span>
                                </p>
                                <p class="text-lg font-webapp flex flex-col items-center">
                                    {{ $store.state.user.savedAds.length }}
                                    <span class="text-sub-webapp text-sm">Saved
                                    </span>
                                </p>
                                <p class="text-lg font-webapp flex flex-col items-center cursor-pointer"
                                    @click="openModal('FollowingModal')">
                                    {{
                                        $store.state.user.following.length
                                    }}<span class="text-sub-webapp text-sm">Following </span>
                                </p>
                                <p class="text-lg font-webapp flex flex-col items-center cursor-pointer"
                                    @click="openModal('FollowersModal')">
                                    {{
                                        $store.state.user.followers.length
                                    }}<span class="text-sub-webapp text-sm">Followers </span>
                                </p>
                            </div>
                        </div>
                    </div>




                    <div class="flex flex-col md:flex-row items-center w-full gap-y-1 xl:justify-between mt-4 xl:mt-3">
                        <button v-if="$store.state.user.role === 'AGENT' || $store.state.user.role === 'TENANT'"
                            @click="openModal('affiliateModal')"
                            class="user-btn flex-row items-center justify-center text-sm font-medium text-webapp w-full bg-white">Affiliate
                            profile</button>
                        <button @click="openModal('editProfileModal')"
                            class="user-btn flex flex-row items-center justify-center text-sm font-medium text-webapp bg-white w-full"
                            :class="{ 'w-full md:ml-2': $store.state.user.role === 'AGENT' }">Edit
                            profile</button>
                    </div>
                    <div class="flex flex-row items-center w-full mt-2">
                        <button @click="startProductShare"
                            class="agent-btn flex flex-row items-center justify-center text-sm font-medium text-primary bg-white w-full">Share
                            Profile</button>
                    </div>
                </div>

                <div v-if="screenWidth > 767"
                    class="wallet-info flex py-2 bg-white flex-col border items-start border-gray-300 rounded w-full h-full">
                    <div class="flex flex-row items-center p-2 justify-center w-full border-b border-b-gray-200"><span
                            class="text-webapp text-xl font-medium">Wallet</span></div>

                    <!-- toogle wallet -->
                    <div class="flex flex-row justify-between px-6 border-b border-b-gray-200 w-full ">
                        <div class="cursor-pointer flex flex-row items-center justify-center w-24 pb-1 py-2"
                            @click="changeWalletTab(1)"
                            :class="{ 'text-blue-600 border-b-blue-700 border-b-2': walletTab === 1 }">
                            {{ $store.state.user.currency }}
                        </div>
                        <div class="cursor-pointer flex flex-row items-center justify-center w-24 pb-1 py-2"
                            @click="changeWalletTab(2)"
                            :class="{ 'text-blue-600 border-b-blue-700 border-b-2': walletTab === 2 }">
                            HBP
                        </div>
                    </div>

                    <div class="px-20 py-10 w-full">
                        <Currency v-if="walletTab === 1" />
                        <HBP v-if="walletTab === 2" />
                    </div>
                </div>
            </div>


            <!-- ads tab  -->

            <div class="flex flex-col min-h-full items-start w-full h-full">
                <div class="flex flex-row gap-x-3 border-b border-b-gray-200 w-full">
                    <div class="cursor-pointer flex flex-row items-center justify-center w-24  pb-1"
                        v-if="$store.state.user.role === 'AGENT'" @click="changeTab(1)"
                        :class="{ 'text-blue-600 border-b-blue-700 border-b-2': openTab === 1 }">
                        Agent Ads
                    </div>
                    <div class="cursor-pointer flex flex-row items-center justify-center w-24 pb-1" @click="changeTab(2)"
                        :class="{ 'text-blue-600 border-b-blue-700 border-b-2': openTab === 2 }">
                        Saved ads
                    </div>
                </div>

                <!-- user as agent posted ads -->
                <div class="ads-tab w-full h-full mt-6 flex flex-row  justify-center"
                    :class="{ 'md:items-center': !agentDetails || agentDetails.ads.length === 0 }"
                    v-if="(openTab === 1 && agentDetails.ads)" id="ads-tab">
                    <div class="flex flex-col items-center gap-y-3 md:justify-center"
                        v-if="!agentDetails || agentDetails.ads.length === 0">
                        <img src="../../../assets/icons/no-ad.svg" alt="">
                        <span class="text-gray-300 text-lg">No ads yet</span>
                    </div>
                    <div class="flex-row flex-auto h-fit flex flex-wrap w-full " v-else>

                        <!-- listing template -->
                        <div class="basis-full md:basis-1/2 xl:basis-1/3 md:px-3 md:py-3 py-5 px-0"
                            v-for="ad in agentDetails.ads" :key="ad">
                            <div class="flex flex-col items-start gap-y-2  border rounded-md border-gray-200 pb-2 ad feed">
                                <Skeleton v-if="!ad.imageLoaded" class=" w-full h-full rounded-t-md feed-image"
                                    style="width: 100%" />
                                <img @click="$router.push('/listings/products/' + ad._id)"
                                    :class="{ 'hidden': !ad.imageLoaded }" :src="ad.images[0].link"
                                    @load="ad.imageLoaded = true" class="w-full rounded-t-md feed-image"
                                    v-if="ad.images[0] && ad.images[0].link && ad.images[0].link.includes('mp4') == false"
                                    alt="">
                                <video @loadedmetadata="ad.imageLoaded = true" :class="{ 'hidden': !ad.imageLoaded }"
                                    @click="$router.push('/listings/products/' + ad._id)" preload="metadata"
                                    :src="ad.images[0] && ad.images[0].link" class="w-full rounded-t-md feed-image" v-else
                                    @touchstart="playVideo" @touchend="pauseVideo" @mouseenter="playVideo"
                                    @mouseout="pauseVideo" muted loop></video>

                                <p class="text-webapp text-lg font-medium w-full px-3 cursor-pointer"
                                    @click="$router.push('/listings/products/' + ad._id)">
                                    {{ ad.title }}
                                </p>

                                <div class="location flex flex-row items-center gap-x-2 px-2">
                                    <img src="../../../assets/images/map-pin.png" alt="">
                                    <span class="text-sm text-webapp capitalize">{{ ad.location.city ||
                                        ad.location.address.substr(0, 20) }}</span>
                                </div>

                                <div class="flex flex-row items-center w-full justify-between px-3">
                                    <p class="text-sm text-webapp font-medium">
                                        <PriceFormatter :from="ad.priceCurrency" :to="$store.state.user.currency"
                                            :amount="ad.price" /> /
                                        <span v-if="ad.for === 'rent'">Rent</span>
                                        <span v-if="ad.for === 'sale'">Sale</span>
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" v-if="$store.state.isAuthenticated" fill="none"
                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                        class="w-6 h-6 cursor-pointer transition-all" @click="saveAd(ad._id)"
                                        :class="{ 'text-orange-400 scale-[1] opacity-100': $store.state.user.savedAds.includes(ad._id), 'scale-[0.8] opacity-80': !$store.state.user.savedAds.includes(ad._id) }">
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

                <!-- user saved ads tab -->
                <div class="saved-ads-tab w-full h-full flex flex-row mt-6 items-center justify-center"
                    v-if="(openTab === 2)" id="saved-ads-tab">
                    <div class="flex flex-col items-center gap-y-3 self-center" v-if="savedAds.length === 0">
                        <img src="../../../assets/icons/no-ad.svg" alt="">
                        <span class="text-gray-300 text-lg">No Saved ads yet</span>
                    </div>
                    <div class="flex-row h-full flex-wrap w-full flex overflow-y-auto" v-else>
                        <!-- listing template -->
                        <div class="basis-full md:basis-1/2 xl:basis-1/3 md:px-3 md:py-3 py-5 px-0" v-for="ad in savedAds"
                            :key="ad">
                            <div
                                class="flex flex-col items-start gap-y-2 relative ad feed w-full border rounded-md border-gray-200 pb-2">
                                <Skeleton v-if="!ad.imageLoaded" class=" w-full h-full rounded-t-md feed-image"
                                    style="width: 100%" />
                                <img @click="$router.push('/listings/products/' + ad._id)"
                                    :class="{ 'hidden': !ad.imageLoaded }" :src="ad.images[0].link"
                                    @load="ad.imageLoaded = true" class="w-full rounded-t-md feed-image"
                                    v-if="ad.images[0] && ad.images[0].link && ad.images[0].link.includes('mp4') == false"
                                    alt="">
                                <video @touchstart="playVideo" @touchend="pauseVideo" @mouseenter="playVideo"
                                    @mouseout="pauseVideo" @loadedmetadata="ad.imageLoaded = true"
                                    :class="{ 'hidden': !ad.imageLoaded }"
                                    @click="$router.push('/listings/products/' + ad._id)" preload="metadata"
                                    :src="ad.images[0] && ad.images[0].link" class="w-full rounded-t-md feed-image" v-else
                                    muted loop></video>
                                <p class="text-webapp text-lg font-medium w-full px-3 cursor-pointer"
                                    @click="$router.push('/listings/products/' + ad._id)">
                                    {{ ad.title }}
                                </p>

                                <div class="location flex flex-row items-center gap-x-2 px-2">
                                    <img src="../../../assets/images/map-pin.png" alt="">
                                    <span class="text-sm text-webapp capitalize">{{ ad.location.city ||
                                        ad.location.address.substr(0, 20) }}</span>
                                </div>

                                <div class="flex flex-row items-center w-full justify-between px-3">
                                    <p class="text-sm text-webapp font-medium">
                                        <PriceFormatter :from="ad.priceCurrency" :to="$store.state.user.currency"
                                            :amount="ad.price" /> /
                                        <span v-if="ad.for === 'rent'">Rent</span>
                                        <span v-if="ad.for === 'sale'">Sale</span>
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" v-if="$store.state.isAuthenticated" fill="none"
                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                        class="w-6 h-6 cursor-pointer transition-all" @click="saveAd(ad._id)"
                                        :class="{ 'text-orange-400 scale-[1] opacity-100': $store.state.user.savedAds.includes(ad._id), 'scale-[0.8] opacity-80 ': !$store.state.user.savedAds.includes(ad._id) }">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>

                                </div>

                                <div class="rounded border border-white px-2 py-1 absolute top-5 right-5">
                                    <span class="text-white text-sm text-center">{{ Math.round(ad.distance) }} KM
                                        Away</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import ProfileNavbar from '../../../components/ProfileNavbar.vue'
import FollowingPage from './components/modal/FollowingModal.vue'
import FollowersPage from './components/modal/FollowersModal.vue'
import Affiliate from './components/modal/Affiliate.vue'
import EditUserProfile from './components/EditUserProfile.vue'
import pincodeModal from './components/pincodeModal.vue'
import Currency from './components/wallet/Currency.vue'
import HBP from './components/wallet/HBP.vue'
import saveAd from "../../../composables/saveAd";
import axios from "../../../composables/axios"
import Referrals from './components/modal/Referrals.vue'
import ShareModal from './components/ShareModal.vue'
import calculateDistance from '../../../composables/getAdDistance.js'


import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const url2 = '/profile/get-agent/';
const url = '/listings/ads/get/';

const store = useStore()
const route = useRoute()
const router = useRouter()

const title = ref('Habeep | ' + store.state.user.fname + ' Profile')
const content = ref('Visit ' + store.state.user.fname + ' Profile')

import { useHead } from '@vueuse/head'

useHead({
    title: () => title.value,
    meta: [
        { charset: 'utf-8' },
        { name: 'description', content: () => content.value },

        { name: 'og:title', content: () => title.value },
        { name: 'og:image', content: store.state.user.userProfileImage },
        { name: 'og:url', content: 'https://habeep.org/user/profile/' + route.params.id },
        { name: 'og:website', content: 'website' },
        { name: 'og:description', content: () => content.value },

        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
        { rel: 'icon', href: store.state.user.userProfileImage },
        { rel: 'shortcut icon', href: store.state.user.userProfileImage },
        { rel: 'apple-touch-icon', href: store.state.user.userProfileImage }
    ]
})


if (route.query.reloadApp) {
    router.replace({ query: null });
    setTimeout(() => {
        router.go()
    }, 1000);
}

const openTab = ref(2)
const walletTab = ref(1)
const onModal = ref(false)
let modalState = ref(null)
const editProfileModal = ref(false)
const changePincode = ref(false)
const FollowingModal = ref(false)
const FollowersModal = ref(false)
const affiliateModal = ref(false)
const referralModal = ref(false)

const agentDetails = ref({})
const savedAds = ref([])

async function getAgent() {
    const getAgent = await axios.get(url2 + route.params.id)
    agentDetails.value = getAgent.data.agent

    agentDetails.value.ads.forEach(async product => {
        const distance = await calculateDistance(product.location.city || product.location.address + ', ' + store.state.user.nationality)
        product.distance = distance
    })
}

if (store.state.user.role == 'AGENT') {
    getAgent()
}

getSavedAds()

async function getSavedAds() {
    let savedAdsArray = store.state.user.savedAds
    if (savedAdsArray.length > 0) {
        for (const ad of savedAdsArray) {
            if (typeof (ad) == "string") {
                try {
                    const getAd = await axios.get(url + ad)
                    if (getAd.data.status == 200) {
                        savedAds.value.push(getAd.data.product)

                        savedAds.value.forEach(async product => {
                            const distance = await calculateDistance(product.location.city || product.location.address + ', ' + store.state.user.nationality)
                            product.distance = distance
                        })
                    }
                } catch (error) {
                }
            }
        }
    }
}

const onSearchBar = ref(false)

const searchData = ref('')


function toggleSearch() {
    onSearchBar.value = !onSearchBar.value
}


function changeTab(tab) {
    openTab.value = tab
}

function changeWalletTab(tab) {
    walletTab.value = tab
}

function closeAndOpen(name) {
    closeModal()
    openModal(name)
}

function openModal(name) {
    onModal.value = true
    modalState.value = name

    eval(name).value = true
}
function closeModal() {
    onModal.value = false
    editProfileModal.value = false
    changePincode.value = false
    FollowingModal.value = false
    FollowersModal.value = false
    affiliateModal.value = false
    referralModal.value = false
}

function goBack(component) {
    closeModal();
    onModal.value = true
    eval(component).value = true
}

const screenWidth = ref(window.innerWidth)

function changeWidth() {
    screenWidth.value = window.innerWidth
}


// manage video

async function playVideo(e) {
    if (e.target) {
        await e.target.play()
    }
}
async function pauseVideo(e) {
    if (e.target) {
        await e.target.pause()
    }
}

// product share
const onProductShare = ref(false)

function startProductShare() {
    closeModal()
    onProductShare.value = true
}


if (store.state.isAuthenticated && store.state.user.role === "AGENT") {
    openTab.value = 1
}
</script>

<style scoped>
.user-btn {
    border: 1px solid #D9DDEE;
    border-radius: 5px;
    height: 50px;
}

.agent-btn {
    border: 1px solid #3E64F9;
    border-radius: 5px;
    height: 50px;
}

.ad-image {
    height: 164px;
    max-height: 164px !important;
}

.ad {
    min-height: 291px !important;
    max-height: fit-content;
}

.main::-webkit-scrollbar {
    width: 6px;
}


.main::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #71759D;
    border-radius: 10px;
}

.main::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
}

.ads-tab::-webkit-scrollbar,
.saved-ads-tab::-webkit-scrollbar {
    width: 6px;
}


.ads-tab::-webkit-scrollbar-thumb,
.saved-ads-tab::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #71759D;
    border-radius: 10px;
}

.ads-tab::-webkit-scrollbar-track,
.saved-ads-tab::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
}

.feed-image {
    height: 164px;
    width: 100% !important;
    object-fit: cover;
    max-height: 164px !important;
}
</style>