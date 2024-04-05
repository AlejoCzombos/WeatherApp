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
  }
}
</script>

<template>
  <section>
    <div class="flex flex-col justify-between items-start text-white gap-10 p-3">
      <h2 class="text-2xl">{{ city }}</h2>
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
        <p class="text-xl text-semibold">{{ currentWeather.description }}</p>
        <p class="text-sm text-slate-300">
          Viento: {{ Math.round(currentWeather.wind.speed) }} km/h
        </p>
        <p class="text-sm text-slate-300">Humedad: {{ currentWeather.extras.humidity }}%</p>
      </footer>
    </div>
    <img />
  </section>
</template>
