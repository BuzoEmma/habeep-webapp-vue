<template>
    <div
        class="following-modal flex flex-col drop-shadow-lg shadow-xl bg-white rounded-xl gap-y-3 border top-1/3  border-gray-300 absolute z-20">

        <div class="flex flex-row items-center justify-between w-full px-4 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0A1045"
                class="w-6 h-6 mt-2 sm:hidden" @click="$emit('close')">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>

            <span class="text-2xl font-medium text-webapp">Following({{ props.users.length }})</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0A1045"
                class="w-6 h-6 cursor-pointer collapse sm:visible" @click="$emit('close')">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

        </div>

        <hr class="w-full mb-1">

        <div class="w-full h-full grid place-items-center py-2" v-if="agents.length === 0">
            <Preloader v-if="fetchedUsers === false" />
            <div class="flex-col-center justify-center h-full w-full gap-y-2" v-else>
                <img src="../../../../../assets/illustrations/no-followers.svg" class="w-3/5" style="max-width: 200px;"
                    alt="">
                <p class="text-sub-webapp text-lg ubuntu">No Followers yet</p>
            </div>
        </div>

        <div v-else class="following flex flex-row items-center justify-between w-full py-2 px-4" v-for="agent in agents"
            :key="agent">
            <div class="flex flex-row gap-x-3 items-center">
                <div class="rounded-full w-12 h-12 grid place-items-center">
                    <img :src="agent.profileImg" v-if="agent.profileImg !== 'https://i.ibb.co/gtpxMJz/21.png'"
                        class="w-12 h-12 rounded-full" alt="">
                    <Avatar size="100%" v-else :fname="agent.name.fname" :lname="agent.name.surname" />
                </div>
                <div class="flex flex-col">
                    <span class="text-sm xl:text-lg md:text-center text-left following-name text-webapp font-medium">{{
                        agent.name.fname + ' ' + agent.name.surname
                    }}</span>
                    <span class="text-sm w-full following-ads-count md:text-left text-left text-sub-webapp">{{
                        agent.ads.length }} Ads</span>
                </div>
            </div>

            <button class="w-28 h-8 flex flex-row items-center justify-center rounded-lg text-sm font-medium text-white "
                :class="{ 'bg-white border border-blue-600': agent.followers.includes(store.state.user._id), 'bg-blue-600': !agent.followers.includes(store.state.user._id) }"
                @click="manageAgentFollow(agent)">
                <span v-if="!agent.followers.includes(store.state.user._id)" class="text-white">Follow</span>
                <span v-else class="text-blue-600">Unfollow</span>
            </button>
        </div>

    </div>
</template>

<script setup>
import axios from "../../../../../composables/axios";
import { useStore } from 'vuex';
import { ref } from "vue";

const store = useStore()

const url2 = '/profile/get-agent/';

const agents = ref([])

const fetchedUsers = ref(false)

async function getAgents() {
    try {
        if (props.users.length > 0) {
            for (const agent of props.users) {
                const getAgent = await axios.get(url2 + agent)
                agents.value.push(getAgent.data.agent)
            }
        }

        fetchedUsers.value = true
    } catch (error) {
        fetchedUsers.value = true
    }
}

async function manageAgentFollow(agent) {
    if (!agents.value[agents.value.indexOf(agent)].followers.includes(store.state.user._id)) {
        let data = {
            userId: agent.userId,
            activity: 'follow'
        }

        agents.value[agents.value.indexOf(agent)].followers.push(store.state.user._id)
        await axios.post('/profile/follows/update', data)
    } else {
        let data = {
            userId: agent.userId,
            activity: 'unfollow'
        }

        agents.value[agents.value.indexOf(agent)].followers.splice(agents.value[agents.value.indexOf(agent)].followers.indexOf(store.state.user._id))
        await axios.post('/profile/follows/update', data)
    }
}


const props = defineProps(['users'])
getAgents()
</script>

<style scoped>
.following-modal {
    width: 450px;
    min-height: 500px;
}

@media screen and (max-width: 639px) {
    .following-modal {
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
    }
}
</style>