<template>
  <div >
      <ul class='list-unstyled'>
          <li>Author: {{user.first_name}} {{user.last_name}}</li>
          <ul class='list-unstyled' v-for="gallery in user.gallery" :key="gallery.id">
            <li>Gallery name: {{gallery.name}}</li>
            <li>Created at: {{gallery.created_at}}</li>
            <li><img v-bind:src=gallery.image[0].imageUrl width="100" height="100"></li>
          </ul>
      </ul>
  </div>
</template>

<script>
import store from '../store'
import { userService } from '../services/UserService'
export default {
  name: 'AppAuthor',
  data(){
      return{
          user:{}
      }
  },
  beforeRouteEnter(To, from, next){
      next(vm => {
          userService.get(vm.$route.params.id)
          .then( respons => {
              vm.user = respons.data
          })
      })
      store.dispatch('isAuthenticated')
  }
  
}
</script>


