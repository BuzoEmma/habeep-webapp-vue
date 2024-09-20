<script setup>
import { useHead } from "@vueuse/head";
import { computed, ref, watch } from "vue";
useHead({
  title: "Habeep | Find your dream property",
  meta: [
    { charset: "utf-8" },
    {
      name: "description",
      content:
        "Search for your new dream house at Habeep. You can also search for lands and other properties only at Habeep!!",
    },

    { name: "og:title", content: "Search Ads" },
    {
      name: "og:image",
      content:
        "https://res.cloudinary.com/dfjud30cb/image/upload/v1711364431/files/logo-white-bg.png",
    },
    { name: "og:url", content: "https://habeep.org/home" },
    { name: "og:website", content: "website" },
    { name: "og:description", content: "Search for Ads in the home page" },

    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  link: [
    {
      rel: "icon",
      href: "https://res.cloudinary.com/dfjud30cb/image/upload/v1711364431/files/logo-white-bg.png",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      href: "https://res.cloudinary.com/dfjud30cb/image/upload/v1711364476/files/logo-dark-bg.png",
      media: "(prefers-color-scheme: dark)",
    },
  ],
});

const faqData = ref([
  {
    question: "Learn more about us and get to know us better",
    answer: "Lorem ipsum dolor sit amet...",
    open: false,
  },
  {
    question: "Chibuzo",
    answer: "Nebula-Q Protocol is a Decentralized Finance (DeFi) plat.form...",
    open: false,
  },
  {
    question: "Git Guh",
    answer:
      "Made some design adjustment on the on the UI from Sharon's new QA Red… #1",
    open: false,
  },
  {
    question: "Medication",
    answer:
      "It's essential to contact the bus company directly or visit their website for the latest schedules, fares, and travel in.formation. Additionally, consider the time difference between Ghana (GMT) and Nigeria (WAT), which is 1 hour.",
    open: false,
  },
]);

const toggleAccordions = (index) => {
  searchResults.value = searchResults.value.map((item, i) => ({
    ...item,
    open: i === index ? !item.open : false,
  }));
};

const searchQuery = ref("");
const searchResults = ref([]);

searchResults.value = faqData.value;

watch(searchQuery, () => {
  if (searchQuery.value.length > 0) {
    searchResults.value = faqData.value.filter((item) => {
      return (
        item.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
  } else {
    searchResults.value = faqData.value;
  }
});

function toggleAccordion(index) {
  searchResults.value[index].open = !searchResults.value[index].open;
}
</script>

<template>
  <div class="about-container">
    <!-- Header Section -->
    <div class="about-header">
      <div class="head">
        <div @click="$router.push('/home')" class="head-logo">
          <img
            class="head-img"
            src="../assets//icons/logo-white.svg"
            alt="Habeep Logo"
          />
          <span class="text-2xl">Habeep</span>
        </div>
        <div @click="$router.push('/')" class="head-pointer">
          <img src="../assets//icons/logo-shape.png" class="head-pointer-img" />
          <span>Go to Habeep</span>
        </div>
      </div>

      <div class="header-text">
        <p class="header-text-faq">Frequently Asked Questions</p>
        <p class="header-text-answer">
          Learn more about us and get to know us better. If you have specific
          issues or need more clarification, get in touch with our
          <a class="header-text-answer-span" href="">support here.</a>
        </p>
      </div>
    </div>

    <!-- Search Input Section -->
    <div class="form">
      <div>
        <img src="../assets/icons/search-icon.png" alt="search-icon" />
        <input
          type="search"
          placeholder="Search for articles"
          v-model="searchQuery"
        />
      </div>
    </div>

    <div class="faq-cards">
      <div
        v-for="(item, index) in searchResults"
        :key="index"
        :class="{ 'faq-card': true, 'faq-card-open': item.open }"
      >
        <div class="faq-card-title-icon" @click="toggleAccordions(index)">
          <p>{{ item.question }}</p>

          <img
            v-if="item.open"
            src="../assets/icons/faq_arrow-down.png"
            alt="faq-arrow"
          />
          <img
            v-else
            src="../assets/icons/faq-arrow-right.png"
            alt="faq-arrow"
          />
        </div>
        <p class="faq-card-text">
          {{ item.open ? item.answer : "" }}
        </p>
      </div>
    </div>

    <div class="faq-social">
      <div class="faq-social-div">
        <div class="faq-social-text">
          <p>Join our Habeep community</p>
          <span>Stay in touch with the latest news and releases</span>
        </div>
        <div class="faq-social-media">
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <img src="../assets/icons/x.png" alt="x-image" />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <img src="../assets/icons/instagram.png" alt="x-image" />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <img src="../assets/icons/facebook.png" alt="x-image" />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <img src="../assets/icons/telegram.png" alt="x-image" />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <img src="../assets/icons/tiktok.png" alt="x-image" />
          </a>
        </div>
      </div>
    </div>

    <div class="link-up">
      <p @click="$router.push('/terms-of-service')">Terms Of Service</p>
      <p @click="$router.push('/listings/search')">Product</p>
      <p @click="$router.push('/help')">Help</p>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu&display=swap");

.about-container {
  max-width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: center;
  margin: 0px;
  padding: 0px;
  gap: 4rem;
  overflow-x: hidden;
  /* margin-bottom: 1rem; */
}

.about-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 451px;
  padding: 0px 0px 88px 0px;
  gap: 0px;
  opacity: 0px;
  background: #1b49ff;
}

.head {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  padding: 59px 102.1px 31.66px 87px;
  gap: 0px;
  opacity: 0px;
}

.head-logo {
  display: flex;
  gap: 5px;
  font-family: Ubuntu;
  font-size: 24px;
  font-weight: 500;
  line-height: 27.58px;
  text-align: left;
  opacity: 5px;
  color: white;
  cursor: pointer;
}

.head-img {
  width: 30px;
  height: 29.34px;
  border-radius: 3px 0px 0px 0px;
  opacity: 5px;
}

.head-pointer {
  width: auto;
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
}

.head-pointer span {
  font-family: Ubuntu;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.09px;
  text-align: left;
  color: white;
}
.head-pointer-img {
  width: 11.9px;
  height: 11.9px;
  gap: 0px;
  opacity: 0px;
}

.header-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1127px;
  max-height: 152px;
  top: 211px;
  gap: 26px;
  opacity: 0px;
  color: white;
}

.header-text-faq {
  font-family: Ubuntu;
  font-size: 47px;
  font-weight: 700;
  line-height: 54px;
  text-align: left;
}

.header-text-answer {
  font-family: Ubuntu;
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
  text-align: left;
}

.header-text-answer-span {
  color: #000;
}

.form {
  width: 100%;
  display: flex;
  justify-content: center;
}

.form div {
  max-width: 1128px;
  height: 100px;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  border: 0.5px solid #71759d;
  padding: 23px 40px 23px 40px;
  gap: 26px;
  border-radius: 20px;
  border: 0.5px solid #71759d;
  opacity: 0px;
}

.form div input {
  width: 100%;
  height: 98px;
  outline: none;
  font-size: 20px;
}

.form div img {
  width: 24px;
  height: 24px;
  gap: 0px;
  opacity: 0px;
}

.faq-cards {
  max-width: 100vw;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  gap: 2rem;
}

.faq-card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  width: 100%;
  max-width: 1136px;
  height: 100%;
  padding: 40px;
  /* gap: 1.5rem; */
  border-radius: 20px;
  border: 0.5px 0px 0px 0px;
  justify-content: space-between;
  opacity: 0px;
  border: 0.5px solid #71759d;
  /* background: #000; */
}

.faq-card-title-icon {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #4e527b;
  cursor: pointer;
}

.faq-card-title-icon p {
  font-family: Ubuntu;
  font-size: 24px;
  font-weight: 500;
  line-height: 27.58px;
  text-align: left;
}

.faq-card-text {
  width: 100%;
  max-width: 968px;
  height: 100%;
  font-family: Ubuntu;
  font-weight: 400;
  font-size: 10px;
  text-align: left;
  font-size: 20px;
  line-height: 33px;
  color: #71759d;
}

.faq-social {
  height: 370px;
  gap: 0px;
  border-radius: 15px;
  opacity: 0px;
  margin-bottom: 3rem;
  width: 100%;
  max-width: 973px;
  background: #1b49ff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5rem;
}

.faq-social-div {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 561px;
  height: 188px;
}

.faq-social-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: white;
}

