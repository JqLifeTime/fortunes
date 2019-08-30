// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'assets/scss/index.scss'
import globals from 'assets/js/global.js'
import VDistpicker from 'v-distpicker'

Vue.component('v-distpicker', VDistpicker)

Vue.prototype.axios = axios

Vue.prototype.globals = globals

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
