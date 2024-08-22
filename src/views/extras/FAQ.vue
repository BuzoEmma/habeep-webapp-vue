<template>
  <div
    class="w-screen relative min-w-full flex flex-col items-center bg-white h-screen min-h-full overflow-y-auto no-scroll-btn"
  >
    <div class="top-details h-1/5 flex-col-center py-4 w-screen bg-primary">
      <div class="flex flex-col items-center w-5/6 xl:w-4/5 2xl:w-4/6 gap-y-10">
        <div class="flex-row-center w-full justify-between">
          <img
            class="cursor-pointer"
            @click="$router.push('/')"
            src="../../assets/icons/habeep-logo-white.svg"
            alt=""
          />
          <img
            class="cursor-pointer"
            src="../../assets/icons/gotohabeep.svg"
            @click="$router.push('/feeds')"
            alt=""
          />
        </div>

        <div
          class="flex-row-center h-fit w-full focus-within:absolute focus-within:top-16 focus-within:md:w-4/5 focus-within:w-5/6 focus-within:bg-blue-600 relative z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 text-white absolute left-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search for articles"
            @input="searchArticles"
            v-model="searchWord"
            class="rounded-lg h-14 w-full placeholder:text-white placeholder:text-lg pl-14 text-white z-20 bg-white bg-opacity-30"
          />
        </div>
      </div>
    </div>

    <div class="h-fit w-full py-20 flex-col-center relative">
      <img
        v-motion-pop
        :delay="30"
        src="https://cdn.dribbble.com/users/1883357/screenshots/6016190/search_no_result.png"
        alt="no result found in search"
        class="rounded-lg"
        style="max-height: 500px"
        v-if="filteredCollections.length === 0"
      />
      <div
        v-motion-slide-bottom
        class="w-5/6 xl:w-4/5 2xl:w-4/6 gap-y-10 flex flex-col items-center"
        v-else-if="!onArticle"
      >
        <div
          @click="selectCollection(collection)"
          v-for="collection in filteredCollections"
          :key="collection"
          class="article cursor-pointer flex flex-col md:flex-row items-start md:items-center w-full h-fit p-5 gap-x-10 gap-y-8"
        >
          <img src="../../assets/icons/book.svg" alt="" />

          <div class="flex flex-col w-fit h-full justify-between gap-y-3">
            <div class="flex-col flex w-fit gap-y-1">
              <h1 class="text-webapp text-lg md:text-xl font-medium">
                {{ collection.title }}
              </h1>
              <h2 class="text-sub-webapp text-sm md:text-lg">
                {{ collection.subtitle }}
              </h2>
            </div>

            <div class="flex-row-center gap-x-2 w-fit">
              <img src="../../assets/icons/habeep-small-logo.svg" alt="" />

              <p class="flex-col flex w-fit gap-y-1">
                <span class="text-sub-webapp text-sm" data-nosnippet
                  >{{ collection.articles.length }} article in this
                  collection</span
                >
                <span class="text-sub-webapp text-sm"
                  >Written by:
                  <strong class="text-webapp uppercase">{{
                    collection.writer
                  }}</strong></span
                >
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="w-11/12 xl:w-4/5 2xl:w-4/6 gap-y-10 flex flex-col items-center"
        v-motion-slide-right
        :delay="20"
        v-else
      >
        <Article @goBack="cleanArticle" :data="articleData" />
      </div>
    </div>

    <!-- footer -->
    <div
      class="footer w-full sm:5/6 md:w-4/5 lg:w-3/5 flex flex-col items-center justify-center text-center mt-3 gap-y-5"
    >
      <div class="info">
        <p class="font-bold text-white text-3xl sm:text-4xl">
          Join our Habeep community
        </p>
        <p class="hero-subtitle-trans text-white">
          Stay in touch with the latest news and releases
        </p>
      </div>
      <div class="social-links flex flex-row gap-x-3">
        <a href="https://www.twitter.com/habeep_re" class="link">
          <div
            class="bg-white h-10 w-10 sm:h-12 sm:w-12 grid-center"
            style="border-radius: 50%"
          >
            <img src="../../assets/images/socials/twitter.svg" alt="" />
          </div>
        </a>
        <a href="https://instagram.com/habeep_re" class="link">
          <div
            class="bg-white h-10 w-10 sm:h-12 sm:w-12 grid-center"
            style="border-radius: 50%"
          >
            <img src="../../assets/images/socials/insta.svg" alt="" />
          </div>
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=100069897356008&mibextid=ZbWKwL"
          class="link"
        >
          <div
            class="bg-white h-10 w-10 sm:h-12 sm:w-12 grid-center"
            style="border-radius: 50%"
          >
            <img src="../../assets/images/socials/fb.svg" alt="" />
          </div>
        </a>
        <a href="https://www.linkedin.com/company/habeep/" class="link">
          <div
            class="bg-white h-10 w-10 sm:h-12 sm:w-12 grid-center p-2"
            style="border-radius: 50%"
          >
            <img src="../../assets/images/socials/linkedin.svg" alt="" />
          </div>
        </a>
        <!-- <a href="#" class="link">
                    <div class="bg-white h-10 w-10 sm:h-12 sm:w-12 grid-center" style="border-radius: 50%"><img
                            src="../../assets/images/socials/telegram.svg" alt=""></div>
                </a>
                <a href="#" class="link">
                    <div class="bg-white h-10 w-10 sm:h-12 sm:w-12 grid-center" style="border-radius: 50%"><img
                            src="../../assets/images/socials/tiktok.svg" alt=""></div>
                </a> -->
      </div>
    </div>

    <div class="flex flex-row items-center gap-x-4 mt-24 z-20 mb-8">
      <router-link to="/terms-of-service" class="underline text-webapp"
        >Terms of service</router-link
      >
      <router-link
        to="/listings/search?name=Houses"
        class="underline text-webapp"
        >Products</router-link
      >
      <router-link to="/help" class="underline text-blue-600">Help</router-link>

      <a href="https://habeep.org/terms-of-service" class="hidden"
        >Habeep Terms of service</a
      >
      <a href="https://habeep.org/blog" class="hidden">Habeep Blogs</a>
    </div>

    <div class="fixed z-20 right-0 bottom-0 md:top-1/2">
      <a
        href="mailto:habeepsystems@gmail.com?subject=I have an enquiry. It is about ...."
        target="_blank"
      >
        <img
          class="cursor-pointer"
          src="../../assets/icons/send-mail.svg"
          alt=""
        />
      </a>
    </div>
  </div>
