<template>
    <div class="flex flex-col items-center justify-between w-full h-full gap-y-9">
        <p class="text-webapp text-3xl font-bold">{{ formatNumber(walletData.accountValue) }}<sub
                class="text-webapp text-sm font-bold">HBP</sub></p>

        <div class="w-full flex flex-row items-center justify-between">
            <div class="flex flex-col gap-y-1 items-center cursor-pointer"
                @click="$router.push('/wallet?tab=hbp&cont=deposit')">
                <img src="../../../../../assets/icons/wallet/deposit.svg" alt="">
                <span class="text-xs text-webapp">Deposit</span>
            </div>
            <div class="flex flex-col gap-y-1 items-center cursor-pointer"
                @click="$router.push('/wallet?tab=hbp&cont=withdraw')">
                <img src="../../../../../assets/icons/wallet/withdraw.svg" alt="">
                <span class="text-xs text-webapp">Withdraw</span>
            </div>
            <div class="flex flex-col pb-1 items-center">
                <img src="../../../../../assets/icons/wallet/staking.svg" alt="">
                <span class="text-xs text-webapp">Staking</span>
            </div>
        </div>

        <button @click="$router.push('/wallet?tab=hbp')"
            class="user-btn flex-row items-center  justify-center text-sm font-medium text-webapp w-full  bg-white">View
            Wallet</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from '../../../../../composables/axios'
import formatNumber from 'number_formatter'

const walletData = ref({
    accountValue: 0
})


async function getWallet() {
    try {
        const nairaWallet = await axios.post('/wallet/fetch-wallet', { wallet: 'hbp' })
        if (nairaWallet.data.error === false) {
            walletData.value = nairaWallet.data.data
        }
    } catch (error) {

    }
}

getWallet()
</script>

<style scoped>
.user-btn {
    border: 1px solid #D9DDEE;
    border-radius: 5px;
    height: 50px;
}
</style>