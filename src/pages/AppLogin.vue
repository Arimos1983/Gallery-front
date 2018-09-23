<template>
  <div >
      <form class="container" @submit.prevent="login">
        <div class="form-group">
            <label for="email">Email address</label>
            <input name="email" type="email" class="form-control" id="email" required placeholder="Enter email" v-model="email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" required placeholder="Password" v-model="password">
            <p class="alert alert-danger" v-if="errors">{{ errors }}</p>
        </div>
            <button type="submit" name="submit" class="btn btn-primary">Log in</button>
    </form>
  </div>
</template>

<script>
import store from '../store'
import { authService } from '../services/AuthService'
export default {
  name: 'AppLogin',
  data(){
      return{
          email:'',
          password:'',
          errors: ''
      }
  },
  methods:{
      login(){
          authService.login(this.email,this.password)
          .then(() => {
              this.$router.push('/')
              store.dispatch('isAuthenticated')
          })
          .catch(err => {
              this.errors = err.response.data.error
          })
      }
  }
  
}
</script>


