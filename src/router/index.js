import { createRouter, createWebHistory } from 'vue-router'

import createStore from '../store/index'

function guardMyroute(to, from, next) {
    var isAuthenticated = false
    if (createStore.state.isAuthenticated) { isAuthenticated = true } else { isAuthenticated = false }
    if (isAuthenticated) {
        if (!createStore.state.user.verified) {
            next({ name: 'OTP', query: { reason: 'user_verification', email: createStore.state.user.email}}) // go to '/verify';
        } else next() // allow to enter route
    } else {
        // console.log(to)
        next("/login?redirect=" + to.path + "?reloadApp=true") // go to '/login';
    }
}



function guardMyrouteForAgent(to, from, next) {
    var isAuthenticated = false
    if (createStore.state.isAuthenticated) { isAuthenticated = true } else { isAuthenticated = false }
    if (isAuthenticated) {
        if (!createStore.state.user.verified) {
            next({ name: 'OTP', query: { reason: 'user_verification', email: createStore.state.user.email}}) // go to '/verify'; // go to '/verify';
        } else {
            if (createStore.state.user.role === 'AGENT') {
                next()
            } else next({ name: 'IBO_Category_Agent' })
        } // allow to enter route
    } else {
        next("/login?redirect=" + to.path + "?reloadApp=true") // go to '/login';
    }
}

function guardMyrouteForUSERIBO(to, from, next) {
    var isAuthenticated = false
    if (createStore.state.isAuthenticated) { isAuthenticated = true } else { isAuthenticated = false }
    if (isAuthenticated) {
        if (!createStore.state.user.verified) {
            next({ name: 'OTP', query: { reason: 'user_verification', email: createStore.state.user.email}}) // go to '/verify'; // go to '/verify';
        } else {
            if (createStore.state.user.role !== "TENANT") {
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
        return '/feeds'
    } else return '/home'
}

// extras
import Blogs from '../views/extras/BlogRoom.vue'
import TOS from '../views/extras/TermsOfService.vue'

// auth
import Register from '../views/Auth/Register.vue'
import Login from '../views/Auth/Login.vue'
import Logout from '../views/Auth/Logout.vue'
import ForgotPin from '../views/Auth/ForgotPin.vue'
import OTP from '../views/Auth/OTP_Validation.vue'

const routes = [
    {
        path: '/',
        redirect: changeHomeRoute()
        
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        // meta: {
        //     title: "Search"
        // }
    },
    {
        path: '/feeds',
        component: Feeds,
        beforeEnter: guardMyroute,
        name: 'Feeds',
        // meta: {
        //     title: 'Feeds'
        // }
    },
    // extras
    {
        path: '/blog',
        name: 'Blogs',
        component: Blogs,
        meta: {
            title: "Blogs"
        }
    },
    {
        path: '/blog/:id',
        name: 'BlogPage',
        component: () => import('../views/extras/BlogPage.vue'),
    },
    {
        path: '/help',
        name: 'FAQ',
        component: () => import('../views/extras/FAQ.vue'),
        meta: {
            title: "Help"
        }
    },
    {
        path: '/terms-of-service',
        name: 'Terms-Of-Service',
        component: TOS,
        meta: {
            title: "Terms of Service"
        }
    },
    // listings
    {
        path: '/listings/search',
        name: 'Listings-search',
        component: () => import('../views/listings/Search.vue'),
        // meta: {
        //     title: "Search ads"
        // }
    },
    {
        path: '/listings/products/:id',
        name: 'Listings-product',
        component: () => import('../views/listings/Product.vue'),
        // meta: {
        //     title: "Product"
        // }
    },
    {
        path: '/listings/agent/products/:id',
        name: 'Listings-product-Agent',
        beforeEnter: guardMyrouteForAgent,
        component: () => import('../views/listings/AgentAd.vue'),
        meta: {
            title: "Agent Listing"
        }
    },
    // profile
    {
        path: '/:username',
        name: 'UserProfiles',
        component: () => import('../views/profile/agents/Profile.vue'),
        // meta: {
        //     title: 'Profile'
        // }
    },
    {
        path: '/agent/ads',
        beforeEnter: guardMyrouteForAgent,
        name: 'Agent-ads',
        component: () => import('../views/profile/agents/post/Ads.vue'),
        meta: {
            title: "Agent Listings"
        }
    },
    {
        path: '/agent/ads/create',
        beforeEnter: guardMyrouteForAgent,
        name: 'Agent-ads-create',
        component: () => import('../views/profile/agents/post/Post.vue'),
        meta: {
            title: "Create Ad"
        }
    },
    {
        path: '/user/profile/:id',
        name: 'User-profile',
        beforeEnter: guardMyroute,
        component: () => import('../views/profile/user/Profile.vue'),
        // meta: {
        //     title: "Profile"
        // }
    },

    // IBO
    {
        path: '/account/IBO/category',
        name: 'IBO_ChooseCategory',
        beforeEnter: guardMyrouteForUSERIBO,
        component: () => import('../views/profile/IBO/register/ChooseCategory.vue'),
        meta: {
            title: "Become an Affiliated User"
        }
    },
    {
        path: '/account/IBO/category/agent',
        name: 'IBO_Category_Agent',
        beforeEnter: guardMyroute,
        component: () => import('../views/profile/IBO/register/AgentForm.vue'),
        meta: {
            title: "Become an Agent"
        }
    },
    {
        path: '/account/IBO/category/user',
        name: 'IBO_Category_User',
        beforeEnter: guardMyroute,
        component: () => import('../views/profile/IBO/register/UserForm.vue'),
        // meta: {
        //     title: "Become an IBO User"
        // }
    },

    // chats
    {
        path: '/chats',
        name: 'Chat',
        beforeEnter: guardMyroute,
        component: () =>  import('../views/chats/Index.vue'),
        // meta: {
        //     title: "Messages"
        // }
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
            title: "Login",
            description: "Login with your email address and pin. Note that all your information are enncrypted and safe."
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
        component: ForgotPin,
        meta: {
            title: "Recover pin"
        }
    },
    {
        path: '/reset-pin',
        name: 'ResetPin',
        component: () => import('../views/Auth/ResetPin.vue'),
        meta: {
            title: "Recover pin"
        }
    },
    {
        path: '/verify-otp',
        name: 'OTP',
        component: OTP,
        meta: {
            title: "Verify email"
        }
    },
    // wallet
    {
        path: '/wallet',
        name: 'Wallet',
        component: () => import('../views/wallet/Index.vue'),
        beforeEnter: guardMyroute,
        meta: {
            title: "Wallet"
        }
    },

    {
        path: '/not-found',
        name: 'not-found-route',
        component: () => import('../views/fallbacks/404.vue')
      },

    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/fallbacks/404.vue'), meta: { title: 'Page not Found' } },
]



const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta && to.meta.title) {
        document.title = `Habeep | ${to.meta.title }`;
    }
    if (to.query.reload) {
        next({
            query: null,
            replace: true,
            path: to.path
        })
    } else next()
})

router.resolve({
    name: 'not-found',
    params: { pathMatch: ['not', 'found'] },
}).href

export default router