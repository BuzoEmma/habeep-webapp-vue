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
            class="form-container flex flex-col items-center bg-white gap-y-3 w-full xl:w-2/3 h-full pb-6 md:py-10 overflow-y-auto no-scroll-btn overflow-x-hidden">

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
                    <input type="email" name="email" v-model="data.email" @focusout="validateFormField('email', data.email)"
                        @input="checkForField('email')" placeholder="Enter Email address"
                        :class="{ 'invalidField': errorMsg.field === 'email' }" class="w-full h-14 rounded-lg">
                </div>

                <div class="flex flex-col items-start w-full gap-y-1 mt-8 relative">
                    <label for="" class="text-sm text-webapp">Phone number</label>
                    <MazPhoneNumberInput class="w-full" v-model="data.phoneNumber" show-code-on-list color="primary"
                        :preferred-countries="['NG']" :default-country-code="'NG'" :translations="{
                            countrySelector: {
                                placeholder: 'Country Prefix',
                                error: 'Choose country',
                            },
                            phoneInput: {
                                placeholder: 'Phone number',
                                example: 'E.g:',
                            }
                        }" @update="logPhone" />
                </div>

                <div class="flex flex-col sm:flex-row items-center relative w-full gap-x-3 justify-between">
                    <div class="flex flex-col items-start w-full sm:w-6/12 gap-y-1 mt-8">
                        <label for="password" class="text-sm text-webapp">Create a secure pin</label>
                        <input type="number" name="pin" maxlength="4" v-model="data.pin"
                            @focusout="validateFormField('pin', data.pin.toString())" @input="checkForField('pin')"
                            placeholder="Enter a 4 digit pin" class="w-full h-14 rounded-lg bg-transaparent"
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
                    :class="{ 'bg-blue-600': data.pin.toString().length === 4 && data.username.length > 5 && selectedCountry && selectedCountry.isValid, 'bg-gray-300': data.pin.toString().length < 4 || data.username.length < 5 || !selectedCountry }">
                    <span v-if="!processing">Continue</span>
                    <Preloader v-else />
                </button>

            </form>

            <!-- components -->
            <Toast :msg="errorMsg.msg" type="danger" v-if="onError" />
            <Toast :msg="newMsg" type="success" v-if="newMsg.length > 0" />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from "vue-router";
import axios from "../../composables/axios";
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import clm from 'country-locale-map'

import { registerValidate, formValidator } from '../../composables/2-validator'

import SuggestedCategory from './components/SuggestedCategory.vue'
import SuggestedAgents from './components/SuggestedAgents.vue'

const screenWidth = ref(window.innerWidth)

const route = useRoute();
const router = useRouter();

const onModal = ref(false)
const onSuggestedListingsModal = ref(false)
const onSuggestedFollowersModal = ref(false)

function logPhone(e) {
    selectedCountry.value = e
}


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


let selectedCountry = ref(null);


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

async function checkForField(field) {
    if (errorMsg.value.field !== null) {
        if (field === 'email') {
            const validator = formValidator('email', data.email)
            if (validator.success) {
                onError.value = false
                errorMsg.value.msg = ''
                errorMsg.value.field = null
            }
        }
        if (field === 'pin') {
            const validator = formValidator('pin', data.pin.toString())
            if (validator.success) {
                onError.value = false
                errorMsg.value.msg = ''
                errorMsg.value.field = null
            }
        }
    }
}

async function createUser() {
    if (selectedCountry.value && selectedCountry.value.isValid) {
        const country = clm.getCountryByAlpha2(selectedCountry.value.countryCode)
        if (country) {
            data.countryCode = selectedCountry.value.countryCallingCode
            data.currency = country.currency
            data.phoneNumber = selectedCountry.value.nationalNumber
            data.shortName = selectedCountry.value.countryCode
            data.nationality = country.name
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
        } else {
            onError.value = true
            errorMsg.value.msg = 'Country is not supported or is invalid. Try again later'

            setTimeout(() => {
                onError.value = false
            }, 3000);
        }
    } else {
        onError.value = true
        errorMsg.value.msg = 'Invalid Phone Number'

        setTimeout(() => {
            onError.value = false
        }, 3000);
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
}
</style>
