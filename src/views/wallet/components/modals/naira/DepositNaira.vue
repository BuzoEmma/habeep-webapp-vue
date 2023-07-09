<template>
    <div class="main flex flex-col items-center z-20 gap-y-2 overflow-hidden my-auto mx-auto bg-white">
        <div class="flex flex-row items-center justify-between w-full px-4 py-4 border-b border-b-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" @click="$emit('close')" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-6 h-6 block md:hidden font-bold">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span class="text-xl font-medium text-webapp">Deposit</span>
            <img src="../../../../../assets/icons/x.svg" class="cursor-pointer collapse md:visible" @click="$emit('close')"
                alt="">
        </div>
        <div class="w-full px-4 py-6 flex flex-col items-start ">
            <span class="text-sub-webapp text-lg w-full text-left">Provide the amount and deposit method you
                wish to deposit to your naira wallet</span>

            <div class="flex flex-col items-start gap-y-1 w-full mt-5 relative">
                <span class="text-webapp text-sm">Amount to top-up</span>
                <input type="number" v-model="depositData.amount" placeholder="0.00"
                    class="w-full outline-none h-14 rounded-lg border border-gray p-2">

                <div class="absolute top-8 h-10 w-9 right-2 rounded grid place-items-center" style="background: #EBEBEB;">N
                </div>
            </div>

            <div class="flex flex-col items-start gap-y-1 w-full mt-5 relative">
                <span class="text-webapp text-sm">Deposit fee</span>
                <!-- <input type="text" disabled value="0.00" placeholder="0.00"
                    v-if="depositData.paymentMethod !== 'bank-transfer'"
                    class="w-full outline-none h-14 rounded-lg border border-gray p-2"> -->
                <input type="text" disabled value="0.00" class="w-full outline-none h-14 rounded-lg border border-gray p-2">

                <div class="absolute top-8 h-10 px-2 right-2 rounded grid place-items-center" style="background: #EBEBEB;">
                    <p class="flex flex-row items-center gap-x-4"><span
                            v-if="depositData.paymentMethod !== 'bank-transfer'">Free</span> N</p>
                </div>
            </div>

            <div class="flex flex-col items-start gap-y-1 w-full mt-5 relative">
                <span class="text-webapp text-sm">Deposit method</span>
                <div @click="onSelectMethod = true"
                    class="flex flex-row items-center w-full justify-between h-14 rounded-lg border border-gray p-2">
                    <span class="text-sm text-webapp" v-if="depositData.paymentMethod.length < 1">Select deposit
                        method</span>
                    <span class="text-sm text-webapp" v-if="depositData.paymentMethod === 'paystack'">Pay with
                        Paystack</span>
                    <span class="text-sm text-webapp" v-if="depositData.paymentMethod === 'flutterwave'">Pay with
                        Flutterwave</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="#71759D" class="w-6 h-6 ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>

                </div>

                <div class="absolute z-20 top-14 right-2 p-5 flex flex-col items-start gap-y-5 rounded-lg bg-white select-method"
                    v-if="onSelectMethod">
                    <!-- <span class="text-sm text-webapp cursor-pointer" @click="choosePaymentMethod('paystack')">Pay with
                        Paystack</span> -->
                    <p @click="choosePaymentMethod('paystack')"
                        class="text-sm text-webapp flex flex-row justify-between items-center w-full cursor-pointer">
                        <span>Pay with Paystack</span>
                    </p>
                    <p @click="choosePaymentMethod('flutterwave')"
                        class="text-sm text-webapp flex flex-row justify-between items-center w-full cursor-pointer">
                        <span>Pay with Flutterwave</span>
                        <!-- <span class="text-xs font-extralight text-webapp">#comingsoon</span> -->
                    </p>
                    <p class="text-sm text-webapp flex flex-row justify-between items-center w-full cursor-pointer">
                        <span>Pay with E-naira</span>
                        <span class="text-xs font-extralight text-webapp">#comingsoon</span>
                    </p>
                </div>
            </div>

            <Paystack @success="processPayment" @cancel="cancelPayment" @errorLoading="$router.go()"
                v-if="depositData.paymentMethod === 'paystack' && proceededPayment" :payment-info="getPaystackDetails()" />

            <Flutterwave @success="processPayment" @cancel="handleFlwClose" @errorLoading="$router.go()"
                v-if="depositData.paymentMethod === 'flutterwave' && proceededPayment" :payment-info="getFlwDetails()" />

            <button @click="proceedToPayment" :disabled="depositData.amount < 100 || depositData.paymentMethod.length < 1"
                :class="{ 'bg-blue-600 text-white': depositData.amount > 99 && depositData.paymentMethod.length > 1, 'bg-gray-300': depositData.amount < 100 || depositData.paymentMethod.length < 1, }"
                class="grid rounded-lg place-items-center h-14 my-6 w-full">
                <span v-if="!processingDeposit">Continue</span>
                <Preloader v-else />
            </button>


        </div>
        <Toast :msg="errorMsg" type="danger" v-if="onError" />
        <Toast :msg="newMsg" type="success" v-if="newMsg.length > 0" />
    </div>
