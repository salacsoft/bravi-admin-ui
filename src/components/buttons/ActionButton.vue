<template>
  <button
    :type="type"
    class="
      px-4
      py-2
      text-lg
      shadow-lg
      rounded-lg
      focus:outline-none
      focus:ring-2 focus:ring-gray-50
    "
    :class="bgColor"
  >
    <svg
      v-if="action == 'save'"
      xmlns="http://www.w3.org/2000/svg"
      class="h-7 w-7"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
        clip-rule="evenodd"
      />
    </svg>
    <svg
      v-if="action == 'cancel'"
      xmlns="http://www.w3.org/2000/svg"
      class="h-7 w-7"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clip-rule="evenodd"
      />
    </svg>
    <svg
      v-if="action == 'check'"
      xmlns="http://www.w3.org/2000/svg"
      class="h-7 w-7 sm:hidden md:inline-block"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clip-rule="evenodd"
      />
    </svg>
    <span class="w-full flex justify-center tracking-wider">{{ label }}</span>
  </button>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  setup(props) {
    const selectedColor = reactive({
      primary: "bg-blue-500 hover:bg-blue-400 ",
      success: "bg-green-500 hover:bg-green-400",
      gray: "bg-gray-500  hover:bg-gray-400",
      orange: "bg-yellow-500 hover:bg-yellow-400 ",
    });

    const bgColor = ref(
      selectedColor.hasOwnProperty(props.btnColor)
        ? selectedColor[props.btnColor]
        : selectedColor.gray
    );
    const type = props.hasOwnProperty("type") ? props.type : "button";
    return {
      bgColor,
      type,
    };
  },
  props: ["label", "action", "btnColor"],
};
</script>

<style lang="scss" scoped>
</style>