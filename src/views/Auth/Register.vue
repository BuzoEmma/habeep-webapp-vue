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

            <form class="flex flex-col items-center w-full md:w-2/3 px-4">
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
                    <label for="username" class="text-sm text-webapp">Username(Handle)</label>
                    <input type="text" name="username" v-model="data.username" placeholder="@"
                        class="w-full h-14 rounded-lg"
                        :class="{ 'bg-bg': onModal, 'invalidField': data.username.length < 6 && data.username.length > 0 }">
                </div>
                <div class="flex flex-col items-start w-full gap-y-1 mt-10">
                    <label for="" class="text-sm text-webapp">First name</label>
                    <input type="text" name="firstname" v-model="data.fname" placeholder="Enter your first name"
                        class="w-full h-14 rounded-lg"
                        :class="{ 'bg-bg': onModal, 'invalidField': data.fname.length < 2 && data.fname.length > 0 }">
                </div>

                <div class="flex flex-col items-start w-full gap-y-1 mt-8">
                    <label for="" class="text-sm text-webapp">Surname</label>
                    <input type="text" name="surname" v-model="data.surname" placeholder="Enter your Surname"
                        class="w-full h-14 rounded-lg"
                        :class="{ 'bg-bg': onModal, 'invalidField': data.surname.length < 2 && data.surname.length > 0 }">
                </div>

                <div class="flex flex-col items-start w-full gap-y-1 mt-8">
                    <label for="email" class="text-sm text-webapp">Email address</label>
                    <input type="email" name="email" v-model="data.email" @input="validateFormField('email', data.email)"
                        placeholder="Enter Email address" :class="{ 'invalidField': errorMsg.field === 'email' }"
                        class="w-full h-14 rounded-lg">
                </div>

                <div class="flex flex-col items-start w-full gap-y-1 mt-8 relative">
                    <label for="" class="text-sm text-webapp">Phone number</label>
                    <input type="number" name="tel" v-model="data.phoneNumber" maxlength="12"
                        @input="validateFormField('phone', data.phoneNumber.toString())" placeholder="Phone number"
                        class="w-full h-14 rounded-lg bg-transaparent"
                        :class="{ 'bg-bg': onModal, 'invalidField': errorMsg.field === 'phone' }"
                        style="padding-left: 115px">


                    <div :class="{ 'justify-center': loadingLocationInfo }"
                        class="flex flex-col items-center  drop-shadow-sm bg-white rounded-b-xl rounded-t-md gap-y-2 p-1 absolute h-48 overflow-auto py-2 top-24 left-1 z-10 w-32 min-w-fit"
                        v-if="onContainer">
                        <Preloader v-if="loadingLocationInfo" />
                        <div class="flex-col flex items-start" v-else>
                            <div
                                @click="cleanSelections" v-if="selectedContinent.name"
                                class="w-full flex text-primary cursor-pointer flex-row items-start gap-x-4 border-b pb-4 py-2 pl-3 border-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    class="w-5 h-5">
                                    <path fill-rule="evenodd"
                                        d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                                        clip-rule="evenodd" />
                                </svg>

                                <span class="text-sm capitalize">{{ selectedContinent.name }}</span>
                            </div>
                            <div class="w-full h-fit" v-if="allContinents.length > 0 && !selectedContinent.name">
                                <p class="w-full flex cursor-pointer flex-row items-start gap-x-4 border-b py-2 pl-3 border-gray-100"
                                    @click="pickContinent(continent)"
                                    :class="{ 'border-none': index === allContinents.length - 1 }"
                                    v-for="(continent, index) in allContinents" :key="(continent, index)">
                                    <span class="text-webapp text-sm font-medium cursor-pointer capitalize text-left">{{
                                        continent.name }}</span>
                                </p>
                            </div>
                            <div class="w-full h-fit" v-if="selectedContinent.name">
                                <p class="w-full flex flex-row cursor-pointer items-start gap-x-4 border-b py-2 pl-3 border-gray-100"
                                    @click="pickCountry(country)"
                                    :class="{ 'border-none': index === selectedContinentCountries.length - 1 }"
                                    v-for="(country, index) in selectedContinentCountries" :key="(country, index)">
                                    <span>{{ country.flag }}</span>
                                    <span class="text-webapp text-sm font-medium cursor-pointer capitalize text-left">{{
                                        country.name }}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="absolute top-8 left-1 flex flex-row items-center justify-center h-10 w-24 rounded-md cursor-pointer"
                        @click="toggleCountryCodeContainer" style="background: #F4F4F4" :class="{ 'bg-bg': onModal }">
                        <p class="flex flex-row items-center w-full justify-center gap-x-3">
                            <span>{{ selectedCountry.flag }}</span>
                            <span>+{{ selectedCountry.phoneCode }}</span>
                        </p>
                    </div>

                </div>

                <div class="flex flex-col sm:flex-row items-center relative w-full gap-x-3 justify-between">
                    <div class="flex flex-col items-start w-full sm:w-6/12 gap-y-1 mt-8">
                        <label for="password" class="text-sm text-webapp">Create a secure pin</label>
                        <input type="number" name="pin" maxlength="4" v-model="data.pin"
                            @input="validateFormField('pin', data.pin.toString())" placeholder="Enter a 4 digit pin"
                            class="w-full h-14 rounded-lg bg-transaparent"
                            :class="{ 'bg-bg': onModal, 'invalidField': errorMsg.field === 'pin' }">
                    </div>
                    <div class="flex flex-col items-start w-full sm:w-6/12 gap-y-1 mt-8">
                        <label for="referralcode" class="text-sm text-webapp">Refferal code(optional)</label>
                        <input type="text" name="referralcode" v-model="data.referralCode"
                            placeholder="Enter a refferal code" class="w-full  h-14 rounded-lg bg-transparent">
                    </div>
                </div>

                <!-- botttom -->
                <p class="text-webapp my-7 text-sm w-full flex flex-row items-center gap-x-1 text-center justify-center">
                    Have an account! <span class="text-primary underline cursor-pointer"
                        @click="$router.push('/login')">Login</span>
                </p>

                <!-- submit btn -->
                <button @click.prevent="createUser" class="w-full rounded-lg grid place-items-center h-14 text-white"
                    :disabled="errorMsg.field === 'email'"
                    :class="{ 'bg-blue-600': data.pin.toString().length === 4 && data.username.length > 5, 'bg-gray-300': data.pin.toString().length < 4 || data.username.length < 5 }">
                    <span v-if="!processing">Continue</span>
                    <Preloader v-else />
                </button>

            </form>

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

