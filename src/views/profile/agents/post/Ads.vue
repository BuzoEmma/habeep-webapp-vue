<template>
    <MainNavbarVue />
    <div class="w-screen min-w-full flex flex-col lg:flex-row items-center bg-white h-screen min-h-full overflow-hidden">
        <div class="flex flex-col items-start gap-y-3 h-2/5 lg:h-full bg-webapp justify-center w-full lg:w-2/5 px-10">
            <h3 class="text-white font-medium text-4xl w-full text-left">Welcome {{ $store.state.user.fname + ' ' + $store.state.user.surname }} </h3>
            <p class="text-left sm:text-lg xl:text-xl text-gray-300 w-full">Hey, you’re in the right place to list a house. A few details is needed. Let’s go</p>
            <button class="mt-2 bg-primary text-white text-lg px-8 py-2 rounded">List a House</button>
        </div>

        <div
            class="form-container flex flex-col items-center relative bg-white gap-y-3 w-full lg:w-3/5 min-h-fit h-3/5 lg:h-full p-6 md:py-10 overflow-y-auto overflow-x-hidden">

            <h3 class="text-webapp font-medium text-2xl w-full text-left">Your uploads</h3>

            <div class="actions w-full flex flex-row items-center h-fit mt-5 justify-between">
                <div class="flex flex-row items-center h-fit gap-x-4 w-1/3">
                    <button class="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-400 on-active">Active
                        ads</button>
                    <button class="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-400">Closed
                        ads</button>
                </div>
                <div class="flex flex-row items-center h-fit gap-x-4 w-2/3 justify-end">
                    <div
                        class="search-bar w-3/5 flex flex-row rounded-full border border-gray-300 items-center py-1 px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                            stroke="#B1B4CD" class="w-6 h-6 mt-1">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>

                        <input type="text" class=" h-full bg-transparent" placeholder="Search for your ads" style="border: none !important;">
                    </div>

                    <div 
                        class="border border-gray-300 px-4 py-2 justify-center flex flex-row items-center gap-x-2 rounded-full cursor-pointer ">
                        <span class="text-webapp text-sm w-full">All house type</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="#9A9A9D" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="ads-tab w-full h-full mt-6 flex flex-row md:items-center justify-center" id="ads-tab">
                    <div class="flex flex-col items-center gap-y-3 md:justify-center">
                        <img src="../../../../assets/icons/no-ad.svg" alt="">
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
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import MainNavbarVue from "../../../../components/MainNavbar.vue";


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
</style>