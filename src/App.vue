<script setup>
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import axios from "./composables/axios";
import { ref, reactive, onMounted } from "vue";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const store = useStore();
const router = useRouter();
const route = useRoute();


function verifyAllowedRoles(route, role) {
  if (role === 'random') {
    return false;
  }
  if (role === 'user') {
    if (route.name === 'Home')
      return true
    if (route.name === 'Main')
      return true
    if (route.name === 'Blog')
      return true
    if (route.name === 'Terms-Of-Service')
      return true
    if (route.name === 'ForgotPin')
      return true
    if (route.name === 'ResetPin')
      return true
    if (route.name === 'OTP')
      return true
    if (route.name === 'Login')
      return true
    if (route.name === 'Wallet')
      return true
  }
}

const getUser = async () => {
  try {
    const user = await axios.get("/auth/user");
    const loggedIn = cookies.get("loggedIn");
    if (user.data === "Unauthorized" || !loggedIn) {
      store.dispatch("unsetAuth");
      if (verifyAllowedRoles(route, 'user') === false) {
        router.replace("/login?redirect=" + router.currentRoute.value.fullPath + "?reload=true");
      }
    } else {
      let mutate = {
        sessionId: store.state.sessionId,
        authState: true,
        userDetails: user.data,
      };
      store.dispatch("setAuth", mutate);
    }
  } catch (error) {
    store.dispatch("unsetAuth");
    if (verifyAllowedRoles(route, 'user') === false || !loggedIn) {
      router.replace("/login?redirect=" + router.currentRoute.value.fullPath + "?reload=true");
    }
  }
};

onMounted(() => {
  getUser();
});
</script>

<template>
  <router-view class="wrapper" v-slot="{ Component }">
    <transition name="scale-slide">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.wrapper {
  width: 100%;
  min-height: 100vh;
}

.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.35s ease;
}

.scale-slide-enter-from {
  left: -100%;
}

.scale-slide-enter-to {
  left: 0%;
}

.scale-slide-leave-from {
  transform: scale(1);
}

.scale-slide-leave-to {
  transform: scale(0.8);
}
</style>