import sort from 'smart-deep-sort'

import { registerValidate, formValidator } from '../../composables/2-validator'

import SuggestedCategory from './components/SuggestedCategory.vue'
import SuggestedAgents from './components/SuggestedAgents.vue'

const screenWidth = ref(window.innerWidth)

const route = useRoute();
const router = useRouter();

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
const allContinents = ref([])
const loadingLocationInfo = ref(false)
const selectedContinent = ref({})
const selectedContinentCountries = ref([])

let selectedCountry = ref({
    name: 'Nigeria',
    phoneCode: '234',
    flag: '🇳🇬',
    currency: 'NGN',
    shortName: 'NG'
});


function toggleCountryCodeContainer() {
    onContainer.value = !onContainer.value
}

function pickContinent(continent) {
    selectedContinent.value = continent
    selectedContinentCountries.value = []
    getContinentCountries(continent.id)
}

function cleanSelections() {
    selectedContinent.value = {}
    selectedContinentCountries.value = []
}

function pickCountry(country) {
    selectedCountry.value = country
    toggleCountryCodeContainer()
}

async function getContinents() {
    try {
        loadingLocationInfo.value = true
        const continents = await axios.get('/countries-api/continents')
        allContinents.value = sort(continents.data.results)
        loadingLocationInfo.value = false
    } catch (error) {
        loadingLocationInfo.value = false
    }
}

async function getContinentCountries(id) {
    try {
        loadingLocationInfo.value = true
        const countries = await axios.get('countries-api/countries/' + id)
        selectedContinentCountries.value = sort(countries.data.results)
        loadingLocationInfo.value = false
    } catch (error) {
        loadingLocationInfo.value = false
    }
}


// manage registration
const url = '/auth/register';


const data = reactive({
    username: '',
    fname: '',
    surname: '',
    email: '',
    currency: '',
    countryCode: '',
    nationality: '',
    pin: '',
    phoneNumber: '',
    referralCode: '',
    shortName: ''
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
    data.countryCode = selectedCountry.value.phoneCode
    data.currency = selectedCountry.value.currency.split(',')[0]
    data.shortName = selectedCountry.value.shortName
    data.nationality = selectedCountry.value.name
    const validator = registerValidate(data);

    if (validator.success === false) {
        onError.value = true
        errorMsg.value.msg = validator.message
        errorMsg.value.field = validator.field

        setTimeout(() => {
            onError.value = false
        }, 3000);
    } else {

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
                }, 1000);

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

    await axios.post('/profile/add-suggestedhousetype', fields)
}

const nextPage = () => {
    closeModal()

    setTimeout(() => {
        router.push('/verify-otp?email=' + data.email + '&reason=user_verification')
    }, 1000);
}

onMounted(() => {
    getContinents()
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
    width: 5px;
}

.form-container::-webkit-scrollbar-track {
    background: rgb(241, 241, 241);
    border-radius: 5ex;
}

.form-container::-webkit-scrollbar-thumb {
    background: #0f154d;
    border-radius: 5px;
}

.bg-bg {
    background: #161622;
    opacity: 0.5;
}</style>