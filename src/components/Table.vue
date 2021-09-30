<template>
  <div>
    <div>Table Title</div>
  </div>
  <div>Table filter search and page legnth</div>
  <div class="w-full bg-gray-400">
    <table class="">
      <thead>
        <tr v-for="title in headers" :key="title">
          <th>{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          {{
            item.value
          }}
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  setup(props) {
    let headers = props.headers;
    return {
      headers,
      data,
      pagination,
      filter,
      perPage,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>