<template>
  <div
    class="w-screen min-w-full flex flex-col justify-between items-center bg-white h-full min-h-screen overflow-y-none">
    <!-- Header / Navbar -->
    <HomeNavbar @openNav="mainNavOpen = true" @closeNav="mainNavOpen = false" />



    <!-- Hero/Quick search -->
    <div class="flex flex-col items-center gap-y-12 md:pb-0 pb-16">
      <h1 class="hero-text md:text-5xl text-4xl xl:text-6xl text-center text-webapp font-medium sm:4/5 w-5/6 md:w-3/5">
        Quick way to Find your dream Property</h1>

      <!-- Quick search -->
      <div class="flex flex-col quick-search no-wrap" :class="{ 'static': mainNavOpen, 'relative': !mainNavOpen }">
        <!-- Search bar -->
        <!-- desktop -->
        <div class="search-bar w-full hidden md:flex flex-row items-center bg-white pl-3 pr-1 h-12 py-1 gap-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="#B1B4CD"
            class="w-4 h-4 mt-1">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>

          <input type="text" v-model="data.input" @keydown=checkForEnter class=" rounded-sm w-full h-full outline-none"
            placeholder="Search by property type, location, price">
        </div>

        <!-- mobile -->
        <div @click="onSearch = true"
          class="search-bar w-full flex md:hidden flex-row items-center bg-white pl-3 pr-1 h-12 py-1 gap-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="#B1B4CD"
            class="w-4 h-4 mt-1">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>

          <input type="text" v-model="data.input" disabled class=" rounded-sm w-full h-full outline-none"
            placeholder="Search by property type, location, price">
        </div>


        <!-- search results -->
        <div class="flex flex-col gap-y-4 search-results sm:absolute bg-white z-10 w-full py-5 px-3 top-12 md:top-20"
          v-if="(data.input.length > 0)">
          <div class="flex flex-row items-center result justify-between w-full cursor-pointer"
            @click="$router.push('/listings/search?name=' + data.input)">
            <p class="text-webapp text-lg">{{ data.input }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="#71759D"
              class="w-6 h-6 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>

          <!-- Based on Search bar Input results -->
          <div class="flex flex-row items-center result justify-between w-full cursor-pointer"
            v-for="location in locations.slice(0, 5)" :key="location"
            @click="$router.push('/listings/search?name=' + data.input + '&location=' + location.toLowerCase())">
            <p class="text-webapp text-lg font-medium gap-x-1 flex flex-row items-center">{{ data.input }} <span
                class="text-lg font-extralight text-sub-webapp">in</span> <span class="text-lg font-medium text-webapp">{{
                  location }}</span></p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="#71759D"
              class="w-6 h-6 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- iLLUSTRATIONS ?  Footer-->
    <div class="flex flex-row items-end xl:justify-between justify-center w-full z-10">
      <img v-lazy src="../assets/illustrations/home-left.svg" class="xl:flex hidden" alt="">
      <div class="flex flex-row md:mb-10 mb-4 items-center gap-x-4">
        <router-link to="/terms-of-service" class="underline text-webapp">Terms of service</router-link>
        <router-link to="/listings/search?name=Houses" class="underline text-webapp">Products</router-link>
        <router-link to="/help" class="underline text-webapp">Help</router-link>
      </div>
      <img src="../assets/illustrations/home-right.svg" v-lazy class="xl:flex hidden" alt="">
    </div>

    <MobileSearch :location="locations" v-if="onSearch" @leaveSearch="onSearch = false" :delay="100" v-motion
      :initial="{ opacity: 0.5, y: 100 }" :enter="{ opacity: 1, y: 0 }" />

    <!-- seo snippets link -->
    <footer class="hidden">
      <a href="https://habeep.org/blog" class="hidden">Blogs</a>
      <a href="https://habeep.org/help" class="hidden">Help</a>
      <a href="https://habeep.org/terms-of-service" class="hidden">Terms of Service</a>
      <a href="https://habeep.org/blog/64a1f4f6c8b14fa0a1e5d238" class="hidden">Habeep Reward System</a>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from '../composables/axios'

import { useHead } from '@vueuse/head'
useHead({
  title: 'Habeep',
  titleTemplate: '%s | Quick way to Find your dream Property',
  meta: [
    { charset: 'utf-8' },
    { name: 'description', content: 'Search for new listings' },

    { name: 'og:title', content: 'Search Ads' },
    { name: 'og:image', content: 'https://logos.flamingtext.com/Word-Logos/property-design-sketch-name.png' },
    { name: 'og:url', content: 'https://habeep.org/home' },
    { name: 'og:website', content: 'website' },
    { name: 'og:description', content: 'Search for Ads in the home page' },

    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: 'https://i.ibb.co/BnG8VLy/logo-white.png' },
  ]
})

import HomeNavbar from '../components/HomeNavbar.vue'
import MobileSearch from "./components/MobileSearch.vue";

const route = useRoute()
const router = useRouter()
// Manage quick search
const onSearch = ref(false)
const mainNavOpen = ref(false)

if (route.query.reloadApp) {
  router.replace({ path: '/home', query: null });
  setTimeout(() => {
    router.go()
  }, 1000);
}

const store = useStore()

const data = reactive({
  input: ''
})

const checkForEnter = (e) => {
  var key = e.keyCode || e.charCode || e.key || e.code;
  if (key === 13 || key === 'Enter') {
    router.push('/listings/search?name=' + data.input)
  }
}

// search variables


const locations = ref([])

async function getStates() {
  try {
    const states = ref([])
    let country = ref({
      country: '',
      countryCode: '',
      currency: ''
    })

    if (store.state.isAuthenticated) {
      country.value = {
        country: store.state.user.nationality,
        countryCode: store.state.user.countryShortName
      }
    } else {
      const getCountry = await axiosDefault.get('http://ip-api.com/json')
      country.value = getCountry.data
    }

    const getState = await axios.get('/countries-api/states/' + country.value.countryCode)

    getState.data.results.forEach(async state => {
      const getCities = await axios.get(`/countries-api/cities/${country.value.countryCode}/${state.stateid}`)

      let formatted = {
        state: state,
        cities: getCities.data.results
      }

      formatted.cities.forEach(city => {
        if (city.type === 'Capital') {
          locations.value.push(city.name)
        }
        if (city.type === 'City' && locations.value.length <= 4) {
          locations.value.push(city.name)
        }
      })

      states.value.push(formatted)

    })

    states.value = states.value.sort(function (a, b) {
      const nameA = a.state.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.state.name.toUpperCase(); // ignore upper and lowercase
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }

      // names must be equal
      return 0;
    });
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getStates()
})
</script>

<style scoped>
/*  Import Ubuntu font */
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');

/* Quick search */
.quick-search {
  max-width: 692px;
  width: 692px;
}

.search-bar,
.search-results {
  border: 1px solid #EBEBEB;
  box-shadow: 0px 8px 88px -6px rgba(24, 39, 75, 0.12), 0px 14px 88px -4px rgba(24, 39, 75, 0.12);
  border-radius: 10px;
  filter: drop-shadow(0 14px 88px -6 #18274B1F);
}

.search-results {
  min-height: 100px;
  max-height: 430px;
}

input::placeholder {
  color: #B1B4CD;
  font-size: 16px;
}

input {
  outline: none !important;
  border: none !important;
}

@media screen and (max-width: 768px) {
  .quick-search {
    width: 90%;
  }

  .search-results {
    height: 280px;
  }
}
</style>