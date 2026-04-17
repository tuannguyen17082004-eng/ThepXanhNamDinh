import { createApp } from 'vue'
import App from './views/App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '../public/styles/Homepage.css'
import '../public/styles/Player.css'
import '../public/styles/Root.css'

const app = createApp(App).use(router).mount('#app')