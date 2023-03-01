<template>
    <div class="main flex flex-col h-screen min-h-full absolute w-screen z-10 overflow-hidden bg-white">
        <div class="flex flex-col w-full quick-search no-wrap relative mt-6 items-center">
            <!-- Search bar -->
            <div class="search-bar w-11/12 flex flex-row items-center bg-white pl-3 pr-1 h-12 py-1 gap-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="#B1B4CD"
                    class="w-4 h-4 mt-1">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>

                <input type="text" v-model="data.input" class=" rounded-sm w-full h-full outline-none"
                    placeholder="Search by property type, location, price">
            </div>
            <!-- search results -->
            <div class="flex flex-col gap-y-3 search-results  w-full py-5 px-5 mt-4" v-if="(data.input.length > 0)">
                <div class="flex flex-row items-center result justify-between w-full cursor-pointer"
                    @click="$router.push('/listings/search?name=' + data.input)">
                    <p class="text-webapp text-lg">{{ data.input }}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                        stroke="#71759D" class="w-6 h-6 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </div>

                <!-- Based on Search bar Input results -->
                <div class="flex flex-row items-center result justify-between w-full cursor-pointer"
                    v-for="location in locations.slice(0, 5)" :key="location"
                    @click="$router.push('/listings/search?name=' + data.input + '&location=' + location.toLowerCase())">
                    <p class="text-webapp text-lg font-medium gap-x-1 flex flex-row items-center">{{ data.input }} <span
                            class="text-lg font-extralight text-sub-webapp">in</span> <span
                            class="text-lg font-medium text-webapp">{{ location }}</span></p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                        stroke="#71759D" class="w-6 h-6 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue'

const data = reactive({
    input: ''
})

const locations = ref([
    'Calabar',
    'Lagos',
    'Enugu',
    'Abuja',
    'Ikom',
    'Kano',
    'Onitsha, Anambra',
])
</script>
  
<style scoped>
.main {
    height: 100vh !important;
    width: 100vw;
    border-radius: 0px;
}

.search-bar,
input::placeholder {
    color: #B1B4CD;
    font-size: 16px;
}

.search-bar {
    border: 1px solid #EBEBEB;
    box-shadow: 0px 8px 88px -6px rgba(24, 39, 75, 0.12), 0px 14px 88px -4px rgba(24, 39, 75, 0.12);
    border-radius: 10px;
    filter: drop-shadow(0 14px 88px -6 #18274B1F);
}

input {
    outline: none !important;
    border: none !important;
}
</style>