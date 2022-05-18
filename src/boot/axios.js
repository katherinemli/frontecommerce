import Vue from 'vue';
import axios from 'axios';

Vue.prototype.$axios = axios;

const api = axios.create({ baseURL: 'https://apirestecom.herokuapp.com' });
const unsplash = axios.create({ baseURL: 'https://source.unsplash.com/collection/54393494/480x480' });
Vue.prototype.$api = api;
Vue.prototype.$unsplash = unsplash;

export { axios, api, unsplash };
