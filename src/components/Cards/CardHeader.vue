<template>
  <div
    class="
      flex
      w-full
      bg-gradient-to-l
      from-gray-500
      via-gray-600
      to-gray-700
      h-14
      items-center
      px-4
      text-xl text-white
      tracking-widest
    "
  >
    <h2><slot></slot></h2>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  props: ["label"],
};
</script>

<style lang="scss" scoped>
</style>