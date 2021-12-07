import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

//set Authorization token in all common axios calls
const token = localStorage.getItem('user-token');
if (token) {
    axios.defaults.headers.common = {'Authorization':`Bearer ${token}`}
}

const app = createApp(App).use(router);
app.config.globalProperties.$http = axios; //Allow axios in all components this.$http.get
app.mount("#app");