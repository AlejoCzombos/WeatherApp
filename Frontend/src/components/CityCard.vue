<script>
export default {
  name: 'CityCard',
  components: {},
  props: {
    city: {
      required: true
    }
  }
}
</script>

<template>
  <article class="relative min-h-60 shadow-sm">
    <div class="absolute top-0 left-0 h-full w-full bg-slate-900/40 z-20">
      <video
        autoplay
        muted
        loop
        class="w-full h-full aspect-square md:aspect-auto object-cover object-center"
      >
        <source :src="`/videos/${this.city.weather.icon}.mp4`" type="video/mp4" />
      </video>
    </div>
    <div class="absolute top-0 left-0 p-5 flex flex-col justify-between h-full w-full z-30">
      <h2 class="text-3xl font-bold text-white">{{ this.city.city }}</h2>
      <footer class="flex justify-end items-center gap-2">
        <span class="text-white text-4xl font-medium"
          >{{ Math.round(this.city.temperature) }}&deg;</span
        >
        <img
          :src="`/conditions/${this.city.weather.icon}.svg`"
          alt="weather condition"
          class="size-12"
        />
      </footer>
    </div>
  </article>
</template>
