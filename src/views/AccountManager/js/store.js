const AccountManagerStore = {
   state: {
      accountManagerList: [],
      accountManagerMeta: {},
      accountManagerLinks: {},
      accountManagerErrors: null,
      accountManager: {}
   },
   mutations: {

      setAccountManagerList: (state, list) => state.accountManagerList = list,

      setAccountManagerMeta: (state, meta) => state.accountManagerMeta = meta,

      setAccountManagerLinks: (state, links) => state.accountManagerLinks = links,

      setAcountManagerErrors: (state, errors) => state.accountManagerErrors = errors,

      setAcountManager: (state, accountManager) => state.accountManager = accountManager,

   },
   actions: {
      loadAccountManagerList: ({ commit }, payload) => {
         commit("setAccountManagerList", payload.data);
         commit("setAccountManagerMeta", payload.meta);
         commit("setAccountManagerLinks", payload.links);
      }
   },
   getters: {

      getAccountManagerList: (state) => state.accountManagerList,

      getAccountManagerMeta: (state) => state.accountManagerMeta,

      getAccountManagerLinks: (state) => state.accountManagerLinks,

      getAccountManager: (state) => state.accountManager

   }
}

export default AccountManagerStore;