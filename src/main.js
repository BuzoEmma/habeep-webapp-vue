import { createApp } from 'vue'
import './assets/css/style.css'
import './assets/css/tailwind.css'
import './assets/css/maz-ui.css'
import App from './App.vue'
import { router, routes } from './router/index.js'
import store from './store'
import Toast from './components/reusables/Toast.vue'
import Preloader from './components/reusables/Preloader.vue'
import { MotionPlugin } from '@vueuse/motion'
import VueSocialSharing from 'vue-social-sharing'

import AvatarInitials from './components/reusables/AvatarInitials.vue'
import SkeletonLoader from './components/reusables/SkeletonLoader.vue'
import PriceFormatter from './components/reusables/PriceFormatter.vue'

import { createHead } from "@vueuse/head"

// markdown editor
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});


const myApp = createApp(App);

const head = createHead()

myApp.component('Toast', Toast)
myApp.component('Preloader', Preloader)
myApp.component('Skeleton', SkeletonLoader)
myApp.component('Avatar', AvatarInitials)
myApp.component('PriceFormatter', PriceFormatter)

myApp.use(MotionPlugin)
myApp.use(VMdPreview);
myApp.use(head)
myApp.use(VueSocialSharing)
myApp.use(store)
myApp.use(router)
myApp.mount('#app')


// import generateSitemap from "vue-router-tiny-sitemap"
// generateSitemap(routes, "https://habeep.org")