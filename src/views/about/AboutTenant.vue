<script setup>
import { register } from "swiper/element/bundle";
register();
import { ref } from "vue";
import axios from "../../composables/axios.js";
import moment from "moment";
import { useHead } from "@unhead/vue";

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

import MainNavbar from "../../components/MainNavbar.vue";
import { useRouter } from "vue-router";
import discoverSvg1 from "../../assets/images/discoverImg1.svg";
import discoverSvg2 from "../../assets/images/discoverImg2.svg";
import tenants1 from "../../assets/images/tenantsSvg1.png";
import tenants2 from "../../assets/images/tenantsSvg2.png";
import landlordPhone from "../../assets/images/lan.png";
import testimonials from "./aboutTestimonials.js";

const router = useRouter();

function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  potentialAction: {
    "@type": "SeekToAction",
    target: "https://habeep.org/about?t={seek_to_second_number}",
    "startOffset-input": "required name=seek_to_second_number",
  },
  name: "Introducing Habeep!",
  duration: "PT00H00M14S",
  uploadDate: "2024-10-01T08:00:00+08:00",
  thumbnailUrl:
    "https://res.cloudinary.com/dfjud30cb/video/upload/v1730114260/files/web-assets/Habeep_About.jpg",
  description: "Our innovative solutions for your perfect living experience",
  contentUrl:
    "https://res.cloudinary.com/dfjud30cb/video/upload/v1730114260/files/web-assets/Habeep_About.mp4",
  embedUrl: "https://habeep.org/about",
};

useHead({
  script: [
    {
      type: "application/ld+json",
      textContent: JSON.stringify(structuredData),
    },
  ],
});
</script>

