import { createApp } from 'vue'
import './assets/css/style.css'
import './assets/css/tailwind.css'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import Toast from './components/reusables/Toast.vue'
import Preloader from './components/reusables/Preloader.vue'
import { MotionPlugin } from '@vueuse/motion'



import { globalCookiesConfig } from "vue3-cookies";
globalCookiesConfig({
    expireTimes: 60 * 60 * 3,
});


const myApp = createApp(App);


myApp.component('Toast', Toast)
myApp.component('Preloader', Preloader)

myApp.use(MotionPlugin)
myApp.use(store)
myApp.use(router)
myApp.mount('#app')
