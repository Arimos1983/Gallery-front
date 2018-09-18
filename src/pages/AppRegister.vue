<template>
  <div >
    <form @submit.prevent="register" class="container">
        <div class="form-group" >
            <label for="first_name">First Name:</label>
            <input name="first_name" type="text" class="form-control" id="first_name"  placeholder="..." v-model="newUser.first_name">
            <p class="alert alert-danger" v-if="errors.first_name">{{ errors.first_name[0] }}</p>
        </div>
        <div class="form-group" >
            <label for="last_name">Last Name:</label>
            <input name="last_name" type="text" class="form-control" id="last_name"  placeholder="..." v-model="newUser.last_name">
            <p class="alert alert-danger" v-if="errors.last_name">{{ errors.last_name[0] }}</p>
        </div>
        <div class="form-group" >
            <label for="email">Email:</label>
            <input name="email" type="text" class="form-control" id="email"  placeholder="..." v-model="newUser.email">
            <p class="alert alert-danger" v-if="errors.email">{{ errors.email[0] }}</p>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input name="password" type="text" class="form-control" id="password"  placeholder="..." v-model="newUser.password">
            <p class="alert alert-danger" v-if="errors.password">{{ errors.password[0] }}</p>
        </div>
        <div class="form-group">
            <label for="password_confirmation">Password confirmation:</label>
            <input name="password_confirmation" type="text" class="form-control" id="password_confirmation"  placeholder="..." v-model="newUser.password_confirmation">
        </div>
        <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="checkbox" v-model="newUser.checkbox">
            <label class="form-check-label" for="checkbox"  >I accept terms and conditions.</label>
            <p class="alert alert-danger" v-if="errors.checkbox">{{ errors.checkbox[0] }}</p>
        </div>
        <div class="form-group">
            <button type="submit" name="submit" class="btn btn-primary">Submit</button>
        </div>
    </form>
  </div>
</template>

<script>
import { authService } from '../services/AuthService'
export default {
  name: 'AppRegister',
  data(){
      return{
          newUser:{},
          errors:{}
      }
  },
  methods:
  {
      register(){
          console.log(this.newUser)
          authService.register(this.newUser)
          .then(() => {
          this.$router.push("/login")
        })
        .catch(error => this.errors = error.response.data.errors)
      }
  }
  
}
</script>


