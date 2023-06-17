<template>
    <div class="w-screen relative min-w-full flex flex-col items-center bg-white h-screen min-h-full overflow-y-auto no-scroll-btn">

        <div class="top-details h-1/5 flex-col-center py-4 w-screen bg-primary">
            <div class="flex flex-col items-center w-5/6 xl:w-4/5 2xl:w-4/6 gap-y-10">
                <div class="flex-row-center w-full justify-between">
                    <img class="cursor-pointer" @click="$router.push('/')" src="../../assets/icons/habeep-logo-white.svg" alt="">
                    <img class="cursor-pointer" src="../../assets/icons/gotohabeep.svg" @click="$router.push('/feeds')" alt="">
                </div>

                <div class="flex-row-center h-fit w-full relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 text-white absolute left-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                    <input type="text" placeholder="Search for articles"
                        class="rounded-lg h-14 w-full placeholder:text-white placeholder:text-lg pl-14 text-white"
                        style="background: rgba(255, 255, 255, 0.3)">
                </div>
            </div>
        </div>

        <div class="h-fit w-full py-20 flex-col-center">
            <div class="w-5/6 xl:w-4/5 2xl:w-4/6 gap-y-10 flex flex-col items-center">

                <div @click="selectCollection(collection)" v-for="collection in collections" :key="collection" class="article cursor-pointer flex flex-col md:flex-row items-start md:items-center w-full h-fit p-5 gap-x-10 gap-y-8">
                    <img src="../../assets/icons/book.svg" alt="">

                    <div class="flex flex-col w-fit h-full justify-between gap-y-3">
                        <p class="flex-col flex w-fit gap-y-1">
                            <span class="text-webapp text-lg md:text-xl font-medium">Frequently Asked Questions</span>
                            <span class="text-sub-webapp text-sm md:text-lg">Learn more about us and get to know us better</span>
                        </p>

                        <div class="flex-row-center gap-x-2 w-fit">
                            <img src="../../assets/icons/habeep-small-logo.svg" alt="">

                            <p class="flex-col flex w-fit gap-y-1">
                                <span class="text-sub-webapp text-sm">1 article in this collection</span>
                                <span class="text-sub-webapp text-sm">Written by: <strong class="text-webapp">HABEEP SUPPORT</strong></span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- footer -->
        <div class="footer w-full sm:5/6 md:w-4/5 lg:w-3/5 flex  flex-col items-center justify-center text-center mt-3 gap-y-5 ">
            <div class="info">
                <p class="font-bold text-white text-3xl sm:text-4xl">Join our Habeep community</p>
                <p class="hero-subtitle-trans text-white">Stay in touch with the latest news and releases</p>
            </div>
            <div class="social-links flex flex-row gap-x-3">
                <a href="#" class="link">
                    <div class="bg-white h-10 w-10 sm:h-12 sm:w-12 grid-center" style="border-radius: 50%"><img
                            src="../../assets/images/socials/twitter.svg" alt=""></div>
                </a>
                <a href="#" class="link">
                    <div class="bg-white h-10 w-10 sm:h-12 sm:w-12 grid-center" style="border-radius: 50%"><img
                            src="../../assets/images/socials/insta.svg" alt=""></div>
                </a>
                <a href="#" class="link">
                    <div class="bg-white h-10 w-10 sm:h-12 sm:w-12 grid-center" style="border-radius: 50%"><img
                            src="../../assets/images/socials/fb.svg" alt=""></div>
                </a>
                <a href="#" class="link">
                    <div class="bg-white h-10 w-10 sm:h-12 sm:w-12 grid-center" style="border-radius: 50%"><img
                            src="../../assets/images/socials/telegram.svg" alt=""></div>
                </a>
                <a href="#" class="link">
                    <div class="bg-white h-10 w-10 sm:h-12 sm:w-12 grid-center" style="border-radius: 50%"><img
                            src="../../assets/images/socials/tiktok.svg" alt=""></div>
                </a>


            </div>
        </div>

        <div class="flex flex-row items-center gap-x-4 mt-24 z-20 mb-8">
            <router-link to="/terms-of-service" class="underline text-webapp">Terms of service</router-link>
            <router-link to="/listings/search?name=Houses" class="underline text-webapp">Products</router-link>
            <router-link to="/help" class="underline text-webapp">Help</router-link>
        </div>


        <div class="fixed z-20 right-0 bottom-0  md:top-1/2">
            <a href="mailto:help@habeep.org?subject=I have an enquiry to make?" target="blank">
                <img class="cursor-pointer" src="../../assets/icons/send-mail.svg" alt="">
            </a>
        </div>

    </div>
</template>

<script setup>

const collections = ['FAQ', 'HBp']

import { useHead } from '@vueuse/head'
useHead({
  title: 'Habeep - Help',
  meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'Have an Issue and want to learn more about Habeep? Visit our help page to learn more' },

      { name: 'og:title', content: 'Frequently asked Question' },
      { name: 'og:image', content: 'https://i.ibb.co/BnG8VLy/logo-white.png' },
      { name: 'og:url', content: 'https://habeep.org/help' },
      { name: 'og:website', content: 'website' },
      { name: 'og:description', content: 'Have an Issue and want to learn more about Habeep? Visit our help page to learn more' },
      { name: 'canonical', content: 'https://habeep.org/help' },

      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
})

function selectCollection(collection) {
    console.log(collection)
}

</script>

<style scoped>
.footer {
    background: url('../../assets/images/socials/bg-footer.svg');
    background-size: cover;
    box-shadow: 0px 6px 14px -6px rgba(24, 39, 75, 0.07), 0px 10px 32px -4px rgba(24, 39, 75, 0.05);
    border-radius: 15px;
    min-height: 370px !important;

}

@media screen and (max-width: 450px) {
    .footer {
        background: #1B49FF;
        border-radius: 0;
    }
}

.article {
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    box-shadow: 0px 6px 14px -6px rgba(24, 39, 75, 0.07), 0px 10px 32px -4px rgba(24, 39, 75, 0.05);
    border-radius: 15px;
    min-height: 170px;
}
</style>