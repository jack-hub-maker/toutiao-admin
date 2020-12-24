import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 加载Element组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 加载全局样式文件
import './styles/index.less'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
// 全局注册ElementUI
Vue.use(ElementUI)
