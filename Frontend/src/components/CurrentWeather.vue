<script>
export default {
  name: 'CurrentWeather',
  components: {},
  props: {
    currentWeather: {
      required: true
    },
    city: {
      required: true
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
  <section
    class="flex flex-col justify-between items-start text-white gap-16 py-12 relative overflow-hidden p-5"
  >
    <header>
      <h2 class="text-4xl font-semibold">{{ city }}</h2>
    </header>
    <div>
      <p class="text-7xl font-semibold">{{ currentWeather.temperature.current }}&deg;</p>
      <div class="flex gap-3">
        <div class="flex justify-center items-center gap-1">
          <img class="size-6" src="/icons/UpIcon.svg" alt="Max temperature icon" />
          <p>{{ currentWeather.temperature.max }}&deg;</p>
        </div>
        <div class="flex justify-center items-center gap-1">
          <img class="size-6" src="/icons/DownIcon.svg" alt="Min temperature icon" />
          <p>{{ currentWeather.temperature.min }}&deg;</p>
        </div>
      </div>
    </div>
    <footer>
      <p class="text-2xl text-semibold">{{ currentWeather.description }}</p>
      <p class="text-md text-slate-200">Viento: {{ Math.round(currentWeather.wind.speed) }} km/h</p>
      <p class="text-md text-slate-200">Humedad: {{ currentWeather.extras.humidity }}%</p>
    </footer>
    <img
      class="absolute top-1/2 -right-[220px] md:right-8 size-[25rem] transform -translate-y-1/2"
      src="/sun.png"
      v-if="isDay"
      alt="time status"
    />
    <img
      class="absolute top-1/2 -right-[220px] md:right-8 size-[25rem] transform -translate-y-1/2"
      src="/moon.png"
      v-else
      alt="time status"
    />
  </section>
</template>
