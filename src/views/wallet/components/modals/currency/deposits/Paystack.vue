<template></template>

<script setup>
import { onMounted } from 'vue'
import axiosInstance from '../../../../../../composables/axios'

const props = defineProps(['paymentInfo'])
const emit = defineEmits(['cancel', 'errorLoading', 'success'])

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
                onClose: closePayment
            });
        }

        script.onerror = () => {
            alert('Unable to load paystack')
            emit('errorLoading')
        }
    })
}

async function confirmPayment(response) {
    try {
        if (response.status === 'success') {

            const verify = await axiosInstance.get(`/finance/payments/verify-paystack-txn?reference=${response.reference}&withTransaction=false`)

            if (verify.data.data === 'SUCCESSFUL') {
                emit('success', response)
            } else emit('cancel', { method: 'paystack', reference: props.paymentInfo.ref })

        } else {
            emit('cancel', { method: 'paystack', reference: props.paymentInfo.ref })
        }

    } catch (error) {
        emit('cancel', { method: 'paystack', reference: props.paymentInfo.ref })
    }
}

function closePayment() {
    emit('cancel', { method: 'paystack', reference: props.paymentInfo.ref })
}

onMounted(() => {
    createPaystack()
})
</script>

<style></style>