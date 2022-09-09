import store from '../store';
import axios, * as others from 'axios';
import * as auth from './auth_service'

export function http() {
    return axios.create({
        baseURL: store.state.apiUrl,
        // add headers beacuse logout return unauthorizes
        headers: {
            Authorization: 'Bearer ' + auth.getAccessToken()
        }
    })
}

export function httpFile() {
    return axios.create({
        baseURL: store.state.apiUrl,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}