<template>
    <div >
        <form  class="container" @submit.prevent="submitGallery">
            <div class="form-group" >
                <label for="name">Name:</label>
                <input name="name" type="text" class="form-control" id="name"  placeholder="..." v-model="newGallery.name" required>
                <p class="alert alert-danger" v-if="errors.name">{{ errors.name[0] }}</p>
            </div>
            <div class="form-group" >
                <label for="description">Description:</label>
                <textarea name="description" class="form-control" id="description"  placeholder="..." v-model="newGallery.description"></textarea>
                <p class="alert alert-danger" v-if="errors.description">{{ errors.description[0] }}</p>
            </div>
            <div class="form-group" >
                <label for="url">Enter an https:// URL:</label>

                <div class="row " v-for="(number , index) in numberOfFields" :key="index">
                    <input type="url" class="form-control col-10" id="url" placeholder="https://example.com" v-model="newGallery.images[index]" required>
                    <button class="btn btn-danger col glyphicon glyphicon-minus" v-if="numberOfFields > 1" @click.prevent="removeRow(index)">-</button>
                    <button type="button" class="btn btn-success col" v-if="numberOfFields > 1"  @click.prevent="moveRowUp(index)">Up</button>
                    <button type="button" class="btn btn-success col" v-if="numberOfFields > 1"  @click.prevent="moveRowDown(index)">Down</button>
                    <p class="alert alert-danger" v-if="errors.images">{{ errors.images[index]}}</p>
                    <p class="alert alert-danger" v-if="errors[`images.${index}`]">Wrong format of image</p>


                </div>          
            </div>
            <div class="form-group">
                <button class="btn btn-info" @click.prevent="addRow">Add url field</button>
            </div>
            <div class="form-group">
                <button type="submit" name="submit" class="btn btn-primary">Submit</button>
                <button class="btn btn-danger" @click="cancel">Cancel</button>
            </div>
        </form>g
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
            name:'',
            description:'',
            images:[]
        },
        numberOfFields:1,
        errors:'',
        userErrors:''
      }
  },
  methods:{
      addRow(){
          this.numberOfFields++
      },
      removeRow(index){
          this.newGallery.images.splice(index,1)
          this.numberOfFields--
      },
      moveRowUp(index){
          if(index > 0){
          this.newGallery.images.splice(index-1, 0,  this.newGallery.images.splice(index, 1)[0])
          }
      },
      moveRowDown(index){
          if(index <  this.numberOfFields-1){
          this.newGallery.images.splice(index, 0,  this.newGallery.images.splice(index+1, 1)[0])
          }
      },
      cancel(){
          if(this.$route.params.id)
          {
              this.$router.push({name:'gallery', params:{id:this.$route.params.id}})
          }else{
              this.$router.push({name:'galleries'})
          }
      },
      submitGallery(){
          if(this.$route.params.id)
          {
            this.editGallery()
          }
          else{
            this.addNewGallery()
          }
      },
      addNewGallery(){
          galleryService.addGallery(this.newGallery)
          .then(() => {
           this.$router.push('/my_galleries')
        })
        .catch(error => this.errors = error.response.data.errors)
      },
      editGallery(){

          galleryService.editGallery(this.$route.params.id,this.newGallery)
          .then(()=>{
             this.$router.push({name:'gallery', params:{id:this.$route.params.id}})
          })
            .catch(error => this.userErrors = error.response.data.errors)

      }

  },

created(){
        
        this.$route.params.id && galleryService.get(this.$route.params.id)
       .then((response) => {
        this.newGallery.name = response.data.name
        this.newGallery.description = response.data.description
        this.numberOfFields = response.data.image.length
        response.data.image.forEach(element => {
            this.newGallery.images.push(element.imageUrl)
        
            });
        
        })
        store.dispatch('isAuthenticated')
    },
  
}
</script>


