<template>
  <div  class="container">
    <ul class='list-unstyled' >
        <li><h3>Gallery name: {{gallery.name}}</h3></li>
        <li v-if="gallery.user" >Created by: <router-link :to="{name: 'author', params:{id: gallery.user.id}}"> {{gallery.user.first_name}} {{gallery.user.last_name}}</router-link></li>
        <li>Created at: {{gallery.created_at}}</li>
        <li>Descrition: {{gallery.description}}</li>
    </ul>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" >
        <div class="carousel-inner"  >
            <div class="carousel-item" v-for="(image, index) in gallery.image" :key="image.id" :class="{ 'active': index === 0 }">
                <a target="_blank" v-bind:href=image.imageUrl><img class="d-block w-100" v-bind:src=image.imageUrl alt=""></a>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>        
      
  </div>
</template>

<script>
import { galleryService } from '../services/GalleryService'
export default {
  name: 'AppGallery',
  data(){
      return {
          gallery:{}
          
      }
  },
  beforeRouteEnter(To, from, next){
      next(vm => {
          galleryService.get(vm.$route.params.id)
          .then( respons => {
              vm.gallery = respons.data
          })
      })
  }
  
}
</script>


