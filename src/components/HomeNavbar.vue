<template>
  <!-- Header / Navbar -->
  <div
    class="absolute w-screen h-screen top-0 opacity-50"
    @click="toggleMobileNav"
    v-if="onMobileNav"
    style="background: #161622"
  ></div>

  <div
    class="flex flex-row items-center relative pt-3 pb-2 justify-between w-full px-6 2xl:px-44 border-b border-b-textfieldbg"
  >
    <div class="logo flex flex-row items-center gap-x-2 cursor-pointer">
      <img @click="$router.go()" src="../assets/icons/logo.svg" alt="Logo" />
      <span @click="$router.push('/')" class="text-primary text-2xl"
        >Habeep</span
      >
    </div>

    <div
      class="absolute w-screen h-screen top-2 opacity-50 -ml-[10rem]"
      @click="toggleNav"
      v-if="onNavDropdown"
    ></div>

    <div class="flex-row items-center w-fit gap-x-6 divide-x md:flex hidden">
      <!-- download app on stores -->
      <div class="flex flex-row items-center gap-x-5">
        <a
          href="https://apps.apple.com/us/app/habeep/id6450388013"
          target="_blank"
          class="no-underline"
          style="
            outline: 2px solid #1b49ff;
            /* outline-offset: 2px; */
            border-radius: 7px;
          "
        >
          <img src="../assets/icons/download-app-apple2.svg" alt="" />
        </a>

        <a
          href="https://play.google.com/store/apps/details?id=org.habeep"
          target="_blank"
          class="no-underline"
          style="
            outline: 2px solid #1b49ff;
            border-radius: 7px;
            /* outline-offset: 1px; */
          "
        >
          <img src="../assets/icons/download-app-google2.svg" alt="" />
        </a>
      </div>

      <div class="flex flex-row gap-x-10 items-start md:items-center pl-6">
        <span
          class="uppercase text-lg text-webapp cursor-pointer"
          :class="{
            'text-blue-700': $route.fullPath.includes('blog') === true,
          }"
          @click="$router.push('/blog')"
          >BLOG</span
        >
        <div
          class="flex flex-row items-center gap-x-2 min-w-[40px] min-h-[40px]"
          @click="toggleNav"
        >
          <img
            src="../assets/icons/user.svg"
            alt=""
            v-if="!$store.state.isAuthenticated"
          />

          <img
            :src="$store.state.user.userProfileImage"
            class="w-10 h-10 rounded-full"
            v-else-if="
              $store.state.user.userProfileImage !==
              'https://i.ibb.co/gtpxMJz/21.png'
            "
            alt=""
          />
          <Avatar
            size="100%"
            class="w-10 h-10 min-h-[40px] min-w-[40px]"
            v-if="
              $store.state.user.userProfileImage ===
                'https://i.ibb.co/gtpxMJz/21.png' &&
              $store.state.isAuthenticated
            "
            :fname="$store.state.user.fname"
            :lname="$store.state.user.surname"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            :class="{ 'rotate-180': onNavDropdown }"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="#0A1045"
            class="w-5 h-5 transition-all"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="flex flex-row items-center gap-x-5 lg:hidden">
      <img
        src="../assets/icons/search.svg"
        @click="$emit('toggleSearch')"
        class="flex md:hidden"
        v-if="$route.name === 'Feeds'"
        alt=""
      />
      <img
        src="../assets/icons/mobile-nav.svg"
        @click="toggleMobileNav"
        class="flex md:hidden"
        alt=""
      />
    </div>

    <!-- Navigation Menu -->

    <div
      v-if="onNavDropdown || onMobileNav"
      id="navbar"
      :class="{ 'right-2 top-20': onMobileNav }"
      v-motion-slide-top
      :delay="200"
      class="flex flex-col drop-shadow-lg shadow-xl nav bg-white rounded-xl border py-6 border-gray-300 absolute top-16 right-20 z-50"
      style="width: 250px"
    >
      <div class="w-full pl-[13px] py-[11px] nav-item">
        <p
          @click="$router.push('/home')"
          class="text-sm text-webapp"
          :class="{ 'text-blue-600': $route.name === 'Home' }"
        >
          Home
        </p>
      </div>

      <div
        class="w-full pl-[13px] py-[11px] nav-item"
        v-if="$store.state.isAuthenticated && $route.name !== 'Feeds'"
      >
        <p
          @click="$router.push('/feeds')"
          class="text-sm text-webapp"
          :class="{ 'text-blue-600': $route.name === 'Feeds' }"
        >
          Feeds
        </p>
      </div>

      <div
        class="w-full pl-[13px] py-[11px] nav-item"
        v-if="$route.name === 'Feeds' && $store.state.isAuthenticated"
      >
        <p
          @click="$router.go()"
          class="text-sm text-webapp"
          :class="{ 'text-blue-600': $route.name === 'Feeds' }"
        >
          Feeds
        </p>
      </div>

      <div class="w-full pl-[13px] py-[11px] nav-item">
        <p
          @click="$router.push('/listings/search')"
          class="text-sm text-webapp"
          :class="{ 'text-primary': $route.name === 'Listings-search' }"
        >
          Search
        </p>
      </div>

      <div class="w-full pl-[13px] nav-item">
        <p
          @click="$router.push('/chats')"
          class="text-sm text-webapp py-[11px]"
          :class="{ 'text-blue-700': $route.name === 'Chat' }"
          v-if="$store.state.isAuthenticated"
        >
          Message
        </p>
      </div>

      <div class="w-full pl-[13px] nav-item">
        <p
          @click="$router.push('/user/profile/' + $store.state.user._id)"
          class="text-sm text-webapp py-[11px]"
          :class="{ 'text-blue-700': $route.name === 'User-profile' }"
          v-if="$store.state.isAuthenticated"
        >
          Account
        </p>
      </div>

      <hr class="my-1" />

      <div
        class="w-full pl-[13px] py-[11px] nav-item"
        v-if="
          $store.state.isAuthenticated && $store.state.user.role === 'AGENT'
        "
      >
        <p
          @click="$router.push('/agent/ads')"
          class="text-sm text-webapp"
          :class="{
            'text-blue-700':
              $route.name.includes === 'Agent-ads' ||
              $route.name === 'Agent-ads-create',
          }"
        >
          Post an Ad
        </p>
      </div>

      <div
        class="w-full pl-[13px] py-[11px] nav-item"
        v-if="$store.state.isAuthenticated && $store.state.user.role === 'USER'"
      >
        <p
          @click="$router.push('/account/IBO/category')"
          class="text-sm text-webapp"
          :class="{ 'text-blue-700': $route.name.includes('IBO') === true }"
        >
          Become an Agent/Tenant
        </p>
      </div>

      <div
        class="w-full pl-[13px] py-[11px] nav-item"
        v-if="
          $store.state.isAuthenticated &&
          ($store.state.user.role === 'TENANT' || $store.state.user.isTenant) &&
          $store.state.user.role !== 'AGENT'
        "
      >
        <p
          @click="$router.push('/account/IBO/category/agent')"
          class="text-sm text-webapp"
          :class="{ 'text-blue-700': $route.name.includes('IBO') === true }"
        >
          Become an Agent
        </p>
      </div>

      <div class="w-full pl-[13px] py-[11px] nav-item md:hidden">
        <span
          class="text-sm text-webapp mobile-nav-item cursor-pointer"
          :class="{
            'text-blue-700': $route.fullPath.includes('blog') === true,
          }"
          @click="$router.push('/blog')"
          >BLOG</span
        >
      </div>

      <div
        class="w-full pl-[13px] py-[11px] nav-item"
        v-if="$store.state.isAuthenticated"
      >
        <p
          @click="$router.push('/wallet')"
          class="text-sm text-webapp cursor-pointer"
          :class="{ 'text-blue-700': $route.name === 'Wallet' }"
        >
          Wallet
        </p>
      </div>

      <div class="px-[11px]" v-if="!$store.state.isAuthenticated">
        <div
          class="flex flex-row items-center justify-between w-full rounded-full p-2 mt-8 border border-gray-300 cursor-pointer"
          @click="$router.push('/login')"
        >
          <img src="../assets/icons/logo-mini.svg" alt="" />
          <span class="text-lg text-webapp cursor-pointer">Login</span>
          <span></span>
        </div>
      </div>
      <div class="px-[11px]" v-else>
        <div
          class="flex flex-row items-center justify-between w-full rounded-full p-2 mt-8 border border-gray-300 cursor-pointer"
          @click="$router.push('/logout')"
        >
          <img src="../assets/icons/logo-mini.svg" alt="" />
          <span class="text-lg text-webapp cursor-pointer">Logout</span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const emit = defineEmits(["closeNav", "openNav"]);

const store = useStore();

const onNavDropdown = ref(false);
const onMobileNav = ref(false);

store.commit("changeNavState", false);

function toggleNav() {
  onNavDropdown.value = !onNavDropdown.value;
  store.commit("changeNavState", onNavDropdown.value);
  if (!onNavDropdown.value) {
    emit("closeNav");
  } else emit("openNav");
}
function toggleMobileNav() {
  onMobileNav.value = !onMobileNav.value;
  store.commit("changeNavState", onMobileNav.value);
  if (!onMobileNav.value) {
    emit("closeNav");
  } else emit("openNav");
}
</script>

<style scoped>
input::placeholder {
  color: #b1b4cd;
  font-size: 16px;
}

#navbar p {
  cursor: pointer;
}

input {
  outline: none;
}

div.nav div.nav-item:hover {
  background: #eaeefa;
}
</style>
