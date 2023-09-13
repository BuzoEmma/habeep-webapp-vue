<template>
    <div class="w-screen min-w-full flex flex-row items-center bg-white h-screen min-h-full overflow-hidden">
        <img src="../../assets/images/habeep-show.png" class="w-1/3 xl:block hidden h-full" alt="">

        <div
            class="form-container flex flex-col items-center relative bg-white gap-y-3 w-full xl:w-2/3 h-full pb-6 md:py-10 overflow-y-auto overflow-x-hidden">

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
                    <span>Login</span>
                </p>

                <!-- input fields -->


                <div class="flex flex-col items-start w-full gap-y-1 mt-8">
                    <label for="" class="text-sm text-webapp">Email address</label>
                    <input type="email" @input="validateFormField('email', data.email)" v-model="data.email"
                        :class="{ 'invalidField': errorMsg.field === 'email' }" placeholder="Enter Email address"
                        class="w-full h-14 rounded-lg">
                </div>
                <div class="flex flex-col items-start w-full gap-y-1 mt-8">
                    <label for="" class="text-sm text-webapp">Enter your secure pin</label>
                    <input type="password" @input="validateFormField('pin', data.pin.toString())" v-model="data.pin"
                        maxlength="4" :class="{ 'invalidField': errorMsg.field === 'pin' }"
                        placeholder="Enter your 4 digit pin" class="w-full h-14 rounded-lg">
                </div>

                <p class="w-full text-primary flex flex-row justify-end underline cursor-pointer my-10 text-sm"
                    @click="$router.push('/forgot-pin')">Forgot Pin?</p>

                <!-- submit btn -->
                <button class="bg-primary w-full rounded-lg grid place-items-center h-14 text-white" @click="loginUser">
                    <span v-if="!processing">Continue</span>
                    <Preloader v-else />
                </button>

                <!-- botttom -->
                <p class="text-webapp my-7 text-sm w-full flex flex-row items-center gap-x-1 text-center justify-center">
                    Don't have an account! <span class="text-primary underline cursor-pointer"
                        @click="$router.push('/register')">Sign Up</span>
                </p>

            </div>

            <Toast :msg="errorMsg.msg" type="danger" v-if="onError" />
            <Toast :msg="newMsg" type="success" v-if="newMsg.length > 0" />
        </div>
    </div>
</template>

<script setup>
import axios from '../../composables/axios'
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { loginValidate, formValidator } from '../../composables/2-validator'
import SuggestedCategory from './components/SuggestedCategory.vue'


const onModal = ref(false)
const onSuggestedListingsModal = ref(false)
const onSuggestedFollowersModal = ref(false)

function gotoModal(modal) {
    onModal.value = true
    if (modal === 'listings') {
        onSuggestedListingsModal.value = true
        onSuggestedFollowersModal.value = false
    }
    if (modal === 'followers') {
        onSuggestedListingsModal.value = false
        onSuggestedFollowersModal.value = true
    }
    if (modal === 'close') {
        onModal.value = false
        onSuggestedListingsModal.value = false
        onSuggestedFollowersModal.value = false
    }
}

// initialization
const store = useStore();
const router = useRouter()
const route = useRoute()

const url = '/auth/login';
// datas
const data = reactive({
    email: '',
    pin: ''
})


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

async function loginUser() {
    const validator = loginValidate(data.email, data.pin);
    if (validator.success === false) {
        onError.value = true
        errorMsg.value.msg = validator.message
        errorMsg.value.field = validator.field

        setTimeout(() => {
            onError.value = false
            errorMsg.value.msg = ''
            errorMsg.value.field = null
        }, 5000);
    } else {
        try {
            processing.value = true
            const login = await axios.post(url, data)

            if (login.data.data) {
                let mutate = {
                    sessionId: login.data.data.token,
                    authState: true,
                    userDetails: login.data.data.user
                }
                store.dispatch('setAuth', mutate)

                newMsg.value = login.data.data.message

                setTimeout(() => {
                    processing.value = false
                    if (login.data.data.user.verified) {
                        if (route.query.redirect) {
                            router.push(route.query.redirect)
                        } else {
                            router.replace('/feeds')
                        }
                    } else {
                        router.push('/verify-otp?email=' + login.data.data.user.email + '&reason=user_verification')
                    }
                }, 2000);
            } else {
                processing.value = false
                onError.value = true
                errorMsg.value.msg = login.data.message

                setTimeout(() => {
                    onError.value = false
                    errorMsg.value.msg = ''
                }, 4000);
            }
        } catch (error) {
            onError.value = true
            if (error.response) {
                errorMsg.value.msg = error.response.data.message;
            } else errorMsg.value.msg = error.message;
            processing.value = false

            data.pin = ''

            setTimeout(() => {
                onError.value = false;
            }, 5000);
        }


    }
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
</style>