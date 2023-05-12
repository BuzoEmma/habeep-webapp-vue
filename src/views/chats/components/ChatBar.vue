<template>
    <div
        class="flex flex-col  items-start lg:border lg:border-gray-200 rounded-2xl w-full lg:w-1/3 h-full">
        <p class="w-full font-bold text-lg mt-2 px-4 md:text-xl lg:text-2xl text-webapp">
            Messages({{ props.rooms.length }})
        </p>

        <div class="h-3 collapse"></div>
        <div class="flex flex-row items-start chat justify-between pt-5 pb-3 px-3 lg:px-5 xl:px-8 w-full py-2 lg:py-3 border-b cursor-pointer border-gray-200"
            @click="selectChat(index, chat)" v-for="(chat, index) in props.rooms" :key="(chat, index)"
            :class="{ 'active-bg': activeChat === index }">
            <div class="flex flex-row items-start gap-x-3 w-fit">
                <div class="rounded-full w-11 h-11 grid place-items-center">
                    <img :src="chat.user.profilePicture" class="w-11 h-11 rounded-full" alt="">
                </div>
                <div class="flex flex-col items-start">
                    <span class="md:text-lg text-sm text-left text-webapp font-medium">{{ chat.user.fname + ' ' +
                        chat.user.surname }}</span>
                    <span class="text-xs md:text-sm text-sub-webapp"
                        v-if="chat.room.chats.length > 0 && chat.room.chats[chat.room.chats.length - 1].msg.length < 20">{{
                            chat.room.chats[chat.room.chats.length - 1].msg }}</span>
                    <span class="text-xs md:text-sm text-sub-webapp"
                        v-if="chat.room.chats.length > 0 && chat.room.chats[chat.room.chats.length - 1].msg.length > 19">{{
                            chat.room.chats[chat.room.chats.length - 1].msg.slice(0, 20) + '....' }}</span>
                    <span class="text-xs md:text-sm text-sub-webapp" v-if="chat.room.chats.length === 0">No message
                        yet</span>
                </div>
            </div>

            <div class="flex flex-col items-end gap-y-1">
                <span class="text-xs md:text-sm text-webapp" :class="{ 'text-primary': newMessage }"
                    v-if="chat.room.chats.length > 0">{{ moment(new Date(chat.room.chats[chat.room.chats.length
                        - 1].dateCreated)).format('MMM D') }}</span>
                <span class="text-xs md:text-sm text-webapp" :class="{ 'text-primary': newMessage }" v-else>Start a
                    chat</span>
                <span class="px-2 py-0.5 rounded-full bg-primary text-xs text-white" style="font-size: 10px;"
                    v-if="chat.room.unreadMessages > 0">{{ chat.room.unreadMessages }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import moment from 'moment';
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps(['rooms'])
const emit = defineEmits(['selectChat'])
const allRooms = ref([])
const evaluated = ref(0)
const activeChat = ref(null)

function selectChat(index, chat) {
    activeChat.value = index
    emit('selectChat', chat)
}

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

props.rooms.forEach(chat => {
    chat.room.unreadMessages = returnUnreadMessages(chat.room._id)
    allRooms.value.push(chat)
})

function evaluate() {
    let finalValue = ref(0)
    props.rooms.forEach(room => {
        finalValue.value = returnUnreadMessages(room.room._id)
    })
    return finalValue.value
}

evaluated.value = evaluate()


</script>

<style scoped>
.active-bg {
    background: rgba(37,99,235, 0.08);
}
</style>