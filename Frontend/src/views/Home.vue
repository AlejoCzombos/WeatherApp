<script>
import Cities from '@/components/Cities.vue'
import { getCitiesWeather } from '@/api/weather.api'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { toast } from '@steveyuowo/vue-hot-toast'

export default {
  name: 'Home',
  components: { Cities, LoadingSpinner },
  data() {
    return {
      citiesWeather: [],
      loading: true
    }
  },
  async created() {
    await this.getWeatherData()
  },
  methods: {
    async getWeatherData() {
      const loadingToast = toast.loading('Disculpe la demora, hosting gratuito 😅')
      const citiesWeather = await getCitiesWeather()
      toast.update(loadingToast, { type: 'success', message: 'Información cargada correctamente' })
      this.citiesWeather = citiesWeather
      this.loading = false
    },
    toggleModal() {
      this.$store.dispatch('toggleModal')
    }
  },
  computed: {
    refreshDataTrigger() {
      return this.$store.state.refreshDataTrigger
    }
  },
  watch: {
    refreshDataTrigger() {
      this.getWeatherData()
    }
  }
}
</script>

<template>
  <main
    class="max-w-4xl m-auto pt-20 bg-slate-700 min-h-screen relative"
    :class="{ 'flex justify-center items-center': loading }"
  >
    <LoadingSpinner v-if="loading" class="flex justify-center items-center" />
    <Cities v-else v-bind:cities="citiesWeather" :refreshData="getWeatherData" />
    <div
      v-if="citiesWeather.length <= 0 && !loading"
      class="absolute inset-0 bg-slate-700 bg-opacity-90 flex justify-center items-center"
    >
      <div class="flex flex-col items-center gap-1">
        <p class="text-center text-white text-lg">No existe ninguna ciudad, agregá una!</p>
        <button
          @click="toggleModal"
          class="bg-white text-slate-800 px-3 py-1.5 rounded-lg font-semibold hover:bg-slate-400 hover:text-white transition-colors"
        >
          Agregar ciudad
        </button>
      </div>
    </div>
  </main>
</template>
