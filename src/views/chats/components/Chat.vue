<template>

    <div
        class="flex flex-col items-center justify-center md:border md:border-gray-200 rounded-2xl w-full lg:w-2/3 h-full">
        <div class="flex flex-col gap-y-2 h-fit" v-if="!props.chatState">
            <img src="../../../assets/illustrations/no-conversation.svg" alt="">
            <p class="text-lg text-webapp">No conversation yet</p>
        </div>
        <div class="flex flex-col h-full w-full justify-between items-center" v-else>
            <div
                class="flex flex-row items-center justify-between w-full  relative border-b h-fit border-b-gray-200 px-2 lg:px-10 py-3">
                <div class="rounded-full w-13 h-13 grid place-items-center">
                    <img src="../../../assets/icons/model.svg" v-if="screenWidth > 1023" class="w-full h-full" alt="">
                    <svg xmlns="http://www.w3.org/2000/svg" @click="$emit('leaveChat')" v-else fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="#0A1045" class="w-6 h-6 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
                <div class="flex flex-col items-center">
                    <span class="text-lg text-left  text-webapp font-medium">Duke Carrick</span>
                    <span class="text-sm text-sub-webapp">Online</span>
                </div>
                <img src="../../../assets/icons/phone.svg" class="cursor-pointer" @click="togglePhone" alt="">

                <div v-if="onPhone && screenWidth > 1023"
                    class="flex flex-row items-center absolute right-0 -bottom-10  rounded-xl border border-gray-200 gap-x-2 py-2 px-3 cursor-pointer">
                    <img src="../../../assets/icons/phone.svg" alt="">
                    <span class="text-sm text-primary font-medium">0906127484735</span>
                </div>
            </div>

            <!-- messages -->
            <div class="flex flex-col w-full h-full py-6 md:py-10 items-center">
                <div class="flex flex-row items-center gap-x-2">
                    <hr class="w-32">
                    <span class="text-xs text-sub-webapp">Sat, 17/10</span>
                    <hr class="w-32">
                </div>

                <div class="flex flex-col w-full items-center px-3" v-for="chat in chatsArray" :key="chat">
                    <div class="w-full items-center my-2">
                        <Message :data="chat" />
                    </div>
                </div>
            </div>

            <!-- bottom chatbox -->
            <div
                class="flex flex-row items-center justify-between w-full  border-t h-fit border-t-gray-200  px-2 md:px-3 lg:px-10 py-3">
                <img src="../../../assets/icons/add-assets-chat.svg" alt="">
                <input type="text" v-model="inputMsg"
                    class="message-input w-10/12 md:w-11/12 rounded-md h-11 border pl-3 border-gray-200"
                    :class="{ 'border-red-500': inputMsgErr }" placeholder="Type something..."
                    style="background: #F4F6FF;">
                <img src="../../../assets/icons/send-message.svg" class="cursor-pointer" @click="sendMessage" alt="">
            </div>
        </div>
    </div>

   
</template>
  
<script setup>
import Message from './Message.vue'
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps(['chatState'])

const emit = defineEmits(['showPhone'])

const inputMsg = ref('')
const inputMsgErr = ref(false)

const screenWidth = ref(window.innerWidth)

const onPhone = ref(false)

let chatsArray = ref([
    {
        msg: 'Hello, i saw your ads and will like to see it',
        time: '16:50',
        status: true,
        user: 'other'
    },
    {
        msg: 'Helllo buddy, can we meet at crunchies?',
        time: '16:50',
        status: true,
        user: 'other'
    },
    {
        msg: 'I will be there in 30 minutes, thkk',
        time: '16:50',
        status: true,
        user: 'me'
    },
])

function sendMessage() {
    if (inputMsg.value.length < 1) {
        inputMsgErr.value = true
    }
    if (inputMsg.value.length > 0) {
        inputMsgErr.value = false

        let newMessage = {
            msg: inputMsg.value,
            time: new Date().getTime(),
            status: false,
            user: 'me'
        }

        chatsArray.value.push(newMessage)

        inputMsg.value = ''
    }

}

function togglePhone() {
    onPhone.value = !onPhone.value

    if (screenWidth.value < 1024) {
        emit('showPhone')
    }
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
</style>