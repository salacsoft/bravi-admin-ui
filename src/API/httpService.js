import axios from "axios";

import store from '@/store';

export const apiClient = axios.create({
   baseURL: process.env.VUE_APP_API_ENDPOINT,
   headers: {
      "X-Requested-With": "XMLHttpRequest"
   }
});

// Add a request interceptor
apiClient.interceptors.request.use(function (config) {
   // Do something before request is sent
   let userToken = store.getters.getUserToken;
   if (userToken) {
      config.headers['Authorization'] = `Bearer ${userToken}`;
   }
   return config;
}, function (error) {
   // Do something with request error
   return Promise.reject(error);
});

// Add a response interceptor
apiClient.interceptors.response.use(function (response) {
   // Any status code that lie within the range of 2xx cause this function to trigger
   // Do something with response data
   return response;
}, function (error) {
   // Any status codes that falls outside the range of 2xx cause this function to trigger
   // Do something with response error
   console.log("error", error)
   if (error.response.status == 401) {
      store.dispatch("logout");
   }
   return Promise.reject(error.response);
});

