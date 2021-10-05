<template>
  <button
    class="
      px-4
      py-2
      text-lg
      bg-white
      shadow-lg
      rounded-full
      text-gray-700
      bg-transparent
      hover:bg-yellow-400
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 mx-auto"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
        clip-rule="evenodd"
      />
    </svg>
    <span class="tracking-wider">Add</span>
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