<template>
    <div class="main flex flex-col items-center z-20 gap-y-2 overflow-hidden my-auto mx-auto bg-white">
        <div class="flex flex-row items-center justify-between w-full px-4 py-4 border-b border-b-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" @click="$emit('close')" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-6 h-6 block md:hidden font-bold">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span class="text-xl font-medium text-webapp">Transfer to beneficiary</span>
            <img src="../../../../../assets/icons/x.svg" class="cursor-pointer collapse md:visible" @click="$emit('close')"
                alt="">
        </div>
        <div class="w-full px-4 py-4 flex flex-col items-start ">
            <span class="text-sub-webapp text-sm md:text-lg w-full text-left">Transfer Habeep points to another user acount
                with zero
                charges.</span>

            <div class="flex flex-col items-start gap-y-1 w-full mt-5 relative">
                <span class="text-webapp text-sm">Beneficiary ID</span>
                <input type="text" v-model="data.receiver" @input="verifyAccountDetails" maxlength="11"
                    placeholder="Enter beneficiary ID" class="w-full outline-none h-14 rounded-lg border border-gray p-2">
            </div>

            <div
                class="flex flex-row items-center justify-between gap-x-3 h-14 w-full my-7 bg-gray-200 px-3 text-webapp text-sm">
                <div class="flex flex-row items-center gap-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    <span v-if="verifiedAccount === false">No account detected</span>
                    <span v-else>{{ verifiedAccount.name }}</span>
                </div>
                <Preloader v-if="checkingForAccount" class="p-2" />
            </div>

            <div class="flex flex-col items-start gap-y-1 my-3 w-full relative">
                <span class="text-webapp text-sm">Amount of HBP</span>
                <input type="number" v-model="data.amount" placeholder="Amount of HBP"
                    class="w-full outline-none h-14 rounded-lg border border-gray p-2">
            </div>

            <button @click="transfer"
                :disabled="verifiedAccount === false || data.amount > props.wallet.accountValue || data.amount < 1"
                :class="{ 'bg-blue-600 text-white': verifiedAccount !== false && data.amount > 0.9 && data.amount < props.wallet.accountValue, 'bg-gray-300 text-white': !verifiedAccount || data.amount < 1 || data.amount > props.wallet.accountValue }"
                class="grid rounded-lg place-items-center h-14 mt-5 mb-2 w-full">
                <span v-if="!processingTransfer">Transfer</span>
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
import axios from '../../../../../composables/axios'
import moment from 'moment'

const props = defineProps(['wallet'])

const store = useStore()
const router = useRouter()


const data = reactive({
    amount: '',
    receiver: '',
    dates: {
        createdAt: moment().format('LLL'),
        time: moment().format('LTS'),
        date: moment().format('LL')
    },
    userId: ''
})




const checkingForAccount = ref(false)
const verifiedAccount = ref(false)

const onError = ref(false)
const errorMsg = ref(false)
const newMsg = ref('')

async function verifyAccountDetails() {
    try {
        verifiedAccount.value = false
        if (data.receiver.length >= 10) {
            checkingForAccount.value = true

            const verify = await axios.post('/wallet/verify-wallet', { accountId: data.receiver })

            checkingForAccount.value = false
            verifiedAccount.value = verify.data.user
            data.userId = verifiedAccount.value.userId
        }
    } catch (error) {
        checkingForAccount.value = false
    }
}





const emit = defineEmits(['close'])

const processingTransfer = ref(false)

async function transfer() {
    try {
        if (verifiedAccount.value !== false) {
            processingTransfer.value = true
            const transfer = await axios.post('/wallet/transfer', data)
            newMsg.value = transfer.data.message

            setTimeout(() => {
                emit('close')
                router.go()
                newMsg.value = ''
            }, 3000);
        } else verifyAccountDetails()
    } catch (error) {
        processingTransfer.value = true
        onError.value = true
        errorMsg.value = error.response.data.message

        setTimeout(() => {
            onError.value = false
            errorMsg.value = ''
        }, 3000);
    }
}




</script>
  
<style scoped>
.main {
    width: 480px;
    border-radius: 10px;
}

@media screen and (max-width: 450px) {
    .main {
        width: 100vw !important;
        height: 100vh !important;
        border-radius: 0px;
    }
}
</style>