import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import '@/scss/main.scss'

Vue.config.productionTip = false
Vue.prototype.$axios = Axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

store.dispatch('syncData')

Vue.filter('getImageUrl', value => process.env.VUE_APP_IMAGES_URL + value)
Vue.filter('formatDate', date => { date = new Date(date); return `${(date.getDate() < 10 && '0') || ''}${date.getDate()}.${date.getMonth()}.${date.getFullYear()}` })
