<template>
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
              <th class="header-style">
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
                class="header-style"
                v-for="(header, index) in dataHeaders"
                :key="index"
              >
                {{ header }}
              </th>
              <th class="header-style" v-if="haveActionButton == 'true'">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="h-52 bg-gray-100" v-if="data.length < 1">
              <td class="" :colspan="dataHeaders.length + 2">
                <div class="flex justify-center items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <h1 class="flex justify-center">No Data Available</h1>
                </div>
              </td>
            </tr>
            <tr
              v-for="(row, index) in data"
              :key="row[id]"
              class="hover:bg-yellow-50 text-sm border-b border-gray-200"
              :class="
                modelValue.includes(row[id])
                  ? 'bg-yellow-100'
                  : index % 2 == 0
                  ? 'bg-gray-50'
                  : 'bg-white'
              "
            >
              <td class="px-6 py-2 whitespace-no-wrap">
                <label>
                  <input
                    type="checkbox"
                    class="checkbox"
                    :id="row[id]"
                    :value="row[id]"
                    @click="selectRow(row[id], $event)"
                    v-model="modelValue"
                  />
                </label>
              </td>
              <td
                class="px-6 py-2 whitespace-no-wrap"
                v-for="(column, index) in dataFields"
                :key="index"
              >
                {{ row[column] }}
              </td>
              <td
                class="
                  px-6
                  py-2
                  space-x-4
                  text-sm
                  leading-5
                  text-gray-500
                  whitespace-no-wrap
                  flex
                "
                v-if="haveActionButton"
              >
                <div
                  v-for="(actionButton, index) in actionButtons"
                  :key="index"
                >
                  <button
                    :title="'click to ' + actionButton.action"
                    @click="$emit(actionButton.action, { ...row })"
                  >
                    <component
                      :is="actionButton.icon"
                      :class="actionButton.color"
                    />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from "vue";
import EditIcon from "@/components/Icons/EditIcon";
import RemoveIcon from "@/components/Icons/RemoveIcon";
import EyeIcon from "@/components/Icons/EyeIcon";
import CheckIcon from "@/components/Icons/CheckIcon";
import OpenIcon from "@/components/Icons/OpenIcon";

export default {
  components: { EditIcon, RemoveIcon, EyeIcon, CheckIcon, OpenIcon },
  name: "Datatable",
  setup(props, context) {
    //holds the id of selected rows

    function selectRow(id, e) {
      context.emit("selectRow", { id: id, checked: e.target.checked });
    }

    function selectAll(e) {
      context.emit("selectAll", e.target.checked);
    }

    watch(
      () => props.data,
      () => {
        let selectedRows = props.modelValue;
        let list = props.data;
        let chkBox = document.getElementById("selectAll");

        chkBox.checked = list.length > 0 ? true : false;
        list.forEach((item) => {
          const index = selectedRows.indexOf(item.id);
          if (index < 0) {
            chkBox.checked = false;
          }
        });
      }
    );

    return {
      selectRow,
      selectAll,
    };
  },
  props: {
    dataHeaders: { type: Array, required: true },
    data: { type: Array, required: true },
    haveActionButton: { type: String, required: true },
    dataFields: { type: Array, required: true },
    actionButtons: { type: Array, required: true },

    id: { type: String, required: true },
    modelValue: { type: Array, required: false },
  },
};
</script>

<style lang="css" scoped>
.header-style {
  @apply px-6 py-4  text-lg font-medium  leading-4  tracking-wider  text-left  uppercase  flex-grow;
}
</style>