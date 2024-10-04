<template>
  <div class="delete-account-modal">
    <div class="modal">
      <!-- Header Section -->
      <div class="delete-btn">
        <button class="close-btn" @click="$router.push('/')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>

        </button>
        <button class="icon-btn">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100">
            <g id="bin">
              <path
                d="M35,77.917c-1.654,0-3-1.346-3-3V71c0-0.276,0.224-0.5,0.5-0.5S33,70.724,33,71v3.917c0,1.103,0.897,2,2,2s2-0.897,2-2 v-34c0-1.103-0.897-2-2-2s-2,0.897-2,2V60c0,0.276-0.224,0.5-0.5,0.5S32,60.276,32,60V40.917c0-1.654,1.346-3,3-3s3,1.346,3,3v34 C38,76.571,36.654,77.917,35,77.917z">
              </path>
              <path
                d="M32.5,64.5c-0.276,0-0.5-0.224-0.5-0.5v-3c0-0.276,0.224-0.5,0.5-0.5S33,60.724,33,61v3C33,64.276,32.776,64.5,32.5,64.5 z">
              </path>
              <path
                d="M45,78c-1.654,0-3-1.346-3-3V41c0-1.654,1.346-3,3-3s3,1.346,3,3v34C48,76.654,46.654,78,45,78z M45,39 c-1.103,0-2,0.897-2,2v34c0,1.103,0.897,2,2,2s2-0.897,2-2V41C47,39.897,46.103,39,45,39z">
              </path>
              <path
                d="M55,78c-1.654,0-3-1.346-3-3V41c0-1.654,1.346-3,3-3s3,1.346,3,3v34C58,76.654,56.654,78,55,78z M55,39 c-1.103,0-2,0.897-2,2v34c0,1.103,0.897,2,2,2s2-0.897,2-2V41C57,39.897,56.103,39,55,39z">
              </path>
              <path
                d="M65,78c-1.654,0-3-1.346-3-3V41c0-1.654,1.346-3,3-3s3,1.346,3,3v34C68,76.654,66.654,78,65,78z M65,39 c-1.103,0-2,0.897-2,2v34c0,1.103,0.897,2,2,2s2-0.897,2-2V41C67,39.897,66.103,39,65,39z">
              </path>
              <path
                d="M78,31H22c-0.552,0-1-0.448-1-1v-0.237C21,21.628,24.785,18,33.272,18h33.455C75.215,18,79,21.628,79,29.763V30 C79,30.552,78.552,31,78,31z M23.013,29h53.975c-0.216-6.38-3.237-9-10.26-9H33.272C26.25,20,23.229,22.62,23.013,29z">
              </path>
              <path
                d="M78,34H23c-0.276,0-0.5-0.224-0.5-0.5S22.724,33,23,33h55c0.276,0,0.5,0.224,0.5,0.5S78.276,34,78,34z">
              </path>
              <path
                d="M71,83H29c-0.276,0-0.5-0.224-0.5-0.5S28.724,82,29,82h42c0.276,0,0.5,0.224,0.5,0.5S71.276,83,71,83z">
              </path>
              <path
                d="M61.035,88H38.766C31.13,88,26,83.301,26,76.308V40.414l-4.707-4.707C21.105,35.52,21,35.265,21,35v-5 c0-0.552,0.448-1,1-1h56c0.552,0,1,0.448,1,1v5c0,0.268-0.108,0.525-0.299,0.713L74,40.336v35.972C74,83.301,68.79,88,61.035,88z M23,34.586l4.707,4.707C27.895,39.48,28,39.735,28,40v36.308C28,83.461,33.8,86,38.766,86h22.269C66.093,86,72,83.461,72,76.308 V39.917c0-0.268,0.108-0.525,0.299-0.713L77,34.581V31H23V34.586z">
              </path>
              <path
                d="M60,20H40c-0.552,0-1-0.448-1-1v-2.646C39,13.401,41.309,11,44.146,11h11.708C58.691,11,61,13.401,61,16.354V19 C61,19.552,60.552,20,60,20z M41,18h18v-1.646C59,14.504,57.589,13,55.854,13H44.146C42.411,13,41,14.504,41,16.354V18z">
              </path>
              <path
                d="M70,27H24c-0.276,0-0.5-0.224-0.5-0.5S23.724,26,24,26h46c0.276,0,0.5,0.224,0.5,0.5S70.276,27,70,27z">
              </path>
              <path
                d="M73,58.917c-0.552,0-1-0.448-1-1v-14c0-0.552,0.448-1,1-1c2.757,0,5,2.243,5,5v6C78,56.673,75.757,58.917,73,58.917z M74,45.088v11.657c1.164-0.413,2-1.525,2-2.829v-6C76,46.613,75.164,45.5,74,45.088z">
              </path>
              <path
                d="M27,58.917c-2.757,0-5-2.243-5-5v-6c0-2.757,2.243-5,5-5c0.552,0,1,0.448,1,1v14C28,58.469,27.552,58.917,27,58.917z M26,45.088c-1.164,0.413-2,1.525-2,2.829v6c0,1.304,0.836,2.416,2,2.829V45.088z">
              </path>
              <path
                d="M74,27h-3c-0.276,0-0.5-0.224-0.5-0.5S70.724,26,71,26h3c0.276,0,0.5,0.224,0.5,0.5S74.276,27,74,27z">
              </path>
            </g>
          </svg>
        </button>
      </div>

      <!-- Title and Warning -->
      <div class="modal-body">
        <h3 class="modal-title">Delete Account</h3>
        <p class="warning-message">
          <span>Warning: </span>This is permanent and cannot be undone after deletion process starts.
        </p>
        <p class="delete-info">
          Your account would be disabled in 24 hrs and deletion process would start in 30 days.
          A verification mail would be sent to you soon.
        </p>
      </div>

      <!-- Form Section -->
      <form class="delete-form" @submit.prevent="startDeletion">
        <div class="form-group">
          <label for="email" class="form-label">Confirm email</label>
          <input required type="email" name="email" id="email" class="form-input" v-model="email" />
        </div>
        <div class="form-group">
          <input type="checkbox" name="checkbox" id="checkbox" required class="form-checkbox" v-model="termsAccepted" />
          <label for="checkbox" class="form-label">Agree to terms and service</label>
        </div>

        <!-- Show loader when processing -->
        <button type="submit" class="submit-btn" :disabled="loading || !validateEmail(email)">
          <span v-if="loading">Loading...</span>
          <span v-else>Start Deletion</span>
        </button>
      </form>
    </div>

    <!-- Notification -->
    <div v-if="showNotification" class="notification" v-motion-slide-bottom>
      Account deletion request successful. You'll receive a mail within 24 hours
      to verify account deletion. <span class="text-blue-600 underline cursor-pointer" @click="$router.push('/')">Go
        home</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { validateEmail } from "../../../composables/2-validator";

