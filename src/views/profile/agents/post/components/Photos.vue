<template>
    <div v-motion :initial="{ opacity: 0.2, x: -100 }" :enter="{ opacity: 1, x: 0 }" :leave="{ x: 100, opacity: 0, }"
        class="w-screen min-w-full flex flex-col lg:flex-row items-center bg-white h-full md:h-screen min-h-full overflow-y-scroll md:overflow-hidden">
        <div class="flex flex-col items-start gap-y-6 h-2/6 lg:h-full bg-webapp justify-between w-full lg:w-2/5 px-10">
            <div class="logo md:flex hidden flex-row items-center justify-start pt-10 w-full gap-x-2 cursor-pointer"
                @click="$router.push('/')">
                <img src="../../../../../assets/icons/logo-white.svg" alt="Logo">
                <span class="text-white text-2xl">Habeep</span>
            </div>
            <img src="../../../../../assets/icons/chevron-left.svg" @click="$emit('goBack')"
                class="md:hidden block pt-10" alt="">
            <h1 class="text-white font-medium text-2xl md:text-4xl xl:text-5xl   w-full text-left">Add some photos or
                videos
                to the
                listing
            </h1>
            <p></p>
        </div>

        <div
            class="form-container flex flex-col items-center justify-between relative w-full max-h-full h-4/6 lg:h-full overflow-y-auto">

            <div class="flex flex-col gap-y-5 h-full w-full items-center px-5 lg:px-20 pt-5 overflow-y-auto">
                <div class="flex flex-row items-center justify-between w-full">
                    <span class="text-webapp text-lg md:text-xl font-medium">Add at most 5 photos or videos(Max size is
                        30mb)</span>

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
                            <input type="file" ref="inputRef" :multiple="allCompleted === false"
                                accept="video/mp4,image/*" :class="{ 'hidden': allCompleted }" v-if="!processing"
                                @change="previewImg($event.target, currentBlock)">
                        </button>
                    </form>


                </div>

                <div class="flex flex-col items-center photos-preview w-full h-full overflow-y-auto mb-2">
                    <div class="flex flex-row items-center w-full flex-wrap h-fit pb-2">
                        <div class="basis-full md:basis-2/3 photo-cover p-2 h-full" @click="callImgProcessor(1)"
                            v-if="imageData1">
                            <div class="flex flex-col items-center justify-center dashed h-full w-full">
                                <img :src="imageData1" class="h-full w-full rounded-lg feed-image"
                                    v-if="pic1.type !== 'video/mp4'" alt="">
                                <video playsinline :src="imageData1" class="h-full w-full rounded-lg feed-image" v-else
                                    height="100%" width="100%" autoplay muted></video>
                            </div>
                        </div>
                        <div class="gap-x-2 basis-full p-2 md:basis-2/3 h-full photo-cover" @click="callImgProcessor(1)"
                            v-else>
                            <div class="flex flex-col items-start dashed px-2 h-full">
                                <span class="text-lg text-webapp">Cover photo</span>
                                <div class="flex flex-row items-center w-full h-5/6 justify-center">
                                    <img src="../../../../../assets/icons/listings/img.svg" alt="">
                                </div>
                            </div>
                        </div>

                        <div class="basis-1/2 md:basis-1/3 photo p-2 h-full" @click="callImgProcessor(2)"
                            v-if="imageData2">
                            <div class="flex flex-col items-center justify-center dashed h-full w-full">
                                <img :src="imageData2" class="h-full w-full rounded-lg feed-image"
                                    v-if="pic2.type !== 'video/mp4'" alt="">
                                <video playsinline :src="imageData2" class="h-full w-full rounded-lg feed-image" v-else
                                    height="100%" width="100%" autoplay muted></video>
                            </div>
                        </div>
                        <div v-else class="basis-1/2 md:basis-1/3 photo p-2 h-full" @click="callImgProcessor(2)">
                            <div class="flex flex-row items-center justify-center h-full w-full dashed">
                                <img src="../../../../../assets/icons/listings/img.svg" alt="">
                            </div>
                        </div>

                        <div class="basis-1/2 md:basis-1/3 photo p-2 h-full" @click="callImgProcessor(3)"
                            v-if="imageData3">
                            <div class="flex flex-col items-center justify-center dashed h-full w-full">
                                <img :src="imageData3" class="h-full w-full rounded-lg feed-image"
                                    v-if="pic3.type !== 'video/mp4'" alt="">
                                <video playsinline :src="imageData3" class="h-full w-full rounded-lg feed-image" v-else
                                    height="100%" width="100%" autoplay muted></video>
                            </div>
                        </div>
                        <div v-else class="basis-1/2 md:basis-1/3 photo p-2 h-full" @click="callImgProcessor(3)">
                            <div class="flex flex-row items-center justify-center h-full w-full dashed">
                                <img src="../../../../../assets/icons/listings/img.svg" alt="">
                            </div>
                        </div>

                        <div class="basis-1/2 md:basis-1/3 photo p-2 h-full" @click="callImgProcessor(4)"
                            v-if="imageData4">
                            <div class="flex flex-col items-center justify-center dashed h-full w-full">
                                <img :src="imageData4" class="h-full w-full rounded-lg feed-image"
                                    v-if="pic4.type !== 'video/mp4'" alt="">
                                <video playsinline :src="imageData4" class="h-full w-full rounded-lg feed-image" v-else
                                    height="100%" width="100%" autoplay muted></video>
                            </div>
                        </div>
                        <div v-else class="basis-1/2 md:basis-1/3 photo p-2 h-full" @click="callImgProcessor(4)">
                            <div class="flex flex-row items-center justify-center h-full w-full dashed">
                                <img src="../../../../../assets/icons/listings/img.svg" alt="">
                            </div>
                        </div>

                        <div class="basis-1/2 md:basis-1/3 photo p-2 h-full" @click="callImgProcessor(5)"
                            v-if="imageData5">
                            <div class="flex flex-col items-center justify-center dashed h-full w-full">
                                <img :src="imageData5" class="h-full w-full rounded-lg feed-image"
                                    v-if="pic5.type !== 'video/mp4'" alt="">
                                <video playsinline :src="imageData5" class="h-full w-full rounded-lg feed-image" v-else
                                    height="100%" width="100%" autoplay muted></video>
                            </div>
                        </div>
                        <div v-else class="basis-1/2 md:basis-1/3 photo p-2 h-full" @click="callImgProcessor(5)">
                            <div class="flex flex-row items-center justify-center h-full w-full dashed">
                                <img src="../../../../../assets/icons/listings/img.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="bottom flex flex-col items-center w-full justify-between static bottom-0">
                <div class="w-full bg-gray-200" style="height: 2px;">
                    <div class="bg-webapp h-full w-12/12"></div>
                </div>
                <div class="flex flex-row p-6 w-full items-center justify-between">
                    <span :class="{ 'collapse': processing }"
                        class="text-xl font-medium text-webapp underline cursor-pointer"
                        @click="$emit('goBack', { to: 'Desc', from: 'Photos' })">Back</span>
                    <button @click="sendData()"
                        :class="{ 'bg-slate-400 text-white': allCompleted === false || totalFilesSize > 30 }"
                        class="h-10 rounded-lg w-fit px-2 bg-primary text-white text-sm flex flex-row justify-center items-center font-extralight gap-x-2"
                        style="min-width: 96px" :disabled="allCompleted === false || totalFilesSize > 30">
                        <span v-if="!processing">Post AD</span>
                        <span v-if="processing && uploadingWord" v-motion :initial="{ opacity: 0.2, scale: 0.5 }"
                            :enter="{ opacity: 1, scale: 1 }" class="text-white">{{ uploadingWord }}</span>
                        <Preloader v-if="processing" class="scale-75" />
                    </button>
                </div>
            </div>
        </div>

        <Toast :msg="errorMsg" type="danger" v-if="onError" />
    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import axios from '../../../../../composables/axios'

