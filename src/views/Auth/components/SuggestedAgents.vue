<template>
    <div class="main flex flex-col md:h-64 z-10 pb-5 overflow-hidden bg-white">
        <div class="flex flex-row items-center justify-between w-full px-4 py-4 border-b border-b-gray-100">
            <div class="flex flex-row items-center gap-x-2" @click="($emit('enterAgents'))">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0A1045"
                    class="w-6 h-6 cursor-pointer md:hidden block" @click="$router.go(-1)">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg><span class="text-lg font-medium text-webapp">Discover agents</span>
            </div>
            <img src="../../../assets/icons/x.svg" class="cursor-pointer md:block hidden" @click="$emit('close')" alt="">
        </div>

        <div class="flex flex-col items-center w-full h-full overflow-y-auto px-2 pb-8 relative">
            <div class="agents-to-follow flex w-full flex-col overflow-y-auto no-scroll-btn items-center h-5/6 my-1"
                :class="{ 'justify-center': discoveredAgents.length === 0 }">
                <img src="../../../assets/images/rhombus-preloader.gif" class="m-auto" v-if="discoveredAgents.length === 0">
                <div class="following flex flex-row items-center justify-between w-full py-4 px-4" v-else
                    v-for="agent in discoveredAgents" :key="agent">
                    <div class="flex flex-row gap-x-2 items-center">
                        <div class="rounded-full w-12 h-12 grid place-items-center">
                            <img :src="agent.details.profileImage"
                                class="w-12 h-12 min-h-full min-w-full rounded-full cursor-pointer"
                                v-if="agent.details.profileImage !== 'https://i.ibb.co/gtpxMJz/21.png'" alt="">
                            <Avatar size="100%" v-else :fname="agent.details.name.split(' ')[0]"
                                :lname="agent.details.name.split(' ')[1]" />
                        </div>
                        <div class="flex flex-col items-start">
                            <span
                                class="text-sm xl:text-lg md:text-center text-left following-name text-webapp font-medium">{{
                                    agent.details.name }}</span>
                            <span
                                class="text-sm following-ads-count md:text-center xl:text-left text-left text-sub-webapp">{{
                                    agent.adsCount }} ads</span>
                        </div>
                    </div>
                    <!-- <img src="../../assets/icons/call-btn.svg" alt="" class="cursor-pointer md:ml-4"> -->
                    <button
                        class="w-28 h-8 flex flex-row items-center justify-center rounded-lg text-sm font-medium text-white "
                        :class="{ 'bg-white border border-blue-600': agent.following, 'bg-blue-600': !agent.following }"
                        @click="manageAgentFollow(agent)">
                        <span v-if="!agent.following" class="text-white">Follow</span>
                        <span v-else class="text-blue-600">Unfollow</span>
                    </button>
                </div>
            </div>

            <div class="bottom-0 absolute px-2 w-full" :class="{'md:static': discoveredAgents.length > 10}">
                <button class="bg-primary rounded-lg w-full grid place-items-center h-14 text-white"
                    @click="$emit('finish')">Continue</button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue'
import axios from "../../../composables/axios";

let props = defineProps(['email'])

const discoveredAgents = ref([])

async function discoverAgents() {
    try {
        let data = {
            user: {
                nationality: 'Nigeria'
            }
        }

        const agents = await axios.post('/discover/agents', data)

        if (agents.data.success === true) {
            agents.data.data.forEach(agent => {
                agent.following = false
                discoveredAgents.value.push(agent)
            })
        }
    } catch (error) {

    }

}

async function manageAgentFollow(agent) {
    if (!agent.following) {
        let data = {
            email: props.email,
            userId: agent.id,
            activity: 'follow'
        }

        const follow = await axios.post('/profile/follows/new/update', data)

        agent.following = true
    } else {
        let data = {
            email: props.email,
            userId: agent.id,
            activity: 'unfollow'
        }

        const follow = await axios.post('/profile/follows/new/update', data)

        agent.following = false
    }
}

discoverAgents()

</script>
  
<style scoped>
.main {
    width: 450px;
    height: 460px;
    border-radius: 15px;
}

.agents-to-follow::-webkit-scrollbar {
    width: 6px;
}


.agents-to-follow::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #71759D;
    border-radius: 10px;
}

.agents-to-follow::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
}

@media screen and (max-width: 767px) {
    .main {
        height: 100vh !important;
        width: 100vw;
        border-radius: 0px;
    }
}

.suggs {
    box-shadow: 0px 0.33px 10px 0.33px #EBEBEB;
}
</style>