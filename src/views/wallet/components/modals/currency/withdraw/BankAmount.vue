<template>
    <div class="main flex flex-col items-center z-20 gap-y-2 overflow-hidden my-auto mx-auto bg-white">
        <div class="flex flex-row items-center justify-between w-full px-4 py-4 border-b border-b-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" @click="$emit('close')" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-6 h-6 block md:hidden font-bold">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span class="text-xl font-medium text-webapp">Withdraw to bank account</span>
            <img src="../../../../../../assets/icons/x.svg" class="cursor-pointer collapse md:visible"
                @click="$emit('close')" alt="">
        </div>
        <div class="w-full px-4 py-3 flex flex-col items-start h-full relative">
            <span class="text-sub-webapp text-lg w-full text-left">
                Transferable balance:
                <PriceFormatter :from="$store.state.user.currency" :to="$store.state.user.currency"
                    :amount="props.wallet.accountValue" />
            </span>

            <input type="number" placeholder="0.00" v-model="amount" @input="processData"
                class="h-14 w-full border mt-7 text-black placeholder:text-xl placeholder:font-black text-xl border-gray-200 flex flex-row items-center justify-center text-center outline-none rounded-md">

            <button class="grid text-white mt-10 rounded-lg cursor-pointer place-items-center h-14 border-gray-200 w-full"
                :disabled="amount < 10 || amount > props.wallet.accountValue"
                :class="{ 'bg-blue-600': amount > 9 && amount <= props.wallet.accountValue, 'bg-gray-300': amount < 10 || !amount || amount > props.wallet.accountValue }"
                @click="$emit('receiveAmount', amount)">
                <span>Withdraw</span>
            </button>
        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive, onMounted } from 'vue'

const props = defineProps(['wallet'])

const selectedMethod = ref(null)
const amount = ref(null)


const processData = () => {
    if (amount.value > props.wallet.accountValue) {
        amount.value = props.wallet.accountValue
    }

}

</script>
  
<style scoped>
.main {
    width: 480px;
    min-height: 300px;
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