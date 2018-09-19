<template>
    <div >
        <form  class="container" @submit.prevent="addGallery">
            <div class="form-group" >
                <label for="name">Name:</label>
                <input name="name" type="text" class="form-control" id="name"  placeholder="..." v-model="newGallery.name">
                <p class="alert alert-danger" v-if="errors.name">{{ errors.name[0] }}</p>
            </div>
            <div class="form-group" >
                <label for="description">Description:</label>
                <textarea name="description" class="form-control" id="description"  placeholder="..." v-model="newGallery.description"></textarea>
                <p class="alert alert-danger" v-if="errors.description">{{ errors.description[0] }}</p>
            </div>
            <div class="form-group" >
                <label for="url">Enter an https:// URL:</label>

                <div class="row" v-for="(number , index) in numberOfFields" :key="index">
                    <input type="url" class="form-control col-11" id="url" placeholder="https://example.com" v-model="newGallery.images[index]">
                    <button class="btn btn-danger col" v-if="numberOfFields.length > 1" @click.prevent="removeRow(index)">-</button>
                    <p class="alert alert-danger" v-if="errors.email">{{ errors.email[0] }}</p>
                </div>          
            </div>
            <div class="form-group">
                <button class="btn btn-primary" @click.prevent="addRow">Add url field</button>
            </div>
            <div class="form-group">
                <button type="submit" name="submit" class="btn btn-primary">Submit</button>
                <router-link class="btn alert-danger" to="/">Cancel</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import store from '../store'
import { galleryService } from '../services/GalleryService'
export default {
  name: 'AppCreateGallery',
  data(){
       
      return{
        newGallery:{
          images:[]
        },
        numberOfFields:[{value:''}],
        errors:''
      }
  },
  methods:{
      addRow(){
          this.numberOfFields.push({
              value:1
          })
      },
      removeRow(index){
          console.log(index)
          this.numberOfFields.splice(index,1)
      },
      addGallery(){
          galleryService.addGallery(this.newGallery)
          .then(() => {
          this.$router.push('/')
        })
        .catch(error => this.errors = error.response.data.errors)
      }

  },
  created(){
      store.dispatch('isAuthenticated')
  }
  
}
</script>


