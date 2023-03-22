<template>
    <div class="absolute w-screen h-screen flex flex-row items-center justify-center" v-if="onModal"
        style="background: rgb(22, 22, 34, 0.5)">

        <DepositModal v-motion :initial="{ opacity: 0.5, y: 100, x: 100 }" :enter="{ opacity: 1, y: 0, x: 0 }"
            v-if="depositModal" @close="closeModal" />
        <Withdraw v-motion :initial="{ opacity: 0.5, y: 100, x: 100 }" :enter="{ opacity: 1, y: 0, x: 0 }"
            :walletData="walletData" :amount="withdrawAmount" v-if="withdrawalModal" @close="closeModal" />
        <SwapModal v-motion :initial="{ opacity: 0.5, y: 100, x: 100 }" :enter="{ opacity: 1, y: 0, x: 0 }" v-if="swapModal"
            @close="closeModal" />
        <ChooseMethod v-motion :initial="{ opacity: 0.5, y: 100, x: 100 }" :enter="{ opacity: 1, y: 0, x: 0 }"
            :walletData="walletData" v-if="chooseWithdrawalMethodModal" @close="closeModal"
            @gotoWithdrawal="openWithdrawalModal" />

        <DepositHBP v-motion :initial="{ opacity: 0.5, y: 100, x: 100 }" :enter="{ opacity: 1, y: 0, x: 0 }"
            :wallet="tokenWallet" v-if="depositHBPModal" @close="closeModal" />
        <SwapHBP v-motion :initial="{ opacity: 0.5, y: 100, x: 100 }" :enter="{ opacity: 1, y: 0, x: 0 }"
            :wallet="tokenWallet" v-if="swapHBPModal" @close="closeModal" />
        <TransferHBP v-motion :initial="{ opacity: 0.5, y: 100, x: 100 }" :enter="{ opacity: 1, y: 0, x: 0 }"
            :wallet="tokenWallet" v-if="transferHBP" @close="closeModal" />
        <ChooseHBPMethod v-motion :initial="{ opacity: 0.5, y: 100, x: 100 }" :enter="{ opacity: 1, y: 0, x: 0 }"
            :wallet="tokenWallet" v-if="chooseHBPWithdrawalMethodModal" @close="closeModal"
            @gotoTransfer="openWithdrawalHBPModal('transferHBP')" @gotoSwap="openWithdrawalHBPModal('swapHBPModal')" />
    </div>

    <div class="main w-screen min-w-full flex flex-col items-center bg-white h-full min-h-screen overflow-y-auto"
        :class="{ 'max-h-screen overflow-y-hidden overflow-hidden opacity-40': onModal }">
        <MainNavbar v-if="screenWidth > 767" />
        <div class="md:hidden flex flex-row gap-x-5 pl-3 items-center w-full pt-5">
            <svg xmlns="http://www.w3.org/2000/svg" @click="$router.go(-1)" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="#0A1045" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span class="text-lg text-webapp font-medium">Wallet</span>
        </div>

        <div class="body h-full flex flex-col lg:w-4/6 md:w-4/5 w-full px-4 md:px-0 pt-5 xl:w-3/5">
            <h1 class="text-2xl font-medium text-webapp md:block hidden">Wallet</h1>

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
            <Naira @sendWallet="getData" v-if="walletTab === 1" @openModal="openModal" />
            <HBP v-if="walletTab === 2" @sendWallet="getTokenWallet" @openModal="openModal" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainNavbar from '../../components/MainNavbar.vue';

// naira components
import Naira from './components/Naira.vue';
import DepositModal from './components/modals/naira/DepositNaira.vue';
import SwapModal from './components/modals/naira/Swap.vue';
import ChooseMethod from './components/modals/naira/withdraw/ChooseMethod.vue';
import ChooseHBPMethod from './components/modals/hbp/withdraw/ChooseMethod.vue';

import Withdraw from './components/modals/naira/Withdraw.vue';

// hbp components
import HBP from './components/HBP.vue';
import SwapHBP from './components/modals/hbp/Swap.vue';
import TransferHBP from './components/modals/hbp/Transfer.vue';
import DepositHBP from './components/modals/hbp/DepositHBP.vue';


const route = useRoute()
const router = useRouter()

if (route.query.reloadApp) {
    router.replace({ query: null });
    setTimeout(() => {
        router.go()
    }, 1000);
}
// naira components
const withdrawAmount = ref(0)
function openWithdrawalModal(e) {
    withdrawAmount.value = e
    closeModal()
    openModal('withdrawalModal')
}

// hbp components
function openWithdrawalHBPModal(modal) {
    console.log(modal)
    closeModal()
    openModal(modal)
}


const screenWidth = ref(window.innerWidth)
const onModal = ref(false)
let modalState = ref(null)

const depositModal = ref(false)
const swapModal = ref(false)
const chooseWithdrawalMethodModal = ref(false)
const walletData = ref(null)
const withdrawalModal = ref(false)

const depositHBPModal = ref(false)
const chooseHBPWithdrawalMethodModal = ref(false)
const swapHBPModal = ref(false)
const transferHBP = ref(false)
const tokenWallet = ref(null)

function getData(e) {
    walletData.value = e
}

function getTokenWallet(e) {
    console.log('hello')
    tokenWallet.value = e
}


function openModal(name) {
    onModal.value = true
    modalState.value = name

    eval(name).value = true
}
function closeModal() {
    onModal.value = false
    depositModal.value = false
    swapModal.value = false
    chooseWithdrawalMethodModal.value = false
    withdrawalModal.value = false
    transferHBP.value = false
    chooseHBPWithdrawalMethodModal.value = false
    swapHBPModal.value = false
    depositHBPModal.value = false
}

function goBack(component) {
    closeModal();
    onModal.value = true
    eval(component).value = true
}


const walletTab = ref(1)
function changeWalletTab(tab) {
    walletTab.value = tab
}

if (route.query.tab) {
    if (route.query.tab === 'naira') {
        walletTab.value = 1
    } else walletTab.value = 2
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