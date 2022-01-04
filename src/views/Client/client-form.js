import { toRaw, ref, reactive, computed, onMounted } from "vue";
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
import errorHandler from "@/API/ErrorHandler";


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



      const id = ref(null);

      onMounted(() => {

         id.value = route.params.id || null;
         if (id.value) getClientInfo(id.value);

      });


      const rules = computed(() => {
         return {
            client_code: { required },
            client_name: { required }
         }
      });

      const v = useVuelidate(rules, form);

      function getClientInfo(id) {
         clientAPI.find(id)
            .then(response => {
               let data = response.data;
               form.client_code = data.client_code;
               form.client_name = data.client_name;
               form.client_address = data.client_address;
               data.value = data.id;
            })
            .catch(errors => {
               let msg = errorHandler(errors);
               createToast({ title: "ALERT", description: msg }, { type: "warning", timeout: 9000, position: "top-center" });
            });
      }


      function submitForm() {
         v.value.$validate();
         if (!v.value.$error) {
            if (id.value)
               updateClient()
            else
               saveClient();
         }
      }



      function saveClient() {
         clientAPI.save(toRaw(form))
            .then(response => {
               let { client_name: clientName } = response.data.data;
               createToast({
                  title: "Success",
                  description: `New Client ( ${clientName} ) successfully registered.`
               }, {
                  type: "success",
                  timeout: 5000,
                  onClose: (() => {
                     router.push({ name: "Clients" });
                  })
               });
            })
            .catch(errors => {
               let msg = errorHandler(errors);
               createToast({ title: "ALERT", description: msg }, { type: "warning", timeout: 9000, position: "top-center" });
            });
      }



      function updateClient() {
         clientAPI.update(id.value, toRaw(form))
            .then(response => {
               let { client_name: clientName } = response.data.data;
               createToast({
                  title: "Success",
                  description: `Client ( ${clientName} ) successfully updated.`
               }, {
                  type: "success",
                  timeout: 5000,
                  onClose: (() => {
                     router.push({ name: "Clients" });
                  })
               });
            })
            .catch(errors => {
               let msg = errorHandler(errors);
               createToast({ title: "ALERT", description: msg }, { type: "warning", timeout: 9000, position: "top-center" });
            });
      }

      function cancel() {
         router.go(-1);
      }

      return {
         form,
         submitForm,
         cancel,
         v
      };
   }
};