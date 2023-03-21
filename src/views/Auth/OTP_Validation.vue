<template>
    <div class="w-screen min-w-full flex flex-row items-center bg-white h-screen min-h-full overflow-hidden">
        <img src="../../assets/images/habeep-show.png" class="w-1/3 xl:block hidden h-full" alt="">

        <div
            class="form-container flex flex-col items-center relative bg-white gap-y-3 w-full xl:w-2/3 h-full pb-6 md:py-10 overflow-y-auto overflow-x-hidden">

            <div class="flex flex-col items-center w-full md:w-2/3 px-4">
                <!-- logo -->
                <div class="logo md:flex hidden flex-row items-center justify-end w-full gap-x-2 cursor-pointer">
                    <img src="../../assets/icons/logo.svg" alt="Logo">
                    <span class="text-primary text-2xl">Habeep</span>
                </div>

                <p class="w-full text-left text-webapp font-bold text-xl flex flex-row items-center gap-x-1 mt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="#0A1045" class="w-6 h-6 cursor-pointer" @click="$router.go(-1)">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <span>Enter OTP code</span>
                </p>

                <p class="w-full text-left text-webapp  text-sm mt-10">
                    Please provide the boxes with 5 digit code sent to {{ $route.query.email }}
                </p>

                <!-- input fields -->


                <div id="otp" class="flex flex-row  w-full text-webapp my-10">
                    <div class="flex flex-row gap-x-2 sm:gap-x-3 w-full text-lg overflow-none">
                        <input type="number" maxlength="1" max="9" v-model="val1" placeholder="-" @input="next"
                            @keyup="back1" />
                        <input type="number" maxlength="1" max="9" v-model="val2" placeholder="-" @input="next"
                            @keyup="back" />
                        <input type="number" maxlength="1" max="9" v-model="val3" placeholder="-" @input="next"
                            @keyup="back" />
                        <input type="number" maxlength="1" max="9" v-model="val4" placeholder="-" @input="next"
                            @keyup="back" />
                        <input type="number" maxlength="1" max="9" v-model="val5" placeholder="-" @input="next"
                            @keyup="back" />
                    </div>
                </div>
                <!-- submit btn -->
                <button class="bg-primary w-full rounded-lg grid place-items-center h-14 text-white" @click="verifyOTP">
                    <span v-if="!processing">Continue</span>
                    <Preloader v-else />
                </button>

            </div>

            <Toast :msg="msg.text" type="danger" v-if="msg.type === 'danger'" />
            <Toast :msg="msg.text" type="success" v-if="msg.type === 'success'" />
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import axios from '../../composables/axios'
import { ref, reactive, onMounted } from 'vue'
import { useStore } from "vuex";

const store = useStore();
const router = useRouter()
const route = useRoute();

const url = '/auth/verify';
const url2 = '/auth/getOtpCode';

const val1 = ref()
const val2 = ref()
const val3 = ref()
const val4 = ref()
const val5 = ref()

const next = (e) => {
    if (!e.target.value < 1) {
        if (e.target.value.toString().length > 1) {
            let newText = e.target.value.substr(0, 5)
            let array = newText.split('')

            for (let i = 0; i < array.length; i++) {
                eval('val' + (i + 1)).value = parseInt(array[i])
            }
            e.target.parentElement.lastChild.focus()
        } else {
            if (e.target === e.target.parentElement.lastChild) {
                var key = e.keyCode || e.charCode;
                if (key == 8 || key == 46) {
                    e.target.value = null
                    e.target.previousSibling.focus()
                } else e.target.blur()
            } else e.target.nextSibling.focus()
        }
    }
}

const back = (e) => {
    var key = e.keyCode || e.charCode;
    if (key == 8 || key == 46) {
        e.target.value = null
        e.target.previousSibling.focus()
    }
}
const back1 = (e) => {
    var key = e.keyCode || e.charCode;

    if (key == 8 || key == 46) {
        e.target.value = null
    }
}

const data = reactive({
    email: '',
})

const processing = ref(false)

let msg = ref({
    type: '',
    text: '',
})

if (route.query.email) {
    data.email = route.query.email;
} else {
    data.email = store.state.user.email;
}

const getOTP = async () => {
    try {
        const result = await axios.post(url2, data);

        if (result.data.success) {
            msg.value.type = 'success'
            msg.value.text = result.data.message;


            setTimeout(() => {
                msg.value.type = ''
                msg.value.text = '';

                if (result.data.errorMsg == null) {
                    router.push('/login')
                }
            }, 2000);
        }


    } catch (error) {
        msg.value.type = 'danger'
        msg.value.text = error.response.data.message

        setTimeout(() => {
            msg.value.type = ''
            msg.value.text = '';
        }, 5000);
    }
}

const verifyOTP = async () => {
    try {
        const otpInput = [val1.value, val2.value, val3.value, val4.value, val5.value].join('');
        const info = {
            email: '',
            otp: otpInput
        }
        if (route.query.email) {
            info.email = route.query.email;
        } else {
            info.email = store.state.user.email;
        }
        processing.value = true

        const verify = await axios.post(url, info);

        if (verify.data.errorMsg === 'OK') {
            msg.value.type = 'success'
            msg.value.text = verify.data.message

            setTimeout(() => {
                processing.value = false
                router.push('/login')
            }, 3000);
        } else if (verify.data.errorMsg == null) {
            msg.value.type = 'success'
            msg.value.text = verify.data.message

            setTimeout(() => {
                processing.value = false
                router.push('/login')
            }, 3000);

        } else {
            msg.value.type = 'danger'
            msg.value.text = verify.data.message

            val1.value = ''
            val2.value = ''
            val3.value = ''
            val4.value = ''
            val5.value = ''
        }

        setTimeout(() => {
            msg.value.type = ''
            msg.value.text = '';
        }, 5000)
    } catch (error) {
        processing.value = false
        msg.value.type = 'danger'
        msg.value.text = error.response.data.message

        setTimeout(() => {
            msg.value.type = ''
            msg.value.text = '';
        }, 5000);
    }
}


onMounted(() => {
    getOTP()
})

</script>

<style scoped>
input {
    width: 50px;
    height: 60px;
    text-align: center;
    outline: none;
    border: 1px solid #D9DDEE;
    border-radius: 10px;
}

input:focus {
    border: 1px solid #1B49FF;
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