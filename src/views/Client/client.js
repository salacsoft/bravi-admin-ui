import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { CLIENT_ENDPOINT, clientAPI } from "@/API/client-api";
import { API } from "@/API/axios-instance";
import { createToast } from "mosha-vue-toastify";
import { PAGE_LENGTH } from "@/constants/Page";
import SearchInput from "../../components/SearchInput.vue";
import Pagination from "../../components/Pagination.vue";
import PageLength from "../../components/PageLength.vue";
import ExportTo from "../../components/ExportTo.vue";


export default {
   components: { SearchInput, Pagination, PageLength, ExportTo },
   setup() {
      const store = useStore();
      const router = useRouter();

      let currentUrl = ref(CLIENT_ENDPOINT.URL);

      //table column headers
      const headers = reactive(["Code", "Name", "Address"]);

      //default pageLength
      let rowCounts = ref(10);

      const pageOptions = reactive(PAGE_LENGTH);

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

      onMounted(() => {
         getList();
      });


      function getList() {
         let options = {
            paginate: rowCounts.value ? rowCounts.value : null,
            search: lookUp.value ? lookUp.value : null,
            orderBy: "client_name",
         };

         clientAPI
            .getList(options)
            .then((response) => {
               console.log("dtre", response.data);
               store.dispatch("loadList", response.data);
            })
            .catch((errors) => {
               console.log("errors vclinet", errors);
               createToast("Error : " + errors.response.message, {
                  type: "danger",
                  timeout: 10000,
               });
            });
      }

      function removeClient(client) {
         // store.commit("setClient", client);
         alert(client);
      }

      function changePage(url) {
         currentUrl.value = url;
         let nextPage = `${url}&paginate=${rowCounts.value}`;
         if (lookUp.value != "") {
            nextPage += "&search=" + lookUp.value;
         }
         clientAPI.changePage(nextPage)
            .then((response) => {
               store.dispatch("loadList", response.data);
               isSelectedAll();
            })
            .catch((errors) => {
               console.log("errors" + errors.response.message);
               createToast("Error : " + errors.response.message, {
                  type: "danger",
                  timeout: 10000,
               });
            });
      }

      function isSelectedAll() {
         list.value = store.getters.getList;
         let chkBox = document.getElementById("selectAll");
         chkBox.checked = list.value.length > 0 ? true : false;
         list.value.forEach((item) => {
            const index = selectedRows.value.indexOf(item.id);
            if (index < 0) {
               chkBox.checked = false;
            }
         });
      }

      function changePageLength(len) {
         changePage(CLIENT_ENDPOINT.URL);
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


      function filterClient() {
         let options = {
            paginate: rowCounts.value ? rowCounts.value : null,
            search: lookUp.value ? lookUp.value : null,
            orderBy: "client_name",
         };
         console.log("options", options);
         clientAPI.getList(options)
            .then((response) => {
               store.dispatch("loadList", response.data);
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
         selectedRows.value = [];
         filterClient();
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

      function addNewClient() {
         router.push({ name: "NewClient" });
      }


      function exportList() {
         let url = CLIENT_ENDPOINT.URL + "/file/export";
         API.post(url, { selected: selectedRows.value }, { responseType: "blob" })
            .then((response) => {
               const url = window.URL.createObjectURL(new Blob([response.data]));
               const link = document.createElement("a");
               link.href = url;
               link.setAttribute("download", "file.xlsx");
               link.click();
            })
            .catch((errors) => {
               console.log(errors);
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
         filterClient,
         addNewClient,
         removeClient,
         changePage,
         changePageLength,
         exportList,
         refreshList,
         checkRow,
         selectAll,
         isSelectedAll,
      };
   },
};