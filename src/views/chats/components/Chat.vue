<template>
    <div
        class="flex flex-col items-center justify-center md:border no-scroll-btn relative rounded-lg md:border-gray-200 w-full lg:w-2/3 h-screen md:h-full overflow-hidden">
        <div class="flex flex-col gap-y-2 h-fit" v-if="!props.chat">
            <img src="../../../assets/illustrations/no-conversation.svg" alt="">
            <p class="text-lg text-webapp">No conversation yet</p>
        </div>

        <div class="flex flex-col w-full h-full justify-between items-center overflow-hidden no-scroll-btn" v-else
            :class="{ 'hidden': viewFullImage.length > 0 || !onMainPage }">
            <div class="flex flex-row items-center justify-between w-full border-b h-fit border-b-gray-200 px-2 lg:px-5 py-1"
                :class="{ 'relative': onPhone }">
                <div class="rounded-full w-13 h-13 grid place-items-center">
                    <img :src="props.chat.user.profilePicture" style="width: 40px; height: 40px;"
                        class="w-13 h-13 rounded-full" alt=""
                        v-if="screenWidth > 1023 && props.chat.user.profilePicture !== 'https://i.ibb.co/gtpxMJz/21.png'">
                    <Avatar size="100%" style="width: 40px; height: 40px;"
                        v-if="screenWidth > 1023 && props.chat.user.profilePicture === 'https://i.ibb.co/gtpxMJz/21.png'"
                        :fname="props.chat.user.fname" :lname="props.chat.user.surname" />
                    <svg xmlns="http://www.w3.org/2000/svg" @click="$emit('leaveChat', props.chat)"
                        v-if="screenWidth < 1024" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0A1045"
                        class="w-6 h-6 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
                <div class="flex flex-col items-center w-full h-full">
                    <img :src="props.chat.user.profilePicture" class="w-16 h-16 rounded-full"
                        style="width: 45px; height:45px;" alt=""
                        v-if="screenWidth < 1024 && props.chat.user.profilePicture !== 'https://i.ibb.co/gtpxMJz/21.png'">
                    <Avatar size="100%" class="w-16 h-16" style="max-width: 40px; height:40px; max-height: 40px;"
                        v-if="screenWidth < 1024 && props.chat.user.profilePicture === 'https://i.ibb.co/gtpxMJz/21.png'"
                        :fname="props.chat.user.fname" :lname="props.chat.user.surname" />


                    <span class="text-lg text-left  text-webapp font-medium" v-if="screenWidth > 1023">{{
                        props.chat.user.fname + ' ' +
                        props.chat.user.surname }}
                    </span>

                    <div class="w-fit h-fit flex-row-center gap-x-1" v-if="otherUserOnline && !userTyping">
                        <span v-motion :initial="{ scale: 0.5, opacity: 0.2 }" :delay="20"
                            :enter="{ scale: 1.2, opacity: 1, transition: { repeat: Infinity, delay: 50, type: 'spring', mass: 2 } }"
                            class="w-1 h-1 bg-green-400 rounded-full text-webapp"></span>

                        <p class="text-sm text-sub-webapp font-medium">Online</p>
                    </div>
                    <div class="w-fit h-fit flex-row-center gap-x-1" v-if="!otherUserOnline && !userTyping">
                        <span v-motion :initial="{ scale: 0.5, opacity: 0.2 }" :delay="20"
                            :enter="{ scale: 1.2, opacity: 1, transition: { repeat: Infinity, delay: 50, type: 'spring', mass: 2 } }"
                            class="w-1 h-1 bg-red-400 rounded-full text-webapp"></span>

                        <p class="text-sm text-sub-webapp font-medium">Offline</p>
                    </div>
                    <p class="text-sm text-primary font-medium" v-if="userTyping">typing...</p>
                    <p class="text-sm text-primary font-medium" v-if="userRecordingAudio">recording audio...</p>

                </div>
                <img src="../../../assets/icons/phone.svg" class="cursor-pointer" @click="toggleMobilePhone" alt="">
            </div>

            <!-- messages -->
            <div class="flex flex-col items-center w-full overflow-y-scroll messages-box no-scroll-btn" ref="messagesBox">
                <div class="flex flex-col w-full h-fit py-6 items-center justify-start"
                    v-for="(chatGroup, index) in sortedChats()" :key="(chatGroup, index)" ref="chats">
                    <div class="flex flex-row items-center gap-x-2">
                        <hr class="w-32">
                        <span class="text-xs text-sub-webapp text-center">{{ moment(new Date(index)).format('MMM D, YY')
                        }}</span>
                        <hr class="w-32">
                    </div>

                    <div class="flex flex-col w-full items-center justify-start px-3" v-for="chat in chatGroup" :key="chat">
                        <div class="w-full items-center my-2" ref="messageBox">
                            <Message :data="chat" :userId="$store.state.user._id" @viewFullImage="viewImage" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- upload images -->
            <form enctype="multipart/form-data" class="hidden">
                <input type="file" ref="inputMedia" accept="video/mp4,image/*" @change="previewImg($event.target)">
            </form>

            <!-- bottom chatbox -->
            <div class="flex flex-row items-center justify-between w-full  relative border-t h-14 border-t-gray-200 px-3 lg:px-10 py-3 mb-2"
                v-if="recordingTime === 0 || recordingState === 'NONE'">
                <div class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" @click="openAttachments = !openAttachments"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        class="w-5 h-5 cursor-pointer rotate-180">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                    </svg>

                    <div v-motion :initial="{ y: 10, opacity: 0.5 }" :enter="{ y: 0, opacity: 1 }"
                        class="absolute gap-x-3 div-center-row w-20 h-10 left-3 bottom-full z-20 rounded-3xl border border-gray-100 bg-gray-100"
                        v-if="openAttachments">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" @click="record"
                            class="w-6 h-6 text-primary cursor-pointer">
                            <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                            <path
                                d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            class="w-6 h-6 text-primary cursor-pointer" @click="callImgProcessor">
                            <path fill-rule="evenodd"
                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                clip-rule="evenodd" />
                        </svg>

                    </div>

                </div>

                <input type="text" v-model="inputMsg" @keydown="checkForEnter" @focusin="emitTypingEvent('in')"
                    @focusout="emitTypingEvent('out')" enterkeyhint="send"
                    class="message-input w-10/12 rounded-md h-11 border pl-3 border-gray-200 text-black"
                    :class="{ 'border-red-500 text-red-500 ': inputMsgErr }" placeholder="Type something..."
                    style="background: #F4F6FF;">
                <img src="../../../assets/icons/send-message.svg" class="cursor-pointer" v-if="!onUploadingImage"
                    @click="sendMessage({ media: null, show: true })" alt="">
                <Preloader v-else class="scale-80" />
            </div>

            <!-- audio bottom chatbox -->
            <div v-motion :initial="{ y: 10, opacity: 0.5 }" :enter="{ y: 0, opacity: 1 }"
                class="flex flex-col items-center justify-between w-full bg-webapp h-28 px-3 lg:px-10 py-2" v-else>

                <div class="flex-row-center gap-x-6 w-5/6 justify-between md:justify-center"
                    v-if="recordingState !== 'NONE'">
                    <p class="text-white font-medium text-sm">{{ recordingTime.toString().substr(0, 4) }}</p>

                    <svg v-if="recordingState === 'RECORDING'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="currentColor" class="w-5 h-5 text-red-400 cursor-pointer blink">
                        <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                        <path
                            d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-5 h-5 text-red-400 cursor-pointer">
                        <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                        <path
                            d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
                    </svg>
                </div>

                <div class="flex-row-center w-full justify-between lg:justify-center lg:gap-x-8">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" @click="deleteRecording"
                        class="w-5 h-5 text-gray-100">
                        <path fill-rule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                            clip-rule="evenodd" />
                    </svg>

                    <svg @click="pauseOrResumeRecording" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="currentColor" v-if="recordingState === 'PAUSED'" class="w-5 h-5 text-red-400 cursor-pointer">
                        <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                        <path
                            d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
                    </svg>
                    <svg @click="pauseOrResumeRecording" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" v-else stroke="currentColor" class="w-6 h-6 text-red-400 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <img src="../../../assets/icons/send-message.svg" class="cursor-pointer" @click="stopAndSendRecording"
                        alt="">
                </div>
            </div>
        </div>


        <ChatMedia :mediaData="imageData" :message="inputMsg" @sendMessage="sendMediaMessage" v-motion
            :initial="{ opacity: 0.5, y: -100 }" :enter="{ opacity: 1, y: 0 }" :leave="{ opacity: 0.6, y: 100 }"
            @cancelMedia="deleteMedia" v-if="!onMainPage && viewFullImage.length === 0" />

        <div class="w-full h-full bg-black flex flex-col justify-start relative" v-if="viewFullImage.length > 0" v-motion
            :enter="{ scale: 1.0, opacity: 1 }" :initial="{ scale: 0.1, opacity: 0.3 }">
            <img :src="viewFullImage" class="media-full">

            <div class="flex flex-row items-center h-14 pl-4 w-full absolute top-0"
                style="background: rgba(255, 255, 255, 0.2);">
                <svg @click="leaveImageViewer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                </svg>
            </div>
        </div>

        <div v-if="onMobilePhone"
            class="absolute top-0 left-0 w-full h-full flex justify-end flex-col pb-10 items-center z-20 gap-y-2 bg-neutral-700 opacity-95">

            <div class="w-full flex-col-center h-fit" v-if="chat.user">

                <div v-motion-slide-top :delay="50"
                    class="flex flex-row items-center cursor-pointer justify-center bg-white  rounded-xl border border-gray-100 gap-x-2 py-5 w-11/12 "
                    @click="dialPhone()" v-if="mainNavigator && mainNavigator.mediaDevices">
                    <img src="../../../assets/icons/phone.svg" alt="">
                    <span class="text-sm text-primary font-medium">Call {{ chat.user.fname }}</span>
                </div>

                <a v-else v-motion-slide-top :delay="50"
                    class="flex flex-row items-center cursor-pointer justify-center bg-white  rounded-xl border border-gray-100 gap-x-2 py-5 w-11/12"
                    :href="'tel:' + chat.user.phoneNumber">
                    <img src="../../../assets/icons/phone.svg" alt="">
                    <span class="text-sm text-primary font-medium">Call {{ chat.user.fname }}</span>
                </a>
            </div>
            <div v-motion-slide-top :delay="100"
                class="flex flex-row items-center cursor-pointer justify-center bg-white  rounded-xl border border-gray-100 gap-x-2 py-5 w-11/12 "
                @click="writeToClipboard('+' + chat.user.phoneNumber)" v-if="chat.user">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="w-6 h-6 text-primary">
                    <path fill-rule="evenodd"
                        d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 01-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0113.5 1.5H15a3 3 0 012.663 1.618zM12 4.5A1.5 1.5 0 0113.5 3H15a1.5 1.5 0 011.5 1.5H12z"
                        clip-rule="evenodd" />
                    <path
                        d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 019 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0116.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625v-12z" />
                    <path
                        d="M10.5 10.5a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963 5.23 5.23 0 00-3.434-1.279h-1.875a.375.375 0 01-.375-.375V10.5z" />
                </svg>


                <span class="text-sm text-primary font-medium">Copy "{{ '+' + chat.user.phoneNumber }}"</span>
            </div>
            <div @click="toggleMobilePhone" v-motion-slide-bottom :delay="150"
                class="flex flex-row items-center cursor-pointer justify-center bg-white  rounded-xl border border-gray-100 gap-x-2 py-3 w-11/12 ">
                <span class="text-xl text-black font-medium">Cancel</span>
            </div>
        </div>



        <VoiceCall @endCall="endCall" @clean="cleanCallState" :shouldEndCall="shouldEndVoiceCall"
            :userOnline="otherUserOnline" v-motion-slide-right :details="callDetails" class="absolute top-0 left-0  z-20"
            v-if="onVoiceCall" />
    </div>
