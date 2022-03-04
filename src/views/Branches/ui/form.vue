<template>
  <div class="h-full">
    <page-title
      :title="pageTitle"
      subTitle="Account Manager form"
      class="mb-5"
    />

    <div class="w-full max-w-2xl bg-gray-100 rounded-lg shadow-lg px-4 py-5">
      <div class="border-b pb-1 mb-3">
        <h2 class="text-xl">Please fill up the form</h2>
      </div>

      <div class="px-4 mb-5">
        <label for="client" class="text-sm tracking-wider"
          >Search Owner/Client</label
        >
        <form-select
          placeholder="Type to search client / owner"
          :url="clientURL"
          :columns="['client_code', 'client_name']"
          :headers="['Code', 'Owner / Client']"
          @selectedObject="selectFromList"
        />
      </div>

      <form @submit.prevent="submitForm" class="h-full">
        <div class="flex flex-col h-full justify-between">
          <div class="mb-10 space-y-5 px-4">
            <div class="form-group">
              <label for="Account code" class="text-sm tracking-wider"
                >Client / Owner</label
              >
              <form-input
                placeholder="Client / Owner"
                v-model.trim="form.code_client"
                :class="{ 'border-red-500': false }"
                required
                disabled
              />
              <span v-if="false" class="text-xs text-red-600 tracking-widest"
                >Please select client</span
              >
            </div>

            <div class="form-group">
              <label for="Account code" class="text-sm tracking-wider"
                >Branch Code</label
              >
              <form-input
                placeholder="Enter a unique account code"
                v-model.trim="form.branch_code"
                :class="{ 'border-red-500': false }"
                required
              />
              <span v-if="false" class="text-xs text-red-600 tracking-widest"
                >Please fill-up branch code</span
              >
            </div>

            <div class="form-group">
              <label for="Branch name" class="text-sm tracking-wider"
                >Branch name</label
              >
              <form-input
                placeholder="Enter branch name"
                v-model.trim="form.branch_name"
                required
              />
            </div>

            <div class="form-group">
              <label for="Middle name" class="text-sm tracking-wider"
                >Branch Address</label
              >
              <form-input
                placeholder="Enter address"
                v-model.trim="form.branch_address"
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