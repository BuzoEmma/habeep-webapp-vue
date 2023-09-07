<template>
    <div class="main flex flex-col items-center z-20 gap-y-2 overflow-hidden my-auto mx-auto bg-white">
        <div class="flex flex-row items-center justify-between w-full px-4 py-4 border-b border-b-gray-100"
            v-if="!selectedMethod">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" @click="$emit('close')" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-6 h-6 block md:hidden font-bold">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span class="text-xl font-medium text-webapp">Withdraw {{ $store.state.user.currency }}</span>
            <img src="../../../../../../assets/icons/x.svg" class="cursor-pointer collapse md:visible"
                @click="$emit('close')" alt="">
        </div>
        <div class="w-full px-4 py-3 flex flex-col items-start" v-if="!selectedMethod">
            <span class="text-sub-webapp text-lg w-full text-left">Where would you like to withdraw {{ $store.state.user.currency }}?</span>

            <div class="flex flex-row items-center cursor-pointer justify-between w-full py-4 px-4 mt-8 rounded-md"
                style="background: #F2F4F9;" @click="selectedMethod = 'bank'">
                <span class="text-sm font-medium text-webapp">Bank account</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </div>

        <BankAmount @close="$emit('close')" @receiveAmount="$emit('gotoWithdrawal', $event)"
            v-if="selectedMethod === 'bank'" :wallet="props.walletData" />
    </div>
</template>
  
<script setup>
import { ref, reactive, onMounted } from 'vue'
import BankAmount from './BankAmount.vue'

const props = defineProps(['walletData'])
const selectedMethod = ref(null)



</script>
  
<style scoped>
.main {
    width: 480px;
    min-height: 200px;
    border-radius: 10px;
}


@media screen and (max-width: 450px) {
    .main {
        width: 100vw !important;
        height: 100vh !important;
        border-radius: 0px;
    }
}
</style>