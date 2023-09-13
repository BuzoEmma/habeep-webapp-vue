<template>
    <div class="absolute w-screen h-screen top-0 opacity-50" v-if="onPhone && screenWidth < 1024"
        style="background: #161622"></div>
    <div class="w-screen max-w-full flex flex-col items-center bg-white h-screen max-h-full overflow-x-hidden">
        <!-- Header / Navbar -->
        <HomeNavbar v-if="screenWidth > 425" />
        <HomeNavbar v-if="screenWidth < 767 && !selectedChat" />

        <div class="main flex flex-row h-full items-center justify-center lg:mt-10 gap-x-5 w-full 2xl:px-44 md:px-20"
            :class="{ 'justify-between': processing === false && allRooms.length > 0 }">
            <Preloader v-if="allRooms.length < 1 && processing === true" />

            <ChatBar @selectChat="enterChatBox" :class="{ 'hidden': selectedChat && screenWidth < 1023 }" :rooms="allRooms"
                v-if="!processing && allRooms.length > 0" />


            <NoChat v-if="!processing && !selectedChat"
                :class="{ 'hidden': allRooms.length > 0 && screenWidth < 1023 || selectedChat }" />
            <Chat @showPhone="togglePhone" v-if="!processing && selectedChat" @leaveChat="leaveChat"
                :chat="selectedChat" :class="{ 'hidden': !selectedChat && screenWidth < 1023 }" />
        </div>

        <div v-if="onPhone && screenWidth < 1024"
            class="absolute bottom-10 w-screen flex flex-col items-center justify-center z-20 gap-y-2 bg-transparent">

            <a class="flex flex-row items-center justify-center bg-white  rounded-xl border border-gray-100 gap-x-2 py-5 w-11/12 cursor-pointer"
                :href="'tel:' + selectedChat.user.phoneNumber" v-if="selectedChat.user">
                <img src="../../assets/icons/phone.svg" alt="">
                <span class="text-sm text-primary font-medium">{{ selectedChat.user.phoneNumber
                }}</span>
            </a>
            <div @click="togglePhone"
                class="flex flex-row items-center justify-center bg-white  rounded-xl border border-gray-100 gap-x-2 py-3 w-11/12 cursor-pointer">
                <span class="text-xl text-black font-medium">Cancel</span>
            </div>
        </div>

    </div>
</template>
  
<script setup>
import { ref, reactive } from "vue"
import { useRoute, useRouter } from 'vue-router'


import HomeNavbar from '../../components/HomeNavbar.vue'
import ChatBar from './components/ChatBar.vue'
import Chat from './components/Chat.vue'
import axios from '../../composables/axios'
import NoChat from "./components/NoChat.vue"


const route = useRoute()
const router = useRouter()

const allRooms = ref([])

// show phone modal
const onPhone = ref(false)

function togglePhone() {
    onPhone.value = !onPhone.value
}

const selectedChat = ref(null)

const enterChatBox = (data) => {
    if (selectedChat.value !== null) {
        selectedChat.value = null

        setTimeout(() => {
            selectedChat.value = data
        }, 5);
    } else selectedChat.value = data

}

const leaveChat = (data) => {
    selectedChat.value = null
    const getRoom = allRooms.value.filter(chatroom => {
        return chatroom.room._id == data.room._id
    })
    allRooms.value[getRooms[0]] = data
    
    console.log(getRoom[0].room, data.room)
}

const screenWidth = ref(window.innerWidth)

const processing = ref(false)

async function getRooms() {
    try {
        processing.value = true
        const fetch = await axios.get('/messaging/get-rooms')
        allRooms.value = fetch.data.rooms
        processing.value = false
        if (route.query.roomId) {
            let filterId = allRooms.value.filter((room) => {
                return room.room._id === route.query.roomId
            })
            // // route.query.roomId = null
            // router.replace({ query: { roomId: null } })
            enterChatBox(filterId[0])
        }
        return true
    } catch (error) {
        console.log(error)
        router.go(-1)
        return false
    }
}

getRooms()

</script>
  
<style scoped></style>