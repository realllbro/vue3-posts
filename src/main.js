import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';

//plugin
import funcPlugins from './plugins/func';
import objPlugins from './plugins/obj';
import person from './plugins/person';

//디렉티브 (단건등록)
// import focus from '@/directives/focus';
// app.directive('focus', focus);

//글로벌 plugin
import globalComponents from '@/plugins/global-components';
// 1.디렉티브 글로벌 plugin 으로 등록
import globalDirectives from '@/plugins/global-directives';

const app = createApp(App);
/*
app.use(funcPlugins);
app.use(objPlugins, { name: '오브젝트플러그인' });
*/
app.use(person, { name: '부라더' });
app.use(globalComponents);
app.use(globalDirectives);

app.use(router);
app.mount('#app');

import 'bootstrap/dist/js/bootstrap.js';

console.log('MODE: ', import.meta.env.MODE); //MODE:  development
console.log('BASE_URL: ', import.meta.env.BASE_URL); //BASE_URL:  /
console.log('PROD: ', import.meta.env.PROD); //PROD:  false
console.log('DEV: ', import.meta.env.DEV); //DEV:  true

console.log('VITE_APP_API_URL: ', import.meta.env.VITE_APP_API_URL); //MODE:  true
