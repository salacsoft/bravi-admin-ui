<template>
  <div class="h-full">
    <page-title
      :title="pageTitle"
      subTitle="Account Manager form"
      class="mb-5"
    />
    <div class="w-full max-w-2xl bg-gray-100 rounded-lg shadow-lg px-4 py-5">
      <form @submit.prevent="submitForm" class="h-full">
        <div class="flex flex-col h-full justify-between">
          <div class="border-b pb-1 mb-3">
            <h2 class="text-xl">Please fill up the form</h2>
          </div>
          <div class="mb-10 space-y-5 px-4">
            <div class="form-group">
              <label for="Account code" class="text-sm tracking-wider"
                >Account Code</label
              >
              <form-input
                placeholder="Enter a unique account code"
                v-model.trim="form.account_code"
                :class="{ 'border-red-500': false }"
              />
              <span v-if="false" class="text-xs text-red-600 tracking-widest"
                >Please fill-up first name</span
              >
            </div>
            <div class="form-group">
              <label for="First name" class="text-sm tracking-wider"
                >First name</label
              >
              <form-input
                placeholder="Enter first name"
                v-model.trim="form.first_name"
              />
            </div>
            <div class="form-group">
              <label for="Middle name" class="text-sm tracking-wider"
                >Middle name</label
              >
              <form-input
                placeholder="Enter middle name"
                v-model.trim="form.middle_name"
              />
            </div>
            <div class="form-group">
              <label for="Account pin" class="text-sm tracking-wider"
                >Account pin</label
              >
              <form-input
                placeholder="Enter account pin, It will be use to login on our PWA App"
                v-model.trim="form.account_pin"
              />
            </div>
            <div class="form-group">
              <label for="Mobile number" class="text-sm tracking-wider"
                >Mobile number</label
              >
              <form-input
                placeholder="Enter mobile number"
                v-model.trim="form.mobile_no"
              />
            </div>
          </div>

          <div class="flex justify-end px-5 mb-4 mt-3">
            <submit-button class="w-36">Submit</submit-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="../js/form.js">
</script>

<style lang="css" scoped>
</style>