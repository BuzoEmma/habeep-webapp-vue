<template>
  <div :style="{ backgroundColor: currentColor }"
    class="w-screen min-w-full flex flex-col justify-between items-center h-full min-h-screen overflow-y-none">
    <!-- Header / Navbar -->
    <HomeNavbar @openNav="mainNavOpen = true" @closeNav="mainNavOpen = false" />

    <!-- Hero/Quick search -->
    <div class="flex flex-col items-center gap-y-12 md:pb-0 pb-16">
      <h1 class="hero-text md:text-5xl text-4xl xl:text-6xl text-center text-webapp font-medium sm:4/5 w-5/6 md:w-3/5">
        Quick way to Find your dream Property
      </h1>

      <!-- Quick search -->
      <div class="flex flex-col quick-search no-wrap relative">
        <!-- Search bar -->
        <!-- desktop -->
        <div :style="{
          backgroundColor: currentColor,
        }" class="search-bar w-full hidden md:flex flex-row items-center bg-white pl-3 pr-1 h-12 py-1 gap-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="#B1B4CD"
            class="w-4 h-4 mt-1">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>

          <input type="text" v-model="data.input" @keydown="checkForEnter" :style="{ backgroundColor: currentColor }"
            @input="randomiseLocationsSugg" class="rounded-sm w-full h-full outline-none"
            placeholder="Search by property type, location, price" />
        </div>

        <!-- mobile -->
        <div @click="onSearch = true"
          class="search-bar w-full flex md:hidden flex-row items-center bg-white pl-3 pr-1 h-12 py-1 gap-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="#B1B4CD"
            class="w-4 h-4 mt-1">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>

          <input type="text" @touchstart="onSearch = true" @click="onSearch = true" disabled
            class="rounded-sm w-full h-full outline-none" placeholder="Search by property type, location, price" />
        </div>

        <!-- search results -->
        <div class="flex flex-col gap-y-4 search-results sm:absolute bg-white z-20 w-full py-5 px-3 top-12 md:top-20"
          v-if="data.input.length > 0">
          <div class="flex flex-row items-center result justify-between w-full cursor-pointer"
            @click="$router.push('/listings/search?name=' + data.input)">
            <p class="text-webapp text-lg">{{ data.input }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="#71759D"
              class="w-6 h-6 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>

          <!-- Based on Search bar Input results -->
          <div class="flex flex-row items-center result justify-between w-full cursor-pointer" v-for="location in locations.slice(
            locationKeys.start,
            locationKeys.end
          )" :key="location" @click="
              $router.push(
                '/listings/search?name=' +
                data.input +
                '&location=' +
                location.toLowerCase()
              )
              ">
            <p class="text-webapp text-lg font-medium gap-x-1 flex flex-row items-center">
              {{ data.input }}
              <span class="text-lg font-extralight text-sub-webapp">in</span>
              <span class="text-lg font-medium text-webapp">{{
                location
              }}</span>
            </p>
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
      <img v-lazy src="../assets/illustrations/home-left.svg" class="xl:flex hidden" alt="" />
      <div class="flex flex-row md:mb-8 mb-4 items-center gap-x-4">
        <router-link to="/terms-of-service" class="underline text-webapp">Terms of service</router-link>
        <router-link to="/listings/search?name=Houses" class="underline text-webapp">Products</router-link>
        <router-link to="/help" class="underline text-webapp">Help</router-link>

        <router-link to="/about" class="underline text-webapp">About us</router-link>
      </div>
      <img src="../assets/illustrations/home-right.svg" v-lazy class="xl:flex hidden" alt="" />
    </div>

    <MobileSearch @updateKeys="randomiseLocationsSugg" :locationKeys="locationKeys" :location="locations"
      v-if="onSearch" @leaveSearch="onSearch = false" :delay="100" v-motion :initial="{ opacity: 0.5, y: 100 }"
      :enter="{ opacity: 1, y: 0 }" />
  </div>

  <div class="div-btn">
    <div class="div-btn-list" :class="{ 'div-btn-hidden': !showList }">
      <svg class="btn-close" @click="toggleList" width="24" height="24" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18.3 5.71001C18.2075 5.61731 18.0976 5.54376 17.9766 5.49358C17.8556 5.4434 17.7259 5.41757 17.595 5.41757C17.464 5.41757 17.3343 5.4434 17.2134 5.49358C17.0924 5.54376 16.9825 5.61731 16.89 5.71001L12 10.59L7.10998 5.70001C7.0174 5.60743 6.90749 5.53399 6.78652 5.48388C6.66556 5.43378 6.53591 5.40799 6.40498 5.40799C6.27405 5.40799 6.1444 5.43378 6.02344 5.48388C5.90247 5.53399 5.79256 5.60743 5.69998 5.70001C5.6074 5.79259 5.53396 5.9025 5.48385 6.02347C5.43375 6.14443 5.40796 6.27408 5.40796 6.40501C5.40796 6.53594 5.43375 6.66559 5.48385 6.78655C5.53396 6.90752 5.6074 7.01743 5.69998 7.11001L10.59 12L5.69998 16.89C5.6074 16.9826 5.53396 17.0925 5.48385 17.2135C5.43375 17.3344 5.40796 17.4641 5.40796 17.595C5.40796 17.7259 5.43375 17.8556 5.48385 17.9766C5.53396 18.0975 5.6074 18.2074 5.69998 18.3C5.79256 18.3926 5.90247 18.466 6.02344 18.5161C6.1444 18.5662 6.27405 18.592 6.40498 18.592C6.53591 18.592 6.66556 18.5662 6.78652 18.5161C6.90749 18.466 7.0174 18.3926 7.10998 18.3L12 13.41L16.89 18.3C16.9826 18.3926 17.0925 18.466 17.2134 18.5161C17.3344 18.5662 17.464 18.592 17.595 18.592C17.7259 18.592 17.8556 18.5662 17.9765 18.5161C18.0975 18.466 18.2074 18.3926 18.3 18.3C18.3926 18.2074 18.466 18.0975 18.5161 17.9766C18.5662 17.8556 18.592 17.7259 18.592 17.595C18.592 17.4641 18.5662 17.3344 18.5161 17.2135C18.466 17.0925 18.3926 16.9826 18.3 16.89L13.41 12L18.3 7.11001C18.68 6.73001 18.68 6.09001 18.3 5.71001Z"
          fill="white" />
      </svg>

      <div>
        <button @click="updateColor('#ffffff')" style="background-color: white"></button>
        <button @click="updateColor('#FAF9F6')" style="background-color: #faf9f6"></button>
        <button @click="updateColor('#FCE9D5')" style="background-color: #fce9d5"></button>
        <button @click="updateColor('#E8E9F5')" style="background-color: #e8e9f5"></button>
      </div>
    </div>
    <div class="div-icon" @click="toggleList">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="customise-pen">
        <path
          d="M5 19H6.098L16.796 8.302L15.698 7.204L5 17.902V19ZM4 20V17.48L17.18 4.288C17.2833 4.19667 17.3967 4.126 17.52 4.076C17.6433 4.026 17.7723 4.00067 17.907 4C18.0417 3.99933 18.1717 4.02067 18.297 4.064C18.4237 4.106 18.5403 4.182 18.647 4.292L19.714 5.366C19.824 5.472 19.8993 5.58867 19.94 5.716C19.98 5.84267 20 5.96933 20 6.096C20 6.232 19.9773 6.362 19.932 6.486C19.886 6.60933 19.8133 6.72233 19.714 6.825L6.519 20H4ZM16.238 7.762L15.698 7.204L16.796 8.302L16.238 7.762Z"
          fill="#FFFF" />
      </svg>

      <p>Customise</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "../composables/axios";
