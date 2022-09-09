// this is file is responsible 
// get url from frontpage pass it to laravel api routes.
import {get } from 'lodash';
import { http, httpFile } from './http_service';

// import jwt from 'jsonwebtoken'

export function register(url, data) {
    return http().post(`${url}`, data)
}

export function login(url, data) {
    return http().post(`${url}`, data)
        .then(response => {
            if (response.status === 200) {
                setToken(response);
                getAccessToken
            }
            return response;
        })
}

function setToken(token) {
    // const key = jwt.sign({ user: token }, 'leavelVueJs');
    console.log(token);
    localStorage.removeItem('access-token-for-vue');
    localStorage.setItem('access-token-for-vue', token.data.access_token);
}

export function isLoggedIn() {
    if (localStorage.getItem('access-token-for-vue') === null) {
        return false;
    }
    return true;
}


export function logout() {
    http().get('logout');
    localStorage.removeItem('access-token-for-vue')
}

export function getAccessToken(token) {
    const accesstoken = localStorage.getItem('access-token-for-vue');
    return accesstoken;
}