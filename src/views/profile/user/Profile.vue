<template>
    <div class="absolute w-screen h-screen flex flex-row items-center justify-center" v-if="onModal"
        style="background: rgb(22, 22, 34, 0.5)">

        <EditUserProfile @close="closeModal" @changePin="openModal('changePincode')" v-if="onModal && editProfileModal" />
        <pincodeModal @close="closeModal" @back="goBack" v-if="onModal && changePincode" />
        <Following @close="closeModal" v-if="onModal && FollowingModal" />
        <Affiliate @close="closeModal" v-if="onModal && affiliateModal" @openReferral="closeAndOpen('referralModal')" />
        <Referrals @close="closeAndOpen('affiliateModal')" @closeModals="closeModal" v-if="onModal && referralModal" />
    </div>

    <div class="w-screen min-w-full flex flex-col items-center main bg-white h-screen min-h-screen overflow-y-auto"
        :class="{ 'max-h-screen overflow-y-hidden overflow-hidden opacity-40': onModal }" resize="changeWidth">
        <ProfileNavbar />


        <div
            class="body px-6 2xl:px-44 md:px-20 mb-10 w-full flex flex-col gap-y-8 lg:flex-row h-full gap-x-3 items-center md:items-start  mt-10">
            <!-- user basic info -->
            <div class="w-full lg:w-2/6 2xl:w-1/4 lg:ml-3 h-fit flex flex-col items-center gap-y-8 left">
                <div class="user-info flex p-4 bg-white flex-col border items-start border-gray-200 rounded w-full h-full">
                    <div class="flex flex-row gap-x-3 items-start">
                        <div class="rounded-full w-24 h-24 grid place-items-center border">
                            <img src="../../../assets/icons/memoji.svg" class="w-full h-full" alt="">
                        </div>
                        <div class="flex flex-col ">
                            <span class="text-xl md:text-center text-left agent-name text-webapp font-medium">{{
                                $store.state.user.surname + ' ' + $store.state.user.fname
                            }}</span>
                            <p class="text-lg agent-ads-count text-sub-webapp flex flex-row gap-x-2 items-center"><img
                                    src="../../../assets/images/map-pin.png" alt="">{{ $store.state.user.nationality }}</p>
                        </div>
                    </div>

                    <div class="flex flex-row items-center w-full gap-x-4 mt-3">
                        <p class="text-xl font-webapp font-medium flex flex-row gap-x-1"
                            v-if="$store.state.user.role === 'AGENT_IBO' && agentDetails.ads">
                            {{ agentDetails.ads.length }}
                            <span class="text-sub-webapp text-lg">Ads
                            </span>
                        </p>
                        <p class="text-xl font-webapp font-medium flex flex-row gap-x-1">
                            {{ $store.state.user.savedAds.length }}
                            <span class="text-sub-webapp text-lg">Saved Ads
                            </span>
                        </p>
                        <p class="text-xl font-webapp font-medium flex flex-row gap-x-1 cursor-pointer">{{
                            $store.state.user.following.length
                        }}<span class="text-sub-webapp text-lg">Following </span>
                        </p>
                    </div>


                    <div class="flex flex-row items-center w-full gap-y-1 xl:justify-between mt-4 xl:mt-3">
                        <button v-if="$store.state.user.role.includes('IBO')" @click="openModal('affiliateModal')"
                            class="user-btn flex-row items-center justify-center text-sm font-medium text-webapp w-full bg-white">Affiliate
                            profile</button>
                        <button @click="openModal('editProfileModal')"
                            class="user-btn flex flex-row items-center justify-center text-sm font-medium  text-webapp ml-2 bg-white w-full"
                            :class="{ 'w-full': $store.state.user.role === 'AGENT_IBO' }">Edit
                            profile</button>
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
                            Naira
                        </div>
                        <div class="cursor-pointer flex flex-row items-center justify-center w-24 pb-1 py-2"
                            @click="changeWalletTab(2)"
                            :class="{ 'text-blue-600 border-b-blue-700 border-b-2': walletTab === 2 }">
                            HBP
                        </div>
                    </div>

                    <div class="px-20 py-10 w-full">
                        <Naira v-if="walletTab === 1" />
                        <HBP v-if="walletTab === 2" />
                    </div>
                </div>
            </div>


            <!-- ads tab  -->

            <div class="flex flex-col min-h-full items-start w-full h-full lg:w-4/5">
                <div class="flex flex-row gap-x-3 border-b border-b-gray-200 w-full">
                    <div class="cursor-pointer flex flex-row items-center justify-center w-24  pb-1"
                        v-if="$store.state.user.role === 'AGENT_IBO'" @click="changeTab(1)"
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
                            <div
                                class="flex flex-col items-start gap-y-2 relative border rounded-md border-gray-200 pb-2 ad">
                                <img @click="$router.push('/listings/products/' + ad._id)" :src="ad.images[0].link"
                                    class="w-full h-full rounded-t-md" v-if="ad.images[0].link.includes('mp4') == false"
                                    alt="">
                                <video @click="$router.push('/listings/products/' + ad._id)" :src="ad.images[0].link"
                                    class="w-full rounded-t-md" v-else autoplay muted></video>
                                <p class="text-webapp text-lg font-medium w-full mx-3 cursor-pointer"
                                    @click="$router.push('/listings/products/' + ad._id)">
                                    {{ ad.title }}
                                </p>

                                <div class="location flex flex-row items-center gap-x-2 px-2">
                                    <img src="../../../assets/images/map-pin.png" alt="">
                                    <span class="text-sm text-webapp capitalize">{{ ad.location.city ||
                                        ad.location.address.substr(0, 20) }}</span>
                                </div>

                                <div class="flex flex-row items-center w-full justify-between px-3">
                                    <p class="text-sm text-webapp font-medium">N{{ formatNumber(ad.price) }} /
                                        <span v-if="ad.for === 'rent'">Year</span>
                                        <span v-if="ad.for === 'sale'">Forever</span>
                                    </p>
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

                <!-- user saved ads tab -->
                <div class="saved-ads-tab w-full h-full flex flex-row mt-6 items-center justify-center"
                    v-if="(openTab === 2)" id="saved-ads-tab">
                    <div class="flex flex-col items-center gap-y-3 self-center" v-if="savedAds.length === 0">
                        <img src="../../../assets/icons/no-ad.svg" alt="">
                        <span class="text-gray-300 text-lg">No Saved ads yet</span>
                    </div>
                    <div class="flex-row flex-auto h-full flex-wrap w-full flex overflow-y-auto" v-else>
                        <!-- listing template -->
                        <div class="md:basis-1/2 xl:basis-1/3 md:px-3 md:py-3 py-5 px-0" v-for="ad in savedAds" :key="ad">
                            <div
                                class="flex flex-col items-start gap-y-2 relative ad border rounded-md border-gray-200 pb-2">
                                <img @click="$router.push('/listings/products/' + ad._id)" :src="ad.images[0].link"
                                    class="w-full h-full rounded-t-md" v-if="ad.images[0].link.includes('mp4') == false"
                                    alt="">
                                <video @click="$router.push('/listings/products/' + ad._id)" :src="ad.images[0].link"
                                    class="w-full rounded-t-md" v-else autoplay muted></video>
                                <p class="text-webapp text-lg font-medium w-full mx-3 cursor-pointer"
                                    @click="$router.push('/listings/products/' + ad._id)">
                                    {{ ad.title }}
                                </p>

                                <div class="location flex flex-row items-center gap-x-2 px-2">
                                    <img src="../../../assets/images/map-pin.png" alt="">
                                    <span class="text-sm text-webapp capitalize">{{ ad.location.city ||
                                        ad.location.address.substr(0, 20) }}</span>
                                </div>

                                <div class="flex flex-row items-center w-full justify-between px-3">
                                    <p class="text-sm text-webapp font-medium">N{{ formatNumber(ad.price) }} /
                                        <span v-if="ad.for === 'rent'">Year</span>
                                        <span v-if="ad.for === 'sale'">Forever</span>
                                    </p>
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
                                    <span class="text-white text-sm text-center">1.8km Away</span>
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
import { ref, onMounted } from 'vue'
import ProfileNavbar from '../../../components/ProfileNavbar.vue'
import Following from './components/modal/Following.vue'
import Affiliate from './components/modal/Affiliate.vue'
import EditUserProfile from './components/EditUserProfile.vue'
import pincodeModal from './components/pincodeModal.vue'
import Naira from './components/wallet/Naira.vue'
import HBP from './components/wallet/HBP.vue'
import saveAd from "../../../composables/saveAd";
import axios from "../../../composables/axios"
import formatNumber from "number_formatter"
import Referrals from './components/modal/Referrals.vue'


import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const url2 = '/profile/get-agent/';
const url = '/listings/ads/get/';

const store = useStore()
const route = useRoute()

const openTab = ref(2)
const walletTab = ref(1)
const onModal = ref(false)
let modalState = ref(null)
const editProfileModal = ref(false)
const changePincode = ref(false)
const FollowingModal = ref(false)
const affiliateModal = ref(false)
const referralModal = ref(false)

const agentDetails = ref({})
const savedAds = ref([])

async function getAgent() {
    const getAgent = await axios.get(url2 + route.params.id)
    agentDetails.value = getAgent.data.agent
}

if (store.state.user.role == 'AGENT_IBO') {
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
                    }
                } catch (error) {
                }
            }
        }
    }
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

</script>

<style scoped>
.user-btn {
    border: 1px solid #D9DDEE;
    border-radius: 5px;
    height: 50px;
}

.ad-image {
    height: 164px;
    max-height: 164px !important;
}

.ad {
    height: 291px !important;
    max-height: 291px !important;
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
</style>