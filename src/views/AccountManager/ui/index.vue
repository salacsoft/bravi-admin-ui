<template>
  <div class="w-full h-full">
    <page-title
      title="Account Managers"
      subTitle="list of Account managers"
      class="mb-5"
    />
    <div class="flex justify-between items-center">
      <div class="flex items-center w-1/4">
        <button
          @click="addNew"
          class="
            px-4
            py-2
            text-lg
            bg-white
            shadow-lg
            rounded-full
            text-gray-700
            bg-transparent
            hover:bg-yellow-400 hover:text-white
          "
        >
          <add-icon />
          <span class="tracking-wider">Add</span>
        </button>
      </div>
      <div class="w-3/4">
        <!-- pagination -->
        <div class="flex justify-end space-x-6">
          <div class="space-x-3">
            <div class="flex space-x-4 text-xs" v-if="list.length">
              <page-length
                :options="pageOptions"
                v-model="rowCounts"
                @changePageLength="changePageLength"
              />
              <export-to v-model="exportTo" @exportList="exportList" />
            </div>
          </div>
          <search-input
            class="border-b border-gray-400"
            @search="filterList"
            @refresh="refreshList"
            placeholder="Search account manager"
            v-model="lookUp"
          />
        </div>
      </div>
    </div>

    <Datatable
      class="mt-5"
      :data="list"
      haveActionButton="true"
      :actionButtons="ACTION_BUTTONS"
      :dataFields="COLUMNS"
      :dataHeaders="TABLE_HEADERS"
      id="id"
      @selectAll="selectAll"
      @selectRow="selectRow"
      v-model="selectedRows"
      @edit="edit"
      @remove="removeConfirmation"
    />
    <div class="flex justify-center mt-5">
      <pagination :meta="meta" @changePage="changePage" />
    </div>
  </div>
</template>

<script src="../js/index.js">
</script>

<style lang="scss" scoped>
</style>