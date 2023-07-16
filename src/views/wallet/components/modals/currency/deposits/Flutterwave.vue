<template></template>

<script setup>
import { onMounted } from 'vue'
import axios from 'axios'

const props = defineProps(['paymentInfo'])
const emit = defineEmits(['cancel', 'errorLoading', 'success'])

function createFlw() {
    return new Promise((res, rej) => {
        const script = document.createElement('script')
        script.id = 'flw'
        script.src = 'https://checkout.flutterwave.com/v3.js'
        document.getElementsByTagName('head')[0].appendChild(script)
        // check if script is ready

        script.onload = () => {
            window.FlutterwaveCheckout({
                ...props.paymentInfo,
                callback: confirmPayment,
                onclose: closePayment
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
        if (response.status === 'completed') {            
            emit('success', response)
        } else {
            emit('cancel', { method: 'flutterwave', reference: response.tx_ref })
        }

    } catch (error) {
        emit('cancel', { method: 'flutterwave', reference: response.tx_ref })
    }
}

function closePayment() {
    emit('cancel',  true)
}

onMounted(() => {
    createFlw()
})
</script>

<style></style>