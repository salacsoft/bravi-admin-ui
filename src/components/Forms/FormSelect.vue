<template>
  <div class="flex items-center relative">
    <input
      :placeholder="placeholder"
      v-model="searchFor"
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
      @input="apiSearch"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 absolute right-2"
      :class="{ 'animate-bounce': searching }"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
  <div v-if="data.length < 1 && searching" class="flex text-xs tracking-widest">
    <span>No Record Found!</span>
  </div>
  <div class="mb-5" v-if="data.length > 0">
    <table
      class="
        min-w-full
        px-2
        py-2
        rounded-xl
        overflow-hidden
        bg-gray-200
        mt-1
        shadow-lg
      "
    >
      <thead class="flex border-b border-gray-300">
        <tr class="flex w-full font-normal bg-gray-300 py-2">
          <td class="flex w-1/3 px-2" v-for="header in headers" :key="header">
            {{ header }}
          </td>
        </tr>
      </thead>
      <tbody class="">
        <tr
          v-for="(item, index) in data"
          :key="item.id"
          class="flex w-full py-1 text-sm tracking-wider"
          :class="index % 2 == 0 ? 'bg-gray-50' : 'bg-white'"
        >
          <td class="flex px-3 w-1/3">{{ item[columns[0]] }}</td>
          <td class="flex px-3 w-2/3 justify-between">
            <span>{{ item[columns[1]] }}</span>
            <span
              @click="selectOption(JSON.stringify(item))"
              class="
                flex
                px-2
                rounded-xl
                bg-blue-400
                text-xs
                items-center
                tracking-widest
                cursor-pointer
                hover:bg-blue-500
              "
              >select</span
            >
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between p-2">
      <div>
        <p class="text-xs">
          <span
            >Record {{ pageMeta.from }} - {{ pageMeta.to }} /
            {{ pageMeta.total }}</span
          >
        </p>
      </div>
      <div class="flex justify-center space-x-2 text-xs">
        <button
          type="button"
          class="page-button"
          :class="
            pageLinks.first == null
              ? 'cursor-not-allowed'
              : 'hover:bg-yellow-500'
          "
          @click="changePage(pageLinks.first)"
          v-bind:disabled="pageLinks.first == null ? true : false"
        >
          First
        </button>
        <button
          type="button"
          class="page-button"
          :class="
            pageLinks.prev == null
              ? 'cursor-not-allowed'
              : 'hover:bg-yellow-800 '
          "
          @click="changePage(pageLinks.prev)"
          v-bind:disabled="pageLinks.prev == null ? true : false"
        >
          Prev
        </button>
        <button
          type="button"
          class="page-button"
          :class="
            pageLinks.next == null
              ? 'cursor-not-allowed'
              : 'hover:bg-yellow-500'
          "
          @click="changePage(pageLinks.next)"
          v-bind:disabled="pageLinks.next == null ? true : false"
        >
          Next
        </button>
        <button
          type="button"
          class="page-button"
          :class="
            pageLinks.last == null
              ? 'cursor-not-allowed'
              : 'hover:bg-yellow-500'
          "
          @click="changePage(pageLinks.last)"
          v-bind:disabled="pageLinks.last == null ? true : false"
        >
          Last
        </button>
      </div>
      <div>
        <p class="text-xs">
          <span
            >Page {{ pageMeta.current_page }} / {{ pageMeta.last_page }}</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, watch } from "vue";
import _debounce from "lodash/debounce";
//HELPERS
import { apiHttp } from "@/API/httpService";
import errorHandler from "@/API/ErrorHandler";
import { createToast } from "mosha-vue-toastify";

export default {
  setup(props, context) {
    let searchFor = ref("");
    let baseURL = ref("");
    let searching = ref(false);
    let data = reactive([]);
    let pageMeta = reactive([]);
    let typing = ref(false);

    let pageLinks = reactive({
      first: null,
      last: null,
      next: null,
      prev: null,
    });

    let options = reactive({
      params: {
        search: "",
        paginate: "5",
        orderBy: props.order_by,
      },
    });

    onMounted(() => {
      baseURL.value = props.url;
      data.splice(0);
      // getList(baseURL.value);
    });

    const getList = (url) => {
      apiHttp
        .get(url, options)
        .then((response) => {
          if (data.length > response.data.data.length) {
            data.splice(0);
          }
          Object.assign(data, response.data.data);
          Object.assign(pageLinks, response.data.links);
          Object.assign(pageMeta, response.data.meta);
        })
        .catch((errors) => {
          console.log(errors);
          let msg = errorHandler(errors);
          createToast(
            { title: "ALERT", description: msg },
            { type: "warning", timeout: 9000, position: "top-center" }
          );
        });
    };

    const apiSearch = _debounce(() => {
      searching.value = true;
      data.splice(0);
      if (searchFor.value != "") {
        options.params.search = searchFor.value;
        getList(baseURL.value);
      } else {
        searching.value = false;
      }
    }, 400);

    const selectOption = (client) => {
      context.emit("selectedObject", client);
      searchFor.value = "";
      data.splice(0);
      searching.value = false;
    };

    const changePage = (url) => {
      getList(url);
    };

    return {
      pageMeta,
      selectOption,
      changePage,
      data,
      pageLinks,
      searchFor,
      apiSearch,
      searching,
      typing,
    };
  },
  props: ["placeholder", "columns", "headers", "url"],
  emits: ["selectedObject"],
};
</script>

<style lang="css" scoped>
.select-button {
  @apply rounded-xl  bg-blue-400 px-2 text-xs flex  items-center   tracking-widest  cursor-pointer  hover:bg-blue-300 hover:text-white;
}

.page-button {
  @apply text-xs px-2 py-1 bg-yellow-300  rounded-lg;
}
</style>