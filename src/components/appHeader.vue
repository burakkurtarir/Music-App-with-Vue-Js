<template>
  <div id="myHeader">
    <router-link to="/">Home</router-link>
    <router-link to="/yourPlaylists">Your Playlists</router-link>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped>
#myHeader{
  display:grid;
  grid-template-columns: auto auto;
}

#myHeader a{
  border: 1px solid gray;
  text-align: center;
  text-decoration: none;
}

</style>
