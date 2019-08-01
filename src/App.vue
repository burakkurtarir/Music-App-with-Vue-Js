<template>
  <div>
    <!--<appHeader></appHeader>-->
    <router-view></router-view>
  </div>
</template>

<script>
import appHeader from './components/appHeader.vue';

export default {

  components: {
    'appHeader': appHeader
  }
}

</script>

<style>

body{

}
</style>
