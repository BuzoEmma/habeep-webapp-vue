<template>
    <div class="main flex flex-col items-center z-10 overflow-hidden my-auto mx-auto bg-white">
        <div class="flex flex-row items-center justify-between w-full px-4 py-4 border-b border-b-gray-100">
            <div class="flex flex-row items-center gap-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" @click="$emit('close')" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6 block sm:hidden font-bold ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span class="text-xl font-medium text-webapp">Deposit HBP</span>
            </div>
            <img src="../../../../../assets/icons/x.svg" class="cursor-pointer hidden sm:block" @click="$emit('close')"
                alt="">
        </div>
        <div class="w-full p-4">
            <span class="text-webapp text-sm">HBP deposit account is available for inbound
                transfer within habeep</span>
            <div class="border border-gray mt-4 rounded-lg p-4 py-10 md:py-4 w-full flex flex-col items-start gap-y-5"
                style="background: #F2F4F9;">
                <div class="flex flex-row justify-between items-end w-full">
                    <div class="flex flex-col items-start gap-y-3">
                        <span class="text-gray-400 text-xs">Account ID</span>
                        <span class="text-webapp text-xl font-medium uppercase">
                            {{ props.wallet.accountID }}
                        </span>
                    </div>
                    <div>
                        <button v-if="!linkCopied"
                            class="border border-blue-700 flex flex-row items-center gap-x-2 rounded-lg px-5 py-2"
                            @click="copyLink(props.wallet.accountID)">
                            <img src="../../../../../assets/icons/link.svg" alt="">
                            <span class="text-primary text-sm font-medium">Copy</span>
                        </button>
                        <img src="../../../../../assets/icons/copied.svg" v-else alt="">
                    </div>
                </div>
            </div>

            <div class="flex flex-row items-center justify-between w-full py-4 px-4 mt-5 rounded-md"
                style="background: #F2F4F9;" @click="$emit('gotoDeposit')">
                <p class="flex flex-row items-center gap-x-1">
                    <span class="text-sm font-medium text-webapp">Fund Naira Account</span>
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
import { ref, reactive } from 'vue'
import copy from 'copy-to-clipboard3';

const props = defineProps(['wallet'])

const linkCopied = ref(false)
const copyLink = (code) => {
    copy(code)
    linkCopied.value = true;

    setTimeout(() => {
        linkCopied.value = false
    }, 4000);
}

</script>
  
<style scoped>
.main {
    width: 480px;
    border-radius: 15px;
}

@media screen and (max-width: 600px) {
    .main {
        width: 100%;
        height: 100%;
        position: absolute;
    }
}
</style>