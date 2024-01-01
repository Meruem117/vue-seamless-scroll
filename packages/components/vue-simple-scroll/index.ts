import type { App } from 'vue'
import VueSimpleScroll from './index.vue'

VueSimpleScroll.install = (app: App) => {
    app.component(VueSimpleScroll.name, VueSimpleScroll)
}

export default VueSimpleScroll
