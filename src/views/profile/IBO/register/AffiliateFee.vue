<template>
    <div
        class="form-container flex flex-col items-center relative bg-white gap-y-3 w-full xl:w-2/3 h-full pb-6 md:py-10 overflow-y-auto overflow-x-hidden">

        <div class="flex flex-col items-center w-full md:w-2/3 px-4">
            <!-- logo -->
            <div class="logo md:flex hidden flex-row items-center justify-end w-full gap-x-2 cursor-pointer"
                @click="$router.push('/')">
                <img src="../../../../assets/icons/logo.svg" alt="Logo">
                <span class="text-primary text-2xl">Habeep</span>
            </div>

            <p class="w-full text-left text-webapp font-bold text-xl flex flex-row items-center gap-x-1 mt-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0A1045"
                    class="w-6 h-6 cursor-pointer" @click="$router.go(-1)">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span>Affiliate fee</span>
            </p>

            <!-- input fields -->
            <div class="flex flex-col items-start w-full gap-y-1 mt-8">
                <label for="" class="text-sm text-webapp">Pay with</label>
                <div class="flex flex-row items-center justify-between w-full h-14 rounded-lg px-2 gap-y-1 form-field "
                    style="background: #F9FAFF">
                    <span class="text-lg text-webapp">HBP Wallet</span>
                </div>
            </div>

            <div class="flex flex-col items-start w-full gap-y-1 mt-8">
                <label for="" class="text-sm text-webapp">Balance</label>
                <div class="flex flex-row items-center px-2 w-full h-14 form-field rounded-lg" style="background: #F9FAFF">
                    <span class="text-xl font-medium text-webapp">{{ walletData.accountValue }}</span>
                    <span class="text-sm text-webapp">HBP</span>
                </div>
            </div>

            <p class="w-full text-left text-webapp  text-sm mt-10">
                By clicking on Pay {{ amountToDebit }}HBP, you agree to <span @click="$router.push('/terms-of-service')"
                    class="cursor-pointer text-primary underline">Terms and conditions</span> of the platform for
                property listing and other affiliate structure put in place. This fee is mandatory for IBO and is been
                used to reward the system. Kindly fund your wallet before clicking the active button.
            </p>
            <!-- submit btn -->
            <div class="bottom-10 absolute px-4 w-full">
                <button class="bg-primary w-full rounded-lg grid place-items-center h-14 text-white mt-5" @click="debitFee">
                    <span v-if="!processing">Pay {{ amountToDebit }}HBP</span>
                    <Preloader v-else />
                </button>
            </div>

        </div>

        <!-- components -->
        <Toast :msg="errorMsg.msg" type="danger" v-if="onError" />
        <Toast :msg="newMsg" type="success" v-if="newMsg.length > 0" />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from "vue-router";
import axios from "../../../../composables/axios";
import axiosDefault from 'axios'
import { useStore } from "vuex";

const props = defineProps(['data'])
const emit = defineEmits(['pushToWallet'])

const route = useRoute();
const router = useRouter();

const store = useStore();

const url = '/auth/user/update/role';

const onError = ref(false)
let errorMsg = ref({
    msg: '',
    field: null
})
let newMsg = ref('')
let warningMsg = ref('')
const processing = ref(false)

const walletData = ref({
    accountValue: 0
})
const alreadyDebited = ref(false)

async function getWallet() {
    try {
        const hbpWallet = await axios.post('/wallet/fetch-wallet', { wallet: 'hbp' })
        if (hbpWallet.data.error === false) {
            walletData.value = hbpWallet.data.data
        }
    } catch (error) {

    }
}

let amountToDebit = 50 ? props.data.role == "AGENT" : 120
if (amountToDebit === true) {
    amountToDebit = 50
} else {
    amountToDebit = 120
}
async function debitFee() {
    if (alreadyDebited.value === false) {
        if (walletData.value.accountValue < amountToDebit) {
            onError.value = true
            errorMsg.value.msg = 'Swap naira to ' + (amountToDebit - walletData.value.accountValue) + 'HBP to continue. Redirecting to swap page in 2sec'

            setTimeout(() => {
                router.push('/wallet?tab=hbp&cont=deposit&reloadApp=true')
            }, 2000);
        } else {
            try {
                let data = {
                    amount: amountToDebit,
                    description: 'Purchase ' + props.data.role + ' plan'
                }
                await axios.post('/wallet/debit-wallet', data)
                walletData.value.accountValue -= amountToDebit
                alreadyDebited.value = true
                makeUserAnIBO()
            } catch (error) {
                onError.value = true
                errorMsg.value.msg = 'Unable to debit user wallet. Try again later'
            }
        }
    } else {
        makeUserAnIBO()
    }
}


async function makeUserAnIBO() {
    try {
        processing.value = true
        if (props.data.role === 'AGENT') {
            props.data.state = props.data.state.state.name
        }
        const change = await axios.put(url, props.data)
        if (!change.data.success) {
            onError.value = true
            errorMsg.value.msg = create.data.message

            setTimeout(() => {
                processing.value = false
                onError.value = false
                errorMsg.value.msg = ''
            }, 3000);
        } else {
            newMsg.value = change.data.message
            console.log('here')
            setTimeout(() => {
                processing.value = false
                newMsg.value = ''
                if (props.data.role == 'AGENT') {
                    router.push('/agent/ads?reloadApp=true')
                } else {
                    router.push('/feeds?reloadApp=true')
                }
            }, 1500);

        }
    } catch (error) {
        processing.value = false
        onError.value = true
        console.log(error)
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

getWallet()

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