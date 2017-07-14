<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
    <appfooter></appfooter>
  </div>
</template>

<script>
import navigation from '@/components/Navigation.vue'
import appfooter from '@/components/Footer.vue'
export default {
  name: 'app',
  components: {
    navigation,
    appfooter
  }
}
</script>

<style>
img {
  max-width: 100%;
}
</style>
