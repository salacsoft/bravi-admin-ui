
const selectDropdown = {
   state: {
      list: [],
      meta: {},
      links: {},
      errors: null,
      client: {}
   },
   mutations: {

      select: (state, list) => state.list = list,

      setMeta: (state, meta) => state.meta = meta,

      setLinks: (state, links) => state.links = links,

      setErrors: (state, errors) => state.errors = errors,

      setClient: (state, client) => state.client = client,

   },
   actions: {
      loadList: ({ commit }, payload) => {
         commit("select", payload.data);
         commit("setMeta", payload.meta);
         commit("setLinks", payload.links);
      }
   },
   getters: {

      getList: (state) => state.list,

      getMeta: (state) => state.meta,

      getLinks: (state) => state.links,

      getClient: (state) => state.client

   }
}

export default selectDropdown;