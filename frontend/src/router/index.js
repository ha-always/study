import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/Main'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import StoreList from '@/components/StoreList'
import StoreDetail from '@/components/StoreDetail'
import NewReview from '@/components/ReviewCreate'

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
    name: 'storeDetail',
    component: StoreDetail
  },
  {
    path: '/reviewCreate/:id',
    name: 'reviewCreate',
    component: NewReview
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
