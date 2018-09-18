<template>
  <div >
      <ul v-for="gallery in galleries" :key="gallery.id">
        <li>{{gallery.name}}</li>
      </ul>
  </div>
</template>

<script>
import { galleryService } from '../services/GalleryService'
export default {
  name: 'AppGalleries',
  data(){
    return{
      galleries:{}
    }
  },
  beforeRouterEnters(to, from ,next){

      galleryService.getAll()
      .then(response => {
        next(vm => {
        vm.galleries = response.data
        })
      })

  }
  
}
</script>


