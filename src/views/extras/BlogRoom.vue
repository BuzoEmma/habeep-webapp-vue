<template>
  <div
    class="w-screen min-w-full flex flex-col items-center bg-white h-full min-h-screen overflow-y-auto"
  >
    <HomeNavbar />

    <div
      class="body px-6 2xl:px-44 md:px-20 w-full flex flex-col h-fit items-start gap-y-8"
    >
      <div class="flex flex-col w-full items-start gap-y-4 mt-16">
        <h1 class="text-webapp text-3xl md:text-4xl font-medium w-full">
          Blogroom
        </h1>
        <h2 class="text-sub-webapp text-xl w-full">
          Get latest information on company news and platform updates and
          features
        </h2>
      </div>

      <div
        class="w-full h-full grid place-items-center mt-10"
        v-if="blogs.length === 0 && !fetchingBlogs"
      >
        <p data-nosnippet class="montserrat text-5xl font-semibold">
          No blogs posted yet
        </p>
      </div>
      <!-- blogs -->
      <div
        class="flex flex-row mt-6 md:mt-10 w-full h-fit flex-wrap flex-auto"
        v-if="blogs.length > 0 && !fetchingBlogs"
      >
        <!-- blog article template -->
        <div
          class="flex flex-col items-start md:basis-1/2 xl:basis-1/3 w-full cursor-pointer md:px-3 md:py-3 py-5 px-0 shadow-lg"
          @click="$router.push('/blog/' + blog._id)"
          v-motion-fade
          v-for="blog in blogs"
          :key="blog"
        >
          <div class="w-full rounded-[5px] border border-gray-100">
            <Skeleton class="w-full blog-image" v-if="!blog.imageLoaded" />
            <img
              :src="blog.imageCover"
              :alt="blog.title"
              @load="blog.imageLoaded = true"
              :class="{ hidden: !blog.imageLoaded }"
              class="w-full rounded-[5px] blog-image"
            />
          </div>
          <h1 class="text-webapp text-lg font-medium ubuntu mt-2 w-full">
            {{ blog.title }}
          </h1>
          <h2 class="text-sub-webapp text-sm w-full mt-1">
            {{ blog.subtitle }}
          </h2>
          <time class="text-sub-webapp text-sm w-full mt-1"
            >{{ moment(blog.createdAt).format("MMM DD, YYYY") }} .
            <span class="text-webapp font-bold">{{ blog.username }}</span>
          </time>
        </div>
      </div>

      <div
        data-nosnippet=""
        class="flex flex-row mt-6 md:mt-10 w-full h-fit flex-wrap"
        v-if="blogs.length === 0 && fetchingBlogs"
      >
        <!-- blog article skeleton -->
        <div
          class="flex flex-col w-full items-start gap-y-3 md:basis-1/2 xl:basis-1/3 md:px-3 md:py-3 py-5 px-0"
          v-for="item in 4"
          :key="item"
        >
          <div class="w-full rounded-lg">
            <Skeleton class="w-full blog-image" />
          </div>
          <Skeleton class="w-full h-5 rounded-2xl" />
          <Skeleton class="w-4/5 h-3 rounded-2xl" />
          <Skeleton class="w-2/5 h-2 rounded-2xl" />
        </div>
      </div>

      <!-- anima -->
      <div
        class="download-app-animation sm:w-5/6 w-full md:w-3/5 self-center xl:w-3/4 border-2 p-4 rounded xl:relative border-gray-300 h-fit xl:p-8 2xl:p-16 mt-24 md:mt-32 xl:mt-48"
      >
        <div
          class="flex flex-col items-center xl:items-start gap-y-4 xl:gap-y-3 xl:w-1/2"
        >
          <h1
            class="text-webapp text-2xl md:text-3xl xl:text-4xl font-bold xl:w-full w-full md:w-5/6 text-left md:text-center xl:text-left"
          >
            House search in just a click
          </h1>
          <h2
            class="text-sub-webapp text-sm md:text-lg xl:w-full w-full md:w-4/6 text-left md:text-center xl:text-left"
          >
            Get the app on any device you use on apple store or google playstore
          </h2>
          <!-- download stores -->
          <div class="flex flex-row gap-x-2 items-center w-fit mt-4">
            <a
              href="https://apps.apple.com/us/app/habeep/id6450388013"
              target="_blank"
              class="no-underline cursor-pointer"
              ><img
                src="../../assets/images/apple-download.svg"
                class="cursor-pointer"
                alt="ios app download button"
            /></a>

            <a
              href="https://play.google.com/store/apps/details?id=org.habeep"
              target="_blank"
              class="no-underline cursor-pointer"
              ><img
                src="../../assets/images/android-download.svg"
                class="cursor-pointer"
                alt="android app download button"
            /></a>
          </div>
        </div>

        <!-- phone anime -->
        <img
          src="../../assets/images/phone-blog-anime.svg"
          data-nosnippet=""
          class="hidden lg:block absolute -top-[27%] -rotate-6 2xl:-bottom-full right-10"
          alt="screenshot of habeep app"
        />
      </div>
    </div>

    <div
      class="flex flex-wrap justify-center flex-row md:mb-16 mb-12 items-center gap-x-4 mt-36 md:mt-52 xl:mt-64 z-20"
    >
      <router-link to="/terms-of-service" class="underline text-webapp"
        >Terms of service</router-link
      >
      <router-link
        to="/listings/search?name=Houses"
        class="underline text-webapp"
        >Products</router-link
      >
      <router-link to="/help" class="underline text-webapp">Help</router-link>
      <router-link to="/about-tenant" class="underline text-blue-600"
        >About Tenants</router-link
      >
      <router-link to="/about-landlord" class="underline text-blue-600"
        >About Landlord</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HomeNavbar from "../../components/HomeNavbar.vue";
import axios from "../../composables/axios.js";
import moment from "moment";
import { useHead } from "@vueuse/head";

useHead({
  title: "Habeep | Blogroom",
  meta: [
    {
      name: "description",
      content:
        "Get latest information on company news and platform updates and features",
    },
    { name: "og:title", content: "Habeep | Blogroom" },
    { name: "og:url", content: "https://habeep.org/blog" },
    {
      name: "og:description",
      content:
        "Get latest information on company news and platform updates and features",
    },
    { name: "og:website", content: "website" },
  ],
});

const fetchingBlogs = ref(false);
const blogs = ref([]);
async function fetchBlogs() {
  try {
    fetchingBlogs.value = true;
    const fetchBlogs = await axios.get("/articles/blog/fetch");

    setTimeout(() => {
      blogs.value = fetchBlogs.data.data;
      fetchingBlogs.value = false;
    }, 1000);
  } catch (error) {
    fetchingBlogs.value = false;
  }
}

fetchBlogs();
</script>

<style scoped>
.blog-image {
  height: 271px !important;
}
</style>
