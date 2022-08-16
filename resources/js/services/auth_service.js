import {http, httpFile} from './http_service';

// import jwt from 'jsonwebtoken'

export function register(url, data) {
    return http().post(`${url}`, data)
}

export function login(url, data) {
    return http().post(`${url}`, data)
        .then(response => {
            if (response.status === 200) {
                setToken(response);
            }
            return response;
        })
}

function setToken(token) {
    // const key = jwt.sign({ user: token }, 'leavelVueJs');
    localStorage.setItem('access-token-for-vue', JSON.stringify(token.user));
}

export function isLoggedIn() {
    return localStorage.getItem('access-token-for-vue') != null;
}
