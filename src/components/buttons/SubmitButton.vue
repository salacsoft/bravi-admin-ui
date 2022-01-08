<template>
  <button
    type="submit"
    class="
      py-2
      px-3
      bg-blue-600
      rounded-xl
      text-gray-100
      tracking-widest
      hover:bg-blue-500
    "
  >
    <slot />
  </button>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>