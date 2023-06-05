<template>
    <div v-motion :initial="{ opacity: 0.2, x: -100 }" :enter="{ opacity: 1, x: 0 }" :leave="{ x: 100, opacity: 0, }"
        class="w-screen min-w-full flex flex-col lg:flex-row items-center bg-white h-full md:h-screen min-h-full overflow-y-auto md:overflow-hidden">
        <div class="flex flex-col items-start gap-y-6 h-2/6 lg:h-full bg-webapp justify-between w-full lg:w-2/5 px-10">
            <div class="logo md:flex hidden flex-row items-center justify-start pt-10 w-full gap-x-2 cursor-pointer"
                @click="$router.push('/')">
                <img src="../../../../../assets/icons/logo-white.svg" alt="Logo">
                <span class="text-white text-2xl">Habeep</span>
            </div>
            <img src="../../../../../assets/icons/chevron-left.svg" @click="$emit('goBack')" class="md:hidden block pt-10"
                alt="">
            <h1 class="text-white font-medium text-2xl md:text-4xl xl:text-5xl  w-full text-left">Whats are the available
                features?
            </h1>
            <p></p>
        </div>

        <div
            class="form-container flex flex-col items-center justify-between relative bg-white w-full lg:w-3/5 min-h-fit h-4/6 lg:h-full">

            <div class="form-fields w-full flex flex-row h-full items-center px-5 gap-3 flex-auto justify-center"
                v-if="$store.state.listingProcess.type !== 'land'">

                <div class="flex cursor-pointer flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                    :class="{ 'border-blue-500 border-2': data.data.includes('electricity') }"
                    @click="manage('electricity')">
                    <img src="../../../../../assets/icons/light.svg" alt="">
                    <span class="text-sm text-sub-webapp">Electricity</span>
                </div>
                <div class="flex cursor-pointer flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                    :class="{ 'border-blue-500 border-2': data.data.includes('water') }" @click="manage('water')">
                    <img src="../../../../../assets/icons/water.svg" alt="">
                    <span class="text-sm text-sub-webapp">Water</span>
                </div>
                <div class="flex cursor-pointer flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                    :class="{ 'border-blue-500 border-2': data.data.includes('parking') }" @click="manage('parking')">
                    <img src="../../../../../assets/icons/parking.svg" alt="">
                    <span class="text-sm text-sub-webapp">Parking</span>
                </div>
                <div class="flex cursor-pointer flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                    :class="{ 'border-blue-500 border-2': data.data.includes('pool') }" @click="manage('pool')">
                    <img src="../../../../../assets/icons/pool.svg" alt="">
                    <span class="text-sm text-sub-webapp">Pool</span>
                </div>

            </div>

            <!-- land features -->
            <div class="form-fields w-full flex flex-row h-full items-center px-5 gap-3 flex-auto justify-center" v-else>

                <div class="flex cursor-pointer flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                    :class="{ 'border-blue-500 border-2': data.data.includes('access_road') }"
                    @click="manage('access_road')">
                    <img src="../../../../../assets/icons/listings/road.svg" class="w-5 h-5" alt="">
                    <span class="text-sm text-sub-webapp text-center">Access road</span>
                </div>
                <div class="flex cursor-pointer flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                    :class="{ 'border-blue-500 border-2': data.data.includes('security') }" @click="manage('security')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 text-webapp">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>

                    <span class="text-sm text-sub-webapp">Security</span>
                </div>
                <div class="flex cursor-pointer flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                    :class="{ 'border-blue-500 border-2': data.data.includes('surveyed') }" @click="manage('surveyed')">
                    <img src="../../../../../assets/icons/listings/surveyed.svg" class="w-6 h-6" alt="">
                    <span class="text-sm text-sub-webapp">Surveyed</span>
                </div>
                <div class="flex cursor-pointer flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                    :class="{ 'border-blue-500 border-2': data.data.includes('c-of-o') }" @click="manage('c-of-o')">
                    <img src="../../../../../assets/icons/listings/certificate.svg" class="w-6 h-6" alt="">
                    <span class="text-sm text-sub-webapp">C of O</span>
                </div>

            </div>

            <div class="bottom flex flex-col items-center w-full justify-between static bottom-0">
                <div class="w-full bg-gray-200" style="height: 2px;">
                    <div class="bg-webapp h-full w-10/12"></div>
                </div>
                <div class="flex flex-row p-6 w-full items-center justify-between">
                    <span class="text-xl font-medium text-webapp underline cursor-pointer"
                        @click="$emit('goBack', { to: 'Size', from: 'Features' })">Back</span>
                    <button @click="$emit('passData', data)" :disabled="data.data.length < 1"
                        :class="{ 'bg-slate-400 text-white': data.data.length < 1 }"
                        class="h-10 w-24 rounded-lg bg-primary text-white text-sm text-medium">Next</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainNavbarVue from "../../../../../components/MainNavbar.vue";
import axiosDefault from 'axios'


const store = useStore()


const data = reactive({
    type: 'features',
    data: []
})

const manage = (feature) => {
    if (!data.data.includes(feature)) {
        data.data.push(feature)
    } else {
        let index = data.data.indexOf(feature)
        data.data.splice(index)

        console.log(data.data, index)
    }
}

if (store.state.listingProcess.features.length > 0) {
    data.data = store.state.listingProcess.features
}

</script>

<style scoped>
input::placeholder {
    color: #71759D;
    font-size: 16px;
}

input.title {
    padding-left: 10px;
    outline: none;
    border: 1px solid #D9DDEE;
}

input.price {
    padding-left: 10px;
    outline: none;
    border: none !important;
}

input.title:focus {
    border: 1px solid #1B49FF;
}

.results::-webkit-scrollbar {
    width: 5px;
}


.results::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: #71759D;
}

.results::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
}

.results::-webkit-scrollbar-button {
    max-height: 92px;
    height: 200px !important;
    width: 200px !important;
}


.on-active {
    border: 1px solid #1B49FF;
    color: #1B49FF;
}

.mapouter {
    position: relative;
    text-align: right;
    height: 100%;
    width: 100%;
}

.gmap_canvas {
    overflow: hidden;
    background: none !important;
    height: 100%;
    width: 100%;
}

/* .bottom::before {
    border-top: 1px solid #D9DDEE;
}
.bottom::after {
    border-top: 1px solid #000000 ;
    width: 10%;
} */
</style>