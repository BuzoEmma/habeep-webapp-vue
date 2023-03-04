import { createRouter, createWebHistory } from 'vue-router'

import createStore from '../store/index'

function guardMyroute(to, from, next) {
    var isAuthenticated = false
    if (createStore.state.isAuthenticated) { isAuthenticated = true } else { isAuthenticated = false }
    if (isAuthenticated) {
        if (!createStore.state.user.verified) {
            next({ name: 'Verify' }) // go to '/verify';
        } else next() // allow to enter route
    } else {
        // console.log(to)
        next("/login?redirect=" + to.path) // go to '/login';
    }
}



function guardMyrouteForAgent(to, from, next) {
    var isAuthenticated = false
    if (createStore.state.isAuthenticated) { isAuthenticated = true } else { isAuthenticated = false }
    if (isAuthenticated) {
        if (!createStore.state.user.verified) {
            next({ name: 'Verify' }) // go to '/verify';
        } else {
            if (createStore.state.user.role === 'AGENT_IBO') {
                next()
            } else next({ name: 'IBO_Category_Agent' })
        } // allow to enter route
    } else {
        next("/login?redirect=" + to.path) // go to '/login';
    }
}

// pages
import Home from '../views/Home.vue'
import Feeds from '../views/Feeds.vue'

function changeHomeRoute() {
    if (createStore.state.isAuthenticated) {
        return Feeds
    } else return Home
}

// listings
import ListingSearch from '../views/listings/Search.vue'
import ListingProduct from '../views/listings/Product.vue'
import ListingAgent from '../views/listings/AgentAd.vue'

// posts
import AgentAds from '../views/profile/agents/post/Ads.vue'
import PostAd from '../views/profile/agents/post/Post.vue'


// profile
// user
import UserProfile from '../views/profile/user/Profile.vue'

// agents
import AgentProfile from '../views/profile/agents/Profile.vue'

// IBO
import IBO_ChooseCategory from '../views/profile/IBO/register/ChooseCategory.vue'
import IBO_Agent from '../views/profile/IBO/register/AgentForm.vue'
import IBO_User from '../views/profile/IBO/register/UserForm.vue'



// chats
import ChatIndex from '../views/chats/Index.vue'

// extras
import Blog from '../views/extras/BlogRoom.vue'
import TOS from '../views/extras/TermsOfService.vue'

// auth
import Register from '../views/Auth/Register.vue'
import Login from '../views/Auth/Login.vue'
import Logout from '../views/Auth/Logout.vue'
import ForgotPin from '../views/Auth/ForgotPin.vue'
import OTP from '../views/Auth/OTP_Validation.vue'

// fallbacks
import Error404 from '../views/fallbacks/404.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: changeHomeRoute(),
        meta: {
            title: "Home"
        }
    },
    // extras
    {
        path: '/blog',
        name: 'Blog',
        component: Blog
    },
    {
        path: '/terms-of-service',
        name: 'Terms-Of-Service',
        component: TOS
    },
    // listings
    {
        path: '/listings/search',
        name: 'Listings-search',
        component: ListingSearch
    },
    {
        path: '/listings/products/:id',
        name: 'Listings-product',
        component: ListingProduct
    },
    {
        path: '/listings/agent/products/:id',
        name: 'Listings-product-Agent',
        beforeEnter: guardMyrouteForAgent,
        component: ListingAgent
    },
    // profile
    {
        path: '/agents/profile/:id',
        name: 'Agent-profile',
        beforeEnter: guardMyrouteForAgent,
        component: AgentProfile
    },
    {
        path: '/agent/ads',
        beforeEnter: guardMyrouteForAgent,
        name: 'Agent-ads',
        component: AgentAds
    },
    {
        path: '/agent/ads/create',
        beforeEnter: guardMyrouteForAgent,
        name: 'Agent-ads-create',
        component: PostAd,
        meta: {
            title: "Create Ad"
        }
    },
    {
        path: '/user/profile/:id',
        name: 'User-profile',
        beforeEnter: guardMyroute,
        component: UserProfile,
        meta: {
            title: "Profile"
        }
    },

    // IBO
    {
        path: '/account/IBO/category',
        name: 'IBO_ChooseCategory',
        beforeEnter: guardMyroute,
        component: IBO_ChooseCategory,
        meta: {
            title: "Become an Agent"
        }
    },
    {
        path: '/account/IBO/category/agent',
        name: 'IBO_Category_Agent',
        beforeEnter: guardMyroute,
        component: IBO_Agent
    },
    {
        path: '/account/IBO/category/user',
        name: 'IBO_Category_User',
        beforeEnter: guardMyroute,
        component: IBO_User
    },

    // chats
    {
        path: '/chats',
        name: 'Chat',
        beforeEnter: guardMyroute,
        component: ChatIndex
    },
    // authentication
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            title: "Register"
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: "Login"
        }
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout
    },
    {
        path: '/forgot-pin',
        name: 'ForgotPin',
        component: ForgotPin
    },
    {
        path: '/verify-otp',
        name: 'OTP',
        component: OTP
    },


    { path: '/:pathMatch(.*)*', name: 'not-found', component: Error404 },
]



const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = `Habeep - ${to.meta.title}`;
    next();
})

router.resolve({
    name: 'not-found',
    params: { pathMatch: ['not', 'found'] },
}).href

export default router