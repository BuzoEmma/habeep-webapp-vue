<template>
    <div class="absolute w-screen h-screen top-0 opacity-50" v-if="onPhone && screenWidth < 1024"
        style="background: #161622"></div>
    <div class="w-screen min-w-full flex flex-col items-center bg-white h-full min-h-screen overflow-y-none">
        <!-- Header / Navbar -->
        <HomeNavbar v-if="screenWidth > 425" />
        <HomeNavbar v-if="screenWidth < 767 && !selectedChat" />

        <div class="main flex xl:flex-row items-center justify-between mt-5 lg:mt-10 gap-x-5 w-full 2xl:px-44 md:px-20 my-4"
            style="height: 80vh">
            <ChatBar @selectChat="enterChatBox" :class="{ 'hidden': selectedChat && screenWidth < 1023 }" />
            <Chat @showPhone="togglePhone" @leaveChat="selectedChat = null" :chatState="selectedChat"
                :class="{ 'hidden': !selectedChat && screenWidth < 1023 }" />
        </div>

        <div v-if="onPhone && screenWidth < 1024"
            class="absolute bottom-10 w-screen flex flex-col items-center justify-center z-20 gap-y-2 bg-transparent">
            <div
                class="flex flex-row items-center justify-center bg-white  rounded-xl border border-gray-100 gap-x-2 py-5 w-11/12 cursor-pointer">
                <img src="../../assets/icons/phone.svg" alt="">
                <span class="text-sm text-primary font-medium">0906127484735</span>
            </div>
            <div @click="togglePhone" class="flex flex-row items-center justify-center bg-white  rounded-xl border border-gray-100 gap-x-2 py-3 w-11/12 cursor-pointer">
                <span class="text-xl text-black font-medium">Cancel</span>
            </div>
        </div>

    </div>
</template>
  
<script setup>
import { ref, reactive } from "vue"
import { useRoute } from 'vue-router'


import HomeNavbar from '../../components/HomeNavbar.vue'
import ChatBar from './components/ChatBar.vue'
import Chat from './components/Chat.vue'


const route = useRoute()

// search variables
const data = reactive({
    input: ''
})

// show phone modal
const onPhone = ref(false)

function togglePhone() {
    onPhone.value = !onPhone.value
}


const selectedChat = ref(null)

const enterChatBox = (data) => {
    selectedChat.value = data

    console.log(selectedChat.value)
}

const screenWidth = ref(window.innerWidth)


</script>
  
<style scoped>
@media screen and (max-width: 768px) {
    .main {
        height: 95vh !important;
    }
}
</style>