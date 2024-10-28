<template>
    <div class="bg-white w-full h-full flex flex-col items-center justify-start p-5">
        <div class="w-full flex-row-center h-fit">
            <svg xmlns="http://www.w3.org/2000/svg" @click="$emit('cancelMedia')" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-7 h-7 cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
        </div>

        <div class="w-full px-5 media h-full flex flex-col items-center justify-center">
            <video :src="props.mediaData.link" playsinline class="main-media w-full rounded-md"
                v-if="props.mediaData.type.includes('video')" loop autoplay preload="auto"></video>
            <img :src="props.mediaData.link" v-else class="main-media w-full rounded-md">
        </div>
        <div class="flex flex-row items-center gap-x-3  border-t pt-4 border-t-gray-200 w-full">
            <input type="text" v-model="textMessage" @keydown="checkForEnter"
                class="message-input w-full rounded-md h-11 border pl-3 border-gray-200 outline-none focus:border-2 focus:border-blue-600"
                :class="{ 'border-red-500': inputMsgErr }" placeholder="Type something..." style="background: #F4F6FF;">
            <img src="../../../../assets/icons/send-message.svg" class="cursor-pointer" @click="sendMessage" alt="">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    mediaData: {
        type: Object
    },
    message: {
        type: String,
    }
})

const textMessage = ref(props.message)

const emit = defineEmits(['sendMessage', 'cancelMedia'])

const checkForEnter = (e) => {
    var key = e.keyCode
    if (key === 13 || key === 'Enter') {
        sendMessage()
    }
}

function sendMessage() {
    emit('sendMessage', textMessage.value || null)
}
</script>

<style scoped>
.media {
    min-width: 300px;
}

.main-media {
    object-fit: cover;
    height: 100%;
    max-height: 400px;
    width: 100%;
}

@media screen and (min-width: 356) {
    .main-media {
        width: 350px
    }
}
</style>