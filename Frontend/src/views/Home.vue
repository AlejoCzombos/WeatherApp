<script>
import CityCard from '@/components/CityCard.vue'
import { getCitiesWeather } from '@/api/weather.api'
export default {
  name: 'Home',
  components: { CityCard },
  data() {
    return {
      citiesWeather: []
    }
  },
  async created() {
    const citiesWeather = await getCitiesWeather()
    this.citiesWeather = citiesWeather
  }
}
</script>

<template>
  <main class="max-w-4xl m-auto grid sm:grid-cols-2 pt-20 bg-slate-900 min-h-screen min-h">
    <div v-for="city in citiesWeather" :key="city.city">
      <CityCard v-bind:city="city" />
    </div>
  </main>
</template>
