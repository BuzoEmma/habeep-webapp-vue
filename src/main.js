import { createApp } from 'vue'
import './assets/css/style.css'
import './assets/css/tailwind.css'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import Toast from './components/reusables/Toast.vue'
import Preloader from './components/reusables/Preloader.vue'
import { MotionPlugin } from '@vueuse/motion'
import VueSocialSharing from 'vue-social-sharing'

import AvatarInitials from './components/reusables/AvatarInitials.vue'

import VueLazyLoad from 'vue3-lazyload'
import { createHead } from "@vueuse/head"




const myApp = createApp(App);

const head = createHead()


myApp.component('Toast', Toast)
myApp.component('Preloader', Preloader)
myApp.component('Avatar', AvatarInitials)

myApp.use(VueLazyLoad, {
    loading: 'Loading Media',
    error: 'Failed to load media',
})

myApp.use(MotionPlugin)
myApp.use(head)
myApp.use(VueSocialSharing)
myApp.use(store)
myApp.use(router)
myApp.mount('#app')