</template>

<script setup>
import Article from "./components/Article.vue";

import faq from "./data/articles/faq.json";
import contact_us from "./data/articles/contact-us.json";
// import hbptoken from './data/articles/hbptoken.json'
// import wallet from './data/articles/wallet.json'

const collections = [];
const filteredCollections = ref([]);
collections.push(faq);
// collections.push(hbptoken)
// collections.push(wallet)
collections.push(contact_us);
filteredCollections.value = collections;

import { useHead } from "@vueuse/head";
import { ref } from "vue";
useHead({
  title: "Habeep | Support Center",
  meta: [
    { charset: "utf-8" },
    {
      name: "description",
      content:
        "Have an Issue and want to learn more about Habeep? Visit our help page to learn more",
    },

    { name: "og:title", content: "Habeep | Support Center" },
    { name: "og:image", content: "../../assets/icons/book.svg" },
    { name: "og:url", content: "https://habeep.org/help" },
    { name: "og:website", content: "website" },
    {
      name: "og:description",
      content:
        "Have an Issue and want to learn more about Habeep? Visit our help page to learn more",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
});

const onArticle = ref(false);
const articleData = ref(null);
function selectCollection(collection) {
  onArticle.value = true;
  articleData.value = collection;

  useHead({
    title: "Habeep | " + collection.title,
    meta: [
      { charset: "utf-8" },
      { name: "description", content: collection.subtitle },
      { name: "og:title", content: "Habeep | " + collection.title },
      {
        name: "og:url",
        content: "https://habeep.org/help?article=" + collection.title,
      },
      { name: "og:website", content: "website" },
      { name: "og:description", content: collection.subtitle },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  });
}
function cleanArticle() {
  onArticle.value = false;
  articleData.value = null;

  useHead({
    title: "Habeep | Support Center",
    meta: [
      { charset: "utf-8" },
      {
        name: "description",
        content:
          "Have an Issue and want to learn more about Habeep? Visit our help page to learn more",
      },

      { name: "og:title", content: "Habeep | Support Center" },
      { name: "og:image", content: "../../assets/icons/book.svg" },
      { name: "og:url", content: "https://habeep.org/help" },
      { name: "og:website", content: "website" },
      {
        name: "og:description",
        content:
          "Have an Issue and want to learn more about Habeep? Visit our help page to learn more",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  });
}

const searchWord = ref("");
function searchArticles() {
  if (searchWord.value.length > 0) {
    const results = [];
    for (const collection of collections) {
      if (
        collection.title
          .toLowerCase()
          .includes(searchWord.value.toLowerCase()) ||
        collection.subtitle
          .toLowerCase()
          .includes(searchWord.value.toLowerCase()) ||
        collection.writer.toLowerCase().includes(searchWord.value.toLowerCase())
      ) {
        results.push(collection);
      }

      if (collection.articles.length > 0) {
        collection.articles.forEach((article) => {
          if (
            article.title
              .toLowerCase()
              .includes(searchWord.value.toLowerCase()) ||
            article.subtitle
              .toLowerCase()
              .includes(searchWord.value.toLowerCase()) ||
            article.content
              .toLowerCase()
              .includes(searchWord.value.toLowerCase())
          ) {
            results.push(collection);
          }
        });
      }
    }

    const uniqueIds = [];
    const uniqueResults = results.filter((element) => {
      const isDuplicate = uniqueIds.includes(element._id);
      if (!isDuplicate) {
        uniqueIds.push(element._id);
        return true;
      }
      return false;
    });

    filteredCollections.value = uniqueResults;
  } else {
    filteredCollections.value = collections;
  }
}
</script>

<style scoped>
.footer {
  background: url("../../assets/images/socials/bg-footer.svg");
  background-size: cover;
  box-shadow: 0px 6px 14px -6px rgba(24, 39, 75, 0.07),
    0px 10px 32px -4px rgba(24, 39, 75, 0.05);
  border-radius: 15px;
  min-height: 370px !important;
}

@media screen and (max-width: 450px) {
  .footer {
    background: #1b49ff;
    border-radius: 0;
  }
}

.article {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 6px 14px -6px rgba(24, 39, 75, 0.07),
    0px 10px 32px -4px rgba(24, 39, 75, 0.05);
  border-radius: 15px;
  min-height: 170px;
}
</style>
