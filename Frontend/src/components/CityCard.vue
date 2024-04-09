<script>
import { deleteCity } from '@/api/weather.api'
import { toast } from '@steveyuowo/vue-hot-toast'

export default {
  name: 'CityCard',
  props: {
    city: {
      type: Object,
      required: true
    },
    refreshData: {
      type: Function,
      required: true
    }
  },
  methods: {
    async deleteCity() {
      const toasts = toast.loading('Eliminando ciudad...')
      await deleteCity(this.city.city)
      toast.update(toasts, { type: 'success', message: 'Ciudad eliminada' })
      this.refreshData()
    },
    goToWeather(e) {
      if (e.target === this.$refs.deleteButton || e.target === this.$refs.deleteIcon) {
        return
      }

      this.$router.push({
        name: 'Weather',
        params: { city: this.city.city },
        query: {
          sunrise: this.city.currentWeather.sunrise,
          sunset: this.city.currentWeather.sunset
        }
      })
    }
  },
  computed: {
    refreshDataTrigger() {
      return this.$store.state.refreshDataTrigger
    },
    isEditing() {
      return this.$store.state.isEditing
    }
  }
}
</script>

<template>
  <div class="absolute top-0 left-0 min-h-full h-full w-full z-20">
    <video
      autoplay
      muted
      loop
      preload
      class="w-full h-full aspect-square md:aspect-auto object-cover object-center"
    >
      <source :src="`/videos/${this.city.currentWeather.status}.mp4`" type="video/mp4" />
      Tu navegador no admite el elemento <code>video</code>
    </video>
  </div>
  <div
    @click="goToWeather"
    class="absolute top-0 left-0 p-5 flex flex-col justify-between h-full w-full z-30 bg-slate-900/30 group-hover:bg-transparent transition-all duration-200 ease-in-out"
  >
    <h2 class="text-3xl font-bold text-white">{{ this.city.city }}</h2>
    <footer class="flex justify-end items-center gap-2">
      <span class="text-white text-4xl font-medium"
        >{{ this.city.currentWeather.temperature.current }}&deg;</span
      >
      <img
        :src="`/conditions/${this.city.currentWeather.status}.svg`"
        alt="weather condition"
        class="size-12"
      />
    </footer>
  </div>
  <button
    ref="deleteButton"
    v-if="isEditing"
    @click="deleteCity()"
    class="absolute bottom-0 left-0 size-15 bg-slate-700 rounded-tr-2xl z-30 flex justify-center items-center p-2 hover:scale-[115%] hover:translate-x-1 hover:-translate-y-1 transition-all duration-200 ease-in-out"
  >
    <img ref="deleteIcon" src="/icons/TrashIcon.svg" alt="delete" class="size-9" />
  </button>
</template>
