import VueSeamlessScroll from './vue-seamless-scroll'

const components = [VueSeamlessScroll]

const install = function (Vue) {
    components.forEach(comp => {
        Vue.component(comp.name, comp)
    })
}

export default {
    install,
    VueSeamlessScroll
}
