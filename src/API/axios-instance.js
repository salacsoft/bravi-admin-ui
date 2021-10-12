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
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status == 401) {
    store.dispatch("logout");
  }
  return Promise.reject(error.response);
});


// API Methods
export const API = {
  post(endpoint, formData, customHeader = {}) {
    return instance.post(endpoint, formData, customHeader);
  },
  patch(endpoint, formData) {
    return instance.patch(endpoint, formData);
  },
  get(endpoint, customHeader = {}) {
    return instance.get(endpoint, customHeader);
  },
  delete(endpoint, customHeader = {}) {
    return instance.delete(endpoint, customHeader);
  }
}