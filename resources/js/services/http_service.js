import store from '../store';
import axios, * as others from 'axios';

export function http() {
    return axios.create({
        baseURL: store.state.apiUrl
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