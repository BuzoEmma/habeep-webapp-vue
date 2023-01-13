<template>
    <div class="fixed w-screen h-screen top-0 opacity-50 overflow-hidden max-h-screen" v-if="onModal"
        style="background: #161622"></div>

    <div class="w-screen min-w-full flex flex-col items-center bg-white h-screen min-h-screen overflow-y-auto"
        :class="{ 'max-h-screen overflow-y-hidden overflow-hidden': onModal }" resize="changeWidth">
        <ProfileNavbar />


        <div
            class="body px-6 2xl:px-44 md:px-20 mb-10 w-full flex flex-col gap-y-8 lg:flex-row h-full gap-x-3 items-center md:items-start  mt-10">
            <!-- user basic info -->
            <div class="w-full lg:w-2/6 2xl:w-1/4 lg:ml-3 h-fit flex flex-col items-center gap-y-8 left">
                <div
                    class="user-info flex p-4 bg-white flex-col border items-start border-gray-200 rounded w-full h-full">
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
                        <p class="text-xl font-webapp font-medium flex flex-row gap-x-1">0<span
                                class="text-sub-webapp text-lg">Saved Ads</span></p>
                                <!-- @click="openModal" -->
                        <p class="text-xl font-webapp font-medium flex flex-row gap-x-1 cursor-pointer"
                            >0<span class="text-sub-webapp text-lg">Following </span></p>
                    </div>


                    <div class="flex flex-row items-center w-full gap-y-1 xl:justify-between mt-4 xl:mt-3">
                        <button
                            class="user-btn flex-row items-center justify-center text-sm font-medium text-webapp w-1/2  bg-white">Affiliate
                            profile</button>
                        <button
                            @click="openModal('editProfileModal')"
                            class="user-btn flex flex-row items-center justify-center text-sm font-medium  text-webapp ml-2 bg-white w-1/2">Edit
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


            <!-- listing -->

            <div class="flex flex-col min-h-full items-start w-full h-full lg:w-4/5">
                <div class="flex flex-row gap-x-3 border-b border-b-gray-200 w-full">
                    <div class="cursor-pointer flex flex-row items-center justify-center w-24  pb-1"
                        @click="changeTab(1)" :class="{ 'text-blue-600 border-b-blue-700 border-b-2': openTab === 1 }">
                        Agent Ads
                    </div>
                    <div class="cursor-pointer flex flex-row items-center justify-center w-24 pb-1"
                        @click="changeTab(2)" :class="{ 'text-blue-600 border-b-blue-700 border-b-2': openTab === 2 }">
                        Saved ads
                    </div>
                </div>

                <div class="ads-tab w-full h-full mt-6 flex flex-row md:items-center justify-center" v-if="(openTab === 1)" id="ads-tab">
                    <div class="flex flex-col items-center gap-y-3 md:justify-center">
                        <img src="../../../assets/icons/no-ad.svg" alt="">
                        <span class="text-gray-300 text-lg">No ads yet</span>
                    </div>
                    <div class=" flex-row flex-auto h-fit  flex-wrap hidden">

                        <!-- listing template -->
                        <div class="md:basis-1/2 xl:basis-1/3 md:px-3 md:py-3 py-5 px-0 " v-for="item in 6" :key="item">
                            <div
                                class="flex flex-col items-start gap-y-2 relative border rounded-lg border-gray-200 pb-2">
                                <img src="../../../assets/images/house-img.svg" alt="" class="w-full h-full">
                                <p class="text-webapp text-xl font-medium w-full mx-3">4 bedroom apartment at atimbo
                                </p>

                                <div class="location flex flex-row items-center gap-x-2 px-3">
                                    <img src="../../../assets/images/map-pin.png" alt="">
                                    <span class="text-sm text-webapp">Calabar</span>
                                </div>

                                <div class="flex flex-row items-center w-full justify-between px-3">
                                    <span class="text-sm text-webapp font-medium">N500,000 / Year</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="#0A1045B2" class="w-6 h-6">
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
                <div class="saved-ads-tab w-full h-full mt-6" v-if="(openTab === 2)" id="saved-ads-tab">
                    <div class="flex flex-col items-center gap-y-3 self-center">
                        <img src="../../../assets/icons/no-ad.svg" alt="">
                        <span class="text-gray-300 text-lg">No ads yet</span>
                    </div>
                    <div class="flex-row flex-auto h-fit  flex-wrap hidden">

                        <!-- listing template -->
                        <div class="md:basis-1/2 xl:basis-1/3 md:px-3 md:py-3 py-5 px-0 " v-for="item in 3" :key="item">
                            <div
                                class="flex flex-col items-start gap-y-2 relative border rounded-lg border-gray-200 pb-2">
                                <img src="../../../assets/images/house-img.svg" alt="" class="w-full h-full">
                                <p class="text-webapp text-xl font-medium w-full mx-3">4 bedroom apartment at atimbo
                                </p>

                                <div class="location flex flex-row items-center gap-x-2 px-3">
                                    <img src="../../../assets/images/map-pin.png" alt="">
                                    <span class="text-sm text-webapp">Calabar</span>
                                </div>

                                <div class="flex flex-row items-center w-full justify-between px-3">
                                    <span class="text-sm text-webapp font-medium">N500,000 / Year</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="#FF8500" class="w-6 h-6">
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


            <EditUserProfile @close="closeModal" @changePin="openModal('changePincode')" v-if="onModal && editProfileModal" />
            <pincodeModal @close="closeModal" @back="goBack" v-if="onModal && changePincode" />
            <Following @close="closeModal" v-if="onModal && FollowingModal" />
        </div>
        
    </div>
</template>

<script setup>
import { ref } from 'vue'


import ProfileNavbar from '../../../components/ProfileNavbar.vue'
import Following from './components/modal/Following.vue'
import EditUserProfile from './components/EditUserProfile.vue'
import pincodeModal from './components/pincodeModal.vue'
import Naira from './components/wallet/Naira.vue'
import HBP from './components/wallet/HBP.vue'

const openTab = ref(1)
const walletTab = ref(1)
const onModal = ref(false)
let modalState = ref(null)
const editProfileModal = ref(false)
const changePincode = ref(false)
const FollowingModal = ref(false)

function changeTab(tab) {
    openTab.value = tab
}

function changeWalletTab(tab) {
    walletTab.value = tab
}

function openModal(name) {
    onModal.value = true
    modalState.value = name
    console.log(eval(name))
    
    eval(name).value = true
}
function closeModal() {
    onModal.value = false
    editProfileModal.value = false
    changePincode.value = false
    FollowingModal.value = false
}

function goBack(component) {
    // console.log(component)
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
</style>