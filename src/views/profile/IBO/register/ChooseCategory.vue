<template>

    <div class="w-screen min-w-full flex flex-row items-center bg-white h-screen min-h-full overflow-hidden">
        <img src="../../../../assets/images/habeep-show-ibo.png" class="w-1/3 xl:block hidden h-full" alt="">

        <div
            class="form-container flex flex-col items-center relative bg-white gap-y-3 w-full xl:w-2/3 h-full pb-6 md:py-10 overflow-y-auto overflow-x-hidden">

            <div class="flex flex-col items-center w-full md:w-2/3 px-4">
                <!-- logo -->
                <div class="logo md:flex hidden flex-row items-center justify-end w-full gap-x-2 cursor-pointer"
                    @click="$router.push('/')">
                    <img src="../../../../assets/icons/logo.svg" alt="Logo">
                    <span class="text-primary text-2xl">Habeep</span>
                </div>

                <p class="w-full text-left text-webapp font-bold text-xl flex flex-row items-center gap-x-1 mt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="#0A1045" class="w-6 h-6 cursor-pointer" @click="$router.go(-1)">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <span>Choose the Affiliate category</span>
                </p>

                <div class="border-2 border-gray-200 w-full flex flex-col items-start p-5 gap-y-4 mt-14 md:mt-24 rounded-lg cursor-pointer" @click="$router.push('/account/IBO/category/agent')" style="background: #F9FAFF">
                    <img src="../../../../assets/icons/agent-ibo.svg" alt="">

                    <span class="text-primary font-xl font-medium">Agent</span>

                    <p class="text-sm text-webapp text-left w-full">Build your own financial wealth by owning your affiliate business. Click to join the Agent and start earning</p>
                </div>
                <div class="border-2 border-gray-200 w-full flex flex-col items-start p-5 gap-y-4 mt-10 rounded-lg cursor-pointer" @click="$router.push('/account/IBO/category/user')" style="background: #F7F7F7;">
                    <img src="../../../../assets/icons/user-ibo.svg" alt="">

                    <span class="text-primary font-xl font-medium">Tenant</span>

                    <p class="text-sm text-webapp text-left w-full">Become a Tenant and earn with us. Join the affiliate network as an independent user </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Habeep | Choose Plan')
import { useHead } from '@vueuse/head'

useHead({
    title: () => title.value,
    meta: [
        { charset: 'utf-8' },
        { name: 'description', content: '' },

        { name: 'og:title', content: () => title.value },
        { name: 'og:image', content: 'https://i.ibb.co/BnG8VLy/logo-white.png' },
        { name: 'og:url', content: 'https://habeep.org/account/IBO/category' },
        { name: 'og:website', content: 'website' },
        { name: 'og:description', content: 'Choose from our catalogue. The plan that fits you' },

        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', href: 'https://i.ibb.co/BnG8VLy/logo-white.png' },
    ]
})
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
</style>