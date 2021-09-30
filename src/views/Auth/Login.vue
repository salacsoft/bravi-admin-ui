<template>
  <div class="h-screen flex flex-col justify-between bg-gray-100 text-gray-900">
    <div class="h-5/6 md:h-full flex flex-col md:flex-row justify-center">
      <!-- image left side -->
      <div class="md:w-3/5 flex">
        <img src="/img/auth.svg" alt="login image" class="hidden md:block" />
      </div>
      <!-- login form -->
      <div class="md:w-2/5 md:h-full md:flex md:items-center md:justify-center">
        <form
          class="w-full flex flex-col items-center px-6"
          @submit.prevent="login"
        >
          <div class="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-24 w-24 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h2 class="font-semibold text-2xl lg:text-4xl mb-10">
            {{ productName }}
            {{ status }}
          </h2>
          <div class="w-full max-w-sm space-y-4 mb-16 md:mb-24">
            <div class="">
              <label for="email" class="tracking-wider">Email</label>
              <div
                class="flex w-full bg-white rounded-xl h-10 py-2 px-2 shadow-md"
              >
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email address"
                  v-model="credential.email"
                  class="w-full rounded-l-lg px-2 py-2 focus:outline-none"
                  required
                />
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div class="">
              <label for="password" class="tracking-wider">Password</label>
              <div
                class="flex w-full bg-white rounded-xl h-10 py-2 px-2 shadow-md"
              >
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  v-model="credential.password"
                  class="w-full rounded-l-lg px-2 py-2 focus:outline-none"
                  required
                />
                <span class="eye-open hidden" @click="toggleEye">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fill-rule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span class="eye-close" @click="toggleEye">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clip-rule="evenodd"
                    />
                    <path
                      d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <button
            class="
              px-4
              py-2
              w-full
              max-w-sm
              tracking-wider
              rounded-xl
              bg-gradient-to-r
              from-yellow-400
              via-pink-500
              to-red-500
            "
          >
            Login
          </button>
          <div class="flex justify-end w-full max-w-sm mt-4">
            <router-link to="forgot-password" class="underline tracking-wider">
              Forgot Password
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { API } from "@/API/axios-instance";
import { createToast } from "mosha-vue-toastify";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const apiMessage = ref("");
    const credential = reactive({
      email: "",
      password: "",
    });

    const productName = process.env.VUE_APP_NAME;
    const copyright = process.env.VUE_APP_COPYRIGHT;

    const login = () => {
      API.post("/login", credential)
        .then((response) => {
          let data = response.data;
          let msg = data.message;
          createToast("Welcome " + data.data.full_name, { type: "success" });

          const { email, full_name, uuid, user_uuid, user_id } = data.data;

          store.dispatch("setUserToken", data.data);
          store.dispatch("setUserDetails", {
            email,
            full_name,
            uuid,
            user_uuid,
            user_id,
          });
          router.push("/");
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            let msg = error.response.data.message;
            status.value = msg;
            createToast(msg, { type: "danger", timeout: 10000 });
          }
        });
    };

    const toggleEye = () => {
      const openEye = document.querySelector(".eye-open");
      openEye.classList.toggle("hidden");
      const closeEye = document.querySelector(".eye-close");
      closeEye.classList.toggle("hidden");
      const pass = document.getElementById("password");

      if (closeEye.classList.contains("hidden")) {
        pass.setAttribute("TYPE", "Text");
      } else {
        pass.setAttribute("TYPE", "Password");
      }
    };

    return {
      credential,
      status,
      login,
      toggleEye,
      productName,
      copyright,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>