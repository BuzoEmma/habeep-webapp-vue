<template>
    <div class="w-screen min-w-full flex flex-row items-center bg-white h-screen min-h-full overflow-hidden">
        <img src="../../../../assets/images/habeep-show-ibo.png" class="w-1/3 xl:block hidden h-full" alt="">
        <div v-if="!inputCompleted"
            class="form-container flex flex-col items-center relative bg-white gap-y-3 w-full xl:w-2/3 h-full pb-6 md:py-10 overflow-y-auto overflow-x-hidden">

            <div class="flex flex-col items-center w-full md:w-2/3 px-4">
                <!-- logo -->
                <div class="logo md:flex hidden flex-row items-center justify-end w-full gap-x-2 cursor-pointer"
                    @click="$router.push('/')">
                    <img src="../../../../assets/icons/logo.svg" alt="Logo">
                    <span class="text-primary text-2xl">Habeep</span>
                </div>

                <p class="w-full text-left text-webapp font-bold text-xl flex flex-row items-center gap-x-1 mt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="#0A1045" class="w-6 h-6 cursor-pointer" @click="$router.go(-1)">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <span>Become a Tenant</span>
                </p>

                <!-- input fields -->

                <div class="flex flex-col items-start w-full gap-y-1 mt-8">
                    <label for="" class="text-sm text-webapp">Bio</label>
                    <textarea type="text" v-model="data.bio" name="" class="w-full h-28 pt-3 rounded-lg"
                        placeholder="Write something about youself" id=""></textarea>
                </div>

                <p class="w-full text-left text-webapp  text-sm mt-10">
                    By clicking on “Next” you agree to be a Tenant <span @click="$router.push('/terms-and-condtions')"
                        class="cursor-pointer text-primary underline">Terms and conditions</span>
                </p>
                <!-- submit btn -->
                <button class="bg-primary w-full rounded-lg grid place-items-center h-14 text-white mt-5"
                    @click="inputCompleted = true">
                    <span>Next</span>
                </button>

            </div>

        </div>

        <AffiliateFee v-else :data="data" />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from "vue-router";
import axios from "../../../../composables/axios";
import axiosDefault from 'axios'
import { useStore } from "vuex";
import AffiliateFee from './AffiliateFee.vue';

import { formValidator } from '../../../../composables/2-validator'

const route = useRoute();
const router = useRouter();

const store = useStore();

const inputCompleted = ref(false)

const data = reactive({
    role: 'TENANT',
    bio: ''
})

const onError = ref(false)
let errorMsg = ref({
    msg: '',
    field: null
})

let newMsg = ref('')
let warningMsg = ref('')
const processing = ref(false)

function validateFormField(field, data) {
    const validator = formValidator(field, data)


    if (!validator.success) {
        onError.value = true
        errorMsg.value.msg = validator.message
        errorMsg.value.field = field
    } else {
        onError.value = false
        errorMsg.value.msg = ''
        errorMsg.value.field = null
    }
}

</script>

<style scoped>
input::placeholder,
textarea::placeholder {
    color: #71759D;
    font-size: 14px;
}

input,
textarea {
    padding-left: 10px;
    outline: none;
    border: 1px solid #D9DDEE;
}

select {
    border: 1px solid #D9DDEE;
}

input:focus,
textarea:focus {
    border: 1px solid #1B49FF;
}

/* formValidators */
.invalidField {
    border: 1px solid #c5120b !important;
}

.form-container::-webkit-scrollbar {
    height: .1rem;
    width: 7px;
}

.form-container::-webkit-scrollbar-track {
    background: rgb(241, 241, 241);
    border-radius: 8px;
}

.form-container::-webkit-scrollbar-thumb {
    background: #0f154d;
    border-radius: 8px;
}
</style>