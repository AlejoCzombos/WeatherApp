<script>
export default {
  name: 'AddCityModal',
  data() {
    return {
      city: ''
    }
  },
  methods: {
    closeModal(e) {
      if (e.target === this.$refs.modal) {
        this.$store.dispatch('toggleModal')
      }
    },
    addCity() {
      this.$emit('add-city', this.city)
      this.city = ''
    }
  }
}
</script>

<template>
  <div
    @click="closeModal"
    ref="modal"
    class="bg-black/65 fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center"
  >
    <form
      @submit.prevent="addCity"
      class="bg-slate-800 rounded-lg w-[80%] max-w-xl p-5 shadow-lg text-white"
    >
      <div class="flex flex-col gap-1">
        <label class="font-semibold text-lg" for="cityName">Nombre de la ciudad:</label>
        <input
          autofocus
          type="text"
          id="cityName"
          placeholder="Roma"
          v-model="city"
          class="border-b-2 border-slate-500 bg-transparent text-white px-1 py-1.5 focus:outline-none focus:border-slate-300"
        />
      </div>
      <div class="flex flex-row justify-end gap-4 mt-5">
        <button
          class="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-all ease-in-out"
        >
          Agregar
        </button>
      </div>
    </form>
  </div>
</template>
