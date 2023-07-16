<template>
    <span>{{ value }}</span>
</template>

<script setup>
import currencyFormatter from 'currency-formatter'
import converter from 'currency-exchanger-js'
import { onMounted, ref } from 'vue'

const props = defineProps({
    from: {
        type: String,
        default: null
    },
    to: {
        type: String
    },
    amount: {
        type: Number
    }
})

const value = ref(currencyFormatter.format(props.amount, { code: props.to || 'NGN'}))

async function formatNumbers() {
    if(!props.from && (!props.to || props.to === 'NGN')) {
        value.value = currencyFormatter.format(props.amount, { code: 'NGN'})
        return true
    } else {
        if(!props.from && props.to) {
            const fromTo = await converter.convert(props.amount, 'ngn', props.to.toLowerCase())
            value.value = currencyFormatter.format(fromTo, { code: props.to})
            return true
        } else {
            const fromTo = await converter.convert(props.amount, props.from.toLowerCase(), props.to.toLowerCase())
            value.value = currencyFormatter.format(fromTo, { code: props.to})
            return true
        }
    }
}

onMounted(() => {
    formatNumbers()
})
</script>

<style></style>