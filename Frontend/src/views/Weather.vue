<script>
export default {
  name: 'Weather',
  components: {},
  created() {
    console.log(this.$route.params.city)
  }
}
</script>

<template>
  <main class="max-w-4xl m-auto pt-20 bg-slate-900">
    <h1>Weather of: {{ this.$route.params.city }}</h1>
  </main>
</template>