const store = useStore()
const processing = ref(false)

const onError = ref(false)
let errorMsg = ref('')

const emit = defineEmits(['passData', 'postSuccess'])
const props = defineProps(['data'])

const finalData = reactive(props.data)

const data = reactive({
    type: 'images',
    data: '',
})

const uploadingWord = ref('Loading')

const formData = new FormData();

const inputRef = ref(null)

const currentImage = ref(0)
const currentBlock = ref(1)

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

const uploadingVocabulary = ['Loading', 'Uploading assets', 'Optimizing Assets', 'Formatting Product']

function callImgProcessor(value) {
    currentBlock.value = value
    inputRef.value.click()
}

const totalFilesSize = ref(0)

function calculateFiles() {
    totalFilesSize.value = 0
    if (pic1.value) {
        totalFilesSize.value += pic1.value.size / (1024 ** 2)
    }
    if (pic2.value) {
        totalFilesSize.value += pic2.value.size / (1024 ** 2)
    }
    if (pic3.value) {
        totalFilesSize.value += pic3.value.size / (1024 ** 2)
    }
    if (pic4.value) {
        totalFilesSize.value += pic4.value.size / (1024 ** 2)
    }
    if (pic5.value) {
        totalFilesSize.value += pic5.value.size / (1024 ** 2)
    }
    console.log(totalFilesSize.value)
}

