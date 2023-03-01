<template>
    <div class="w-screen min-w-full flex flex-col items-center bg-white h-full min-h-screen overflow-y-auto"
        resize="changeWidth">
        <MainNavbar v-if="(screenWidth > 767)" />

        <div class="flex flex-row items-center justify-between w-full px-6 2xl:px-44 md:px-20 my-4" v-else>
            <div class="flex flex-row items-center gap-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="#0A1045" class="w-6 h-6 cursor-pointer" @click="$router.go(-1)">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span class="text-xl text-webapp font-medium">Search Results</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0A1045"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>

        </div>

        <div
            class="body px-6 2xl:px-44 md:px-20 mb-10 w-full flex flex-col h-fit items-center md:items-start gap-y-8 mt-3">
            <div class="flex flex-row w-full items-center justify-between">
                <p class="text-webapp text-lg w-full md:block hidden"><span class="text-primary font-medium">12</span>
                    ads result found
                    in <span class="font-medium capitalize">{{$route.query.location ? $route.query.location : 'Nigeria'}}</span></p>

                <!-- filters -->
                <div class="flex flex-row items-center h-fit gap-x-4 relative transition-all">
                    <div @click="toggleDropdown('sort')"
                        class="border border-gray-300 w-56 py-2 justify-center flex flex-row items-center gap-x-2 rounded-full cursor-pointer ">
                        <span class="md:text-lg text-webapp text-sm flex flex-row gap-x-1"> Sort:
                            <span class="hidden md:flex flex-row items-center w-full flex-nowrap">{{sortValue}}</span>
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate-180': onSortDropdown }" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="#9A9A9D" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>

                    <div @click="toggleDropdown('location')"
                        class="border border-gray-300 py-2 px-3 flex flex-row items-center gap-x-4 rounded-full cursor-pointer">
                        <span class="md:text-lg text-webapp">Calabar</span>
                        <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate-180': onLocationDropdown }" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="#9A9A9D" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>

                    <!-- sort dropdown -->
                    <div v-if="(onSortDropdown && onDropdown)"
                        class="flex flex-col drop-shadow-md shadow-xl bg-white rounded-xl gap-y-3 border p-4 border-gray-300 absolute top-16 z-10"
                        style="width: 220px">
                        <div class="flex flex-row items-center justify-between">
                            <span class="text-sm font-medium">Sort by</span>
                            <svg xmlns="http://www.w3.org/2000/svg" @click="toggleDropdown('sort')" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="#71759D" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <p class="text-sm text-webapp mt-2 cursor-pointer" @click="changeSortValue(1)">Recommended</p>
                        <hr>
                        <p class="text-sm text-webapp mt-2 cursor-pointer" @click="changeSortValue(2)">Newest first</p>
                        <hr>
                        <p class="text-sm text-webapp mt-2 cursor-pointer" @click="changeSortValue(3)">Oldest first</p>


                    </div>

                    <!-- location dropdown -->
                    <div v-if="(onLocationDropdown && onDropdown)"
                        class="flex flex-col drop-shadow-md shadow-xl bg-white rounded-xl gap-y-3 border p-4 border-gray-300 absolute top-16 right-0 z-10"
                        style="width: 220px">
                        <div class="flex flex-row items-center justify-between">
                            <span class="text-sm font-medium">Location- state</span>
                            <svg xmlns="http://www.w3.org/2000/svg" @click="toggleDropdown('location')" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="#71759D" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <p class="text-sm text-webapp mt-2 cursor-pointer">Abuja</p>
                        <hr>
                        <p class="text-sm text-webapp mt-2 cursor-pointer">Adamawa</p>
                        <hr>
                        <p class="text-sm text-webapp mt-2 cursor-pointer">Akwa Ibom</p>


                    </div>
                </div>

            </div>

            <!-- listing -->
            <div class="flex flex-row flex-auto mt-6  md:mt-10 w-full h-fit  flex-wrap">

                <!-- listing template -->
                <div class="md:basis-1/2 xl:basis-1/3 md:px-3 md:py-3 py-5 px-0 " v-for="item in 6" :key="item" @click="$router.push('/listings/products/' + item)">
                    <div class="flex flex-col items-start gap-y-2 relative border rounded-lg border-gray-200 pb-2">
                        <img src="../../assets/images/house-img.svg" alt="" class="w-full h-full">
                        <p class="text-webapp text-xl font-medium w-full mx-3">4 bedroom apartment at atimbo </p>

                        <div class="location flex flex-row items-center gap-x-2 px-3">
                            <img src="../../assets/images/map-pin.png" alt="">
                            <span class="text-sm text-webapp">Calabar</span>
                        </div>

                        <div class="flex flex-row items-center w-full justify-between px-3">
                            <span class="text-sm text-webapp font-medium">N500,000 / Year</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
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
</template>

<script setup>
import { ref } from 'vue'

import MainNavbar from '../../components/MainNavbar.vue'

// ui conditionals
const onSortDropdown = ref(false)
const onLocationDropdown = ref(false)
const onDropdown = ref(false)
const locationValue = ref(false)

// filters
const sortValue = ref('Recommended')

function toggleDropdown(type) {
    if (type == 'location') {
        onSortDropdown.value = false
        if (onLocationDropdown.value === false) {
            onDropdown.value = true
            onLocationDropdown.value = true
        } else {
            onLocationDropdown.value = false

        }
    }
    if (type == 'sort') {
        onLocationDropdown.value = false
        if (onSortDropdown.value === false) {
            onDropdown.value = true
            // onLocationDropdown.value = !onLocationDropdown.value
            onSortDropdown.value = true
        } else {
            onSortDropdown.value = false
        }
    }
}

function changeSortValue(index) {
    if(index == 1) {
        sortValue.value = 'Recommended'
    } else if(index == 2) {
        sortValue.value = 'Newest First'
    } else {
        sortValue.value = 'Oldest First'
    }

    toggleDropdown('sort')
}
function changeLocationValue(place) {
    locationValue.value  = place

    toggleDropdown('locatiom')
}

const screenWidth = ref(window.innerWidth)

function changeWidth() {
    screenWidth.value = window.innerWidth
}
</script>

<style >

</style>