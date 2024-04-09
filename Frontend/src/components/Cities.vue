<script>
import CityCard from '@/components/CityCard.vue'

export default {
  name: 'Cities',
  components: { CityCard },
  props: {
    cities: {
      type: Array,
      required: true
    },
    refreshData: {
      type: Function,
      required: true
    }
  }
}
</script>

<template>
  <section class="grid sm:grid-cols-2">
    <article
      v-for="city in cities"
      :key="city.city"
      class="relative min-h-60 drop-shadow-md group overflow-hidden cursor-pointer"
    >
      <CityCard v-bind:city="city" :refreshData="refreshData" />
    </article>
  </section>
</template>
