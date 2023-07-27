<template>
    <div v-motion :initial="{ x: -100 }" :enter="{ x: 0 }"
        class="w-screen min-w-full flex flex-col lg:flex-row items-center bg-white h-full md:h-screen min-h-full overflow-y-auto no-scroll-btn md:overflow-hidden">
        <div class="flex flex-col items-start gap-y-6 h-2/6 lg:h-full bg-webapp justify-between w-full lg:w-2/5 px-10">
            <div class="w-full flex-row-center justify-between pt-10">
                <img src="../../../../../assets/icons/chevron-left.svg" @click="$emit('goBack')" class="block" alt="">

            </div>
            <h1 class="text-white font-medium text-2xl md:text-4xl xl:text-5xl   w-full text-left">What’s the size of the
                property?
            </h1>
            <p></p>
        </div>

        <div
            class="form-container flex flex-col items-center justify-between relative bg-white w-full lg:w-3/5 min-h-fit h-4/6 lg:h-full">

            <div class="form-fields w-full flex flex-col h-full items-center px-5 justify-center gap-y-5">
                <div class="flex flex-row items-center justify-between w-full md:w-4/6 xl:w-3/5"
                    v-if="props.data.type !== 'land'">
                    <span class="text-xl text-webapp font-medium">Bedrooms</span>
                    <div class="flex flex-row items-center gap-x-3">
                        <img src="../../../../../assets/icons/listings/minus-light.svg" v-if="data.bedrooms > 0"
                            @click="subtract('bedroom')" class="cursor-pointer" alt="">
                        <img src="../../../../assets/icons/listings/minus-light.svg" v-else class="cursor-pointer" alt="">
                        <span class="text-lg text-webapp">{{ data.bedrooms }}</span>
                        <img src="../../../../../assets/icons/listings/add.svg" @click="add('bedroom')" class="cursor-pointer" alt="">
                    </div>
                </div>
                <div class="flex flex-row items-center justify-between w-full md:w-4/6 xl:w-3/5"
                    v-if="props.data.type !== 'land'">
                    <span class="text-xl text-webapp font-medium">Bathrooms</span>
                    <div class="flex flex-row items-center gap-x-3">
                        <img src="../../../../../assets/icons/listings/minus-light.svg" v-if="data.bathrooms > 0"
                            @click="subtract('bathroom')" class="cursor-pointer" alt="">
                        <img src="../../../../../assets/icons/listings/minus-light.svg" v-else class="cursor-pointer" alt="">
                        <span class="text-lg text-webapp">{{ data.bathrooms }}</span>
                        <img src="../../../../../assets/icons/listings/add.svg" @click="add('bathroom')" class="cursor-pointer" alt="">
                    </div>
                </div>
                <div class="flex flex-row items-center justify-between w-full md:w-4/6 xl:w-3/5"
                    v-if="props.data.type === 'land'">
                    <span class="text-xl text-webapp font-medium">Number of plots</span>
                    <div class="flex flex-row items-center gap-x-3">
                        <img src="../../../../../assets/icons/listings/minus-light.svg" v-if="data.plots > 0"
                            @click="subtract('plots')" class="cursor-pointer" alt="">
                        <img src="../../../../../assets/icons/listings/minus-light.svg" v-else class="cursor-pointer" alt="">
                        <span class="text-lg text-webapp">{{ data.plots }}</span>
                        <img src="../../../../../assets/icons/listings/add.svg" @click="add('plots')" class="cursor-pointer" alt="">
                    </div>
                </div>
                <div class="flex flex-col items-start w-full gap-y-1 md:w-4/6 xl:w-3/5">
                    <label for="" class="text-lg font-medium text-webapp">Property size</label>
                    <input type="number" v-model="data.size" placeholder="Property size in sqm"
                        class="w-full h-16 rounded-lg title bg-transparent">
                </div>
            </div>

            <div class="bottom flex flex-col items-center w-full justify-between">
                <div class="w-full bg-gray-200" style="height: 2px;">
                    <div class="bg-webapp h-full w-12/12"></div>
                </div>
                <div class="flex flex-row p-6 w-full items-center justify-between static bottom-0">
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
import axios from '../../../../../composables/axios'


const props = defineProps(['data'])
const emit = defineEmits(['finish'])

const errorMsg = ref('')
const onError = ref(false)
const updating = ref(false)


const data = reactive({
    bathrooms: props.data.bathrooms,
    bedrooms: props.data.bedrooms,
    plots: props.data.plots,
    size: props.data.size,
})

const add = (type) => {
    if (type === 'bathroom') {
        data.bathrooms += 1
    } else if (type === 'plots') {
        data.plots += 1
    } else data.bedrooms += 1
}
const subtract = (type) => {
    if (type === 'bathroom') {
        data.bathrooms -= 1
    } else if (type === 'plots') {
        data.plots -= 1
    } else data.bedrooms -= 1
}

async function updateProduct() {
    try {
        updating.value = true
        let edited = false
        Object.keys(data).forEach(key => {
            if (props.data[key] && props.data[key] !== data[key]) {
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