</template>
  
<script setup>

import Message from './Message.vue'
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { io } from "socket.io-client";
import { useStore } from 'vuex';
import moment from 'moment'
import ChatMedia from './modules/ChatMedia.vue'
import axios from '../../../composables/axios';
import { VoiceRecorder } from 'capacitor-voice-recorder';
import VoiceCall from "./modules/VoiceCall.vue"

// show phone modal
const onMobilePhone = ref(false)
const onVoiceCall = ref(false)

function toggleMobilePhone() {
    onMobilePhone.value = !onMobilePhone.value
}
function toggleVoiceCall() {
    onVoiceCall.value = !onVoiceCall.value
}

const mainNavigator = navigator

async function dialPhone() {
    if (navigator.mediaDevices) {
        toggleMobilePhone()
        onPhone.value = false
        shouldEndVoiceCall.value = false
        socket.emit('call', { handle: chat.user.handle })


        callDetails.event = 'calling'
        callDetails.handle = chat.user.handle
        callDetails.user = chat.user
        toggleVoiceCall()
    } else {
        toggleMobilePhone()
    }

}

function endCall() {
    shouldEndVoiceCall.value = true
    socket.emit('endCall')
}

function cleanCallState() {
    onVoiceCall.value = false
    shouldEndVoiceCall.value = false
    callDetails = reactive({
        event: '',
        handle: '',
        user: {}
    })
}


