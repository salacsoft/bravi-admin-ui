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
      <search-input @search="searchClient" placeholder="search client" />
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
              <tr class="bg-yellow-600">
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
                  "
                >
                  <label>
                    <input
                      type="checkbox"
                      class="checkbox bg-white"
                      @change="selectAll($event)"
                      id="selectAll"
                    />
                  </label>
                </th>
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
                  "
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr
                v-for="(client, index) in list"
                :key="client.id"
                class="hover:bg-yellow-50"
                :class="
                  selectedRows.includes(client.id)
                    ? 'bg-yellow-100'
                    : index % 2 == 0
                    ? 'bg-gray-50'
                    : 'bg-white'
                "
              >
                <td
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                >
                  <label>
                    <input
                      type="checkbox"
                      class="checkbox"
                      :id="client.id"
                      :value="client.id"
                      v-model="selectedRows"
                      @change="checkRow($event)"
                    />
                  </label>
                </td>
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
        <div class="flex space-x-4 text-xs">
          <div class="space-x-2">
            <label for="cars">Page length:</label>
            <select
              name="pagelength"
              id="pageLength"
              class="py-2 px-3 rounded-lg"
              v-model="pageLength"
              @click="changePageLength"
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="all">all</option>
            </select>
            rows
          </div>
          <div class="space-x-2">
            <label for="cars">Export to:</label>
            <select
              name="pagelength"
              id="pageLength"
              class="py-2 px-3 rounded-lg"
              v-model="exportTo"
              @click="exportList"
            >
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
              <option value="print">Print</option>
            </select>
          </div>
        </div>
      </div>
      <pagination :meta="meta" @changePage="changePage" />
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import clientService from "@/API/clientService";
import { createToast } from "mosha-vue-toastify";
import SearchInput from "../../components/SearchInput.vue";
import Pagination from "../../components/Pagination.vue";

export default {
  components: { SearchInput, Pagination },
  setup() {
    const store = useStore();
    const router = useRouter();
    const headers = reactive(["Code", "Name", "Address"]);
    let pageLength = ref(10);
    const clientUrl = ref("/v1/clients?");
    let currentUrl = ref(clientUrl.value);
    let exportTo = ref("excel");
    let lookUp = ref("");
    let selectedRows = ref([]);
    let list = ref([]);

    onMounted(async () => {
      clientService
        .getList(clientUrl.value + "?paginate=" + pageLength.value)
        .then((response) => {
          store.dispatch("loadList", response);
        })
        .catch((errors) => {
          console.log("errors" + errors.message);
          createToast("Error : " + errors.message, {
            type: "danger",
            timeout: 10000,
          });
        });
    });

    function removeClient(client) {
      // store.commit("setClient", client);
      alert(client);
    }

    function changePage(url) {
      //check if all the rows was selected
      currentUrl.value = url;
      let nextPage = `${url}&paginate=${pageLength.value}`;
      if (lookUp.value != "") {
        nextPage += "&search=" + lookUp.value;
      }
      clientService
        .changePage(nextPage)
        .then((response) => {
          store.dispatch("loadList", response);
          isSelectedAll();
        })
        .catch((errors) => {
          console.log("errors" + errors.message);
          createToast("Error : " + errors.message, {
            type: "danger",
            timeout: 10000,
          });
        });
    }

    function isSelectedAll() {
      list.value = store.getters.getList;
      let chkBox = document.getElementById("selectAll");
      chkBox.checked = true;
      list.value.forEach((item) => {
        console.log("new item", item.id);
        const index = selectedRows.value.indexOf(item.id);
        if (index < 0) {
          console.log("di hanahap", item.id);
          chkBox.checked = false;
        }
      });
    }

    function changePageLength() {
      changePage(clientUrl.value);
    }

    function exportList() {
      createToast("Sorry, this feature is not yet avaible :(", {
        type: "info",
        timeout: 5000,
        position: "bottom-center",
        showIcon: true,
        transition: "slide",
      });
    }

    function searchClient(searchFor) {
      let searchUrl = `${clientUrl.value}?paginate=${pageLength.value}&orderBy=client_name&search=${searchFor}`;
      clientService
        .search(searchUrl)
        .then((response) => {
          store.dispatch("loadList", response);
        })
        .catch((errors) => {
          console.log("errors" + errors.message);
          createToast("Error : " + errors.message, {
            type: "danger",
            timeout: 10000,
          });
        });
    }

    function checkRow(e) {
      console.log(e);
      console.log("selected", selectedRows.value);
    }

    function selectAll(e) {
      let selectAllRows = e.target.checked;
      list.value = store.getters.getList;
      list.value.forEach((item) => {
        console.log("client:", item.id);
        const index = selectedRows.value.indexOf(item.id);
        if (selectAllRows) {
          if (index < 0) {
            selectedRows.value.push(item.id);
          }
        } else {
          if (index > -1) {
            selectedRows.value.splice(index, 1);
          }
        }
      });
    }

    return {
      list: computed(() => store.getters.getList),
      meta: computed(() => store.getters.getMeta),
      links: computed(() => store.getters.getLinks),
      headers,
      removeClient,
      changePage,
      pageLength,
      changePageLength,
      exportTo,
      exportList,
      searchClient,
      lookUp,
      selectedRows,
      checkRow,
      selectAll,
      isSelectedAll,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>