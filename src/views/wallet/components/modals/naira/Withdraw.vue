<template>
    <div class="main flex flex-col items-center z-20 gap-y-2 overflow-hidden my-auto mx-auto bg-white relative">
        <div class="flex flex-row items-center justify-between w-full px-4 py-4 border-b border-b-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" @click="$emit('close')" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-6 h-6 block md:hidden font-bold">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span class="text-xl font-medium text-webapp">Withdrawal details</span>
            <img src="../../../../../assets/icons/x.svg" class="cursor-pointer collapse md:visible" @click="$emit('close')"
                alt="">
        </div>
        <div class="w-full px-4 py-6 flex flex-col items-start ">
            <span class="text-sub-webapp text-lg w-full text-left">Please provide withdrawal details with bank account in
                your name</span>

            <div class="flex flex-col items-start gap-y-1 w-full mt-5 relative">
                <span class="text-webapp text-sm">Account number</span>
                <input type="text" v-model="withdrawalDetails.accountNumber" @keyup="verifyAccountDetails" maxlength="10"
                    placeholder="Enter account number" class="w-full outline-none h-12 rounded-lg border border-gray p-2">

            </div>

            <div class="flex flex-col items-start gap-y-1 w-full mt-5 relative">
                <span class="text-webapp text-sm">Select bank</span>
                <div @click="onSelectMethod = true"
                    class="flex flex-row items-center w-full justify-between h-12 rounded-lg border border-gray p-2">
                    <span class="text-sm text-webapp" v-if="withdrawalDetails.bank.length < 1">Select bank</span>
                    <span class="text-sm text-webapp" v-else>{{ withdrawalDetails.bank.name }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="#71759D" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>

                <!-- select banks -->
                <div class="absolute z-20 top-14 right-2 p-5 flex flex-col items-start gap-y-5 rounded-lg bg-white select-method"
                    v-if="onSelectMethod">
                    <div class="flex rounded flex-row items-center w-full px-3 gap-x-2 text-black"
                        style="background: #EBEBEB;">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5 text-sub-webapp">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input type="text" placeholder="Search" @keyup="queryBank" v-model="bankQuery"
                            class="text-sm outline-none border-none w-full h-full text-sub-webapp bg-transparent">
                    </div>

                    <div class="flex flex-col items-start w-full banks overflow-y-auto gap-y-3">
                        <span class="text-sm text-webapp cursor-pointer" v-for="bank in filteredBanks" :key="bank"
                            @click="chooseBank(bank)">{{ bank.name }}</span>
                    </div>
                </div>
            </div>

            <div
                class="flex flex-row items-center justify-between gap-x-3 h-12 w-full my-10 bg-gray-200 px-3 text-webapp text-sm">
                <div class="flex flex-row items-center gap-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    <span v-if="accountError" class="text-red-600">{{ accountError }}</span>
                    <span v-else-if="verifiedAccount === false">No account detected</span>
                    <span v-else>{{ verifiedAccount.account_name }}</span>
                </div>
                <Preloader v-if="checkingForAccount" class="p-2" />
            </div>


            <div class="absolute md:static px-4 md:px-0 md:my-6 w-full h-14 bottom-10 left-0">
                <button @click="withdrawMoney"
                    :disabled="withdrawalDetails.bank.length < 1 || withdrawalDetails.accountNumber.length < 10"
                    :class="{ 'bg-blue-600 text-white': verifiedAccount && verifiedAccount.account_name.length > 0 && withdrawalDetails.accountNumber.toString().length >= 10, 'bg-gray-300 text-white': !verifiedAccount || withdrawalDetails.accountNumber.toString().length < 10 }"
                    class="grid rounded-lg place-items-center h-14 w-full">
                    <span v-if="!processingWithdrawal">Withdraw</span>
                    <Preloader v-else />
                </button>
            </div>


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
import axiosDefault from 'axios'
import moment from 'moment'

axiosDefault.defaults.headers.common = {
    Authorization: `bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
};

// console.log(import.meta.env.VITE_PAYSTACK_SECRET_KEY)

const props = defineProps(['amount'])

const store = useStore()
const router = useRouter()


const withdrawalDetails = reactive({
    amount: props.amount,
    fee: 0,
    paymentMethod: 'Habeep LLC to User',
    bank: '',
    accountNumber: ''
})

const allBanks = ref([])
const filteredBanks = ref([])
const bankQuery = ref('')

function queryBank(e) {
    let filtered = allBanks.value.filter((bank) => {
        return bank.name.toLowerCase().includes(bankQuery.value.toLowerCase())
    })
    filteredBanks.value = filtered
    checkForInput(e)
}

const checkForInput = (e) => {
    if (bankQuery.value.length === 0) {
        onSelectMethod.value = false
    }
}

function chooseBank(bank) {
    withdrawalDetails.bank = bank
    onSelectMethod.value = false

    verifyAccountDetails()
}

async function getBanks() {
    try {
        const banks = await axiosDefault.get('https://api.paystack.co/bank?currency=NGN')
        allBanks.value = banks.data.data
        filteredBanks.value = allBanks.value
    } catch (error) {
        console.log(error)
    }
}
getBanks()

const checkingForAccount = ref(false)
const verifiedAccount = ref(false)
const accountError = ref(null)

const onError = ref(false)
const errorMsg = ref(false)
const newMsg = ref('')

async function verifyAccountDetails() {
    try {
        verifiedAccount.value = false
        accountError.value = null
        if (withdrawalDetails.accountNumber.length === 10 && withdrawalDetails.bank.code) {
            checkingForAccount.value = true

            const verify = await axiosDefault.get(`https://api.paystack.co/bank/resolve?account_number=${withdrawalDetails.accountNumber}&bank_code=${withdrawalDetails.bank.code}`)

            checkingForAccount.value = false
            if (verify.data.status === true) {
                if(verify.data.data.account_name.toLowerCase().includes(store.state.user.fname.toLowerCase()) && verify.data.data.account_name.toLowerCase().includes(store.state.user.surname.toLowerCase())) {
                    verifiedAccount.value = verify.data.data
                } else {
                    accountError.value = "Bank name doesn't match your name!"
                }
            }
        }
    } catch (error) {
        checkingForAccount.value = false
    }
}