const openAttachments = ref(false)


const route = useRoute()
const router = useRouter()
const store = useStore()
const props = defineProps(['chat', 'connectedUsers'])
const emit = defineEmits(['showPhone', 'updateMsg', 'leaveChat', 'updateOnlineUsers'])
const chat = Object.create(props.chat)

import { useHead } from '@vueuse/head'
const title = ref(`Habeep | ${props.chat.user.fname} Chat`)

useHead({
    title: () => title.value
})

// audio system
const newAudio = ref(null)
const hasRecorded = ref(false)
const recordingTime = ref(0.00)
const recorderIntTimer = ref(null)
const newAudioURL = ref(null)
const recordingState = ref('NONE')

async function getRecordingState() {
    const recorderState = await VoiceRecorder.getCurrentStatus()
    const format = recorderState.status
    recordingState.value = format
    return format
}

setInterval(async () => {
    if (hasRecorded.value) {
        await getRecordingState()
    }
}, 1000);

async function record() {
    newAudio.value = null;
    recordingTime.value = 0.00
    openAttachments.value = false

    const checkDeviceRecord = await VoiceRecorder.canDeviceVoiceRecord()

    if (checkDeviceRecord.value) {
        try {
            const requestPermission = await VoiceRecorder.requestAudioRecordingPermission()

            if (requestPermission.value) {
                const start = await VoiceRecorder.startRecording()
                emitRecordingAudioEvent('on')
                if (start.value === true) {
                    hasRecorded.value = true
                    recorderIntTimer.value = null
                    recorderIntTimer.value = setInterval(() => {
                        if (Number(recordingTime.value.toString().substring(2, 4)) === 58) {
                            recordingTime.value = Number((recordingTime.value + 1).toString().substring(0, 1) + '.00')
                        } else {
                            recordingTime.value += 0.01
                        }
                    }, 1000)
                }
            }
        } catch (error) {
            if (error.message === 'ALREADY_RECORDING') {
                await VoiceRecorder.stopRecording()
                const start = await VoiceRecorder.startRecording()
                emitRecordingAudioEvent('on')
                if (start.value === true) {
                    hasRecorded.value = true
                    recorderIntTimer.value = null
                    recorderIntTimer.value = setInterval(() => {
                        if (Number(recordingTime.value.toString().substring(2, 4)) === 58) {
                            recordingTime.value = Number((recordingTime.value + 1).toString().substring(0, 1) + '.00')
                        } else {
                            recordingTime.value += 0.01
                        }
                    }, 1000)
                }
            }
        }
    }
}

