<template>
  <div class="main flex flex-col md:h-64 fixed md:absolute z-10 overflow-hidden md:right-1/4 md:top-1/4 bg-white h-full">
    <div class="flex flex-row items-center justify-between w-full px-4 py-4 border-b border-b-gray-100">
      <span class="text-lg font-medium text-webapp">Edit profile</span>
      <img src="../../../../assets/icons/x.svg" class="cursor-pointer" @click="$emit('close')" alt="">
    </div>

    <div class="profile relative flex flex-col w-full items-center gap-y-6 px-4">
      <div class="relative flex flex-row items-center justify-center w-24 h-24 rounded-full border border-gray-200">
        <img src="../../../../assets/icons/memoji.svg" alt="">

        <img src="../../../../assets/icons/edit-icon.svg" class="-right-2 bottom-1 absolute" alt="">
      </div>
      <!-- form -->
      <!-- input fields -->
      <div class="flex flex-col items-start w-full gap-y-1">
        <label for="" class="text-sm text-webapp">Full name</label>
        <input type="text" v-model="data.fullName" placeholder="Enter your first name" class="w-full h-14 rounded-lg">
      </div>

      <div class="flex flex-col items-start w-full gap-y-1 relative">
        <label for="" class="text-sm text-webapp">Phone number</label>
        <input type="number" v-model="data.phoneNumber" maxlength="12"
          @input="validateFormField('phone', data.phoneNumber.toString())" placeholder="Phone number"
          class="w-full h-14 rounded-lg bg-transaparent"
          :class="{ 'bg-bg': onModal, 'invalidField': errorMsg.field === 'phone' }" style="padding-left: 115px">


        <div
          class="flex flex-col items-center  drop-shadow-sm bg-white rounded-b-xl rounded-t-md gap-y-2 p-1 absolute h-48 overflow-auto py-2 top-24 left-1 z-10 w-32"
          v-if="onContainer">
          <p class="w-full flex flex-row justify-center gap-x-4 border-b items-center border-gray-100"
            @click="pickCountryCode(index)" v-for="(country, index) in countriesInfo" :key="(country, index)">
            <img :src="country.flag" class="w-9 h-8" alt="">
            <span class="text-webapp text-sm font-medium">(+{{ country.callingCode }})</span>
          </p>
        </div>

        <div class="absolute top-8 left-1 flex flex-row items-center justify-center h-10 w-24 rounded-md"
          @click="openCountryCode" style="background: #F4F4F4" :class="{ 'bg-bg': onModal }">
          <p class="flex flex-row items-center w-full justify-center gap-x-3">
            <img :src="selectedCountry.flag" class="w-9 h-8" alt="">
            <span>+{{ selectedCountry.callingCode }}</span>
          </p>
        </div>

      </div>

      <div class="flex flex-col items-start w-full gap-y-1 relative">
        <label for="" class="text-sm text-webapp">Secure pin</label>
        <input type="text" value="****" disabled placeholder="Enter your first name" class="w-full h-14 rounded-lg">
        <img src="../../../../assets/icons/edit-icon-nobg.svg" @click="$emit('changePin')" class="absolute right-5 top-10 cursor-pointer" alt="">
      </div>

      <!-- components -->
      <Toast :msg="errorMsg.msg" type="danger" v-if="onError" />
      <Toast :msg="newMsg" type="success" v-if="newMsg.length > 0" />
    </div>


    <button class="bg-primary mx-4 rounded-lg grid place-items-center h-14 my-6 text-white"
      @click="$emit('enterAgents')">Continue</button>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from "vue-router";
import axios from "../../../../composables/axios";
import axiosDefault from 'axios'
import { useStore } from "vuex";

import {formValidator } from '../../../../composables/2-validator'

const route = useRoute();
const router = useRouter();

const store = useStore();

// get country codes
let onContainer = ref(false)
let countriesInfo = ref([])
let selectedCountry = ref({
  name: 'Nigeria',
  callingCode: '234',
  flag: 'https://flagcdn.com/ng.svg'
});


function openCountryCode() {
  onContainer.value = !onContainer.value
}

function pickCountryCode(index) {
  let countryInfo = countriesInfo.value[index]
  selectedCountry.value = countryInfo
  onContainer.value = false
}

async function getCountries() {
  try {
    const countries = await axiosDefault.get('https://restcountries.com/v3.1/subregion/western africa')
    // console.log(countries)
    let unformattedData = []


    for (const country of countries.data) {
      try {
        const countryMain = await axiosDefault.get('https://restcountries.com/v2/name/' + country.name.common)
        unformattedData.push({
          name: country.name.common,
          callingCode: countryMain.data[0].callingCodes[0],
          flag: countryMain.data[0].flag
        })
      } catch (error) {
        // consle.log(error)
      }


    }
    let sortedArray = unformattedData.sort((country1, country2) => {
      return Number(country2.callingCode) - Number(country1.callingCode)
    })
    countriesInfo.value = sortedArray
  } catch (error) {
    // console.log('Err occured', error)
  }
}

// manage profile editing
const url = '/auth/user/profile/edit';


const data = reactive({
  fname: '',
  surname: '',
  countryCode: '',
  nationality: '',
  phoneNumber: store.state.user.phoneNumber,
  fullName: store.state.user.fname + ' ' + store.state.user.surname
})

const onError = ref(false)
let errorMsg = ref({
  msg: '',
  field: null
})
let newMsg = ref('')
let warningMsg = ref('')
const processing = ref(false)

function validateFormField(field, data) {
  const validator = formValidator(field, data)


  if (!validator.success) {
    onError.value = true
    errorMsg.value.msg = validator.message
    errorMsg.value.field = field
  } else {
    onError.value = false
    errorMsg.value.msg = ''
    errorMsg.value.field = null
  }
}


onMounted(() => {
  getCountries()
})
</script>

<style scoped>
.main {
  width: 450px;
  height: fit-content;
  border-radius: 15px;
}

@media screen and (max-width: 767px) {
  .main {
    height: 100vh;
    width: 100vw;
  }
}

input::placeholder {
  color: #71759D;
  font-size: 14px;
}

input {
  padding-left: 10px;
  outline: none;
  border: 1px solid #D9DDEE;
}

input:focus {
  border: 1px solid #1B49FF;
}

/* formValidators */
.invalidField {
  border: 1px solid #c5120b !important;
}
</style>