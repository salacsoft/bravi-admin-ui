<template>
  <div class="h-full">
    <page-title
      :title="pageTitle"
      subTitle="Please fill up the form"
      class="mb-5"
    />
    <div
      class="w-full max-w-4xl bg-gray-100 h-1/4 rounded-lg shadow-lg px-4 py-5"
    >
      <form @submit.prevent="submitGroup" class="h-full">
        <div class="flex flex-col h-full justify-between">
          <div class="form-group py-3 space-y-2">
            <label for="Group name" class="px-2 tracking-wider font-semibold"
              >Enter group name</label
            >
            <form-input
              placeholder="Group name"
              v-model.trim="form.group_name"
              class="text-2xl"
              required
            />
          </div>
          <div class="flex justify-end">
            <submit-button class="w-36 text-xl">Submit</submit-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="../js/form.js">
</script>

<style lang="scss" scoped>
</style>