<template>
  <div class="flex">
    <div v-for="(page, index) in pages.links" :key="index">
      <button
        class="
          flex
          items-center
          px-4
          py-2
          mx-1
          bg-gray-300
          rounded-md
          dark:bg-gray-800
          dark:text-gray-700
        "
        @click="changePage(page.url)"
        v-bind:disabled="page.active || page.url == null"
        v-html="page.label"
        :class="
          page.url == null
            ? 'cursor-not-allowed text-gray-400'
            : page.active
            ? 'bg-yellow-700 text-white cursor-not-allowed'
            : 'text-gray-800 hover:bg-yellow-600  dark:hover:bg-yellow-500  hover:text-white  dark:hover:text-gray-200'
        "
        v-if="
          (pageLength > 10 && index < 4 && page.active == false) ||
          page.active == true ||
          (pageLength > 10 && index > 9 && page.active == false) ||
          pageLength < 10
        "
      ></button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  setup(props, context) {
    function changePage(url) {
      context.emit("changePage", url);
    }

    const pageLength = computed(() => {
      console.log("meta", props.meta.links.length);
      return props.meta.links.length;
    });

    return { pages: computed(() => props.meta), changePage, pageLength };
  },
  props: ["meta"],
};
</script>

<style lang="scss" scoped>
</style>