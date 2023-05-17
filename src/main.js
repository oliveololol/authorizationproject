import Vue from 'vue'
import App from './App.vue'
import Router from './Router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  Router,
  store,
  render: h => h(App),
}).$mount('#app')
