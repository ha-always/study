import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/Main'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import StoreList from '@/components/StoreList'
import Menu from '@/components/StoreDetail'
import ReviewList from '@/components/ReviewList'
import ReviewDetail from '@/components/ReviewDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/store',
    name: 'store',
    component: StoreList
  },
  {
    path: '/store/:id',
    name: 'menu',
    component: Menu
  },
  {
    path: '/review',
    name: 'review',
    component: ReviewList
  },
  {
    path: '/review/:id',
    name: 'reviewDetail',
    component: ReviewDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
