<template>
    <div class="main flex flex-col items-center z-20 gap-y-2 overflow-hidden my-auto mx-auto bg-white">
        <div class="flex flex-row items-center justify-between w-full px-4 py-4 border-b border-b-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" @click="$emit('close')" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-6 h-6 block md:hidden font-bold">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span class="text-xl font-medium text-webapp">Deposit</span>
            <img src="../../../../assets/icons/x.svg" class="cursor-pointer collapse md:visible" @click="$emit('close')"
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
                <input type="text" disabled value="0.00" placeholder="0.00"
                    class="w-full outline-none h-14 rounded-lg border border-gray p-2">

                <div class="absolute top-8 h-10 px-2 right-2 rounded grid place-items-center" style="background: #EBEBEB;">
                    <p class="flex flex-row items-center gap-x-4"><span>Free</span> N</p>
                </div>
            </div>

            <div class="flex flex-col items-start gap-y-1 w-full mt-5 relative">
                <span class="text-webapp text-sm">Deposit method</span>
                <div @click="onSelectMethod = true"
                    class="flex flex-row items-center w-full justify-between h-14 rounded-lg border border-gray p-2">
                    <span class="text-sm text-webapp" v-if="depositData.paymentMethod.length < 1">Select deposit
                        method</span>
                    <span class="text-sm text-webapp" v-if="depositData.paymentMethod === 'paystack'">Pay via debit
                        card</span>
                    <span class="text-sm text-webapp" v-if="depositData.paymentMethod === 'bank-transfer'">Pay via
                        direct bank transfers</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="#71759D" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>

                </div>

                <div class="absolute z-20 top-14 right-2 p-5 flex flex-col items-start gap-y-5 rounded-lg bg-white select-method"
                    v-if="onSelectMethod">
                    <span class="text-sm text-webapp cursor-pointer" @click="choosePaymentMethod('paystack')">Pay via debit
                        card</span>
                    <span class="text-sm text-webapp cursor-pointer" @click="choosePaymentMethod('bank-transfer')">Pay via
                        direct bank transfers</span>

                </div>
            </div>

            <paystack buttonClass="paystack-btn" publicKey="pk_live_9a894022d4b6e6016264145e3a6e3ce80eeb1288"
                :email="$store.state.user.email" :amount="depositData.amount * 100" :reference="paystackReference"
                :onSuccess="processSuccessPayment" :onClose="processCanceledPayment" :channels="channels()">
            </paystack>
            <button @click="proceedToPayment"
                :class="{ 'bg-blue-600 text-white': depositData.amount > 0 && depositData.paymentMethod.length > 1, 'bg-gray-300': depositData.amount < 1 || depositData.paymentMethod.length < 1, }"
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
import copy from 'copy-to-clipboard3';
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import uniqid from 'uniqid'
import paystack from 'vue3-paystack'
import axios from '../../../../composables/axios'

const store = useStore()
const router = useRouter()

const depositData = reactive({
    amount: '',
    fee: 0,
    paymentMethod: ''
})

const emit = defineEmits(['close'])

let paystackReference = ref(genRef())

const paystackBtn = ref(null)
const processingDeposit = ref(false)

const onSelectMethod = ref(false)

const choosePaymentMethod = (method) => {
    depositData.paymentMethod = method
    onSelectMethod.value = false
}

function proceedToPayment() {
    if (depositData.paymentMethod === 'paystack' || depositData.paymentMethod === 'bank-transfer') {
        paystackBtn.value.click()
    }
}

const onError = ref(false)
let errorMsg = ref('')
let newMsg = ref('')

function channels() { return ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"]; }

const processSuccessPayment = async (response) => {
    console.log(response)
    try {
        processingDeposit.value = true

        let data = {
            accountId: store.state.user.wallet.naira,
            amount: depositData.amount,
            referenceId: paystackReference.value,
            status: true,
            userId: store.state.user._id,
            paymentMethod: depositData.paymentMethod
        }

        const saveDeposit = await axios.post('/wallet/deposit/naira', data)
        newMsg.value = saveDeposit.data.message

        setTimeout(() => {
            processingDeposit.value = false
            emit('close')
            router.go()
            newMsg.value = ''
        }, 3000);
    } catch (error) {
        onError.value = true
        errorMsg.value = error.response.data.message

        setTimeout(() => {
            onError.value = false
            errorMsg.value = ''
        }, 3000);
    }

}

const processCanceledPayment = async () => {
    console.log('canceled')
    try {
        paystackReference.value = genRef()
        processingDeposit.value = true

        let data = {
            accountId: store.state.user.wallet.naira,
            amount: depositData.amount,
            referenceId: paystackReference.value,
            status: false,
            userId: store.state.user._id,
            paymentMethod: depositData.paymentMethod
        }

        const saveDeposit = await axios.post('/wallet/deposit/naira', data)
    } catch (error) {
        onError.value = true
        errorMsg.value = error.response.data.message

        setTimeout(() => {
            processingDeposit.value = false
            onError.value = false
            emit('close')
            router.go()
            errorMsg.value = 'saveDeposit.data.message'
        }, 3000);
    }

}

function genRef() {
    return uniqid("dep-pstk-");
}

onMounted(() => {
    paystackBtn.value = document.querySelector('.paystack-btn')
})



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