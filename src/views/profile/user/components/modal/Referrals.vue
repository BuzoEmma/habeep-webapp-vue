<template>
    <div class="main flex flex-col  items-center z-20 gap-y-5 overflow-hidden my-auto mx-auto bg-white">
        <div class="flex flex-row items-center justify-between w-full px-4 py-4 border-b border-b-gray-100">
            <div class="flex flex-row items-center gap-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" @click="$emit('close')" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6 block sm:hidden font-bold ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span class="text-xl font-medium text-webapp">Refferals({{ $store.state.user.referrals.length }})</span>
            </div>
            <div class="flex flex-row items-center gap-x-3">
                <span class="text-sm font-medium text-primary cursor-pointer" @click="$emit('close')">Go back</span>
                <img src="../../../../../assets/icons/x.svg" class="cursor-pointer hidden sm:block"
                    @click="$emit('closeModals')" alt="">
            </div>
        </div>

        <div class="flex flex-col items-center justify-center w-full h-full">
            <div v-if="allReferrals.length > 0"
                class="w-full h-full flex flex-col items-center  overflow-y-scroll px-4 py-4 scroller gap-y-4">

                <div class="flex flex-col items-center w-full gap-y-4" v-for="referral of allReferrals" :key="referral">

                    <div class="flex flex-row items-center justify-between w-full cursor-pointer"
                        v-if="referral.referrals.length > 0" @click="referral.childrenOpen = !referral.childrenOpen">
                        <div class="flex flex-row items-center gap-x-4">
                            <div class="w-4 h-4 rounded-full flex flex-row items-center justify-center"
                                style="border: 1px solid #0A1045">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-5 h-5 text-webapp">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                                </svg>
                            </div>
                            <span class="text-lg text-webapp">{{ referral.fname + ' ' + referral.surname }}</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5 text-sub-webapp">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>

                    <div class="flex flex-row items-center justify-between w-full cursor-pointer" v-else>
                        <div class="flex flex-row items-center gap-x-4">
                            <div class="w-4 h-4 rounded-full flex flex-row items-center justify-center"
                                style="border: 1px solid #0A1045"></div>
                            <span class="text-lg text-webapp">{{ referral.fname + ' ' + referral.surname }}</span>
                        </div>
                    </div>

                    <div class="flex flex-col w-full" v-if="referral.childrenOpen === true">
                        <div class="flex flex-row items-center justify-between w-full cursor-pointer"
                            v-for="childReferral of referral.referrals" :key="childReferral">
                            <div class="flex flex-row items-center gap-x-4">
                                <div class="w-4 h-4 rounded-full flex flex-row items-center justify-center"
                                    style="border: 1px solid #0A1045"></div>
                                <span class="text-lg text-webapp">{{ childReferral.fname + ' ' + childReferral.surname
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Preloader v-else class="mt-10" />
        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue'
import axios from '../../../../../composables/axios';
// import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

const allReferrals = ref([])
const referralsId = store.state.user.referrals
async function getReferrals() {

    for (const referral of referralsId) {
        try {
            const fetch = await axios.post('/affiliate/', {
                id: referral
            })
            let formatted = fetch.data.userDetails
            formatted.childrenOpen = false
            if (formatted.referrals.length > 0) {
                for (const child of formatted.referrals) {
                    try {
                        const fetch = await axios.post('/affiliate/', {
                            id: child
                        })
                        formatted.referrals.push(fetch.data.userDetails)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            allReferrals.value.push(formatted)
        } catch (error) {
            console.log(error)
        }
    }
}

getReferrals()

// const router = useRouter()
// const route = useRoute()

</script>
  
<style scoped>
.main {
    width: 400px;
    min-height: 450px;
    border-radius: 15px;
}

.scroller::-webkit-scrollbar {
    width: 6px;
}


.scroller::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: #71759D;
    border-radius: 10px;
}

.scroller::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
}

@media screen and (max-width: 600px) {
    .main {
        width: 100%;
        height: 100%;
        border-radius: 0px;
        position: absolute;
    }
}
</style>