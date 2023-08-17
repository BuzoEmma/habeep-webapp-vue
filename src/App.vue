<script setup>
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ref, reactive, onMounted, computed, watch } from "vue";
import { updateToken } from "./composables/axios";
import axios from "./composables/axios";


const store = useStore();
const router = useRouter();
const route = useRoute();


const computedAccessToken = computed(() => {
  return store.state.sessionId
})

watch(computedAccessToken, (newId) => {
  if (newId && newId.length > 0) {
    updateToken(newId)
  }
})

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
    if (store.state.isAuthenticated) {
      const user = await axios.get("/auth/user");

      if (user.data === "Unauthorized") {
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
    }
  } catch (error) {
    store.dispatch("unsetAuth");
    if (verifyAllowedRoles(route, 'user') === false) {
      router.replace("/login?redirect=" + router.currentRoute.value.fullPath + "?reload=true");
    }
  }
};


const allNotifications = ref([])

async function getNotifications() {
  allNotifications.value = []
  try {
    if (!store.state.isAuthenticated) {
      axios.defaults.headers.common = {
        Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI0YjVhYmQ5OTliZTU3ODUwZDc0MmMiLCJyb2xlIjoiQUdFTlQiLCJpYXQiOjE2ODM3NTUxOTJ9.NdYOgcJ7fT8JPkaA8dueK8Wwn1hLTiR7WmRvxKEZ3o8`
      };
    }

    if (store.state.isAuthenticated === true) {
      const notifs = await axios.get('/notification/get/user')
      if (notifs.data && notifs.data.data && notifs.data.data.length > 0) {
        notifs.data.data.forEach(notif => {
          allNotifications.value.push(notif)
        })
      } else {
        const allnotifs = await axios.get('/notification/get/all')
        allNotifications.value = allnotifs.data.data
      }
    } else {
      const allnotifs = await axios.get('/notification/get/all')
      allNotifications.value = allnotifs.data.data
    }
  } catch (error) {
    return;
  }
}

async function takeNotificationAction(notif) {
  if (notif.additionalInfo) {
        if (notif.additionalInfo.type === 'newProduct') {
            await deleteNotification(notif, null)
            router.push('/listings/products/' + notif.additionalInfo.id)
        }
    } else if (notif.msg === 'Verify your account to access all habeep features') {
        router.push('/verify-otp?reason=user_verification&email=' + store.state.user.email)
    } else {
        deleteNotification(notif, null)
    }

  await deleteNotification(notif, null)
}

async function deleteNotification(notif, limit) {
  try {
    if (limit !== 'all') {
      allNotifications.value.splice(allNotifications.value.indexOf(notif))
    }
    if (notif.users !== ['all']) {
      await axios.delete('/notification/delete/' + notif._id)
    }

    return;
  } catch (error) {
    return;
  }
}

onMounted(() => {
  getUser();
  getNotifications()
});
</script>

<template>
  <div class="w-screen h-screen relative">
    <router-view class="wrapper" v-slot="{ Component }">
      <transition name="scale-slide">
        <component :is="Component" />
      </transition>
    </router-view>


    <div
      class="flex-col flex fixed bottom-4 md:bottom-10 h-fit z-50 items-center w-full sm:w-fit justify-end p-2 gap-y-1 right-2 md:right-12"
      v-if="allNotifications.length > 0 && $store.state.isAuthenticated">
      <div class="flex-row-center w-full p-4 notif justify-between cursor-pointer" @click="takeNotificationAction(notif)"
        v-motion :initial="{ y: -100 }" :enter="{ y: 0 }" :tapped="{ opacity: 0, transition: { delay: 100 } }"
        v-for="notif of allNotifications.slice(0, 2)" :key="notif">
        <!-- transition: { type: 'spring', damping: 10, stiffness: 5, mass: 0.1} -->
        <!-- :tapped="{x: 100, opacity: 0.3, transition: { delay: 10}}" -->
        <div class="flex-row-center h-full w-full gap-x-4">
          <img :src="notif.img" alt="" class="rounded-2xl w-12 h-12"
            v-if="notif.img && notif.img.toString().includes('mp4') == false">
          <video :src="notif.img" loop preload="auto" class="rounded-2xl w-12 h-12 notif-video" v-else autoplay
            muted></video>
          <div class="flex-col flex items-start gap-y-1">
            <h3 class="text-webapp text-sm font-medium">{{ notif.subject }}</h3>
            <span class="text-sub-webapp font-light text-xs">{{ notif.msg }}</span>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg"
          v-if="!notif.additionalInfo && notif.msg !== 'Verify your account to access all habeep features'"
          viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path
            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" v-else viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd" />
        </svg>

      </div>
    </div>
  </div>
</template>

<style>
.notif {
  background: #F7F7F7;
  border-radius: 16px;
  max-width: 400px;
  min-width: 200px;
  max-height: 100px !important;
}

.notif-video {
  /* width: 37px !important;
    height: 37px !important; */
  object-fit: cover;
}

.wrapper {
  width: 100%;
  min-height: 100vh;
}

.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.1s ease;
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