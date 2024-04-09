<script>
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
import AddCityModal from '@/components/AddCityModal.vue'
import { addCity, refreshWeatherData } from '@/api/weather.api'
import { Toaster, toast } from '@steveyuowo/vue-hot-toast'
import '@steveyuowo/vue-hot-toast/vue-hot-toast.css'

export default {
  name: 'App',
  components: {
    Navigation,
    AddCityModal,
    Toaster
  },
  methods: {
    async refreshData() {
      const toasts = toast.loading('Actualizando datos...')
      await refreshWeatherData()
      toast.update(toasts, { type: 'success', message: 'Datos actualizados' })
    },
    async addCity(city) {
      this.$store.dispatch('toggleModal')
      const toasts = toast.loading('Añadiendo ciudad...')
      const res = await addCity(city)

      if (res.status === 201) {
        this.$store.dispatch('refreshDataTrigger')
        toast.update(toasts, { type: 'success', message: 'Ciudad añadida' })
      } else if (res.status === 400) {
        toast.update(toasts, { type: 'error', message: 'La ciudad ya existe' })
      } else {
        toast.update(toasts, { type: 'error', message: 'Error al añadir la ciudad' })
      }
    }
  },
  computed: {
    modalIsOpen() {
      return this.$store.state.modalIsOpen
    },
    refreshDataTrigger() {
      return this.$store.state.refreshDataTrigger
    },
    isDay() {
      return this.$store.state.isDay
    },
    isInHome() {
      return this.$store.state.isInHome
    }
  },
  watch: {
    $route() {
      this.$store.dispatch('checkRoute', this.$route.name)
    },
    refreshDataTrigger() {
      this.refreshData()
    }
  }
}
</script>

<template>
  <div
    class="m-auto min-h-screen"
    :class="{
      'bg-slate-700': isInHome,
      'bg-sky-500': !isInHome && isDay,
      'bg-sky-950': !isInHome && !isDay
    }"
  >
    <AddCityModal v-if="modalIsOpen" v-on:add-city="addCity" />
    <Navigation />
    <RouterView />
  </div>
  <Toaster />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
#app {
  font-family: 'Quicksand', sans-serif;
}
.VueHotToast__toast-container {
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
}
</style>
