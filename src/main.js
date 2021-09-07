import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './index.css'
import 'mosha-vue-toastify/dist/style.css'

createApp(App).use(store).use(router).mount('#app')