const previewImg = async (event, value) => {
    currentBlock.value += 1
    // Reference to the DOM input element
    var input = event;

    // Ensure that you have a file before attempting to read it
    if (input.files && input.files.length === 1) {
        currentImage.value = value
        if (input.files[0].size / (1024 ** 2) > 30) {
            onError.value = true;
            errorMsg.value = 'File size is more than 30MB';
            setTimeout(() => {
                onError.value = false;
            }, 2000);
            return false;
        }
        switch (currentImage.value) {
            case 1:
                pic1.value = input.files[0]
                break;
            case 2:
                pic2.value = input.files[0]
                break;
            case 3:
                pic3.value = input.files[0]
                break;
            case 4:
                pic4.value = input.files[0]
                break;
            case 5:
                pic5.value = input.files[0]
                break;

            default:
                break;
        }
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        reader.onload = (e) => {
            eval(`imageData${currentImage.value}`).value = e.target.result;
        }

        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);

        calculateFiles()
        if (totalFilesSize.value > 30) {
            onError.value = true;
            errorMsg.value = 'Files size is more than 30MB';
            setTimeout(() => {
                onError.value = false;
            }, 5000);
            return false;
        }
    } else if (input.files && input.files.length > 1) {
        // read multiple files
        for (let i = currentImage.value; i < input.files.length && i < 5; i++) {
            if (input.files[i].size / (1024 ** 2) > 30) {
                onError.value = true;
                errorMsg.value = 'File size is more than 30MB';
                setTimeout(() => {
                    onError.value = false;
                }, 2000);
                return false;
            }

            eval(`pic${i + 1}`).value = input.files[i]

            var reader = new FileReader();
            reader.readAsDataURL(input.files[i])
            reader.onload = (e) => {
                eval(`imageData${i + 1}`).value = e.target.result;
            }

            calculateFiles()
            if (totalFilesSize.value > 30) {
                onError.value = true;
                errorMsg.value = 'Files size is more than 30MB';
                setTimeout(() => {
                    onError.value = false;
                }, 5000);
                return false;
            }

            if (currentImage.value !== 5) {
                currentImage.value += 1
            }
        }
    }


    noPicture.value = false
}

const url = '/listings/agent/create-product';

async function saveData() {
    let interval = null
    try {
        processing.value = true
        formData.append('data', JSON.stringify(finalData))

        interval = setInterval(() => {
            if (uploadingWord.value !== 'Formatting Product') {
                uploadingWord.value = uploadingVocabulary[uploadingVocabulary.indexOf(uploadingWord.value) + 1]
            } else clearInterval(interval)
        }, 5000);

        const adDetails = await axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });


        if (adDetails.data.success) {
            store.commit('deleteListingData')
            uploadingWord.value = 'Uploaded'
            emit('postSuccess', adDetails.data.data._id)
            if (interval !== null) {
                clearInterval(interval)
            }
            setTimeout(() => {
                uploadingWord.value = ''
                processing.value = false
            }, 2000);
        } else {
            onError.value = true;
            errorMsg.value = adDetails.data.message;
            if (interval !== null) {
                clearInterval(interval)
            }
            uploadingWord.value = 'Failed'
            setTimeout(() => {
                uploadingWord.value = ''
                processing.value = false
            }, 2000);
        }

        if (onError.value === true) {
            setTimeout(() => {
                onModal.value = false;
                onError.value = true;
            }, 4000);
        }
    } catch (error) {
        if (interval !== null) {
            clearInterval(interval)
        }

        uploadingWord.value = 'Failed'
        setTimeout(() => {
            uploadingWord.value = ''
            processing.value = false
        }, 2000);

        onError.value = true;
        if (error.response) {
            errorMsg.value = error.response.data.message
        } else {
            errorMsg.value = error.message
        }

        if (onError.value === true) {
            setTimeout(() => {
                onError.value = false;
            }, 4000);
        }
    }
}

const sendData = async () => {
    for (let i = 1; i < 6; i++) {
        let img = eval(`pic${i}`).value
        formData.append('photo' + i, img)
    }

    saveData()
    data.data = formData


}

function allImagesComplete() {
    if (imageData1.value.length < 1) {
        return false
    }
    if (imageData2.value.length < 1) {
        return false
    }
    if (imageData3.value.length < 1) {
        return false
    }
    if (imageData4.value.length < 1) {
        return false
    }
    if (imageData5.value.length < 1) {
        return false
    }
    return true
}

let allCompleted = computed(() => {
    return allImagesComplete()
})

</script>

<style scoped>
.photo {
    max-height: 300px !important;
    height: 300px !important;
    border-radius: 10px;
}

.photo-cover {
    max-height: 300px !important;
    height: 300px !important;
    border-radius: 10px;
}

.dashed {
    border: 1px dashed #0A1045;
    border-radius: 10px;
}


.upload-btn {
    position: relative;
    overflow: hidden;
    padding: 5px !important;
    border: 1px solid #0A1045;
}

.photos-preview::-webkit-scrollbar {
    width: 6px;
}

.photos-preview::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: #71759D;
    border-radius: 10px;
}

.photos-preview::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
}

.upload-btn input[type="file"] {
    cursor: pointer;
    position: absolute;
    left: 0%;
    top: 0%;
    transform: scale(3);
    opacity: 0;
}


.feed-image {
    width: 100% !important;
    object-fit: cover !important;
    object-position: center;
}

@media screen and (max-width : 425px) {
    .photo {
        max-height: 130px !important;
        height: 130px !important;
    }

    .photo-cover {
        max-height: 220px !important;
        height: 220px !important;
    }
}
</style>