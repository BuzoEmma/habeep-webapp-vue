<template>
    <div class="main flex flex-col items-center z-20 gap-y-2 overflow-hidden my-auto mx-auto bg-white">
        <div class="flex flex-row items-center justify-between w-full px-4 py-4 border-b border-b-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" @click="$emit('close')" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-6 h-6 block md:hidden font-bold">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span class="text-xl font-medium text-webapp">Swap</span>
            <img src="../../../../../assets/icons/x.svg" class="cursor-pointer collapse md:visible" @click="$emit('close')"
                alt="">
        </div>


        <div class="calculator w-full flex flex-col items-center px-5 py-3 gap-y-10 mt-5">
            <div class="flex flex-col items-end w-full gap-y-2">
                <div class="w-full border border-gray-200 relative flex flex-col justify-end px-2 rounded-md h-24">
                    <input type="number" v-model="data.naira" @input="updateSwapValue('naira')" placeholder="0.00"
                        class="outline-none h-10 text-3xl text-sub-webapp">
                    <div class="px-2 bg-gray-200 rounded-md py-1 absolute -top-4 left-2 text-sm">You pay - NGN</div>
                </div>
                <span class="text-sm text-webapp">Available NGN: {{ formatNumber(walletData.accountValue) }}</span>
            </div>

            <div class="flex flex-col items-end w-full gap-y-2">
                <div class="w-full border border-gray-200 relative flex flex-col justify-end px-2 rounded-md h-24">
                    <input type="number" v-model="data.hbp" @input="updateSwapValue('hbp')" placeholder="0.00"
                        class="outline-none h-10 text-3xl text-sub-webapp">
                    <div class="px-2 bg-gray-200 rounded-md py-1 absolute -top-4 left-2 text-sm">You get - HBP</div>
                </div>
            </div>

            <button @click="processSwap"
                :class="{ 'bg-blue-600 text-white': data.naira <= walletData.accountValue && data.hbp > 0, 'bg-gray-300': data.naira < 1 || data.naira > walletData.accountValue || data.hbp == 0, }"
                class="grid rounded-lg place-items-center h-14 my-6 w-full"
                :disabled="data.naira < 1 || data.naira > walletData.accountValue || data.hbp == 0">
                <span v-if="!processingSwap">Swap</span>
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
import formatNumber from 'number_formatter'
import moment from 'moment'

const store = useStore()
const router = useRouter()
const emit = defineEmits(['close'])

const data = reactive({
    naira: null,
    hbp: null
})

const walletData = ref({
    accountValue: 0
})

const onError = ref(false)
let errorMsg = ref('')
let newMsg = ref('')

function updateSwapValue(token) {
    onError.value = false
    if (token == 'naira') {
        if (data.naira > walletData.value.accountValue) {
            onError.value = true
            errorMsg.value = 'Swap amount is lower than wallet balance. Deposit ' + (Number(data.naira) - Number(walletData.value.accountValue)) + ' to swap'
        } else {
            data.hbp = data.naira / 87
            setTimeout(() => {
                onError.value = false
            }, 3000);
        }
    } else {
        if (data.naira > walletData.value.accountValue) {
            onError.value = true
            errorMsg.value = 'Swap amount is lower than wallet balance. Deposit ' + (data.naira - walletData.value.accountValue) + ' to swap'
        } else {
            data.naira = data.hbp * 87
            setTimeout(() => {
                onError.value = false
            }, 3000);
        }
    }
}

const processingSwap = ref(false)


async function getWallet() {
    try {
        const nairaWallet = await axios.post('/wallet/fetch-wallet', { wallet: 'naira' })
        if (nairaWallet.data.error === false) {
            walletData.value = nairaWallet.data.data
        }
    } catch (error) {

    }
}

getWallet()


const processSwap = async () => {
    try {
        processingSwap.value = true

        let mainData = {
            wallet: walletData.value.accountID,
            amount: data.naira,
            tokenToSwap: 'naira',
            dates: {
                createdAt: moment().format('LLL'),
                time: moment().format('LTS'),
                date: moment().format('LL')
            }
        }

        const swapToken = await axios.post('/wallet/swap', mainData)
        newMsg.value = swapToken.data.message

        setTimeout(() => {
            processingSwap.value = false
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


</script>
  
<style scoped>
.main {
    width: 480px;
    border-radius: 10px;
}

input::placeholder {
    color: #71759D;
    font-size: 36px;
    line-height: 130%;
}

@media screen and (max-width: 450px) {
    .main {
        width: 100vw !important;
        height: 100vh !important;
        border-radius: 0px;
    }
}
</style>