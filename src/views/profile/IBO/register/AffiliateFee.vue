<template>
    <div
        class="form-container flex flex-col items-center relative bg-white gap-y-3 w-full xl:w-2/3 h-full pb-6 overflow-y-auto overflow-x-hidden">

        <!-- logo -->
        <div
            class="w-full text-left text-webapp justify-between font-medium text-xl flex flex-row px-4 items-center py-5 border-b border-b-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0A1045"
                class="w-6 h-6  text-webapp cursor-pointer" @click="$emit('back')">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span class="capitalize text-webapp ">IBO Affiliate fee</span>
            <img src="../../../../assets/icons/Filter.svg" class="collapse" alt="">
        </div>

        <!-- amount to pay section -->

        <div class="mt-[33px] mb-[48px] flex-col-center w-full">
            <h3 class="text-sub-webapp text-sm">Amount</h3>
            <div class="flex-row flex items-center">
                <span class="text-[36px] font-medium text-webapp" v-if="accountType === 'hbp'">
                    {{ amountToDebit }}
                </span>
                <span class="text-[36px] font-medium text-webapp" v-else>
                    <PriceFormatter :from="$store.state.user.currency" :to="$store.state.user.currency"
                        :amount="currencyAmountToDebit" />
                </span>

                <span class="text-[24px] text-webapp font-medium mt-2" v-if="accountType === 'hbp'">HBP</span>
            </div>
        </div>

        <div class="w-full h-full flex-col-center justify-between px-4">
            <div class="flex flex-col items-center w-full md:w-2/3">
                <!-- input fields -->
                <fieldset
                    class="flex flex-row items-center justify-between w-full h-[60px] rounded-[5px] px-[18px] gap-y-1 form-field">
                    <legend class="text-[11px] text-sub-webapp">Pay with</legend>
                    <span class="text-sm text-webapp mt-[10px]" v-if="accountType === 'hbp'">HBP wallet
                        account</span>
                    <span class="text-sm text-webapp mt-[10px]" v-else>{{ $store.state.user.currency }} wallet
                        account</span>
                    <img src="../../../../assets/icons/exchange.svg" class="mt-[10px]" @click="changeAccountType"
                        alt="">
                </fieldset>

                <div class="flex flex-row items-center justify-between px-[18px] w-full h-[48px] form-field rounded-[5px] mt-4"
                    style="background: #F9FAFF">
                    <span class="text-sub-webapp text-[11px]">Balance</span>
                    <div class="flex-row flex items-center" v-if="accountType === 'hbp'">
                        <span class="text-sm font-medium text-webapp">{{ hbpWalletData.accountValue.toFixed(2)
                            }}</span>
                        <span class="text-[11px] text-webapp mt-1">HBP</span>
                    </div>
                    <div class="flex-row flex items-center" v-else>
                        <PriceFormatter :from="$store.state.user.currency" :to="$store.state.user.currency"
                            :amount="currencyWalletData.accountValue" />
                    </div>
                </div>

                <p class="w-full text-left text-sub-webapp  text-sm mt-[27px]">
                    By clicking on
                    <span v-if="accountType === 'hbp'" class="text-webapp">Pay {{ amountToDebit }}HBP</span>
                    <PriceFormatter v-else :from="$store.state.user.currency" :to="$store.state.user.currency"
                        :amount="currencyAmountToDebit" />
                    , you agree to <a href="https://habeep.org/terms-of-service" target="_blank"
                        class=" text-primary border-b border-b-blue-600 pb-[1px]">IBO Terms and conditions</a> of
                    the
                    platform
                    for
                    property listing and other affiliate structure put in place. This fee is mandatory for IBO and
                    is
                    been
                    used to reward the system. Kindly <span class="text-webapp font-medium">fund your wallet</span>
                    before clicking the pay button.
                </p>
            </div>

            <!-- submit btn -->
            <button :disabled="processing" v-if="!alreadyDebited"
                class="bg-primary w-full rounded-[5px] grid place-items-center h-14 text-white md:w-2/3"
                @click="debitFee">
                <Preloader v-if="processing" />
                <span v-if="!processing && accountType === 'hbp'">Pay {{ amountToDebit }}HBP</span>
                <p v-if="!processing && accountType !== 'hbp'">Pay
                    <PriceFormatter :from="$store.state.user.currency" :to="$store.state.user.currency"
                        :amount="currencyAmountToDebit" />
                </p>
            </button>
            <button :disabled="processing" v-else
                class="bg-primary w-full rounded-[5px] grid place-items-center h-14 text-white md:w-2/3"
                @click="makeUserAnIBO">
                <Preloader v-if="processing" />
                <span v-else>Become a Tenant</span>

            </button>
        </div>


        <!-- components -->
        <Toast :msg="errorMsg.msg" type="danger" v-if="onError" />
        <Toast :msg="newMsg" type="success" v-if="newMsg.length > 0" />
    </div>
