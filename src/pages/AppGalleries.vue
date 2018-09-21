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
        <div v-if="!hideButton">
          <button @click="loadMore">Load 10 more</button>
        </div>
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
      search:'',
      skip: 0,
      hideButton: false,
    }  
    
  },
  methods:{
    loadMore(){
      this.skip += 10
      this.searchGalleries()
    },
    setSearchTerm(data){
      this.search = data;
      this.galleries = []
      this.searchGalleries()
    },
    searchGalleries(){
      console.log(this.search)
      galleryService.getMore(this.skip,this.search)
      .then(response => {
        let count = response.data.length
        if(count < 11){ this.hideButton = true}
        if(count == 11){response.data.splice(-1,1)}
        if(count > 0){
        this.galleries=this.galleries.concat(response.data)
        }
      })
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


