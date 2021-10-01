<template>
  <div class="space-x-2">
    <label for="cars">Export to:</label>
    <select
      class="py-2 px-3 rounded-lg"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @click="$emit('exportList')"
    >
      <option value=""></option>
      <option value="excel">Excel</option>
      <option value="csv">CSV</option>
      <option value="pdf">PDF</option>
      <option value="print">Print</option>
    </select>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  props: ["modelValue"],
};
</script>

<style lang="scss" scoped>
</style>