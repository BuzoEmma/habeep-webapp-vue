<template>
  <div class="main flex flex-col items-center gap-y-4 z-20 p-5  justify-end overflow-hidden my-auto mx-auto bg-white">
    <img src="../../../../../assets/icons/listings/house_uploaded.svg" alt="">
    <span class="text-sm text-gray-400 mt-4">Hurray!</span>
    <span class="text-webapp text-lg font-medium">Ads successfully published</span>
    <button class="bg-primary mt-4 rounded-lg w-full grid place-items-center h-14 text-white"
      @click="$emit('gotoProduct')">View Listing</button>
  </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue'


</script>
  
<style scoped>
.main {
  width: 400px;
  height: 410px;
  border-radius: 15px;
}

@media screen and (max-width: 767px) {
  .main {
    width: 95vw;
  }
}
</style>