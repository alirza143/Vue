import Vue from "vue";
import Router from 'vue-router';
import Welcome from './views/Welcome.vue';
import Categories from './views/Categories.vue';
import Login from './views/authentication/Login.vue';
import Register from './views/authentication/Registration.vue';
import ForgetPassword from './views/authentication/ForgetPassword.vue';
import Home from './views/Home.vue';
import * as auth from './services/auth_service';

Vue.use(Router);

const routes = [{
        path: '/home',
        name: 'home',
        component: Home,
        children: [{
                path: '',
                name: 'dashboard',
                component: Welcome
            },
            {
                path: 'categories',
                name: 'catagories',
                component: Categories
            },
        ],
        beforeEnter(to, from, next) {
            if (!auth.isLoggedIn()) {
                next("/login");
            } else {
                next()
            }
        }
    },

    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/forgetpassword',
        name: 'forgetPassword',
        component: ForgetPassword
    }
];

const router = new Router({
    routes: routes
});

export default router;