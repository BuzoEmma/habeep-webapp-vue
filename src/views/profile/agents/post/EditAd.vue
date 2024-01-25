<template>
    <div class="h-screen max-w-screen w-screen overflow-hidden" v-motion :initial="{ x: -100 }" :enter="{ x: 0 }"
        v-if="!processingProduct && product">

        <div class="w-full h-2/5 md:h-3/5 border-b-2 border-webapp" v-motion-slide-top v-if="!currentComponent">
            <swiper :style="{ '--swiper-navigation-color': '#0A1045', }" :navigation="true" :effect="'creative'"
                :zoom="true" :modules="modules">
                <swiper-slide v-for="image of data.images" :key="image">
                    <img v-if="image && image.link.includes('mp4') == false" :src="image.link"
                        class="w-full h-full object-cover md:object-contain object-center">
                    <video v-else :src="image.link" preload="metadata"
                        class="w-full h-full object-cover md:object-contain object-center" autoplay controls></video>
                </swiper-slide>
            </swiper>
        </div>

        <div class="w-full py-10 h-3/5 md:h-2/5 px-4 overflow-y-auto no-scroll-btn flex-col-center justify-start gap-y-4"
            v-motion-slide-bottom v-if="!currentComponent">
            <div class="w-full md:w-1/2 xl:w-1/3" v-for="key of Object.keys(data)" :key="key" @click="editKey(key)">
                <div class="border-2 border-color-webapp cursor-pointer rounded-2xl p-4 flex-row-center justify-between">
                    <span class="text-sm font-black text-webapp uppercase">{{ key }}:</span>
                    <span class="text-sm font-black text-webapp uppercase"
                        v-if="key !== 'price' && key !== 'size' && key !== 'description' && key !== 'images' && key !== 'features' && key !== 'location'">{{
                            data[key] }}</span>
                    <span class="text-sm font-black text-webapp" v-if="key === 'description'">{{
                        data[key].toString().substring(0, 20) }}...</span>

                    <span class="text-sm font-black text-webapp" v-if="key === 'images' || key === 'features'">{{
                        data[key].length }}</span>
                    <span class="text-sm font-black text-webapp" v-if="key === 'location'">{{
                        data[key].address }}</span>
                    <span class="text-sm font-black text-webapp uppercase" v-if="key === 'size'">{{
                        number_formatter(Number(data[key])) }}</span>
                    <span class="text-sm font-black text-webapp uppercase" v-if="key === 'price'">
                        <PriceFormatter :from="product.priceCurrency || 'NGN'" :to="product.priceCurrency || 'NGN'"
                            :amount="data[key]" />
                    </span>
                </div>
            </div>

            <button class="bg-primary w-full md:w-1/2 xl:w-1/3 rounded-lg grid place-items-center h-14 text-white"
                style="min-height: 48px;" @click="$router.replace('/agent/ads')">
                <span>Save</span>
            </button>
        </div>

        <component :is="currentComponent" v-if="currentComponent" @finish="updateData" :data="product" @goBack="back">
        </component>
    </div>
    <div class="h-screen w-screen div-center-col" v-else>
        <loader :letters="['H', 'A', 'B', 'E', 'E', 'P']" size="200px" color="#0A1045"></loader>
    </div>
</template>
  
<script setup>
import { useStore } from "vuex";
import { ref, onMounted, reactive } from 'vue'
import axios from "../../../../composables/axios";
import { useRoute, useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Zoom } from 'swiper/modules';
import number_formatter from 'number_formatter';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import 'swiper/css/effect-creative';

const modules = ref([Navigation, Zoom])

const processingProduct = ref(false)
const route = useRoute()

const url = '/listings/ads/get/';

import HouseType from './edit/HouseType.vue'
import LocationPage from './edit/LocationPage.vue'
import TitleP from './edit/Title_Price.vue'
import PhotosPage from './edit/PhotosPage.vue'
import ForP from './edit/ForPage.vue'
import SizePage from './edit/SizePage.vue'
import FeaturesPage from './edit/FeaturesPage.vue'
import DescPage from './edit/DescPage.vue'

const ForPage = ForP
const HouseTypePage = HouseType
const Location = LocationPage

const TitlePrice = TitleP
const Size = SizePage
const Features = FeaturesPage
const Desc = DescPage
const Photos = PhotosPage

let currentComponent = ref(null)

let data = reactive({
    for: '',
    type: '',
    status: 'AVAILABLE',
    location: {},
    price: 0,
    title: '',
    size: 0,
    description: '',
    features: [],
    images: []
})

const product = ref({})

function back() {
    currentComponent.value = null
}
const getProduct = async () => {
    try {
        processingProduct.value = true
        const getProduct = await axios.get(url + route.params.id)
        processingProduct.value = false

        product.value = getProduct.data.product
        data.for = product.value.for
        data.type = product.value.type
        data.status = product.value.status
        data.location = product.value.location
        data.price = product.value.price
        data.title = product.value.title
        data.size = product.value.size
        data.images = product.value.images
        data.description = product.value.description
        data.features = product.value.features
    } catch (error) {
        processingProduct.value = false
    }
}

function updateData(newData) {
    if (newData) {
        Object.keys(newData).forEach(key => {
            if (data[key] && product.value[key]) {
                data[key] = newData[key]
                product.value[key] = newData[key]
            }
        })
    }
    currentComponent.value = null
}

function editKey(key) {
    switch (key) {
        case 'price':
            currentComponent.value = TitlePrice
            break;
        case 'title':
            currentComponent.value = TitlePrice
            break;
        case 'type':
            currentComponent.value = HouseTypePage
            break;
        case 'for':
            currentComponent.value = ForPage
            break;
        case 'location':
            currentComponent.value = Location
            break;
        case 'size':
            currentComponent.value = Size
            break;
        case 'images':
            currentComponent.value = Photos
            break;
        case 'features':
            currentComponent.value = Features
            break;
        case 'description':
            currentComponent.value = Desc
            break;

        default:
            break;
    }
}

onMounted(() => {
    getProduct()
})

</script>
  
<style>
.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>