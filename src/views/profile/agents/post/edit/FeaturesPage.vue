<template>
    <div v-motion :initial="{ x: -100 }" :enter="{ x: 0 }"
        class="w-screen min-w-full flex flex-col lg:flex-row items-center bg-white h-full md:h-screen min-h-full overflow-y-auto md:overflow-hidden">
        <div class="flex flex-col items-start gap-y-6 h-2/6 lg:h-full bg-webapp justify-between w-full lg:w-2/5 px-10">
            <div class="w-full flex-row-center justify-between pt-10">
                <img src="../../../../../assets/icons/chevron-left.svg" @click="$emit('goBack')" class="block" alt="">
            </div>
            <h1 class="text-white font-medium text-2xl md:text-4xl xl:text-5xl  w-full text-left">Whats are the available
                features?
            </h1>
            <p></p>
        </div>

        <div
            class="form-container flex flex-col items-center justify-between bg-white w-full lg:w-3/5 min-h-fit h-4/6 lg:h-full">

            <div class="form-fields w-full flex flex-row md:basic-full basic-2/4 flex-wrap self-center h-full items-center px-5 gap-3 justify-center"
                v-if="props.data.type !== 'land'">

                <div class="flex cursor-pointer flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                    :class="{ 'border-blue-600 border-2': data.features.includes('electricity') }" @click="manage('electricity')">
                    <img src="../../../../../assets/icons/light.svg" alt="">
                    <span class="text-sm text-sub-webapp">Electricity</span>
                </div>
                <div class="flex cursor-pointer flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                    :class="{ 'border-blue-600 border-2': data.features.includes('water') }" @click="manage('water')">
                    <img src="../../../../../assets/icons/water.svg" alt="">
                    <span class="text-sm text-sub-webapp">Water</span>
                </div>
                <div class="flex cursor-pointer flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                    :class="{ 'border-blue-600 border-2': data.features.includes('parking') }" @click="manage('parking')">
                    <img src="../../../../../assets/icons/parking.svg" alt="">
                    <span class="text-sm text-sub-webapp">Parking</span>
                </div>
                <div class="flex cursor-pointer flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                    :class="{ 'border-blue-600 border-2': data.features.includes('pool') }" @click="manage('pool')">
                    <img src="../../../../../assets/icons/pool.svg" alt="">
                    <span class="text-sm text-sub-webapp">Pool</span>
                </div>

            </div>

            <!-- land features -->
            <div class="form-fields w-full flex flex-row md:basic-full basic-2/4 flex-wrap self-center h-full items-center px-5 gap-3 justify-center"
                v-else>

                <div class="flex cursor-pointer flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                    :class="{ 'border-blue-600 border-2': data.features.includes('access_road') }" @click="manage('access_road')">
                    <img src="../../../../../assets/icons/listings/road.svg" class="w-5 h-5" alt="">
                    <span class="text-sm text-sub-webapp text-center">Access road</span>
                </div>
                <div class="flex cursor-pointer flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                    :class="{ 'border-blue-600 border-2': data.features.includes('security') }" @click="manage('security')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 text-webapp">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>

                    <span class="text-sm text-sub-webapp">Security</span>
                </div>
                <div class="flex cursor-pointer flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                    :class="{ 'border-blue-600 border-2': data.features.includes('surveyed') }" @click="manage('surveyed')">
                    <img src="../../../../../assets/icons/listings/surveyed.svg" class="w-6 h-6" alt="">
                    <span class="text-sm text-sub-webapp">Surveyed</span>
                </div>
                <div class="flex cursor-pointer flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                    :class="{ 'border-blue-600 border-2': data.features.includes('c-of-o') }" @click="manage('c-of-o')">
                    <img src="../../../../../assets/icons/listings/certificate.svg" class="w-6 h-6" alt="">
                    <span class="text-sm text-sub-webapp">C of O</span>
                </div>

            </div>

            <div class="bottom flex flex-col items-center w-full justify-between static bottom-0">
                <div class="w-full bg-gray-200" style="height: 2px;">
                    <div class="bg-webapp h-full w-10/12"></div>
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
import { reactive, ref } from 'vue'
import axios from '../../../../../composables/axios'


const props = defineProps(['data'])
const emit = defineEmits(['finish'])

const errorMsg = ref('')
const onError = ref(false)
const updating = ref(false)

const data = reactive({
    features: props.data.features
})

function findCommonElement(array1, array2) {
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            if (array1[i] === array2[j]) {
                return true;
            }
        }
    }
    return false;
}

function evaluateFeaturesAndType() {
    if (props.data.type !== 'land' && findCommonElement(['r-of-o', 'c-of-o', 'surveyed', 'security'], props.data.features) === false) {
        data.features = props.data.features
    } else {
        data.features = []
    }
    if (props.data.type === 'land' && findCommonElement(['electricity', 'water', 'pool', 'parking'], props.data.features) === false) {
        data.features = props.data.features
    } else {
        data.features = []
    }
}

evaluateFeaturesAndType()

const manage = (feature) => {
    if (!data.features.includes(feature)) {
        data.features.push(feature)
    } else {
        let index = data.features.indexOf(feature)
        data.features.splice(index)
    }
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