let paystackReference = ref(genRef())

async function withdrawMoney() {
    try {
        processingWithdrawal.value = true

        const recipientParams = reactive({
            type: 'nuban',
            name: verifiedAccount.value.account_name,
            account_number: verifiedAccount.value.account_number,
            bank_code: withdrawalDetails.bank.code,
            currency: 'NGN',
            email: store.state.user.email
        })

        const createRecipient = await axiosDefault.post('https://api.paystack.co/transferrecipient', recipientParams)

        const transferParams = reactive({
            source: 'balance',
            amount: withdrawalDetails.amount,
            reference: paystackReference,
            reason: "Habeep withdrawal",
            recipient: createRecipient.data.data.recipient_code
        })

        const initiateTransfer = await axiosDefault.post('https://api.paystack.co/transfer', transferParams)
        processWithdrawal(initiateTransfer.data)

        setTimeout(() => {
            newMsg.value = ''
            emit('close')
        }, 3000);

    } catch (error) {
        onError.value = true
        processWithdrawal({ status: 'QWERT//' })
        if (error.response) {
            errorMsg.value = error.response.data.message
        }
        setTimeout(() => {
            onError.value = false
        }, 3000);
    }
}


const emit = defineEmits(['close'])

const onSelectMethod = ref(false)
const processingWithdrawal = ref(false)


const processWithdrawal = async (response) => {
    let status = response.status
    if (response.status === true) {
        status = "ASDFG//"
    }
    try {
        let data = {
            accountId: store.state.user.wallet.naira,
            amount: withdrawalDetails.amount,
            reference: paystackReference.value,
            status: response.status,
            userId: store.state.user._id,
            paymentMethod: withdrawalDetails.paymentMethod,
            dates: {
                createdAt: moment().format('LLL'),
                time: moment().format('LTS'),
                date: moment().format('LL')
            }
        }

        const saveDeposit = await axios.post('/wallet/withdraw/naira', data)
        newMsg.value = saveDeposit.data.message
        processingWithdrawal.value = false

        setTimeout(() => {
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


function genRef() {
    return uniqid("wdl-pstk-");
}



</script>
  
<style scoped>
.main {
    width: 480px;
    border-radius: 10px;
}

.select-method input {
    height: 40px !important;
}

.select-method {
    width: 287px;
    height: 450px;
    box-shadow: 0px 8px 30px -6px rgba(24, 39, 75, 0.12), 0px 14px 88px -4px rgba(24, 39, 75, 0.15);
    border-radius: 10px;
}

.select-method::-webkit-scrollbar {
    width: 6px;
}


.select-method::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: #71759D;
}

.select-method::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
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