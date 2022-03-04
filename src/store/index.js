import { createStore } from 'vuex'
import AuthStore from './auth';
import ClientStore from './clients';
import GroupStore from '@/views/Group/js/store.js';
import AccountManagerStore from '@/views/AccountManager/js/store.js';
import BranchesStore from '@/views/Branches/js/store.js';
import createPersistedState from "vuex-persistedstate";

// import SecureLS from "secure-ls";

// const ls = new SecureLS({ encodingType: "aes", isCompression: false,  encryptionSecret: "salacsoft",});

export default createStore({
  modules: {
    AuthStore,
    ClientStore,
    GroupStore,
    AccountManagerStore,
    BranchesStore
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => window.atob(sessionStorage.getItem(key)),
      setItem: (key, value) => sessionStorage.setItem(key, window.btoa(value)),
      removeItem: key => sessionStorage.removeItem(key)
    }
  })]
})
