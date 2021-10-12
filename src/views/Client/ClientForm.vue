<template>
  <div class="w-full">
    <h1 class="flex justify-center text-3xl py-2 tracking-widest">
      Client Form
    </h1>
    <div class="w-full tracking-wider px-5 py-2">
      <container class="shadow-lg">
        <card-header><h2 class="">Client Information</h2> </card-header>
        <div class="bg-transparent h-full px-4">
          <form @submit.prevent="submitForm" class="py-5">
            <div class="form-inputs pb-4">
              <div class="form-group py-3">
                <label for="client code" class="px-2">Code</label>
                <form-input
                  placeholder="Client Code"
                  v-model="form.client_code"
                  :class="
                    v.client_code.$error ? 'border border-yellow-600' : ''
                  "
                  class=""
                />
                <div
                  v-if="v.client_code.$error"
                  class="flex w-full text-sm text-yellow-600"
                >
                  {{ v.client_code.$errors[0].$message }}
                </div>
              </div>

              <div class="form-group">
                <label for="client name" class="px-2">Name</label>
                <form-input
                  placeholder="Client name"
                  v-model="form.client_name"
                  :class="
                    v.client_name.$error ? 'border border-yellow-600' : ''
                  "
                />
                <span
                  v-if="v.client_name.$error"
                  class="flex w-full text-sm text-yellow-600"
                >
                  {{ v.client_name.$errors[0].$message }}
                </span>
              </div>

              <div class="form-group">
                <label for="client address" class="px-2">Address</label>
                <form-text-area
                  placeholder="Client Address"
                  v-model="form.client_address"
                  :class="
                    form.client_address.error ? 'border border-yellow-600' : ''
                  "
                />
                <span
                  v-if="form.client_code.error"
                  class="flex w-full text-sm text-yellow-600"
                >
                  Error
                </span>
              </div>
            </div>
            <div class="form-btn flex space-x-2 justify-evenly">
              <action-button
                btnColor="gray"
                label="Cancel"
                action="cancel"
                class="
                  flex
                  w-1/2
                  md:w-1/4
                  text-white
                  items-center
                  space-x-2
                  hover:text-gray-100
                "
              />
              <action-button
                type="submit"
                btnColor="orange"
                label="Save"
                action="check"
                class="
                  flex
                  w-1/2
                  md:w-1/4
                  space-x-2
                  text-white
                  items-center
                  hover:text-gray-100
                "
              />
            </div>
          </form>
        </div>
      </container>
    </div>
  </div>
</template>

<script src="./client-form.js" />


<style lang="css" scoped>
.form-group {
  @apply py-3;
}
</style>