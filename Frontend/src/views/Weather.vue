<script>
import { getCityWeather } from '@/api/weather.api'
import CurrentWeather from '@/components/CurrentWeather.vue'
import HourlyWeather from '@/components/HourlyWeather.vue'
import DailyWeather from '@/components/DailyWeather.vue'

export default {
  name: 'Weather',
  components: {
    HourlyWeather,
    DailyWeather,
    CurrentWeather
  },
  data() {
    return {
      cityWeather: {}
    }
  },
  async created() {
    await this.getWeather()
  },
  methods: {
    async getWeather() {
      const cityName = this.$route.params.city
      const cityWeather = await getCityWeather(cityName)
      this.cityWeather = cityWeather
    }
  }
}
</script>

<template>
  <main class="max-w-4xl m-auto pt-20 bg-sky-800 h-full min-h-screen px-5">
    <div v-if="cityWeather && cityWeather.currentWeather">
      <CurrentWeather
        :currentWeather="this.cityWeather.currentWeather"
        :city="this.cityWeather.city"
      />
      <HourlyWeather class="border-y-2 border-slate-200" :hourlyWeather="this.cityWeather.hourly" />
      <DailyWeather :dailyWeather="this.cityWeather.daily" />
    </div>
  </main>
</template>
