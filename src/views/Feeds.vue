<template>
  <div
    class="absolute w-screen h-screen flex flex-row items-center justify-center lg:hidden z-10"
    v-if="onDropdown"
    style="background-color: rgb(22, 22, 34, 0.5)"
  >
    <div
      v-if="onSortDropdown && onDropdown"
      class="flex flex-col drop-shadow-md shadow-xl my-auto bg-white rounded-xl gap-y-3 border p-4 border-gray-300 z-10"
      style="width: 220px"
    >
      <div
        class="flex flex-row items-center justify-between"
        @click="toggleDropdown('sort')"
      >
        <span class="text-lg text-webapp font-medium">Sort:</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#71759D"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <p
        class="text-sm text-webapp mt-2 cursor-pointer"
        :class="{ 'text-blue-600': filterData.sortValue === 'Recommended' }"
        @click="changeSortValue(1)"
      >
        Recommended
      </p>
      <p
        class="text-sm text-webapp mt-2 cursor-pointer"
        :class="{ 'text-blue-600': filterData.sortValue === 'Newest first' }"
        @click="changeSortValue(2)"
      >
        Newest first
      </p>
      <p
        class="text-sm text-webapp mt-2 cursor-pointer"
        :class="{ 'text-blue-600': filterData.sortValue === 'Oldest first' }"
        @click="changeSortValue(3)"
      >
        Oldest first
      </p>

      <hr class="my-4" />

      <span class="text-webapp text-lg font-medium">Location:</span>
      <div
        class="flex flex-row items-center justify-between mt-4 w-full"
        @click="toggleDropdown('location')"
      >
        <span class="text-primary text-lg font-medium">{{ currentCity }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-gray-300 cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>

    <!-- location dropdown -->
    <div
      v-if="onLocationDropdown && onDropdown"
      class="flex flex-col location drop-shadow-md overflow-y-auto shadow-xl bg-white rounded-xl gap-y-3 border p-4 border-gray-300 z-10"
      style="width: 220px; max-height: 394px"
    >
      <div class="flex flex-row items-center justify-between">
        <span class="text-sm font-medium">
          Location-
          <span v-if="onState">state</span>
          <span v-else>city</span>
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          @click="toggleDropdown('location')"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#71759D"
          class="w-5 h-5 cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <div class="mt-1" v-if="onState">
        <p
          class="text-sm mb-1 text-webapp cursor-pointer gap-x-2 flex flex-row"
        >
          <img src="../assets/icons/location-checked.svg" alt="" />
          <span v-if="currentState === 'All'">{{
            currentState + " Cities"
          }}</span>
          <span v-if="currentState !== 'All'">{{ " - " + currentCity }}</span>
        </p>
      </div>
      <div class="mt-1" v-if="!onState">
        <p
          class="text-sm mb-1 text-webapp cursor-pointer gap-x-2 flex flex-row"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 cursor-pointer"
            @click="onState = true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>

          <span class="text-primary text-sm">{{ currentState }}</span>
        </p>
        <hr />
      </div>

      <div v-if="onState" class="gap-y-2">
        <div class="py-2" @click="changeStateModal('All', 'state')">
          <p class="text-sm mb-1 text-webapp cursor-pointer">All</p>
          <hr />
        </div>
        <div
          class="py-2"
          v-for="(state, index) in states"
          :key="(state, index)"
          @click="changeStateModal(state, 'state')"
        >
          <p
            class="text-sm mb-1 text-webapp cursor-pointer"
            v-if="state.state.name !== 'Cross'"
          >
            {{ state.state.name }}
          </p>
          <p class="text-sm mb-1 text-webapp cursor-pointer" v-else>
            {{ state.state.name + " River" }}
          </p>
          <hr v-if="index + 1 !== states.length" />
        </div>
      </div>

      <!-- First V -->
      <div v-else>
        <div
          class="py-2"
          v-for="(city, index) in cities"
          :key="(city, index)"
          @click="changeStateModal(city.name, 'city')"
        >
          <p class="text-sm mb-1 text-webapp cursor-pointer">{{ city.name }}</p>
          <hr v-if="index + 1 !== cities.length" />
        </div>
      </div>
    </div>
  </div>

  <div
    class="w-screen min-w-full flex flex-col items-center main bg-white h-screen min-h-full overflow-y-auto"
    :class="{
      'max-h-screen overflow-y-hidden overflow-hidden opacity-40':
        onDropdown && screenWidth < 1024,
    }"
    resize="changeWidth"
  >
    <MainNavbar @toggleSearch="toggleSearch" />

    <div
      class="body px-0 2xl:px-44 md:px-20 mb-10 w-full flex flex-col h-full items-center md:items-start gap-y-3 mt-3"
    >
      <!-- mobile search bar -->
      <div
        class="flex flex-row items-center w-full px-2 relative"
        v-if="onSearchBar"
        v-motion
        :initial="{ opacity: 0.2, y: -100 }"
        :enter="{ opacity: 1, y: 0 }"
        :leave="{ y: 100, opacity: 0 }"
      >
        <input
          type="text"
          placeholder="Search products"
          v-model="searchData"
          class="border border-black pl-2 outline-none h-10 w-full"
        />
        <div
          class="search-btn w-8 h-8 bg-black absolute right-3 grid place-items-center cursor-pointer"
          @click="$router.push('/listings/search?name=' + searchData)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
      <div class="flex flex-row w-full mt-2 items-center justify-between">
        <div
          class="flex flex-row items-center tabs gap-x-4 border-b flex-nowrap border-gray-200 lg:overflow-x-hidden overflow-x-scroll px-6 md:px-0"
        >
          <img
            src="../assets/icons/Filter.svg"
            alt=""
            class="cursor-pointer lg:hidden"
            @click="toggleDropdown('sort')"
          />
          <span
            class="text-sub-webapp pb-2 cursor-pointer text-sm md:text-lg"
            @click="changeHouseType('all')"
            :class="{
              'border-b-2 font-medium text-blue-600 border-b-blue-600 text-primary':
                filterData.propertyType === 'all',
            }"
            >All</span
          >
          <span
            class="text-sub-webapp pb-2 cursor-pointer text-sm md:text-lg"
            @click="changeHouseType('apartment')"
            :class="{
              'border-b-2 font-medium text-blue-600 border-b-blue-600 text-primary':
                filterData.propertyType === 'apartment',
            }"
            >Apartment</span
          >
          <span
            class="text-sub-webapp pb-2 cursor-pointer text-sm md:text-lg"
            @click="changeHouseType('bungalow')"
            :class="{
              'border-b-2 font-medium text-blue-600 border-b-blue-600 text-primary':
                filterData.propertyType === 'bungalow',
            }"
            >Bungalow</span
          >
          <span
            class="text-sub-webapp pb-2 cursor-pointer text-sm md:text-lg"
            @click="changeHouseType('duplex')"
            :class="{
              'border-b-2 font-medium text-blue-600 border-b-blue-600 text-primary':
                filterData.propertyType === 'duplex',
            }"
            >Duplex</span
          >
          <span
            class="text-sub-webapp pb-2 cursor-pointer text-sm md:text-lg"
            @click="changeHouseType('flat')"
            :class="{
              'border-b-2 font-medium text-blue-600 border-b-blue-600 text-primary':
                filterData.propertyType === 'flat',
            }"
            >Flat</span
          >
          <span
            class="text-sub-webapp pb-2 cursor-pointer text-sm md:text-lg"
            @click="changeHouseType('office')"
            :class="{
              'border-b-2 font-medium text-blue-600 border-b-blue-600 text-primary':
                filterData.propertyType === 'office',
            }"
            >Office</span
          >
          <span
            class="text-sub-webapp pb-2 cursor-pointer text-sm md:text-lg whitespace-nowrap w-full"
            @click="changeHouseType('room_parlor')"
            :class="{
              'border-b-2 font-medium text-blue-600 border-b-blue-600 text-primary':
                filterData.propertyType === 'room_parlor',
            }"
            >Room & Parlour</span
          >
          <span
            class="text-sub-webapp pb-2 cursor-pointer text-sm md:text-lg whitespace-nowrap w-full"
            @click="changeHouseType('land')"
            :class="{
              'border-b-2 font-medium text-blue-600 border-b-blue-600 text-primary':
                filterData.propertyType === 'land',
            }"
            >Land</span
          >
        </div>

        <!-- filters -->
        <div
          class="flex flex-row items-center h-fit gap-x-4 transition-all"
          :class="{ relative: onDropdown && !$store.state.navOpen }"
        >
          <div
            @click="toggleDropdown('sort')"
            class="border border-gray-300 w-56 py-1 justify-center hidden lg:flex flex-row items-center gap-x-2 rounded-full cursor-pointer"
          >
            <span class="md:text-lg text-webapp text-sm flex flex-row gap-x-1">
              Sort:
              <span
                class="hidden md:flex flex-row items-center w-full flex-nowrap"
                >{{ filterData.sortValue }}</span
              >
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :class="{ 'rotate-180': onSortDropdown }"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#9A9A9D"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>

          <div
            @click="toggleDropdown('location')"
            class="border border-gray-300 py-1 px-3 hidden lg:flex flex-row items-center gap-x-4 rounded-full cursor-pointer"
          >
            <span class="md:text-lg text-webapp">{{
              currentCity || "Nigeria"
            }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :class="{ 'rotate-180': onLocationDropdown }"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#9A9A9D"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>

          <!-- sort dropdown -->
          <div
            v-if="onSortDropdown && onDropdown && !$store.state.navOpen"
            class="lg:flex hidden flex-col drop-shadow-md shadow-xl bg-white rounded-xl gap-y-3 border p-4 border-gray-300 absolute top-16 z-10"
            style="width: 220px"
          >
            <div class="flex flex-row items-center justify-between">
              <span class="text-sm font-medium">Sort by</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                @click="toggleDropdown('sort')"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#71759D"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <p
              class="text-sm text-webapp mt-2 cursor-pointer"
              :class="{
                'text-blue-600': filterData.sortValue === 'Recommended',
              }"
              @click="changeSortValue(1)"
            >
              Recommended
            </p>
            <hr />
            <p
              class="text-sm text-webapp mt-2 cursor-pointer"
              :class="{
                'text-blue-600': filterData.sortValue === 'Newest first',
              }"
              @click="changeSortValue(2)"
            >
              Newest first
            </p>
            <hr />
            <p
              class="text-sm text-webapp mt-2 cursor-pointer"
              :class="{
                'text-blue-600': filterData.sortValue === 'Oldest first',
              }"
              @click="changeSortValue(3)"
            >
              Oldest first
            </p>
          </div>

          <!-- location dropdown -->
          <div
            v-if="onLocationDropdown && onDropdown && !$store.state.navOpen"
            class="lg:flex hidden flex-col location drop-shadow-md overflow-y-auto shadow-xl bg-white rounded-xl gap-y-3 border p-4 border-gray-300 absolute top-16 right-0 z-10"
            style="width: 220px; max-height: 394px"
          >
            <div class="flex flex-row items-center justify-between">
              <span class="text-sm font-medium">
                Location-
                <span v-if="onState">state</span>
                <span v-else>city</span>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                @click="toggleDropdown('location')"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#71759D"
                class="w-5 h-5 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <div class="mt-1" v-if="onState">
              <p
                class="text-sm mb-1 text-webapp cursor-pointer gap-x-2 flex flex-row"
              >
                <img src="../assets/icons/location-checked.svg" alt="" />
                <span v-if="currentState === 'All'">{{
                  currentState + " Cities"
                }}</span>
                <span v-if="currentState !== 'All'">{{
                  " - " + currentCity
                }}</span>
              </p>
            </div>
            <div class="mt-1" v-if="!onState">
              <p
                class="text-sm mb-1 text-webapp cursor-pointer gap-x-2 flex flex-row"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 cursor-pointer"
                  @click="onState = true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>

                <span class="text-primary text-sm">{{ currentState }}</span>
              </p>
              <hr />
            </div>
            <!-- 
             -->
            <div v-if="onState" class="gap-y-2">
              <div class="py-2" @click="changeStateModal('All', 'state')">
                <p class="text-sm mb-1 text-webapp cursor-pointer">All</p>
                <hr />
              </div>

              <!-- Third V -->
              <div
                class="py-2"
                v-for="(state, index) in states"
                :key="(state, index)"
                @click="changeStateModal(state, 'state')"
              >
                <p
                  class="text-sm mb-1 text-webapp cursor-pointer"
                  v-if="state.state.name !== 'Cross'"
                >
                  {{ state.state.name }}
                </p>
                <p class="text-sm mb-1 text-webapp cursor-pointer" v-else>
                  {{ state.state.name + " River" }}
                </p>
                <hr v-if="index + 1 !== states.length" />
              </div>
            </div>

            <!-- Fourth  V -->
            <div v-else>
              <div
                class="py-2"
                v-for="(city, index) in cities"
                :key="(city, index)"
                @click="changeStateModal(city.name, 'city')"
              >
                <p class="text-sm mb-1 text-webapp cursor-pointer">
                  {{ city.name }}
                </p>
                <hr v-if="index + 1 !== cities.length" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- feeds sections -->
      <div
        class="flex flex-row flex-auto h-full md:mt-10 w-full flex-wrap"
        id="observer-root"
        :class="{ 'justify-center items-center': filteredFeeds.length < 1 }"
      >
        <loader
          :letters="['H', 'A', 'B', 'E', 'E', 'P']"
          class="m-auto"
          v-if="fetchingFeeds === true"
          size="200px"
          color="#0A1045"
        ></loader>

        <div
          class="flex flex-col items-center gap-y-3 md:justify-center"
          v-if="filteredFeeds.length < 1 && !started && !fetchingFeeds"
        >
          <img src="../assets/icons/no-ad.svg" alt="" />
          <span class="text-gray-300 text-lg"
            >No feeds for {{ filterData.propertyType }} yet</span
          >
        </div>
        <!-- listing template -->
        <!-- Five V -->

        <div
          class=" basis-full md:basis-1/2 md:px-2 xl:basis-1/4 md:py-3 py-5 gap-y-4 px-5 "
          v-else
          v-for="feed in filteredFeeds"
          :key="feed"
        >
          <div
            class="h-[300px] flex flex-col items-start gap-y-2 border rounded-md border-gray-200 pb-2 feed relative"
          >
            <Skeleton
              v-if="!feed.imageLoaded"
              class="w-full h-44 rounded-t-md"
              style="width: 100%"
            />
            <img
              fetchpriority="high"
              :src="feed.images[0].link"
              @load="feed.imageLoaded = true"
              @click="$router.push('/listings/products/' + feed._id)"
              alt=""
              :class="{ hidden: !feed.imageLoaded }"
              class="w-full feed-image rounded-t-md"
              v-if="
                feed.images[0].link &&
                feed.images[0].link.includes('mp4') == false
              "
            />
            <video
              @touchstart="playVideo"
              @touchend="pauseVideo"
              @mouseenter="playVideo"
              @mouseout="pauseVideo"
              playsinline
              fetchpriority="high"
              :src="feed.images[0].link"
              @loadedmetadata="feed.imageLoaded = true"
              :class="{ hidden: !feed.imageLoaded }"
              @click="$router.push('/listings/products/' + feed._id)"
              class="w-full rounded-t-md feed-image feed-video"
              v-else
              muted
              loop
              preload="metadata"
            ></video>
          

         <p
          class="text-webapp text-lg font-medium w-full  px-2 cursor-pointer max-w-[270px] whitespace-nowrap text-ellipsis overflow-hidden"
  
          @click="$router.push('/listings/products/' + feed._id)"
        >
          {{ feed.title }}
        </p>

            <div
              class="location flex flex-row items-center gap-x-2 px-2"
              @click="$router.push('/listings/products/' + feed._id)"
            >
              <img src="../assets/images/map-pin.png" alt="" />
              <span class="text-sm text-webapp max-w-[235px] whitespace-nowrap text-ellipsis overflow-hidden">
                {{ feed.location.city || feed.location.address}}
              </span>
            </div>


            <div class="flex flex-row items-center w-full justify-between px-2">
              <p
                @click="$router.push('/listings/products/' + feed._id)"
                class="text-sm text-webapp font-medium"
              >
                <PriceFormatter
                  :from="feed.priceCurrency"
                  :to="$store.state.user.currency"
                  :amount="feed.price"
                />
                /
                <span v-if="feed.for === 'rent'">Rent</span>
                <span v-if="feed.for === 'sale'">Sale</span>
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 cursor-pointer transition-all"
                @click="saveAd(feed._id)"
                :class="{
                  'text-orange-400 scale-[1] opacity-100':
                    $store.state.user.savedAds.includes(feed._id),
                  'scale-[0.8] opacity-80':
                    !$store.state.user.savedAds.includes(feed._id),
                }"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>

            <!-- distance of listing from you -->
            <div
              class="rounded border border-white px-2 py-1 absolute top-5 right-5"
              v-if="feed.distance"
              style="background: rgba(211, 211, 211, 0.5)"
            >
              <span class="text-white text-sm text-center"
                >{{ Math.round(feed.distance) }} KM Away</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- feed section end -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import MainNavbar from "../components/HomeNavbar.vue";
