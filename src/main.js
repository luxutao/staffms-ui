// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import App from './App'
import router from './router/index'


Vue.config.productionTip = false
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
Vue.component('chart', ECharts)

Vue.use(ElementUI)
Vue.use(Router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
