<template>
  <div class="container" >
      <search @searchTerms="setSearch"></search><br>
      <h3  v-if="gallery[0]"><span class="text">Author: </span>{{gallery[0].user.first_name}} {{gallery[0].user.last_name}}</h3><br>
      <div   v-for="gallery in gallery" :key="gallery.id">
          <div class="image">
            <img v-bind:src=gallery.image[0].imageUrl width="200" height="200">
          </div>
          <div class="text-block">
            <ul class='list-unstyled' >
                <li><span class="text">Gallery name: </span><router-link :to="{name: 'gallery', params:{id: gallery.id}}">{{gallery.name}}</router-link><br><br></li>
                <li><span class="text">Created at: </span>{{gallery.created_at}}</li>
            </ul>
          </div><hr>
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
  name: 'AppAuthor',
  components:{
      Search
  },
  data(){
      return{
          gallery:[],
          search:'',
          skip:0,
          hideButton: false,
          user_id:''
      }
  },
  methods:{
    loadMore(){
        this.skip += 10
        this.user_id=this.gallery[0].user_id
        this.searchUser()
    },
    setSearch(data){
          if(this.search !== data){
        this.search = data;
        this.user_id=this.gallery[0].user_id
        this.gallery = []
        this.searchUser()
        }
    },
    searchUser(){
      console.log(this.user_id)
      galleryService.getUser(this.user_id,this.skip,this.search)
      .then(response => {
        let count = response.data.length
        if(count < 11){ this.hideButton = true}
        if(count == 11){response.data.splice(-1,1)}
        if(count > 0){
        this.gallery = this.gallery.concat(response.data)
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
  beforeRouteEnter(To, from, next){
      next(vm => {
          galleryService.getUser(vm.$route.params.id,0,'')
          .then( respons => {
              vm.gallery = vm.updateButton(respons.data)
              
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