.faq-social-text p {
  font-family: Ubuntu;
  font-size: 43px;
  font-weight: 700;
  line-height: 49.41px;
  text-align: left;
}

.faq-social-text span {
  font-family: Ubuntu;
  font-size: 20px;
  font-weight: 400;
  line-height: 22.98px;
  text-align: left;
}

.faq-social-media {
  display: flex;
}

.faq-social-media {
  width: 100%;
  max-width: 360px;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.link-up {
  width: 100%;
  max-width: 304px;
  margin-bottom: 3rem;
  height: 19px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link-up p {
  font-family: Ubuntu;
  font-size: 16px;
  font-weight: 400;
  line-height: 18.38px;
  text-align: left;
  text-decoration: underline;
  cursor: pointer;
}

@media (max-width: 1200px) {
  .about-header {
    height: 383px;
    padding: 0px 0px 75px 0px;
  }
  .head {
    height: 102px;
    padding: 50px 87px 27px 75px;
  }
  .head-logo {
    font-size: 20px;
  }
  .head-pointer span {
    font-size: 12px;
  }
  .header-text {
    max-width: 958px;
    max-height: 129px;
    gap: 22px;
  }
  .header-text-faq {
    font-size: 40px;
    line-height: 46px;
  }
  .header-text-answer {
    font-size: 20px;
    line-height: 30px;
  }
  .form div {
    max-width: 958px;
    height: 80px;
    padding: 20px 35px 20px 35px;
    gap: 22px;
  }
  .form div input {
    font-size: 17px;
    height: 50px;
  }
  .faq-cards {
    margin-top: 3.4rem;
  }
  .faq-card {
    max-width: 965px;
    padding: 34px;
    gap: 1.3rem;
  }
  .faq-card-title-icon p {
    font-size: 20px;
    line-height: 23px;
  }
  .faq-card-text {
    font-size: 17px;
    line-height: 28px;
  }
  .faq-social {
    height: 315px;
    max-width: 829px;
    margin-top: 4.3rem;
  }
  .faq-social-div {
    max-width: 476px;
    height: 160px;
  }
  .faq-social-text p {
    font-size: 37px;
    line-height: 42px;
  }
  .faq-social-text span {
    font-size: 17px;
    line-height: 19px;
  }
  .link-up {
    max-width: 258px;
  }
}

@media (max-width: 1000px) {
  /* ... */
  .about-header {
    height: 306px;
    padding: 0px 0px 60px 0px;
  }
  .head {
    height: 82px;
    padding: 40px 70px 22px 60px;
  }
  .head-logo {
    font-size: 17px;
  }
  .head-pointer span {
    font-size: 10px;
  }
  .header-text {
    max-width: 798px;
    max-height: 107px;
    gap: 18px;
  }
  .header-text-faq {
    font-size: 33px;
    line-height: 38px;
  }
  .header-text-answer {
    font-size: 17px;
    line-height: 25px;
  }
  .form div {
    max-width: 798px;
    height: 70px;
    padding: 15px 25px 15px 25px;
    gap: 18px;
  }
  .form div input {
    font-size: 14px;
  }
  .faq-cards {
    margin-top: 2.8rem;
  }
  .faq-card {
    max-width: 798px;
    padding: 28px;
    gap: 1.1rem;
  }
  .faq-card-title-icon p {
    font-size: 17px;
    line-height: 20px;
  }
  .faq-card-text {
    font-size: 14px;
    line-height: 23px;
  }
  .faq-social {
    height: 261px;
    max-width: 689px;
    margin-top: 3.6rem;
  }
  .faq-social-div {
    max-width: 397px;
    height: 134px;
  }
  .faq-social-text p {
    font-size: 31px;
    line-height: 35px;
  }
  .faq-social-text span {
    font-size: 14px;
    line-height: 16px;
  }
  .link-up {
    max-width: 215px;
  }
}

@media (max-width: 800px) {
  .about-header {
    height: 229px;
    padding: 0px 0px 45px 0px;
  }
  .head {
    height: 62px;
    padding: 30px 55px 17px 47px;
  }
  .head-logo {
    font-size: 14px;
  }
  .head-pointer span {
    font-size: 9px;
  }
  .header-text {
    max-width: 638px;
    max-height: 85px;
    gap: 14px;
  }
  .header-text-faq {
    font-size: 27px;
    line-height: 31px;
  }
  .header-text-answer {
    font-size: 14px;
    line-height: 20px;
  }
  .form div {
    max-width: 638px;
    height: 55px;
    padding: 10px 20px 10px 20px;
    gap: 14px;
  }
  .form div input {
    font-size: 12px;
  }
  .faq-cards {
    margin-top: 2.2rem;
  }
  .faq-card {
    max-width: 638px;
    padding: 22px;
    gap: 0.9rem;
  }
  .faq-card-title-icon p {
    font-size: 14px;
    line-height: 17px;
  }

  .faq-card-title-icon img {
    width: 40px;
  }
  .faq-card-text {
    font-size: 12px;
    line-height: 18px;
  }
  .faq-social {
    height: 207px;
    max-width: 549px;
    margin-top: 2.9rem;
  }
  .faq-social-div {
    max-width: 318px;
    height: 108px;
  }
  .faq-social-text p {
    font-size: 20px;
    line-height: 28px;
  }
  .faq-social-media a img {
    margin-top: 1rem;
    width: 40px;
  }
  .faq-social-text span {
    font-size: 12px;
    line-height: 14px;
  }
  .link-up {
    max-width: 50%;
    gap: 1rem;
  }
}

@media (max-width: 700px) {
  /* ... */
  .about-header {
    height: 183px;
    padding: 0px 0px 36px 0px;
  }
  .head {
    height: 50px;
    padding: 25px 45px 14px 39px;
  }
  .head-logo {
    font-size: 12px;
  }
  .head-pointer span {
    font-size: 8px;
  }
  .header-text {
    max-width: 518px;
    max-height: 69px;
    gap: 11px;
  }
  .header-text-faq {
    font-size: 22px;
    line-height: 25px;
  }
  .header-text-answer {
    font-size: 12px;
    line-height: 17px;
  }
  .form div {
    max-width: 518px;
    height: 45px;
    padding: 8px 15px 8px 15px;
    gap: 11px;
  }
  .form div input {
    font-size: 10px;
    height: 40px;
  }
  .faq-cards {
    margin-top: 1.8rem;
  }
  .faq-card {
    max-width: 518px;
    padding: 18px;
    gap: 0.7rem;
  }
  .faq-card-title-icon p {
    font-size: 12px;
    line-height: 15px;
  }
  .faq-card-text {
    font-size: 10px;
    line-height: 15px;
  }
  .faq-social {
    height: 165px;
    max-width: 449px;
    margin-top: 2.4rem;
  }
  .faq-social-div {
    max-width: 259px;
    height: 88px;
  }
  .faq-social-text p {
    font-size: 20px;
    line-height: 23px;
  }
  .faq-social-text span {
    font-size: 10px;
    line-height: 12px;
  }
  .link-up {
    max-width: 50%;
    gap: 1rem;
  }
}

@media (max-width: 560px) {
  .about-header {
    width: 100%;
    min-width: 375px;
    height: 325px;
    padding: 0px 0px 88px 0px;
  }

  .head {
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }

  .head-logo {
    width: 101px;
    height: 23.47px;
    gap: 5px;
  }

  .head-logo span {
    width: 72px;
    height: 23px;
    font-family: Ubuntu;
    font-size: 20px;
    font-weight: 500;
    line-height: 22.98px;
    text-align: left;
  }

  .head-img {
    width: 24px;
    height: 23.47px;
    gap: 0px;
    border-radius: 3px 0px 0px 0px;
    opacity: 0px;
  }

  .head-pointer span {
    width: 84px;
    height: 14px;
    gap: 0px;
    opacity: 0px;
    font-size: 12px;
    font-weight: 400;
    line-height: 13.79px;
  }
  .head-pointer-img {
    width: 10px;
    height: 10px;
    gap: 0px;
    opacity: 0px;
  }

  .header-text {
    width: 100%;
    /* width: 331px; */
    height: 208px;
    padding: 5px 20px;
    gap: 26px;
  }

  .header-text-faq {
    width: 100%;
    height: 74px;
    font-size: 32px;
    font-weight: 700;
    line-height: 36.77px;
  }

  .header-text-answer {
    width: 100%;
    height: 108px;
    font-size: 14px;
    font-weight: 400;
    line-height: 36px;
    text-align: left;
  }

  .header-text-answer-span {
    font-style: italic;
  }

  .form {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 5px 20px;
  }

  .form div {
    width: 100%;
    height: 50px;
    padding: 23px 24px 23px 24px;
    gap: 10px;
    border-radius: 10px;
    border: 0.5px 0px 0px 0px;
  }

  .form div input::placeholder {
    font-size: 14px;
  }

  .form div img {
    width: 18px;
    height: 18px;
    gap: 0px;
    opacity: 0px;
  }

  .faq-cards {
    width: 100%;
    height: 100%;
    padding: 5px 20px;
    gap: 25px;
    border: 0.5px 0px 0px 0px;
    opacity: 0px;
    margin-top: -1rem;
  }

  .faq-card {
    width: 100%;
    min-height: 72px;
    padding: 18px 20px 5px 24px;
    height: 100%;
    border-radius: 10px;
    border: 0.5px 0px 0px 0px;
    opacity: 0px;
  }

  .faq-card-open {
    gap: 2rem;
    padding: 20px 24px 15px 24px;
  }

  .faq-card-title-icon {
    width: 100%;
    /* min-width: 289px; */
    height: 100%;
    min-height: 32px;
    gap: 1rem;
    opacity: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .faq-card-title-icon p {
    width: 239px;
    height: 100%;
    min-height: 32px;
    gap: 0px;
    opacity: 0px;

    font-family: Ubuntu;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.09px;
    text-align: left;
  }
  .faq-card-title-icon img {
    width: 30px;
    height: 30px;
    gap: 0px;
    opacity: 0px;
  }
  .faq-card-text {
    min-width: 253px;
    height: 100%;
    font-family: Ubuntu;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
  }

  .faq-social {
    width: 100%;
    min-height: 370px;
    top: 1490px;
    gap: 0px;
    border-radius: 0px;
    opacity: 0px;
    margin-top: -0.2rem;
  }

  .faq-social-div {
    min-width: 100%;
    min-height: 40%;
    top: 108px;
    left: 28px;
    gap: 0px;
    opacity: 0px;
  }

  .faq-social-text p {
    width: 100%;
    opacity: 0px;
    font-family: Ubuntu;
    font-size: 24px;
    font-weight: 700;
    line-height: 27.58px;
    text-align: left;
  }

  .faq-social-text span {
    width: 100%;
    font-family: Ubuntu;
    font-size: 15px;
    font-weight: 400;
    line-height: 17.24px;
    text-align: left;
  }

  .faq-social-media {
    width: 320px;
    height: 48px;
    gap: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .link-up {
    width: 100%;
    max-width: 285px;
    margin-bottom: 3rem;
    height: 19px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .link-up p {
    /* max-width: 56px; */
    height: 17px;
    font-family: Ubuntu;
    font-size: 14px;
    font-weight: 400;
    line-height: 16.09px;
    text-align: left;
  }
}
</style>
