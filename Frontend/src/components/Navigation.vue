<script>
import ModifyIcon from '@/components/icons/ModifyIcon.vue'
import RefreshIcon from '@/components/icons/RefreshIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'

export default {
  name: 'Navigation',
  components: {
    ModifyIcon,
    RefreshIcon,
    PlusIcon
  }
}
</script>

<template>
  <header class="fixed top-0 right-0 w-full bg-slate-800 py-5 z-50 drop-shadow-md">
    <nav
      class="flex flex-row justify-between items-center max-w-4xl mx-auto px-5 text-white font-semibold"
    >
      <span>Ciudades</span>
      <ul class="flex flex-row gap-4">
        <ModifyIcon class="size-9 p-1 hover:scale-125 transition-all ease-in-out" />
        <RefreshIcon class="size-9 p-1 hover:scale-125 transition-all ease-in-out" />
        <PlusIcon class="size-9 p-1 hover:scale-125 transition-all ease-in-out" />
      </ul>
    </nav>
  </header>
</template>
