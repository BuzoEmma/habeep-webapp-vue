<template>
    <div class="absolute w-screen h-screen flex flex-row items-center justify-center" v-if="onModal"
        style="background: rgb(22, 22, 34, 0.5)">

        <SuggestedCategory @enterAgents="gotoModal('agents')" @close="closeModal" @saveSuggs="addHouseSuggestions"
            v-if="onSuggestedListingsModal && onModal" />
        <SuggestedAgents v-if="onSuggestedFollowersModal && onModal" @close="closeModal" @finish="nextPage"
            :email="data.email" />

    </div>

    <div class="w-screen min-w-full flex flex-row items-center bg-white h-screen min-h-full overflow-hidden"
        :class="{ 'max-h-screen overflow-y-hidden overflow-hidden opacity-40': onModal }">
        <img src="../../assets/images/habeep-show.png" class="w-1/3 xl:block hidden h-full" alt="">

        <div :class="{ 'relative': screenWidth < 768 }"
            class="form-container flex flex-col items-center bg-white gap-y-3 w-full xl:w-2/3 h-full pb-6 md:py-10 overflow-y-auto overflow-x-hidden">

            <div class="flex flex-col items-center w-full md:w-2/3 px-4">
                <!-- logo -->
                <div class="logo md:flex hidden flex-row items-center justify-end w-full gap-x-2 cursor-pointer"
                    @click="$router.push('/')">
                    <img src="../../assets/icons/logo.svg" alt="Logo">
                    <span class="text-primary text-2xl">Habeep</span>
                </div>

                <p class="w-full text-left text-webapp font-bold text-xl flex flex-row items-center gap-x-1 mt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="#0A1045" class="w-6 h-6 cursor-pointer" @click="$router.go(-1)">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <span>Register an account</span>
                </p>

                <!-- input fields -->
                <div class="flex flex-col items-start w-full gap-y-1 mt-10">
                    <label for="" class="text-sm text-webapp">First name</label>
                    <input type="text" v-model="data.fname" placeholder="Enter your first name"
                        class="w-full h-14 rounded-lg">
                </div>

                <div class="flex flex-col items-start w-full gap-y-1 mt-8">
                    <label for="" class="text-sm text-webapp">Surname</label>
                    <input type="text" v-model="data.surname" placeholder="Enter your Surname"
                        class="w-full h-14 rounded-lg">
                </div>

                <div class="flex flex-col items-start w-full gap-y-1 mt-8">
                    <label for="" class="text-sm text-webapp">Email address</label>
                    <input type="email" v-model="data.email" @input="validateFormField('email', data.email)"
                        placeholder="Enter Email address" :class="{ 'invalidField': errorMsg.field === 'email' }"
                        class="w-full h-14 rounded-lg">
                </div>

                <div class="flex flex-col items-start w-full gap-y-1 mt-8 relative">
                    <label for="" class="text-sm text-webapp">Phone number</label>
                    <input type="number" v-model="data.phoneNumber" maxlength="12"
                        @input="validateFormField('phone', data.phoneNumber.toString())" placeholder="Phone number"
                        class="w-full h-14 rounded-lg bg-transaparent"
                        :class="{ 'bg-bg': onModal, 'invalidField': errorMsg.field === 'phone' }"
                        style="padding-left: 115px">


                    <div class="flex flex-col items-center  drop-shadow-sm bg-white rounded-b-xl rounded-t-md gap-y-2 p-1 absolute h-48 overflow-auto py-2 top-24 left-1 z-10 w-32"
                        v-if="onContainer">
                        <p class="w-full flex flex-row justify-center gap-x-4 border-b items-center border-gray-100"
                            @click="pickCountryCode(index)" v-for="(country, index) in countriesInfo"
                            :key="(country, index)">
                            <img :src="country.flag" class="w-9 h-8" alt="">
                            <span class="text-webapp text-sm font-medium">(+{{ country.callingCode }})</span>
                        </p>
                    </div>

                    <div class="absolute top-8 left-1 flex flex-row items-center justify-center h-10 w-24 rounded-md"
                        @click="openCountryCode" style="background: #F4F4F4" :class="{ 'bg-bg': onModal }">
                        <p class="flex flex-row items-center w-full justify-center gap-x-3">
                            <img :src="selectedCountry.flag" class="w-9 h-8" alt="">
                            <span>+{{ selectedCountry.callingCode }}</span>
                        </p>
                    </div>

                </div>

                <div class="flex flex-col sm:flex-row items-center relative w-full gap-x-3 justify-between">
                    <div class="flex flex-col items-start w-full sm:w-6/12 gap-y-1 mt-8">
                        <label for="" class="text-sm text-webapp">Create a secure pin</label>
                        <input type="number" maxlength="4" v-model="data.pin"
                            @input="validateFormField('pin', data.pin.toString())" placeholder="Enter a 4 digit pin"
                            class="w-full h-14 rounded-lg bg-transaparent"
                            :class="{ 'bg-bg': onModal, 'invalidField': errorMsg.field === 'pin' }">
                    </div>
                    <div class="flex flex-col items-start w-full sm:w-6/12 gap-y-1 mt-8">
                        <label for="" class="text-sm text-webapp">Refferal code(optional)</label>
                        <input type="text" v-model="data.referralCode" placeholder="Enter a refferal code"
                            class="w-full  h-14 rounded-lg bg-transparent">
                    </div>
                </div>

                <!-- botttom -->
                <p class="text-webapp my-7 text-sm w-full flex flex-row items-center gap-x-1 text-center justify-center">
                    Have an account! <span class="text-primary underline cursor-pointer"
                        @click="$router.push('/login')">Login</span>
                </p>

                <!-- submit btn -->
                <button class="bg-primary w-full rounded-lg grid place-items-center h-14 text-white" @click="createUser">
                    <span v-if="!processing">Next</span>
                    <Preloader v-else />
                </button>

            </div>

            <!-- components -->
            <Toast :msg="errorMsg.msg" type="danger" v-if="onError" />
            <Toast :msg="newMsg" type="success" v-if="newMsg.length > 0" />
            <!-- <Toast :msg="warningMsg" type="warning" /> -->
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from "vue-router";
import axios from "../../composables/axios";
import axiosDefault from 'axios'
import { useStore } from "vuex";

