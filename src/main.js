// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import {sync} from 'vuex-router-sync'
import router from './router/'
import Store from './store/'
import App from './App.vue'
import 'vux/src/styles/reset.less'
sync(Store, router)

Vue.use(VueRouter)

// FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  router,
  Store,
  render: h => h(App)
}).$mount('#app-box')
