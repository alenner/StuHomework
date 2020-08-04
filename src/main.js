// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import '_bootstrap@3.4.1@bootstrap/dist/css/bootstrap.min.css'
import '_bootstrap@3.4.1@bootstrap/dist/js/bootstrap.min'
import axios from 'axios'
import store from '../vuex/store'

Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  $,
  store,
  components: { App },
  template: '<App/>'
})
