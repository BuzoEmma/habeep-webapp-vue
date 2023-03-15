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
// const plugins = {
//     install() {
//         myApp.saveAd = saveAd;
//         .prototype.$saveAd = saveAd;
//     }
//   }

// myApp.use(plugins)

myApp.component('Toast', Toast)
myApp.component('Preloader', Preloader)

myApp.use(router)
myApp.use(store)
myApp.use(MotionPlugin)
myApp.mount('#app')