</template>

<script setup>
/* eslint-disable */

import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router";
import axios from "../../../../composables/axios";
import moment from 'moment'
import { useStore } from 'vuex';
import converter from 'currency-exchanger-js'
import currencyFormatter from 'currency-formatter'

const props = defineProps(['data'])
const store = useStore()

const router = useRouter();

const url = '/auth/user/update/role';

const onError = ref(false)
let errorMsg = ref({
    msg: '',
    field: null
})
let newMsg = ref('')
const processing = ref(false)

const hbpWalletData = ref({
    accountValue: 0
})
const currencyWalletData = ref({
    accountValue: 0
})

const accountType = ref('hbp')

function changeAccountType() {
    if (accountType.value !== 'hbp') {
        accountType.value = 'hbp'
    } else accountType.value = 'currency'
}


async function getWallet() {
    try {
        const hbpWallet = await axios.post('/wallet/fetch-wallet', { wallet: 'hbp' })
        if (hbpWallet.data.error === false) {
            hbpWalletData.value = hbpWallet.data.data
        }

        const currencyWallet = await axios.post('/wallet/fetch-wallet', { wallet: store.state.user.currency })
        if (currencyWallet.data.error === false) {
            currencyWalletData.value = currencyWallet.data.data
        }


    } catch (error) {
        return false
    }
}
const alreadyDebited = ref(false)

let amountToDebit = 50 ? props.data.role == "AGENT" : 120
if (amountToDebit === true) {
    amountToDebit = 50
} else {
    amountToDebit = 120
}

const currencyAmountToDebit = ref(50 ? props.data.role == "AGENT" : 120)
if (currencyAmountToDebit.value === true) {
    currencyAmountToDebit.value = 50
} else {
    currencyAmountToDebit.value = 120
}





async function debitFee() {
    if (alreadyDebited.value === false) {
        const debitVerification = await checkAlreadyDebitedTxn();
        if (debitVerification === false) {
            if (accountType.value === 'hbp') {
                if (hbpWalletData.value.accountValue < amountToDebit) {
                    onError.value = true
                    errorMsg.value.msg = 'Deposit ' + (amountToDebit - hbpWalletData.value.accountValue).toFixed(2) + 'HBP to continue. Redirecting to deposit page in 2sec!'

                    setTimeout(() => {
                        router.push('/wallet?tab=hbp&cont=deposit')
                    }, 2000);
                } else {
                    try {
                        processing.value = true
                        let data = {
                            amount: amountToDebit,
                            description: 'Purchase ' + props.data.role + ' plan',
                            dates: {
                                createdAt: moment().format('LLL'),
                                time: moment().format('LTS'),
                                date: moment().format('LL')
                            },
                        }
                        await axios.post('/wallet/debit-wallet', data)
                        hbpWalletData.value.accountValue -= amountToDebit
                        alreadyDebited.value = true
                        makeUserAnIBO()
                    } catch (error) {
                        processing.value = false
                        onError.value = true
                        errorMsg.value.msg = 'Unable to debit user wallet. Try again later'
                    }
                }
            } else {
                if (currencyWalletData.value.accountValue < currencyAmountToDebit.value) {
                    onError.value = true
                    errorMsg.value.msg = 'Deposit ' + currencyFormatter.format(currencyAmountToDebit.value - currencyWalletData.value.accountValue, { code: store.state.user.currency }) + ` to continue. Redirecting to deposit page in 2sec!`

                    setTimeout(() => {
                        router.push('/wallet?tab=currency&cont=deposit')
                    }, 2000);
                } else {
                    try {
                        processing.value = true
                        let data = {
                            amount: currencyAmountToDebit.value,
                            description: 'Purchase ' + props.data.role + ' plan',
                            dates: {
                                createdAt: moment().format('LLL'),
                                time: moment().format('LTS'),
                                date: moment().format('LL')
                            },
                        }
                        await axios.post('/wallet/charge-money-wallet', data)
                        currencyWalletData.value.accountValue -= currencyAmountToDebit.value
                        alreadyDebited.value = true
                        makeUserAnIBO()
                    } catch (error) {
                        processing.value = false
                        onError.value = true
                        errorMsg.value.msg = 'Unable to debit user wallet. Try again later'
                    }
                }
            }
        } else {
            makeUserAnIBO()
        }
    } else {
        makeUserAnIBO()
    }
}


