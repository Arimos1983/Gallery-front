<template>
  <div >
      <h2 v-if="galleries == false">There are no galleries</h2>
      <search @searchTerms="setSearchTerm"></search>
      <ul class='list-unstyled' v-for="gallery in galleries" :key="gallery.id">
        <li>Gallery name: <router-link :to="{ name:'gallery', params:{id: gallery.id}}" >{{gallery.name}}</router-link></li>
        <li><img v-bind:src=gallery.image[0].imageUrl width="100" height="100"></li>
        <li>Created by: <router-link :to="{name: 'author', params:{id: gallery.user.id}}"> {{gallery.user.first_name}} {{gallery.user.last_name}}</router-link></li>
        <li>Created at: {{gallery.created_at}}</li>
      </ul>
  </div>
</template>

<script>
import Search from '../components/Search'
import store from '../store'
import { galleryService } from '../services/GalleryService'
export default {
  name: 'AppGalleries',
  components:{
    Search
  },
  data(){
    return{
      galleries:[],
      searchTerm:''
    }
  },
  methods:{
    setSearchTerm(data){
      this.searchTerm = data;
      console.log(this.searchTerm)
    }
  },
  beforeRouteEnter(to, from ,next){

      galleryService.getAll()
      .then(response => {
        next(vm => {
        vm.galleries = response.data
        })
      })
      store.dispatch('isAuthenticated')
      

  }
  
}
</script>