</template>
  
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import uniqid from 'uniqid'
import axios from '../../../../../composables/axios'
import moment from 'moment'
import Paystack from './deposits/Paystack.vue'
import Flutterwave from './deposits/Flutterwave.vue'

const store = useStore()
const router = useRouter()

const depositData = reactive({
    amount: '',
    fee: 0,
    paymentMethod: ''
})

const emit = defineEmits(['close'])

const processingDeposit = ref(false)

const onSelectMethod = ref(false)
const proceededPayment = ref(false)

const onError = ref(false)
let errorMsg = ref('')
let newMsg = ref('')

const flwRef = ref('')

function getLogo() {
    if (store.state.user.userProfileImage !== 'https://i.ibb.co/gtpxMJz/21.png') {
        return store.state.user.userProfileImage
    } else return 'https://i.ibb.co/BnG8VLy/logo-white.png'
}

function channels() {
    return ["card", "bank_transfer"];
}


const choosePaymentMethod = (method) => {
    depositData.paymentMethod = method
    onSelectMethod.value = false
}

function proceedToPayment() {
    try {
        processingDeposit.value = true
        proceededPayment.value = true
    } catch (error) {
        processingDeposit.value = false
    }

}

function cancelPayment() {
    proceededPayment.value = false
    processingDeposit.value = false
}

function getPaystackDetails() {
    return {
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: store.state.user.email,
        amount: depositData.amount * 100,
        currency: 'NGN',
        ref: genRef(),
        channels: channels(),
        metadata: {
            "description": store.state.user.fname + " Deposit"
        },
        label: store.state.user.fname + ' ' + store.state.user.surname
    }
}

function getFlwDetails() {
    flwRef.value = genFlwRef()
    return {
        public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
        amount: depositData.amount,
        country: "NG",
        currency: "NGN",
        customer: { email: store.state.user.email, name: store.state.user.fname + ' ' + store.state.user.surname, phone_number: '+' + store.state.user.countryCode + store.state.user.phoneNumber.toString() },
        customizations: { description: "Deposit money into your naira wallet", logo: getLogo(), title: store.state.user.fname + ' ' + store.state.user.surname },
        payment_options: "card,ussd,banktransfer,account,nqr",
        redirect_url: null,
        tx_ref: flwRef.value
    }
}

function handleFlwClose(data) {
    if (data !== true) {
        processPayment({ tx_ref: flwRef.value })
    } else cancelPayment()
}



// handle payments
const processPayment = async (response) => {
    try {
        processingDeposit.value = true
        let reference;
        if (depositData.paymentMethod === 'paystack') {
            reference = response.reference
        } else if (depositData.paymentMethod === 'flutterwave') {
            reference = response.tx_ref
        } else reference = 'wallet deposit'

        let data = {
            accountId: store.state.user.wallet.naira,
            amount: depositData.amount,
            referenceId: reference,
            status: 'COMPLETED',
            fee: 0,
            userId: store.state.user._id,
            paymentMethod: depositData.paymentMethod,
            dates: {
                createdAt: moment().format('LLL'),
                time: moment().format('LTS'),
                date: moment().format('LL')
            }
        }

        const saveDeposit = await axios.post('/wallet/deposit/naira', data)
        
        newMsg.value = saveDeposit.data.message

        setTimeout(() => {
            processingDeposit.value = false
            emit('close')
            router.go()
            newMsg.value = ''
        }, 2000);
    } catch (error) {
        onError.value = true
        errorMsg.value = error.response.data.message

        emit('close')

        processingDeposit.value = false
        setTimeout(() => {
            onError.value = false
            errorMsg.value = ''
        }, 2000);
    }

}


function genRef() {
    return uniqid("dep-pstk-");
}
function genFlwRef() {
    return uniqid("dep-flw-");
}


</script>
  
<style scoped>
.main {
    width: 480px;
    border-radius: 10px;
}

.select-method {
    width: 287px;
    height: 180px;
    box-shadow: 0px 8px 30px -6px rgba(24, 39, 75, 0.12), 0px 14px 88px -4px rgba(24, 39, 75, 0.15);
    border-radius: 10px;
}

.paystack-btn {
    display: none;
    color: white;
}

@media screen and (max-width: 450px) {
    .main {
        width: 100vw !important;
        height: 100vh !important;
        border-radius: 0px;
    }
}
</style>