<template>
  <MainNavbar />

  <div class="about-sections">
    <section class="hero-section">
      <p class="intro-text">
        Our mission is to bridge the gap between landlords and tenants, making
        renting and managing properties easy.
      </p>
      <video
        class="hero-video object-cover object-center"
        src="../../assets/videos/HabeepAbout.mp4"
        fetchpriority="high"
        poster="https://res.cloudinary.com/dfjud30cb/video/upload/v1730114260/files/web-assets/Habeep_About.jpg"
        playsinline
        autoplay
        loop
        muted
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
    </section>

    <section class="discover-section">
      <div class="discover-header">
        <p class="discover-title">Discover</p>
        <p class="discover-subtitle">
          Our innovative solutions for your perfect living experience
        </p>
      </div>
      <div class="discover-svg">
        <img :src="discoverSvg1" class="discover-svg1" alt="" />
        <img :src="discoverSvg2" class="discover-svg2" alt="" />
      </div>
    </section>

    <section class="tenants-section">
      <div class="tenants-header">
        <b class="tenants-title">Tenants</b>
        <p class="tenants-subtitle">Living experience, right in your pocket.</p>
      </div>
      <div class="tenants-svg">
        <img :src="tenants1" class="tenants-svg1" alt="Tenants" />
        <img :src="tenants2" class="tenants-svg2" alt="Tenants" />
      </div>

      <div class="tenants-benefits">
        <div class="tenants-benefits-list">
          <div class="benefit1">
            <svg
              width="70"
              height="50"
              viewBox="0 0 70 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="70" height="50" rx="10" fill="#DFA76C" />
              <path
                d="M47.7503 15.161C47.6711 15.153 39.784 14.3255 36.0774 11.1619L35.8145 10.9375H34.1855L33.9226 11.1619C30.2225 14.3199 22.3288 15.153 22.25 15.161L21.4062 15.246V16.0938C21.4062 21.3164 22.2642 25.7877 23.9564 29.3836C26.1891 34.1281 29.8217 37.2157 34.7533 38.5607L35 38.628L35.2467 38.5607C40.1782 37.2157 43.8109 34.1281 46.0436 29.3836C47.7358 25.7877 48.5938 21.3164 48.5938 16.0938V15.246L47.7503 15.161ZM46.7111 16.9207C46.7019 17.4203 46.6834 17.9259 46.6556 18.4375H35.9375V13.3935C39.4485 15.7118 44.6694 16.635 46.7111 16.9207ZM35.9375 28.75H44.2734C43.8807 29.5667 43.4228 30.3505 42.9043 31.0938H35.9375V28.75ZM35.9375 26.875V24.5312H45.7754C45.5638 25.3826 45.3049 26.2215 44.9998 27.044V26.875H35.9375ZM35.9375 22.6562V20.3125H46.5065C46.4245 21.0922 46.3157 21.8759 46.1761 22.6562H35.9375ZM23.2889 16.9207C25.3306 16.635 30.5515 15.7118 34.0625 13.3933V36.3803C25.5085 33.3431 23.4273 24.3781 23.2889 16.9207ZM35.9375 36.3803V32.9688H41.3485C39.9247 34.416 38.147 35.5959 35.9375 36.3803Z"
                fill="white"
              />
            </svg>

            <p class="benefit-text">
              Safeguard your home with access to <span>rent loans</span>
            </p>
          </div>
          <div class="benefit2">
            <p class="benefit-text">With <span>30%</span> rent saved</p>
            <p class="benefit-text">3 months before rent expiration</p>
          </div>
          <div class="benefit3">
            <p class="benefit-text">
              Pay back <span>9% interest in </span>6 months
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="agent-section">
      <div class="agent-header">
        <p class="agent-title">Agent</p>
        <p class="agent-subtitle">Enjoy connecting with home-seekers.</p>
      </div>
      <div class="agent-svg">
        <div class="agent-svg-text">
          <p>
            Upload unique features of available properties and connect with
            ready home seekers.
          </p>
        </div>
        <div class="agent-svg-phone">
          <p><span>Earn</span> daily from our affiliate program</p>
          <img src="../../assets/images/agent-phone.png" alt="phone-image" />
        </div>
      </div>
    </section>

    <section class="blog-section" v-if="blogs.length > 0 && !fetchingBlogs">
      <div class="blog-header">
        <p class="blog-title">Blogs</p>
        <p class="blog-subtitle">
          Our stories, impacts, relevance, and potentials
        </p>
      </div>

      <div class="swiper-container-wrapper">
        <div class="swiper-prev">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1298_971)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M27.6433 42.3567C27.0184 41.7316 26.6674 40.8839 26.6674 40C26.6674 39.1161 27.0184 38.2684 27.6433 37.6433L46.5 18.7867C46.8075 18.4683 47.1753 18.2144 47.582 18.0397C47.9887 17.865 48.4261 17.773 48.8687 17.7692C49.3113 17.7653 49.7502 17.8497 50.1598 18.0173C50.5695 18.1849 50.9417 18.4324 51.2546 18.7454C51.5676 19.0583 51.8151 19.4305 51.9827 19.8402C52.1503 20.2498 52.2347 20.6887 52.2308 21.1313C52.227 21.5739 52.135 22.0113 51.9603 22.418C51.7856 22.8247 51.5317 23.1925 51.2133 23.5L34.7133 40L51.2133 56.5C51.8205 57.1287 52.1565 57.9707 52.1489 58.8447C52.1413 59.7187 51.7908 60.5547 51.1727 61.1727C50.5547 61.7908 49.7187 62.1413 48.8447 62.1489C47.9707 62.1565 47.1287 61.8205 46.5 61.2133L27.6433 42.3567Z"
                fill="#5D6065"
              />
            </g>
            <defs>
              <clipPath id="clip0_1298_971">
                <rect
                  width="80"
                  height="80"
                  fill="white"
                  transform="matrix(0 1 -1 0 80 0)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div class="swiper-next">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1298_967)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M52.3567 37.6433C52.9816 38.2684 53.3326 39.1161 53.3326 40C53.3326 40.8839 52.9816 41.7316 52.3567 42.3567L33.5 61.2133C33.1925 61.5317 32.8247 61.7856 32.418 61.9603C32.0113 62.135 31.5739 62.227 31.1313 62.2308C30.6887 62.2347 30.2498 62.1503 29.8402 61.9827C29.4305 61.8151 29.0583 61.5676 28.7454 61.2546C28.4324 60.9417 28.1849 60.5695 28.0173 60.1598C27.8497 59.7502 27.7653 59.3113 27.7692 58.8687C27.773 58.4261 27.865 57.9887 28.0397 57.582C28.2144 57.1753 28.4683 56.8075 28.7867 56.5L45.2867 40L28.7867 23.5C28.1795 22.8713 27.8435 22.0293 27.8511 21.1553C27.8587 20.2813 28.2092 19.4453 28.8273 18.8273C29.4453 18.2092 30.2813 17.8587 31.1553 17.8511C32.0293 17.8435 32.8713 18.1795 33.5 18.7867L52.3567 37.6433Z"
                fill="#5D6065"
              />
            </g>
            <defs>
              <clipPath id="clip0_1298_967">
                <rect
                  width="80"
                  height="80"
                  fill="white"
                  transform="matrix(0 -1 1 0 0 80)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <swiper-container
          :loop="true"
          :breakpoints="{
            200: {
              slidesPerView: 1,
            },
            1100: {
              slidesPerView: 2,
            },
            1400: {
              slidesPerView: 3,
            },
          }"
          :navigation="
            blogs.length > 1
              ? {
                  prevEl: '.swiper-prev',
                  nextEl: '.swiper-next',
                }
              : false
          "
          @swiperprogress="onProgress"
          @swiperslidechange="onSlideChange"
          class="swiper-div"
        >
          <swiper-slide
            v-for="(item, index) in blogs"
            :key="index"
            class="swiper-slide"
          >
            <div
              @click="$router.push('/blog/' + item._id)"
              :style="{ backgroundImage: `url(${item.imageCover})` }"
              class="swiper-slide-card"
            >
              <div>
                <p class="swiper-div-title">{{ item.title }}</p>
                <p class="swiper-div-sub-title">
                  <span
                    >{{ moment(item.createdAt).format("MMM DD, YYYY") }} |
                    {{ item.username }}</span
                  >
                </p>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </section>

    <section class="landlords-section">
      <div class="landlords-header">
        <div class="landlords-title">Landlords</div>
        <div class="landlords-subtitle">
          Most convenient way to manage properties
        </div>
      </div>
      <div class="landlords-svgs">
        <div class="landlords-svg1">
          <p>List and manage your compounds and tenants with ease.</p>
          <img :src="landlordPhone" alt="landlord Phone" />
        </div>
        <div class="landlords-svg2">
          <p>Flexible in-app payment systems to manage your rent.</p>
        </div>
      </div>
      <div class="landlords-download">
        <p>Download the User App</p>
        <div class="landlords-download-btn">
          <a
            href="https://apps.apple.com/us/app/habeep/id6450388013"
            target="_blank"
            class="landlords-links"
          >
            <img src="../../assets/icons/download-app-apple.svg" alt="" />
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=org.habeep"
            target="_blank"
            class="landlords-links"
          >
            <img src="../../assets/icons/download-app-google.svg" alt="" />
          </a>
        </div>
      </div>
    </section>

    <section class="testimonial-section">
      <div class="testimonial-swiper-prev">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1298_971)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M27.6433 42.3567C27.0184 41.7316 26.6674 40.8839 26.6674 40C26.6674 39.1161 27.0184 38.2684 27.6433 37.6433L46.5 18.7867C46.8075 18.4683 47.1753 18.2144 47.582 18.0397C47.9887 17.865 48.4261 17.773 48.8687 17.7692C49.3113 17.7653 49.7502 17.8497 50.1598 18.0173C50.5695 18.1849 50.9417 18.4324 51.2546 18.7454C51.5676 19.0583 51.8151 19.4305 51.9827 19.8402C52.1503 20.2498 52.2347 20.6887 52.2308 21.1313C52.227 21.5739 52.135 22.0113 51.9603 22.418C51.7856 22.8247 51.5317 23.1925 51.2133 23.5L34.7133 40L51.2133 56.5C51.8205 57.1287 52.1565 57.9707 52.1489 58.8447C52.1413 59.7187 51.7908 60.5547 51.1727 61.1727C50.5547 61.7908 49.7187 62.1413 48.8447 62.1489C47.9707 62.1565 47.1287 61.8205 46.5 61.2133L27.6433 42.3567Z"
              fill="#5D6065"
            />
          </g>
          <defs>
            <clipPath id="clip0_1298_971">
              <rect
                width="80"
                height="80"
                fill="white"
                transform="matrix(0 1 -1 0 80 0)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="testimonial-swiper-next">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1298_967)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M52.3567 37.6433C52.9816 38.2684 53.3326 39.1161 53.3326 40C53.3326 40.8839 52.9816 41.7316 52.3567 42.3567L33.5 61.2133C33.1925 61.5317 32.8247 61.7856 32.418 61.9603C32.0113 62.135 31.5739 62.227 31.1313 62.2308C30.6887 62.2347 30.2498 62.1503 29.8402 61.9827C29.4305 61.8151 29.0583 61.5676 28.7454 61.2546C28.4324 60.9417 28.1849 60.5695 28.0173 60.1598C27.8497 59.7502 27.7653 59.3113 27.7692 58.8687C27.773 58.4261 27.865 57.9887 28.0397 57.582C28.2144 57.1753 28.4683 56.8075 28.7867 56.5L45.2867 40L28.7867 23.5C28.1795 22.8713 27.8435 22.0293 27.8511 21.1553C27.8587 20.2813 28.2092 19.4453 28.8273 18.8273C29.4453 18.2092 30.2813 17.8587 31.1553 17.8511C32.0293 17.8435 32.8713 18.1795 33.5 18.7867L52.3567 37.6433Z"
              fill="#5D6065"
            />
          </g>
          <defs>
            <clipPath id="clip0_1298_967">
              <rect
                width="80"
                height="80"
                fill="white"
                transform="matrix(0 -1 1 0 0 80)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>

      <swiper-container
        :loop="true"
        :breakpoints="{
          768: {
            slidesPerView: 1,
          },
        }"
        :navigation="{
          prevEl: '.testimonial-swiper-prev',
          nextEl: '.testimonial-swiper-next',
        }"
        @swiperprogress="onProgress"
        @swiperslidechange="onSlideChange"
        class="testimonial-div"
      >
        <swiper-slide
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="testimonial-slide"
        >
          <div class="testimonial-slide-img">
            <img :src="testimonial.img" alt="testimonial image" />
          </div>
          <div class="testimonial-header">
            <p class="testimonial-title">Testimonials</p>
            <div>
              <p class="testimonial-comment">{{ testimonial.comment }}</p>
              <p class="testimonial-name">~ {{ testimonial.Name }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
    </section>

    <section class="footer-section">
      <div class="footer-user-app">
        <div class="footer-user-app-div">
          <div>
            <p>Download the Landlord App</p>
            <p>
              Download the Habeep app from the Play Store/App Store to find
              properties, save for rent, and access rent loans easily.
            </p>
          </div>
          <div class="footer-download-app">
            <a
              href="https://apps.apple.com/us/app/habeep/id6450388013"
              target="_blank"
              class="landlords-links"
            >
              <img src="../../assets/icons/download-app-apple.svg" alt="" />
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=org.habeep.landlords"
              target="_blank"
              class="landlords-links"
            >
              <img src="../../assets/icons/download-app-google.svg" alt="" />
            </a>
          </div>
        </div>

        <img src="../../assets/images/footerPhone.png" alt="" />
      </div>
      <div class="footer-habeep">
        <div @click="$router.push('/home')" class="footer-habeep-home">
          <!-- <img src="../../assets/images/footerHabeep.svg" alt="" /> -->
        </div>
        <div class="footer-habeep-divs1">
          <div>
            <a href="tel:+2347088188807" target="_blank">+234 708 818 8807</a>
          </div>
          <div>
            <a href="mailto:support@habeep.org" target="_blank"
              >support@habeep.org</a
            >
          </div>
        </div>
        <div class="footer-habeep-divs2">
          <div>
            <a
              href="http://www.instagram.com/habeep_realest"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="143"
                height="24"
                viewBox="0 0 143 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 7C16 6.73478 16.1054 6.48043 16.2929 6.29289C16.4804 6.10536 16.7348 6 17 6C17.2652 6 17.5196 6.10536 17.7071 6.29289C17.8946 6.48043 18 6.73478 18 7C18 7.26522 17.8946 7.51957 17.7071 7.70711C17.5196 7.89464 17.2652 8 17 8C16.7348 8 16.4804 7.89464 16.2929 7.70711C16.1054 7.51957 16 7.26522 16 7Z"
                  fill="#666666"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 7.25C10.7402 7.25 9.53204 7.75045 8.64124 8.64124C7.75045 9.53204 7.25 10.7402 7.25 12C7.25 13.2598 7.75045 14.468 8.64124 15.3588C9.53204 16.2496 10.7402 16.75 12 16.75C13.2598 16.75 14.468 16.2496 15.3588 15.3588C16.2496 14.468 16.75 13.2598 16.75 12C16.75 10.7402 16.2496 9.53204 15.3588 8.64124C14.468 7.75045 13.2598 7.25 12 7.25ZM8.75 12C8.75 11.138 9.09241 10.3114 9.7019 9.7019C10.3114 9.09241 11.138 8.75 12 8.75C12.862 8.75 13.6886 9.09241 14.2981 9.7019C14.9076 10.3114 15.25 11.138 15.25 12C15.25 12.862 14.9076 13.6886 14.2981 14.2981C13.6886 14.9076 12.862 15.25 12 15.25C11.138 15.25 10.3114 14.9076 9.7019 14.2981C9.09241 13.6886 8.75 12.862 8.75 12Z"
                  fill="#666666"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.258 2.83267C13.7634 2.4451 10.2366 2.4451 6.74201 2.83267C4.73001 3.05767 3.10501 4.64267 2.86901 6.66467C2.45512 10.2093 2.45512 13.79 2.86901 17.3347C3.10501 19.3567 4.72901 20.9417 6.74201 21.1667C10.2367 21.5534 13.7633 21.5534 17.258 21.1667C19.27 20.9417 20.895 19.3567 21.131 17.3347C21.5449 13.79 21.5449 10.2093 21.131 6.66467C20.895 4.64267 19.271 3.05767 17.258 2.83267ZM6.90801 4.32267C10.2923 3.94738 13.7077 3.94738 17.092 4.32267C18.422 4.47267 19.487 5.52167 19.642 6.83967C20.0432 10.268 20.0432 13.7314 19.642 17.1597C19.5618 17.8047 19.2666 18.4039 18.8039 18.8604C18.3412 19.3169 17.7381 19.6042 17.092 19.6757C13.7077 20.051 10.2923 20.051 6.90801 19.6757C6.26195 19.6042 5.65886 19.3169 5.19617 18.8604C4.73347 18.4039 4.43819 17.8047 4.35801 17.1597C3.95687 13.7314 3.95687 10.268 4.35801 6.83967C4.43819 6.19463 4.73347 5.59545 5.19617 5.13893C5.65886 4.6824 6.26195 4.39418 6.90801 4.32267Z"
                  fill="#666666"
                />
                <path
                  d="M40.296 11.14C40.904 11.748 41.208 12.676 41.208 13.956V18.5H39.896V14.036C39.896 13.204 39.704 12.564 39.32 12.116C38.936 11.668 38.376 11.444 37.672 11.444C36.904 11.444 36.312 11.716 35.864 12.244C35.416 12.788 35.208 13.508 35.208 14.42V18.5H33.896V7.3H35.208V11.684C35.464 11.268 35.816 10.916 36.264 10.644C36.712 10.388 37.256 10.244 37.896 10.244C38.888 10.244 39.688 10.548 40.296 11.14ZM50.5124 17.3V18.5H49.7924C49.2644 18.5 48.8964 18.404 48.6724 18.18C48.4484 17.972 48.3204 17.652 48.3204 17.236C47.6804 18.148 46.7684 18.596 45.5844 18.596C44.6724 18.596 43.9364 18.388 43.3924 17.956C42.8484 17.54 42.5764 16.948 42.5764 16.212C42.5764 15.396 42.8484 14.772 43.4084 14.324C43.9684 13.892 44.7844 13.668 45.8564 13.668H48.2564V13.108C48.2564 12.58 48.0644 12.164 47.7124 11.86C47.3604 11.572 46.8644 11.412 46.2244 11.412C45.6484 11.412 45.1844 11.54 44.8164 11.796C44.4484 12.052 44.2244 12.372 44.1444 12.788H42.8324C42.9284 11.988 43.2804 11.364 43.8884 10.916C44.4964 10.468 45.2964 10.244 46.2884 10.244C47.3284 10.244 48.1284 10.5 48.7044 11.012C49.2804 11.524 49.5684 12.244 49.5684 13.188V16.708C49.5684 17.108 49.7444 17.3 50.1124 17.3H50.5124ZM48.2564 14.772H45.7284C44.5124 14.772 43.9044 15.236 43.9044 16.132C43.9044 16.548 44.0644 16.868 44.3844 17.108C44.7044 17.364 45.1364 17.476 45.6804 17.476C46.4804 17.476 47.1044 17.268 47.5684 16.852C48.0164 16.436 48.2564 15.876 48.2564 15.172V14.772ZM57.649 10.74C58.241 11.076 58.705 11.556 59.041 12.18C59.377 12.82 59.553 13.556 59.553 14.42C59.553 15.252 59.377 15.972 59.041 16.596C58.705 17.236 58.241 17.716 57.649 18.068C57.041 18.42 56.369 18.596 55.633 18.596C54.961 18.596 54.401 18.484 53.937 18.244C53.457 18.004 53.089 17.668 52.833 17.252L52.657 18.5H51.521V7.3H52.833V11.652C53.505 10.724 54.449 10.244 55.633 10.244C56.385 10.244 57.057 10.42 57.649 10.74ZM57.457 16.596C57.953 16.036 58.209 15.316 58.209 14.42C58.209 13.54 57.953 12.82 57.457 12.26C56.961 11.7 56.305 11.412 55.505 11.412C54.977 11.412 54.513 11.54 54.097 11.796C53.681 12.052 53.377 12.404 53.153 12.852C52.929 13.3 52.817 13.812 52.817 14.388C52.817 14.98 52.929 15.508 53.153 15.972C53.377 16.436 53.681 16.788 54.097 17.044C54.513 17.3 54.977 17.428 55.505 17.428C56.305 17.428 56.961 17.156 57.457 16.596ZM61.2443 12.228C61.5643 11.604 62.0283 11.124 62.6203 10.772C63.1963 10.42 63.8683 10.244 64.6363 10.244C65.3723 10.244 66.0443 10.404 66.6203 10.708C67.1963 11.028 67.6443 11.476 67.9803 12.052C68.3003 12.644 68.4763 13.332 68.5083 14.116C68.5083 14.244 68.4923 14.42 68.4763 14.676H62.1403V14.788C62.1562 15.588 62.3963 16.228 62.8763 16.708C63.3403 17.188 63.9483 17.428 64.7163 17.428C65.2923 17.428 65.7883 17.284 66.2043 16.996C66.6203 16.708 66.8923 16.292 67.0363 15.764H68.3643C68.2043 16.596 67.8043 17.284 67.1643 17.812C66.5243 18.34 65.7403 18.596 64.8123 18.596C63.9963 18.596 63.2923 18.436 62.6843 18.084C62.0763 17.732 61.5963 17.252 61.2603 16.612C60.9243 15.972 60.7643 15.252 60.7643 14.42C60.7643 13.588 60.9243 12.868 61.2443 12.228ZM67.1483 13.588C67.0843 12.9 66.8123 12.356 66.3643 11.972C65.9163 11.588 65.3403 11.396 64.6523 11.396C64.0283 11.396 63.4843 11.604 63.0203 12.004C62.5403 12.42 62.2843 12.948 62.2203 13.588H67.1483ZM70.1974 12.228C70.5174 11.604 70.9814 11.124 71.5734 10.772C72.1494 10.42 72.8214 10.244 73.5894 10.244C74.3254 10.244 74.9974 10.404 75.5734 10.708C76.1494 11.028 76.5974 11.476 76.9334 12.052C77.2534 12.644 77.4294 13.332 77.4614 14.116C77.4614 14.244 77.4454 14.42 77.4294 14.676H71.0934V14.788C71.1094 15.588 71.3494 16.228 71.8294 16.708C72.2934 17.188 72.9014 17.428 73.6694 17.428C74.2454 17.428 74.7414 17.284 75.1574 16.996C75.5734 16.708 75.8454 16.292 75.9894 15.764H77.3174C77.1574 16.596 76.7574 17.284 76.1174 17.812C75.4774 18.34 74.6934 18.596 73.7654 18.596C72.9494 18.596 72.2454 18.436 71.6374 18.084C71.0294 17.732 70.5494 17.252 70.2134 16.612C69.8774 15.972 69.7174 15.252 69.7174 14.42C69.7174 13.588 69.8774 12.868 70.1974 12.228ZM76.1014 13.588C76.0374 12.9 75.7654 12.356 75.3174 11.972C74.8694 11.588 74.2934 11.396 73.6054 11.396C72.9814 11.396 72.4374 11.604 71.9734 12.004C71.4934 12.42 71.2374 12.948 71.1734 13.588H76.1014ZM85.0865 10.74C85.6785 11.076 86.1425 11.556 86.4785 12.18C86.8145 12.82 86.9905 13.556 86.9905 14.42C86.9905 15.252 86.8145 15.972 86.4785 16.596C86.1425 17.236 85.6785 17.716 85.0865 18.068C84.4785 18.42 83.8065 18.596 83.0705 18.596C82.3985 18.596 81.8385 18.484 81.3745 18.244C80.8945 18.004 80.5265 17.668 80.2705 17.252V21.7H78.9585V10.34H80.0945L80.2705 11.652C80.9425 10.724 81.8865 10.244 83.0705 10.244C83.8225 10.244 84.4945 10.42 85.0865 10.74ZM84.8945 16.596C85.3905 16.036 85.6465 15.316 85.6465 14.42C85.6465 13.54 85.3905 12.82 84.8945 12.26C84.3985 11.7 83.7425 11.412 82.9425 11.412C82.4145 11.412 81.9505 11.54 81.5345 11.796C81.1185 12.052 80.8145 12.404 80.5905 12.852C80.3665 13.3 80.2545 13.812 80.2545 14.388C80.2545 14.98 80.3665 15.508 80.5905 15.972C80.8145 16.436 81.1185 16.788 81.5345 17.044C81.9505 17.3 82.4145 17.428 82.9425 17.428C83.7425 17.428 84.3985 17.156 84.8945 16.596ZM87.4284 19.908V18.596H93.5884V19.908H87.4284ZM99.5713 10.34V11.62H98.9153C98.1313 11.62 97.5713 11.892 97.2353 12.404C96.8993 12.932 96.7393 13.572 96.7393 14.34V18.5H95.4273V10.34H96.5633L96.7393 11.572C96.9633 11.204 97.2673 10.9 97.6513 10.676C98.0193 10.452 98.5312 10.34 99.2033 10.34H99.5713ZM100.494 12.228C100.814 11.604 101.278 11.124 101.87 10.772C102.446 10.42 103.118 10.244 103.886 10.244C104.622 10.244 105.294 10.404 105.87 10.708C106.446 11.028 106.894 11.476 107.23 12.052C107.55 12.644 107.726 13.332 107.758 14.116C107.758 14.244 107.742 14.42 107.726 14.676H101.39V14.788C101.406 15.588 101.646 16.228 102.126 16.708C102.59 17.188 103.198 17.428 103.966 17.428C104.542 17.428 105.038 17.284 105.454 16.996C105.87 16.708 106.142 16.292 106.286 15.764H107.614C107.454 16.596 107.054 17.284 106.414 17.812C105.774 18.34 104.99 18.596 104.062 18.596C103.246 18.596 102.542 18.436 101.934 18.084C101.326 17.732 100.846 17.252 100.51 16.612C100.174 15.972 100.014 15.252 100.014 14.42C100.014 13.588 100.174 12.868 100.494 12.228ZM106.398 13.588C106.334 12.9 106.062 12.356 105.614 11.972C105.166 11.588 104.59 11.396 103.902 11.396C103.278 11.396 102.734 11.604 102.27 12.004C101.79 12.42 101.534 12.948 101.47 13.588H106.398ZM116.887 17.3V18.5H116.167C115.639 18.5 115.271 18.404 115.047 18.18C114.823 17.972 114.695 17.652 114.695 17.236C114.055 18.148 113.143 18.596 111.959 18.596C111.047 18.596 110.311 18.388 109.767 17.956C109.223 17.54 108.951 16.948 108.951 16.212C108.951 15.396 109.223 14.772 109.783 14.324C110.343 13.892 111.159 13.668 112.231 13.668H114.631V13.108C114.631 12.58 114.439 12.164 114.087 11.86C113.735 11.572 113.239 11.412 112.599 11.412C112.023 11.412 111.559 11.54 111.191 11.796C110.823 12.052 110.599 12.372 110.519 12.788H109.207C109.303 11.988 109.655 11.364 110.263 10.916C110.871 10.468 111.671 10.244 112.663 10.244C113.703 10.244 114.503 10.5 115.079 11.012C115.655 11.524 115.943 12.244 115.943 13.188V16.708C115.943 17.108 116.119 17.3 116.487 17.3H116.887ZM114.631 14.772H112.103C110.887 14.772 110.279 15.236 110.279 16.132C110.279 16.548 110.439 16.868 110.759 17.108C111.079 17.364 111.511 17.476 112.055 17.476C112.855 17.476 113.479 17.268 113.943 16.852C114.391 16.436 114.631 15.876 114.631 15.172V14.772ZM117.896 7.3H119.208V18.5H117.896V7.3ZM121.197 12.228C121.517 11.604 121.981 11.124 122.573 10.772C123.149 10.42 123.821 10.244 124.589 10.244C125.325 10.244 125.997 10.404 126.573 10.708C127.149 11.028 127.597 11.476 127.933 12.052C128.253 12.644 128.429 13.332 128.461 14.116C128.461 14.244 128.445 14.42 128.429 14.676H122.093V14.788C122.109 15.588 122.349 16.228 122.829 16.708C123.293 17.188 123.901 17.428 124.669 17.428C125.245 17.428 125.741 17.284 126.157 16.996C126.573 16.708 126.845 16.292 126.989 15.764H128.317C128.157 16.596 127.757 17.284 127.117 17.812C126.477 18.34 125.693 18.596 124.765 18.596C123.949 18.596 123.245 18.436 122.637 18.084C122.029 17.732 121.549 17.252 121.213 16.612C120.877 15.972 120.717 15.252 120.717 14.42C120.717 13.588 120.877 12.868 121.197 12.228ZM127.101 13.588C127.037 12.9 126.765 12.356 126.317 11.972C125.869 11.588 125.293 11.396 124.605 11.396C123.981 11.396 123.437 11.604 122.973 12.004C122.493 12.42 122.237 12.948 122.173 13.588H127.101ZM130.951 15.812C130.967 16.308 131.175 16.708 131.591 17.012C132.007 17.332 132.535 17.476 133.191 17.476C133.767 17.476 134.231 17.364 134.583 17.14C134.935 16.916 135.127 16.612 135.127 16.228C135.127 15.908 135.031 15.668 134.871 15.492C134.695 15.332 134.471 15.204 134.199 15.14C133.927 15.076 133.543 15.012 133.047 14.948C132.343 14.868 131.767 14.756 131.319 14.612C130.871 14.484 130.503 14.26 130.231 13.956C129.943 13.652 129.815 13.236 129.815 12.692C129.815 12.212 129.943 11.796 130.215 11.412C130.487 11.044 130.855 10.756 131.335 10.548C131.799 10.34 132.327 10.228 132.919 10.228C133.879 10.228 134.647 10.452 135.255 10.9C135.863 11.348 136.199 11.988 136.263 12.82H134.951C134.887 12.404 134.679 12.052 134.327 11.764C133.959 11.492 133.511 11.348 132.967 11.348C132.407 11.348 131.959 11.476 131.623 11.7C131.271 11.924 131.111 12.228 131.111 12.596C131.111 12.884 131.191 13.092 131.351 13.236C131.511 13.396 131.703 13.492 131.959 13.54C132.215 13.604 132.599 13.652 133.111 13.716C133.815 13.812 134.407 13.924 134.871 14.068C135.335 14.228 135.703 14.468 135.991 14.788C136.279 15.124 136.423 15.572 136.423 16.132C136.423 16.628 136.279 17.06 135.991 17.428C135.703 17.812 135.303 18.1 134.823 18.292C134.327 18.5 133.783 18.596 133.191 18.596C132.119 18.596 131.255 18.356 130.615 17.86C129.975 17.38 129.639 16.692 129.639 15.812H130.951ZM138.456 11.54H136.984V10.34H138.456V8.052H139.768V10.34H141.832V11.54H139.768V16.356C139.768 16.708 139.832 16.948 139.96 17.092C140.088 17.236 140.328 17.3 140.664 17.3H142.088V18.5H140.584C139.816 18.5 139.256 18.34 138.936 17.988C138.616 17.652 138.456 17.108 138.456 16.372V11.54Z"
                  fill="#666666"
                />
              </svg>
            </a>
          </div>
          <div>
            <a
              href="https://maps.google.com/?q=13b+Nsefik+Eyo+Layout,+Off+Marian+road,+Calabar,+Cross+Rivers+State"
              target="_blank"
              rel="noopener noreferrer"
            >
              13b Nsefik Eyo Layout, Off Marian road, Calabar, Cross Rivers
              State
            </a>
          </div>
        </div>
      </div>
      <div class="footer-copy-write">
        <span>&#x00A9;</span>
        <span style="font-size: large">{{ getCurrentYear() }} </span> Habeep
      </div>
    </section>
  </div>
</template>

<style scoped>
/*  Import Ubuntu font */
@import url("https://fonts.googleapis.com/css2?family=Ubuntu&display=swap");

@media screen and (min-width: 1400px) {
  .about-sections {
    width: 1245px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
  }

  .hero-section {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 3rem 0rem;
    gap: 3rem;
  }

  .intro-text {
    width: 1194px;
    height: 219px;
    font-family: Aeonik;
    font-size: 61.04px;
    font-weight: 700;
    line-height: 73.25px;
    text-align: center;
    color: black;
  }

  .hero-video {
    width: 100%;
    max-width: 1245px;
    height: 473px;
    border-radius: 30px;
    background: rgba(217, 217, 217, 1);
    overflow: hidden;
    /* object-fit: inherit */
  }

  .discover-section {
    width: 100%;
    height: auto;
    margin: 3rem 0rem;
    gap: 2rem;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }

  .discover-header {
    width: 1020px;
    height: 128px;
  }

  .discover-header .discover-title {
    width: 250px;
    height: 73px;
    font-family: Aeonik;
    font-size: 61.04px;
    font-weight: 700;
    line-height: 73.25px;
    text-align: left;
  }

  .discover-header .discover-subtitle {
    width: 1020px;
    height: 128px;
    font-family: Aeonik;
    font-size: 39.06px;
    font-weight: 500;
    line-height: 46.87px;
    text-align: left;
    color: #b1b2b6;
  }

  .discover-svg {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  .discover-svg1,
  .discover-svg2 {
    width: 600px;
    height: 677px;
    border-radius: 30px;
  }

  .tenants-section {
    width: 100%;
    height: auto;
    margin: 3rem 0rem;
    gap: 2rem;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }

  .tenants-header {
    width: 681px;
    height: 128px;
    gap: 8px;
    opacity: 0px;
  }

  .tenants-header .tenants-title {
    width: 228px;
    height: 73px;
    font-family: Aeonik;
    font-size: 61.04px;
    font-weight: 700;
    line-height: 73.25px;
    text-align: left;
  }

  .tenants-header .tenants-subtitle {
    width: 681px;
    height: 47px;

    font-family: Aeonik;
    font-size: 39.06px;
    font-weight: 500;
    line-height: 46.87px;
    text-align: left;
    color: #b1b2b6;
  }

  .tenants-svg {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  .tenants-svg .tenants-svg1 {
    width: 553px;
    height: 595px;
    border-radius: 30px;
  }

  .tenants-svg .tenants-svg2 {
    width: 667px;
    height: 595px;
    border-radius: 30px;
  }

  .tenants-benefits {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .tenants-benefits-list {
    width: 100%;
    max-width: 1245px;
    height: 423px;
    gap: 1rem;
    border-radius: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-image: url("../../assets/icons/tenant-bg.png");
  }

  .tenants-benefits-list span {
    color: #dfa76c;
    font-family: Aeonik;
    font-size: 31.25px;
    font-weight: 700;
    line-height: 37.5px;
    text-align: left;
  }

  .benefit1 {
    width: 360px;
    height: 100%;
    gap: 3rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    color: white;
  }

  .benefit1 p {
    width: 350px;
    height: 138px;
    font-family: Aeonik;
    font-size: 38px;
    font-weight: 700;
    line-height: 45.6px;
    text-align: left;
  }

  .benefit2 {
    width: 360px;
    height: 100%;
    /* gap: 3rem; */
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: column;
    color: white;
  }

  .benefit2 p {
    width: 266px;
    height: 76px;
    font-family: Aeonik;
    font-size: 31.25px;
    font-weight: 700;
    line-height: 37.5px;
    text-align: left;
    color: white;
  }

  .benefit3 {
    width: 217px;
    height: 114px;
  }

  .benefit3 p {
    font-family: Aeonik;
    font-size: 31.25px;
    font-weight: 700;
    line-height: 37.5px;
    text-align: center;
    color: white;
  }

  .agent-section {
    width: 100%;
    height: auto;
    margin: 3rem 0rem;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    gap: 2rem;
  }

  .agent-header {
    width: 661x;
    height: 128px;
  }

  .agent-header .agent-title {
    width: 205px;
    height: 73px;
    font-family: Aeonik;
    font-size: 61.04px;
    font-weight: 700;
    line-height: 73.25px;
    text-align: left;
  }

  .agent-header .agent-subtitle {
    width: 661px;
    height: 47px;
    font-family: Aeonik;
    font-size: 39.06px;
    font-weight: 500;
    line-height: 46.87px;
    text-align: left;
    color: #b1b2b6;
  }

  .agent-svg {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: row;
    gap: 3rem;
  }

  .agent-svg-text {
    width: 446px;
    height: 681px;
    border-radius: 30px;
    background-image: url("../../assets/images/agent-bg1.png");
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .agent-svg-text p {
    width: 327px;
    height: 322px;
    font-family: Aeonik;
    font-size: 38px;
    font-weight: 500;
    line-height: 45.6px;
    text-align: left;
    color: white;
  }

  .agent-svg-phone {
    width: 834px;
    height: 681px;
    border-radius: 30px;
    background-image: url("../../assets/images/agent-bg2.png");
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .agent-svg-phone p {
    width: 463px;
    height: 92px;
    font-family: Aeonik;
    font-size: 38px;
    font-weight: 700;
    line-height: 45.6px;
    position: relative;
    left: -5rem;
  }

  .agent-svg-phone p span {
    font-family: Aeonik;
    font-size: 38px;
    font-weight: 700;
    line-height: 45.6px;
    text-align: left;
    color: #182389;
  }

  .agent-svg-phone img {
    position: relative;
    bottom: -4.1rem;
  }

  .blog-section {
    width: 100%;
    height: auto;
    margin: 3rem 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;
  }

  .blog-container {
    width: 1245px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;
  }

  .blog-header {
    width: Hug (818px) px;
    height: Hug (128px) px;
    gap: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .blog-header .blog-title {
    width: 162px;
    height: 73px;
    font-family: Aeonik;
    font-size: 61.04px;
    font-weight: 700;
    line-height: 73.25px;
    text-align: left;
    color: black;
  }

  .blog-header .blog-subtitle {
    width: 818px;
    height: 47px;
    gap: 0px;
    opacity: 0px;
    font-family: Aeonik;
    font-size: 39.06px;
    font-weight: 500;
    line-height: 46.87px;
    text-align: left;
    color: #b1b2b6;
  }

  .swiper-container-wrapper {
    position: relative;
    width: 1245px;
    height: 399px;
    gap: 7rem;
    opacity: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-prev,
  .swiper-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
  }

  .swiper-prev {
    left: -7rem;
  }

  .swiper-next {
    right: -6rem;
  }

  .swiper-div {
    width: 1320px;
    height: 399px;
    gap: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide-card {
    max-width: 422px;
    width: 100%;
    height: 399px;
    border-radius: 30px;
    border-color: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: rgb(255, 255, 255) 1px -70px 40px -18px inset;
    background-size: cover;
    background-position: center;
    cursor: pointer;
  }

  .swiper-slide-card div {
    max-width: 422px;
    width: 100%;
    position: absolute;
    bottom: 0px;

    gap: 0px;
    opacity: 1;
    display: flex;
    flex-flow: nowrap column;
    background: rgba(0, 0, 0, 0.514);
    padding: 10px 10px 10px 15px;
    border-radius: 0px 0px 30px 30px;
  }

  .swiper-div-title {
    width: 100%;
    height: auto;
    font-family: Ubuntu;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    text-align: left;
    color: #ffffff;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }

  .swiper-div-sub-title {
    width: 100%;
    height: auto;
    font-family: Ubuntu;
    font-size: 14px;
    font-weight: 400;
    line-height: 26px;
    text-align: left;
    color: #ffffffbe;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }

  .landlords-section {
    width: 100%;
    height: auto;
    margin: 3rem 0rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 4rem;
  }

  .landlords-header {
    width: 771px;
    height: 128px;
    gap: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }

  .landlords-header .landlords-title {
    width: 282px;
    height: 73px;
    font-family: Aeonik;
    font-size: 61.04px;
    font-weight: 700;
    line-height: 73.25px;
    text-align: left;
  }

  .landlords-subtitle {
    width: 771px;
    height: 47px;
    font-family: Aeonik;
    font-size: 39.06px;
    font-weight: 500;
    line-height: 46.87px;
    text-align: left;
    color: #b1b2b6;
  }

  .landlords-svgs {
    width: 100%;
    max-width: 1315px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    gap: 2rem;
  }

  .landlords-svgs .landlords-svg1 {
    width: 789px;
    height: 677px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url("../../assets/images/landlordbg.png");
  }

  .landlords-svgs .landlords-svg1 p {
    width: 570px;
    height: 138px;
    font-family: Aeonik;
    font-size: 38px;
    font-weight: 700;
    line-height: 45.6px;
    text-align: left;
    color: white;
  }

  .landlords-svg1 img {
    width: 100%;
    max-width: 375px;
    height: 412px;
    /* border-radius: 40px; */
    border: 0px 0px 0px 0px;
    position: relative;
    bottom: -4rem;
  }

  .landlords-svgs .landlords-svg2 {
    width: 482px;
    height: 677px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../../assets/images/landlord.png");
  }

  .landlords-svg2 p {
    color: white;
    width: 360px;
    height: 138px;
    font-family: Aeonik;
    font-size: 38px;
    font-weight: 500;
    line-height: 45.6px;
    text-align: left;
  }

  .landlords-download {
    width: 100%;
    max-width: 1315px;
    height: 273px;
    padding: 0px 85px;
    gap: 0px;
    border-radius: 30px;
    opacity: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    background-size: cover;
    background-image: url("../../assets/images/landlordGray.png");
  }

  .landlords-download p {
    width: 505px;
    height: 46px;
    font-family: Aeonik;
    font-size: 38px;
    font-weight: 700;
    line-height: 45.6px;
    text-align: left;
  }

  .landlords-download-btn {
    width: 534px;
    height: 72.22px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
  }

  .testimonial-section {
    width: 100%;
    height: auto;
    margin: 6rem 0rem;
    display: flex;
    justify-content: center;
    align-content: center;
    position: relative;
  }

  .testimonial-div {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .testimonial-slide {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .testimonial-slide-img {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .testimonial-slide img {
    width: 600px;
    height: 552px;
    border-radius: 30px;
    object-fit: cover;

    display: flex;
    justify-content: center;
    align-content: center;
  }

  .testimonial-header {
    width: 536px;
    /* height: 256px; */
    gap: 47px;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    flex-direction: column;
  }

  .testimonial-header div {
    width: 536px;
    height: 144px;
    color: rgba(0, 0, 0, 0.6);
    /* background: #000; */
  }

  .testimonial-title {
    width: 536px;
    height: 65px;
    font-family: Aeonik;
    font-size: 61px;
    font-weight: 700;
    line-height: 55px;
    text-align: left;
  }

  .testimonial-comment {
    font-family: Aeonik;
    font-size: 22px;
    font-weight: 400;
    line-height: 36px;
    text-align: left;
  }

  .testimonial-name {
    font-family: Aeonik;
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    text-align: left;
    margin-top: 2rem;
  }

  .testimonial-container
    .testimonial-swiper-next
    .testimonial-container
    .testimonial-swiper-prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
  }

  .testimonial-container,
  .testimonial-swiper-next svg {
    position: absolute;
    right: -4rem;
    width: 60px;
    height: 60px;
    bottom: 16rem;
  }

  .testimonial-container,
  .testimonial-swiper-prev svg {
    position: absolute;
    left: -5rem;
    width: 60px;
    height: 60px;
    bottom: 16rem;
  }

  .footer-section {
    width: 100%;
    height: auto;
    margin: 6rem 0rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 5rem;
  }

  .footer-user-app {
    width: 100%;
    max-width: 1328px;
    height: 568px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("../../assets/images/footerBg.png");
    color: white;
    border-radius: 30px;
  }

  .footer-user-app .footer-user-app-div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;
    width: 530px;
    height: auto;
    text-align: center;
    /* background: #000; */
  }

  .footer-user-app .footer-user-app-div div:nth-child(1) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .footer-user-app .footer-download-app {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .footer-user-app div p:nth-child(1) {
    width: 530px;
    height: 46px;
    font-family: Aeonik;
    font-size: 38px;
    font-weight: 700;
    line-height: 45.6px;
    text-align: center;
  }

  .footer-user-app div p:nth-child(2) {
    width: 530px;
    height: 66px;
    font-family: Aeonik;
    font-size: 25px;
    font-weight: 500;
    line-height: 33.18px;
    text-align: center;
  }

  .footer-user-app img:nth-child(2) {
    width: 375px;
    height: 412px;
    /* border-radius: 40px; */
    border: 10px;
    position: relative;
    bottom: -4.9rem;
  }

  .footer-habeep {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0rem;
  }

  .footer-habeep div:nth-child(1) {
    width: 279px;
    height: 50px;
    background-position: left;
    background-repeat: no-repeat;
    background-image: url("../../assets/images/footerHabeep.svg");
    /* background: white */
  }

  .footer-habeep .footer-habeep-divs1 div,
  .footer-habeep .footer-habeep-divs2 div {
    width: 279px;
    height: 26px;
    border-radius: 5px;
    background: none;
    display: flex;
    gap: 10px;
    margin-top: 20px;
    font-family: Aeonik;
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
    text-align: left;
    color: rgba(102, 102, 102, 1);
  }

  .footer-habeep .footer-habeep-divs2 div:nth-child(2) {
    width: 402px;
  }

  .footer-copy-write {
    width: 200px;
    height: 24px;
    font-family: Aeonik;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
    color: rgba(27, 73, 255, 1);
  }
}

@media screen and (max-width: 1400px) {
  .about-sections {
    max-width: 1245px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .hero-section {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 3rem 0rem;
    gap: 3rem;
    padding: 0rem 3rem;
  }

  .intro-text {
    width: 100%;
    max-width: 1194px;
    height: 100%;
    max-height: 219px;
    font-size: 50px;
    font-weight: 700;
    line-height: 60px;
    text-align: center;
  }

  .hero-video {
    width: 100%;
    max-width: 1245px;
    max-height: 100%;
    height: 473px;
    border-radius: 30px;
    background: rgba(217, 217, 217, 1);
  }

  .discover-section {
    width: 100%;
    height: auto;
    margin: 5rem 0rem;
    gap: 0.5rem;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    padding: 0rem 3rem;
  }

  .discover-header {
    width: 100%;
    height: 100px;
  }

  .discover-title {
    width: 250px;
    max-height: 73px;
    font-family: Aeonik;
    font-size: 51px;
    font-weight: 700;
    line-height: 53px;
    text-align: left;
  }

  .discover-subtitle {
    max-width: 1020px;
    height: auto;
    font-family: Aeonik;
    font-size: 35px;
    font-weight: 500;
    line-height: 40px;
    text-align: left;
    color: #b1b2b6;
  }

  .discover-svg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }

  .discover-svg1,
  .discover-svg2 {
    width: 450px;
    height: 500px;
    border-radius: 30px;
  }

  .tenants-section {
    width: 100%;
    height: auto;
    margin: 5rem 0rem;
    gap: 2rem;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    padding: 0rem 3rem;
  }

  .tenants-header {
    width: 100%;
    max-width: 681px;
    max-height: 100px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 1rem;
  }

  .tenants-title {
    width: 228px;
    max-height: 73px;
    font-family: Aeonik;
    font-size: 50px;
    font-weight: 700;
    line-height: 60px;
    text-align: left;
  }

  .tenants-subtitle {
    max-width: 681px;
    width: 100%;
    max-height: 47px;
    height: 100%;
    font-family: Aeonik;
    font-size: 35px;
    font-weight: 500;
    line-height: 40px;
    text-align: left;
    color: #b1b2b6;
  }

  .tenants-svg {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }

  .tenants-svg1 {
    width: 450px;
    height: 470px;
    object-fit: contain;
    border-radius: 30px;
  }

  .tenants-svg2 {
    width: 450px;
    height: 470px;
    /* object-fit: contain; */
    border-radius: 30px;
  }

  .tenants-benefits {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .tenants-benefits-list {
    width: 100%;
    height: 423px;
    gap: 1rem;
    border-radius: 30px;
    padding: 0rem 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-image: url("../../assets/icons/tenant-bg.png");
  }

  .tenants-benefits-list span {
    color: #dfa76c;
    font-size: 32px;
    font-weight: 700;
    line-height: 35px;
  }

  .benefit1 {
    max-width: 300px;
    width: 100%;
    height: 100%;
    gap: 3rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    color: white;
  }

  .benefit1 p {
    width: 100%;
    max-width: 250px;
    height: 138px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 700;
    line-height: 45.6px;
    text-align: left;
  }

  .benefit2 {
    width: 300px;
    height: 100%;
    /* gap: 3rem; */
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: column;
    color: white;
  }

  .benefit2 p {
    max-width: 266px;
    height: 76px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 700;
    line-height: 37.5px;
    text-align: left;
    color: white;
  }

  .benefit3 {
    width: 217px;
    height: 114px;
  }

  .benefit3 p {
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 700;
    line-height: 30px;
    text-align: center;
    color: white;
  }

  .agent-section {
    width: 100%;
    height: auto;
    margin: 10rem 0rem;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    gap: 2rem;
    padding: 0rem 3rem;
  }

  .agent-header {
    width: 100%;
    max-width: 661x;
    height: auto;
    height: 100%;
  }

  .agent-title {
    width: 205px;
    height: 73px;
    font-family: Aeonik;
    font-size: 51px;
    font-weight: 700;
    line-height: 63px;
    text-align: left;
  }

  .agent-subtitle {
    max-width: 661px;
    width: 100%;
    max-height: 47px;
    font-family: Aeonik;
    font-size: 35px;
    font-weight: 500;
    line-height: 40px;
    text-align: left;
    color: #b1b2b6;
  }

  .agent-svg {
    display: flex;
    justify-content: space-around;
    align-content: center;
    gap: 3rem;
  }

  .agent-svg-text {
    width: 400px;
    height: 500px;
    border-radius: 30px;
    background-image: url("../../assets/images/agent-bg1.png");
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .agent-svg-text p {
    max-width: 280px;
    width: 100%;
    max-height: 300px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 500;
    line-height: 40px;
    text-align: left;
    color: white;
  }

  .agent-svg-phone {
    width: 500px;
    height: 500px;
    border-radius: 30px;
    background-image: url("../../assets/images/agent-bg2.png");
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .agent-svg-phone p {
    width: 360px;
    height: 92px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 700;
    line-height: 45px;
    position: relative;
    left: -2rem;
  }

  .agent-svg-phone p span {
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 700;
    line-height: 35px;
    text-align: left;
    color: #182389;
  }

  .agent-svg-phone img {
    position: relative;
    bottom: -5rem;
    width: 350px;
    height: 250px;
    object-fit: contain;
  }

  .blog-section {
    width: 100%;
    height: auto;
    margin: 3rem 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;
  }

  .blog-container {
    width: 1245px;
    /* width: 1245px; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;
  }

  .blog-header {
    width: 100%;
    max-width: 818px;
    height: 120px;
    gap: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .blog-title {
    width: 100%;
    max-width: 162px;
    max-height: 73px;
    height: 100%;
    font-family: Aeonik;
    font-size: 51px;
    font-weight: 700;
    line-height: 60px;
    text-align: center;
    color: black;
  }

  .blog-subtitle {
    width: 100%;
    /* max-width: 818px; */
    max-height: 47px;
    height: 100%;
    gap: 0px;
    opacity: 0px;
    font-family: Aeonik;
    font-size: 35px;
    font-weight: 500;
    line-height: 35px;
    text-align: center;
    color: #b1b2b6;
  }

  .swiper-container-wrapper {
    position: relative;
    width: 900px;
    height: 399px;
    gap: 7rem;
    opacity: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-prev,
  .swiper-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
  }

  .swiper-prev {
    left: -7rem;
  }

  .swiper-next {
    right: -6rem;
  }

  .swiper-div {
    width: 900px;
    height: 399px;
    gap: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide-card {
    width: 422px;
    height: 399px;
    border-radius: 30px 30px 0px 0px;
    border-color: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: rgb(255, 255, 255) 1px -70px 40px -18px inset;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    /* filter: brightness(0.8) */
  }

  .swiper-slide-card div {
    height: auto;
    position: absolute;
    bottom: 40px;
    width: 100%;
    max-width: 422px;
    gap: 0px;
    opacity: 1;
    display: flex;
    flex-flow: nowrap column;
    border-radius: 0 0 30px 30px;
    background: rgba(0, 0, 0, 0.514);
    padding: 10px 10px 10px 15px;
    bottom: 1px;
  }

  .swiper-div-title {
    width: 351px;
    height: auto;
    font-family: Ubuntu;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    text-align: left;
    color: #ffffff;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }

  .swiper-div-sub-title {
    width: 100%;
    height: auto;
    font-family: Ubuntu;
    font-size: 14px;
    font-weight: 400;
    line-height: 26px;
    text-align: left;
    color: #ffffffbe;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }

  .landlords-section {
    width: 100%;
    height: auto;
    margin: 5rem 0rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 4rem;
    padding: 0rem 3rem;
  }

  .landlords-header {
    width: 100%;
    max-width: 771px;
    height: 128px;
    gap: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }

  .landlords-header .landlords-title {
    width: 100%;
    max-width: 282px;
    height: 73px;
    font-family: Aeonik;
    font-size: 61.04px;
    font-weight: 700;
    line-height: 73.25px;
    text-align: left;
  }

  .landlords-subtitle {
    width: 100%;
    max-width: 771px;
    height: 47px;
    font-family: Aeonik;
    font-size: 39.06px;
    font-weight: 500;
    line-height: 46.87px;
    text-align: left;
    color: #b1b2b6;
  }

  .landlords-svgs {
    width: 100%;
    max-width: 1245px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    gap: 2rem;
  }

  .landlords-svgs .landlords-svg1 {
    width: 500px;
    height: 600px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url("../../assets/images/landlordbg.png");
  }

  .landlords-svgs .landlords-svg1 p {
    max-width: 370px;
    height: 100px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 700;
    line-height: 35px;
    text-align: left;
    color: white;
  }

  .landlords-svg1 img {
    width: 300px;
    height: 330px;
    /* border-radius: 40px; */
    border: 0px 0px 0px 0px;
    position: relative;
    bottom: -5.4rem;
    object-fit: contain;
  }

  .landlords-svgs .landlords-svg2 {
    width: 382px;
    height: 600px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../../assets/images/landlord.png");
  }

  .landlords-svg2 p {
    color: white;
    width: 300px;
    height: 138px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 500;
    line-height: 35px;
    text-align: left;
  }

  .landlords-download {
    max-width: 1245px;
    width: 100%;
    height: 273px;
    padding: 0px 45px;
    gap: 0px;
    border-radius: 30px;
    opacity: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    background-size: cover;
    background-image: url("../../assets/images/landlordGray.png");
  }

  .landlords-download p {
    max-width: 380px;
    width: 100%;
    height: auto;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 700;
    line-height: 35px;
    text-align: left;
  }

  .landlords-download-btn {
    width: 534px;
    height: 72.22px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
  }

  .testimonial-section {
    max-width: 900px;
    width: 100%;
    height: 100%;
    margin: 6rem 0rem;
    display: flex;
    justify-content: center;
    align-content: center;
    position: relative;
    padding: 0rem 3rem;
  }

  .testimonial-div {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .testimonial-slide {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column-reverse;
    gap: 5rem;
  }

  .testimonial-slide-img {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .testimonial-slide img {
    width: 440px;
    height: 450px;
    border-radius: 30px;
    object-fit: cover;

    display: flex;
    justify-content: center;
    align-content: center;
  }

  .testimonial-header {
    width: 100%;
    height: auto;
    gap: 47px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }

  /* 
  .testimonial-header div {
    width: 336px;
    height: 144px;
    color: rgba(0, 0, 0, 0.6);
    background: #000;
  } */

  .testimonial-title {
    width: 336px;
    height: 65px;
    font-family: Aeonik;
    font-size: 61.04px;
    font-weight: 700;
    line-height: 65px;
    text-align: left;
  }

  .testimonial-comment {
    font-family: Aeonik;
    font-size: 24px;
    font-weight: 400;
    line-height: 36px;
    text-align: left;
  }

  .testimonial-name {
    font-family: Aeonik;
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    text-align: left;
    margin-top: 2rem;
  }

  .testimonial-container
    .testimonial-swiper-next
    .testimonial-container
    .testimonial-swiper-prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
  }

  .testimonial-container,
  .testimonial-swiper-next svg {
    position: absolute;
    right: -4rem;
    width: 60px;
    height: 60px;
    bottom: 20rem;
  }

  .testimonial-container,
  .testimonial-swiper-prev svg {
    position: absolute;
    left: -5rem;
    width: 60px;
    height: 60px;
    bottom: 20rem;
  }

  .footer-section {
    width: 100%;
    max-width: 1328px;
    height: auto;
    margin: 6rem 0rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 0rem 3rem;
    gap: 6rem;
  }

  .footer-user-app {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("../../assets/images/footerBg.png");
    color: white;
    border-radius: 30px;
  }

  .footer-user-app .footer-user-app-div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;
    height: auto;
  }

  .footer-user-app .footer-download-app {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .footer-user-app div p:nth-child(1) {
    width: 100%;
    max-width: 421px;
    height: 46px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 700;
    line-height: 35px;
    text-align: center;
  }

  .footer-user-app div p:nth-child(2) {
    width: 421px;
    height: auto;
    font-family: Aeonik;
    font-size: 25px;
    font-weight: 500;
    line-height: 30px;
    text-align: center;
  }

  .footer-user-app img:nth-child(2) {
    width: 375px;
    height: 350px;
    /* border-radius: 40px; */
    border: 10px;
    position: relative;
    bottom: -4.7rem;
    object-fit: contain;
  }

  .footer-habeep {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0rem;
  }

  .footer-habeep div:nth-child(1) {
    width: 279px;
    height: 50px;
    background-position: left;
    background-repeat: no-repeat;
    background-image: url("../../assets/images/footerHabeep.svg");
    /* background: white */
  }

  .footer-habeep .footer-habeep-divs1 div,
  .footer-habeep .footer-habeep-divs2 div {
    width: 279px;
    height: 26px;
    border-radius: 5px;
    background: none;
    display: flex;
    gap: 10px;
    margin-top: 20px;
    font-family: Aeonik;
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
    text-align: left;
    color: rgba(102, 102, 102, 1);
  }

  .footer-habeep .footer-habeep-divs2 div:nth-child(2) {
    max-width: 402px;
  }

  .footer-copy-write {
    width: 200px;
    height: 24px;
    font-family: Aeonik;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
    color: rgba(27, 73, 255, 1);
  }
}

@media screen and (max-width: 1100px) {
  .about-sections {
    max-width: 1245px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .hero-section {
    width: 100%;
    height: auto;
    /* height: 1500px; */
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 3rem 0rem;
    gap: 3rem;
    padding: 0rem 3rem;
  }

  .intro-text {
    width: 100%;
    height: auto;
    max-height: 500px;
    font-size: 40px;
    font-weight: 700;
    line-height: 50px;
    text-align: center;
  }

  .hero-video {
    width: 100%;
    max-width: 1245px;
    max-height: 100%;
    height: 473px;
    border-radius: 30px;
    background: rgba(217, 217, 217, 1);
  }

  .discover-section {
    width: 100%;
    height: auto;
    margin: 5rem 0rem;
    gap: 0.5rem;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    padding: 0rem 3rem;
  }

  .discover-header {
    width: 100%;
    height: auto;
    margin-bottom: 2rem;
  }

  .discover-title {
    width: 250px;
    max-height: 73px;
    font-family: Aeonik;
    font-size: 50px;
    font-weight: 700;
    line-height: 50px;
    text-align: left;
  }

  .discover-subtitle {
    max-width: 1020px;
    height: auto;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 500;
    line-height: 35px;
    text-align: left;
    color: #b1b2b6;
  }

  .discover-svg {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .discover-svg1,
  .discover-svg2 {
    width: 500px;
    height: 500px;
    border-radius: 30px;
  }

  .tenants-section {
    width: 100%;
    height: auto;
    margin: 5rem 0rem;
    gap: 2rem;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    padding: 0rem 3rem;
  }

  .tenants-header {
    width: 100%;
    max-width: 681px;
    height: auto;
    max-height: 100px;
    display: flex;
    flex-direction: column;
    gap: 1px;
    margin-bottom: 2rem;
  }

  .tenants-title {
    width: 228px;
    max-height: 100px;
    height: auto;
    font-family: Aeonik;
    font-size: 40px;
    font-weight: 700;
    line-height: 50px;
    text-align: left;
  }

  .tenants-subtitle {
    max-width: 681px;
    width: 100%;
    max-height: 200px;
    height: auto;
    font-family: Aeonik;
    font-size: 35px;
    font-weight: 500;
    line-height: 40px;
    text-align: left;
    color: #b1b2b6;
  }

  .tenants-svg {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    gap: 1px;
  }

  .tenants-svg1 {
    width: 450px;
    height: 470px;
    object-fit: contain;
    border-radius: 30px;
  }

  .tenants-svg2 {
    width: 450px;
    height: 400px;
    object-fit: contain;
    border-radius: 30px;
  }

  .tenants-benefits {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .tenants-benefits-list {
    width: 100%;
    height: 423px;
    gap: 1rem;
    border-radius: 30px;
    padding: 0rem 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-image: url("../../assets/icons/tenant-bg.png");
  }

  .tenants-benefits-list span {
    color: #dfa76c;
    font-size: 28px;
    font-weight: 700;
    line-height: 30px;
  }

  .benefit1 {
    width: auto;
    height: 100%;
    gap: 3rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    color: white;
  }

  .benefit1 p {
    width: 100%;
    max-width: 250px;
    height: 138px;
    font-family: Aeonik;
    font-size: 20px;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
  }

  .benefit2 {
    width: auto;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: column;
    color: white;
  }

  .benefit2 p {
    width: auto;
    height: auto;
    font-family: Aeonik;
    font-size: 20px;
    font-weight: 700;
    line-height: 25px;
    text-align: left;
    color: white;
  }

  .benefit3 {
    width: auto;
    height: auto;
  }

  .benefit3 p {
    font-family: Aeonik;
    font-size: 20px;
    font-weight: 700;
    line-height: 25px;
    text-align: center;
    color: white;
  }

  .agent-section {
    width: 100%;
    height: auto;
    margin: 3rem 0rem;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    gap: 2rem;
    padding: 0rem 3rem;
  }

  .agent-header {
    width: 100%;
    max-width: 661x;
    max-height: 150px;
    height: auto;
  }

  .agent-title {
    width: 205px;
    height: 73px;
    font-family: Aeonik;
    font-size: 50px;
    font-weight: 700;
    line-height: 50px;
    text-align: left;
  }

  .agent-subtitle {
    max-width: 661px;
    width: 100%;
    max-height: 200px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 500;
    line-height: 30px;
    text-align: left;
    color: #b1b2b6;
  }

  .agent-svg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;
    flex-direction: column;
  }

  .agent-svg-text {
    width: 400px;
    height: 500px;
    border-radius: 30px;
    background-image: url("../../assets/images/agent-bg1.png");
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .agent-svg-text p {
    max-width: 280px;
    width: 100%;
    max-height: 300px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 500;
    line-height: 40px;
    text-align: left;
    color: white;
  }

  .agent-svg-phone {
    width: 500px;
    height: 500px;
    border-radius: 30px;
    background-image: url("../../assets/images/agent-bg2.png");
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .agent-svg-phone p {
    width: 360px;
    height: 92px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 700;
    line-height: 35px;
    position: relative;
    left: -2rem;
  }

  .agent-svg-phone p span {
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 700;
    line-height: 35px;
    text-align: left;
    color: #182389;
  }

  .agent-svg-phone img {
    position: relative;
    bottom: -5rem;
    width: 350px;
    height: 250px;
    object-fit: contain;
  }

  .blog-section {
    width: 100%;
    height: auto;
    margin: 3rem 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;
  }

  .blog-container {
    width: 1245px;
    /* width: 1245px; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;
  }

  .blog-header {
    width: 100%;
    max-width: 818px;
    height: 120px;
    gap: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .blog-title {
    width: 100%;
    max-width: 162px;
    max-height: 73px;
    height: 100%;
    font-family: Aeonik;
    font-size: 50px;
    font-weight: 700;
    line-height: 50px;
    text-align: center;
    color: black;
  }

  .blog-subtitle {
    width: auto;
    max-height: 47px;
    height: 100%;
    gap: 0px;
    opacity: 0px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 500;
    line-height: 35px;
    text-align: center;
    color: #b1b2b6;
  }

  .swiper-container-wrapper {
    position: relative;
    width: 100%;
    max-width: 800px;
    max-height: 399px;
    height: 100%;
    gap: 5rem;
    opacity: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0rem 5rem;
  }

  .swiper-prev,
  .swiper-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
  }

  .swiper-prev {
    width: 80px;
    left: 0.5rem;
  }

  .swiper-next {
    right: 0.5rem;
  }

  .swiper-div {
    max-height: 399px;
    max-width: 800px;
    gap: 2rem;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  swiper-slide.swiper-slide.swiper-slide-active {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  swiper-slide.swiper-slide.swiper-slide-next {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide-card {
    width: 100%;
    max-width: 350px;
    height: 399px;
    border-radius: 30px 30px 0px 0px;
    border-color: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: rgb(255, 255, 255) 1px -70px 40px -18px inset;
    background-size: cover;
    background-position: center;

    /* filter: brightness(0.8) */
  }

  .swiper-slide-card div {
    position: absolute;
    bottom: 40px;
    max-width: 351px;
    width: 100%;
    height: auto;
    gap: 0px;
    opacity: 1;
    text-align: center;
    bottom: 10px;
    padding: 10px;
    border-radius: 0px 0px 30px 30px;
    background: rgba(0, 0, 0, 0.514);
    padding-left: 1rem;
  }

  .swiper-div-title {
    width: 100%;
    max-width: 350px;
    height: auto;
    font-family: Ubuntu;
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    color: white;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }

  .swiper-div-sub-title {
    width: 100%;
    height: 26px;
    font-family: Ubuntu;
    font-size: 14px;
    font-weight: 400;
    line-height: 26px;
    text-align: left;
    color: rgba(255, 255, 255, 0.863);
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }

  .landlords-section {
    width: 100%;
    height: auto;
    margin: 5rem 0rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 2rem;
    padding: 0rem 3rem;
  }

  .landlords-header {
    width: 100%;
    max-width: 771px;
    height: auto;
    gap: 1px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }

  .landlords-header .landlords-title {
    width: 100%;
    max-width: 282px;
    height: 43px;
    font-family: Aeonik;
    font-size: 50px;
    font-weight: 700;
    line-height: 50px;
    text-align: left;
  }

  .landlords-subtitle {
    width: 100%;
    max-width: 771px;
    height: auto;
    max-height: 100px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 500;
    line-height: 30px;
    text-align: left;
    color: #b1b2b6;
    margin-top: 10px;
  }

  .landlords-svgs {
    width: 100%;
    max-width: 1245px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
  }

  .landlords-svgs .landlords-svg1 {
    width: 500px;
    height: 600px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url("../../assets/images/landlordbg.png");
  }

  .landlords-svgs .landlords-svg1 p {
    max-width: 370px;
    height: 100px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 700;
    line-height: 35px;
    text-align: left;
    color: white;
  }

  .landlords-svg1 img {
    width: 300px;
    height: 330px;
    /* border-radius: 40px; */
    border: 0px 0px 0px 0px;
    position: relative;
    bottom: -5.4rem;
    object-fit: contain;
  }

  .landlords-svgs .landlords-svg2 {
    width: 382px;
    height: 600px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../../assets/images/landlord.png");
  }

  .landlords-svg2 p {
    color: white;
    width: 300px;
    height: 138px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 500;
    line-height: 35px;
    text-align: left;
  }

  .landlords-download {
    max-width: 1245px;
    width: 100%;
    height: 273px;
    padding: 10px 45px;
    gap: 0px;
    border-radius: 30px;
    opacity: 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    background-size: cover;
    background-image: url("../../assets/images/landlordGray.png");
  }

  .landlords-download p {
    max-width: 380px;
    width: 100%;
    height: auto;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 700;
    line-height: 35px;
    text-align: left;
  }

  .landlords-download-btn {
    width: 534px;
    height: 72.22px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
  }

  .testimonial-section {
    max-width: 1000px;
    width: 100%;
    height: auto;
    margin: 6rem 0rem;
    display: flex;
    justify-content: center;
    align-content: center;
    position: relative;
    padding: 0rem 3rem;
  }

  .testimonial-div {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .testimonial-slide {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column-reverse;
  }

  .testimonial-slide-img {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .testimonial-slide img {
    width: 400px;
    height: 400px;
    border-radius: 30px;
    object-fit: cover;

    display: flex;
    justify-content: center;
    align-content: center;
  }

  .testimonial-header {
    width: 100%;
    height: 100%;
    height: auto;
    gap: 17px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }

  /* .testimonial-header div {
    width: 336px;
    height: 144px;
    color: rgba(0, 0, 0, 0.6);
    background: #000;
  } */

  .testimonial-title {
    width: 336px;
    height: 65px;
    font-family: Aeonik;
    font-size: 50px;
    font-weight: 700;
    line-height: 50px;
    text-align: left;
  }

  .testimonial-comment {
    font-family: Aeonik;
    font-size: 24px;
    font-weight: 400;
    line-height: 36px;
    text-align: left;
  }

  .testimonial-name {
    font-family: Aeonik;
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    text-align: left;
    margin-top: 2rem;
  }

  .testimonial-container
    .testimonial-swiper-next
    .testimonial-container
    .testimonial-swiper-prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
  }

  .testimonial-container,
  .testimonial-swiper-next svg {
    position: absolute;
    right: 4rem;
    width: 60px;
    height: 60px;
    bottom: 16rem;
  }

  .testimonial-container,
  .testimonial-swiper-prev svg {
    position: absolute;
    left: 4rem;
    width: 60px;
    height: 60px;
    bottom: 16rem;
  }

  .footer-section {
    width: 100%;
    max-width: 1328px;
    height: auto;
    margin: 6rem 0rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 0rem 3rem;
    gap: 6rem;
  }

  .footer-user-app {
    width: 100%;
    height: 800px;
    /* height: auto; */
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("../../assets/images/footerBg.png");
    color: white;
    border-radius: 30px;
    flex-direction: column;
  }

  .footer-user-app .footer-user-app-div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1.7rem;
    height: auto;
  }

  .footer-user-app .footer-download-app {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .footer-user-app div p:nth-child(1) {
    width: 100%;
    max-width: 421px;
    height: 46px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 700;
    line-height: 35px;
    text-align: center;
    margin-bottom: 1rem;
  }

  .footer-user-app div p:nth-child(2) {
    width: 421px;
    height: auto;
    font-family: Aeonik;
    font-size: 25px;
    font-weight: 500;
    line-height: 30px;
    text-align: center;
  }

  .footer-user-app img:nth-child(2) {
    width: 375px;
    height: 350px;
    /* border-radius: 40px; */
    border: 10px;
    position: relative;
    bottom: -3rem;
    object-fit: contain;
  }

  .footer-habeep {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0rem;
    flex-direction: column;
  }

  .footer-habeep div:nth-child(1) {
    width: 279px;
    height: 50px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("../../assets/images/footerHabeep.svg");
  }

  .footer-habeep-home {
    margin-bottom: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer-habeep .footer-habeep-divs1 div,
  .footer-habeep .footer-habeep-divs2 div {
    width: 279px;
    height: 26px;
    border-radius: 5px;
    background: none;
    display: flex;
    gap: 1px;
    margin-top: 20px;
    font-family: Aeonik;
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
    text-align: left;
    color: rgba(102, 102, 102, 1);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer-habeep-divs1 div:nth-child(2) {
    margin-top: -1px;
    margin-bottom: 1rem;
  }

  .footer-habeep .footer-habeep-divs2 div:nth-child(2) {
    max-width: 402px;
    text-align: center;
  }

  .footer-copy-write {
    width: 200px;
    height: 24px;
    font-family: Aeonik;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
    color: rgba(27, 73, 255, 1);
  }
}

@media screen and (max-width: 550px) {
  .about-sections {
    max-width: 550px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .hero-section {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 3rem 0rem;
    gap: 3rem;
    padding: 0rem 1rem;
  }

  .intro-text {
    max-width: 319px;
    width: 100%;
    height: auto;
    max-height: 432px;
    font-size: 36px;
    font-weight: 700;
    line-height: 54px;
    text-align: center;
  }

  .hero-video {
    width: 100%;
    max-width: 331px;
    max-height: 419px;
    border-radius: 30px;
    background: rgba(217, 217, 217, 1);
  }

  .discover-section {
    width: 100%;
    height: auto;
    margin: 5rem 0rem;
    gap: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0rem 1rem;
  }

  .discover-header {
    width: 100%;
    height: auto;
    margin-bottom: 2rem;
    max-width: 319px;
    max-height: 138px;
    gap: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .discover-title {
    font-family: Aeonik;
    font-size: 36px;
    font-weight: 700;
    line-height: 43.2px;
    text-align: left;
  }

  .discover-subtitle {
    font-family: Aeonik;
    font-size: 24px;
    font-weight: 500;
    line-height: 28.8px;
    text-align: left;
  }

  .discover-svg {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .discover-svg1,
  .discover-svg2 {
    width: 331px;
    height: 360px;
    border-radius: 30px;
    opacity: 0px;
    object-fit: contain;
  }

  .tenants-section {
    width: 100%;
    height: auto;
    margin: 5rem 0rem;
    gap: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0rem 1rem;
  }

  .tenants-header {
    width: 100%;
    height: auto;
    max-width: 319px;
    max-height: 138px;
    gap: 8px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .tenants-title {
    font-family: Aeonik;
    font-size: 36px;
    font-weight: 700;
    line-height: 43.2px;
    text-align: left;
  }

  .tenants-subtitle {
    font-family: Aeonik;
    font-size: 24px;
    font-weight: 500;
    line-height: 28.8px;
    text-align: left;
  }

  .tenants-svg {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .tenants-svg1,
  .tenants-svg2 {
    width: 331px;
    height: auto;
    border-radius: 30px;
    object-fit: cover;
  }

  .tenants-benefits {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    height: auto;
  }

  .tenants-benefits-list {
    width: 100%;
    max-width: 331px;
    height: 774px;
    max-height: 774px;
    padding: 0rem 1rem;
    background-position: center;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }

  .benefit1 {
    width: auto;
    height: 200px;
    gap: 3rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    color: white;
  }

  .benefit1 p {
    font-family: Aeonik;
    font-size: 24px;
    font-weight: 700;
    line-height: 28.8px;
    text-align: left;
  }

  .benefit2 {
    width: auto;
    height: 250px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    flex-direction: column;
    color: white;
  }

  .benefit2 p {
    width: auto;
    height: auto;
    font-family: Aeonik;
    font-size: 22px;
    font-weight: 700;
    line-height: 26.4px;
    text-align: left;
  }

  .benefit3 {
    width: auto;
    height: auto;
  }

  .benefit3 p {
    font-family: Aeonik;
    font-size: 22px;
    font-weight: 700;
    line-height: 26.4px;
    text-align: center;
  }

  .agent-section {
    width: 100%;
    height: auto;
    margin: 3rem 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    padding: 0rem 1rem;
  }

  .agent-header {
    width: 100%;
    max-width: 319px;
    max-height: 209px;
    gap: 1px;
  }

  .agent-title {
    width: 73px;
    height: auto;
    max-height: 73px;
    font-family: Aeonik;
    font-size: 36px;
    font-weight: 700;
    line-height: 43.2px;
    text-align: left;
    margin-bottom: 10px;
  }

  .agent-subtitle {
    max-width: 319px;
    width: auto;
    font-family: Aeonik;
    font-size: 24px;
    font-weight: 500;
    line-height: 28.8px;
    text-align: left;
  }

  .agent-svg {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-direction: column;
  }

  .agent-svg-text {
    /* width: auto; */
    max-width: 331px;
    height: 483px;
    padding-top: 4rem;
  }

  .agent-svg-text p {
    width: 100%;
    max-width: 230px;
    height: 203px;
    font-family: Aeonik;
    font-size: 24px;
    font-weight: 500;
    line-height: 28.8px;
    text-align: left;
  }

  .agent-svg-phone {
    width: 100%;
    max-width: 331px;
    height: 483px;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .agent-svg-phone p {
    width: 100%;
    max-width: 228px;
    height: auto;
    font-family: Aeonik;
    font-size: 24px;
    font-weight: 700;
    line-height: 28.8px;
    text-align: center;
  }

  .agent-svg-phone p span {
    font-size: 24px;
    font-weight: 700;
    line-height: 28.8px;
    text-align: left;
  }

  .agent-svg-phone img {
    position: relative;
    bottom: -5.5rem;
    width: 250px;
    height: 250px;
    object-fit: contain;
  }

  .blog-section {
    width: 100%;
    height: auto;
    margin: 3rem 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0rem;
  }

  .blog-container {
    max-width: 1245px;
    height: auto;
    /* width: 1245px; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;
  }

  .blog-header {
    height: auto;
    width: 247px;
    max-height: 142px;
  }

  .blog-title {
    font-family: Aeonik;
    font-size: 36px;
    font-weight: 700;
    line-height: 43.2px;
    text-align: center;
  }

  .blog-subtitle {
    max-width: 247px;
    max-height: 87px;
    height: auto;
    font-size: 24px;
    font-weight: 500;
    line-height: 28.8px;
    text-align: center;
  }

  .swiper-container-wrapper {
    position: relative;
    width: 100%;
    max-width: 400px;
    max-height: 399px;
    height: 100%;
    gap: 4rem;
    opacity: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0rem 5rem;
  }

  .swiper-prev,
  .swiper-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
  }

  .swiper-prev svg {
    width: 24px;
    left: 2rem;
    position: relative;
  }

  .swiper-next svg {
    width: 24px;
    right: 2rem;
    position: relative;
  }

  .swiper-div {
    max-height: 399px;
    width: 100%;
    max-width: 400px;
    gap: 2rem;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  swiper-slide.swiper-slide.swiper-slide-active {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  swiper-slide.swiper-slide.swiper-slide-next {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide-card {
    width: 100%;
    max-width: 250px;
    height: 257px;
    /* border-radius: 30px; */
    border-color: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: rgb(255, 255, 255) 1px -70px 40px -18px inset;
    background-size: cover;
    background-position: center;
  }

  .swiper-slide-card div {
    width: 100%;
    height: auto;
    gap: 5px;
    bottom: 2rem;
    background: rgba(0, 0, 0, 0.514);
  }

  .swiper-div-title {
    width: 100%;
    height: auto;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    text-align: left;
    color: white;
  }

  .swiper-div-sub-title {
    width: 100%;
    height: auto;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    text-align: left;
    padding: 0;
    color: white;
  }

  .landlords-section {
    width: 100%;
    height: auto;
    margin: 5rem 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    padding: 0rem 1rem;
  }

  .landlords-header {
    width: 100%;
    max-width: 319px;
    max-height: 120px;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
  }

  .landlords-header .landlords-title {
    font-family: Aeonik;
    font-size: 36px;
    font-weight: 700;
    line-height: 43.2px;
    text-align: left;
  }

  .landlords-subtitle {
    width: 100%;
    max-width: 319px;
    max-height: 58px;
    gap: 0px;
    opacity: 0px;
    font-family: Aeonik;
    font-size: 24px;
    font-weight: 500;
    line-height: 28.8px;
    text-align: left;
  }

  .landlords-svgs {
    width: 100%;
    max-width: 1245px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
  }

  .landlords-svgs .landlords-svg1 {
    width: 331px;
    height: 487px;
  }

  .landlords-svgs .landlords-svg1 p {
    width: 100%;
    max-width: 196px;
    max-height: 116px;
    font-family: Aeonik;
    font-size: 24px;
    font-weight: 700;
    line-height: 28.8px;
    text-align: left;
  }

  .landlords-svg1 img {
    width: 250px;
    height: 250px;
    /* border-radius: 40px; */
    border: 0px 0px 0px 0px;
    position: relative;
    bottom: -4.3rem;
    object-fit: contain;
  }

  .landlords-svgs .landlords-svg2 {
    width: 331px;
    height: 478px;
  }

  .landlords-svg2 p {
    width: 100%;
    max-width: 200px;
    height: 145px;
    top: 175px;
    left: 36px;
    gap: 0px;
    opacity: 0px;

    font-family: Aeonik;
    font-size: 24px;
    font-weight: 500;
    line-height: 28.8px;
    text-align: left;
  }

  .landlords-download {
    width: 331px;
    height: 432px;
    top: 1341px;
    left: 22px;
    gap: 0px;
    border-radius: 30px;
    opacity: 0px;
  }

  .landlords-download p {
    max-width: 179px;
    height: 58px;
    font-family: Aeonik;
    font-size: 24px;
    font-weight: 700;
    line-height: 28.8px;
    text-align: center;
  }

  .landlords-download-btn {
    width: 100%;
    max-width: 250px;
    height: 72.22px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }

  .testimonial-section {
    max-width: 1000px;
    width: 100%;
    height: auto;
    margin: 6rem 0rem;
    display: flex;
    justify-content: center;
    align-content: center;
    position: relative;
    padding: 0rem 1rem;
  }

  .testimonial-div {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .testimonial-slide {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column-reverse;
    gap: 2rem;
  }

  .testimonial-slide-img {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .testimonial-slide img {
    width: 250px;
    height: 230.07px;
    gap: 0px;
    border-radius: 30px;
    opacity: 0px;
  }

  .testimonial-header {
    width: 336px;
    height: auto;
    gap: 17px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }

  /* .testimonial-header div {
    width: 336px;
    height: 144px;
    color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  } */

  .testimonial-title {
    width: 100%;
    height: 65px;
    font-family: Aeonik;
    font-size: 36px;
    font-weight: 700;
    line-height: 65px;
    text-align: center;
  }

  .testimonial-comment {
    width: 100%;
    height: auto;
    font-family: Aeonik;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    text-align: center;

    color: #00000099;
  }

  .testimonial-name {
    font-family: Aeonik;
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    text-align: center;
  }

  .testimonial-container
    .testimonial-swiper-next
    .testimonial-container
    .testimonial-swiper-prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
  }

  .testimonial-container,
  .testimonial-swiper-next svg {
    position: absolute;
    right: 1.2rem;
    width: 24px;
    height: 30px;
    bottom: 16rem;
  }

  .testimonial-container,
  .testimonial-swiper-prev svg {
    position: absolute;
    left: 0.5rem;
    width: 24px;
    height: 30px;
    bottom: 16rem;
  }

  .footer-section {
    width: 100%;
    max-width: 1328px;
    height: auto;
    margin: 6rem 0rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 0rem 1rem;
    gap: 3rem;
  }

  .footer-user-app {
    width: 100%;
    max-width: 375px;
    height: 760px;
    gap: 0px;
    opacity: 0px;
  }

  .footer-user-app .footer-user-app-div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;
    height: auto;
    margin-top: 4rem;
  }

  .footer-user-app .footer-download-app {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .footer-user-app div p:nth-child(1) {
    width: 100%;
    max-width: 205px;
    height: 60px;
    font-family: Aeonik;
    font-size: 26px;
    font-weight: 700;
    line-height: 28.8px;
    text-align: center;
    margin-left: 2rem;
  }

  .footer-user-app div p:nth-child(2) {
    width: 263px;
    height: 24px;
    top: 154px;
    left: 56px;
    gap: 0px;
    opacity: 0px;
    font-family: Aeonik;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.8px;
    text-align: center;
  }

  .footer-user-app img:nth-child(2) {
    width: 250px;
    height: 320px;
    bottom: -1.96rem;
  }

  .footer-habeep {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0rem;
    flex-direction: column;
  }

  .footer-habeep div:nth-child(1) {
    width: 279px;
    height: 50px;
    background-position: left;
    background-repeat: no-repeat;
    background-image: url("../../assets/images/footerHabeep.svg");
  }

  .footer-habeep-home {
    margin-bottom: 4rem;
  }

  .footer-habeep .footer-habeep-divs1 div,
  .footer-habeep .footer-habeep-divs2 div {
    width: 279px;
    height: 26px;
    border-radius: 5px;
    background: none;
    display: flex;
    gap: 10px;
    margin-top: 20px;
    font-family: Aeonik;
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
    text-align: left;
    color: rgba(102, 102, 102, 1);
  }

  .footer-habeep .footer-habeep-divs2 div:nth-child(2) {
    max-width: 402px;
  }

  .footer-copy-write {
    width: 200px;
    height: 24px;
    font-family: Aeonik;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
    color: rgba(27, 73, 255, 1);
  }
}
</style>
