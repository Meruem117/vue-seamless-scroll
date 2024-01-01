import type { App } from 'vue'
import VueSimpleScroll from './components/vue-simple-scroll.vue'

export default ({
    install: (app: App) => {
        app.component(VueSimpleScroll.name, VueSimpleScroll)
    }
})