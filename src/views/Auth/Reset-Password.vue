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
                    <h2 class="font-semibold text-xl lg:text-2xl mb-10 text-center">Reset Password</h2>
                </div>

                <!-- form -->
                <div class="w-full max-w-sm px-4 md:px-1" >
                    <form @submit.prevent="resetPassword">
                        <div class="space-y-5">
                            <div class="">
                                <label for="password" class="tracking-wider">Enter your new Password</label>
                                <div class="flex w-full bg-white rounded-xl h-10 py-2 px-2 shadow-md" >
                                    <input type="password" 
                                        placeholder="Enter your password"
                                        v-model="user.password"
                                        class="w-full rounded-l-lg px-2 py-2 focus:outline-none password"
                                        required
                                    >
                                    <span class="eye-open hidden" @click="toggleEye">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                    <span class="eye-close" @click="toggleEye">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div class="">
                                <label for="password" class="tracking-wider">Re-type your new Password</label>
                                <div class="flex w-full bg-white rounded-xl h-10 py-2 px-2 shadow-md" >
                                    <input type="password" 
                                        placeholder="Re-type your password"
                                        v-model="user.confirm_password"
                                        class="w-full rounded-l-lg px-2 py-2 focus:outline-none password"
                                        required
                                    >
                                    <span class="eye-open hidden" @click="toggleEye">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                    <span class="eye-close" @click="toggleEye">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button class="px-4 py-2 w-full  max-w-sm mt-10 rounded-xl tracking-wider bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500">Reset my password</button>
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
import { useRoute } from 'vue-router'
import { API } from '@/API/axios-instance';

export default {

    setup () {

        const route = useRoute();
        const productName = process.env.VUE_APP_NAME
        const copyright = process.env.VUE_APP_COPYRIGHT

        const user = reactive({
            email: route.query.email,
            url: process.env.VUE_APP_BASE_URL + "/reset",
            password: null,
            confirm_password: null,
            token:route.query.token
        });
        
        const resetPassword = () => {
            API.post("/reset-password", user)
                .then(response => {

                })
                .catch(error => {

                });
        }

        const  toggleEye = () =>  {

            const openEye = document.querySelectorAll('.eye-open')
                openEye[0].classList.toggle('hidden');
                openEye[1].classList.toggle('hidden');
            const closeEye = document.querySelectorAll('.eye-close')
                closeEye[0].classList.toggle('hidden');
                closeEye[1].classList.toggle('hidden');
                
            const pass = document.querySelectorAll(".password");
            
            if (closeEye[0].classList.contains("hidden")) {
                pass[0].setAttribute("TYPE", "Text");
                pass[1].setAttribute("TYPE", "Text");
            } else {
                pass[0].setAttribute("TYPE", "Password");
                pass[1].setAttribute("TYPE", "Password");
            }

        }


        return {
            productName,
            copyright,
            user,
            resetPassword,
            toggleEye
        }
    }
}
</script>

<style lang="scss" scoped>

</style>