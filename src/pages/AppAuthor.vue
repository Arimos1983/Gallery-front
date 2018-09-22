<template>
  <div >
      <search @searchTerms="setSearch"></search>
      <ul class='list-unstyled' v-if="gallery[0]" >
          <li >Author: {{gallery[0].user.first_name}} {{gallery[0].user.last_name}}</li>
          <ul class='list-unstyled' v-for="gallery in gallery" :key="gallery.id">
            <li>Gallery name: {{gallery.name}}</li>
            <li>Created at: {{gallery.created_at}}</li>
            <li><img v-bind:src=gallery.image[0].imageUrl width="100" height="100"></li>
          </ul>
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
      this.search = data;
      this.user_id=this.gallery[0].user_id
      this.gallery = []
      this.searchUser()
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


