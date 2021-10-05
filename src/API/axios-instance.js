import axios from "axios";

import store from '@/store';

export const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  }
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let userToken = store.getters.getUserToken;
  if (userToken) {
    config.headers['Authorization'] = `Bearer ${userToken}`;
  }
  return config;
}, function (error) {
  // Do something with request error
  console.log("reqwuest ", error.response);
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log("success response", response);
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log("response errors dito", error.response);
  if (error.response.status == 401) {
    store.dispatch("logout");
  }
  return Promise.reject(error.response);
});


// API Methods
export const API = {
  post(endpoint, formData) {
    return instance.post(endpoint, formData);
  },
  patch(endpoint, formData) {
    return instance.patch(endpoint, formData);
  },
  get(endpoint) {
    return instance.get(endpoint);
  },
  delete(endpoint) {
    return instance.delete(endpoint);
  }
}