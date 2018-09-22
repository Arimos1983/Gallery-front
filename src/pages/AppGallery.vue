<template>
  <div  class="container">
    <ul class='list-unstyled' >
        <li><h3>Gallery name: {{gallery.name}}</h3></li>
        <li v-if="gallery.user" >Created by: <router-link :to="{name: 'author', params:{id: gallery.user.id}}"> {{gallery.user.first_name}} {{gallery.user.last_name}}</router-link></li>
        <li>Created at: {{gallery.created_at}}</li>
        <li>Description: {{gallery.description}}</li>
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
    </div><br>
     <div v-if="gallery.user_id == authUser" >
        <button class="btn btn-danger" type="submit" @click="deleteGallery">Delete Gallery</button>
        <router-link type="button" class="btn btn-primary" :to="{name:'edit-gallery', params:{id: gallery.id}}">Edit gallery</router-link>
    </div><br>
    <div class="container"> 
        <h3>Comments</h3>
        <table v-for="(comment, index) in gallery.comment" :key="comment.id" >
            <hr>
            <tr class="row">
                <th class="col-8">Author: {{comment.user.first_name}}</th>
                <th class="col">Created at: {{comment.created_at}}</th>
            </tr>
            <hr>
            <tr>
                <td>{{comment.text}}</td>
            </tr>
            <tr>
                <td><button class="btn btn-danger" v-if="comment.user_id == authUser"  @click="deleteComment(index, comment.id)" >Delete Comment</button></td>
            </tr>
            <hr>
        </table>
    </div> 
    <br>
    <div v-if="isAuthenticated">
        <form  @submit.prevent="addComment">
            <div class="form-group">
                <textarea class="form-control" name="text" id="text" v-model="newComment.text" required></textarea>
            </div>
            <div>
                <button class="btn btn-primary" name="submit" type="submit">Submit</button>
            </div>
        </form>
    </div>
    <br>       
      
  </div>
</template>

<script>
import store from '../store'
import { mapGetters } from 'vuex'
import { commentService } from '../services/CommentService'
import { galleryService } from '../services/GalleryService'
export default {
name: 'AppGallery',
    data(){
        return {
            authUser:'',
            gallery:{},
            
            newComment:{
                user_id:'',
                gallery_id:'',
                    
            },
            
            
        }
    },
    computed:{
    ...mapGetters({
        isAuthenticated:'getIsAuthenticated'
        })
    },
    methods:{
        addComment(){   
            this.newComment.user_id = localStorage.getItem("id")
            this.newComment.gallery_id = this.gallery.id
            commentService.addComment(this.newComment)
            .then(response =>{
                this.gallery.comment.push(response.data)
                this.newComment = {}
            })        
        },
        deleteComment(index, id){
            if(confirm('Are you sure')){
            commentService.deleteComment(id)
            .then(()=>{
            this.gallery.comment.splice(index,1)
            })
            }
        },
        deleteGallery(){
                if(confirm('Are you sure')){
                    galleryService.deleteGallery(this.gallery.id)
                    .then(()=>{
                        this.$router.push('/my_galleries')
                    })
                }
        }
    },
    beforeRouteEnter(To, from, next){
        next(vm => {
            galleryService.get(vm.$route.params.id)
            .then( respons => {
                vm.gallery = respons.data
                vm.comments = respons.data.comment
                vm.authUser = localStorage.getItem("id")
            })
        })
        store.dispatch('isAuthenticated')
    }
  
}
</script>


