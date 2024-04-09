<script>
import Cities from '@/components/Cities.vue'
import { getCitiesWeather } from '@/api/weather.api'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

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
      const citiesWeather = await getCitiesWeather()
      this.citiesWeather = citiesWeather
      this.loading = false
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
    class="max-w-4xl m-auto pt-20 bg-slate-700 min-h-screen"
    :class="{ 'flex justify-center items-center': loading }"
  >
    <LoadingSpinner v-if="loading" class="flex justify-center items-center" />
    <Cities v-else v-bind:cities="citiesWeather" :refreshData="getWeatherData" />
  </main>
</template>
