<template>
    <div
        class="flex flex-col items-center justify-center md:border no-scroll-btn relative md:border-gray-200 rounded-2xl w-full lg:w-2/3 h-screen md:h-full overflow-hidden">
        <div class="flex flex-col gap-y-2 h-fit" v-if="!props.chat">
            <img src="../../../assets/illustrations/no-conversation.svg" alt="">
            <p class="text-lg text-webapp">No conversation yet</p>
        </div>
        <div class="flex flex-col w-full h-full justify-between items-center overflow-hidden" v-else-if="onMainPage">
            <div
                class="flex flex-row items-center justify-between w-full sticky border-b h-fit border-b-gray-200 px-2 lg:px-5 py-3">
                <div class="rounded-full w-13 h-13 grid place-items-center">
                    <img :src="props.chat.user.profilePicture" style="width: 45px; height: 45px;" class="w-13 h-13 rounded-full" alt="" v-if="screenWidth > 1023">
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
            <div class="flex flex-col items-center w-full overflow-y-scroll messages-box no-scroll-btn"
                ref="messagesBox">
                <div class="flex flex-col w-full h-fit py-6 items-center justify-start"
                    v-for="(chatGroup, index) in sortedChats()" :key="(chatGroup, index)" ref="chats">
                    <div class="flex flex-row items-center gap-x-2">
                        <hr class="w-32">
                        <span class="text-xs text-sub-webapp">{{ moment(new Date(index)).format('MMM D, YY') }}</span>
                        <hr class="w-32">
                    </div>

                    <div class="flex flex-col w-full items-center justify-start px-3" v-for="chat in chatGroup" :key="chat">
                        <div class="w-full items-center my-2" ref="messageBox">
                            <Message :data="chat" :userId="$store.state.user._id" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- upload images -->
            <form enctype="multipart/form-data" class="hidden">
                <input type="file" ref="inputMedia" accept="audio/*,video/mp4,image/*" @change="previewImg($event.target)">
            </form>

            <!-- bottom chatbox -->
            <div
                class="flex flex-row items-center justify-between w-full  border-t h-14 border-t-gray-200 px-3 lg:px-10 py-3 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" @click="callImgProcessor" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5 cursor-pointer rotate-180">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                </svg>


                <input type="text" v-model="inputMsg" @keydown="checkForEnter"
                    class="message-input w-10/12 rounded-md h-11 border pl-3 border-gray-200 text-black"
                    :class="{ 'border-red-500 text-red-500 ': inputMsgErr }" placeholder="Type something..."
                    style="background: #F4F6FF;">
                <img src="../../../assets/icons/send-message.svg" class="cursor-pointer" v-if="!onUploadingImage"
                    @click="sendMessage({ media: null })" alt="">
                <Preloader v-else class="scale-80" />
            </div>
        </div>

        <ChatMedia :mediaData="imageData" :message="inputMsg" @sendMessage="sendMediaMessage" v-motion
            :initial="{ opacity: 0.5, y: -100 }" :enter="{ opacity: 1, y: 0 }" :leave="{ opacity: 0.6, y: 100 }"
            @cancelMedia="deleteMedia" v-else />
    </div>
</template>
  
<script setup>
import Message from './Message.vue'
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { io } from "socket.io-client";
import { useStore } from 'vuex';
import moment from 'moment'
import ChatMedia from './modules/ChatMedia.vue'
import axios from '../../../composables/axios';


const route = useRoute()
const router = useRouter()
const store = useStore()
const props = defineProps(['chat'])
const emit = defineEmits(['showPhone', 'updateMsg', 'leaveChat'])
const chat = props.chat



const chats = ref(null)
const messageBox = ref(null)
const onMainPage = ref(true)
const messagesBox = ref(null)

let chatsArray = ref(chat.room.chats)
const datedChats = ref([{}])

function sortedChats() {
    let sortDatedChats = {}
    Object.keys(datedChats.value[0]).sort(function (a, b, c) {
        return moment(new Date(c)).format('DD/MM/YYYY') - moment(new Date(b)).format('DD/MM/YYYY') - moment(new Date(a)).format('DD/MM/YYYY');
    }).forEach(function (key) {
        sortDatedChats[key] = datedChats.value[0][key];
    })

    return sortDatedChats
}

