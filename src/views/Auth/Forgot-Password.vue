<template>
    <div class=" h-screen flex flex-col justify-center bg-gray-100 text-gray-900 ">
        <div class="flex justify-center md:h-full md:flex-row">
            <!-- side image -->
            <div class="hidden  md:w-3/5 md:flex md:items-end " >
                <img src="/img/forgot-password.svg" alt="forgot password image">
            </div>
            
            <!-- form forgot password -->
            <div class="w-full sm:w-1/3 flex flex-col justify-center items-center px-4">
                <!-- brand named -->
                <div class="">
                    <div class="flex justify-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24  text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h2 class="font-semibold text-xl lg:text-2xl mb-5">{{productName}}</h2>
                    <h2 class="font-semibold text-xl lg:text-2xl mb-10 text-center">Forgot Password</h2>
                </div>

                <!-- form -->
                <div class="w-full max-w-sm px-4 md:px-1" >
                    <form @submit.prevent="forgotPassword">
                        <div class="text-center">
                            <label for="Enter your email address">Enter your email address</label>
                            <div class="flex bg-white rounded-xl px-3 py-1 shadow-md mt-2">
                                <div class="flex w-full bg-white rounded-xl py-1 px-2" >
                                    <input type="email" 
                                        v-model="user.email"
                                        id="email"
                                        placeholder="Enter your email address"
                                        class="w-full rounded-l-lg  focus:outline-none"
                                        required
                                    >
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button class="px-4 py-2 w-full  max-w-sm mt-10 rounded-xl tracking-wider bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500">Send Reset Link</button>
                    </form>
                    <div class="text-center w-full max-w-sm  mt-4">
                            <router-link to="login"
                                class="underline tracking-wider"
                            >
                                Back to Login page
                            </router-link>
                        </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center bg-gray-300">
            <span>{{copyright}} copyright &copy; 2021</span>
        </div>
    </div>
    
</template>

<script>

import {reactive } from 'vue';
import { API } from '@/API/axios-instance';
import ErrorHandler from '@/API/ErrorHandler';
import { createToast } from 'mosha-vue-toastify';

export default {
    setup () {
        const productName = process.env.VUE_APP_NAME
        const copyright = process.env.VUE_APP_COPYRIGHT

        const user = reactive({
            email:null,
            url: process.env.VUE_APP_BASE_URL + "/reset-password"
        });
        
        const forgotPassword = () => {
            API.post("/forgot-password", user)
                .then(response => {
                    console.log(response);
                    createToast({title: "Email Sent",  description: response.data.message ?? "We sent Reset link to your email please check it."}, {type: "success", timeout: 5000})
                })
                .catch(errors => {
                    const error = ErrorHandler(errors);
                    createToast(error, {type: "danger", timeout: 10000})
                    console.log(error.description);
                });
        }

        return {
            productName,
            copyright,
            user,
            forgotPassword
        }
    }
}
</script>

<style lang="scss" scoped>

</style>