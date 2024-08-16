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
                    <span>Reset pin</span>
                </p>

                <p class="w-full text-left text-webapp  text-sm mt-10">
                    Please set a new pincode and re-enter passcode to complete the process
                </p>

                <!-- input fields -->

                <div class="flex flex-col items-start w-full gap-y-1 mt-5 px-4">
                    <label for="" class="text-sm text-webapp">New pincode</label>
                    <input inputmode="numeric" type="text" @input="checkForField('pin')" @focusout="validatePin('newPin')"
                        :class="{ 'invalidField': errorMsg.field === 'newPin' }" v-model="data.newPin" maxlength="4"
                        placeholder="Enter your 4 new pincode" class="w-full h-14 rounded-lg bg-transparent">
                </div>
                <div class="flex flex-col items-start w-full gap-y-1 mt-5 px-4">
                    <label for="" class="text-sm text-webapp">Re-enter pincode</label>
                    <input inputmode="numeric" type="text" @input="checkForField('pin')" @focusout="validatePin('oldPin')"
                        :class="{ 'invalidField': errorMsg.field === 'oldPin' }" v-model="data.confirmPin" maxlength="4"
                        placeholder="Re-enter your 4 new pincode" class="w-full h-14 rounded-lg bg-transparent">
                </div>


                <!-- submit btn -->
                <button class="bg-primary w-full rounded-lg grid place-items-center h-14 text-white mt-10"
                    @click="resetUserPin">
                    <span v-if="!processing">Continue</span>
                    <Preloader v-else />
                </button>

            </div>

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

const route = useRoute();
const router = useRouter();

const url = '/auth/user/reset/password';


const data = reactive({
    email: '',
    newPin: '',
    confirmPin: '',
    otp: '',
    pin: ''
})




const onError = ref(false)
let errorMsg = ref({
    msg: '',
    field: null
})
let newMsg = ref('')
const processing = ref(false)

function validatePin(input) {
    if (data.newPin.toString().length > 0 && data.confirmPin.toString().length > 0) {
        if (data.newPin.toString() === data.confirmPin.toString()) {
            return true
        } else {
            onError.value = true
            errorMsg.value.msg = 'New pin doesnt match'
            errorMsg.value.field = input

            return false
        }
    }
}


function formValidator() {
    if (data.newPin.toString().length > 0 && data.confirmPin.toString().length > 0) {
        if (data.newPin.toString() === data.confirmPin.toString()) {
            return true
        } else {
            return false
        }
    }
}

async function checkForField(field) {
    if (errorMsg.value.field !== null) {
        if (field === 'pin') {
            const validator = formValidator()
            if (validator) {
                onError.value = false
                errorMsg.value.msg = ''
                errorMsg.value.field = null
            }
        }
    }
}

async function resetUserPin() {
    try {
        if (route.query.otp || route.query.email) {
            data.otp = route.query.otp
            data.email = route.query.email

            processing.value = true
            const reset = await axios.patch(url, data)
            if (!reset.data.success) {
                processing.value = false
                onError.value = true
                errorMsg.value.msg = reset.data.message

                setTimeout(() => {
                    onError.value = false
                    errorMsg.value.msg = ''
                }, 3000);
            } else {
                newMsg.value = reset.data.message
                setTimeout(() => {
                    processing.value = false
                    newMsg.value = ''

                    router.replace('/login')
                }, 1500);

            }
        }

    } catch (error) {
        processing.value = false

        onError.value = true
        if (error.response.data) {
            errorMsg.value.msg = error.response.data.message;
        } else errorMsg.value.msg = error.message;

        if (error.response.data.error === 'Unauthorized') {
            router.push('/forgot-pin')
        }

        setTimeout(() => {
            onError.value = false
        }, 3000);
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
</style>