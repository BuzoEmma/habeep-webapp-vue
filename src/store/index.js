import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
    state: {
        allStates: [],
        feedLocation: {
            city: '',
            state: ''
        },
        isAuthenticated: false,
        user: [],
        sessionId: '',
        listingProcess: {
            for: '',
            type: '',
            status: 'AVAILABLE',
            location: {},
            price: 0,
            title: '',
            features: [],
            bedrooms: 0,
            description: '',
            bathrooms: 0,
            plots: 0,
            size: 0,
            images: new FormData()
        }
    },
    mutations: {
        setAuthState(state, data) {
            state.isAuthenticated = data.authState;
            state.sessionId = data.sessionId;
            state.user = data.userDetails
        },
        setUserProfile(state, data) {
            state.user = data
        },
        unsetUserAuth(state) {
            state.isAuthenticated = false;
            state.sessionId = '';
            state.user = []
        },
        saveStates(state, data) {
            state.allStates = data
        },
        changeFeedLocation(state, data) {
            state.feedLocation = data
        },
        addSavedAd(state, data) {
            state.user.savedAds.push(data)
        },
        deleteSavedAd(state, data) {
            // state.user.savedAds.splice(state.user.savedAds.indexOf(data))
            let newSavedAds = state.user.savedAds.filter(ad => {
                return ad !== data
            })

            state.user.savedAds = newSavedAds
        },
        addDataToListing(state, data) {
            if (data.cast) {
                Object.keys(data.data).forEach(key => {
                    state.listingProcess[key] = data.data[key]
                })
            } else if (data.type === 'images') {
                state.listingProcess['images'] = data.data
            } else {
                state.listingProcess[data.type] = data.data
            }
        },
        deleteListingData(state) {
            state.listingProcess = {
                for: '',
                type: '',
                status: 'AVAILABLE',
                location: {},
                price: 0,
                title: '',
                bedrooms: 0,
                bathrooms: 0,
                description: '',
                features: [],
                size: 0,
                images: new FormData()
            }
        }
    },
    actions: {
        setAuth({ commit }, data) {
            commit('setAuthState', data)
        },
        setProfile({ commit }, data) {
            commit('setUserProfile', data)
        },
        unsetAuth({ commit }) {
            commit('unsetUserAuth')
        },
        saveStates({ commit }, data) {
            commit('saveStates', data)
        },
    },
    modules: {
    },
    getters: {
        sessionId(state) {
            return state.sessionId
        }
    },

    plugins: [createPersistedState()]
})