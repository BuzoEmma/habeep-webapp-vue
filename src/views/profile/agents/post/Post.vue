<template>
  <div class="absolute w-screen h-screen flex flex-row items-center justify-center" v-if="onModal"
    style="background: rgb(22, 22, 34, 0.5)">
    <AdUploadedModal v-if="successModal" @gotoProduct="$router.push('/listings/products/' + savedProductID)" />
    <Toast :msg="errorMsg" type="danger" v-if="onError" />
  </div>
  <div class="h-screen w-screen">
    <component :is="currentComponent" @passData="getData" @goBack="back"></component>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { defineAsyncComponent } from 'vue'
import axios from "../../../../composables/axios";

import AdUploadedModal from './components/AdUploadedModal.vue';
const onModal = ref(false)
const successModal = ref(false)
const onError = ref(false)
let errorMsg = ref('')

// components

const url = '/listings/agent/create-product';


const ForPage = defineAsyncComponent(() =>
  import('./components/For.vue')
)
const HouseTypePage = defineAsyncComponent(() =>
  import('./components/HouseType.vue')
)
const Location = defineAsyncComponent(() =>
  import('./components/Location.vue')
)
const TitlePrice = defineAsyncComponent(() =>
  import('./components/Title_Price.vue')
)
const Size = defineAsyncComponent(() =>
  import('./components/Size.vue')
)
const Features = defineAsyncComponent(() =>
  import('./components/Features.vue')
)
const Desc = defineAsyncComponent(() =>
  import('./components/Desc.vue')
)
const Photos = defineAsyncComponent(() =>
  import('./components/Photos.vue')
)

let currentComponent = ref(ForPage)
let previousComponent = ref(null)

let formData = ref(null)

let savedProductID = ref('')

const data = reactive({
  for: '',
  type: '',
  status: 'AVAILABLE',
  location: '',
  price: 0,
  title: '',
  bedrooms: 0,
  bathrooms: 0,
  size: 0,
})

const back = () => {
  currentComponent.value = previousComponent.value
}


// save ad data to db
async function saveData() {
  formData.value.append('data', JSON.stringify(data))
  const adDetails = await axios.post(url, formData.value, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });


  onModal.value = true;
  if (adDetails.data.success) {
    savedProductID.value = adDetails.data._id
    successModal.value = true
  } else {
    onError.value = true;
    errorMsg.value = adDetails.data.message;
  }

  if (onError.value === true) {
    setTimeout(() => {
      onModal.value = false;
      onError.value = true;
    }, 4000);
  }
}

// get all form data
const getData = async (e) => {
  if (e.cast) {
    Object.keys(e.data).forEach(key => {
      data[key] = e.data[key]
    })
  } else if (e.type === 'images') {
    formData.value = e.data
    await saveData()
  } else data[e.type] = e.data

  if (e.type === 'for') {
    currentComponent.value = HouseTypePage
    previousComponent.value = ForPage
  }
  if (e.type === 'type') {
    currentComponent.value = Location
    previousComponent.value = HouseTypePage
  }
  if (e.type === 'location') {
    currentComponent.value = TitlePrice
    previousComponent.value = Location
  }
  if (e.type === 'title_price') {
    currentComponent.value = Size
    previousComponent.value = TitlePrice
  }
  if (e.type === 'size') {
    currentComponent.value = Features
    previousComponent.value = Size
  }
  if (e.type === 'features') {
    currentComponent.value = Desc
    previousComponent.value = Features
  }
  if (e.type === 'description') {
    currentComponent.value = Photos
    previousComponent.value = Desc
  }
}
</script>

<style>

</style>