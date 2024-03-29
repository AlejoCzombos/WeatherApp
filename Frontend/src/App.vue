<script>
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<template>
  <div class="m-auto bg-slate-900">
    <Navigation />
    <RouterView />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
#app {
  font-family: 'Quicksand', sans-serif;
}
</style>
