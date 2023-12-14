import './assets/main.scss'

import { createApp } from 'vue'
import { VueQueryPlugin } from 'vue-query'

import App from './App.vue'

const app = createApp(App)

app.use(VueQueryPlugin)

app.mount('#app')
