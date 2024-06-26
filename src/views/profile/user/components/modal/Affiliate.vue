<template>
    <div class="main  flex flex-col items-center z-20 gap-y-5 overflow-hidden my-auto mx-auto bg-white">
        <div class="flex flex-row items-center justify-between w-full px-4 py-4 border-b border-b-gray-100">
            <div class="flex flex-row items-center gap-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" @click="$emit('close')" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6 block sm:hidden font-bold ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span class="text-xl font-medium text-webapp">Affiliate profile</span>
            </div>
            <img src="../../../../../assets/icons/x.svg" class="cursor-pointer hidden sm:block" @click="$emit('close')"
                alt="">
        </div>
        <div class="w-full p-4">
            <div class="border border-gray rounded-lg p-4 py-10 md:py-4 w-full flex flex-col items-start gap-y-5">
                <span class="font-medium text-webapp text-lg">Earn affiliate commissions by refferal link</span>
                <div class="flex flex-row justify-between items-end w-full">
                    <div class="flex flex-col items-start gap-y-3">
                        <span class="text-gray-400 text-xs">My invite code:</span>
                        <span class="text-webapp text-xl font-medium uppercase">
                            {{ $store.state.user.referralCode }}
                        </span>
                    </div>
                    <div>
                        <button v-if="!linkCopied"
                            class="border border-blue-700 flex flex-row items-center gap-x-2 rounded-lg px-5 py-2"
                            @click="copyLink($store.state.user.referralCode)">
                            <img src="../../../../../assets/icons/link.svg" alt="">
                            <span class="text-primary text-sm font-medium">Copy Link</span>
                        </button>
                        <img src="../../../../../assets/icons/copied.svg" v-else alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-row items-center justify-center gap-x-5 w-full h-fit mt-5 divide-x-2">
            <div class="flex flex-col items-center gap-y-2">
                <span class="text-lg text-webapp ubuntu">Total Earnings</span>
                <div class="flex flex-row items-end gap-x-1">
                    <span class="text-3xl font-medium text-webapp">{{ $store.state.user.referralEarnings }}</span>
                    <span class="text-lg text-webapp font-medium">HBP</span>
                </div>
            </div>
            <div class="flex flex-col items-center pl-5 gap-y-2">
                <span class="text-lg text-webapp ubuntu">Total Referrals</span>
                <span class="text-3xl font-medium text-webapp">{{ $store.state.user.referrals.length }}</span>
            </div>
        </div>

        <button @click="$emit('openReferral')" v-if="$store.state.user.referrals.length > 0"
            class="border border-blue-700 flex flex-row items-center gap-x-2 rounded-lg px-6 py-3 mt-8 mb-5">
            <span class="text-primary text-sm font-medium">View refferals</span>
        </button>
    </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue'
import copy from 'copy-to-clipboard3';
// import { useRouter, useRoute } from 'vue-router'

// const router = useRouter()
// const route = useRoute()


const linkCopied = ref(false)
const copyLink = (code) => {
    copy(window.location.origin + '/register?invite=' + code)
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
        border-radius: 0px;
        height: 100%;
        position: absolute;
    }
}
</style>