import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/Main'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import StoreList from '@/components/StoreList'
import StoreDetail from '@/components/StoreDetail'
import NewReview from '@/components/ReviewCreate'
import ModiReview from '@/components/ReviewModify'
import Review from '@/components/ReviewDetail'

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
  {
    path: '/reviewModify/:id',
    name: 'reviewModify',
    component: ModiReview
  },
  {
    path: '/review/:id',
    name: 'reviewDetail',
    component: Review
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.afterEach((to, from) => {
  const title = to.meta.title === undefined ? '맛집리뷰' : to.meta.title;
  Vue.nextTick(() => {
    document.title = title;
  });
});

export default router
