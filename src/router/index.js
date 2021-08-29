import Vue from 'vue'
import VueRouter from 'vue-router'
const Home=()=>import("@/views/home/Home")
const Cart=()=>import("@/views/cart/Cart")
const Profile=()=>import("@/views/profile/Profile")
const Category=()=>import("@/views/category/Category")
const Detail=()=>import("@/views/detail/Detail")
const Register=()=>import("@/components/common/register/Register")
const ToLogin=()=>import("@/components/common/toLogin/ToLogin")

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  },
  {
    path:'/register',
    component:Register
  },
  {
    path:'/tologin',
    component:ToLogin
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
