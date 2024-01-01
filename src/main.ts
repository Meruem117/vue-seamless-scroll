import { createApp } from 'vue'
import App from './App.vue'
import { VueSimpleScroll } from '../packages'

const app = createApp(App)
app.use(VueSimpleScroll)
app.mount('#app')