import axiosDefault from "axios";
import clm from "country-locale-map";
import randomise from "random-num";

import { useHead } from "@vueuse/head";
useHead({
  title: "Habeep | Find your dream property",
  meta: [
    { charset: "utf-8" },
    {
      name: "description",
      content:
        "Search for your new dream house at Habeep. You can also search for lands and other properties only at Habeep!!",
    },

    { name: "og:title", content: "Search Ads" },
    {
      name: "og:image",
      content:
        "https://res.cloudinary.com/dfjud30cb/image/upload/v1711364431/files/logo-white-bg.png",
    },
    { name: "og:url", content: "https://habeep.org/home" },
    { name: "og:website", content: "website" },
    { name: "og:description", content: "Search for Ads in the home page" },

    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  link: [
    {
      rel: "icon",
      href: "https://res.cloudinary.com/dfjud30cb/image/upload/v1711364431/files/logo-white-bg.png",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      href: "https://res.cloudinary.com/dfjud30cb/image/upload/v1711364476/files/logo-dark-bg.png",
      media: "(prefers-color-scheme: dark)",
    },
  ],
});

import HomeNavbar from "../components/HomeNavbar.vue";
import MobileSearch from "./components/MobileSearch.vue";

const currentColor = ref(localStorage.getItem("currentColor") || "#FFFFFF");

function updateColor(color) {
  currentColor.value = color;
  localStorage.setItem("currentColor", color);
}

const showList = ref(false);

function toggleList() {
  showList.value = !showList.value;
}

const route = useRoute();
const router = useRouter();
// Manage quick search
const onSearch = ref(false);
const mainNavOpen = ref(false);

if (route.query.reloadApp) {
  router.replace({ path: "/home", query: null });
  setTimeout(() => {
    router.go();
  }, 1000);
}

const store = useStore();

const data = reactive({
  input: "",
});

const checkForEnter = (e) => {
  var key = e.keyCode || e.charCode || e.key || e.code;
  if (key === 13 || key === "Enter") {
    router.push("/listings/search?name=" + data.input);
  }
};

// search variables

const locations = ref([]);
const locationKeys = ref({
  start: 0,
  end: 5,
});
const randomiseLocationsSugg = async () => {
  if (locations.value.length > 0) {
    const numbers = {
      start: randomise(0, locations.value.length - 6),
      get end() {
        return this.start + 5;
      },
    };

    locationKeys.value = numbers;
  }
};

async function getStates() {
  try {
    const states = ref([]);
    let country = ref({
      country: "",
      cc: "",
      currency: "",
    });

    if (store.state.isAuthenticated) {
      country.value = {
        country: store.state.user.nationality,
        cc: store.state.user.countryShortName,
      };
    } else {
      try {
        const getCountry = await axiosDefault.get("https://jsonip.com");
        if (getCountry.data.country) {
          country.value.country = clm.getCountryNameByAlpha2(
            getCountry.data.country
          );
          country.value.cc = getCountry.data.country;
          country.value.currency = clm.getCountryByAlpha2(
            getCountry.data.country
          );
        }
      } catch (error) {
        console.log("Location not found! Falling back to default;");
      }
    }

    if (country.value.country.length === 0) {
      country.value.country = clm.getCountryNameByAlpha2("NG");
      country.value.cc = "NG";
      country.value.currency = clm.getCountryByAlpha2("NG");
    }

    const getState = await axios.get(
      "/countries-api/states/" + country.value.cc
    );

    getState.data.results.forEach(async (state) => {
      const getCities = await axios.get(
        `/countries-api/cities/${country.value.cc}/${state.stateid}`
      );

      let formatted = {
        state: state,
        cities: getCities.data.results,
      };

      formatted.cities.forEach((city) => {
        if (city.type === "Capital") {
          locations.value.push(city.name);
        }
        if (city.type === "City" && locations.value.length <= 4) {
          locations.value.push(city.name);
        }
      });

      states.value.push(formatted);
    });

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
    console.log(error);
  }
}

onMounted(() => {
  getStates();
});
</script>

<style scoped>
/*  Import Ubuntu font */
@import url("https://fonts.googleapis.com/css2?family=Ubuntu&display=swap");

/* Quick search */
.quick-search {
  max-width: 692px;
  width: 692px;
}

.search-bar,
.search-results {
  border: 1px solid #ebebeb;
  box-shadow: 0px 8px 88px -6px rgba(24, 39, 75, 0.12),
    0px 14px 88px -4px rgba(24, 39, 75, 0.12);
  border-radius: 10px;
  filter: drop-shadow(0 14px 88px -6 #18274b1f);
}

.search-results {
  min-height: 100px;
  max-height: 430px;
}

input::placeholder {
  color: #b1b4cd;
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

.div-btn {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  bottom: 4rem;
  right: 12rem;
  opacity: 1;
  z-index: 10;
  flex-direction: column;
  gap: 1rem;
}

.div-btn-list {
  width: 449px;
  height: 179px;
  opacity: 0px;
  background: #0a1045cc;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.div-btn-list div {
  width: 322px;
  height: 70px;
  gap: 14px;
  opacity: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-close {
  width: 24px;
  height: 24px;
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  cursor: pointer;
}

.div-btn-list button {
  width: 70px;
  height: 70px;
  gap: 0px;
  border-radius: 20px;
  opacity: 0px;
  cursor: pointer;
}

.div-icon {
  background: #0a1045cc;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  width: 162px;
  height: 54px;
  padding: 15px 30px 15px 30px;
  gap: 8px;
  border-radius: 12px;
  opacity: 0.8px;
}

.div-icon p {
  font-family: Aeonik;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  text-align: center;
  color: white;
}

.div-btn-hidden {
  opacity: 0;
  visibility: hidden;
}

/* Media queries for different screen sizes */
@media screen and (max-width: 1280px) {
  .div-btn {
    bottom: 3rem;
    right: 3rem;
  }

  .div-btn-list div {
    width: 250px;
    height: 50px;
  }

  .div-btn-list {
    width: 300px;
    height: 100px;
  }

  .btn-close {
    right: 0.7rem;
    top: 0.3rem;
    display: none;
  }

  .div-btn-list button {
    width: 45px;
    height: 40px;
    border-radius: 5px;
  }

  .div-icon {
    width: 150px;
    height: 50px;
    padding: 5px;
  }

  .div-icon p {
    font-weight: 500;
    line-height: 10px;
  }
}

@media screen and (max-width: 480px) {
  .div-btn {
    bottom: 5rem;
    right: 1rem;
  }

  .div-btn-list div {
    width: 150px;
    height: 40px;
  }

  .div-btn-list {
    width: 200px;
    height: 90px;
  }

  .btn-close {
    right: 0.7rem;
    top: 0.3rem;
    display: none;
  }

  .div-btn-list button {
    width: 30px;
    height: 30px;
    border-radius: 5px;
  }

  .div-icon {
    width: 130px;
    height: 40px;
    padding: 5px;
  }

  .div-icon p {
    font-weight: 500;
    line-height: 10px;
  }
}
</style>
