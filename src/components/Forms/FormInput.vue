<template>
  <input
    type="text"
    :placeholder="placeholder"
    class="
      w-full
      px-3
      py-2
      bg-white
      shadow-md
      hover:border-gray-600
      focus:outline-none
      focus-within:shadow-lg
      rounded-lg
      border
      focus-within:border-gray-600
    "
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  setup() {},
  props: ["modelValue", "placeholder"],
};
</script>
