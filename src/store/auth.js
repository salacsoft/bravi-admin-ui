
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
        setUserDetails: (state, user) =>  {
            state.user = user
        },
        //clear the token
        clearUserToken: state  => {
            state.token = null; 
            state.isLoggedIn = false;
        },
        //clear the user information
        clearUserDetails: state => state.user = {},
    },
    actions: {
        setUserToken: ({commit}, token) =>  commit("setUserToken", token),
        setUserDetails: ({commit}, user) => commit("setUserDetails", user)
     },
    getters:{
        getUserToken(state){
            return window.atob(state.token);
        },
        getUserDetails: (state) => state.user,
        isLoggedIn: (state) => state.isLoggedIn
    }
}

export default AuthStore;