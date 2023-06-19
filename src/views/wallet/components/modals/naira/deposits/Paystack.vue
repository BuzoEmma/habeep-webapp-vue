<template></template>

<script setup>
import { onMounted } from 'vue'
import axios from 'axios'

const props = defineProps(['paymentInfo'])
const emit = defineEmits(['cancel', 'errorLoading', 'success', 'pendingTxn'])

function createPaystack() {
    return new Promise((res, rej) => {
        const script = document.createElement("script");
        script.setAttribute("src", "https://js.paystack.co/v2/inline.js");
        script.setAttribute("type", "text/javascript");
        document.getElementsByTagName('head')[0].appendChild(script)
        // check if script is ready
        script.onload = () => {
            const paystack = new window.PaystackPop();
            paystack.newTransaction({
                ...props.paymentInfo,
                callback: confirmPayment,
                onClose: closePayment,
                onBankTransferConfirmationPending: registerPending,
            });
        }

        script.onerror = () => {
            alert('Unable to load paystack')
            emit('errorLoading')
        }
    })
}

const secret_key = 'pk_live_9a894022d4b6e6016264145e3a6e3ce80eeb1288'

async function confirmPayment(response) {
    try {
        if (response.status === 'success') {

            axios.defaults.headers.common = {
                Authorization: `Bearer ${secret_key}`
            };
            const verify = await axios.get('https://api.paystack.co/transaction/verify/' + response.reference)
            
            if(verify.data.status === true && verify.data.data.status === 'success') {
                emit('success', response)
            } else emit('cancel', { method: 'paystack', reference: props.paymentInfo.ref })

        } else {
            emit('cancel', { method: 'paystack', reference: props.paymentInfo.ref })
        }

    } catch (error) {
        emit('cancel', { method: 'paystack', reference: props.paymentInfo.ref })
    }
}

function registerPending(response) {
    emit('pendingTxn', response)
}

function closePayment() {
    emit('cancel', { method: 'paystack', reference: props.paymentInfo.ref })
}

onMounted(() => {
    createPaystack()
})
</script>

<style></style>