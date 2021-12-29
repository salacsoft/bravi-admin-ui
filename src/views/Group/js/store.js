const GruopStore = {
   state: {
      groupList: [],
      groupMeta: {},
      groupLinks: {},
      groupErrors: null,
      group: {}
   },
   mutations: {

      setGroupList: (state, groupList) => state.groupList = groupList,

      setGroupMeta: (state, groupMeta) => state.groupMeta = groupMeta,

      setGroupLinks: (state, groupLinks) => state.groupLinks = groupLinks,

      setGroupErrors: (state, groupErrors) => state.groupErrors = groupErrors,

      setGroup: (state, group) => state.group = group,

   },
   actions: {
      loadGroupList: ({ commit }, payload) => {
         commit("setGroupList", payload.data);
         commit("setGroupMeta", payload.meta);
         commit("setGroupLinks", payload.links);
      }
   },
   getters: {

      getGroupList: (state) => state.groupList,

      getGroupMeta: (state) => state.groupMeta,

      getGroupLinks: (state) => state.groupLinks,

      getGroup: (state) => state.group

   }
}

export default GruopStore;