async function pauseOrResumeRecording() {
    const recorderState = await VoiceRecorder.getCurrentStatus()
    if (recorderState.status === 'RECORDING') {
        await VoiceRecorder.pauseRecording()
        clearInterval(recorderIntTimer.value)
    } else if (recorderState.status === 'PAUSED') {
        await VoiceRecorder.resumeRecording()
        recorderIntTimer.value = null
        recorderIntTimer.value = setInterval(() => {
            if (Number(recordingTime.value.toString().substring(2, 4)) === 58) {
                recordingTime.value = Number((recordingTime.value + 1).toString().substring(0, 1) + '.00')
            } else {
                recordingTime.value += 0.01
            }
        }, 1000)
    } else {
        await VoiceRecorder.startRecording()
        recorderIntTimer.value = null
        emitRecordingAudioEvent('on')
        recorderIntTimer.value = setInterval(() => {
            if (Number(recordingTime.value.toString().substring(2, 4)) === 58) {
                recordingTime.value = Number((recordingTime.value + 1).toString().substring(0, 1) + '.00')
            } else {
                recordingTime.value += 0.01
            }
        }, 1000)
    }
}

async function stopAndSendRecording() {
    const stop = await VoiceRecorder.stopRecording()
    emitRecordingAudioEvent('off')
    newAudio.value = stop.value
    const base64Sound = stop.value.recordDataBase64
    const mimeType = stop.value.mimeType
    newAudioURL.value = `data:${mimeType};base64,${base64Sound}`

    clearInterval(recorderIntTimer.value)

    recordingTime.value = 0

    let newMessage = {
        msg: 'VN',
        timeCreated: moment().format('LTS'),
        dateCreated: moment().format('L'),
        read: false,
        media: newAudioURL.value,
        userId: store.state.user._id
    }


    if (datedChats.value[0].hasOwnProperty(newMessage.dateCreated)) {
        datedChats.value[0][newMessage.dateCreated].push(newMessage)
    } else {
        datedChats.value[0][newMessage.dateCreated] = [newMessage]
    }

    chatsArray.value.push(newMessage)
    scrollToView()
    onUploadingImage.value = true

    const link = await uploadVoiceNote(newAudioURL.value)

    onUploadingImage.value = false

    if (typeof (link) === 'string') {
        inputMsg.value = 'VN'
        sendMessage({ media: link, show: false })
    }


}

