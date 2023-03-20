<template>
    <div class="main flex flex-col items-center z-20 gap-y-2 overflow-hidden my-auto mx-auto bg-white">
        <div class="flex flex-row items-center justify-between w-full px-4 py-4 border-b border-b-gray-100"
            v-if="!selectedMethod">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" @click="$emit('close')" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-6 h-6 block md:hidden font-bold">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span class="text-xl font-medium text-webapp">Withdraw HBP</span>
            <img src="../../../../../../assets/icons/x.svg" class="cursor-pointer collapse md:visible"
                @click="$emit('close')" alt="">
        </div>
        <div class="w-full px-4 py-3 flex flex-col items-start" v-if="!selectedMethod">
            <span class="text-sub-webapp text-lg w-full text-left">Where would you like to withdraw Habeep points?</span>

            <div class="flex flex-row items-center cursor-pointer justify-between w-full py-4 px-4 mt-8 rounded-md"
                style="background: #F2F4F9;" @click="$emit('gotoSwap')">
                <span class="text-sm font-medium text-webapp">Swap to Naira</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
            <div class="flex flex-row items-center justify-between w-full py-4 px-4 mt-5 rounded-md"
                style="background: #F2F4F9;" @click="$emit('gotoTransfer')">
                <p class="flex flex-row items-center gap-x-1">
                    <span class="text-sm font-medium text-webapp">Transfer to beneficiary</span>
                    <span class="bg-orange-300 px-1 rounded-lg text-white" style="font-size: 8px;">Coming
                        soon</span>
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive, onMounted } from 'vue'
</script>
  
<style scoped>
.main {
    width: 480px;
    min-height: 300px;
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