import calculateDistance from "../composables/getAdDistance.js";
import axios from "../composables/axios";
import saveAd from "../composables/saveAd";

import sort from "smart-deep-sort";

const title = ref("Habeep | Feeds(0)");
import { useHead, useHeadSafe } from "@vueuse/head";

useHead({
  title: () => title.value,
  meta: [
    { charset: "utf-8" },
    { name: "description", content: "Specific User Feeds" },

    { name: "og:title", content: "Feeds" },
    {
      name: "og:image",
      content:
        "https://res.cloudinary.com/dfjud30cb/image/upload/v1711364431/files/logo-white-bg.png",
    },
    { name: "og:url", content: "https://habeep.org/feeds" },
    { name: "og:website", content: "website" },
    { name: "og:description", content: "View your Feeds " },

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

const store = useStore();
const route = useRoute();
const router = useRouter();

if (route.query.reloadApp) {
  router.replace({ query: null });
  setTimeout(() => {
    router.go();
  }, 1000);
}

// ui conditionals
const onSortDropdown = ref(false);
const onLocationDropdown = ref(false);
const onDropdown = ref(false);

let filterData = reactive({
  location: {
    city: "",
    state: "",
  },
  propertyType: "all",
  sortValue: "Recommended",
});

const states = ref([]);
const cities = ref([]);
let onState = ref(true);
const currentState = ref("All");
const currentCity = ref("All");
const fetchingFeeds = ref(false);
const feeds = ref([]);
const started = ref(false);
const filteredFeeds = ref([]);
const errorMsg = ref("");

if (store.state.feedLocation.state) {
  currentState.value = store.state.feedLocation.state;
  filterData.location.state = currentState.value;
}
if (store.state.feedLocation.city) {
  currentCity.value = store.state.feedLocation.city;
  filterData.location.city = currentCity.value;
}

// fetch feeds

const url = "/listings/feeds";

async function getFeeds() {
  try {
    fetchingFeeds.value = true;
    started.value = true;
    const getFeeds = await axios.get(url);

    if (getFeeds.data) {
      for (const feed of getFeeds.data.feed) {
        if (feed) {
          const distance = await calculateDistance(
            feed.location.city ||
              feed.location.address + ", " + store.state.user.nationality
          );
          if (distance) {
            feed.distance = distance;
          }
        }
        // location filter
        if (
          filterData.location.state.length > 0 &&
          filterData.location.city.length > 0
        ) {
          if (
            feed.location.city
              .toLowerCase()
              .includes(filterData.location.city.toLowerCase()) ||
            feed.location.city
              .toLowerCase()
              .includes(
                filterData.location.city.split(" ")[0].toString().toLowerCase()
              ) ||
            filterData.location.city
              .toLowerCase()
              .includes(
                filterData.location.state.split(" ")[0].toString().toLowerCase()
              )
          ) {
            feeds.value.push(feed);
            filteredFeeds.value.push(feed);
          }
        } else {
          feeds.value.push(feed);
          filteredFeeds.value.push(feed);
        }

        const uniqueIds = [];
        const uniqueFeeds = filteredFeeds.value.filter((element) => {
          const isDuplicate = uniqueIds.includes(element._id);
          if (!isDuplicate) {
            uniqueIds.push(element._id);
            return true;
          }
          return false;
        });

        if (filteredFeeds.value.length !== uniqueFeeds.length) {
          filteredFeeds.value = uniqueFeeds;
        }

        if (filteredFeeds.value.length > 0) {
          fetchingFeeds.value = false;
        }
      }

      useFilters(filterData);

      fetchingFeeds.value = false;

      if (feeds.value.length === 0) {
        title.value = `Habeep | No Feeds`;
      } else {
        title.value = `Habeep | Feeds(${feeds.value.length})`;
      }
    }

    started.value = false;
  } catch (error) {
    errorMsg.value = "Error getting feeds";
  }
}



function changeStateModal(state, type) {
  if (state !== "All") {
    if (type === "state") {
      onState.value = false;
      currentState.value = state.state.name;
      filterData.location.state = currentState.value;
      cities.value = state.cities;
    }
    if (type === "city") {
      onDropdown.value = false;
      onLocationDropdown.value = false;
      onState.value = true;
      currentCity.value = state;
      filterData.location.city = currentCity.value;

      saveFeedLocation();
    }
  } else {
    onDropdown.value = false;
    onLocationDropdown.value = false;
    currentState.value = "All";
    currentCity.value = "All";
    onState.value = true;
    filterData.location.state = "";
    filterData.location.city = "";

    saveFeedLocation();
  }

  useFilters(filterData);
}

const onSearchBar = ref(false);

const searchData = ref("");

function toggleSearch() {
  onSearchBar.value = !onSearchBar.value;
}

function changeHouseType(type) {
  filterData.propertyType = type;
  useFilters(filterData);
}

function toggleDropdown(type) {
  if (type == "location") {
    onSortDropdown.value = false;
    if (onLocationDropdown.value === false) {
      onDropdown.value = true;
      onLocationDropdown.value = true;
    } else {
      onLocationDropdown.value = false;
      onDropdown.value = false;
    }
  }
  if (type == "sort") {
    onLocationDropdown.value = false;
    if (onSortDropdown.value === false) {
      onDropdown.value = true;
      onSortDropdown.value = true;
    } else {
      onSortDropdown.value = false;
      onDropdown.value = false;
    }
  }
}

function changeSortValue(index) {
  if (index == 1) {
    filterData.sortValue = "Recommended";
  } else if (index == 2) {
    filterData.sortValue = "Newest first";
  } else {
    filterData.sortValue = "Oldest first";
  }
  toggleDropdown("sort");
  useFilters(filterData);
}

function saveFeedLocation() {
  store.commit("changeFeedLocation", {
    state: currentState.value,
    city: currentCity.value,
  });
}

async function getStates() {
  try {
    const getState = await axios.get(
      "/countries-api/states/" + store.state.user.countryShortName
    );

    getState.data.results.forEach(async (state) => {
      const getCities = await axios.get(
        `/countries-api/cities/${store.state.user.countryShortName}/${state.stateid}`
      );

      let formatted = {
        state: state,
        cities: getCities.data.results,
      };

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
      return 0;
    });
  } catch (error) {
    return error;
  }
}

onMounted(async () => {
  getStates();
  await getFeeds();
});

function useFilters(filters) {
  if (feeds.value.length > 0) {
    filteredFeeds.value = feeds.value;
    // location filter

    if (
      filters.location.state !== "All" &&
      filters.location.state.length > 0 &&
      filters.location.city.length > 0
    ) {
      let locationFilter = filteredFeeds.value.filter((product) => {
        return (
          product.location.city
            .toLowerCase()
            .includes(filters.location.city.toLowerCase()) ||
          product.location.city
            .toLowerCase()
            .includes(
              filters.location.city.split(" ")[0].toString().toLowerCase()
            ) ||
          product.location.city
            .toLowerCase()
            .includes(
              filters.location.state.split(" ")[0].toString().toLowerCase()
            )
        );
      });
      filteredFeeds.value = locationFilter;
    }

    // propertyType filter
    if (filters.propertyType.length > 0) {
      if (filters.propertyType?.toLowerCase() !== "all") {
        let propertyTypeFilter = filteredFeeds.value.filter((product) => {
          if (filters.propertyType === "room and parlor") {
            return product.type === "room_parlor";
          } else {
            return product.type === filters.propertyType;
          }
        });
        filteredFeeds.value = propertyTypeFilter;
      }
    }

    // sort by time
    if (filters.sortValue.length > 0) {
      if (filters.sortValue === "Recommended") {
        filteredFeeds.value = sort(filteredFeeds.value);
      }
      if (filters.sortValue === "Newest first") {
        let sortedArray = filteredFeeds.value.sort((a, c) => {
          return new Date(c.dateUpdated) - new Date(a.dateUpdated);
        });
        filteredFeeds.value = sortedArray;
      }
      if (filters.sortValue === "Oldest first") {
        let sortedArray = filteredFeeds.value.sort((c, a) => {
          return new Date(c.dateUpdated) - new Date(a.dateUpdated);
        });
        filteredFeeds.value = sortedArray;
      }
    }

    const uniqueIds = [];
    const uniqueFeeds = filteredFeeds.value.filter((element) => {
      const isDuplicate = uniqueIds.includes(element._id);
      if (!isDuplicate) {
        uniqueIds.push(element._id);
        return true;
      }
      return false;
    });

    filteredFeeds.value = uniqueFeeds;
    if (filteredFeeds.value.length === 0) {
      title.value = `Habeep | No Feeds`;
    } else {
      title.value = `Habeep | Feeds(${filteredFeeds.value.length})`;
    }
  }
}

// manage video

async function playVideo(e) {
  if (e.target) {
    await e.target.play();
  }
}
async function pauseVideo(e) {
  if (e.target) {
    await e.target.pause();
  }
}
</script>

<style scoped>

.location::-webkit-scrollbar {
  width: 6px;
}

.location::-webkit-scrollbar-thumb {
  width: 10px;
  background-color: #71759d;
  border-radius: 10px;
}

.location::-webkit-scrollbar-track {
  box-shadow: inset 0 0 10px white;
}

.main::-webkit-scrollbar {
  width: 6px;
}

.main::-webkit-scrollbar-thumb {
  width: 5px;
  background-color: #71759d;
  border-radius: 10px;
}

.main::-webkit-scrollbar-track {
  box-shadow: inset 0 0 10px white;
}

.tabs::-webkit-scrollbar {
  display: none;
}

.tabs::-webkit-scrollbar-thumb {
  width: 0px;
  display: none;
  background-color: white;
  border-radius: 10px;
}

.feed-image {
  min-height: 177px;
  height: 100%;
  width: 100% !important;
  object-fit: cover;
  max-height: 185px !important;
}
</style>
