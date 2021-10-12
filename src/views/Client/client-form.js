import { toRaw, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from '@/components/Forms/FormTextArea';
import ActionButton from '@/components/buttons/ActionButton.vue';
import CardHeader from '@/components/Cards/CardHeader.vue';
import Container from '@/components/Cards/Container.vue';
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { clientAPI } from "@/API/client-api";
import { createToast } from "mosha-vue-toastify";
import ErrorHandler from "@/API/ErrorHandler";


export default {

   components: { FormInput, FormTextArea, ActionButton, CardHeader, Container },

   setup() {

      const route = useRoute();
      const router = useRouter();

      const form = reactive({
         client_code: "",
         client_name: "",
         client_address: ""
      });



      const rules = computed(() => {
         return {
            client_code: { required },
            client_name: { required }
         }
      });


      const v = useVuelidate(rules, form);

      function submitForm() {
         const id = route.params.id ? route.params.id : null;
         console.log("forms", toRaw(form));
         v.value.$validate();
         if (!v.value.$error) {
            if (id)
               updateClient()
            else
               saveClient();
         }
      }



      function saveClient() {
         clientAPI.saveClient(toRaw(form))
            .then(response => {
               let { client_name: clientName } = response.data.data;
               createToast({
                  title: "Success",
                  description: `New Client ( ${clientName} ) successfully registered.`
               }, {
                  type: "success",
                  timeout: 5000,
               });
               router.push({ name: "Clients" });
            })
            .catch(errors => {
               let { title, description } = ErrorHandler(errors)
               createToast({ title, description }, {
                  type: "danger",
                  timeout: 10000,
               });
            });
      }



      function updateClient() {
         clientAPI.saveClient(id.value, toRaw(form))
            .then(response => {
               console.log(response)
            })
            .catch(errors => {
               console.log(errors);
            });
      }

      return {
         form,
         submitForm,
         v
      };
   }
};