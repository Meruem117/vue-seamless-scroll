import { createApp } from 'vue'
import App from './App.vue'
import { VueSeamlessScroll } from '../dist/vue-seamless-scroll.es.js'

const app = createApp(App)
app.use(VueSeamlessScroll)
app.mount('#app')
