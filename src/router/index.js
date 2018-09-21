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
    {path: '/', component: Galleries, meta: { require_auth: false }},
    {path: '/login', component: Login,name: 'login', meta: { require_auth: false } },
    {path: '/register', component: Register, meta: { require_auth: false }},
    {path: '/galleris/:id', component: Gallery, name: 'gallery', meta: { require_auth: false }},
    {path: '/authors/:id', component: Author , name: 'author', meta: { require_auth: false }},
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
    else
    {
      if(store.getters.getIsAuthenticated)
      {
        return next(false)
      }
      else
      {
        return next();
      }
    }
  })

export default router;