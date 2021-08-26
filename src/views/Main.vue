<template>
  <div class="relative min-h-screen flex">
      <!-- sidebar -->
        <sidebar />
      <!-- sidebar end -->

      <!-- container -->
      <div class="flex flex-col content w-full">

        <!-- top nav -->
         <topnav />
        <!-- top nav end -->

        <!-- content  here  -->
        <div class="flex-1 bg-gray-50 p-4">
          <router-view/>
        </div>
        <!-- content  here  -->
      </div>
      <!-- container end -->
      
  </div>
</template>

<script>
// @ is an alias to /src
import sidebar from '@/components/Sidebar.vue'
import topnav from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    sidebar,
    topnav
  }
}
</script>
