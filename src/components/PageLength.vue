<template>
  <div class="space-x-2">
    <label for="cars">Page length:</label>
    <select
      name="pagelength"
      id="pageLength"
      class="py-2 px-3 rounded-lg"
      v-model="pageLength"
      @click="changePageLength"
    >
      <option value="10">10</option>
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="all">all</option>
    </select>
    rows
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let pageLength = ref("");
    return {
      pageLength,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>