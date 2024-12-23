<template>
  <div>
    <div
      class="flex-row-center text-sub-webapp text-sm gap-x-1 w-full breadcrumb"
    >
      <span data-nosnippet class="cursor-pointer" @click="$emit('goBack')"
        >All Articles ></span
      >
      <span class="cursor-pointer" @click="leaveArticle"
        >{{ props.data.title }}
      </span>
      <span v-if="props.data.articles.length > 1 && readingArticle">
        > {{ readingArticle.title }}</span
      >
    </div>

    <div
      class="article-container p-5 md:px-20 md:py-14 w-full"
      v-if="readingArticle"
      v-motion-slide-bottom
      :delay="20"
    >
      <h1
        class="text-webapp font-medium text-3xl"
        v-if="props.data.articles.length > 1"
      >
        {{ readingArticle.title }}
      </h1>
      <h1 class="text-webapp font-medium text-3xl" v-else>
        {{ props.data.title }}
      </h1>

      <h2
        class="text-xl text-sub-webapp mt-2"
        v-if="props.data.articles.length > 1"
      >
        {{ readingArticle.subtitle }}
      </h2>
      <h2 class="text-xl text-sub-webapp mt-2" v-else>
        {{ props.data.subtitle }}
      </h2>

      <div class="flex-row-center gap-x-2 w-fit mt-4">
        <img
          data-nosnippet
          src="../../../assets/icons/habeep-small-logo.svg"
          alt=""
        />

        <span class="text-sub-webapp text-sm"
          >Written by:
          <strong class="text-webapp uppercase">{{
            props.data.writer
          }}</strong></span
        >
      </div>

      <article
        class="mt-10 break-words w-full h-fit text-sub-webapp sm:text-lg text-sm"
        v-html="readingArticle.content"
      ></article>
    </div>

    <div class="w-full gap-y-10 flex flex-col items-center" v-else>
      <div
        @click="selectArticle(article)"
        v-for="article in props.data.articles"
        :key="article"
        class="article cursor-pointer flex flex-col md:flex-row items-start overflow-x-hidden md:items-center w-full h-fit p-5 gap-x-10 gap-y-8"
      >
        <img src="../../../assets/icons/book.svg" alt="" />

        <div class="flex flex-col w-fit h-full justify-between gap-y-3">
          <div class="flex-col flex w-fit gap-y-1">
            <h1 class="text-webapp text-lg md:text-xl font-medium">
              {{ article.title }}
            </h1>
            <h2 class="text-sub-webapp text-sm md:text-lg">
              {{ article.subtitle }}
            </h2>
          </div>

          <div class="flex-row-center gap-x-2 w-fit mt-4">
            <img
              data-nosnippet
              src="../../../assets/icons/habeep-small-logo.svg"
              alt=""
            />

            <span class="text-sub-webapp text-sm"
              >Written by:
              <strong class="text-webapp uppercase">{{
                props.data.writer
              }}</strong></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "@vueuse/head";

const props = defineProps({
  data: {
    type: Object,
    required: true,
    Schema: {
      articles: {
        type: Object,
      },
    },
  },
});
const readingArticle = ref(null);

if (props.data.articles.length === 1) {
  readingArticle.value = props.data.articles[0];

  useHead({
    title: "Habeep | " + readingArticle.value.title,
    meta: [
      { charset: "utf-8" },
      { name: "description", content: readingArticle.value.subtitle },
      { name: "og:title", content: "Habeep | " + readingArticle.value.title },
      { name: "og:url", content: "https://habeep.org/help" },
      { name: "og:website", content: "website" },
      { name: "og:description", content: readingArticle.value.subtitle },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  });
}

function selectArticle(article) {
  readingArticle.value = article;

  useHead({
    title: "Habeep | " + readingArticle.value.title,
    meta: [
      { charset: "utf-8" },
      { name: "description", content: readingArticle.value.subtitle },
      { name: "og:title", content: "Habeep | " + readingArticle.value.title },
      { name: "og:url", content: "https://habeep.org/help" },
      { name: "og:website", content: "website" },
      { name: "og:description", content: readingArticle.value.subtitle },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  });
}

function leaveArticle() {
  readingArticle.value = null;
  useHead({
    title: "Habeep | " + props.data.title,
    meta: [
      { charset: "utf-8" },
      { name: "description", content: props.data.subtitle },
      { name: "og:title", content: "Habeep | " + props.data.title },
      { name: "og:url", content: "https://habeep.org/help" },
      { name: "og:website", content: "website" },
      { name: "og:description", content: props.data.subtitle },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  });
}
</script>

<style scoped>
.article-container {
  border-radius: 15px;
  border: 1px solid #d9ddee;
  background: #fff;
  box-shadow: 0px 10px 32px;
  min-height: 500px;
}

@media screen and (max-width: 450px) {
  .article-container {
    box-shadow: none !important;
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
