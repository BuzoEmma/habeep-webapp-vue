<template>
    <div
        class="following-modal flex flex-col drop-shadow-lg shadow-xl bg-white rounded-xl gap-y-3 border top-1/4 md:left-1/4 lg:left-1/3 2xl:left-1/2   border-gray-300 absolute z-20">

        <div class="flex flex-row items-center justify-between w-full px-4 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="#0A1045" class="w-6 h-6 mt-2 sm:hidden" @click="$emit('close')">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>

            <span class="text-2xl font-medium text-webapp">Following(5)</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0A1045"
                class="w-6 h-6 cursor-pointer collapse sm:visible" @click="$emit('close')">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

        </div>

        <hr class="w-full mb-1">

        <div class="following flex flex-row items-center  justify-between w-full py-2 px-4" v-for="item in 5"
            :key="item">
            <div class="flex flex-row gap-x-2 items-center">
                <div class="rounded-full w-10 h-10 grid place-items-center">
                    <img src="../../../../../assets/icons/model.svg" class="w-full h-full" alt="">
                </div>
                <div class="flex flex-col ">
                    <span
                        class="text-sm xl:text-lg md:text-center text-left following-name text-webapp font-medium">Duke
                        Carrick</span>
                    <span class="text-sm following-ads-count md:text-center xl:text-left text-left text-sub-webapp">62
                        ads</span>
                </div>
            </div>
            <!-- <img src="../../assets/icons/call-btn.svg" alt="" class="cursor-pointer md:ml-4"> -->
            <button
                class="w-28 h-8 flex flex-row items-center justify-center rounded-lg text-sm font-medium text-webapp bg-white border border-gray-300">Unfollow</button>
        </div>

    </div>
</template>

<script setup>

</script>

<style scoped>
.following-modal {
    width: 350px;
}

@media screen and (max-width: 639px) {
    .following-modal {
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
    }
}
</style>