<template>
  <div class="w-full p-5 h-full mx-auto space-y-4">
    <div class="flex justify-between items-center">
      <div class="">
        <button
          @click="addNewGroup"
          class="
            px-4
            py-2
            text-lg
            bg-white
            shadow-lg
            rounded-full
            text-gray-700
            bg-transparent
            hover:bg-yellow-400
          "
        >
          <add-icon />
          <span class="tracking-wider">Add</span>
        </button>
      </div>

      <search-input
        class="border-b border-gray-400"
        @search="filterList"
        @refresh="refreshList"
        placeholder="Search Client"
        v-model="lookUp"
      />
    </div>

    <Datatable
      :data="list"
      haveActionButton="true"
      :actionButtons="ACTION_BUTTONS"
      :dataFields="COLUMNS"
      :dataHeaders="TABLE_HEADERS"
      id="id"
      @selectAll="selectAll"
      @selectRow="selectRow"
      v-model="selectedRows"
      @edit="editClient"
      @remove="removeConfirmation"
    />

    <!-- pagination -->
    <div class="flex justify-between">
      <div class="space-x-3">
        <div class="flex space-x-4 text-xs">
          <page-length
            :options="pageOptions"
            v-model="rowCounts"
            @changePageLength="changePageLength"
          />
          <export-to v-model="exportTo" @exportList="exportList" />
        </div>
      </div>
      <pagination :meta="meta" @changePage="changePage" />
    </div>
  </div>
</template>

<script src="../js/index.js">
</script>

<style lang="scss" scoped>
</style>