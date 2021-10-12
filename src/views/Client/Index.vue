<template>
  <div class="w-full p-5 h-full mx-auto space-y-4">
    <div class="flex justify-between items-center">
      <div class="">
        <button
          @click="addNewClient"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mx-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="tracking-wider">Add</span>
        </button>
      </div>

      <search-input
        class="border-b border-gray-400"
        @search="filterClient"
        @refresh="refreshList"
        placeholder="Search Client"
        v-model="lookUp"
      />
    </div>

    <div class="">
      <div class="py-2 -my-2 overflow-x-auto mx-auto">
        <div
          class="
            inline-block
            min-w-full
            overflow-hidden
            align-middle
            border-b border-gray-200
            shadow
            sm:rounded-lg
          "
        >
          <table class="min-w-full">
            <thead>
              <tr
                class="
                  bg-gradient-to-r
                  from-yellow-300
                  via-pink-300
                  to-red-400
                  text-gray-800
                "
              >
                <th
                  class="
                    px-6
                    py-4
                    text-xs
                    font-medium
                    leading-4
                    tracking-wider
                    text-left
                    uppercase
                    border-b border-gray-200
                    flex-grow
                  "
                >
                  <label>
                    <input
                      type="checkbox"
                      class="checkbox bg-white"
                      @change="selectAll($event)"
                      id="selectAll"
                    />
                  </label>
                </th>
                <th
                  class="
                    px-6
                    py-4
                    text-lg
                    font-medium
                    leading-4
                    tracking-wider
                    text-left
                    uppercase
                    border-b border-gray-200
                    flex-grow
                  "
                  v-for="(header, index) in headers"
                  :key="index"
                >
                  {{ header }}
                </th>
                <th
                  class="
                    px-6
                    py-4
                    text-lg
                    font-medium
                    leading-4
                    tracking-wider
                    text-left
                    uppercase
                    border-b border-gray-200
                    flex-grow
                  "
                  v-if="haveActionButon"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(client, index) in list"
                :key="client.id"
                class="hover:bg-yellow-50"
                :class="
                  selectedRows.includes(client.id)
                    ? 'bg-yellow-100'
                    : index % 2 == 0
                    ? 'bg-gray-50'
                    : 'bg-white'
                "
              >
                <td
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                >
                  <label>
                    <input
                      type="checkbox"
                      class="checkbox"
                      :id="client.id"
                      :value="client.id"
                      v-model="selectedRows"
                      @change="checkRow($event)"
                    />
                  </label>
                </td>
                <td
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                  v-for="(column, index) in dataColumns"
                  :key="index"
                >
                  {{ client[column] }}
                </td>
                <td
                  class="
                    px-6
                    py-4
                    space-x-4
                    text-sm
                    leading-5
                    text-gray-500
                    whitespace-no-wrap
                    border-b border-gray-200
                  "
                  v-if="haveActionButon"
                >
                  <button title="click to edit client" :data="client.id">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    title="click to remove client"
                    :data="client.id"
                    @click="removeClient(client.id)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

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

<script src="./client.js">
</script>

<style lang="scss" scoped>
</style>