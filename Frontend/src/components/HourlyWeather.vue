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
  <section class="flex py-4 flex-row overflow-x-scroll w-full h-44 border-slate-300">
    <div
      v-for="hourly in hourlyWeather"
      :key="hourly.index"
      class="px-5 flex flex-col justify-center items-center text-white text-lg gap-3"
    >
      <p>{{ hourly.time }}</p>
      <img :src="`/conditions/${hourly.status}.svg`" class="size-12 py-1" alt="weather icon" />
      <p class="text-xl">{{ hourly.temperature }}&deg;</p>
    </div>
  </section>
</template>
