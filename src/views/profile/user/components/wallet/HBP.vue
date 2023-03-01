<template>
    <div class="flex flex-col items-center justify-between w-full h-full gap-y-9">
        <p class="text-webapp text-3xl font-bold">0.00<sub class="text-webapp text-sm font-bold">HBP</sub></p>

        <div class="w-full flex flex-row items-center justify-between">
            <div class="flex flex-col gap-y-1 items-center">
                <img src="../../../../../assets/icons/wallet/deposit.svg" alt="">
                <span class="text-xs text-webapp">Deposit</span>
            </div>
            <div class="flex flex-col gap-y-1 items-center">
                <img src="../../../../../assets/icons/wallet/withdraw.svg" alt="">
                <span class="text-xs text-webapp">Withdraw</span>
            </div>
            <div class="flex flex-col gap-y-1 items-center">
                <img src="../../../../../assets/icons/wallet/staking.svg" alt="">
                <span class="text-xs text-webapp">Staking</span>
            </div>
        </div>

        <button
            class="user-btn flex-row items-center  justify-center text-sm font-medium text-webapp w-full  bg-white">View
            Wallet</button>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.user-btn {
    border: 1px solid #D9DDEE;
    border-radius: 5px;
    height: 50px;
}
</style>