const BranchesStore = {
   state: {
      branchesList: [],
      branchesMeta: {},
      branchesLinks: {},
      branchesErrors: null,
      branches: {}
   },
   mutations: {

      setBranchesList: (state, list) => state.branchesList = list,

      setBranchesMeta: (state, meta) => state.branchesMeta = meta,

      setBranchesLinks: (state, links) => state.branchesLinks = links,

      setBranchesErrors: (state, errors) => state.branchesErrors = errors,

      setBranches: (state, branches) => state.branches = branches,

   },
   actions: {
      loadBranchesList: ({ commit }, payload) => {
         commit("setBranchesList", payload.data);
         commit("setBranchesMeta", payload.meta);
         commit("setBranchesLinks", payload.links);
      }
   },
   getters: {

      getBranchesList: (state) => state.branchesList,

      getBranchesMeta: (state) => state.branchesMeta,

      getBranchesLinks: (state) => state.branchesLinks,

      getBranches: (state) => state.branches

   }
}

export default BranchesStore;