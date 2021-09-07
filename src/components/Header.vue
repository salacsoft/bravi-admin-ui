<template>
   <div class="flex justify-between bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 h-14 items-center px-4">
      <!-- left nav -->
      <button>
         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
         </svg>
      </button>
      <!-- right nvar -->
      <div class="flex space-x-2">
         <div>
            <button title="Click to view profile" class="border-2 rounded-2xl border-gray-600 p-2 ">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
            </button>
         </div>
         <div>
            <button title="Click to logout" class="border-2 rounded-2xl border-white p-2">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
               </svg>
            </button>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   setup () {
      

      return {}
   }
}
</script>

<style lang="scss" scoped>

</style>