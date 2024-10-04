<template>
  <div class="w-screen min-w-full flex flex-row items-center bg-white h-screen min-h-full overflow-hidden">
    <img src="../../../../assets/images/habeep-show-ibo.png" class="w-1/3 xl:block hidden h-full" alt="" />
    <div v-if="!inputCompleted"
      class="form-container flex flex-col items-center relative bg-white gap-y-3 w-full xl:w-2/3 h-full pb-6 md:py-10 overflow-y-auto overflow-x-hidden">
      <div class="flex flex-col items-center w-full md:w-2/3 px-4">
        <!-- logo -->
        <div class="logo md:flex hidden flex-row items-center justify-end w-full gap-x-2 cursor-pointer"
          @click="$router.push('/')">
          <img src="../../../../assets/icons/logo.svg" alt="Logo" />
          <span class="text-primary text-2xl">Habeep</span>
        </div>

        <p class="w-full text-left text-webapp font-bold text-xl cursor-pointer flex flex-row items-center gap-x-1 mt-10"
          @click="$router.go(-1)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0A1045"
            class="w-6 h-6 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span>Become an Agent</span>
        </p>

        <!-- input fields -->

        <div class="flex flex-col items-start w-full gap-y-1 mt-8">
          <label for="" class="text-sm text-webapp">Street address</label>
          <input type="text" name="" v-model="data.address" class="w-full h-14 rounded-lg"
            placeholder="Enter your street address" id="" />
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-x-3 w-full justify-between">
          <div class="flex flex-col items-start w-full sm:w-6/12 gap-y-1 mt-8">
            <label for="" class="text-sm text-webapp">State</label>
            <select name="" v-model="data.state" class="w-full h-14 rounded-lg px-2" id="" placeholder="Select state">
              <option value="Choose a state" selected>Choose a state</option>
              <option :value="state" v-for="state in states" :key="state">
                <span v-if="state.state.name == 'Cross'">Cross River</span>
                <span v-else>{{ state.state.name }}</span>
              </option>
            </select>
          </div>
          <div class="flex flex-col items-start w-full sm:w-6/12 gap-y-1 mt-8">
            <label for="" class="text-sm text-webapp">City</label>
            <select name="" v-model="data.city" class="w-full h-14 rounded-lg px-2" id="">
              <option value="Choose a city" v-if="data.city === 'Choose a city'" selected>
                Choose a city
              </option>
              <option value="" v-else selected>Choose a city</option>
              <option value="" v-if="!data.state && !data.state[0]">
                Choose a state
              </option>
              <option v-else :value="city.name" v-for="city in data.state.cities" :key="city">
                {{ city.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex flex-col items-start w-full gap-y-1 mt-8">
          <label for="" class="text-sm text-webapp">Bio</label>
          <div class="w-full">
            <textarea type="text" v-model="data.bio" name="" class="w-full h-28 pt-3 rounded-lg bg-transparent"
              placeholder="Write something about youself (min. 10 characters)" id=""></textarea>
            <p class="text-xs text-sub-webapp">min. 10 characters</p>
          </div>
        </div>

        <p class="w-full text-left text-webapp text-sm mt-10">
          By clicking on “Next” you agree to Agent IBO
          <span @click="$router.push('/terms-of-service')" class="cursor-pointer text-primary underline">Terms and
            conditions</span>
        </p>
        <!-- submit btn -->
        <button :class="{
          'bg-blue-600 text-white': allFields() === true,
          'bg-gray-300 text-black': allFields() === false,
        }" :disabled="allFields() === false" class="w-full rounded-lg grid place-items-center h-14 mt-5" @click="() => {
          data.state = data.state?.state?.name;
          inputCompleted = true;
        }
          ">
          <span v-if="!processing">Next</span>
          <Preloader v-else />
        </button>
      </div>
    </div>

    <AffiliateFee v-else :data="data" @back="inputCompleted = false" />

    <!-- components -->
    <Toast :msg="errorMsg.msg" type="danger" v-if="onError" />
    <Toast :msg="newMsg" type="success" v-if="newMsg.length > 0" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "../../../../composables/axios";
import { useStore } from "vuex";
import AffiliateFee from "./AffiliateFee.vue";

const store = useStore();

const inputCompleted = ref(false);
const states = ref([]);

onMounted(async () => {
  getStates();
});

const data = reactive({
  role: "AGENT",
  bio: "",
  state: "Choose a state",
  city: "Choose a city",
  category: "Individual",
  address: "",
});

const onError = ref(false);
let errorMsg = ref({
  msg: "",
  field: null,
});

let newMsg = ref("");
const processing = ref(false);

function allFields() {
  for (const key of Object.keys(data)) {
    if (data[key].length < 1) {
      return false;
    }
    if (key === 'bio' && data[key].length < 10) {
      return false
    }
  }
  return true;
}

async function getStates() {
  try {
    const getState = await axios.get(
      "/countries-api/states/" + store.state.user.countryShortName
    );

    getState.data.results.forEach(async (state) => {
      const getCities = await axios.get(
        `/countries-api/cities/${store.state.user.countryShortName}/${state.stateid}`
      );

      let formatted = {
        state: state,
        cities: getCities.data.results,
      };

      states.value.push(formatted);
    });

    states.value = states.value.sort(function (a, b) {
      const nameA = a.state.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.state.name.toUpperCase(); // ignore upper and lowercase
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }

      // names must be equal
      return 0;
    });
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
input::placeholder,
textarea::placeholder {
  color: #71759d;
  font-size: 14px;
}

input,
textarea {
  padding-left: 10px;
  outline: none;
  border: 1px solid #d9ddee;
}

select {
  border: 1px solid #d9ddee;
}

input:focus,
textarea:focus {
  border: 1px solid #1b49ff;
}

/* formValidators */
.invalidField {
  border: 1px solid #c5120b !important;
}

.form-container::-webkit-scrollbar {
  height: 0.1rem;
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