import { registerValidate, formValidator } from '../../composables/2-validator'

import SuggestedCategory from './components/SuggestedCategory.vue'
import SuggestedAgents from './components/SuggestedAgents.vue'

const screenWidth = ref(window.innerWidth)

const route = useRoute();
const router = useRouter();

const store = useStore();

const onModal = ref(false)
const onSuggestedListingsModal = ref(false)
const onSuggestedFollowersModal = ref(false)


function gotoModal(modal) {
    onModal.value = true
    if (modal === 'listings') {
        onSuggestedListingsModal.value = true
        onSuggestedFollowersModal.value = false
    }
    if (modal === 'agents') {
        onSuggestedListingsModal.value = false
        onSuggestedFollowersModal.value = true
    }
    if (modal === 'close') {
        onModal.value = false
        onSuggestedListingsModal.value = false
        onSuggestedFollowersModal.value = false
    }
}

function closeModal() {
    onModal.value = false
    onSuggestedListingsModal.value = false
    onSuggestedFollowersModal.value = false
}

// get country codes
let onContainer = ref(false)
let countriesInfo = ref([])
let selectedCountry = ref({
    name: 'Nigeria',
    callingCode: '234',
    flag: 'https://flagcdn.com/ng.svg'
});


function openCountryCode() {
    onContainer.value = !onContainer.value
}

function pickCountryCode(index) {
    let countryInfo = countriesInfo.value[index]
    selectedCountry.value = countryInfo
    onContainer.value = false
}

