<template>
  <div >
      <form class="container" @submit.prevent="log">
        <div class="form-group">
            <label for="email">Email address</label>
            <input name="email" type="email" class="form-control" id="email" placeholder="Enter email" v-model="email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
            <p class="alert alert-danger" v-if="errors">{{ errors }}</p>
        </div>
            <button type="submit" name="submit" class="btn btn-primary">Log in</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AppLogin',
  data(){
      return{
          email:'',
          password:'',
          errors: ''
      }
  }
  
}
</script>


