import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

createApp(App).use(router).mount('#app')

// Oui ???
const token = localStorage.getItem('user-token');
if (token) {
    axios.defaults.headers.common['Authorization'] = token;
}