<template>
  <div class="w-full p-5 h-full mx-auto space-y-4">
    <div class="flex justify-between">
      <h2 class="text-2xl flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
            clip-rule="evenodd"
          />
        </svg>
        Client List
      </h2>
      <div class="flex w-2/6 bg-white rounded-xl h-10 py-2 px-2 shadow-md">
        <input
          type="text"
          id="email"
          placeholder="Search Client"
          class="w-full rounded-l-lg px-2 py-2 focus:outline-none"
          required
        />
        <span class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>

    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="
            inline-block
            min-w-full
            overflow-hidden
            align-middle
            border-b border-gray-200
            shadow
            sm:rounded-lg
          "
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  v-for="title in headers"
                  :key="title"
                  class="
                    px-6
                    py-3
                    text-xs
                    font-medium
                    leading-4
                    tracking-wider
                    text-left text-white
                    uppercase
                    border-b border-gray-200
                    bg-gray-700
                  "
                >
                  {{ title }}
                </th>
                <th
                  class="
                    px-6
                    py-3
                    text-xs
                    font-medium
                    leading-4
                    tracking-wider
                    text-left text-white
                    uppercase
                    border-b border-gray-200
                    bg-gray-700
                  "
                >
                  Edit
                </th>
                <th
                  class="
                    px-6
                    py-3
                    text-xs
                    font-medium
                    leading-4
                    tracking-wider
                    text-left text-white
                    uppercase
                    border-b border-gray-200
                    bg-gray-700
                  "
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr
                v-for="client in list"
                :key="client.id"
                class="hover:bg-blue-200"
              >
                <td
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                >
                  {{ client.client_code }}
                </td>
                <td
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                >
                  {{ client.client_name }}
                </td>
                <td
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                >
                  {{ client.client_address }}
                </td>
                <td
                  class="
                    px-6
                    py-4
                    text-sm
                    leading-5
                    text-gray-500
                    whitespace-no-wrap
                    border-b border-gray-200
                  "
                >
                  <button title="click to edit client" :data="client.id">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </td>
                <td
                  class="
                    px-6
                    py-4
                    text-sm
                    leading-5
                    text-gray-500
                    whitespace-no-wrap
                    border-b border-gray-200
                  "
                >
                  <button
                    title="click to remove client"
                    :data="client.id"
                    @click="removeClient(client.id)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- pagination -->
    <div class="flex justify-between">
      <div class="space-x-3">
        <label for="cars">Page length:</label>
        <select name="pagelength" id="pageLength" class="py-2 px-2">
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="all">all</option>
        </select>
      </div>
      <div class="flex">
        <a
          href="#"
          class="
            flex
            items-center
            px-4
            py-2
            mx-1
            text-gray-500
            bg-gray-300
            rounded-md
            cursor-not-allowed
            dark:bg-gray-800
            dark:text-gray-600
          "
        >
          previous
        </a>

        <a
          href="#"
          class="
            flex
            items-center
            px-4
            py-2
            mx-1
            text-gray-700
            transition-colors
            duration-200
            transform
            bg-gray-300
            rounded-md
            dark:bg-gray-800
            dark:text-gray-200
            hover:bg-yellow-600
            dark:hover:bg-yellow-500
            hover:text-white
            dark:hover:text-gray-200
          "
        >
          1
        </a>

        <a
          href="#"
          class="
            flex
            items-center
            px-4
            py-2
            mx-1
            text-gray-700
            transition-colors
            duration-200
            transform
            bg-gray-300
            rounded-md
            dark:bg-gray-800
            dark:text-gray-200
            hover:bg-yellow-600
            dark:hover:bg-yellow-500
            hover:text-white
            dark:hover:text-gray-200
          "
        >
          2
        </a>

        <a
          href="#"
          class="
            flex
            items-center
            px-4
            py-2
            mx-1
            text-gray-700
            transition-colors
            duration-200
            transform
            bg-gray-300
            rounded-md
            dark:bg-gray-800
            dark:text-gray-200
            hover:bg-yellow-600
            dark:hover:bg-yellow-500
            hover:text-white
            dark:hover:text-gray-200
          "
        >
          3
        </a>

        <a
          href="#"
          class="
            flex
            items-center
            px-4
            py-2
            mx-1
            text-gray-700
            transition-colors
            duration-200
            transform
            bg-gray-300
            rounded-md
            dark:bg-gray-800
            dark:text-gray-200
            hover:bg-yellow-600
            dark:hover:bg-yellow-500
            hover:text-white
            dark:hover:text-gray-200
          "
        >
          Next
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Table from "../../components/Forms/Table.vue";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const headers = reactive(["Code", "Name", "Address"]);

    onMounted(() => {
      store.dispatch("getListOfClients");
    });

    function removeClient(client) {
      // store.commit("setClient", client);
      alert(client);
    }

    return {
      list: computed(() => store.getters.getList),
      meta: computed(() => store.getters.getMeta),
      links: computed(() => store.getters.getLinks),
      headers,
      removeClient,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>