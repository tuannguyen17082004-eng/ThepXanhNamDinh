import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify from 'vue3-toastify';
import "vue3-toastify/dist/index.css";
import App from './views/App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '../public/styles/Homepage.css'
import '../public/styles/Player.css'
import '../public/styles/Root.css'

const app = createApp(App)

app.use(router)
app.use(Vue3Toastify, {
    autoClose: 3000,
})
app.use(createPinia())
app.mount('#app')