async function uploadVoiceNote(newAudioURL) {
    try {
        const base64Response = await fetch(newAudioURL);
        const blob = await base64Response.blob();
        let formData = new FormData();
        formData.append('audio1', blob)
        const body = {
            description: 'audioMessages'
        }
        formData.append('data', JSON.stringify(body))

        const saveAudio = await axios.post('/utility/save-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        return saveAudio.data.data[0].link
    } catch (error) {
        return error.message
    }
}

async function deleteRecording() {
    await VoiceRecorder.stopRecording();
    emitRecordingAudioEvent('off')
    recordingTime.value = 0.00
    newAudio.value = null
}


const chats = ref(null)
const messageBox = ref(null)
const onMainPage = ref(true)
const messagesBox = ref(null)
const viewFullImage = ref('')

const datedChats = ref([{}])
let chatsArray = ref(chat.room.chats)

function viewImage(image) {
    viewFullImage.value = image
}

function leaveImageViewer() {
    viewFullImage.value = ''
    scrollToView()
}

function sortedChats() {
    let sortDatedChats = {}
    Object.keys(datedChats.value[0]).sort(function (a, b, c) {
        return moment(new Date(c)).format('DD/MM/YYYY') - moment(new Date(b)).format('DD/MM/YYYY') - moment(new Date(a)).format('DD/MM/YYYY');
    }).forEach(function (key) {
        sortDatedChats[key] = datedChats.value[0][key];
    })

    return sortDatedChats
}


// sockets settings
const socket = io("https://habeep.org", {
    path: '/backend/sockets/',
    auth: {
        token: store.state.sessionId
    },
    transports: ['websocket', 'polling']
});


socket.on("connect", () => {
    socket.emit('user_connected', store.state.user._id)
    if (chat) {
        socket.emit('joinRoom', { roomId: chat.room._id, users: chat.room.users })
    }
});

socket.on('updateConnectedUsers', (data) => {
    emit('updateOnlineUsers', data)
    let otherUserId = chat.room.users.filter(user => {
        return user !== store.state.user._id
    })
    otherUserId = otherUserId[0]
    if (data.includes(otherUserId)) {
        otherUserOnline.value = true
    } else {
        otherUserOnline.value = false
    }
})


socket.on("message", (msg) => {
    if (msg.userId !== store.state.user._id) {
        chatsArray.value.forEach(chat => {
            chat.read = true
        })
        props.chat.room.chats.forEach(chat => {
            chat.read = true
        })
        chatsArray.value.forEach(chat => {
            chat.read = true
        })

        otherUserOnline.value = true
        if (datedChats.value[0].hasOwnProperty(msg.dateCreated)) {
            datedChats.value[0][msg.dateCreated].push(msg)
            if (msg.userId !== store.state.user._id) {
                datedChats.value[0][msg.dateCreated].forEach(chat => {
                    chat.read = true
                })
            }
        } else {
            datedChats.value[0][msg.dateCreated] = [msg]
        }
        chatsArray.value.push(msg)
        scrollToView()
    }
})


// typing events
const userTyping = ref(false)
const userRecordingAudio = ref(false)
function emitTypingEvent(state) {
    if (state === 'in') {
        socket.emit('typing')
    } else {
        socket.emit('not-typing')
    }
}
function emitRecordingAudioEvent(state) {
    if (state === 'on') {
        socket.emit('recordingAudio')
    } else {
        socket.emit('notRecordingAudio')
    }
}

let callDetails = reactive({
    event: '',
    handle: '',
    user: {}
})

socket.on('typing', () => {
    userTyping.value = true
})
socket.on('not-typing', () => {
    userTyping.value = false
})
socket.on('recordingAudio', () => {
    userRecordingAudio.value = true
})
socket.on('notRecordingAudio', () => {
    userRecordingAudio.value = false
})

const shouldEndVoiceCall = ref(false)

socket.on('userCalling', (data) => {
    otherUserOnline.value = true
    if (!onVoiceCall.value) {
        shouldEndVoiceCall.value = false
        callDetails.event = 'receiving'
        callDetails.handle = data.caller
        callDetails.user = chat.user
        toggleVoiceCall()
    }
})

socket.on('endCall', () => {
    shouldEndVoiceCall.value = true
})


socket.on('savedMsg', payload => {
    try {
        if (payload.senderId === store.state.user._id) {
            const filterChat = chatsArray.value.filter(chat => {
                return chat.tempId === payload.tempId
            })
            if (filterChat.length > 0) {
                if (props.chat.room.chats[props.chat.room.chats.indexOf(filterChat[0])]) {
                    props.chat.room.chats[props.chat.room.chats.indexOf(filterChat[0])]._id = payload.newId
                }
                if (chatsArray.value[chatsArray.value.indexOf(filterChat[0])]) {
                    chatsArray.value[chatsArray.value.indexOf(filterChat[0])]._id = payload.newId
                }

                if (filterChat[0].dateCreated) {
                    if (datedChats.value[0].hasOwnProperty(filterChat[0].dateCreated)) {
                        datedChats.value[0][filterChat[0].dateCreated][datedChats.value[0][filterChat[0].dateCreated].indexOf(filterChat[0])]._id = payload.newId
                    }
                }
            }
        }
    } catch (error) {
        return false
    }
})

socket.on('deleteMsg', (id) => {
    try {
        const filterChat = chatsArray.value.filter(chat => {
            return chat._id === id
        })
        if (filterChat.length > 0) {
            if (props.chat.room.chats[props.chat.room.chats.indexOf(filterChat[0])]) {
                props.chat.room.chats[props.chat.room.chats.indexOf(filterChat[0])]['deleted'] = true
            }
            if (chatsArray.value[chatsArray.value.indexOf(filterChat[0])]) {
                chatsArray.value[chatsArray.value.indexOf(filterChat[0])]['deleted'] = true
            }

            if (filterChat[0].dateCreated) {
                if (datedChats.value[0].hasOwnProperty(filterChat[0].dateCreated)) {
                    datedChats.value[0][filterChat[0].dateCreated][datedChats.value[0][filterChat[0].dateCreated].indexOf(filterChat[0])]['deleted'] = true
                }
            }
        }
    } catch (error) {
        return false
    }
})


const otherUserOnline = ref(false)
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

        if (options.show === true) {
            if (datedChats.value[0].hasOwnProperty(newMessage.dateCreated)) {
                datedChats.value[0][newMessage.dateCreated].push(newMessage)
            } else {
                datedChats.value[0][newMessage.dateCreated] = [newMessage]
            }

            chatsArray.value.push(newMessage)
            scrollToView()
        }

        inputMsg.value = ''
        socket.emit('not-typing')
        socket.emit("chatMessage", { roomId: chat.room._id, message: newMessage })
    }

}


