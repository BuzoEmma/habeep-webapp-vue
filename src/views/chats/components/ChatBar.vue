<template>
    <div
        class="flex flex-col xl:pt-10 lg:pt-7 pb-3 px-3 lg:px-5 xl:px-8 items-start lg:border lg:border-gray-200 rounded-2xl w-full lg:w-1/3 h-full">
        <p class="w-full font-bold text-lg md:text-xl lg:text-2xl text-webapp">
            Messages({{ unreadMessages }})
        </p>

        <div class="flex flex-row items-start chat justify-between mt-4  lg:mt-7 w-full py-2 lg:py-3 border-b cursor-pointer border-gray-200"
            @click="$emit('selectChat', chat)" v-for="chat in props.rooms" :key="chat">
            <div class="flex flex-row items-start gap-x-3 w-fit">
                <div class="rounded-full w-11 h-11 grid place-items-center">
                    <img :src="chat.user.profilePicture" class="w-full h-full" alt="">
                </div>
                <div class="flex flex-col items-start">
                    <span class="md:text-lg text-sm text-left  text-webapp font-medium">{{ chat.user.fname + ' ' +
                        chat.user.surname }}</span>
                    <span class="text-xs md:text-sm text-sub-webapp" v-if="chat.room.chats.length > 0">{{
                        chat.room.chats[chat.room.chats.length - 1].msg }}</span>
                    <span class="text-xs md:text-sm text-sub-webapp" v-else>No message yet</span>
                </div>
            </div>
            <div class="flex flex-col items-end gap-y-1">
                <span class="text-xs md:text-sm text-webapp" :class="{ 'text-primary': newMessage }"
                    v-if="chat.room.chats.length > 0">{{ moment(chat.room.chats[0].updatedAt).format('L') }}</span>
                <span class="text-xs md:text-sm text-webapp" :class="{ 'text-primary': newMessage }" v-else>Start a
                    chat</span>
                <span class="py-1 px-2 rounded-full bg-primary text-xs text-white" v-if="newMessage">1</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import moment from 'moment';
import { ref, reactive } from 'vue'

const props = defineProps(['rooms'])

const unreadMessages = ref(0)

function returnUnreadMessages() {
    props.rooms.forEach(room => {
        room.room.chats.forEach(chat => {
            if (chat.read === false) {
                unreadMessages.value += 1
            }
        })
    })
}

</script>

<style scoped></style>