<template>
  <div>
    <div class="w-full flex justify-center">
      <div
        class="
          flex
          items-center
          justify-between
          w-full
          h-20
          bg-yellow-300
          shadow-md
          px-6
          rounded-3xl
        "
      >
        <div>
          <h1 class="text-xl md:text-2xl">{{ title }}</h1>
          <p class="text-xs tracking-widest text-gray-600">{{ subTitle }}</p>
        </div>
        <div class="cursor-pointer" @click="back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-yellow-500 hover:text-yellow-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: ["title", "subTitle"],
  setup() {
    const router = useRouter();
    function back() {
      router.back();
    }
    return { back };
  },
};
</script>

<style lang="scss" scoped>
</style>