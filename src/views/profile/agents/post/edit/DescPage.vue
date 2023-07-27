<template>
    <div v-motion :initial="{ x: -100 }" :enter="{ x: 0 }"
        class="w-screen min-w-full flex flex-col lg:flex-row items-center bg-white h-full md:h-screen min-h-full overflow-y-auto md:overflow-hidden">
        <div class="flex flex-col items-start gap-y-6 h-2/6 lg:h-full bg-webapp justify-between w-full lg:w-2/5 px-10">
            <div class="w-full flex-row-center justify-between pt-10">
                <img src="../../../../../assets/icons/chevron-left.svg" @click="$emit('goBack')" class="block" alt="">
            </div>
            <h1 class="text-white font-medium text-2xl md:text-4xl xl:text-5xl   w-full text-left">Describe the property to
                others
            </h1>
            <p></p>
        </div>

        <div
            class="form-container flex flex-col items-center justify-between relative bg-white w-full lg:w-3/5 min-h-fit h-4/6 lg:h-full">

            <div class="form-fields w-full flex flex-col h-full items-center px-5 justify-center gap-y-5">
                <div class="flex flex-col items-start w-full gap-y-1 md:w-4/6 xl:w-3/5 ">
                    <label for="" class="text-lg font-medium text-webapp">Property description</label>
                    <textarea name="" class="w-full rounded-lg pt-5 bg-transparent" id="" v-model="data.description" cols="30"
                        rows="5" placeholder="Type in something..."></textarea>
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
import axios from '../../../../../composables/axios'


const props = defineProps(['data'])
const emit = defineEmits(['finish'])

const errorMsg = ref('')
const onError = ref(false)
const updating = ref(false)


const data = reactive({
    description: props.data.description
})

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
textarea::placeholder {
    color: #B5B7CB;
    font-size: 16px;

}

textarea {
    padding-left: 10px;
    outline: none;
    border: 1px solid #D9DDEE;
}

textarea:focus {
    border: 1px solid #1B49FF;
}

input.price {
    padding-left: 10px;
    outline: none;
    border: none !important;
}

input.title:focus {
    border: 2px solid #1B49FF;
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