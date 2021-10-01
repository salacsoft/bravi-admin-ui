<template>
  <div class="space-x-2">
    <label for="cars">Export to:</label>
    <select
      name="pagelength"
      id="pageLength"
      class="py-2 px-3 rounded-lg"
      v-model="exportTo"
      @click="exportList"
    >
      <option value="excel">Excel</option>
      <option value="csv">CSV</option>
      <option value="pdf">PDF</option>
      <option value="print">Print</option>
    </select>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup(props, context) {
    let exportTo = ref("excel");

    function exportList() {
      context.emit("exportList", exportTo);
    }

    return {
      exportTo,
      exportList,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>