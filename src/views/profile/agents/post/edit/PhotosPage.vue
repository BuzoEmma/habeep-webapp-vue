<template>
    <div v-motion :initial="{ x: -100 }" :enter="{ x: 0 }"
        class="w-screen min-w-full flex flex-col lg:flex-row items-center bg-white h-full md:h-screen min-h-full overflow-y-scroll no-scroll-btn md:overflow-hidden">
        <div class="flex flex-col items-start gap-y-6 h-2/6 lg:h-full bg-webapp justify-between w-full lg:w-2/5 px-10">
            <div class="w-full flex-row-center justify-between pt-10">
                <img src="../../../../../assets/icons/chevron-left.svg" @click="$emit('goBack')" class="block" alt="">
            </div>
            <h1 class="text-white font-medium text-2xl md:text-4xl xl:text-5xl   w-full text-left">Add some photos or videos
                to the
                listing
            </h1>
            <p></p>
        </div>

        <div
            class="form-container flex flex-col items-center justify-between relative w-full max-h-full h-4/6 lg:h-full overflow-y-auto">

            <div class="flex flex-col gap-y-5 h-full w-full items-center px-5 lg:px-20 pt-5 overflow-y-auto">
                <div class="flex flex-row items-center justify-between w-full">
                    <span class="text-webapp text-lg md:text-xl font-medium">Edit photos or videos(Max size is
                        30mb)</span>

                    <!-- upload images -->
                    <form enctype="multipart/form-data" class="hidden flex-row items-center w-fit no-wrap gap-x-3">
                        <input type="file" ref="inputRef" multiple="false" accept="video/mp4,image/*" class="hidden"
                            v-if="!uploading" @change="previewImg($event.target, currentBlock)">
                    </form>


                </div>

                <div class="flex flex-col items-center photos-preview w-full h-full overflow-y-auto mb-2">
                    <div class="flex flex-row items-center w-full flex-wrap h-fit pb-2">
                        <div class="basis-full md:basis-2/3 photo-cover p-2 h-full" @click="callImgProcessor(0)">
                            <div class="flex flex-col items-center justify-center dashed h-full w-full">
                                <img :src="data.images[0].link" class="h-full w-full rounded-lg feed-image"
                                    v-if="data.images[0].link.includes('mp4') !== true" alt="">
                                <video :src="data.images[0].link" class="h-full w-full rounded-lg feed-image" v-else
                                    height="100%" width="100%" autoplay muted></video>
                            </div>
                        </div>

                        <div class="basis-1/2 md:basis-1/3 photo p-2 h-full" @click="callImgProcessor(1)">
                            <div class="flex flex-col items-center justify-center dashed h-full w-full">
                                <img :src="data.images[1].link" class="h-full w-full rounded-lg feed-image"
                                    v-if="data.images[1].link.includes('mp4') !== true" alt="">
                                <video :src="data.images[1].link" class="h-full w-full rounded-lg feed-image" v-else
                                    height="100%" width="100%" autoplay muted></video>
                            </div>
                        </div>

                        <div class="basis-1/2 md:basis-1/3 photo p-2 h-full" @click="callImgProcessor(2)">
                            <div class="flex flex-col items-center justify-center dashed h-full w-full">
                                <img :src="data.images[2].link" class="h-full w-full rounded-lg feed-image"
                                    v-if="data.images[2].link.includes('mp4') !== true" alt="">
                                <video :src="data.images[2].link" class="h-full w-full rounded-lg feed-image" v-else
                                    height="100%" width="100%" autoplay muted></video>
                            </div>
                        </div>

                        <div class="basis-1/2 md:basis-1/3 photo p-2 h-full" @click="callImgProcessor(3)">
                            <div class="flex flex-col items-center justify-center dashed h-full w-full">
                                <img :src="data.images[3].link" class="h-full w-full rounded-lg feed-image"
                                    v-if="data.images[3].link.includes('mp4') !== true" alt="">
                                <video :src="data.images[3].link" class="h-full w-full rounded-lg feed-image" v-else
                                    height="100%" width="100%" autoplay muted></video>
                            </div>
                        </div>

                        <div class="basis-1/2 md:basis-1/3 photo p-2 h-full" @click="callImgProcessor(4)">
                            <img :src="data.images[4].link" class="h-full w-full rounded-lg feed-image"
                                v-if="data.images[4].link.includes('mp4') !== true" alt="">
                            <video :src="data.images[4].link" class="h-full w-full rounded-lg feed-image" v-else
                                height="100%" width="100%" autoplay muted></video>
                        </div>
                    </div>
                </div>
            </div>


            <div class="bottom flex flex-col items-center w-full justify-between static">
                <div class="w-full bg-gray-200" style="height: 2px;">
                    <div class="bg-webapp h-full w-12/12"></div>
                </div>
                <div class="flex flex-row p-4 pb-6 w-full items-center justify-between">
                    <span class="text-xl font-medium text-webapp underline cursor-pointer"
                        @click="$emit('goBack')">Back</span>
                    <button @click="updateProduct" :disabled="uploading || updating"
                        class="h-10 w-24 rounded-lg bg-blue-700 text-white text-sm text-medium">
                        <Preloader v-if="updating || uploading" class="scale-75" />
                        <span v-else>Next</span>
                    </button>
                </div>
            </div>
        </div>

        <Toast :msg="errorMsg" type="danger" v-if="onError" />
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import axios from '../../../../../composables/axios'

const props = defineProps(['data'])
const emit = defineEmits(['finish'])

const errorMsg = ref('')
const onError = ref(false)
const updating = ref(false)
const uploading = ref(false)

const data = reactive({
    images: props.data.images
})

const inputRef = ref(null)

const pic = ref(null)

const currentBlock = ref(0)

function callImgProcessor(value) {
    currentBlock.value = value
    inputRef.value.click()
}

const previewImg = async (event, value) => {
    var input = event;
    if (input.files && input.files.length === 1) {
        if (input.files[0].size / (1024 ** 2) > 30) {
            onError.value = true;
            errorMsg.value = 'File size is more than 30MB';
            setTimeout(() => {
                onError.value = false;
            }, 2000);
            return false;
        }

        pic.value = input.files[0]
        const reader = new FileReader();

        reader.onload = async (e) => {
            data.images[value] = {
                index: value,
                link: e.target.result
            };

            uploading.value = true
            const saveImage = await savePhoto()
            if (saveImage) {
                pic.value = null
                data.images[value] = saveImage
            } else {
                pic.value = null
                data.images[value] = props.data.images[value]
            }

            uploading.value = false
        }
        reader.readAsDataURL(input.files[0]);

    }
}

async function savePhoto() {
    try {
        const formData = new FormData();
        formData.append('photo1', pic.value)
        const body = {
            description: 'listings'
        }
        formData.append('data', JSON.stringify(body))

        const saveImage = await axios.post('/utility/save-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        return saveImage.data.data[0]
    } catch (error) {
        return false
    }
}

async function updateProduct() {
    try {
        updating.value = true
        let edited = false
        const allPreviousImages = ref([])
        const allNewImages = ref([])

        props.data.images.forEach(image => {
            allPreviousImages.value.push(image.link)
        })
        data.images.forEach(image => {
            allNewImages.value.push(image.link)
        })

        if(allNewImages.value !== allPreviousImages.value) {
            edited = true
        }

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

.media {
    object-fit: cover;
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
    width: 3px;
    background-color: #0A1045;
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