import type { App } from 'vue'
import { forEach } from 'lodash-es'
import * as components from './components'

export const VueSimpleScroll = {
    install: (app: App) => {
        forEach(components, component => {
            app.component(component.name, component)
        })
    }
}

export { components }
