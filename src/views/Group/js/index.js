//LIBRARIES and PACKAGES
import { ref, reactive, onMounted, computed } from "vue";
import Swal from 'sweetalert2'
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { createToast } from "mosha-vue-toastify";

//COMPONENTS
import { PAGE_LENGTH } from "@/constants/Page";
import SearchInput from "@/components/SearchInput.vue";
import Pagination from "@/components/Pagination.vue";
import PageLength from "@/components/PageLength.vue";
import ExportTo from "@/components/ExportTo.vue";
import Datatable from "@/components/Datatable";
import AddIcon from '@/components/Icons/AddIcon';
import PageTitle from '@/components/PageTitle';


//HELPERS
import { apiHttp } from '@/API/httpService.js'
import errorHandler from '@/API/ErrorHandler';

//CONSTANTS
import { ACTION_BUTTONS, API_OPTION, COLUMNS, GROUP_ENDPOINT, TABLE_HEADERS, HAVE_ACTION_BUTTON } from './constant.js'

export default {

   components: { AddIcon, SearchInput, Pagination, PageLength, ExportTo, Datatable, PageTitle },

   setup() {

      const store = useStore();
      const router = useRouter();
      const pageOptions = reactive(PAGE_LENGTH);

      let currentUrl = ref(GROUP_ENDPOINT + "?page=1");
      let rowCounts = ref(10);
      let lookUp = ref("");
      let selectedRows = ref([]);
      let list = ref([]);
      let exportTo = ref('');
      let options = reactive(API_OPTION);



      onMounted(() => {
         getList();
      });

      function getList() {


         apiHttp.get(GROUP_ENDPOINT, options)
            .then((response) => {
               store.dispatch("loadGroupList", response.data);

               let groupList = store.getters.getGroupList;
               console.log("group", groupList);

            })
            .catch((errors) => {
               let msg = errorHandler(errors);
               createToast({ title: "ALERT", description: msg }, { type: "warning", timeout: 9000, position: "top-center" });
            });
      }

      const removeConfirmation = (group) => {
         Swal.fire({
            title: 'Are you sure?',
            html: `Group : <b>${group.group_name} </b>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
         }).then(result => {
            if (result.isConfirmed) {
               removeClient(group);
            }
         })
      }


      function removeClient(group) {
         apiHttp.delete(GROUP_ENDPOINT + "/" + group.id)
            .then(response => {
               createToast({
                  title: "Success",
                  description: `Group : ( ${group.group_name} ) has been deleted.`
               }, {
                  type: "success",
                  timeout: 3000,
                  position: 'top-center',
               });
               changePage(currentUrl.value);
            })
            .catch(errors => {
               let msg = errorHandler(errors);
               createToast({ title: "ALERT", description: msg }, { type: "warning", timeout: 9000, position: "top-center" });
            });
      }


      const editClient = (group) => {
         router.push({ name: "GroupUpdate", params: { id: group.id } });
      }


      const changePage = (url) => {
         currentUrl.value = url;
         let nextPage = `${url}&paginate=${rowCounts.value}`;

         if (lookUp.value != "") {
            nextPage += "&search=" + lookUp.value;
         }

         apiHttp.get(nextPage)
            .then((response) => {
               store.dispatch("loadGroupList", response.data);
            })
            .catch((errors) => {
               let msg = errorHandler(errors);
               createToast({ title: "ALERT", description: msg }, { type: "warning", timeout: 9000, position: "top-center" });
            });
      }


      const changePageLength = () => {
         options.params.paginate = rowCounts.value;
         options.params.search = lookUp.value;
         getList();
      }


      const refreshList = () => {
         lookUp.value = "";
         selectedRows.value = [];
         filterList();
      }

      const filterList = () => {
         options.params.search = lookUp.value;
         apiHttp.get(GROUP_ENDPOINT, options)
            .then((response) => {
               store.dispatch("loadGroupList", response.data);
            })
            .catch((errors) => {
               let msg = errorHandler(errors);
               createToast({ title: "ALERT", description: msg }, { type: "warning", timeout: 9000, position: "top-center" });
            });
      }


      const selectRow = (payload) => {
         const index = selectedRows.value.indexOf(payload.id);
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
         list.value = store.getters.getGroupList;
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

      const addNewGroup = () => {
         router.push({ name: "GroupCreate" });
      }


      const exportList = () => {
         let type = {
            "excel": "groups.xlsx",
            "pdf": "groups.pdf",
            "csv": "groups.csv",
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
            let url = GROUP_ENDPOINT + "/file/export";
            apiHttp.post(url, { selectedIds: selectedRows.value, exportType: exportTo.value }, { responseType: "blob" })
               .then((response) => {
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute("download", type[exportTo.value]);
                  link.click();
               })
               .catch((errors) => {
                  let msg = errorHandler(errors);
                  createToast({ title: "ALERT", description: msg }, { type: "warning", timeout: 9000, position: "top-center" });
               });
         }
      }

      return {
         list: computed(() => store.getters.getGroupList),
         meta: computed(() => store.getters.getGroupMeta),
         links: computed(() => store.getters.getGroupLinks),
         TABLE_HEADERS,
         COLUMNS,
         HAVE_ACTION_BUTTON,
         rowCounts,
         pageOptions,
         lookUp,
         selectedRows,
         exportTo,
         ACTION_BUTTONS,
         filterList,
         addNewGroup,
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