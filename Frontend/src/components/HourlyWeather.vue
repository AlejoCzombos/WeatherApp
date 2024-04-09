<script>
export default {
  name: 'HourlyWeather',
  components: {},
  props: {
    hourlyWeather: {
      required: true,
      type: Array
    }
  }
}
</script>

<template>
  <section id="hourly-weather" class="flex md:justify-center py-4 h-44 p-5">
    <div
      v-for="hourly in hourlyWeather"
      :key="hourly.index"
      class="px-5 flex flex-col justify-center items-center text-white text-lg gap-2"
    >
      <p>{{ hourly.time }}</p>
      <img :src="`/conditions/${hourly.status}.svg`" class="size-12 py-1" alt="weather icon" />
      <p class="text-xl">{{ hourly.temperature }}&deg;</p>
    </div>
  </section>
</template>

<style scoped>
#hourly-weather {
  max-width: 100vw;
  overflow: scroll;
}
#hourly-weather::-webkit-scrollbar {
  display: none;
}
</style>
