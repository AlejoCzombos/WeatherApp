<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'Navigation',
  components: {},
  props: {
    isEditing: Boolean,
    isInHome: Boolean
  },
  methods: {
    openModal() {
      this.$emit('open-modal')
    },
    refreshData() {
      this.$emit('refresh-data')
    },
    modifyCities() {
      this.$emit('modify-cities')
    }
  }
}
</script>

<template>
  <header
    class="fixed top-0 right-0 w-full min-h-20 py-5 z-40 drop-shadow-md"
    :class="{ 'bg-slate-800': isInHome, 'bg-sky-900': !isInHome }"
  >
    <nav
      v-if="isInHome"
      class="flex flex-row justify-between items-center max-w-4xl mx-auto px-5 text-white font-semibold"
    >
      <span>Ciudades</span>
      <ul class="flex flex-row gap-4">
        <svg
          @click="modifyCities"
          :class="{ 'stroke-red-500': isEditing, 'stroke-white': !isEditing }"
          class="size-9 p-1 hover:scale-125 transition-all ease-in-out fill-none stroke-2 cursor-pointer"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z"
          />
        </svg>
        <img
          src="/icons/RefreshIcon.svg"
          alt="refresh icon"
          @click="refreshData"
          class="size-9 p-1 hover:scale-125 transition-all ease-in-out cursor-pointer"
        />
        <img
          src="/icons/PlusIcon.svg"
          alt="Add city icon"
          @click="openModal"
          class="size-9 p-1 hover:scale-125 transition-all ease-in-out cursor-pointer"
        />
      </ul>
    </nav>
    <nav
      v-else
      class="flex flex-row justify-between items-center max-w-4xl mx-auto px-5 text-white font-semibold"
    >
      <RouterLink to="/">
        <img
          class="size-9 -rotate-90 stroke-white hover:bg-sky-700 p-1 rounded-full cursor-pointer transition-all ease-in-out hover:scale-125"
          src="/icons/UpIcon.svg"
          alt="Back to home"
        />
      </RouterLink>
      <span class="text-xl">
        {{ new Date().toLocaleDateString('es-ES', { weekday: 'short' }) }}
        {{ new Date().toLocaleDateString('es-ES', { day: '2-digit' }) }}
        {{ new Date().toLocaleDateString('es-ES', { month: 'short' }) }}
      </span>
      <span class="text-xl">&deg; C</span>
    </nav>
  </header>
</template>
