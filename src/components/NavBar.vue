<template>
  <div >
    <nav class="navbar navbar-light bg-dark">
      <div>
        <span class="navbar-brand mb-0 h1">Galleries</span>
        <router-link to="/">All Galleries</router-link>
      </div>
      <div v-if="!isAuthenticated">
        <router-link to="/login">Login</router-link>
      </div>
      <div v-if="!isAuthenticated">
        <router-link to="/register">Register</router-link>
      </div>
       <div v-if="isAuthenticated">
        <router-link to="/my_galleries">My Galleries</router-link>
      </div>
      <div v-if="isAuthenticated">
        <router-link to="/create">Create New Gallery</router-link>
      </div>
      <div v-if="isAuthenticated">
        <button class="btn btn-link" @click="logout">Logout</button>
      </div>
    </nav>
  </div>
</template>

<script>
import { authService } from '../services/AuthService'
import { mapGetters } from 'vuex'
import store from '../store'
export default {
  name: 'NavBar',

  computed:{
    ...mapGetters({
      isAuthenticated:'getIsAuthenticated'
    })
  },

  methods:{

    logout(){
      authService.logout()
      store.dispatch('isAuthenticated')
      this.$router.push('/')

    }
  }
  
}
</script>


