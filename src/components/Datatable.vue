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
                v-for="(header, index) in dataHeaders"
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
                v-if="haveActionButton == 'true'"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in data"
              :key="row[id]"
              class="hover:bg-yellow-50 text-sm"
              :class="
                modelValue.includes(row[id])
                  ? 'bg-yellow-100'
                  : index % 2 == 0
                  ? 'bg-gray-50'
                  : 'bg-white'
              "
            >
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
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
                class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                v-for="(column, index) in dataFields"
                :key="index"
              >
                {{ row[column] }}
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
                  flex
                "
                v-if="haveActionButton"
              >
                <div
                  v-for="(actionButton, index) in actionButtons"
                  :key="index"
                >
                  <button
                    title="click to edit"
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
import { watch, ref } from "vue";
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

<style lang="scss" scoped>
</style>