async function getCountries() {
    try {
        const countries = await axiosDefault.get('https://restcountries.com/v3.1/subregion/western africa')
        // console.log(countries)
        let unformattedData = []


        for (const country of countries.data) {
            try {
                const countryMain = await axiosDefault.get('https://restcountries.com/v2/name/' + country.name.common)
                unformattedData.push({
                    name: country.name.common,
                    callingCode: countryMain.data[0].callingCodes[0],
                    flag: countryMain.data[0].flag
                })
            } catch (error) {
                // consle.log(error)
            }


        }
        let sortedArray = unformattedData.sort((country1, country2) => {
            return Number(country2.callingCode) - Number(country1.callingCode)
        })
        countriesInfo.value = sortedArray
    } catch (error) {
        // console.log('Err occured', error)
    }
}


// manage registration

const url = '/auth/register';


const data = reactive({
    fname: '',
    surname: '',
    email: '',
    countryCode: '',
    nationality: '',
    pin: '',
    phoneNumber: '',
    referralCode: ''
})


if (route.query.invite !== null) {
    data.referralCode = route.query.invite;
}

const onError = ref(false)
let errorMsg = ref({
    msg: '',
    field: null
})
let newMsg = ref('')
let warningMsg = ref('')
const processing = ref(false)

function validateFormField(field, data) {
    const validator = formValidator(field, data)


    if (!validator.success) {
        onError.value = true
        errorMsg.value.msg = validator.message
        errorMsg.value.field = field
    } else {
        onError.value = false
        errorMsg.value.msg = ''
        errorMsg.value.field = null
    }
}

async function createUser() {
    data.countryCode = selectedCountry.value.callingCode
    data.nationality = selectedCountry.value.name
    // console.log(data)
    const validator = registerValidate(data);

    if (validator.success === false) {
        onError.value = true
        errorMsg.value.msg = validator.message
        errorMsg.value.field = validator.field

        setTimeout(() => {
            onError.value = false
        }, 3000);
    } else {
p
        try {
            processing.value = true
            const create = await axios.post(url, data)
            if (!create.data.success) {
                onError.value = true
                errorMsg.value.msg = create.data.message

                setTimeout(() => {
                    processing.value = false
                    onError.value = false
                    errorMsg.value.msg = ''
                }, 3000);
            } else {
                newMsg.value = create.data.message

                setTimeout(() => {
                    processing.value = false
                    newMsg.value = ''

                    gotoModal('listings')
                }, 2000);

            }
        } catch (error) {
            processing.value = false
            onError.value = true
            errorMsg.value.msg = error.response.data.message;

            setTimeout(() => {
                onError.value = false
            }, 5000);
        }

    }
}

const addHouseSuggestions = async (e) => {
    gotoModal('agents')


    let fields = reactive({
        email: data.email,
        types: e.types
    })

    const save = await axios.post('/profile/add-suggestedhousetype', fields)
}

const nextPage = () => {
    closeModal()

    setTimeout(() => {
        router.push('/verify-otp?email=' + data.email + '&reason=user_verification')
    }, 1000);
}

onMounted(() => {
    getCountries()
})

</script>

<style scoped>
input::placeholder {
    color: #71759D;
    font-size: 14px;
}

input {
    padding-left: 10px;
    outline: none;
    border: 1px solid #D9DDEE;
}

input:focus {
    border: 1px solid #1B49FF;
}

/* formValidators */
.invalidField {
    border: 1px solid #c5120b !important;
}

.form-container::-webkit-scrollbar {
    height: .1rem;
    width: 7px;
}

.form-container::-webkit-scrollbar-track {
    background: rgb(241, 241, 241);
    border-radius: 8px;
}

.form-container::-webkit-scrollbar-thumb {
    background: #0f154d;
    border-radius: 8px;
}

.bg-bg {
    background: #161622;
    opacity: 0.5;
}
</style>