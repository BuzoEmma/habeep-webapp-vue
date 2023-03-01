<template>
    <div class="w-screen min-w-full flex flex-col items-center bg-white h-full min-h-screen overflow-y-auto">
        <HomeNavbar />

        <div class="body px-6 2xl:px-44 md:px-20 w-full flex flex-col h-fit items-start gap-y-8">
            <div class="flex flex-col w-full items-start gap-y-4 mt-16">
                <p class="text-webapp text-3xl md:text-4xl font-medium w-full">Blogroom</p>
                <p class="text-sub-webapp text-xl  w-full">Get latest information on company news and platform updates
                    and features</p>
            </div>


            <!-- blogs -->
            <div class="flex flex-row flex-auto mt-6  md:mt-10 w-full h-fit  flex-wrap">

                <!-- blog article template -->
                <div class="flex flex-col items-start gap-y-3 md:basis-1/2 xl:basis-1/3 md:px-3 md:py-3 py-5 px-0"
                    v-for="item in 6" :key="item">
                    <div class="w-full rounded-lg border border-gray-400">
                        <img src="../../assets/images/hbp-img.svg" alt="" class="w-full h-full">
                    </div>
                    <p class="text-webapp text-xl font-bold w-full">How to covert Naira to HBP: Swap in simple steps
                    </p>
                    <p class="text-sub-webapp text-sm w-full">March 23, 2022 . John Doe</p>
                </div>
            </div>

            <!-- anima -->
            <div
                class="download-app-animation sm:w-5/6 w-full md:w-3/5 self-center xl:w-3/4 border-2 p-4  rounded xl:relative border-gray-300 h-fit xl:p-8 2xl:p-16 mt-24 md:mt-32 xl:mt-48">
                <div class="flex flex-col items-center xl:items-start gap-y-4 xl:gap-y-3 xl:w-1/2">
                    <p
                        class="text-webapp text-2xl md:text-3xl  xl:text-4xl font-bold xl:w-full w-full md:w-5/6 text-left md:text-center xl:text-left">
                        House search in just a click</p>
                    <p
                        class="text-sub-webapp text-sm  md:text-lg xl:w-full w-full md:w-4/6 text-left md:text-center xl:text-left">
                        Get the app on any device you use on apple
                        store or google playstore</p>
                    <!-- download stores -->
                    <div class="flex flex-row gap-x-2 items-center w-fit mt-4">
                        <img src="../../assets/images/apple-download.svg" alt="">
                        <img src="../../assets/images/android-download.svg" alt="">
                    </div>
                </div>

                <!-- phone anime -->
                <img src="../../assets/images/phone-blog-anime.svg"
                    class="hidden xl:block w-full  2xl:w-4/5 absolute -top-3/4 2xl:-bottom-full xl:-right-36 2xl:-right-24"
                    alt="">

            </div>
        </div>

        <div class="flex flex-row md:mb-16 mb-12 items-center gap-x-4 mt-36 md:mt-52 xl:mt-64 z-20">
            <router-link to="/terms-of-service" class="underline text-webapp">Terms of service</router-link>
            <router-link to="/listings/search?name=Houses" class="underline text-webapp">Products</router-link>
            <router-link to="/help" class="underline text-webapp">Help</router-link>
        </div>
    </div>
</template>

<script setup>
import HomeNavbar from '../../components/HomeNavbar.vue'

</script>

<style>

</style>