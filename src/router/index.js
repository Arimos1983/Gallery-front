import Vue from 'vue'
import VueRouter from 'vue-router'
import Galleries from '../pages/AppGalleries'
import Login from '../pages/AppLogin'
import Register from '../pages/AppRegister'

Vue.use(VueRouter)

const routes = [
    {path: '/', component: Galleries},
    {path: '/login', component: Login},
    {path: '/register', component: Register}

]

const router = new VueRouter({
    routes,
    mode:'history'
})

export default router;