async function makeUserAnIBO() {
    try {
        processing.value = true
        const change = await axios.put(url, props.data)
        if (!change.data.success) {
            onError.value = true
            errorMsg.value.msg = change.data.message


            setTimeout(() => {
                processing.value = false
                onError.value = false
                errorMsg.value.msg = ''

                if (change.data.errorMsg === 'MATCH') {
                    if (props.data.role == 'AGENT') {
                        router.replace('/agent/ads')
                    } else {
                        router.replace('/tenancy')
                    }
                }

            }, 2000);

        } else {
            newMsg.value = change.data.message

            const getUser = await axios.get('/auth/user')

            let mutate = {
                sessionId: store.state.sessionId,
                authState: true,
                userDetails: getUser.data,
            };
            store.dispatch("setAuth", mutate);

            setTimeout(() => {
                processing.value = false
                newMsg.value = ''
                if (props.data.role == "AGENT") {
                    router.replace('/agent/ads')
                } else {
                    router.replace('/')
                }
            }, 1000);

        }
    } catch (error) {
        processing.value = false
        onError.value = true
        if (error.response) {
            errorMsg.value.msg = error.response.data.error
        } else {
            errorMsg.value.msg = error.message
        }

        setTimeout(() => {
            onError.value = false
        }, 5000);
    }
}


async function checkAlreadyDebitedTxn() {
    const accountUsed = accountType.value.toLowerCase()

    async function runTxn(wallet = 'hbp') {
        const fetch = await axios.post('/wallet/fetch-transaction-with-reference', { reference: `Purchase ${props.data?.role?.toUpperCase() ?? 'TENANT'} plan`, wallet: wallet })
        if (fetch.data.error === false) {
            const accounts = [store.state.user.wallet[store.state.user.currency], store.state.user.wallet?.coin]
            const data = fetch.data.data;
            if (accounts.includes(data?.walletId)) {
                if (['COMPLETED', 'SUCCESSFUL'].includes(data?.status?.toUpperCase())) {
                    alreadyDebited.value = true;
                } else {
                    alreadyDebited.value = false;
                }
            }
        }
    }
    try {
        await runTxn(accountUsed);
        return alreadyDebited.value;
    } catch (error) {
        try {
            await runTxn(accountUsed === 'hbp' ? store.state.user.currency?.toLowerCase() : 'hbp');
            return alreadyDebited.value;
        } catch (error) {
            return alreadyDebited.value;
        }

    }
}

onMounted(async () => {
    hbpWalletData.value.accountValue = 0
    currencyWalletData.value.accountValue = 0
    await getWallet()
    checkAlreadyDebitedTxn()

    let nairaValue = ref(87)
    try {
        const nairaValueOfHBP = await axios.get('/wallet/naira-value')
        nairaValue.value = nairaValueOfHBP.data.data
    } catch (error) {
        nairaValue.value = 87
    }

    try {
        currencyAmountToDebit.value = await converter.convert(nairaValue.value * amountToDebit, 'ngn', store.state.user.currency.toLowerCase())
    } catch (error) {
        currencyAmountToDebit.value = nairaValue.value * 120
    }

    if (hbpWalletData.value.accountValue >= amountToDebit) {
        accountType.value = 'hbp'
    } else if (currencyWalletData.value.accountValue >= currencyAmountToDebit.value) {
        accountType.value = 'currency'
    } else if (currencyWalletData.value.accountValue > 0 || hbpWalletData.value.accountValue > 0) {
        if ((hbpWalletData.value.accountValue * nairaValue.value) > currencyWalletData.value.accountValue) {
            accountType.value = 'hbp'
        } else {
            accountType.value = 'currency'
        }
    }
})


</script>

<style scoped>
input::placeholder,
textarea::placeholder {
    color: #71759D;
    font-size: 14px;
}

input,
textarea {
    padding-left: 10px;
    outline: none;
    border: 1px solid #D9DDEE;
}

select {
    border: 1px solid #D9DDEE;
}

input:focus,
textarea:focus {
    border: 1px solid #1B49FF;
}

.form-field {
    border: 1px solid #D9DDEE;
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