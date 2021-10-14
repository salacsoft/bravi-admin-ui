import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './index.css'
import 'mosha-vue-toastify/dist/style.css'



const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
