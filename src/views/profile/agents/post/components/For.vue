<template>
    <div
        class="w-screen min-w-full flex flex-col lg:flex-row items-center bg-white h-full md:h-screen min-h-full overflow-y-auto 2xl:overflow-hidden">
        <div class="flex flex-col items-start gap-y-6 h-2/6 lg:h-full bg-webapp justify-between w-full lg:w-2/5 px-10">
            <div class="logo md:flex hidden flex-row items-center justify-start pt-10 w-full gap-x-2 cursor-pointer"
                @click="$router.push('/')">
                <img src="../../../../../assets/icons/logo-white.svg" alt="Logo">
                <span class="text-white text-2xl">Habeep</span>
            </div>
            <img src="../../../../../assets/icons/chevron-left.svg" @click="$router.push('/agent/ads/create')" class="md:hidden block pt-10" alt="">
            <h1 class="text-white font-medium text-2xl md:text-5xl   w-full text-left">Which of these describes the listing?</h1>
            <p></p>
        </div>

        <div
            class="form-container flex flex-col items-center justify-between relative bg-white gap-y-3 w-full lg:w-3/5 min-h-fit h-4/6 lg:h-full">

            <div class="flex flex-col gap-y-3 w-full p-5 md:p-16 2xl:p-24">
                <div class="border-2 border-gray-200 w-full flex flex-col items-start p-5 gap-y-4 mt-14 md:mt-24 rounded-lg cursor-pointer"
                    @click="selectSaleType(1)" :class="{ 'border-blue-600': activeType === 1 }">

                    <span class="text-webapp font-xl font-medium" :class="{ 'text-blue-600': activeType === 1 }">For rent</span>

                    <p class="text-sm text-webapp text-left w-full">A property for rent on a period of time usually
                        calculated per annum </p>
                </div>
                <div class="border-2 border-gray-200 w-full flex flex-col items-start p-5 gap-y-4 mt-4 rounded-lg cursor-pointer"
                    @click="selectSaleType(2)" :class="{ 'border-blue-600': activeType === 2 }">

                    <span class="text-webapp font-xl font-medium" :class="{ 'text-blue-600': activeType === 2 }">For sale</span>

                    <p class="text-sm text-webapp text-left w-full">A property for rent on a period of time usually
                        calculated per annum </p>
                </div>
            </div>

            <div class="bottom flex flex-col items-center w-full justify-between">
                <div class="w-full bg-gray-200" style="height: 2px;">
                    <div class="bg-webapp h-full w-1/12"></div>
                </div>
                <div class="flex flex-row p-6 w-full items-center justify-between">
                    <span class="text-xl font-medium text-webapp underline cursor-pointer" @click="$router.go(-1)">Back</span>
                    <button @click="$emit('passData', data)" :disabled="data.data.length < 1" :class="{'bg-slate-400 text-white': data.data.length < 1}" class="h-10 w-24 rounded-lg bg-primary text-white text-sm text-medium">Next</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import MainNavbarVue from "../../../../../components/MainNavbar.vue";

const data = reactive({
    type: 'for',
    data: ''
})

let activeType = ref(0)

const selectSaleType = (type) => {
    activeType.value = type
    if(type === 1) {
        data.data = 'rent'
    } else data.data = 'sale'
}
</script>

<style scoped>
input::placeholder {
    color: #71759D;
    font-size: 14px;
}

input {
    padding-left: 10px;
    outline: none;
    border: 1px solid #D9DDEE;
}

input:focus {
    border: 1px solid #1B49FF;
}

.form-container::-webkit-scrollbar {
    height: .1rem;
    width: 7px;
}

.form-container::-webkit-scrollbar-track {
    background: rgb(241, 241, 241);
    border-radius: 8px;
}

.form-container::-webkit-scrollbar-thumb {
    background: #0f154d;
    border-radius: 8px;
}

.on-active {
    border: 1px solid #1B49FF;
    color: #1B49FF;
}

/* .bottom::before {
    border-top: 1px solid #D9DDEE;
}
.bottom::after {
    border-top: 1px solid #000000 ;
    width: 10%;
} */
</style>