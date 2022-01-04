//LIBRARIES
import { reactive, onMounted, ref, toRaw } from 'vue';
import { useRoute, useRouter } from "vue-router";


//COMPONENTS
import FormInput from '@/components/Forms/FormInput';
import PageTitle from '@/components/PageTitle';
import SubmitButton from '@/components/buttons/SubmitButton';

//HELPERS
import { apiHttp } from '@/API/httpService';
import errorHandler from '@/API/ErrorHandler';
import { createToast } from "mosha-vue-toastify";

//CONSTANTS and VARIABLES
import { GROUP_ENDPOINT } from './constant';

export default {
   components: { FormInput, PageTitle, SubmitButton },

   setup() {
      const route = useRoute();
      const router = useRouter();

      let pageTitle = ref("Group");
      let form = reactive({
         group_name: "",
         id: null
      })

      onMounted(() => {
         form.id = route.params.id || null;
         pageTitle.value = "Add new group"
         if (form.id) {
            pageTitle.value = "Edit group"
            getGroup(form.id);
         }
      });


      function submitGroup() {
         if (form.id == null)
            saveGroup()
         else
            updateGroup()
      }

      function saveGroup() {
         apiHttp.post(GROUP_ENDPOINT, toRaw(form))
            .then(response => {
               let newGroupName = response.data.data.group_name;
               createToast({ title: "Success", description: "New Group saved " + newGroupName }, {
                  type: "success",
                  timeout: 3000,
                  position: 'top-center',
                  onClose: function () {
                     form.group_name = "";
                     form.id = null;
                     router.push({ name: "Groups" });
                  }
               });
            })
            .catch(errors => {
               let msg = errorHandler(errors);
               createToast({ title: "ALERT", description: msg }, { type: "warning", timeout: 9000, position: "top-center" });
            })
      }

      function updateGroup() {
         apiHttp.patch(GROUP_ENDPOINT + "/" + form.id, form)
            .then(response => {
               let updatedGroupName = response.data.data.group_name;
               createToast({ title: "Success", description: "Group updated to  " + updatedGroupName }, {
                  type: "success",
                  timeout: 3000,
                  position: 'top-center',
                  onClose: function () {
                     form.group_name = "";
                     form.id = null;
                     router.push({ name: "Groups" });
                  }
               });
            })
            .catch(errors => {
               let msg = errorHandler(errors);
               createToast({ title: "ALERT", description: msg }, { type: "warning", timeout: 9000, position: "top-center" });
            })
      }

      function getGroup() {
         apiHttp.get(GROUP_ENDPOINT + "/" + form.id, toRaw(form))
            .then(response => {
               form.id = response.data.id;
               form.group_name = response.data.group_name;
            })
            .catch(errors => {
               let msg = errorHandler(errors);
               createToast({ title: "ALERT", description: msg }, { type: "warning", timeout: 9000, position: "top-center" });
            })
      }

      return { form, submitGroup, router, pageTitle }
   }
}