<template></template>

<script setup>
import { onMounted } from 'vue'
import axios from 'axios'

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

const secret_key = import.meta.env.VITE_PAYSTACK_SECRET_KEY

async function confirmPayment(response) {
    try {
        console.log(response, 'newResponse')
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

function closePayment(e) {
    console.log(e, 'hello')
    emit('cancel', { method: 'paystack', reference: props.paymentInfo.ref })
}

onMounted(() => {
    createPaystack()
})
</script>

<style></style>