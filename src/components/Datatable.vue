<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.name"
          @click="$emit('sort', column.name)"
          :class="
            sortKey === column.name
              ? sortOrders[column.name] > 0
                ? 'sorting_asc'
                : 'sorting_desc'
              : 'sort'
          "
          :style="'width:' + column.width + ';' + 'cursor:pointer;'"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <slot></slot>
  </table>
</template>

<script>
import Table from "./Table.vue";
import { computed } from "vue";

export default {
  components: { Table },
  setup(props) {
    const data = props.data;

    return {
      columns: computed(() => props.columns),
      sortKey: computed(() => props.sortKey),
      sortOrders: computed(() => props.sortOrders),
    };
  },
};
</script>

<style lang="scss" scoped>
</style>