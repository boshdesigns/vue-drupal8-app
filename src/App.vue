<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import navigation from '@/components/Navigation.vue'
export default {
  name: 'app',
  components: {
    navigation
  }
}
</script>

<style>

</style>
