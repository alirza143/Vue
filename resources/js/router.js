// this file handle all vue routets. routes that view use to navigate between pages.
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
        component: Home,
        children: [{
                path: '',
                name: 'dashboard',
                component: Welcome
            },
            {
                path: 'categories',
                name: 'catagoriesView',
                component: Categories
            },
        ],
        beforeEnter(to, from, next) {
            if (auth.isLoggedIn()) {
                console.log("if hoe");
                next();
            } else {
                console.log("else ho");
                next('login');
            }
        }
    },

    {
        path: '/login',
        name: 'loginView',
        component: Login,
        beforeEnter(to, from, next) {
            console.log(to);
            if (!auth.isLoggedIn()) {
                next()
            } else {
                next('/login');
            }
        }
    },
    {
        path: '/register',
        name: 'registerView',
        component: Register
    },
    {
        path: '/forgetpassword',
        name: 'forgetPasswordView',
        component: ForgetPassword
    }
];

const router = new Router({
    mode: 'history',
    routes: routes
});

export default router;