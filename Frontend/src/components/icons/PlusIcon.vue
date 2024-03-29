<script>
export default {
  name: 'PlusIcon',
  props: {
    className: {
      type: String,
      default: 'size-6'
    }
  }
}
</script>

<template>
  <svg :class="className" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 12H20M12 4V20"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
