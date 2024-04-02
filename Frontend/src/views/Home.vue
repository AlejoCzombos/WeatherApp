<script>
import CityCard from '@/components/CityCard.vue'
import { getCitiesWeather } from '@/api/weather.api'
export default {
  name: 'Home',
  components: { CityCard },
  props: {
    isEditing: {
      type: Boolean,
      required: true
    },
    refreshDataTrigger: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      citiesWeather: []
    }
  },
  async created() {
    await this.getWeatherData()
  },
  methods: {
    async getWeatherData() {
      const citiesWeather = await getCitiesWeather()
      this.citiesWeather = citiesWeather
    }
  },
  watch: {
    refreshDataTrigger: function () {
      this.getWeatherData()
    }
  }
}
</script>

<template>
  <main class="max-w-4xl m-auto grid sm:grid-cols-2 pt-20 bg-slate-900">
    <div v-for="city in citiesWeather" :key="city.city">
      <CityCard
        v-bind:city="city"
        v-bind:isEditing="isEditing"
        v-bind:refreshData="this.getWeatherData"
      />
    </div>
  </main>
</template>
