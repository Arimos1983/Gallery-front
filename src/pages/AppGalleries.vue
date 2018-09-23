<template>
  <div class="container">
      <h2 v-if="galleries == false">There are no galleries</h2>
      <search @searchTerms="setSearchTerm"></search>

      <div  v-for="gallery in galleries" :key="gallery.id">
        <div class="image">
          <img v-bind:src=gallery.image[0].imageUrl width="200" height="200">
        </div>  

        <div class="text-block">
          <ul class='list-unstyled float-left' >
            <li><span class="text">Gallery name: </span><router-link :to="{ name:'gallery', params:{id: gallery.id}}" >{{gallery.name}}</router-link><br><br></li>
            <li><span class="text">Created by: </span><router-link :to="{name: 'author', params:{id: gallery.user.id}}"> {{gallery.user.first_name}} {{gallery.user.last_name}}</router-link></li>
            <li><span class="text">Created at: </span>{{gallery.created_at}}</li>
          </ul>
        </div><hr >
      </div>

        <div v-if="!hideButton">
          <button class="btn btn-primary" @click="loadMore">Load 10 more</button>
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
      if(this.search !== data){
      this.search = data;
      this.galleries = []
      this.searchGalleries()
      }
    },
    searchGalleries(){
      console.log(this.search)
      galleryService.getGallery(this.skip,this.search)
      .then(response => {
        let count = response.data.length
        if(count < 11){ this.hideButton = true}
        if(count == 11){response.data.splice(-1,1)}
        if(count > 0){
        this.galleries=this.galleries.concat(response.data)
        }
      })
    },
    updateButton(data){
        let count = data.length
        if(count < 11){ this.hideButton = true}
        if(count == 11){data.splice(-1,1)}
        return data
    }
  },
  beforeRouteEnter(to, from ,next){

      galleryService.getGallery(0,'')
      .then(response => {
        next(vm => {
          if(response){
        vm.galleries = vm.updateButton(response.data)
          }
        })
      })
      store.dispatch('isAuthenticated')
      

  }
  
}
</script>
<style scoped>

.text-block{
  display: inline-block;
  width:50%; 
  text-align: left; 
  padding: 20px;

}
.text{
  font-weight: bold;
}

.image{

  display: inline-block; 
  vertical-align: top;

}



</style>


