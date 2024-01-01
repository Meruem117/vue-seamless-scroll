import type { App } from 'vue'
import VueSimpleScroll from './components/vue-simple-scroll.vue'

VueSimpleScroll.install = (app: App) => {
    app.component(VueSimpleScroll.name, VueSimpleScroll)
}

export default VueSimpleScroll
