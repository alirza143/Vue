import Vue from "vue";
import Vuex from 'vuex'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        apiUrl: 'http://127.0.0.1:8000/api/',
        serverPath: 'http://127.0.0.1:8000/',
        files: 'http://127.0.0.1:8000/storage/',
    },
    mutations: {},
    actions: {}

})