<template>
    <div
        class="bg-white flex-col flex rounded-[15px] md:max-w-[800px] lg:w-[800px] w-screen md:w-full max-w-screen max-h-[400px] h-[387px]">
        <div class="p-4 w-full flex-row flex justify-end">
            <div class="w-[39px] h-[39px] rounded-full bg-[#F7F7FC] div-center-col cursor-pointer"
                @click="endUserShare">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-[15px] h-[15px]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
        <div class="flex-col-center w-full lg:px-[65px] md:px-[50px] px-4 pb-12 h-full justify-between">
            <p class="w-full text-[22px] text-[#242E4C] helvetica-font">Share this post</p>

            <div class="flex-row-center justify-between w-full">
                <ShareNetwork @click="setActiveSharePlatform('pinterest')" network="pinterest"
                    :url="'https://habeep.org/blog/' + user.username" title="View my Habeep Profile"
                    :media="user.userProfileImage">
                    <div :class="{ 'border-[#0A1045]': activePlatform === 'pinterest' }"
                        class="rounded-full transition-all lg:w-[75px] w-[60px] lg:h-[75px] h-[60px] border border-[#EBEBF2] div-center-col">
                        <img src="../../../assets/icons/socials/pinterest.svg" class="w-[40px] lg:w-max"
                            alt="pinterest">
                    </div>
                </ShareNetwork>
                <ShareNetwork @click="setActiveSharePlatform('telegram')" network="telegram"
                    :url="'https://habeep.org/blog/' + user.username" title="View my Habeep Profile"
                    :media="user.userProfileImage">
                    <div :class="{ 'border-[#0A1045]': activePlatform === 'telegram' }"
                        class="transition-all rounded-full lg:w-[75px] w-[60px] lg:h-[75px] h-[60px] border border-[#EBEBF2] div-center-col">
                        <img src="../../../assets/icons/socials/telegram.gif" class="w-[40px] lg:w-max" alt="telegram">
                    </div>
                </ShareNetwork>
                <ShareNetwork @click="setActiveSharePlatform('twitter')" network="twitter"
                    :url="'https://habeep.org/blog/' + user.username" title="View my Habeep Profile"
                    :media="user.userProfileImage">
                    <div :class="{ 'border-[#0A1045]': activePlatform === 'twitter' }"
                        class="transition-all rounded-full lg:w-[75px] w-[60px] lg:h-[75px] h-[60px] border border-[#EBEBF2] div-center-col">
                        <img src="../../../assets/icons/socials/twitter.svg" class="w-[40px] lg:w-max" alt="twitter">
                    </div>
                </ShareNetwork>
                <ShareNetwork @click="setActiveSharePlatform('whatsapp')" network="whatsapp"
                    :url="'https://habeep.org/blog/' + user.username" title="View my Habeep Profile"
                    :media="user.userProfileImage">
                    <div :class="{ 'border-[#0A1045]': activePlatform === 'whatsapp' }"
                        class="transition-all rounded-full lg:w-[75px] w-[60px] lg:h-[75px] h-[60px] border border-[#EBEBF2] div-center-col">
                        <img src="../../../assets/icons/socials/whatsapp.gif" class="w-[30px] h-[30px] lg:w-max"
                            alt="whatsapp">
                    </div>
                </ShareNetwork>
                <ShareNetwork @click="setActiveSharePlatform('facebook')" network="facebook"
                    :url="'https://habeep.org/blog/' + user.username" title="View my Habeep Profile"
                    :media="user.userProfileImage">
                    <div :class="{ 'border-[#0A1045]': activePlatform === 'facebook' }"
                        class="transition-all rounded-full lg:w-[75px] w-[60px] lg:h-[75px] h-[60px] border border-[#EBEBF2] div-center-col">
                        <img src="../../../assets/icons/socials/facebook.svg" class="w-[40px] lg:w-max" alt="facebook">
                    </div>
                </ShareNetwork>
                <ShareNetwork @click="setActiveSharePlatform('linkedin')" network="linkedin"
                    :url="'https://habeep.org/blog/' + user.username" title="View my Habeep Profile"
                    :media="user.userProfileImage">
                    <div :class="{ 'border-[#0A1045]': activePlatform === 'linkedin' }"
                        class="transition-all rounded-full lg:w-[75px] w-[60px] lg:h-[75px] h-[60px] border border-[#EBEBF2] div-center-col">
                        <img src="../../../assets/icons/socials/linkedin.gif" class="w-[30px] h-[30px] lg:w-max"
                            alt="linkedin">
                    </div>
                </ShareNetwork>
            </div>



            <div class="flex-col flex items-start w-full space-y-1">
                <span class="text-lg text-[#242E4C] helvetica-font">Or copy link</span>
                <div class="w-full px-4 flex-row-center rounded-[5px] h-[57px] border border-[#EBEBF2] justify-between">
                    <p class="text-[16px] helvetica-font lg:inline hidden">{{ 'https://habeep.org/blog/' + user.username
                        }}
                    </p>
                    <p class="text-[14px] helvetica-font inline lg:hidden">
                        <span class="md:inline lg:hidden hidden">
                            {{ ('https://habeep.org/blog/' + user.username).substring(0, 60) }}...
                        </span>
                        <span class="md:hidden lg:inline inline"
                            v-if="('https://habeep.org/blog/' + user.username).length < 30">{{
                    'https://habeep.org/blog/' +
                    user.username }}</span>
                        <span class="md:hidden lg:inline inline" v-else>{{ ('https://habeep.org/blog/' +
                    user.username).substring(0, 30) }}...</span>
                    </p>
                    <span v-if="!copiedShareLink" @click="copyShareLink('https://habeep.org/blog/' + user.username)"
                        class="md:text-[14px] text-[12px]  text-webapp hover:cursor-pointer hover:font-bold transition-all hover:text-[15px]">Copy</span>
                    <span v-else class="text-webapp font-bold md:text-[15px] text-[13px]">Copied</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import copyToClipboard from 'copy-to-clipboard3'
import { ref } from 'vue';


const emit = defineEmits(['endShare'])
const props = defineProps(['user'])

const user = props.user

const copiedShareLink = ref(false)
const activePlatform = ref(null)


function endUserShare() {
    emit('endShare')
    copiedShareLink.value = false
    activePlatform.value = null
}

function copyShareLink(link) {
    copiedShareLink.value = true
    copyToClipboard(link)
    setTimeout(() => {
        copiedShareLink.value = false
    }, 3000);
}

function setActiveSharePlatform(platform) {
    activePlatform.value = platform
}
</script>

<style lang="scss" scoped></style>