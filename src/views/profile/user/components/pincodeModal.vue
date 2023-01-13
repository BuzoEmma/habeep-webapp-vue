<template>
    <div
        class="main flex flex-col md:h-64 fixed md:absolute z-10 overflow-hidden md:right-1/4 md:top-1/4 bg-white h-full">
        <div class="flex flex-row items-center justify-between w-full px-4 py-4 border-b border-b-gray-100">
            <span class="text-lg font-medium text-webapp">Change pincode</span>
            <div class="flex flex-row items-center gap-x-2">
                <img src="../../../../assets/icons/g-back.svg" class="cursor-pointer" @click="$emit('back', 'editProfileModal')" alt="">
                <img src="../../../../assets/icons/x.svg" class="cursor-pointer" @click="$emit('close')" alt="">
            </div>
        </div>

        <div class="profile relative flex flex-col w-full items-center gap-y-6 px-4">
            <div
                class="relative flex flex-row items-center justify-center w-24 h-24 rounded-full border border-gray-200">
                <img src="../../../../assets/icons/memoji.svg" alt="">

                <img src="../../../../assets/icons/edit-icon.svg" class="-right-2 bottom-1 absolute" alt="">
            </div>
            <!-- form -->
            <!-- input fields -->
            <div class="flex flex-col items-start w-full xs:w-5/12 gap-y-1 mt-8">
                <label for="" class="text-sm text-webapp">Old pincode</label>
                <input type="number" maxlength="4" v-model="data.oldPin"
                    @input="validateFormField('oldPin', data.oldPin.toString())" placeholder="Enter old pincode"
                    class="w-full h-14 rounded-lg bg-transaparent"
                    :class="{ 'bg-bg': onModal, 'invalidField': errorMsg.field === 'oldPin' }">
            </div>


            <div class="flex flex-col items-start w-full xs:w-5/12 gap-y-1 mt-8">
                <label for="" class="text-sm text-webapp">New pincode</label>
                <input type="number" maxlength="4" v-model="data.newPin"
                    @input="validateFormField('newPin', data.newPin.toString())" placeholder="Enter new pincode"
                    class="w-full h-14 rounded-lg bg-transaparent"
                    :class="{ 'bg-bg': onModal, 'invalidField': errorMsg.field === 'newPin' }">
            </div>

            <div class="flex flex-col items-start w-full xs:w-5/12 gap-y-1 mt-8">
                <label for="" class="text-sm text-webapp">Re-enter new pincode</label>
                <input type="number" maxlength="4" v-model="data.confirmPin"
                    @input="validateFormField('confirmPin', data.confirmPin.toString())" placeholder="Enter new pincode"
                    class="w-full h-14 rounded-lg bg-transaparent"
                    :class="{ 'bg-bg': onModal, 'invalidField': errorMsg.field === 'confirmPin' }">
            </div>

            <!-- components -->
            <Toast :msg="errorMsg.msg" type="danger" v-if="onError" />
            <Toast :msg="newMsg" type="success" v-if="newMsg.length > 0" />
        </div>


        <button class="bg-primary mx-4 rounded-lg grid place-items-center h-14 my-6 text-white"
            @click="$emit('enterAgents')">Continue</button>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from "vue-router";
import axios from "../../../../composables/axios";
import axiosDefault from 'axios'
import { useStore } from "vuex";

import { formValidator } from '../../../../composables/2-validator'

const route = useRoute();
const router = useRouter();

const store = useStore();


// manage profile editing
const url = '/auth/user/edit/pin';


const data = reactive({
    oldPin: '',
    newPin: '',
    confirmPin: '',
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


onMounted(() => {
})
</script>

<style scoped>
.main {
    width: 450px;
    height: fit-content;
    border-radius: 15px;
}

@media screen and (max-width: 767px) {
    .main {
        height: 100vh;
        width: 100vw;
    }
}

input::placeholder {
    color: #71759D;
    font-size: 14px;
}

input {
    padding-left: 10px;
    outline: none;
    border: 1px solid #D9DDEE;
}

input:focus {
    border: 1px solid #1B49FF;
}

/* formValidators */
.invalidField {
    border: 1px solid #c5120b !important;
}
</style>