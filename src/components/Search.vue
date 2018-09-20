<template>
  <div >
      <form class="form-group" @submit.prevent="setSearchTerm">
        <label>Search :</label><br>
        <input  type="text"  placeholder="Search" v-model="searchTerms"/>
        <button class="btn btn-primary" type="submit" >Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data(){
      return{
          searchTerms:''
      }
  },
  methods:{
      setSearchTerm(){
        this.$emit("searchTerms", this.searchTerms);
      }
  }
  
}
</script>


