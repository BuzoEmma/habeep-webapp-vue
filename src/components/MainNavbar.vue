<template>
    <!-- Header / Navbar -->
    <div class="absolute w-screen h-screen top-0 opacity-50" @click="toggleMobileNav" v-if="onMobileNav"
        style="background: #161622"></div>

    <div
        class="flex flex-row items-center relative md:sticky z-20 bg-white top-0 py-4  justify-between w-full px-6 2xl:px-44 md:px-20 border-b border-b-textfieldbg" v-motion-slide-top :delay="200">
        <div class="logo flex flex-row items-center gap-x-2 cursor-pointer" @click="$router.push('/feeds')">
            <img src="../assets/icons/logo.svg" alt="Logo">
            <span class="text-primary text-2xl">Habeep</span>
        </div>

        <div
            class="search-bar lg:flex hidden w-1/4 flex-row rounded-full border border-gray-300 items-center  pl-3 pr-1 h-9 py-1 gap-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="#B1B4CD"
                class="w-6 h-6 mt-1">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>

            <input type="text" class="w-full h-full bg-transparent" v-model="searchInput"
                @input="$emit('search', searchInput)" @keypress="checkForEnter" placeholder="Search">
        </div>

        <div class=" flex-row items-center w-fit gap-x-6 divide-x md:flex hidden">
            <!-- download app on stores -->
            <div class="flex flex-row items-center gap-x-4">
                <span class="text-sub-webapp text-lg font-normal">Download our app at</span>
                <!-- <img src="../assets/icons/apple.svg" alt=""> -->
                <a href="https://play.google.com/store/apps/details?id=org.habeep" class="no-underline cursor-pointer"><img
                        src="../assets/icons/playstore.svg" alt=""></a>

            </div>

            <div class="flex flex-row gap-x-10 items-start md:items-center pl-6">
                <span class="uppercase text-lg text-webapp" @click="$router.push('/blog')">BLOG</span>
                <div class="flex flex-row items-center cursor-pointer gap-x-2" @click="toggleNav">
                    <img :src="$store.state.user.userProfileImage"
                        class="w-10 h-10 rounded-full cursor-pointer"
                        v-if="$store.state.user.userProfileImage !== 'https://i.ibb.co/gtpxMJz/21.png'" alt="">
                    <Avatar size="100%" class="w-10 h-10" v-if="$store.state.user.userProfileImage === 'https://i.ibb.co/gtpxMJz/21.png' && $store.state.isAuthenticated" :fname="$store.state.user.fname" :lname="$store.state.user.surname" />
                    <img src="../assets/icons/user.svg" alt="" v-if="!$store.state.isAuthenticated">
                    <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate-180': onNavDropdown }" fill="none"
                        viewBox="0 0 24 24" stroke-width="2" stroke="#0A1045" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>
        </div>

        <img src="../assets/icons/mobile-nav.svg" @click="toggleMobileNav" class="flex md:hidden" alt="Mobile nav image">

        <!-- Navigation Menu -->

        <div v-if="(onNavDropdown || onMobileNav)" :class="{ 'right-2 top-20': onMobileNav }" v-motion-slide-top :delay="200"
            class="flex flex-col mobile-nav drop-shadow-lg shadow-xl bg-white rounded-xl gap-y-3 border p-6 border-gray-300 absolute top-16 right-20 z-30"
            style="width: 250px">

            <p @click="$router.push('/')" class="text-sm text-webapp mt-1 cursor-pointer mobile-nav-item"
                :class="{ 'text-blue-500': $route.name === 'Home' }">Home</p>
            <p @click="$router.push('/feeds')" class="text-sm text-webapp mt-1 cursor-pointer"
                :class="{ 'text-blue-700': $route.name === 'Feeds' }" v-if="$store.state.isAuthenticated">Feeds</p>
            <p @click="$router.push('/listings/search')" class="mobile-nav-item text-sm text-webapp mt-1 cursor-pointer"
                :class="{ 'text-blue-700': $route.name === 'Listings-search' }">Search</p>
            <p @click="$router.push('/chats')" class="mobile-nav-item text-sm text-webapp mt-1 cursor-pointer"
                :class="{ 'text-blue-700': $route.name === 'Chat' }" v-if="$store.state.isAuthenticated">Message</p>
            <p @click="$router.push('/user/profile/' + $store.state.user._id)"
                class="text-sm text-webapp mt-1 cursor-pointer" :class="{ 'text-blue-700': $route.name === 'User-profile' }"
                v-if="$store.state.isAuthenticated">Account</p>
            <hr class="my-1">
            <p @click="$router.push('/agent/ads')" class="mobile-nav-item text-sm text-webapp mt-1 cursor-pointer"
                :class="{ 'text-blue-700': $route.name === 'Agent-ads' || $route.name === 'Agent-ads-create' }"
                v-if="$store.state.isAuthenticated && $store.state.user.role === 'AGENT'">Post an Ad</p>
            <p @click="$router.push('/account/IBO/category')" class="text-sm text-webapp mt-1 cursor-pointer"
                :class="{ 'text-blue-700': $route.name.includes('IBO') === true }"
                v-if="$store.state.isAuthenticated && $store.state.user.role === 'USER'">Become an Agent/Tenant</p>
            <p @click="$router.push('/account/IBO/category/agent')" class="text-sm text-webapp mt-1 cursor-pointer"
                :class="{ 'text-blue-700': $route.name.includes('IBO') === true }"
                v-if="$store.state.isAuthenticated && $store.state.user.role === 'TENANT'">Become an Agent</p>
            <p @click="$router.push('/wallet')" class="mobile-nav-item text-sm text-webapp mt-1 cursor-pointer"
                :class="{ 'text-blue-700': $route.name === 'Wallet' }" v-if="$store.state.isAuthenticated">Wallet</p>
            <span class="text-sm text-webapp mt-1 md:hidden mobile-nav-item" @click="$router.push('/blog')">BLOG</span>

            <div v-if="!$store.state.isAuthenticated"
                class="flex flex-row items-center mobile-nav-item justify-between w-full rounded-full p-2 mt-8 border border-gray-300 cursor-pointer"
                @click="$router.push('/login')">
                <img src="../assets/icons/logo-mini.svg" alt="">
                <span class="text-lg text-webapp">Login</span>
                <span></span>
            </div>
            <div v-else
                class="flex flex-row items-center mobile-nav-item justify-between w-full rounded-full p-2 mt-8 border border-gray-300 cursor-pointer"
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
import { useRoute, useRouter } from 'vue-router'

const onNavDropdown = ref(false)
const onMobileNav = ref(false)

const route = useRoute()
const router = useRouter()

let searchInput = ref('')

function toggleNav() {
    onNavDropdown.value = !onNavDropdown.value
}
function toggleMobileNav() {
    onMobileNav.value = !onMobileNav.value
}

const checkForEnter = (e) => {
    var key = e.keyCode || e.charCode || e.key || e.code;
    if (key == 13 || key == 'Enter') {
        if (route.path !== '/listings/search') {
            router.push('/listings/search?name=' + searchInput.value)
        }
    }
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