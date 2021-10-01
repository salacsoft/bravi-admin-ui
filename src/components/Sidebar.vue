<template>
  <div
    class="
      flex flex-col
      bg-gray-700
      text-gray-50
      transition
      ease-in-out
      duration-700
      w-20
      sm:w-20
      md:w-60
      lg:w-80
    "
  >
    <!-- logo -->
    <div class="flex bg-gray-600 h-14 items-center px-4 space-x-3 mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 text-yellow-600"
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
      <h3 class="hidden sm:hidden md:block text-2xl font-semi-bold">
        <router-link to="/">{{ projectName }}</router-link>
      </h3>
    </div>
    <!-- logo end -->

    <!-- nav -->
    <nav class="px-2 py-1 flex-grow flex flex-col">
      <div class="sidebar-menu flex-grow">
        <div
          class="
            rounded-lg
            px-4
            py-2
            divide-solid
            hover:border-r-2 hover:border-yellow-600
            hover:bg-gray-600
            hover:text-yellow-300
          "
        >
          <router-link to="/clients" class="flex space-x-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h1 class="hidden sm:hidden md:block text-lg">Clients</h1>
          </router-link>
        </div>
        <div
          class="
            rounded-lg
            px-4
            py-2
            hover:border-l-2 hover:border-yellow-600
            hover:bg-gray-600
            hover:text-yellow-300
          "
        >
          <router-link to="/groups" class="flex space-x-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h1 class="hidden sm:hidden md:block text-lg">Groups</h1>
          </router-link>
        </div>
        <div
          class="
            rounded-lg
            px-4
            py-2
            hover:border-l-2 hover:border-yellow-600
            hover:bg-gray-600
            hover:text-yellow-300
          "
        >
          <router-link to="/home" class="flex space-x-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h1 class="hidden sm:hidden md:block text-lg">Branches</h1>
          </router-link>
        </div>
        <div
          class="
            rounded-lg
            px-4
            py-2
            hover:border-l-2 hover:border-yellow-600
            hover:bg-gray-600
            hover:text-yellow-300
          "
        >
          <router-link to="/home" class="flex space-x-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h1 class="hidden sm:hidden md:block sm:text-xs md:text-lg">
              Survey Questions
            </h1>
          </router-link>
        </div>
      </div>

      <!-- version -->
      <div
        class="flex flex-col sm:flex-row justify-between text-xs items-center"
      >
        <p>v1.0.24</p>
        <p>&copy; 2021 Bravi.com</p>
      </div>
    </nav>
    <!-- nav end-->
  </div>
</template>

<script>
export default {
  setup() {
    const projectName = "Your Brand";

    return {
      projectName,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>