import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Galleries from '../pages/AppGalleries'
import Gallery from '../pages/AppGallery'
import Author from '../pages/AppAuthor'
import Login from '../pages/AppLogin'
import Register from '../pages/AppRegister'
import Create from '../pages/AppCreateGallery'
import MyGalleries from '../pages/AppMyGalleries'

Vue.use(VueRouter)

const routes = [
    {path: '/', component: Galleries, name:'galleries' },
    {path: '/login', component: Login,name: 'login', meta: { guest: true } },
    {path: '/register', component: Register, meta: { guest: true }},
    {path: '/galleris/:id', component: Gallery, name: 'gallery'},
    {path: '/authors/:id', component: Author , name: 'author'},
    {path: '/edit-gallery/:id', component: Create, name: 'edit-gallery', meta: { require_auth: true }},
    {path: '/create', component: Create, meta: { require_auth: true }},
    {path: '/my_galleries', component: MyGalleries, meta: { require_auth: true }}

]

const router = new VueRouter({
    routes,
    mode:'history'
})

router.beforeEach((to, from, next) => {
    if (to.meta.require_auth)
    {
      if (store.getters.getIsAuthenticated)
      { 
        return next();
      } 
      else 
      {
        return next({name: "login" });
      }
    }
   if(to.meta.guest)
    {
      if(store.getters.getIsAuthenticated)
      {
        return next({name:'galleries'})
      }
      else
      {
        return next();
      }
    }
    next();
})


export default router;