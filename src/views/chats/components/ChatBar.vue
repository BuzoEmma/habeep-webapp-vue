<template>
    <div class="flex flex-col  items-start lg:border lg:border-gray-200 rounded-2xl w-full lg:w-1/3 h-full">
        <div
            class="w-full text-left text-webapp justify-between relative font-bold text-xl flex flex-row px-4 items-center pb-3 pt-5 border-b border-b-gray-200">
            <span class="capitalize text-primary text-2xl">Chats</span>
        </div>

        <div class="flex flex-row items-start chat justify-between pt-5 pb-3 px-3 lg:px-5 xl:px-8 w-full py-2 lg:py-3 border-b cursor-pointer border-gray-200"
            @click="selectChat(index, chat)" v-for="(chat, index) in props.rooms" :key="(chat, index)"
            :class="{ 'active-bg': activeChat === chat }">
            <div class="flex flex-row items-start gap-x-3 w-fit h-full">
                <div class="rounded-full w-12 h-12 grid place-items-center">
                    <img :src="chat.user.profilePicture" class="w-12 h-12 rounded-full" alt="">
                </div>
                <div class="flex flex-col items-start h-full">
                    <span class="md:text-lg text-sm text-left text-webapp font-medium">{{ chat.user.fname + ' ' +
                        chat.user.surname }}
                    </span>

                    <div v-if="chat.room.chats.length > 0">
                        <p class="text-xs md:text-sm text-sub-webapp flex-row-center gap-x-2 mt-1.5"
                            v-if="chat.room.chats[chat.room.chats.length - 1].media && (chat.room.chats[chat.room.chats.length - 1].media.includes('.jpg') || chat.room.chats[chat.room.chats.length - 1].media.includes('.png') || chat.room.chats[chat.room.chats.length - 1].media.includes('photo/'))">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                                <path fill-rule="evenodd"
                                    d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97zM12 7a1 1 0 11-2 0 1 1 0 012 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span>{{ chat.room.chats[chat.room.chats.length - 1].msg || 'Photo' }}</span>
                        </p>

                        <p class="text-xs md:text-sm text-sub-webapp flex-row-center gap-x-2 mt-1.5"
                            v-if="chat.room.chats[chat.room.chats.length - 1].media && (chat.room.chats[chat.room.chats.length - 1].media.includes('.mp4') || chat.room.chats[chat.room.chats.length - 1].media.includes('video/') && chat.room.chats[chat.room.chats.length - 1].msg !== 'VN')">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                                <path
                                    d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z" />
                            </svg>
                            <span>{{ chat.room.chats[chat.room.chats.length - 1].msg || 'Video' }}</span>
                        </p>

                        <p class="text-xs md:text-sm text-sub-webapp flex-row-center gap-x-2 mt-1.5"
                            v-if="chat.room.chats[chat.room.chats.length - 1].media && (chat.room.chats[chat.room.chats.length - 1].media.includes('audioMessages') || chat.room.chats[chat.room.chats.length - 1].media.includes('audio/'))">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                                <path
                                    d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
                            </svg>

                            <span>{{ chat.room.chats[chat.room.chats.length - 1].msg || 'Audio' }}</span>
                        </p>

                        <span class="text-xs md:text-sm text-sub-webapp"
                            v-if="!chat.room.chats[chat.room.chats.length - 1].media && chat.room.chats[chat.room.chats.length - 1].msg && chat.room.chats[chat.room.chats.length - 1].msg.length < 20">{{
                                chat.room.chats[chat.room.chats.length - 1].msg }}</span>
                        <span class="text-xs md:text-sm text-sub-webapp"
                            v-if="!chat.room.chats[chat.room.chats.length - 1].media && chat.room.chats[chat.room.chats.length - 1].msg && chat.room.chats[chat.room.chats.length - 1].msg.length > 19">{{
                                chat.room.chats[chat.room.chats.length - 1].msg.slice(0, 20) + '....' }}</span>
                    </div>

                    <span class="text-xs md:text-sm text-sub-webapp" v-else>No message yet</span>
                </div>
            </div>

            <div class="flex flex-col items-end h-full gap-y-1">
                <span class="text-xs md:text-sm text-blue-600" :class="{ 'text-webapp': chat.room.unreadMessages == 0 }"
                    v-if="chat.room.chats.length > 0">{{ moment(new Date(chat.room.chats[chat.room.chats.length
                        - 1].dateCreated)).format('MMM D') }}</span>
                <span class="text-xs md:text-sm" :class="{ 'text-primary': chat.room.chats.length < 1 }" v-else>Start a
                    chat</span>
                <span class="px-2 py-0.5 rounded-full bg-primary text-xs text-white" style="font-size: 10px;"
                    v-if="chat.room.unreadMessages > 0">{{ chat.room.unreadMessages }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable */
import { onMounted, ref, watchEffect, watch } from 'vue'
import moment from 'moment'
import { useStore } from 'vuex'

// moment(chat.room.chats[chat.room.chats.length -1].dateCreated).format('MMM D')
const store = useStore()

const props = defineProps(['rooms'])
const emit = defineEmits(['selectChat'])
const allRooms = ref([])
const evaluated = ref(0)
const activeChat = ref(null)

function selectChat(index, chat) {
    activeChat.value = chat
    emit('selectChat', chat)
}

props.rooms.forEach(chat => {
    chat.room.unreadMessages = returnUnreadMessages(chat.room._id)
    allRooms.value.push(chat)
})


function returnUnreadMessages(roomId) {
    let unreadMessages = ref(0)
    let roomDetails = props.rooms.filter((room) => {
        return room.room._id === roomId
    })
    roomDetails[0].room.chats.forEach(chat => {
        if (store.state.user._id !== chat.userId) {
            if (chat.read === false) {
                unreadMessages.value += 1
            }
        }
    })
    return unreadMessages.value
}

function evaluate() {
    let finalValue = ref(0)
    props.rooms.forEach(room => {
        finalValue.value = returnUnreadMessages(room.room._id)
    })
    return finalValue.value
}

watch(props.rooms, (newChats) => {
    sortNewestMessages(props.rooms)
    props.rooms.forEach(chat => {
        chat.room.unreadMessages = returnUnreadMessages(chat.room._id)
    })
    // getAllLastMessages()
},
    { deep: true },
)

function sortNewestMessages(rooms) {
    return rooms.sort((a, c) => {
        if (c.room.chats.length > 0 && a.room.chats.length > 0) {
            return new Date(c.room.chats[c.room.chats.length - 1].dateCreated + ' ' + c.room.chats[c.room.chats.length - 1].timeCreated) - new Date(a.room.chats[a.room.chats.length - 1].dateCreated + ' ' + a.room.chats[a.room.chats.length - 1].timeCreated)
        }
    })
}

sortNewestMessages(props.rooms)

onMounted(() => {
    evaluated.value = evaluate()
})
</script>

<style scoped>
.active-bg {
    background: rgba(37, 99, 235, 0.08);
}
</style>