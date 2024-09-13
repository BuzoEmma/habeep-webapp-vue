<script setup>
import { register } from "swiper/element/bundle";
register();
import dataBlog from "./aboutBlog";

import MainNavbar from "../../components/MainNavbar.vue";
import { useRouter } from "vue-router";
import discoverSvg1 from "../../assets/images/discoverImg1.svg";
import discoverSvg2 from "../../assets/images/discoverImg2.svg";
import tenants1 from "../../assets/images/tenantsSvg1.png";
import tenants2 from "../../assets/images/tenantsSvg2.png";
import landlordPhone from "../../assets/images/lan.png";
import testimonials from "./aboutTestimonials";

const router = useRouter();

function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}
</script>

<template>
  <MainNavbar />

  <div class="about-sections">
    <section class="hero-section">
      <p class="intro-text">
        Our mission is to bridge the gap between landlords and tenants, making
        renting and managing properties easy.
      </p>
      <div class="hero-video"></div>
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

    <section class="blog-section">
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
          :navigation="{
            prevEl: '.swiper-prev',
            nextEl: '.swiper-next',
          }"
          @swiperprogress="onProgress"
          @swiperslidechange="onSlideChange"
          class="swiper-div"
        >
          <swiper-slide
            v-for="(item, index) in dataBlog"
            :key="index"
            class="swiper-slide"
          >
            <a
              v-if="item.link"
              :href="item.link"
              target="_blank"
              rel="noopener noreferrer"
              :style="{ backgroundImage: `url(${item.image})` }"
              class="swiper-slide-card"
            >
              <div>
                <p class="swiper-div-title">{{ item.title }}</p>
                <p class="swiper-div-sub-title">
                  <span>{{ item.date }}</span> &nbsp; &nbsp;
                  <span>{{ item.name }}</span>
                </p>
              </div>
            </a>

            <div
              v-else-if="item.route"
              @click="$router.push(item.route)"
              :style="{ backgroundImage: `url(${item.image})` }"
              class="swiper-slide-card"
            >
              <div>
                <p class="swiper-div-title">{{ item.title }}</p>
                <p class="swiper-div-sub-title">
                  <span>{{ item.date }} {{ item.name }}</span>
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
        <p>Download the Landlord App</p>
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
            <p>Download the User App</p>
            <p>
              Lorem ipsum dolor sit amet consectetur. Dolor sit amet
              consectetur.
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
              href="https://play.google.com/store/apps/details?id=org.habeep"
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
          <div></div>
          <div></div>
        </div>
        <div class="footer-habeep-divs2">
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="footer-copy-write">
        <span>&#x00A9;</span> {{ getCurrentYear() }} 525SYSTEM
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
    /* filter: brightness(0.8) */
  }

  .swiper-slide-card div {
    position: absolute;
    bottom: 40px;
    width: 351px;
    height: 87px;
    gap: 0px;
    opacity: 1;
  }

  .swiper-div-title {
    width: 351px;
    height: 56px;
    font-family: Ubuntu;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    text-align: left;
    color: #0a1045;
  }

  .swiper-div-sub-title {
    width: 100%;
    height: 26px;
    font-family: Ubuntu;
    font-size: 14px;
    font-weight: 400;
    line-height: 26px;
    text-align: left;
    color: #71759d;
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
    width: 1315px;
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
    width: 375px;
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
    width: 1315px;
    height: 273px;
    padding: 0px 85px;
    gap: 0px;
    border-radius: none;
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
    justify-content: center;
    align-content: center;
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
    bottom: 16rem;
  }

  .testimonial-container,
  .testimonial-swiper-prev {
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
    font-size: 27.65px;
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

  .footer-habeep .footer-habeep-divs1 div {
    width: 279px;
    height: 26px;
    border-radius: 5px;
    background: rgba(217, 217, 217, 1);
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  .footer-habeep .footer-habeep-divs2 div {
    width: 279px;
    height: 26px;
    border-radius: 5px;
    background: rgba(217, 217, 217, 1);
    display: flex;
    margin-top: 20px;
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
    left: -7rem;
  }

  .swiper-next {
    right: -7rem;
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
    height: 87px;
    gap: 0px;
    opacity: 1;
    text-align: center;
    padding: 0px 5px;
  }

  .swiper-div-title {
    width: 100%;
    max-width: 350px;
    height: 56px;
    font-family: Ubuntu;
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    text-align: center;
    color: #0a1045;
  }

  .swiper-div-sub-title {
    width: 100%;
    height: 26px;
    font-family: Ubuntu;
    font-size: 14px;
    font-weight: 400;
    line-height: 26px;
    text-align: left;
    color: #71759d;
    padding-left: 1.5rem;
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
    justify-content: space-between;
    align-content: center;
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
    width: 336px;
    /* height: 256px; */
    gap: 47px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }

  .testimonial-header div {
    width: 336px;
    height: 144px;
    color: rgba(0, 0, 0, 0.6);
    /* background: #000; */
  }
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
    bottom: 16rem;
  }

  .testimonial-container,
  .testimonial-swiper-prev {
    position: absolute;
    left: -5rem;
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
    font-size: 35px;
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

  .footer-habeep .footer-habeep-divs1 div {
    width: 279px;
    height: 26px;
    border-radius: 5px;
    background: rgba(217, 217, 217, 1);
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  .footer-habeep .footer-habeep-divs2 div {
    width: 279px;
    height: 26px;
    border-radius: 5px;
    background: rgba(217, 217, 217, 1);
    display: flex;
    margin-top: 20px;
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
    height: 87px;
    gap: 0px;
    opacity: 1;
    text-align: center;
    padding: 0px 5px;
  }

  .swiper-div-title {
    width: 100%;
    max-width: 350px;
    height: 56px;
    font-family: Ubuntu;
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    text-align: center;
    color: #0a1045;
  }

  .swiper-div-sub-title {
    width: 100%;
    height: 26px;
    font-family: Ubuntu;
    font-size: 14px;
    font-weight: 400;
    line-height: 26px;
    text-align: left;
    color: #71759d;
    padding-left: 1.5rem;
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
    justify-content: space-between;
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
    width: 336px;
    max-height: 256px;
    height: auto;
    gap: 17px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }

  .testimonial-header div {
    width: 336px;
    height: 144px;
    color: rgba(0, 0, 0, 0.6);
    /* background: #000; */
  }
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
    left: 10rem;
    width: 60px;
    height: 60px;
    bottom: 1rem;
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
    font-size: 35px;
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
    bottom: -3rem;
    object-fit: contain;
  }

  .footer-habeep {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0rem;
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
  .footer-habeep .footer-habeep-divs1 div {
    width: 279px;
    height: 26px;
    border-radius: 5px;
    background: rgba(217, 217, 217, 1);
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  .footer-habeep .footer-habeep-divs2 div {
    width: 279px;
    height: 26px;
    border-radius: 5px;
    background: rgba(217, 217, 217, 1);
    display: flex;
    margin-top: 20px;
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
    max-width: 299px;
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
    align-content: center;
    flex-direction: column;
    padding: 0rem 1rem;
  }

  .tenants-header {
    width: 100%;
    max-width: 319px;
    height: auto;
    width: 100%;
    max-height: 109px;
    height: auto;
    gap: 8px;
    margin-bottom: 1rem;
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
    gap: 1px;
  }
  .tenants-svg1 {
    width: 331px;
    height: 350px;
    border-radius: 30px;
    object-fit: contain;
  }
  .tenants-svg2 {
    width: 331px;
    height: 322px;
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
    align-content: center;
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
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    flex-direction: column;
  }
  .agent-svg-text {
    width: 100%;
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
    gap: 1rem;
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
    /* background: #000; */
    /* filter: brightness(0.8) */
  }

  .swiper-slide-card div {
    width: 184px;
    height: 80px;
  }

  .swiper-div-title {
    width: 184px;
    height: 63px;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    text-align: left;
  }

  .swiper-div-sub-title {
    width: 200px;
    height: 19px;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    text-align: left;
    padding: 0;
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
    max-width: 419px;
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
    justify-content: space-between;
    align-items: center;
    flex-direction: column-reverse;
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
    max-height: 256px;
    height: auto;
    gap: 17px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }

  .testimonial-header div {
    width: 336px;
    height: 144px;
    color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .testimonial-title {
    width: 100%;
    max-width: 350px;
    height: 65px;
    font-family: Aeonik;
    font-size: 36px;
    font-weight: 700;
    line-height: 65px;
    text-align: center;
  }
  .testimonial-comment {
    width: 250px;
    height: 70px;
    gap: 0px;
    opacity: 0px;

    font-family: Aeonik;
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    text-align: center;
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
    right: 4rem;
    width: 24px;
    height: 30px;
    bottom: -1rem;
    top: 18rem;
  }

  .testimonial-container,
  .testimonial-swiper-prev svg {
    position: absolute;
    left: 10rem;
    width: 24px;
    height: 30px;
    bottom: 1rem;
    top: 10rem;
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
    margin-top: 5rem;
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
    height: 400px;
    bottom: -2.65rem;
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
  .footer-habeep .footer-habeep-divs1 div {
    width: 279px;
    height: 26px;
    border-radius: 5px;
    background: rgba(217, 217, 217, 1);
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  .footer-habeep .footer-habeep-divs2 div {
    width: 279px;
    height: 26px;
    border-radius: 5px;
    background: rgba(217, 217, 217, 1);
    display: flex;
    margin-top: 20px;
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
