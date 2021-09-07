import { createStore } from 'vuex'
import AuthStore from './auth';
import createPersistedState from "vuex-persistedstate";

// import SecureLS from "secure-ls";

// const ls = new SecureLS({ encodingType: "aes", isCompression: false,  encryptionSecret: "salacsoft",});

export default createStore({
  modules: {
    AuthStore
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => window.atob(sessionStorage.getItem(key)),
      setItem: (key, value) => sessionStorage.setItem(key, window.btoa(value)),
      removeItem: key => sessionStorage.removeItem(key)
    }
  })]
})
