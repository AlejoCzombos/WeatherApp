<script>
import CityCard from '@/components/CityCard.vue'
export default {
  name: 'Home',
  components: { CityCard }
}
</script>

<template>
  <main class="max-w-4xl m-auto grid sm:grid-cols-2 pt-20 bg-slate-900 min-h-screen min-h">
    <CityCard />
    <CityCard />
    <CityCard />
    <CityCard />
    <CityCard />
    <CityCard />
    <CityCard />
    <CityCard />
  </main>
</template>
