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
import Datatable from "@/components/Datatable";
import AddIcon from '@/components/Icons/AddIcon';
import Swal from 'sweetalert2'

export default {
   components: { AddIcon, SearchInput, Pagination, PageLength, ExportTo, Datatable },
   setup() {

      const store = useStore();
      const router = useRouter();
      const pageOptions = reactive(PAGE_LENGTH);
      const headers = reactive(["Code", "Name", "Address"]);
      const haveActionButon = ref(true);

      const actionButtons = [{
         icon: "EditIcon",
         color: "text-blue-400",
         action: "edit"
      }, {
         icon: "RemoveIcon",
         color: "text-red-500",
         action: "remove"
      }];

      const dataColumns = reactive([
         "client_code",
         "client_name",
         "client_address",
      ]);


      let currentUrl = ref(CLIENT_ENDPOINT.URL + "?page=1");
      let rowCounts = ref(10);
      let lookUp = ref("");
      let selectedRows = ref([]);
      let list = ref([]);
      let exportTo = ref('');



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

      const removeConfirmation = (client) => {
         Swal.fire({
            title: 'Are you sure?',
            html: `${client.client_code} <br>  <b>${client.client_name} </b><br> ${client.client_address}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
         }).then(result => {
            if (result.isConfirmed) {
               removeClient(client);
            }
         })
      }


      function removeClient(client) {
         clientAPI.delete(client.id)
            .then(response => {
               createToast({
                  title: "Success",
                  description: `Client ( ${client.client_name} ) has been deleted.`
               }, {
                  type: "success",
                  timeout: 3000
               });
               changePage(currentUrl.value);
            })
            .catch(errors => {
               let { title, description } = ErrorHandler(errors)
               createToast({ title, description }, {
                  type: "danger",
                  timeout: 10000,
               });
            });
      }


      const editClient = (client) => {
         router.push({ name: "UpdateClient", params: { id: client.id } });
      }


      const changePage = (url) => {
         currentUrl.value = url;
         let nextPage = `${url}&paginate=${rowCounts.value}`;

         if (lookUp.value != "") {
            nextPage += "&search=" + lookUp.value;
         }

         clientAPI.changePage(nextPage)
            .then((response) => {
               store.dispatch("loadList", response.data);
            })
            .catch((errors) => {
               console.log("errors", errors);
               createToast("Error : " + errors.response.message, {
                  type: "danger",
                  timeout: 10000,
               });
            });
      }

      // function isSelectedAll() {
      //    list.value = store.getters.getList;
      //    let chkBox = document.getElementById("selectAll");
      //    chkBox.checked = list.value.length > 0 ? true : false;
      //    list.value.forEach((item) => {
      //       const index = selectedRows.value.indexOf(item.id);
      //       if (index < 0) {
      //          chkBox.checked = false;
      //       }
      //    });
      // }

      const changePageLength = () => {
         changePage(CLIENT_ENDPOINT.URL + "?");
      }


      const refreshList = () => {
         lookUp.value = "";
         selectedRows.value = [];
         filterClient();
      }

      const filterClient = () => {
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


      const selectRow = (payload) => {
         const index = selectedRows.value.indexOf(payload.id);
         console.log("cjec", payload);
         if (payload.checked) {
            if (index < 0) {
               selectedRows.value.push(payload.id);
            }
         } else {
            if (index > -1) {
               selectedRows.value.splice(index, 1);
            }
         }
      }


      const selectAll = (selectedAll) => {
         let selectAllRows = selectedAll;
         list.value = store.getters.getList;
         list.value.forEach((item) => {
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

      const addNewClient = () => {

         router.push({ name: "NewClient" });
      }


      const exportList = () => {
         let type = {
            "excel": "Clients.xlsx",
            "pdf": "Clients.pdf",
            "csv": "Clients.csv",
         }

         if (exportTo.value == "print") {
            createToast("Sorry, this feature is not yet avaible :(", {
               type: "info",
               timeout: 5000,
               position: "bottom-center",
               showIcon: true,
               transition: "slide",
            });
         } else {
            let url = CLIENT_ENDPOINT.URL + "/file/export";
            API.post(url, { selected: selectedRows.value, exportType: exportTo.value }, { responseType: "blob" })
               .then((response) => {
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute("download", type[exportTo.value]);
                  link.click();
               })
               .catch((errors) => {
                  console.log(errors);
               });
         }
      }

      return {
         list: computed(() => store.getters.getList),
         meta: computed(() => store.getters.getMeta),
         links: computed(() => store.getters.getLinks),
         headers,
         dataColumns,
         haveActionButon,
         rowCounts,
         pageOptions,
         lookUp,
         selectedRows,
         exportTo,
         actionButtons,
         filterClient,
         addNewClient,
         removeConfirmation,
         editClient,
         changePage,
         changePageLength,
         exportList,
         refreshList,
         selectRow,
         selectAll
      };
   }
};