<script>
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
import AddCityModal from '@/components/AddCityModal.vue'
import { addCity, refreshWeatherData } from '@/api/weather.api'
import { Toaster, toast } from '@steveyuowo/vue-hot-toast'
import '@steveyuowo/vue-hot-toast/vue-hot-toast.css'

export default {
  name: 'App',
  data() {
    return {
      modalIsOpen: false,
      isEditing: false,
      refreshDataTrigger: false,
      isInHome: true
    }
  },
  components: {
    Navigation,
    AddCityModal,
    Toaster
  },
  methods: {
    toggleModal() {
      this.modalIsOpen = !this.modalIsOpen
    },
    modifyCities() {
      this.isEditing = !this.isEditing
    },
    checkRoute() {
      if (this.$route.name === 'Home') {
        this.isInHome = true
      } else {
        this.isInHome = false
      }
    },
    async refreshData() {
      const toasts = toast.loading('Actualizando datos...')
      await refreshWeatherData()
      this.refreshDataTrigger = !this.refreshDataTrigger
      toast.update(toasts, { type: 'success', message: 'Datos actualizados' })
    },
    async addCity(city) {
      this.modalIsOpen = false
      const toasts = toast.loading('Añadiendo ciudad...')
      const res = await addCity(city)

      if (res.status === 201) {
        this.refreshDataTrigger = !this.refreshDataTrigger
        toast.update(toasts, { type: 'success', message: 'Ciudad añadida' })
      } else if (res.status === 400) {
        toast.update(toasts, { type: 'error', message: 'La ciudad ya existe' })
      } else {
        toast.update(toasts, { type: 'error', message: 'Error al añadir la ciudad' })
      }
    }
  },
  watch: {
    $route() {
      this.checkRoute()
    }
  }
}
</script>

<template>
  <div class="m-auto bg-slate-900 min-h-screen">
    <AddCityModal v-if="modalIsOpen" v-on:close-modal="toggleModal" v-on:add-city="addCity" />
    <Navigation
      v-on:open-modal="toggleModal"
      v-on:refresh-data="refreshData"
      v-on:modify-cities="modifyCities"
      v-bind:isEditing="isEditing"
      v-bind:isInHome="isInHome"
    />
    <RouterView v-bind:isEditing="isEditing" v-bind:refreshDataTrigger="refreshDataTrigger" />
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
