<template>
    <div class="w-screen min-w-full flex flex-col justify-between items-center bg-white h-full min-h-screen overflow-y-none">
      <!-- Header / Navbar -->
      <HomeNavbar />
  
      
      
      <!-- Hero/Quick search -->
      <div class="flex flex-col items-center w-full justify-center gap-y-10">
        <img src="../../assets/images/404.svg" class="md:w-fit w-4/5 " alt="">
        <p class="w-full font-medium text-webapp text-xl md:text-2xl text-center ubuntu">Oops! it seems like something is wrong</p>
        <img src="../../assets/images/go-back.svg" @click="$router.go(-1)" alt="" class="cursor-pointer">
      </div>
  
      <!-- iLLUSTRATIONS ?  Footer-->
      <div class="flex flex-row items-end xl:justify-between justify-center  w-full z-0">
        <img src="../../assets/images/left-404.svg" class="flex"  alt="">
        <img src="../../assets/images/left-404.svg" class="xl:flex hidden" alt="">
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from "vue"
  
  import HomeNavbar from '../../components/HomeNavbar.vue'
  </script>
  
  <style scoped>
  /*  Import Ubuntu font */
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
  
  /* Quick search */
  .quick-search {
    max-width: 692px;
    width: 692px;
  }
  .search-bar, .search-results {
    border: 1px solid #EBEBEB;
    box-shadow: 0px 8px 88px -6px rgba(24, 39, 75, 0.12), 0px 14px 88px -4px rgba(24, 39, 75, 0.12);
    border-radius: 10px;
    filter: drop-shadow(0 14px 88px -6 #18274B1F);
  }
  .search-results {
    min-height: 100px;
    max-height: 430px;
  }
  input::placeholder {
    color: #B1B4CD;
    font-size: 16px;
  }
  input {
    outline: none !important;
    border: none !important;
  }
  
  @media screen and (max-width: 768px) {
    .quick-search {
      width: 90%;
    }
    .search-results {
      height: 280px;
    }
  }
  </style>