const socket = io("https://habeep.org", {
    path: '/backend/sockets/',
    auth: {
        token: store.state.sessionId
    },
    transports: ['websocket', 'polling']
});


socket.on("connect", () => {
    if (props.chat) {
        socket.emit('joinRoom', { roomId: props.chat.room._id, users: props.chat.room.users })
    }
});

socket.on("online", (user) => {
    otherUserOnline.value = true
})
socket.on("offline", (user) => {
    otherUserOnline.value = false
})

socket.on("message", (msg) => {
    chatsArray.value.forEach(chat => {
        chat.read = true
    })
    datedChats.value[0][msg.dateCreated].forEach(chat => {
        chat.read = true
    })
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


function updateNewestMsg() {
    emit('updateMsg')
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
        // chatsArray.value.push(chat)
    })
    scrollToView()
}

if (props.chat.room.chats.length > 0) {
    formatDBMessages()
}


function sendMessage(options) {
    if (inputMsg.value !== null && inputMsg.value.length < 1) {
        inputMsgErr.value = true
        return false
    }
    if ((options.media && options.media.length > 0) || inputMsg.value === null || inputMsg.value.length > 0) {
        inputMsgErr.value = false

        let newMessage = {
            msg: inputMsg.value,
            timeCreated: moment().format('LTS'),
            dateCreated: moment().format('L'),
            read: false,
            media: options.media,
            userId: store.state.user._id
        }


        if (datedChats.value[0].hasOwnProperty(newMessage.dateCreated)) {
            datedChats.value[0][newMessage.dateCreated].push(newMessage)
        } else {
            datedChats.value[0][newMessage.dateCreated] = [newMessage]
        }

        chatsArray.value.push(newMessage)
        inputMsg.value = ''
        socket.emit("chatMessage", { roomId: chat.room._id, message: newMessage })
        scrollToView()
        updateNewestMsg()
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
        sendMessage({ media: null })
    }
}



function scrollToView() {
    const scrollBlock = setInterval(() => {
        if (messageBox.value[messageBox.value.length - 1] && messageBox.value[messageBox.value.length - 1].scrollHeight) {
            messageBox.value[messageBox.value.length - 1].scrollIntoView()
        }
    }, 200);

    setTimeout(() => {
        clearInterval(scrollBlock)
    }, 600);

}

// media management
const inputMedia = ref(null)
const pic = ref(null)
const onUploadingImage = ref(false)
const imageData = reactive({
    link: '',
    type: ''
})

function callImgProcessor() {
    inputMedia.value.click()
}

const previewImg = async (event) => {
    var input = event;
    
    if (input.files) {
        onUploadingImage.value = true
        imageData.type = input.files[0].type
        pic.value = input.files[0]
        var reader = new FileReader();
        reader.onload = (e) => {
            imageData.link = e.target.result;
            onMainPage.value = false
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

async function savePhoto() {
    try {
        const formData = new FormData();
        formData.append('photo1', pic.value)
        const body = {
            description: 'chatUpload'
        }
        formData.append('data', JSON.stringify(body))

        const saveImage = await axios.post('/utility/save-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        pic.value = null
        imageData.link = ''
        imageData.type = ''

        return saveImage.data.data[0].link
    } catch (error) {
        inputMsgErr.value = true
        inputMsg.value = 'An error occured'
        onUploadingImage.value = false

        setTimeout(() => {
            inputMsg.value = ''
            inputMsgErr.value = false
        }, 2000)

        return error
    }
}

function deleteMedia() {
    onMainPage.value = true
    pic.value = null
    imageData.link = ''
    imageData.type = ''
    scrollToView()

    onUploadingImage.value = false
}

async function sendMediaMessage(msg) {
    onMainPage.value = true
    onUploadingImage.value = true
    scrollToView()
    const link = await savePhoto()
    if (typeof (link) === 'string') {
        inputMsg.value = msg
        sendMessage({ media: link })
        onUploadingImage.value = false
    } else {
        onUploadingImage.value = false
    }
}

// check for message templates
if (route.query.template) {
    inputMsg.value = route.query.template
    if (route.query.media) {
        sendMessage({ media: route.query.media })
    } else {
        sendMessage({ media: null })
    }
    router.replace({ query: null });
}
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

.messages-box {
    height: 100%;
}


.messages-box::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: #71759D;
    border-radius: 10px;
}

.messages-box::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
}
</style>