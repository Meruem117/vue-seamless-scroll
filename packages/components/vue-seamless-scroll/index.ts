import type { App, Plugin } from 'vue'
import VueSeamlessScroll from './index.vue'

export type { Props as VueSeamlessScrollProps } from './index.vue'

VueSeamlessScroll.install = (app: App) => {
    app.component(VueSeamlessScroll.name, VueSeamlessScroll)
    return app
}

export default VueSeamlessScroll as typeof VueSeamlessScroll & Plugin
