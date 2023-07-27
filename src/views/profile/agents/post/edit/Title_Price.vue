<template>
    <div v-motion :initial="{ x: -100 }" :enter="{ x: 0 }"
        class="w-screen min-w-full flex flex-col lg:flex-row items-center bg-white h-full md:h-screen min-h-full overflow-y-auto no-scroll-btn md:overflow-hidden">
        <div class="flex flex-col items-start gap-y-6 h-2/6 lg:h-full bg-webapp justify-between w-full lg:w-2/5 px-10">
            <div class="w-full flex-row-center justify-between pt-10">
                <img src="../../../../../assets/icons/chevron-left.svg" @click="$emit('goBack')" class="block" alt="">
            </div>
            <h1 class="text-white font-medium text-2xl md:text-4xl xl:text-5xl   w-full text-left">What’s the property title
                and
                price?
            </h1>
            <p></p>
        </div>

        <div
            class="form-container flex flex-col items-center justify-between relative bg-white w-full lg:w-3/5 min-h-fit h-4/6 lg:h-full">

            <div class="form-fields w-full flex flex-col h-full items-center px-5 justify-center gap-y-6">
                <div class="flex flex-col items-start w-full gap-y-1 md:w-4/6 xl:w-3/5">
                    <label for="" class="text-lg font-medium text-webapp">Property title</label>
                    <input type="text" v-model="data.title" placeholder="Type a title for this listing"
                        class="w-full h-16 rounded-lg title bg-transparent">
                </div>
                <div class="flex flex-col items-start w-full gap-y-1 md:w-4/6 xl:w-3/5">
                    <label for="" class="text-lg font-medium text-webapp">Price in {{ $store.state.user.currency }}</label>
                    <div class="flex flex-row gap-x-2 items-center w-full border border-gray-200 rounded-lg h-16 px-2 py-2 focus-within:border-blue-600">
                        <div class="bg-gray-200 h-full w-14 rounded-md text-gray-700 text-xl div-center-col">
                            {{ getSymbolFromCurrency($store.state.user.currency) }}
                        </div>
                        <input inputmode="numeric" @keyup="formatPrice" v-model="data.price" type="text" data-type="number"
                            placeholder="Type a price for this listing"
                            class="w-full h-full bg-transparent rounded-lg price">
                    </div>
                </div>
            </div>

            <div class="bottom flex flex-col items-center w-full justify-between static bottom-0">
                <div class="w-full bg-gray-200" style="height: 2px;">
                    <div class="bg-webapp h-full w-12/12"></div>
                </div>
                <div class="flex flex-row p-6 w-full items-center justify-between">
                    <span class="text-xl font-medium text-webapp underline cursor-pointer"
                        @click="$emit('goBack')">Back</span>
                    <button @click="updateProduct" :disabled="updating" class="h-10 w-24 rounded-lg bg-blue-700 text-white text-sm text-medium">
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
import { reactive, ref } from 'vue'
import getSymbolFromCurrency from 'currency-symbol-map'
import axios from '../../../../../composables/axios'


const props = defineProps(['data'])
const emit = defineEmits(['finish'])

const errorMsg = ref('')
const onError = ref(false)
const updating = ref(false)

function formatPrice(e) {
    if (e.which >= 37 && e.which <= 40) {
        e.preventDefault();
    }
    var tempNumber = data.price.replace(/,/gi, "");
    var commaSeparatedNumber = tempNumber.split(/(?=(?:\d{3})+$)/).join(",");

    data.price = commaSeparatedNumber
}

const data = reactive({
    price: '',
    title: props.data.title
})

var tempNumber = props.data.price.toString().replace(/,/gi, "");
var commaSeparatedNumber = tempNumber.split(/(?=(?:\d{3})+$)/).join(",");

data.price = commaSeparatedNumber

async function updateProduct() {
    try {
        updating.value = true
        let edited = false

        const num = parseFloat(data.price.replaceAll(',', ''));
        data.price = num

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

<style scoped>
input::placeholder {
    color: #71759D;
    font-size: 16px;
}

input.title {
    padding-left: 10px;
    outline: none;
    border: 1px solid #D9DDEE;
}

input.price {
    padding-left: 10px;
    outline: none;
    border: none !important;
}

input.title:focus {
    border: 1px solid #1B49FF;
}

.results::-webkit-scrollbar {
    width: 5px;
}


.results::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: #71759D;
}

.results::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
}

.results::-webkit-scrollbar-button {
    max-height: 92px;
    height: 200px !important;
    width: 200px !important;
}


.on-active {
    border: 1px solid #1B49FF;
    color: #1B49FF;
}

.mapouter {
    position: relative;
    text-align: right;
    height: 100%;
    width: 100%;
}

.gmap_canvas {
    overflow: hidden;
    background: none !important;
    height: 100%;
    width: 100%;
}

/* .bottom::before {
    border-top: 1px solid #D9DDEE;
}
.bottom::after {
    border-top: 1px solid #000000 ;
    width: 10%;
} */
</style>