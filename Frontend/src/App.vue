<script>
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
import AddCityModal from '@/components/AddCityModal.vue'
import { addCity } from '@/api/weather.api'

export default {
  name: 'App',
  data() {
    return {
      modalIsOpen: false
    }
  },
  components: {
    Navigation,
    AddCityModal
  },
  methods: {
    onToggleModal() {
      this.modalIsOpen = !this.modalIsOpen
    },
    async addCity(city) {
      const res = await addCity(city)
      console.log(res)
      this.modalIsOpen = false
    }
  }
}
</script>

<template>
  <div class="m-auto bg-slate-900">
    <AddCityModal v-if="modalIsOpen" v-on:close-modal="onToggleModal" v-on:add-city="addCity" />
    <Navigation v-on:open-modal="onToggleModal" />
    <RouterView />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
#app {
  font-family: 'Quicksand', sans-serif;
}
</style>
