<template>
  <div class="main flex flex-col md:h-64 z-10 overflow-y-hidden no-scroll-btn  bg-white h-full relative">
    <div class="flex flex-row items-center justify-between w-full px-4 py-4 border-b border-b-gray-100">
      <span class="text-lg font-medium text-webapp">Edit profile</span>
      <img src="../../../../assets/icons/x.svg" class="cursor-pointer" @click="$emit('close')" alt="">
    </div>

    <div class="profile relative flex flex-col w-full items-center gap-y-6 px-4 h-full">
      <div class="relative flex flex-row items-center justify-center w-24 h-24 rounded-full border border-gray-200">
        <img :src="imageData" class="w-24 h-24 min-h-full min-w-full  object-cover rounded-full cursor-pointer"
          v-if="imageData !== 'https://i.ibb.co/gtpxMJz/21.png'" alt="">
        <Avatar size="100%" v-else :fname="$store.state.user.fname" :lname="$store.state.user.surname" />

        <!-- upload images -->
        <form enctype="multipart/form-data" class="hidden">
          <input type="file" ref="inputRef" accept="image/*" @change="previewImg($event.target, currentBlock)">
        </form>

        <img src="../../../../assets/icons/edit-icon.svg" @click="callImgProcessor"
          class="-right-2 bottom-1 absolute cursor-pointer" alt="">
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


        <div :class="{ 'justify-center': loadingLocationInfo }"
          class="flex flex-col items-center  drop-shadow-sm bg-white rounded-b-xl rounded-t-md gap-y-2 p-1 absolute h-48 overflow-auto py-2 top-24 left-1 z-10 w-32 min-w-fit"
          v-if="onContainer">
          <Preloader v-if="loadingLocationInfo" />
          <div class="flex-col flex items-start" v-else>
            <div @click="cleanSelections" v-if="selectedContinent.name"
              class="w-full flex text-primary cursor-pointer flex-row items-start gap-x-4 border-b pb-4 py-2 pl-3 border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                  clip-rule="evenodd" />
              </svg>

              <span class="text-sm capitalize">{{ selectedContinent.name }}</span>
            </div>
            <div class="w-full h-fit" v-if="allContinents.length > 0 && !selectedContinent.name">
              <p class="w-full flex cursor-pointer flex-row items-start gap-x-4 border-b py-2 pl-3 border-gray-100"
                @click="pickContinent(continent)" :class="{ 'border-none': index === allContinents.length - 1 }"
                v-for="(continent, index) in allContinents" :key="(continent, index)">
                <span class="text-webapp text-sm font-medium cursor-pointer capitalize text-left">{{
                  continent.name }}</span>
              </p>
            </div>
            <div class="w-full h-fit" v-if="selectedContinent.name">
              <p class="w-full flex flex-row cursor-pointer items-start gap-x-4 border-b py-2 pl-3 border-gray-100"
                @click="pickCountry(country)" :class="{ 'border-none': index === selectedContinentCountries.length - 1 }"
                v-for="(country, index) in selectedContinentCountries" :key="(country, index)">
                <span>{{ country.flag }}</span>
                <span class="text-webapp text-sm font-medium cursor-pointer capitalize text-left">{{
                  country.name }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="absolute top-8 left-1 flex flex-row items-center justify-center h-10 w-24 rounded-md cursor-pointer"
          @click="toggleCountryCodeContainer" style="background: #F4F4F4" :class="{ 'bg-bg': onModal }">
          <p class="flex flex-row items-center w-full justify-center gap-x-3">
            <span v-if="!selectedCountry.flag.includes('https')">{{ selectedCountry.flag }}</span>
            <img v-else :src="selectedCountry.flag" :alt="selectedCountry.name + 'country flag'" class="w-9 h-8">
            <span>+{{ selectedCountry.phoneCode }}</span>
          </p>
        </div>

      </div>

      <div class="flex flex-col items-start w-full gap-y-1 relative">
        <label for="" class="text-sm text-webapp">Secure pin</label>
        <input type="text" value="****" disabled placeholder="Enter your first name" class="w-full h-14 rounded-lg">
        <img src="../../../../assets/icons/edit-icon-nobg.svg" @click="$emit('changePin')"
          class="absolute right-5 top-10 cursor-pointer" alt="">
      </div>

      <button class="bg-primary w-full rounded-lg grid place-items-center h-14 my-6 text-white" @click="updateProfile">
        <span v-if="!processing">Continue</span>
        <Preloader v-else />
      </button>

      <!-- components -->
      <Toast :msg="errorMsg.msg" type="danger" v-if="onError" />
      <Toast :msg="newMsg" type="success" v-if="newMsg.length > 0" />
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from "../../../../composables/axios";
import { useStore } from "vuex";
import { useRouter } from 'vue-router'

import sort from 'smart-deep-sort'
import clm from 'country-locale-map'

import { formValidator } from '../../../../composables/2-validator'

const emit = defineEmits(['close'])

const store = useStore();
const router = useRouter()


const formData = new FormData();

const inputRef = ref(null)
const pic = ref(null)
const imageData = ref(store.state.user.userProfileImage)

function callImgProcessor() {
  inputRef.value.click()
}

const previewImg = async (event, value) => {
  // Reference to the DOM input element
  var input = event;

  // Ensure that you have a file before attempting to read it
  if (input.files) {
    pic.value = input.files[0]
    // create a new FileReader to read this image and convert to base64 format
    var reader = new FileReader();
    reader.onload = (e) => {
      imageData.value = e.target.result;
    }

    // Start the reader job - read file as a data url (base64 format)
    reader.readAsDataURL(input.files[0]);
  }
}

async function savePhoto() {
  try {
    formData.append('photo1', pic.value)
    const body = {
      description: 'profilePicture'
    }
    formData.append('data', JSON.stringify(body))

    const saveImage = await axios.post('/utility/save-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return saveImage.data.data[0].link
  } catch (error) {
    return 'https://i.ibb.co/gtpxMJz/21.png'
  }
}


// get country codes
let onContainer = ref(false)
const allContinents = ref([])
const loadingLocationInfo = ref(false)
const selectedContinent = ref({})
const selectedContinentCountries = ref([])

function getEmoji(country) {
  const emoji = clm.getCountryByName(country)
  if(emoji) {
    return emoji.emoji
  } else return '↺'
}


let selectedCountry = ref({
  name: store.state.user.nationality,
  phoneCode: store.state.user.countryCode,
  flag: getEmoji(store.state.user.nationality),
  currency: store.state.user.currency,
  shortName: store.state.user.countryShortName
});


function toggleCountryCodeContainer() {
  onContainer.value = !onContainer.value
}

function pickContinent(continent) {
  selectedContinent.value = continent
  selectedContinentCountries.value = []
  getContinentCountries(continent.id)
}

function cleanSelections() {
  selectedContinent.value = {}
  selectedContinentCountries.value = []
}

function pickCountry(country) {
  selectedCountry.value = country
  toggleCountryCodeContainer()
}

async function getContinents() {
  try {
    loadingLocationInfo.value = true
    const continents = await axios.get('/countries-api/continents')
    allContinents.value = sort(continents.data.results)
    loadingLocationInfo.value = false
  } catch (error) {
    loadingLocationInfo.value = false
  }
}

async function getContinentCountries(id) {
  try {
    loadingLocationInfo.value = true
    const countries = await axios.get('countries-api/countries/' + id)
    selectedContinentCountries.value = sort(countries.data.results)
    loadingLocationInfo.value = false
  } catch (error) {
    loadingLocationInfo.value = false
  }
}

// manage profile editing
function formatNames(data) {
  let names = data.split(' ')
  if (names.length === 2) {
    return {
      fname: names[0],
      surname: names[1],
    }
  } else {
    return {
      fname: names[0]
    }
  }
}


const url = '/auth/user/update';

const data = reactive({
  fname: '',
  surname: '',
  countryCode: '',
  countryShortName: '',
  currency: null,
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

async function updateProfile() {
  try {
    if (data.phoneNumber.toString().length >= 10) {
      processing.value = true
      data.countryCode = selectedCountry.value.phoneCode
      data.countryShortName = selectedCountry.value.shortName
      data.currency = selectedCountry.value.currency.split(',')[0]
      data.nationality = selectedCountry.value.name

      if (store.state.user.userProfileImage !== imageData.value) {
        data.profilePicture = await savePhoto()
      }

      if (data.fullName.length > 5) {
        let name = formatNames(data.fullName)
        data.fname = name.fname
        data.surname = name.surname ? name.surname : store.state.user.surname

        const update = await axios.put(url, data)

        newMsg.value = update.data.message + '. Changes will take effect in a few seconds'

        setTimeout(() => {
          processing.value = false
          newMsg.value = ''
          router.go()
          emit('close')
        }, 2000);
      } else {
        onError.value = true
        errorMsg.value.msg = 'Input your Full Name'
      }
    } else {
      onError.value = true
      errorMsg.value.msg = 'Input a correct Phone Number'
    }
  } catch (error) {
    processing.value = false
    onError.value = true
    errorMsg.value.msg = error.response.data.message

    setTimeout(() => {
      onError.value = false
    }, 2000);
  }
}

onMounted(() => {
  getContinents()
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
    border-radius: 0px;
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