<template>

    <div
        class="w-screen min-w-full flex flex-col lg:flex-row items-center bg-white h-full md:h-screen min-h-full overflow-y-auto md:overflow-hidden">
        <div class="flex flex-col items-start gap-y-6 h-2/6 lg:h-full bg-webapp justify-between w-full lg:w-2/5 px-10">
            <div class="logo md:flex hidden flex-row items-center justify-start pt-10 w-full gap-x-2 cursor-pointer"
                @click="$router.push('/')">
                <img src="../../../../../assets/icons/logo-white.svg" alt="Logo">
                <span class="text-white text-2xl">Habeep</span>
            </div>
            <img src="../../../../../assets/icons/chevron-left.svg" class="md:hidden block pt-10" alt="">
            <h1 class="text-white font-medium text-2xl md:text-5xl   w-full text-left">Add some photos to the listing
            </h1>
            <p></p>
        </div>

        <div
            class="form-container flex flex-col items-center justify-between relative w-full max-h-full h-4/6 lg:h-full overflow-y-auto">

            <div class="flex flex-col gap-y-5 h-full w-full items-center px-5 lg:px-20 pt-5">
                <div class="flex flex-row items-center justify-between w-full">
                    <span class="text-webapp text-lg md:text-xl font-medium">Add at most 5 photos</span>

                    <!-- upload images -->
                    <form enctype="multipart/form-data" class="upload flex flex-row items-center w-fit no-wrap gap-x-3"
                        :class="{ 'hidden': imageData5.length > 0 }">
                        <button type="button"
                            class="upload-btn w-30 h-8 rounded-lg p-2 flex flex-row items-center justify-center font-medium gap-x-1 text-webapp">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="w-5 h-5">
                                <path fill-rule="evenodd"
                                    d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span>Upload</span>
                            <input type="file" accept="image/png" name="pic" v-if="!imageData5" @change="previewImg">
                        </button>
                    </form>


                </div>

                <div class="flex flex-col items-center photos-preview w-full h-full gap-4">
                    <div class="flex flex-row items-center gap-x-3 w-full h-2/5">
                        <img :src="imageData1" v-if="imageData1" class="w-full lg:w-4/6 photo border h-full" alt="">
                        <div class="flex flex-col items-start p-2 md:p-4 gap-x-2 w-full lg:w-4/6 photo border h-full"
                            v-else>
                            <span class="text-lg text-webapp">Cover photo</span>
                            <div class="flex flex-row items-center w-full h-5/6 justify-center">
                                <img src="../../../../../assets/icons/listings/img.svg" alt="">
                            </div>
                        </div>
                        <img :src="imageData2" v-if="imageData2" class="w-2/6 photo border h-full" alt="">
                        <div class="flex flex-row items-center justify-center w-2/6 photo border h-full" v-else>
                            <img src="../../../../../assets/icons/listings/img.svg" alt="">
                        </div>
                    </div>
                    <div class="flex flex-row items-center gap-x-3 w-full h-2/5">
                        <img :src="imageData3" v-if="imageData3" class="w-2/6 photo border h-full" alt="">
                        <div class="flex flex-row items-center justify-center w-2/6 photo border h-full" v-else>
                            <img src="../../../../../assets/icons/listings/img.svg" alt="">
                        </div>
                        <img :src="imageData4" v-if="imageData4" class="w-2/6 photo border h-full" alt="">
                        <div class="flex flex-row items-center justify-center w-2/6 photo border h-full" v-else>
                            <img src="../../../../../assets/icons/listings/img.svg" alt="">
                        </div>
                        <img :src="imageData5" v-if="imageData5" class="w-2/6 photo border h-full" alt="">
                        <div class="flex flex-row items-center justify-center w-2/6 photo border h-full" v-else>
                            <img src="../../../../../assets/icons/listings/img.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>


            <div class="bottom flex flex-col items-center w-full justify-between">
                <div class="w-full bg-gray-200" style="height: 2px;">
                    <div class="bg-webapp h-full w-12/12"></div>
                </div>
                <div class="flex flex-row p-6 w-full items-center justify-between">
                    <span class="text-xl font-medium text-webapp underline cursor-pointer"
                        @click="$emit('goBack')">Back</span>
                    <button @click="sendData()" :class="{ 'bg-slate-400 text-white': imageData5.length < 1 }"
                        class="h-10 w-24 rounded-lg bg-primary text-white text-sm text-medium"
                        :disabled="imageData5.length < 1">
                        <span v-if="!processing">Post AD</span>
                        <Preloader v-else />
                    </button>
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
const processing = ref(false)

const emit = defineEmits(['passData'])


const data = reactive({
    type: 'images',
    data: '',
})

const currentImage = ref(0)

const pic1 = ref(null)
const imageData1 = ref('')
const pic2 = ref(null)
const imageData2 = ref('')
const pic3 = ref(null)
const imageData3 = ref('')
const pic4 = ref(null)
const imageData4 = ref('')
const pic5 = ref(null)
const imageData5 = ref('')

const noPicture = ref(true)

const previewImg = async (event) => {
    currentImage.value += 1
    // Reference to the DOM input element
    var input = event.target;
    // Ensure that you have a file before attempting to read it
    if (input.files && input.files[0]) {
        eval(`pic${currentImage.value}`).value = input
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
            // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
            // Read image as base64 and set to imageData
            eval(`imageData${currentImage.value}`).value = e.target.result;
            console.log(eval(`pic${currentImage.value}`).value)
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
        
    }
    noPicture.value = false
}

const sendData = async () => {
    const formData = new FormData();
    
    for(let i = 1; i < currentImage.value + 1; i++) {
        console.log(i, currentImage.value)
        console.log(await eval(`pic${i}`).value)
        let img = await eval(`pic${i}`).value.files[0]
        formData.append(`photo${i}`, img)
    }
    // console.log(formData)
    data.data = formData

    emit('passData', data)
    processing.value = true

    setTimeout(() => {
        processing.value = false
    }, 10000);
}

</script>

<style scoped>
.photo {
    max-height: 300px !important;
    border: 1px dashed #0A1045;
    border-radius: 10px;
}


.upload-btn {
    position: relative;
    overflow: hidden;
    border: 1px solid #0A1045;
}

.upload-btn input[type="file"] {
    cursor: pointer;
    position: absolute;
    left: 0%;
    top: 0%;
    transform: scale(3);
    opacity: 0;
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