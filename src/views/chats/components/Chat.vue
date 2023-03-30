<template>
    <div class="flex flex-col items-center justify-center md:border md:border-gray-200 rounded-2xl w-full lg:w-2/3 h-full">
        <div class="flex flex-col gap-y-2 h-fit" v-if="!props.chat">
            <img src="../../../assets/illustrations/no-conversation.svg" alt="">
            <p class="text-lg text-webapp">No conversation yet</p>
        </div>
        <div class="flex flex-col w-full h-full justify-between items-center" v-else>
            <div
                class="flex flex-row items-center justify-between w-full  relative border-b h-fit border-b-gray-200 px-2 lg:px-5 py-1">
                <div class="rounded-full w-13 h-13 grid place-items-center">
                    <img :src="props.chat.user.profilePicture" class="w-full h-full" alt="" v-if="screenWidth > 1023">
                    <svg xmlns="http://www.w3.org/2000/svg" @click="$emit('leaveChat')" v-else fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="#0A1045" class="w-6 h-6 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
                <div class="flex flex-col items-center">
                    <span class="text-lg text-left  text-webapp font-medium">{{ props.chat.user.fname + ' ' +
                        props.chat.user.surname
                    }}</span>
                    <span class="text-sm text-sub-webapp" v-if="otherUserOnline">Online</span>
                </div>
                <img src="../../../assets/icons/phone.svg" class="cursor-pointer" @click="togglePhone" alt="">

                <a v-if="onPhone && screenWidth > 1023"
                    class="z-20 bg-white flex flex-row items-center absolute right-0 -bottom-10  rounded-xl border border-gray-200 gap-x-2 py-2 px-3 cursor-pointer"
                    :href="'tel:' + props.chat.user.phoneNumber">
                    <img src="../../../assets/icons/phone.svg" alt="">
                    <span class="text-sm text-primary font-medium">{{ props.chat.user.phoneNumber }}</span>
                </a>
            </div>

            <!-- messages -->
            <div class="flex flex-col items-center w-full h-full overflow-y-auto messages-box" :ref="messagesBox">
                <div class="flex flex-col w-full h-fit py-6 items-center justify-start"
                    v-for="(chatGroup, index) in sortedChats()" :key="(chatGroup, index)">
                    <div class="flex flex-row items-center gap-x-2">
                        <hr class="w-32">
                        <span class="text-xs text-sub-webapp">{{ moment(index).format('ll') }}</span>
                        <hr class="w-32">
                    </div>

                    <div class="flex flex-col w-full items-center justify-start px-3" v-for="chat in chatGroup" :key="chat">
                        <div class="w-full items-center my-2" ref="messageBox">
                            <Message :data="chat" :userId="$store.state.user._id" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- bottom chatbox -->
            <div
                class="flex flex-row items-center justify-between w-full  border-t h-fit border-t-gray-200  px-2 md:px-3 lg:px-10 py-3">
                <img src="../../../assets/icons/add-assets-chat.svg" alt="">
                <input type="text" v-model="inputMsg" @keydown="checkForEnter"
                    class="message-input w-10/12 md:w-11/12 rounded-md h-11 border pl-3 border-gray-200"
                    :class="{ 'border-red-500': inputMsgErr }" placeholder="Type something..." style="background: #F4F6FF;">
                <img src="../../../assets/icons/send-message.svg" class="cursor-pointer" @click="sendMessage" alt="">
            </div>
        </div>
    </div>
</template>
  
<script setup>
import Message from './Message.vue'
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { io } from "socket.io-client";
import { useStore } from 'vuex';
import moment from 'moment'

const route = useRoute()
const store = useStore()
const props = defineProps(['chat'])
const emit = defineEmits(['showPhone', 'updateMsg'])
const chat = props.chat

const messageBox = ref(null)
const messagesBox = ref(null)

let chatsArray = ref(chat.room.chats)
const datedChats = ref([{}])