// State variables
const email = ref("");
const termsAccepted = ref(false);
const loading = ref(false);
const showNotification = ref(false);

const startDeletion = () => {

  loading.value = true;

  // Simulate a 3-second delay for processing
  setTimeout(() => {
    // Hide loader and show notification
    loading.value = false;
    showNotification.value = true;
    termsAccepted.value = false;
    email.value = ''

    // Automatically hide notification after a few seconds
    setTimeout(() => {
      showNotification.value = false;
    }, 5000);
  }, 1500);
};
</script>

<style scoped>
.delete-account-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #e3e2e5;
}

.modal {
  width: 100%;
  max-width: 330px;
  margin: 0rem 1rem;
  height: auto;
  background: #f7f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 15px;
  gap: 1rem;
  padding: 1.5rem;
  box-shadow: 0px 0px 15px 0px rgba(184, 184, 184, 0.75);
  -webkit-box-shadow: 0px 0px 15px 0px rgba(184, 184, 184, 0.75);
  -moz-box-shadow: 0px 0px 15px 0px rgba(184, 184, 184, 0.75);
  -moz-box-shadow: 0px 0px 15px 0px rgba(184, 184, 184, 0.75);
}

.close-btn {
  font-weight: bolder;
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 5%;
  right: 5%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-btn {
  background: #fbe5e6;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.icon-btn svg {
  width: 30px;
  height: 30px;
}

.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.modal-title {
  color: black;
  font-weight: bold;
  font-size: 20px;
}

.warning-message {
  width: 100%;
  max-width: 250px;
  font-size: 15px;
  text-wrap: wrap;
  text-align: center;
  color: #ee5b5d;
}

.warning-message span {
  color: #e92e3a;
  font-weight: bold;
}

.delete-info {
  width: 100%;
  text-align: inherit;
  font-size: 15px;
  line-height: 20px;
  font-weight: 600;
}

.delete-form {
  width: 100%;
}

label {
  font-size: 15px;
  padding-left: 5px;
}

.form-group:first-child {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
}

.form-group:first-child input {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  padding: 0px 5px;
  border: 0.13rem solid rgb(180, 180, 170);
}

.submit-btn {
  margin: 1rem 0rem;
  width: 100%;
  height: 50px;
  background: #f45b53;
  border-radius: 15px;
  position: relative;
  bottom: -10px;
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.notification {
  width: 100%;
  max-width: 400px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ffffff;
  color: #000;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  font-style: oblique;
}

/* Loader button styling */
.submit-btn[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
