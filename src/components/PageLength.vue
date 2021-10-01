<template>
  <div class="space-x-2">
    <label for="cars">Page length:</label>
    <select
      name="pagelength"
      id="pageLength"
      class="py-2 px-3 rounded-lg"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @click="$emit('changePageLength', $event.target.value)"
    >
      <option v-for="(selection, index) in options" :key="index" :value="index">
        {{ selection }}
      </option>
    </select>
    rows
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  props: ["options", "modelValue"],
};
</script>

<style lang="scss" scoped>
</style>