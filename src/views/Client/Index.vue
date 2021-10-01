<template>
  <div class="w-full p-5 h-full mx-auto space-y-4">
    <div class="flex justify-between">
      <div class="flex space-x-4">
        <button
          class="
            text-lg
            flex
            items-center
            border
            rounded-lg
            text-white
            px-3
            space-x-2
            bg-yellow-600
            hover:bg-yellow-400
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Add Client</span>
        </button>
      </div>

      <search-input
        @search="searchClient"
        @refresh="refreshList"
        placeholder="search client"
        v-model="lookUp"
      />
    </div>

    <div class="">
      <div class="py-2 -my-2 overflow-x-auto mx-auto">
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
              <tr
                class="
                  bg-gradient-to-r
                  from-yellow-300
                  via-pink-300
                  to-red-400
                  text-gray-800
                "
              >
                <th
                  class="
                    px-6
                    py-4
                    text-xs
                    font-medium
                    leading-4
                    tracking-wider
                    text-left
                    uppercase
                    border-b border-gray-200
                    flex-grow
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
                  class="
                    px-6
                    py-4
                    text-lg
                    font-medium
                    leading-4
                    tracking-wider
                    text-left
                    uppercase
                    border-b border-gray-200
                    flex-grow
                  "
                  v-for="(header, index) in headers"
                  :key="index"
                >
                  {{ header }}
                </th>
                <th
                  class="
                    px-6
                    py-4
                    text-lg
                    font-medium
                    leading-4
                    tracking-wider
                    text-left
                    uppercase
                    border-b border-gray-200
                    flex-grow
                  "
                  v-if="haveActionButon"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
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
                  v-for="(column, index) in dataColumns"
                  :key="index"
                >
                  {{ client[column] }}
                </td>
                <td
                  class="
                    px-6
                    py-4
                    space-x-4
                    text-sm
                    leading-5
                    text-gray-500
                    whitespace-no-wrap
                    border-b border-gray-200
                  "
                  v-if="haveActionButon"
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
          <page-length
            :options="pageOptions"
            v-model="rowCounts"
            @changePageLength="changePageLength"
          />
          <export-to v-model="exportTo" @exportList="exportList" />
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
import PageLength from "../../components/PageLength.vue";
import ExportTo from "../../components/ExportTo.vue";

export default {
  components: { SearchInput, Pagination, PageLength, ExportTo },
  setup() {
    const store = useStore();
    const router = useRouter();

    //hold the base url and current url for pagination
    const clientUrl = ref("/v1/clients?");
    let currentUrl = ref(clientUrl.value);

    //table column headers
    const headers = reactive(["Code", "Name", "Address"]);

    //default pageLength
    let rowCounts = ref(10);

    const pageOptions = reactive({
      10: "10",
      20: "20",
      30: "30",
      50: "50",
      100: "100",
      200: "200",
      1000: "1K",
      2000: "2K",
      3000: "3K",
      5000: "5K",
      10000: "10K",
      50000: "50K",
      100000: "100K",
    });

    //default export selection
    let exportTo = ref("");

    //variable that holds the string to search
    let lookUp = ref("");

    //holds the id of selected rows
    let selectedRows = ref([]);

    //list of clients
    let list = ref([]);
    const haveActionButon = ref(true);

    const dataColumns = reactive([
      "client_code",
      "client_name",
      "client_address",
    ]);

    const dataActions = reactive([
      {
        tooltip: "Click to edit Client",
        trigger: "edit",
        label:
          '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />  <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" /></svg>',
        data: "id",
      },
      {
        tooltip: "Click to Remove Client",
        trigger: "delete",
        label:
          '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-700" viewBox="0 0 20 20" fill="currentColor">  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>',
        data: "id",
      },
    ]);

    onMounted(async () => {
      clientService
        .getList(clientUrl.value + "?paginate=" + rowCounts.value)
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
      let nextPage = `${url}&paginate=${rowCounts.value}`;
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
        const index = selectedRows.value.indexOf(item.id);
        if (index < 0) {
          chkBox.checked = false;
        }
      });
    }

    function changePageLength(len) {
      changePage(clientUrl.value);
    }

    function exportList() {
      alert(exportTo.value);
      createToast("Sorry, this feature is not yet avaible :(", {
        type: "info",
        timeout: 5000,
        position: "bottom-center",
        showIcon: true,
        transition: "slide",
      });
    }

    function searchClient() {
      let searchUrl = `${clientUrl.value}?paginate=${rowCounts.value}&orderBy=client_name&search=${lookUp.value}`;
      filterClient(searchUrl);
    }

    function filterClient(url) {
      clientService
        .search(url)
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

    function refreshList() {
      lookUp.value = "";
      let filterUrl = `${clientUrl.value}?paginate=${rowCounts.value}&orderBy=client_name`;
      filterClient(filterUrl);
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
      dataColumns,
      dataActions,
      haveActionButon,
      rowCounts,
      pageOptions,
      lookUp,
      selectedRows,
      exportTo,
      removeClient,
      changePage,
      changePageLength,
      exportList,
      searchClient,
      refreshList,
      checkRow,
      selectAll,
      isSelectedAll,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>