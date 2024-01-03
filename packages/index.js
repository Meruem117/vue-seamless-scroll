import VueSeamlessScroll from './vue-seamless-scroll'

const components = [VueSeamlessScroll]

const install = function (Vue) {
    components.forEach(comp => {
        Vue.component(comp.name, comp)
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    VueSeamlessScroll
}
