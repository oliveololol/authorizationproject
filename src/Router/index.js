import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../views/login.vue';
import resetpass from '../views/ResetPass.vue';
import logtable from '../views/LogTable.vue';
import ChangeData from '../views/ChangeData.vue';
import store from '../store';


Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/resetpass',
        name: 'resetpass',
        component: resetpass,
    },
    {
        path:'/logtable',
        name: 'logtable',
        component:logtable,
        meta:{requiresAuth:  true}
    },
    {
        path:'/ChangeData',
        name:'ChangeData',
        component:ChangeData,
        meta:{requiresAuth:  true}
    }
];
const router = new VueRouter({
    mode: 'history',
    base: process.env.baseURL,
    routes,
});

router.beforeEach((to, from, next) => {
     
    if (to.meta.requiresAuth && !store.state.isUserLoggedIn) {
    
      next('/login');
    } else {
      
      next();
    }
  });
  
export default router;