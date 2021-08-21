import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionApi from '@vue/composition-api'
import Element from 'element-ui'

Vue.use(VueCompositionApi)
Vue.use(Element)
Vue.config.productionTip = false

// Vue.prototype.$$store = store
// declare('types/vue')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
