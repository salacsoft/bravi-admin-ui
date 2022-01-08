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
import _ from 'lodash'

//CONSTANTS and VARIABLES
import { ACCOUNT_MANAGER_ENDPOINT } from './constant';

export default {
   components: { FormInput, PageTitle, SubmitButton },

   setup() {
      const route = useRoute();
      const router = useRouter();

      let pageTitle = ref("Group");
      let form = reactive({
         account_code: "",
         account_pin: "",
         first_name: "",
         last_name: "",
         middle_name: "",
         mobile_no: "",
         id: null
      })

      onMounted(() => {
         form.id = route.params.id || null;
         pageTitle.value = "Account Manager"
         if (form.id) {
            pageTitle.value = "Edit Account Manager"
            getRecord(form.id);
         }
      });


      function submitForm() {
         console.log(form);
         if (form.id == null)
            save()
         else
            update()

      }

      function save() {
         apiHttp.post(ACCOUNT_MANAGER_ENDPOINT, toRaw(form))
            .then(response => {
               let newAm = response.data.full_name;
               createToast({ title: "Success", description: "New Account manager saved " + newAm }, {
                  type: "success",
                  timeout: 3000,
                  position: 'top-center',
                  onClose: function () {
                     form.group_name = "";
                     form.id = null;
                     router.push({ name: "AccountManagers" });
                  }
               });
            })
            .catch(errors => {
               let msg = errorHandler(errors);
               createToast({ title: "ALERT", description: msg }, { type: "warning", timeout: 9000, position: "top-center" });
            })
      }

      function update() {
         apiHttp.patch(ACCOUNT_MANAGER_ENDPOINT + "/" + form.id, form)
            .then(response => {
               for (let item in form) {
                  form[item] = response.data[item];
               }
               let amName = response.data.full_name;
               createToast({ title: "Success", description: "Account manager updated to  " + amName }, {
                  type: "success",
                  timeout: 3000,
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



      function getRecord() {
         apiHttp.get(ACCOUNT_MANAGER_ENDPOINT + "/" + form.id, toRaw(form))
            .then(response => {

               // form = toRaw(response.data);
               // console.log("form", form);
               for (let item in form) {
                  form[item] = response.data[item];
               }

            })
            .catch(errors => {
               console.log(errors);
               let msg = errorHandler(errors);
               createToast({ title: "ALERT", description: msg }, { type: "warning", timeout: 9000, position: "top-center" });
            })
      }

      return { form, submitForm, router, pageTitle }
   }
}