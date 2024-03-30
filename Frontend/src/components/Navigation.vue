<script>
export default {
  name: 'Navigation',
  components: {},
  methods: {
    openModal() {
      this.$emit('open-modal')
    }
  }
}
</script>

<template>
  <header class="fixed top-0 right-0 w-full min-h-20 bg-slate-800 py-5 z-40 drop-shadow-md">
    <nav
      class="flex flex-row justify-between items-center max-w-4xl mx-auto px-5 text-white font-semibold"
    >
      <span>Ciudades</span>
      <ul class="flex flex-row gap-4">
        <img
          src="/icons/ModifyIcon.svg"
          alt="modify icon"
          class="size-9 p-1 hover:scale-125 transition-all ease-in-out"
        />
        <img
          src="/icons/RefreshIcon.svg"
          alt="refresh icon"
          class="size-9 p-1 hover:scale-125 transition-all ease-in-out"
        />
        <img
          src="/icons/PlusIcon.svg"
          alt="Add city icon"
          @click="openModal"
          class="size-9 p-1 hover:scale-125 transition-all ease-in-out"
        />
      </ul>
    </nav>
  </header>
</template>
