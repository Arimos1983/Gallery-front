<template>
  <div >
    <nav class="navbar navbar-light bg-dark">
      <div>
        <router-link to="/">All Galleries</router-link>
      </div>
      <div>
        <router-link to="/login">Login</router-link>
      </div>
      <div>
        <router-link to="/register">Register</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  
}
</script>


