import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Tests from '@/views/tests/index.vue'
Vue.use(VueRouter)

// 配置路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/tests',
    name: 'tests',
    component: Tests
  }

]

const router = new VueRouter({
  routes
})

export default router
