<template>
    <div
        class="w-screen min-w-full flex flex-col lg:flex-row items-center bg-white h-full md:h-screen min-h-full overflow-y-auto md:overflow-hidden">
        <div class="flex flex-col items-start gap-y-6 h-2/6 lg:h-full bg-webapp justify-between w-full lg:w-2/5 px-10">
            <div class="logo md:flex hidden flex-row items-center justify-start pt-10 w-full gap-x-2 cursor-pointer"
                @click="$router.push('/')">
                <img src="../../../../../assets/icons/logo-white.svg" alt="Logo">
                <span class="text-white text-2xl">Habeep</span>
            </div>
            <img src="../../../../../assets/icons/chevron-left.svg" @click="$emit('goBack')" class="md:hidden block pt-10" alt="">
            <h1 class="text-white font-medium text-2xl md:text-5xl   w-full text-left">What’s the property title and
                price?
            </h1>
            <p></p>
        </div>

        <div
            class="form-container flex flex-col items-center justify-between relative bg-white w-full lg:w-3/5 min-h-fit h-4/6 lg:h-full">

            <div class="form-fields w-full flex flex-col h-full items-center px-5 justify-center gap-y-4">
                <div class="flex flex-col items-start w-full gap-y-1 md:w-4/6 xl:w-3/5">
                    <label for="" class="text-lg font-medium text-webapp">Property title</label>
                    <input type="text" v-model="data.data.title" placeholder="Type a title for this listing"
                        class="w-full h-16 rounded-lg title">
                </div>
                <div class="flex flex-col items-start w-full gap-y-1 md:w-4/6 xl:w-3/5">
                    <label for="" class="text-lg font-medium text-webapp">Price in Naira</label>
                    <div class="flex flex-row gap-x-2 items-center w-full border border-gray-200 rounded-lg h-16 p-3">
                        <img src="../../../../../assets/icons/listings/naira.svg" alt="">
                        <input type="number" v-model="data.data.price" placeholder="Type a title for this listing"
                            class="w-full h-full rounded-lg price">
                    </div>
                </div>
            </div>

            <div class="bottom flex flex-col items-center w-full justify-between">
                <div class="w-full bg-gray-200" style="height: 2px;">
                    <div class="bg-webapp h-full w-7/12"></div>
                </div>
                <div class="flex flex-row p-6 w-full items-center justify-between">
                    <span class="text-xl font-medium text-webapp underline cursor-pointer"
                    @click="$emit('goBack')">Back</span>
                    <button @click="$emit('passData', data)" :disabled="data.data.price.length < 1 && data.data.title.length < 1"
                        :class="{ 'bg-slate-400 text-white': data.data.price.length < 1 || data.data.title.length < 1 }"
                        class="h-10 w-24 rounded-lg bg-primary text-white text-sm text-medium">Next</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainNavbarVue from "../../../../../components/MainNavbar.vue";
import axiosDefault from 'axios'

const store = useStore()


const data = reactive({
    type: 'title_price',
    cast: true,
    data: {
        price: '',
        title: ''
    }
})

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
  border: none  !important;
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