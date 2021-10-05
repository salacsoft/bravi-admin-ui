<template>
  <div
    class="
      flex
      w-2/6
      bg-transparent
      h-10
      py-2
      px-2
      border-b
      hover:border-yellow-400
      focus:outline-black
    "
  >
    <input
      type="text"
      :placeholder="placeholder"
      class="w-full px-2 py-2 bg-transparent focus:outline-none"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup.enter="search"
    />
    <span class="flex items-center text-yellow-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 cursor-pointer"
        viewBox="0 0 20 20"
        fill="currentColor"
        @click="search"
      >
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        @click="refresh"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </span>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup(props, context) {
    function refresh() {
      context.emit("refresh");
    }

    function search() {
      context.emit("search");
    }
    return {
      placeHolder: computed(() => props.placeholder),
      search,
      refresh,
    };
  },
  props: ["placeholder", "modelValue"],
};
</script>

<style lang="scss" scoped>
</style>