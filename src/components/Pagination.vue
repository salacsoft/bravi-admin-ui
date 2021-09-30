<template>
  <nav class="pagination"></nav>
</template>

<script>
import { computed } from "vue";
export default {
  setup(props) {
    return { pages = computed(() => props.meta) };
  },
};
</script>

<style lang="scss" scoped>
</style>