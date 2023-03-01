import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

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

        cookies.set('loggedIn', false)
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
    }
  },
  actions: {
    setAuth({commit}, data) {
        commit('setAuthState', data)
    },
    setProfile({commit}, data) {
        commit('setUserProfile', data)
    },
    unsetAuth({commit}) {
        commit('unsetUserAuth')
    },
    saveStates({commit}, data) {
        commit('saveStates', data)
    },
},
  modules: {
  },

  plugins: [createPersistedState()]
})