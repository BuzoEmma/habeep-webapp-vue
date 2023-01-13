import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

export default createStore({
  state: {
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
    }
  },
  modules: {
  },

  plugins: [createPersistedState()]
})