<template>
    <!-- Header / Navbar -->
    <div class="absolute w-screen h-screen top-0 opacity-50" @click="toggleMobileNav" v-if="onMobileNav"
        style="background: #161622"></div>

    <div
        class="flex flex-row items-center relative py-4 justify-between w-full px-6 2xl:px-44 md:px-20 border-b border-b-textfieldbg">
        <div class="logo flex flex-row items-center gap-x-2 cursor-pointer" @click="$router.push('/feeds')">
            <img src="../assets/icons/logo.svg" alt="Logo">
            <span class="text-primary text-2xl">Habeep</span>
        </div>

        <div class=" flex-row items-center w-fit gap-x-6 divide-x md:flex hidden">
            <!-- download app on stores -->
            <div class="flex flex-row items-center gap-x-4">
                <span class="text-sub-webapp text-lg font-normal">Download our app at</span>
                <img src="../assets/icons/apple.svg" alt="">
                <a href="https://play.google.com/store/apps/details?id=org.habeep" class="no-underline cursor-pointer"><img
                        src="../assets/icons/playstore.svg" alt=""></a>
            </div>

            <div class="flex flex-row gap-x-10 items-start md:items-center pl-6">
                <span class="uppercase text-lg text-webapp cursor-pointer" @click="$router.push('/blog')">BLOG</span>
                <div class="flex flex-row items-center cursor-pointer gap-x-2" @click="toggleNav">
                    <img :src="$store.state.user.userProfileImage" class="w-10 h-10 border border-gray-100 rounded-full"
                        alt="User Profile photo" v-if="$store.state.isAuthenticated">
                    <img src="../assets/icons/user.svg" alt="" v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate-180': onNavDropdown }" fill="none"
                        viewBox="0 0 24 24" stroke-width="2" stroke="#0A1045" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>
        </div>

        <div class="flex flex-row items-center gap-x-5 lg:hidden ">
            <img src="../assets/icons/search.svg" @click="$emit('toggleSearch')" class="cursor-pointer flex md:hidden"
                v-if="$route.name === 'Feeds'" alt="">
            <img src="../assets/icons/mobile-nav.svg" @click="toggleMobileNav" class="cursor-pointer flex md:hidden" alt="">
        </div>

        <!-- Navigation Menu -->

        <div v-if="(onNavDropdown || onMobileNav)" :class="{ 'right-2 top-20': onMobileNav }"
            class="flex flex-col drop-shadow-lg shadow-xl bg-white rounded-xl gap-y-3 border p-6 border-gray-300 absolute top-16 right-20 z-10"
            style="width: 250px">

            <p @click="$router.push('/home')" class="text-sm text-webapp mt-1 cursor-pointer"
                :class="{ 'text-blue-600': $route.name === 'Home' }">Home</p>
            <p @click="$router.push('/feeds')" class="text-sm text-webapp mt-1 cursor-pointer"
                :class="{ 'text-blue-600': $route.name === 'Feeds' }"
                v-if="$store.state.isAuthenticated && $route.name !== 'Feeds'">Feeds</p>

            <p @click="$router.go()" class="text-sm text-webapp mt-1 cursor-pointer"
                :class="{ 'text-blue-600': $route.name === 'Feeds' }"
                v-if="$route.name === 'Feeds' && $route.path === '/' && $store.state.isAuthenticated">
                Feeds</p>
            <p @click="$router.push('/listings/search')" class="text-sm text-webapp mt-1 cursor-pointer"
                :class="{ 'text-primary': $route.name === 'Listings-search' }">Search</p>
            <p @click="$router.push('/chats')" class="text-sm text-webapp mt-1 cursor-pointer"
                :class="{ 'text-blue-700': $route.name === 'Chat' }" v-if="$store.state.isAuthenticated">Message</p>
            <p @click="$router.push('/user/profile/' + $store.state.user._id)"
                class="text-sm text-webapp mt-1 cursor-pointer" :class="{ 'text-blue-700': $route.name === 'User-profile' }"
                v-if="$store.state.isAuthenticated">Account</p>
            <hr class="my-1">
            <p @click="$router.push('/agent/ads')" class="text-sm text-webapp mt-1 cursor-pointer"
                :class="{ 'text-blue-700': $route.name.includes === 'Agent-ads' || $route.name === 'Agent-ads-create' }"
                v-if="$store.state.isAuthenticated && $store.state.user.role === 'AGENT'">Post an Ad</p>

            <p @click="$router.push('/account/IBO/category')" class="text-sm text-webapp mt-1 cursor-pointer"
                :class="{ 'text-blue-700': $route.name.includes('IBO') === true }"
                v-if="$store.state.isAuthenticated && $store.state.user.role === 'USER'">Become an Agent/Tenant</p>
            <p @click="$router.push('/account/IBO/category/agent')" class="text-sm text-webapp mt-1 cursor-pointer"
                :class="{ 'text-blue-700': $route.name.includes('IBO') === true }"
                v-if="$store.state.isAuthenticated && $store.state.user.role === 'TENANT'">Become an Agent</p>

            <p @click="$router.push('/wallet')" class="text-sm text-webapp mt-1 cursor-pointer"
                :class="{ 'text-blue-700': $route.name === 'Wallet' }" v-if="$store.state.isAuthenticated">Wallet</p>

            <div v-if="!$store.state.isAuthenticated"
                class="flex flex-row items-center justify-between w-full rounded-full p-2 mt-8 border border-gray-300 cursor-pointer"
                @click="$router.push('/login')">
                <img src="../assets/icons/logo-mini.svg" alt="">
                <span class="text-lg text-webapp">Login</span>
                <span></span>
            </div>
            <div v-else
                class="flex flex-row items-center justify-between w-full rounded-full p-2 mt-8 border border-gray-300 cursor-pointer"
                @click="$router.push('/logout')">
                <img src="../assets/icons/logo-mini.svg" alt="">
                <span class="text-lg text-webapp">Logout</span>
                <span></span>
            </div>




        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const onNavDropdown = ref(false)
const onMobileNav = ref(false)

function toggleNav() {
    onNavDropdown.value = !onNavDropdown.value
}
function toggleMobileNav() {
    onMobileNav.value = !onMobileNav.value
}
</script>

<style scoped>
input::placeholder {
    color: #B1B4CD;
    font-size: 16px;
}

input {
    outline: none;
}
</style>