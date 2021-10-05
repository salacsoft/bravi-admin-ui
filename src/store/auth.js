import router from '@/router/index.js'
import { createToast } from "mosha-vue-toastify";

const AuthStore = {
    state: {
        token: null,
        user: null,
        isLoggedIn: false
    },
    mutations: {
        // set the token from the API response
        setUserToken: (state, user) => {
            state.token = window.btoa(user.token)
            state.isLoggedIn = true
        },
        // Set the user information from the API reponse
        setUserDetails: (state, user) => {
            state.user = user
        },
        //clear the token
        clearUserToken: state => {
            state.token = null;
            state.isLoggedIn = false;
        },
        //clear the user information
        clearUserDetails: state => state.user = {},
    },
    actions: {
        setUserToken: ({ commit }, token) => commit("setUserToken", token),
        setUserDetails: ({ commit }, user) => commit("setUserDetails", user),
        clearUserToken: ({ commit }) => {
            commit("clearUserToken");
            commit("clearUserDetails");
        },
        logout({ commit }) {
            // remove user details when JWT expires.
            commit('clearUserDetails');
            commit('clearUserToken');
            // redirect to login
            router.push('/login');
        },
        initializeLogoutTimer({ dispatch }) {

            // kills the running instance of set timeout if the user logs in again.
            clearTimeout(logoutTimer);
            let logoutTimer = setTimeout(() => {
                createToast("Token Expired, Please login again.", { type: "info", timeout: 3000 });
                dispatch('logout');
            }, process.env.VUE_APP_TOKEN_EXPIRY);
        }
    },
    getters: {
        getUserToken(state) {
            return window.atob(state.token);
        },
        getUserDetails: (state) => state.user,
        isLoggedIn: (state) => state.isLoggedIn
    }
}

export default AuthStore;