function sortedChats() {
    let sortDatedChats = {}
    Object.keys(datedChats.value[0]).sort(function (a, b, c) {
        return moment(c, 'DD/MM/YYYY').toDate() - moment(b, 'DD/MM/YYYY').toDate() - moment(a, 'DD/MM/YYYY').toDate();
    }).forEach(function (key) {
        sortDatedChats[key] = datedChats.value[0][key];
    })

    return sortDatedChats

}

const socket = io("http://localhost:2023", {
    path: '/backend',
    auth: {
        token: store.state.sessionId
    }
});


socket.on("connect", () => {
    if (props.chat) {
        socket.emit('joinRoom', { roomId: props.chat.room._id, users: props.chat.room.users })
    }
});

socket.on("online", (user) => {
    if (props.chat.room.users.includes(user)) {
        otherUserOnline.value = true
    }
})
socket.on("offline", (user) => {
    if (props.chat.room.users.includes(user) && user !== store.state.user._id) {
        otherUserOnline.value = false
    }
})

socket.on("message", (msg) => {
    otherUserOnline.value = true
    if (datedChats.value[0].hasOwnProperty(msg.dateCreated)) {
        datedChats.value[0][msg.dateCreated].push(msg)
    } else {
        datedChats.value[0][msg.dateCreated] = [msg]
    }
    chatsArray.value.push(msg)
    scrollToView()
})


const otherUserOnline = ref(false)


function updateNewestMsg(msg) {
    emit('updateMsg', msg)
}

const inputMsg = ref('')
const inputMsgErr = ref(false)

const screenWidth = ref(window.innerWidth)
const onPhone = ref(false)

function formatDBMessages() {
    props.chat.room.chats.forEach(chat => {
        if (datedChats.value[0].hasOwnProperty(chat.dateCreated)) {
            datedChats.value[0][chat.dateCreated].push(chat)
        } else {
            datedChats.value[0][chat.dateCreated] = [chat]
        }
        chatsArray.value.push(chat)
    })
    scrollToView()
}

if (props.chat.room.chats.length > 0) {
    formatDBMessages()
}


function sendMessage() {
    if (inputMsg.value.length < 1) {
        inputMsgErr.value = true
    }
    if (inputMsg.value.length > 0) {
        inputMsgErr.value = false

        let newMessage = {
            msg: inputMsg.value,
            timeCreated: moment().format('LTS'),
            dateCreated: moment().format('L'),
            read: false,
            userId: store.state.user._id
        }


        if (datedChats.value[0].hasOwnProperty(newMessage.dateCreated)) {
            datedChats.value[0][newMessage.dateCreated].push(newMessage)
        } else {
            datedChats.value[0][newMessage.dateCreated] = [newMessage]
        }

        chatsArray.value.push(newMessage)
        scrollToView()
        socket.emit("chatMessage", { roomId: chat.room._id, message: newMessage })
        inputMsg.value = ''
    }

}

function togglePhone() {
    onPhone.value = !onPhone.value

    if (screenWidth.value < 1024) {
        emit('showPhone')
    }
}

const checkForEnter = (e) => {
    var key = e.keyCode
    if (key === 13 || key === 'Enter') {
        sendMessage()
    }
}



function scrollToView() {
    if (messageBox.value !== null) {
        messageBox.value.forEach(msg => {
            msg.scrollIntoView({ behavior: "smooth" });
        })
    }

}

const scrollBlock = setInterval(() => {
    scrollToView()
}, 1000);

setTimeout(() => {
    clearInterval(scrollBlock)
}, 5000);
</script>
  
<style scoped>
.message-input::placeholder {
    color: #71759D;
    font-size: 14px;
}

.message-input {
    outline: none;
    border: 1px solid #D9DDEE;
}

.message-input:focus {
    border: 1px solid #1B49FF;
}

.messages-box::-webkit-scrollbar {
    width: 6px;
}


.messages-box::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #71759D;
    border-radius: 10px;
}

.messages-box::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
}
</style>