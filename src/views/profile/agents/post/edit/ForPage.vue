<template>
    <div v-motion :initial="{ x: -100 }" :enter="{ x: 0 }"
        class="w-screen min-w-full flex flex-col lg:flex-row items-center bg-white h-full md:h-screen min-h-full overflow-y-auto 2xl:overflow-hidden">
        <div class="flex flex-col items-start gap-y-6 h-2/6 lg:h-full bg-webapp justify-between w-full lg:w-2/5 px-10">
            <div class="w-full flex-row-center justify-between pt-10">
                <img src="../../../../../assets/icons/chevron-left.svg" @click="$emit('goBack')" class="block" alt="">
            </div>
            <h1 class="text-white font-medium text-2xl md:text-4xl xl:text-5xl w-full text-left">Which of these describes
                the listing?
            </h1>
            <p></p>
        </div>

        <div
            class="form-container flex flex-col items-center justify-between relative bg-white w-full lg:w-3/5 min-h-fit h-4/6 lg:h-full">

            <div class="flex flex-col gap-y-3 w-full p-5 md:p-16 2xl:p-24">
                <div class="border-2 border-gray-200 w-full flex flex-col items-start p-5 gap-y-4 mt-14 md:mt-24 rounded-lg cursor-pointer"
                    @click="selectSaleType(1)" :class="{ 'border-blue-600': activeType === 1 }">

                    <span class="text-webapp font-xl font-medium" :class="{ 'text-blue-600': activeType === 1 }">For
                        rent</span>

                    <p class="text-sm text-webapp text-left w-full">A property for rent on a period of time usually
                        calculated per annum </p>
                </div>
                <div class="border-2 border-gray-200 w-full flex flex-col items-start p-5 gap-y-4 mt-4 rounded-lg cursor-pointer"
                    @click="selectSaleType(2)" :class="{ 'border-blue-600': activeType === 2 }">

                    <span class="text-webapp font-xl font-medium" :class="{ 'text-blue-600': activeType === 2 }">For
                        sale</span>

                    <p class="text-sm text-webapp text-left w-full">A property for rent on a period of time usually
                        calculated per annum </p>
                </div>
            </div>

            <div class="bottom flex flex-col items-center w-full justify-between static bottom-0">
                <div class="w-full bg-gray-200" style="height: 2px;">
                    <div class="bg-webapp h-full w-12/12"></div>
                </div>
                <div class="flex flex-row p-6 w-full items-center justify-between">
                    <span class="text-xl font-medium text-webapp underline cursor-pointer"
                        @click="$emit('goBack')">Back</span>
                    <button @click="updateProduct" :disabled="updating"
                        class="h-10 w-24 rounded-lg bg-blue-700 text-white text-sm text-medium">
                        <Preloader v-if="updating" class="scale-75" />
                        <span v-else>Next</span>
                    </button>
                </div>
            </div>
        </div>

        <Toast :msg="errorMsg" type="danger" v-if="onError" />
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from '../../../../../composables/axios'

const props = defineProps(['data'])
const emit = defineEmits(['finish'])

const errorMsg = ref('')
const onError = ref(false)
const updating = ref(false)

const data = reactive({
    for: props.data.for
})

let activeType = ref(0)


const selectSaleType = (type) => {
    activeType.value = type
    if (type === 1) {
        data.for = 'rent'
    } else data.for = 'sale'
}

if (data.for === 'rent') {
    activeType.value = 1
} else {
    activeType.value = 2
}

async function updateProduct() {
    try {
        updating.value = true
        let edited = false
        Object.keys(data).forEach(key => {
            if (props.data[key] !== data[key]) {
                edited = true
                return;
            }
        })
        if (edited) {
            await axios.patch('/listings/agent/edit-product/' + props.data._id, data)
            emit('finish', data)
        } else {
            emit('finish')
        }
        updating.value = false
    } catch (error) {
        updating.value = false
        onError.value = true
        if (error.response) {
            errorMsg.value = error.response.data.message
        } else {
            errorMsg.value = error.message
        }

        setTimeout(() => {
            onError.value = false
            errorMsg.value = ''
        }, 3000);
    }
}
</script>

<style>
input::placeholder {
    color: #71759D;
    font-size: 14px;
}

input {
    padding-left: 10px;
    outline: none;
    border: 1px solid #D9DDEE;
}

input:focus {
    border: 1px solid #1B49FF;
}

.form-container::-webkit-scrollbar {
    display: none;
}

.form-container::-webkit-scrollbar-track {
    background: rgb(241, 241, 241);
    border-radius: 8px;
}

.form-container::-webkit-scrollbar-thumb {
    background: #0f154d;
    border-radius: 8px;
}

.on-active {
    border: 1px solid #1B49FF;
    color: #1B49FF;
}

/* .bottom::before {
    border-top: 1px solid #D9DDEE;
}
.bottom::after {
    border-top: 1px solid #000000 ;
    width: 10%;
} */
</style>