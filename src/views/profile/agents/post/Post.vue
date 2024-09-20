<template>
  <div
    class="absolute w-screen h-screen flex flex-row items-center justify-center"
    v-if="onModal"
    style="background: rgb(22, 22, 34, 0.5)"
  >
    <AdUploadedModal
      v-if="successModal"
      @gotoProduct="$router.push('/listings/products/' + savedProductID)"
    />
    <Toast :msg="errorMsg" type="danger" v-if="onError" />
  </div>
  <div class="h-screen max-w-screen">
    <component
      :is="currentComponent"
      @postSuccess="onDataSuccess"
      :data="data"
      @passData="getData"
      @goBack="back"
    >
    </component>
  </div>
</template>

<script setup>
import { ref, reactive, computed, provide } from "vue";
import { defineAsyncComponent } from "vue";
import axios from "../../../../composables/axios";
import { useStore } from "vuex";

import AdUploadedModal from "./components/AdUploadedModal.vue";
import router from "../../../../router";

const store = useStore();

const onModal = ref(false);
const successModal = ref(false);
const onError = ref(false);
let errorMsg = ref("");

// components

const url = "/listings/agent/create-product";

const ForPage = defineAsyncComponent(() => import("./components/For.vue"));
const HouseTypePage = defineAsyncComponent(() =>
  import("./components/HouseType.vue")
);
const Location = defineAsyncComponent(() =>
  import("./components/Location.vue")
);
const TitlePrice = defineAsyncComponent(() =>
  import("./components/Title_Price.vue")
);
const Size = defineAsyncComponent(() => import("./components/Size.vue"));
const Features = defineAsyncComponent(() =>
  import("./components/Features.vue")
);
const Desc = defineAsyncComponent(() => import("./components/Desc.vue"));
const Photos = defineAsyncComponent(() => import("./components/Photos.vue"));

let currentComponent = ref(ForPage);
let previousComponent = ref(null);

let savedProductID = ref("");

let data = reactive({
  for: "",
  type: "",
  status: "AVAILABLE",
  location: {},
  price: 0,
  title: "",
  bedrooms: 0,
  bathrooms: 1,
  size: 0,
  plots: 0,
});
const back = (e) => {
  currentComponent.value = eval(e.to);
  previousComponent.value = eval(e.from);
};

// save ad data to db
async function onDataSuccess(e) {
  onModal.value = true;
  savedProductID.value = e;
  successModal.value = true;
}

// get all form data
const getData = async (e) => {
  store.commit("addDataToListing", e);
  if (e.cast) {
    Object.keys(e.data).forEach((key) => {
      data[key] = e.data[key];
    });
  } else {
    data[e.type] = e.data;
  }
  if (e.type === "for") {
    currentComponent.value = HouseTypePage;
    previousComponent.value = ForPage;
  }
  if (e.type === "type") {
    currentComponent.value = Location;
    previousComponent.value = HouseTypePage;
  }
  if (e.type === "location") {
    currentComponent.value = TitlePrice;
    previousComponent.value = Location;
  }
  if (e.type === "title_price") {
    currentComponent.value = Size;
    previousComponent.value = TitlePrice;
  }
  if (e.type === "size") {
    currentComponent.value = Features;
    previousComponent.value = Size;
  }
  if (e.type === "features") {
    currentComponent.value = Desc;
    previousComponent.value = Features;
  }
  if (e.type === "description") {
    currentComponent.value = Photos;
    previousComponent.value = Desc;
  }
};

function managePagesOnload() {
  let savedData = store.state.listingProcess;

  if (savedData.for.length > 0) {
    currentComponent.value = HouseTypePage;
    previousComponent.value = ForPage;
  }
  if (savedData.type.length > 0) {
    currentComponent.value = Location;
    previousComponent.value = HouseTypePage;
  }
  if (savedData.location.address) {
    currentComponent.value = TitlePrice;
    previousComponent.value = Location;
  }
  if (savedData.title.length > 0) {
    currentComponent.value = Size;
    previousComponent.value = TitlePrice;
  }
  if (savedData.size > 0) {
    currentComponent.value = Features;
    previousComponent.value = Size;
  }
  if (savedData.features.length > 0) {
    currentComponent.value = Desc;
    previousComponent.value = Features;
  }
  if (savedData.description.length > 0) {
    currentComponent.value = Photos;
    previousComponent.value = Desc;
  }

  delete savedData.images;
  data = savedData;
}

managePagesOnload();
</script>

<style></style>
