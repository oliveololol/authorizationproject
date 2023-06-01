import Vue from 'vue'
import App from './App.vue'
import router from './Router';
import store from './store';
import Vuelidate from 'vuelidate';
import {sync} from 'vuex-router-sync';
import {i18n} from './plugins/i18n';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    info: '#65acfc',
    success: '#26b672',
    error: '#ff7676',
    primary: '#036ad4',
    fortext: '#3d3d3d',
  },
  // iconfont: 'mdiSvg' // 'md'  'mdi'  'fa'  'fa4'
  icons: {
    iconfont: 'md', // 'mdi'  'mdiSvg'  'md'  'fa'  'fa4'  'faSvg'
  },
})

Vue.use(Vuelidate);

sync(store, router);

Vue.config.productionTip = false

new Vue({
  colors,
  vuetify,
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')