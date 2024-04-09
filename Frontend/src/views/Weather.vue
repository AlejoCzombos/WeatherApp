<script>
import { getCityWeather } from '@/api/weather.api'
import CurrentWeather from '@/components/CurrentWeather.vue'
import HourlyWeather from '@/components/HourlyWeather.vue'
import DailyWeather from '@/components/DailyWeather.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: 'Weather',
  components: {
    HourlyWeather,
    DailyWeather,
    CurrentWeather,
    LoadingSpinner
  },
  data() {
    return {
      cityWeather: {},
      loading: true
    }
  },
  created() {
    this.calculateTime()
    this.getWeather()
  },
  methods: {
    async getWeather() {
      const cityName = this.$route.params.city
      const cityWeather = await getCityWeather(cityName)
      this.cityWeather = cityWeather
      this.loading = false
    },
    calculateTime() {
      const date = new Date()
      const currentTime = date.getHours()
      const sunrise = this.$route.query.sunrise
      const sunset = this.$route.query.sunset
      const isDay = currentTime >= sunrise && currentTime < sunset
      this.$store.dispatch('setIsDay', isDay)
    }
  },
  computed: {
    isDay() {
      return this.$store.state.isDay
    }
  }
}
</script>

<template>
  <main
    class="max-w-4xl m-auto pt-20 h-full min-h-screen px-5"
    :class="{
      'bg-sky-500': isDay,
      'bg-sky-950': !isDay,
      'flex justify-center items-center': loading
    }"
  >
    <LoadingSpinner v-if="loading" class="flex justify-center items-center" />
    <div v-else>
      <CurrentWeather
        :currentWeather="this.cityWeather.currentWeather"
        :city="this.cityWeather.city"
      />
      <HourlyWeather class="border-y-2 border-slate-200" :hourlyWeather="this.cityWeather.hourly" />
      <DailyWeather :dailyWeather="this.cityWeather.daily" />
    </div>
  </main>
</template>
