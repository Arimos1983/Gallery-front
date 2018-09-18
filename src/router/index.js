import Vue from 'vue'
import VueRouter from 'vue-router'
import Galleries from '../pages/AppGalleries'
import Gallery from '../pages/AppGallery'
import Author from '../pages/AppAuthor'
import Login from '../pages/AppLogin'
import Register from '../pages/AppRegister'

Vue.use(VueRouter)

const routes = [
    {path: '/', component: Galleries},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/galleris/:id', component: Gallery, name: 'gallery'},
    {path: '/authors/:id', component: Author , name: 'author'}

]

const router = new VueRouter({
    routes,
    mode:'history'
})

export default router;