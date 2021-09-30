import { API } from '@/API/axios-instance';


const ClientStore = {
   state: {
      list: [],
      meta: {},
      links: {},
      errors: null,
      client: {}
   },
   mutations: {

      setList: (state, list) => state.list = list,

      setMeta: (state, meta) => state.meta = meta,

      setLinks: (state, links) => state.links = links,

      setErrors: (state, errors) => state.errors = errors,

      setClient: (state, client) => state.client = client,

   },
   actions: {

      getListOfClients: ({ commit }) => {
         API.get("/v1/clients?paginate=10")
            .then(response => {
               console.log("response", response.data.data);
               commit("setList", response.data.data);
               commit("setMeta", response.data.meta);
               commit("setLinks", response.data.links);
            })
            .catch(errors => {
               console.log("erroes", errors.response.data);
               commit("setErrors", errors);
            })
      }
   },
   getters: {

      getList: (state) => state.list,

      getMeta: (state) => state.meta,

      getLinks: (state) => state.links,

      getClient: (state) => state.client

   }
}

export default ClientStore;