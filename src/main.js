import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueSeamlessScroll from '../packages'
Vue.use(VueSeamlessScroll)

new Vue({
  render: h => h(App),
}).$mount('#app')
