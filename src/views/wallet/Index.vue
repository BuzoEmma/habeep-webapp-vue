<template>
    <div class="main w-screen min-w-full flex flex-col items-center bg-white h-full min-h-screen overflow-y-auto">
        <MainNavbar v-if="screenWidth > 767" />
        <div class="flex flex-row gap-x-5 pl-3 items-center w-full pt-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0A1045"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span class="text-lg text-webapp foont-medium">Wallet</span>
        </div>

        <div class="body h-full flex flex-col lg:w-4/6 md:w-4/5 w-full px-4 md:px-0 pt-5 xl:w-3/5">
            <h1 class="text-2xl font-medium text-webapp">Wallet</h1>

            <div class="flex flex-row items-center mt-6 ml-7 ">
                <div class="cursor-pointer flex flex-row items-center justify-center w-24 py-4 pb-1"
                    @click="changeWalletTab(1)" :class="{ 'text-blue-600 border-b-blue-700 border-b-2': walletTab === 1 }">
                    Naira
                </div>
                <div class="cursor-pointer flex flex-row items-center justify-center w-24 pb-1 py-4"
                    @click="changeWalletTab(2)" :class="{ 'text-blue-600 border-b-blue-700 border-b-2': walletTab === 2 }">
                    HBP
                </div>
            </div>
            <Naira v-if="walletTab === 1" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import MainNavbar from '../../components/MainNavbar.vue';
import Naira from './components/Naira.vue';

const screenWidth = ref(window.innerWidth)
const walletTab = ref(1)

function changeWalletTab(tab) {
    walletTab.value = tab
}
</script>

<style scoped>
.main::-webkit-scrollbar {
    width: 6px !important;
}


.main::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: #71759D;
    border-radius: 10px;
}

.main::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
}
</style>