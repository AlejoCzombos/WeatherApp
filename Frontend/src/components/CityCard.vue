<script>
export default {
  name: 'CityCard',
  components: {}
}
</script>

<template>
  <article class="relative">
    <video autoplay muted loop class="w-full h-96 aspect-square object-cover object-center">
      <source src="/videos/10n.mp4" type="video/mp4" />
    </video>
    <div class="absolute top-0 left-0 h-full w-full bg-slate-900/45"></div>
    <div class="absolute top-0 left-0 p-5 flex flex-col justify-between h-full w-full">
      <h2 class="text-3xl font-bold text-white">City Name</h2>
      <footer class="flex justify-end items-center gap-2">
        <p class="text-white text-5xl font-medium">30°</p>
        <img src="/conditions/10n.svg" alt="Sun" class="size-14" />
      </footer>
    </div>
  </article>
</template>
