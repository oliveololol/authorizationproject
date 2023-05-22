import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../views/login.vue';
import resetpass from '../views/ResetPass.vue';
import logtable from '../views/LogTable.vue'

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
    }
];
const router = new VueRouter({
    mode: 'history',
    base: process.env.baseURL,
    routes,
});

export default router;