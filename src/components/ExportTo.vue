<template>
  <div class="space-x-2 tracking-wider">
    <label for="cars">Export to:</label>
    <select
      class="py-2 px-3 rounded-lg"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @click="$emit('exportList')"
    >
      <option value=""></option>
      <option
        v-for="(option, index) in Object.keys(exportOptions)"
        :key="index"
        :value="option"
      >
        {{ exportOptions[option] }}
      </option>
    </select>
  </div>
</template>

<script>
import { reactive } from "vue";
import { EXPORT_TO } from "@/constants/Page";
export default {
  setup() {
    const exportOptions = reactive(EXPORT_TO);
    return { exportOptions };
  },
  props: ["modelValue"],
};
</script>

<style lang="scss" scoped>
</style>