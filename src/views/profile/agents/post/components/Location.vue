<template>
    <div
        class="w-screen min-w-full flex flex-col lg:flex-row items-center bg-white h-full md:h-screen min-h-full overflow-y-auto md:overflow-hidden">
        <div class="flex flex-col items-start gap-y-6 h-2/6 lg:h-full bg-webapp justify-between w-full lg:w-2/5 px-10">
            <div class="logo md:flex hidden flex-row items-center justify-start pt-10 w-full gap-x-2 cursor-pointer"
                @click="$router.push('/')">
                <img src="../../../../../assets/icons/logo-white.svg" alt="Logo">
                <span class="text-white text-2xl">Habeep</span>
            </div>
            <img src="../../../../../assets/icons/chevron-left.svg" @click="$emit('goBack')" class="md:hidden block pt-10" alt="">
            <h1 class="text-white font-medium text-2xl md:text-5xl   w-full text-left">Where’s this property located?
            </h1>
            <p></p>
        </div>

        <div
            class="form-container flex flex-col items-center justify-between relative bg-white w-full lg:w-3/5 min-h-fit h-4/6 lg:h-full">

            <div class="flex flex-col relative h-full w-full items-center justify-center">
                <!-- map -->
                <div class="mapouter">
                    <div class="gmap_canvas"><iframe width="100%" height="100%" id="gmap_canvas"
                            :src="`https://maps.google.com/maps?q=${mapAddress}&t=k&z=13&ie=UTF8&iwloc=&output=embed`"
                            frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                    </div>
                </div>

                <!-- input address -->
                <div class="form-fields flex flex-col gap-y-5 items-center justify-center absolute w-full h-full z-10">
                    <div class="flex flex-row justify-between items-center h-14 w-72 rounded-full bg-white px-4 cursor-pointer"
                        @click="toggleCityModal('open')">
                        <span class="text-xl text-webapp" v-if="data.data.city.length > 5">{{ data.data.city }}</span>
                        <span class="text-xl text-webapp" v-else>{{ store.state.user.nationality }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="#71759D" class="w-4 h-4 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                    <div class="flex flex-row gap-x-3 items-center h-14 w-72 rounded-full bg-white px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1B49FF" class="w-6 h-6">
                            <path fill-rule="evenodd"
                                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                clip-rule="evenodd" />
                        </svg>

                        <input type="text" class="outline-none border-none w-5/6" v-model="data.data.address"
                            @mouseleave="changeMapAddress('addr')" placeholder="Enter property address">
                    </div>
                </div>

                <!-- input city modal -->
                <div class="city flex flex-col items-center justify-center absolute h-screen w-screen md:w-full md:h-full z-20"
                    style="background-color: rgba(22,22,34, 0.5)" v-if="cityModal">
                    <div class="modal bg-white rounded-lg h-modal w-full md:h-3/5 md:w-3/5">
                        <div class="flex flex-row items-center justify-between p-3 border-b w-full border-b-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#71759D"
                                class="w-6 h-6 md:hidden block cursor-pointer">
                                <path fill-rule="evenodd"
                                    d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                                    clip-rule="evenodd" />
                            </svg>

                            <span class="text-xl tex-webapp">Enter your city</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#71759D"
                                @click="toggleCityModal('close')" class="w-6 h-6 collapse md:visible">
                                <path fill-rule="evenodd"
                                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div
                            class="mt-2 px-5 gap-y-6 flex flex-col items-center w-full overflow-y-scroll h-5/6 results">
                            <div
                                class="flex flex-row gap-x-3 items-center  h-12 py-2 w-full border border-gray-200 rounded-full bg-white px-4">
                                <input type="text" class="outline-none border-none w-full" @keyup="checkForCity"
                                    v-model="addrData.city" placeholder="Type in your city">
                            </div>
                            <div @click="selectCity(match)"
                                class="flex flex-row gap-x-2 items-center w-full cursor-pointer"
                                v-for="match in possibleMatches" :key="match">
                                <img src="../../../../../assets/icons/listings/city-icon.svg" alt="">
                                <div class="flex flex-col  items-start">
                                    <span class="text-lg text-webapp">{{ match.city }}</span>
                                    <span class="text-sm text-gray-400">{{ match.state }} State</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



            <div class="bottom flex flex-col items-center w-full justify-between">
                <div class="w-full bg-gray-200" style="height: 2px;">
                    <div class="bg-webapp h-full w-5/12"></div>
                </div>
                <div class="flex flex-row p-6 w-full items-center justify-between">
                    <span class="text-xl font-medium text-webapp underline cursor-pointer"
                        @click="$emit('goBack')">Back</span>
                    <button @click="$emit('passData', data)" :disabled="data.data.address.length < 1"
                        :class="{ 'bg-slate-400 text-white': data.data.address.length < 1 }"
                        class="h-10 w-24 rounded-lg bg-primary text-white text-sm text-medium">Next</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainNavbarVue from "../../../../../components/MainNavbar.vue";
import axiosDefault from 'axios'

const store = useStore()


const data = reactive({
    type: 'location',
    data: {
        address: '',
        city: ''
    }
})


let mapAddress = ref(store.state.user.nationality)

function changeMapAddress(change) {
    if (change === 'city') {
        if (data.data.address.length > 2) {
            let formattedCity = data.data.city.split(',')[0]
            mapAddress.value = data.data.address + ' ' + formattedCity
        } else mapAddress.value = data.data.city
    }

    if (change === 'addr') {
        mapAddress.value = data.data.address + ' ' + data.data.city
    }
}

let cityModal = ref(false)
const states = ref([])

function toggleCityModal(state) {
    if (state === 'open') {
        cityModal.value = true
    } else cityModal.value = false
}

// select city
function selectCity(match) {
    toggleCityModal('close')
    data.data.city = match.city + ', ' + match.state + ' State'
    changeMapAddress('city')
}



// get cities
const addrData = reactive({
    city: ''
})

let possibleMatches = ref([])

function checkForCity() {

    possibleMatches.value = []

    for (const state of states.value) {
        for (const city of state.cities) {
            if (city.name.toLowerCase().includes(addrData.city) === true) {
                let formatted = {
                    city: city.name,
                    state: state.state.name
                }
                possibleMatches.value.push(formatted)
            }
        }
    }
}

async function getStates() {
    const getState = await axiosDefault.get('https://locus.fkkas.com/api/states');

    getState.data.data.forEach(async state => {
        const getCities = await axiosDefault.get('https://locus.fkkas.com/api/regions/' + state.alias);

        let formatted = {
            state: state,
            cities: getCities.data.data
        }

        states.value.push(formatted)

    })
    store.dispatch('saveStates', states.value)
}

onMounted(() => {
    if(store.state.allStates.length !== 0) {
        states.value = store.state.allStates
    } else {
        getStates()
    }
})

</script>

<style scoped>
input::placeholder {
    color: #B5B7CB;
    font-size: 14px;
}

input {
    padding-left: 2px;
    outline: none;
    border: none
}

input:focus {
    border: none;
}

.results::-webkit-scrollbar {
    width: 5px;
}


.results::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: #71759D;
}

.results::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
}

.results::-webkit-scrollbar-button {
    max-height: 92px;
    height: 200px !important;
    width: 200px !important;
}


.on-active {
    border: 1px solid #1B49FF;
    color: #1B49FF;
}

.mapouter {
    position: relative;
    text-align: right;
    height: 100%;
    width: 100%;
}

.gmap_canvas {
    overflow: hidden;
    background: none !important;
    height: 100%;
    width: 100%;
}

/* .bottom::before {
    border-top: 1px solid #D9DDEE;
}
.bottom::after {
    border-top: 1px solid #000000 ;
    width: 10%;
} */
</style>