const checkForEnter = (e) => {
    var key = e.keyCode
    if (key === 13 || key === 'Enter') {
        sendMessage({ media: null, show: true })
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
    openAttachments.value = false
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
    // upload pre message
    let newMessage = {
        msg: null,
        timeCreated: moment().format('LTS'),
        dateCreated: moment().format('L'),
        read: false,
        media: imageData.link,
        userId: store.state.user._id
    }


    if (datedChats.value[0].hasOwnProperty(newMessage.dateCreated)) {
        datedChats.value[0][newMessage.dateCreated].push(newMessage)
    } else {
        datedChats.value[0][newMessage.dateCreated] = [newMessage]
    }

    chatsArray.value.push(newMessage)
    scrollToView()


    const link = await savePhoto()
    if (typeof (link) === 'string') {
        inputMsg.value = msg
        sendMessage({ media: link, show: false })
        onUploadingImage.value = false
    } else {
        onUploadingImage.value = false
    }
}

// check for message templates
if (route.query.template) {
    inputMsg.value = route.query.template
    if (route.query.media) {
        sendMessage({ media: route.query.media, show: true })
    } else {
        sendMessage({ media: null, show: true })
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


.messages-box {
    height: 100%;
}

.blink {
    animation: blink-animation 1s steps(5, start) infinite;
    -webkit-animation: blink-animation 1s steps(5, start) infinite;
    transition: all 1s;
}

@keyframes blink-animation {
    to {
        opacity: 0.1;
    }
}

@-webkit-keyframes blink-animation {
    to {
        opacity: 0.1;
    }
}


.media-full {
    object-fit: contain;
    height: 100%;
    height: 100%;
    width: 100%;
}
</style>