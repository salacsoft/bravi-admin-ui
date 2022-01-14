//LIBRARIES
import { reactive, onMounted, ref, toRaw, computed } from 'vue';
import { useRoute, useRouter } from "vue-router";


//COMPONENTS
import FormInput from '@/components/Forms/FormInput';
import FormSelect from '@/components/Forms/FormSelect';
import PageTitle from '@/components/PageTitle';
import SubmitButton from '@/components/buttons/SubmitButton';


//HELPERS
import { apiHttp } from '@/API/httpService';
import errorHandler from '@/API/ErrorHandler';
import { createToast } from "mosha-vue-toastify";


//CONSTANTS and VARIABLES
import { BRANCHES_ENDPOINT } from './constant';
import { CLIENT_ENDPOINT } from '@/views/Client/js/constant';

export default {
   components: { FormInput, PageTitle, SubmitButton, FormSelect },

   setup() {
      const route = useRoute();
      const router = useRouter();

      let pageTitle = ref("Branch");
      let clientURL = CLIENT_ENDPOINT;


      let form = reactive({
         code_client: null,
         client_name: "",
         client_code: "",
         client_uuid: "",
         branch_code: "",
         branch_name: "",
         branch_address: "",
         id: null
      });

      //Concatenate client code and client name to to display in client name field
      form.code_client = computed(() => {
         return form.client_code && form.client_name ? form.client_code + " - " + form.client_name : "";
      });


      onMounted(() => {
         form.id = route.params.id || null;
         pageTitle.value = "Branch"
         if (form.id) {
            pageTitle.value = "Edit Branch info."
            getRecord(form.id);
         }
      });



      const selectFromList = (event) => {

         let client = JSON.parse(event);
         form.client_code = client.client_code;
         form.client_name = client.client_name;
         form.client_uuid = client.uuid

      }



      const submitForm = () => {
         console.log(form);
         if (form.id == null)
            save()
         else
            update()

      }

      const save = () => {
         apiHttp.post(BRANCHES_ENDPOINT, toRaw(form))
            .then(response => {

               createToast({ title: "Success", description: "New Branch " + response.data.branch_name + " saved." }, {
                  type: "success",
                  timeout: 4000,
                  position: 'top-center',
                  onClose: function () {
                     form.group_name = "";
                     form.id = null;
                     router.push({ name: "Branches" });
                  }
               });
            })
            .catch(errors => {
               let msg = errorHandler(errors);
               createToast({ title: "ALERT", description: msg }, { type: "warning", timeout: 9000, position: "top-center" });
            })
      }

      const update = () => {
         apiHttp.patch(BRANCHES_ENDPOINT + "/" + form.id, form)
            .then(response => {
               Object.assign(form, response.data);
               createToast({ title: "Success", description: "Branch  " + form.branch_name + "  successfully updated " }, {
                  type: "success",
                  timeout: 4000,
                  position: 'top-center',
                  onClose: function () {
                     form.last_name = "";
                     form.id = null;
                     router.back();
                  }
               });
            })
            .catch(errors => {
               let msg = errorHandler(errors);
               createToast({ title: "ALERT", description: msg }, { type: "warning", timeout: 9000, position: "top-center" });
            })
      }



      const getRecord = () => {
         apiHttp.get(BRANCHES_ENDPOINT + "/" + form.id, toRaw(form))
            .then(response => {
               Object.assign(form, response.data);
            })
            .catch(errors => {
               console.log(errors);
               let msg = errorHandler(errors);
               createToast({ title: "ALERT", description: msg }, { type: "warning", timeout: 9000, position: "top-center" });
            })
      }



      return { form, submitForm, router, pageTitle, selectFromList, clientURL }
   }
}