import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,    
    isLoad: false,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isUserLoggedIn = !!(token);
    },
    setUser(state, user) {
      console.log(user)
      state.user = user;
    },
    setIsUserLoggedIn(state, isUserLoggedIn) {
      state.isUserLoggedIn = isUserLoggedIn;
    },
    setIsLoad(state, isLoad) {
      state.isLoad = isLoad;
    },
  },
  actions: {
    setToken({commit}, token) {
      commit('setToken', token);
      
    },
    setUser({commit}, user) {
      commit('setUser', user);
    },
    setIsLoad({commit}, isLoad) {
      commit('setIsLoad', isLoad);
    },
    setLogout({commit}){
      commit('setUser', null);
      commit('setToken', null);
      commit('setIsLoad', false);
    }
  },
});