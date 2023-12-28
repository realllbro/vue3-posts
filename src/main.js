import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';

createApp(App).use(router).mount('#app');

import 'bootstrap/dist/js/bootstrap.js';

console.log('MODE: ', import.meta.env.MODE); //MODE:  development
console.log('BASE_URL: ', import.meta.env.BASE_URL); //BASE_URL:  /
console.log('PROD: ', import.meta.env.PROD); //PROD:  false
console.log('DEV: ', import.meta.env.DEV); //DEV:  true

console.log('VITE_APP_API_URL: ', import.meta.env.VITE_APP_API_URL); //MODE:  true
