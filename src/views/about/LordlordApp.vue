<script setup>
import AboutNavbar from "../../components/AboutNavbar.vue";
import { ref, onMounted } from "vue";

import { steps } from "./stepData.js";
const currentStep = ref(0);
const show = ref(false);

onMounted(() => {
  show.value = true;
  setInterval(() => {
    currentStep.value = (currentStep.value + 1) % steps.length;
  }, 3000); // 3 seconds
});
function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}
</script>

<template>
  <div>
    <AboutNavbar />
    <div class="main-container">
      <div class="section mission">
        <div class="mission-text">
          Our mission is to bridge the gap between landlords and tenants, making
          renting and managing properties easy.
        </div>
        <div class="download-links">
          <a
            href="https://apps.apple.com/us/app/habeep/id6450388013"
            target="_blank"
            class="download-link no-underline"
          >
            <img
              src="../../assets/icons/download-app-apple.svg"
              alt=""
              class="download-icon"
            />
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=org.habeep"
            target="_blank"
            class="download-link no-underline"
          >
            <img
              src="../../assets/icons/download-app-google.svg"
              alt=""
              class="download-icon"
            />
          </a>
        </div>
      </div>

      <div class="landlord">
        <img
          src="../../assets/landlord/Frame.png"
          class="landlord-img"
          alt=""
        />

        <div class="landlord-container">
          <p class="section-title">Why Become a Habeep Landlord</p>
          <img src="../../assets/landlord/phone.png" alt="phone" />

          <div class="benefit-item">
            <div class="benefit-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="icon"
              >
                <path
                  d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25
             25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71
              71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 
              489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 
              27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                />
              </svg>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div class="benefit-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="icon"
              >
                <path
                  d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25
             25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71
              71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 
              489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 
              27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                />
              </svg>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div class="benefit-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="icon"
              >
                <path
                  d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25
             25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71
              71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 
              489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 
              27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                />
              </svg>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div class="benefit-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="icon"
              >
                <path
                  d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25
             25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71
              71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 
              489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 
              27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                />
              </svg>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="journey">
        <div class="journey__title">
          3 Simple Steps to Begin Your Landlord Journey
        </div>

        <div class="journey__steps">
          <div class="journey__intro">
            <span class="journey__icon"></span>
            <span class="journey__text">
              Lorem ipsum dolor sit amet consectetur. Quis commodo nec risus est
              et.
            </span>
          </div>

          <div class="journey__step" :class="{ animate: show }" v-if="show">
            <span class="journey__number">{{ steps[currentStep].number }}</span>
            <div
              class="journey__content"
              :style="{
                backgroundImage: `url(${steps[currentStep].background})`,
              }"
            >
              <div class="journey__details">
                <p class="journey__step-title">
                  {{ steps[currentStep].title }}
                </p>
                <p class="journey__desc">
                  {{ steps[currentStep].description }}
                </p>
              </div>
              <div class="journey__divider">
                <div
                  class="journey__spacer"
                  :style="{
                    backgroundImage: `url(${steps[currentStep].backgroundCircle})`,
                  }"
                ></div>
                <img
                  class="journey__phone"
                  :src="steps[currentStep].phone"
                  alt="phone"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="article-card">
        <div class="article-content">
          <p class="article-text">
            Lorem ipsum dolor sit amet consectetur. Enim amet cras nec eget.
          </p>
          <button class="btn-read">Read article</button>
        </div>
      </div>

      <div class="pricing">
        <div class="pricing-header">
          <p>
            Explore our Pricing <br />
            and Benefits
          </p>
          <div class="pricing-line"></div>
          <button class="btn-see-all">See all</button>
        </div>

        <div class="pricing-list">
          <div class="pricing-item">
            <div class="pricing-content">
              <img
                src="../../assets/landlord/listImage2.png"
                alt="list image"
              />
              <p class="pricing-description">
                Customer Support at Your Fingertips: How to Reach Habeep Support
                Team
              </p>
            </div>
            <div class="pricing-content">
              <img
                src="../../assets/landlord/listImage2.png"
                alt="list image"
              />
              <p class="pricing-description">
                Customer Support at Your Fingertips: How to Reach Habeep Support
                Team
              </p>
            </div>
            <div class="pricing-content">
              <img
                src="../../assets/landlord/listImage2.png"
                alt="list image"
              />
              <p class="pricing-description">
                Customer Support at Your Fingertips: How to Reach Habeep Support
                Team
              </p>
            </div>
          </div>
          <div class="pricing-item">
            <div class="pricing-content">
              <img
                src="../../assets/landlord/listImage2.png"
                alt="list image"
              />
              <p class="pricing-description">
                Customer Support at Your Fingertips: How to Reach Habeep Support
                Team
              </p>
            </div>
            <div class="pricing-content">
              <img
                src="../../assets/landlord/listImage2.png"
                alt="list image"
              />
              <p class="pricing-description">
                Customer Support at Your Fingertips: How to Reach Habeep Support
                Team
              </p>
            </div>
            <div class="pricing-content">
              <img
                src="../../assets/landlord/listImage2.png"
                alt="list image"
              />
              <p class="pricing-description">
                Customer Support at Your Fingertips: How to Reach Habeep Support
                Team
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="app-download">
        <img
          src="../../assets/landlord/phonefooter.png"
          alt="phone"
          class="app-image"
        />

        <div class="app-info">
          <div class="app-text">
            <p class="app-title">Download the User App</p>
            <p class="app-description">
              Lorem ipsum dolor sit amet consectetur. Dolor sit amet
              consectetur.
            </p>
          </div>

          <div class="app-links">
            <a
              href="https://apps.apple.com/us/app/habeep/id6450388013"
              target="_blank"
              class="download-link"
            >
              <img
                src="../../assets/icons/download-app-apple.svg"
                alt="Download on Apple Store"
                class="download-icon"
              />
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=org.habeep"
              target="_blank"
              class="download-link"
            >
              <img
                src="../../assets/icons/download-app-google.svg"
                alt="Download on Google Play"
                class="download-icon"
              />
            </a>
          </div>
        </div>
      </div>

      <div class="footer-section" v-motion-fade>
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
          <div class="footer-habeep-divs2" v-motion-fade-visible>
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
        <div class="footer-copy-write" v-motion-roll-bottom>
          <span>&#x00A9;</span>
          <span style="font-size: large">{{ getCurrentYear() }} </span> Habeep
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media screen and (min-width: 1450px) {
  .main-container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }

  .mission {
    max-width: 100%;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
  }

  .mission-text {
    width: 1194px;
    height: 219px;
    font-family: Aeonik;
    font-size: 61.04px;
    font-weight: 700;
    line-height: 73px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  .download-links {
    width: 100%;
    display: flex;
    gap: 2.5rem;
    justify-content: center;
  }

  .download-icon {
    width: 250px;
    height: auto;
  }

  .landlord {
    width: 100%;
    height: 1334px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .landlord img {
    width: 1160.57px;
    height: 280px;
  }

  .landlord-container {
    width: 1240px;
    height: 798px;
    background-image: url("../../assets/landlord/landbg.png");
    border-radius: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    top: 13rem;
  }

  .landlord-container img {
    width: 375px;
    height: 737px;
    position: relative;
    top: -12rem;
  }
  .section-title {
    width: 312px;
    height: 292px;
    font-family: Aeonik;
    font-size: 61.04px;
    font-weight: 700;
    line-height: 73.25px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: white;
  }

  .benefit-item {
    width: 329px;
    height: 329px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .benefit-icon {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
  }

  .benefit-icon .icon {
    background-color: #1b9160;
    width: 30px;
    height: 30px;
  }

  .benefit-icon p {
    width: 286px;
    height: 56px;
    font-family: Aeonik;
    font-size: 23.04px;
    font-weight: 500;
    line-height: 27.65px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  .journey {
    width: 100%;
    height: 1076px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  .journey__title {
    max-width: 1027px;
    height: 146px;
    font-family: Aeonik;
    font-size: 61.04px;
    font-weight: 700;
    line-height: 73.25px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  .journey__steps {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2rem;
  }

  .journey__intro {
    width: 373px;
    height: 247px;
    gap: 37px;
    display: flex;
  }
  .journey__icon {
    display: inline-block;
    background: #d9d9d9;
    width: 50px;
    height: 50px;
  }

  .journey__text {
    width: 366px;
    height: 160px;
    font-size: 33.18px;
    font-weight: 700;
    line-height: 39.82px;
    color: #353742;
  }

  .journey__step {
    width: 900px;
    height: 667px;
    opacity: 0;
    transform: translateX(-100px);
    transition: all 0.5s ease-in-out;
  }

  .journey__step.animate {
    opacity: 1;
    transform: translateX(0);
  }

  .journey__step.fade-out {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
  .journey__number {
    width: 62px;
    height: 60px;
    top: 28px;
    left: 31px;
    padding: 16px 19px 16px 19px;
    border-radius: 20px;
    background: white;
    color: #1b9160;
    position: relative;
    z-index: 5;
    top: 4rem;
  }

  .journey__content {
    width: 900px;
    height: 667px;
    border-radius: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    position: relative;
  }

  .journey__details {
    width: 373px;
    height: 226px;
    top: 308px;
    left: 93px;
    gap: 34px;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 4rem;
  }

  .journey__step-title {
    width: 373px;
    height: 80px;
    font-family: Aeonik;
    font-size: 33.18px;
    font-weight: 700;
    line-height: 39.82px;
  }

  .journey__desc {
    width: 373px;
    height: 112px;
    font-family: Aeonik;
    font-size: 23.04px;
    font-weight: 400;
    line-height: 27.65px;
  }



  .journey__spacer {
    width: 480px;
    height: 666px;
    background-image: url("../../assets/landlord/bgcircle1.png");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    right: 0;
    top: 1px;
    border-radius: 0 30px 0 0;
    z-index: 1; 
  }

  .journey__phone {
    width: 250px;
    height: 594.96px;
    position: absolute;
    right: 0px;
    bottom: -2.7rem;
    z-index: 5;
    object-fit: contain;
  }

  .article-content {
    width: 1241px;
    height: 570px;
    top: 200px;
    left: 0px;
    border-radius: 30px;
    position: relative;
    background-image: url("../../assets/landlord/bgbutton.png");
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10rem;
  }

  .article-text {
    max-width: 953px;
    height: 114px;
    gap: 0px;
    opacity: 0px;

    font-family: Aeonik;
    font-size: 47.78px;
    font-weight: 500;
    line-height: 57.34px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  .btn-read {
    width: Hug (380px) px;
    height: Hug (108px) px;
    padding: 30px 80px 30px 80px;
    gap: 10px;
    border-radius: 30px;
    font-family: Aeonik;
    font-size: 39.81px;
    font-weight: 700;
    line-height: 47.77px;
    background: white;
    color: #eaaf72;
  }

  .pricing {
    width: 100%;
    height: 1942px;
    background-image: url("../../assets/landlord/bgprice.png");
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10rem;
  }

  .pricing-header {
    width: 1240.17px;
    height: 154.26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    position: relative;
  }

  .pricing-header p {
    width: 507.5px;
    height: 154.26px;
    font-family: Aeonik;
    font-size: 47.78px;
    font-weight: 700;
    line-height: 57.34px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  .pricing-line {
    width: 100%;
    max-width: 583.33px;
    background: white;
    height: 1%;
    position: absolute;
    bottom: 3rem;
    left: 20rem;
  }
  .btn-see-all {
    width: Fixed (234.17px) px;
    height: Fixed (113.05px) px;
    padding: 30px 80px 30px 80px;
    border-radius: 30px;
    color: black;
    font-family: Aeonik;
    font-size: 39.81px;
    font-weight: 700;
    line-height: 47.77px;
    text-align: left;
    background: white;
    text-wrap: nowrap;
  }

  .pricing-list {
    width: 1230px;
    height: 810.11px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .pricing-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  .pricing-content {
    width: 380px;
    height: 370px;
    gap: 13px;
    display: flex;
    flex-direction: column;
  }

  .pricing-content img {
    width: 380px;
    height: 243.11px;
    border-radius: 30px;
  }

  .pricing-description {
    width: 380px;
    height: 114px;
    font-family: Aeonik;
    font-size: 23.04px;
    font-weight: 400;
    line-height: 37.68px;
    color: white;
  }

  .footer-section {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;
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

  .app-download {
    width: 1239px;
    height: 575px;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    background: #e6e6e7;
    top: -12rem;
    background-image: url("../../assets/landlord/bgdown.png");
  }

  .app-download img {
    position: relative;
    bottom: -4.8rem;
  }
  .app-info {
    max-width: 530px;
  }

  .app-text {
    width: Fixed (530px) px;
    height: Hug (126px) px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .app-title {
    font-family: Aeonik;
    font-size: 38px;
    font-weight: 700;
    line-height: 45.6px;
  }

  .app-description {
    font-family: Aeonik;
    font-size: 27.65px;
    font-weight: 500;
    line-height: 33.18px;
    text-align: center;
  }

  .app-links {
    width: 534px;
    height: 72.22px;
    display: flex;
    justify-content: space-between;
  }
  .app-links a {
    width: 250px;
    height: 72.22px;
  }
}
@media screen and (max-width: 1450px) {
  .main-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }

  .mission {
    max-width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
  }

  .mission-text {
    max-width: 1194px;
    height: auto;
    font-family: Aeonik;
    font-size: 61.04px;
    font-weight: 700;
    line-height: 73.25px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  .download-links {
    width: 100%;
    display: flex;
    gap: 2.5rem;
    justify-content: center;
  }

  .download-icon {
    width: 200px;
    height: auto;
  }

  .landlord {
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .landlord-img {
    max-width: 1000px;
    height: 150px;
  }

  .landlord-container {
    width: 100%;
    max-width: 1000px;
    height: 400px;
    background-image: url("../../assets/landlord/landbg.png");
    border-radius: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    top: 13rem;
    gap: 2rem;
    padding: 0rem 1.5rem;
  }

  .landlord-container img {
    width: 250px;
    height: 440px;
    position: relative;
    top: -8rem;
  }
  .section-title {
    max-width: 230px;
    height: 100px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 700;
    line-height: 50px;
    text-align: center;
    display: flex;
    align-items: center;
    color: white;
  }

  .benefit-item {
    max-width: 300px;
    height: 329px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .benefit-icon {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 0.8rem;
  }

  .benefit-icon .icon {
    background-color: #1b9160;
    width: 20px;
    height: 20px;
  }

  .benefit-icon p {
    max-width: 206px;
    height: 56px;
    font-family: Aeonik;
    font-size: 20px;
    font-weight: 500;
    line-height: 27px;
  }

  .journey {
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  .journey__title {
    max-width: 800px;
    height: 146px;
    font-family: Aeonik;
    font-size: 50px;
    font-weight: 700;
    line-height: 70px;
    text-align: center;
  }

  .journey__steps {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .journey__intro {
    max-width: 500px;
    height: 247px;
    gap: 37px;
    display: flex;
    flex-direction: column;
    position: relative;
    left: 2rem;
  }
  .journey__icon {
    display: inline-block;
    background: #d9d9d9;
    width: 30px;
    height: 30px;
  }

  .journey__text {
    max-width: 300px;
    height: 160px;
    font-size: 30px;
    font-weight: 700;
    line-height: 39px;
    color: #353742;
  }

  .journey__step {
    width: 750px;
    height: 500px;
    opacity: 0;
    transform: translateX(-100px);
    transition: all 0.5s ease-in-out;
  }

  .journey__step.animate {
    opacity: 1;
    transform: translateX(0);
  }

  .journey__step.fade-out {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .journey__number {
    width: 42px;
    height: 50px;
    top: 28px;
    left: 31px;
    padding: 16px;
    border-radius: 20px;
    background: white;
    color: #1b9160;
    position: relative;
    z-index: 5;
    top: 4rem;
  }

  .journey__content {
    max-width: 750px;
    height: 500px;
    border-radius: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    position: relative;
    top: -24px;
  }

  .journey__details {
    max-width: 300px;
    height: 226px;
    top: 170px;
    left: 43px;
    gap: 34px;
    display: flex;
    flex-direction: column;
    position: absolute;
  }

  .journey__step-title {
    max-width: 300px;
    height: 80px;
    font-family: Aeonik;
    font-size: 30px;
    font-weight: 700;
    line-height: 35px;
  }

  .journey__desc {
    max-width: 373px;
    height: 112px;
    font-family: Aeonik;
    font-size: 22px;
    font-weight: 400;
    line-height: 27.65px;
  }

  /* .journey__divider {
  } */

  .journey__spacer {
    width: 365px;
    height: 500px;
    background-image: url("../../assets/landlord/bgcircle1.png");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    right: 0;
    top: -2px;
    border-radius: 0 30px 0 0;
    z-index: 1;
  }

  .journey__phone {
    width: 200px;
    height: 500px;
    position: absolute;
    right: -1px;
    bottom: -2.99rem;
    z-index: 5;
    object-fit: contain;
  }
  .article-crad {
    max-width: 100%;
    height: auto;
  }
  .article-content {
    max-width: 1241px;
    height: 440px;
    top: 150px;
    left: 0px;
    border-radius: 30px;
    position: relative;
    background-image: url("../../assets/landlord/bgbutton.png");
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
  }

  .article-text {
    max-width: 953px;
    height: 114px;
    gap: 0px;
    opacity: 0px;

    font-family: Aeonik;
    font-size: 47.78px;
    font-weight: 500;
    line-height: 57.34px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    padding: 0px 30px;
  }

  .btn-read {
    width: 380px;
    height: 108px;
    padding: 30px;
    border-radius: 30px;
    font-family: Aeonik;
    font-size: 37px;
    font-weight: 700;
    line-height: 45px;
    background: white;
    color: #eaaf72;
  }

  .pricing {
    width: 100%;
    height: 1942px;
    background-image: url("../../assets/landlord/bgprice.png");
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0rem 2rem;
    gap: 10rem;
  }

  .pricing-header {
    width: 100%;
    max-width: 1100px;
    height: 154.26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    position: relative;
  }

  .pricing-header p {
    width: 400px;
    height: 130px;
    font-family: Aeonik;
    font-size: 45px;
    font-weight: 700;
    line-height: 50px;
  }

  .pricing-line {
    width: 100%;
    max-width: 500px;
    background: white;
    height: 1%;
    position: absolute;
    bottom: 3rem;
    left: 20rem;
  }
  .btn-see-all {
    width: 234px;
    height: 100px;
    padding: 30px;
    border-radius: 30px;
    color: black;
    font-family: Aeonik;
    font-size: 39.81px;
    font-weight: 700;
    line-height: 47.77px;
    text-align: center;
    background: white;
    text-wrap: nowrap;
  }

  .pricing-list {
    max-width: 1230px;
    height: 810.11px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .pricing-item {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  .pricing-content {
    width: 300px;
    height: 370px;
    gap: 13px;
    display: flex;
    flex-direction: column;
  }

  .pricing-content img {
    width: 300px;
    height: 240px;
    border-radius: 30px;
  }

  .pricing-description {
    width: 300px;
    height: 114px;
    font-family: Aeonik;
    font-size: 23.04px;
    font-weight: 400;
    line-height: 37.68px;
    color: white;
  }

  .footer-section {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;
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

  .app-download {
    width: 100%;
    max-width: 1100px;
    height: 500px;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    background: #e6e6e7;
    top: -10rem;
    background-image: url("../../assets/landlord/bgdown.png");
  }

  .app-download img {
    position: relative;
    bottom: -2.5rem;
  }
  .app-info {
    max-width: 500px;
  }

  .app-text {
    width: Fixed (530px) px;
    height: Hug (126px) px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .app-title {
    font-family: Aeonik;
    font-size: 38px;
    font-weight: 700;
    line-height: 45.6px;
  }

  .app-description {
    font-family: Aeonik;
    font-size: 27.65px;
    font-weight: 500;
    line-height: 33.18px;
    text-align: left;
  }

  .app-links {
    width: 534px;
    height: 72.22px;
    display: flex;
  }
  .app-links a {
    width: 250px;
    height: 72.22px;
  }
}

@media screen and (max-width: 1300px) and (min-width: 1100px) {
  .main-container {
    max-width: 1200px;
    padding: 0 1.5rem;
  }

  .mission-text {
    width: 100%;
    font-size: 50px;
    line-height: 60px;
  }

  .download-links {
    gap: 2rem;
  }

  .landlord-container {
    max-width: 900px;
    height: 350px;
    gap: 1.5rem;
  }

  .journey__title {
    font-size: 40px;
    line-height: 55px;
  }

  .journey__content {
    max-width: 700px;
    height: 450px;
  }
  .journey__spacer {
    width: 300px;
    height: 450px;
  }
  .journey__phone {
    width: 230px;
    height: 350px;
    top: 6.2rem;
    right: -1.8rem;
  }

  .pricing-header p {
    font-size: 40px;
  }

  .pricing-content {
    width: 280px;
    height: 350px;
  }

  .btn-see-all {
    font-size: 35px;
    padding: 25px;
  }

  .footer-copy-write {
    font-size: 18px;
  }

  .app-title {
    font-size: 34px;
  }

  .app-description {
    font-size: 24px;
    line-height: 30px;
  }
}

@media screen and (max-width: 1099px) and (min-width: 800px) {
  .section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }

  .mission {
    max-width: 100%;
    height: 500px;
  }

  .mission-text {
    font-size: 51.04px;
    font-weight: 600;
    line-height: 60px;
  }

  .download-links {
    gap: 2rem;
  }

  .download-icon {
    width: 170px;
  }

  .landlord {
    height: 800px;
  }

  .landlord-img {
    max-width: 600px;
    height: 90px;
  }

  .landlord-container {
    height: 400px;
    top: 8rem;
    display: flex;
    justify-content: space-between;
    padding: 0rem 1.5rem;
  }

  .landlord-container img {
    width: 150px;
    height: 300px;
    top: -8rem;
  }
  .section-title {
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    line-height: 40px;
  }

  .benefit-item {
    width: 100%;
    height: 329px;
  }

  .benefit-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
  }

  .benefit-icon .icon {
    width: 30px;
    height: 20px;
  }

  .benefit-icon p {
    width: 206px;
    height: 56px;
    font-size: 18px;
    font-weight: 500;
  }

  .journey {
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  .journey__title {
    width: 100%;
    height: 146px;
    font-size: 40px;
    font-weight: 700;
    line-height: 50px;
  }

  .journey__steps {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
  }

  .journey__intro {
    width: 100%;
    height: 250px;
    gap: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: row;
    position: relative;
    left: 1rem;
  }

  .journey__text {
    width: 100%;
    height: 100px;
    font-size: 25px;
    line-height: 30px;
    color: #353742;
  }

  .journey__step {
    width: 100%;
    max-width: 650px;
    max-height: 500px;
    justify-content: center;
    align-items: center;
  }
  .journey__number {
    top: 30px;
    left: 31px;
    padding: 12px;
  }

  .journey__spacer {
    width: 300px;
    height: 400px;
  }

  .article-content {
    max-width: 600px;
    height: 350px;
    top: 150px;
    left: 0px;
  }

  .article-text {
    width: 100%;
    height: auto;
    font-size: 34px;
    font-weight: 500;
    line-height: 40px;
  }

  .btn-read {
    width: 300px;
    height: 100px;
    font-size: 30px;
  }

  .pricing {
    width: 100%;
    height: 1942px;
    gap: 10rem;
  }

  .pricing-header p {
    font-size: 35px;
  }

  .pricing-line {
    display: none;
  }

  .btn-see-all {
    width: 234px;
    padding: 10px;
    font-size: 34px;
    line-height: 40px;
  }

  .pricing-list {
    width: 100%;
    max-height: 1000px;
    justify-content: space-around;
  }

  .pricing-content {
    width: 180px;
    height: auto;
    gap: 10px;
  }

  .pricing-content img {
    width: 100%;
    height: 180px;
  }

  .pricing-description {
    width: 100%;
    height: auto;
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
  }

  .app-download {
    width: 100%;
    max-width: 600px;
    height: 500px;
  }

  .app-download img {
    position: relative;
    bottom: -7rem;
    width: 200px;
  }
  .app-info {
    max-width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .app-text {
    width: 100%;
    height: 126px;
    text-align: center;
  }

  .app-title {
    font-family: Aeonik;
    font-size: 33px;
    font-weight: 700;
    line-height: 45.6px;
  }

  .app-description {
    width: 100%;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    text-align: center;
  }

  .app-links {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .app-links a {
    width: 150px;
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

@media screen and (max-width: 800px) and (min-width: 550px) {
  .mission {
    max-width: 100%;
    height: 300px;
  }

  .mission-text {
    font-size: 30px;
    line-height: 35px;
  }

  .download-links {
    gap: 2rem;
  }

  .download-icon {
    width: 100px;
  }

  .landlord {
    height: 750px;
  }

  .landlord-img {
    max-width: 600px;
    height: 70px;
  }

  .landlord-container {
    height: 700px;
    top: 4rem;
    display: flex;
    flex-direction: column;
    border-radius: 0px;
    background: #0b1f6b;
  }

  .landlord-container img {
    width: 150px;
    height: 300px;
    top: -5rem;
  }
  .section-title {
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    position: absolute;
    bottom: 17rem;
  }

  .benefit-item {
    width: 100%;
    height: auto;
  }

  .benefit-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .benefit-icon .icon {
    width: 30px;
    height: 20px;
  }

  .benefit-icon p {
    width: 206px;
    height: 56px;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    align-content: center;
  }

  .journey {
    width: 100%;
    height: 800px;
    position: relative;
    top: 5rem;
  }
  .journey__title {
    width: 100%;
    height: auto;
    font-size: 35px;
    font-weight: 600;
    line-height: 40px;
  }

  .journey__steps {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
  }

  .journey__intro {
    width: 100%;
    height: auto;
    gap: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    align-content: center;
    flex-direction: row;
    position: relative;
    left: 1rem;
  }

  .journey__text {
    width: 100%;
    height: 100px;
    font-size: 25px;
    line-height: 30px;
    color: #353742;
  }

  .journey__step {
    width: 100%;
    max-width: 650px;
    max-height: 500px;
    justify-content: center;
    align-items: center;
  }
  .journey__number {
    top: 30px;
    left: 31px;
    padding: 7px;
  }
  .journey__details {
    left: 1.5rem;
    gap: 0px;
  }
  .journey__step-title {
    max-width: 210px;
    font-size: 22px;
    line-height: 23px;
    align-content: center;
  }
  .journey__desc {
    max-width: 210px;
    font-size: 18px;
    line-height: 22px;
  }
  .journey__spacer {
    width: 250px;
    height: 400px;
  }
  .journey__phone {
    width: auto;
    height: 300px;
    bottom: 0rem;
    right: 0rem;
  }

  .article-content {
    max-width: 400px;
    height: 300px;
    top: 130px;
  }

  .article-text {
    width: 100%;
    height: auto;
    font-size: 30px;
    font-weight: 500;
    line-height: 30px;
  }

  .btn-read {
    width: 200px;
    height: 60px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pricing {
    width: 100%;
    height: 1500px;
    gap: 10rem;
  }
  .pricing-header {
    height: auto;
  }
  .pricing-header p {
    font-size: 25px;
    line-height: 26px;
    height: auto;
  }

  .pricing-line {
    display: none;
  }

  .btn-see-all {
    width: 200px;
    height: 60px;
    padding: 10px;
    font-size: 24px;
    line-height: 40px;
  }

  .pricing-list {
    width: 100%;
    max-height: 700px;
    justify-content: space-around;
  }
  .pricing-item:nth-child(1) {
    display: none;
  }
  .pricing-content {
    width: auto;
    height: auto;
    gap: 10px;
  }

  .pricing-content img {
    width: 100%;
    height: 180px;
  }

  .pricing-description {
    width: 100%;
    height: auto;
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
  }

  .app-download {
    width: 450px;
    height: 600px;
    top: -5rem;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-evenly;
  }

  .app-download img {
    position: relative;
    bottom: -3rem;
    width: 200px;
  }
  .app-info {
    width: 100%;
    height: auto;
  }

  .app-text {
    width: 100%;
    height: auto;
    text-align: center;
  }

  .app-title {
    font-size: 30px;
    font-weight: 700;
    line-height: 40px;
  }

  .app-description {
    width: 100%;
    padding: 0rem 1rem;
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
  }
  .download-link {
    display: flex;
    justify-content: flex-end;
  }
  .app-links {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .app-links a {
    width: 100px;
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

@media screen and (max-width: 550px) {
  .main-container {
    width: 100%;
    padding: 0rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .section {
    margin-bottom: 0px;
  }
  .mission {
    max-width: 375px;
    height: 700px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }
  .mission-text {
    max-width: 299px;
    height: auto;
    font-family: Aeonik;
    font-size: 36px;
    font-weight: 700;
    line-height: 48px;
    text-align: center;
  }

  .download-links {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }
  .download-icon a {
    width: 250px;
    height: 72.22px;
  }

  .landlord {
    width: 100%;
    height: auto;
    margin: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .landlord-img {
    display: none;
  }

  .landlord-container {
    width: 100%;
    height: 917px;
    border: none;
    border-radius: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-repeat: repeat;
    background-position: center;
  }

  .landlord img {
    width: 250px;
    height: 491.33px;
    top: -13em;
    left: 0px;
    position: relative;
  }
  .section-title {
    max-width: 359px;
    height: 66px;
    font-family: Aeonik;
    font-size: 27.65px;
    font-weight: 700;
    line-height: 33.18px;
    text-align: center;
    position: relative;
    bottom: -28rem;
  }
  .benefit-item {
    width: 100%;
    max-width: 331px;
    height: 289px;
    position: relative;
    top: -3rem;
  }

  .benefit-icon {
    max-width: 331px;
    height: 46px;
    opacity: 0px;
  }

  .benefit-icon p {
    width: 281px;
    height: 46px;
    font-family: Aeonik;
    font-size: 19.2px;
    font-weight: 500;
    line-height: 23.04px;
    text-align: left;
  }

  .journey {
    width: 100%;
    height: 1300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    position: relative;
    top: 20rem;
  }
  .journey__title {
    max-width: 330px;
    height: 129px;
    font-family: Aeonik;
    font-size: 36px;
    font-weight: 700;
    line-height: 43.2px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
  .journey__steps {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    top: -20rem;
  }
  .journey__intro {
    width: 100%;
    max-width: 331px;
    height: 199px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    left: 0px;
  }
  .journey__icon {
    width: 30px;
    height: 30px;
  }

  .journey__text {
    width: 100%;
    max-width: 331px;
    height: 132px;
    font-family: Aeonik;
    font-size: 27.65px;
    font-weight: 700;
    line-height: 33.18px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  .journey__step {
    /* width: 100%; */
    max-width: 375px;
    height: 934px;
  }

  .journey__content {
    width: 375px;
    height: 934px;
    border: none;
    border-radius: 0px;
    background-position: center;
    background-repeat: repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .journey__details {
    max-width: 257px;
    height: 231px;
  }

  .journey__step-title {
    width: 257px;
    height: 99px;
    font-family: Aeonik;
    font-size: 27.65px;
    font-weight: 700;
    line-height: 33.18px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
  .journey__desc {
    width: 257px;
    height: 108px;
    font-family: Aeonik;
    font-size: 19.2px;
    font-weight: 400;
    line-height: 23.04px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
  .journey__spacer {
    width: 68px;
    height: 650px;
  }

  .journey__divider {
    width: 100%;
    max-width: 375px;
    height: 500px;
    position: relative;
    bottom: -12rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .journey__spacer {
    width: 100%;
    max-width: 380px;
    height: 380px;
    top: 12rem;
    right: 12rem;
    background-position: center;
    background-repeat: repeat;
    display: none;
    transform: rotate(90deg);
    transform-origin: right center; 
    transition: transform 0.5s ease; 
  }

  .journey__phone {
    width: 250px;
    max-height: 455px;
    object-fit: contain;
    position: relative;
  }
  .article-card {
    max-width: 331px;
    height: 383px;
    position: relative;
    top: 22rem;
    z-index: 5;
  }

  .article-content {
    max-width: 285px;
    height: 237px;
    color: white;
  }
  .article-text {
    max-width: 285px;
    height: auto;
    font-family: Aeonik;
    font-size: 25px;
    font-weight: 700;
    line-height: 28px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
  .btn-read {
    width: 171px;
    height: 50px;
    padding: 11px 30px;
    border-radius: 12px;
    font-family: Aeonik;
    text-wrap: nowrap;
    text-align: center;
    font-size: 19.2px;
    font-weight: 700;
    line-height: 25px;
    letter-spacing: -0.009999999776482582px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  .pricing {
    width: 100%;
    /* max-width: 375px; */
    height: 1774px;
    position: relative;
    top: 260px;
    left: 0px;
    right: 0px;
    border: none;
    border-radius: 0px;
  }
  .pricing-header {
    width: 100%;
    height: auto;
    display: flex;
    text-align: center;
    position: relative;
    top: 3rem;
  }
  .pricing-header p {
    font-family: "Aeonik";
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 43px;
    text-transform: capitalize;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .pricing-line {
    display: none;
  }
  .btn-see-all {
    position: absolute;
    bottom: -86rem;
    left: 5rem;
    width: 171px;
    height: 50px;
    padding: 11px;
    border-radius: 12px;
    text-align: center;
    text-wrap: nowrap;
    font-family: Aeonik;
    font-size: 19.2px;
    font-weight: 700;
    line-height: 25px;
    letter-spacing: -0.009999999776482582px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  .pricing-list {
    max-width: 331px;
    height: 1052px;
  }
  .pricing-item:nth-child(1) {
    display: none;
  }
  .pricing-list {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .pricing-content {
    width: 331px;
    /* height: 312px; */
    gap: 14px;
  }

  .pricing-content img {
    width: 331px;
    height: 211.76px;
    border-radius: 20px;
  }
  .pricing-description {
    max-width: 308px;
    height: 87px;
    font-family: Aeonik;
    font-size: 19.2px;
    font-weight: 400;
    line-height: 28.8px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
  .app-download {
    width: 331px;
    height: 877px;
    position: relative;
    top: 380px;
    border-radius: 30px;
    display: flex;
    justify-content: space-around;
    flex-direction: column-reverse;
  }
  .app-info {
    max-width: 263px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .app-text {
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .app-text .app-title {
    width: 179px;
    height: 58px;
    font-family: Aeonik;
    font-size: 24px;
    font-weight: 700;
    line-height: 28.8px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  .app-description {
    width: 263px;
    height: 34px;
    font-family: Aeonik;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.8px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
  .app-links {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .app-links .download-icon {
    width: 250px;
    height: 72.22px;
  }
  .app-image {
    width: 250px;
    height: 408px;
    border-radius: 30px;
    position: absolute;
    top: 3.6rem;
  }

  .footer-section {
    width: 100%;
    max-width: 375px;
    height: 400px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding: 0rem 1rem;
    gap: 1rem;
    position: relative;
    top: 25rem;
    margin-bottom: 3rem;
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
    margin-bottom: -2rem;
    position: relative;
    left: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer-habeep .footer-habeep-divs1 div,
  .footer-habeep .footer-habeep-divs2 div {
    background: none;
    width: 164px;
    height: 54px;
    font-family: Aeonik;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
  .footer-habeep-divs1 {
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1px;
  }

  .footer-habeep-divs1 div:nth-child(1) a {
    position: relative;
    bottom: -3rem;
  }
  .footer-habeep-divs2 {
    height: 100px;
  }

  .footer-habeep-divs2 a {
    width: 164px;
    height: 50px;
    font-family: Aeonik;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    position: relative;
    left: 6rem;
  }

  .footer-habeep-divs2 div:nth-child(1) a {
    position: relative;
    bottom: -1.5rem;
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
