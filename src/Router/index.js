import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../views/login.vue';
import resetpass from '../views/ResetPass.vue';

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
    }
];
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;