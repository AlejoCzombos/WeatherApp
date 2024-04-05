<script>
export default {
  name: 'DailyWeather',
  components: {},
  props: {
    dailyWeather: {
      required: true,
      type: Array
    }
  }
}
</script>

<template>
  <section class="flex flex-col items-center w-full">
    <article
      class="grid grid-cols-3 text-white w-full h-16 content-center"
      v-for="day in dailyWeather"
      :key="day.index"
    >
      <div class="flex justify-start items-center text-xl">
        <span>{{ day.day.charAt(0).toUpperCase() + day.day.slice(1) }}</span>
      </div>
      <img
        :src="`/conditions/${day.status}.svg`"
        class="size-8 justify-self-center"
        alt="weather icon"
      />
      <div class="flex justify-end items-center gap-2">
        <p class="text-xl text-white">{{ day.temperature.max }}&deg;</p>
        <p class="text-xl text-slate-300">{{ day.temperature.min }}&deg;</p>
      </div>
    </article>
  </section>
</template>
