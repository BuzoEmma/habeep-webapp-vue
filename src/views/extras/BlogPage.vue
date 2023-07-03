<template>
    <div class="w-screen min-w-full flex flex-col items-center bg-white h-full min-h-screen overflow-y-auto">
        <HomeNavbar />

        <div class="flex-col flex w-full items-center h-fit  gap-y-5 pt-16">
            <Skeleton class="lg:w-3/5 md:w-4/5 w-11/12 md:h-24 h-20" v-if="fetchingBlog || blog.title.length === 0" />
            <h1 v-else class="md:text-6xl text-4xl lg:w-3/5 md:w-4/5 w-full px-4 text-center text-black bacasime font-bold">
                {{
                    blog.title }}</h1>

            <Skeleton class="lg:w-3/6 md:w-3/5 w-11/12 md:h-24 h-12 " v-if="fetchingBlog || blog.subtitle.length === 0" />
            <h3 v-else class="md:text-xl monserrat text-black font-thin lg:w-3/5 md:w-4/5 w-full px-4 text-center">{{
                blog.subtitle
            }}</h3>

            <Skeleton class="w-full blog-image" v-if="fetchingBlog || !blog.imageLoaded" />
            <img :src="blog.imageCover" @load="blog.imageLoaded = true"
                :class="{ 'hidden': !blog.imageLoaded || fetchingBlog }"
                class="blog-image mt-10 w-full object-cover object-center" alt="">
        </div>

        <div class="flex flex-col w-full sm:w-5/6 md:w-3/5 items-center h-fit mt-5 px-4 pb-16"
            v-if="!fetchingBlog && blog.content.length > 0">
            <div class="border-t-2 border-t-black w-full gap-4 py-5 justify-between md:flex-row flex-col flex items-center">
                <div class="flex-row-center w-full gap-x-3">
                    <img src="../../assets//icons/logo-mini.svg" alt="" class="h-14 w-14 rounded-full">
                    <div class="flex-col flex items-start text-black">
                        <span class="uppercase text-lg font-bold">{{ blog.username }}</span>
                        <span class="text-sm text-normal">{{ moment(blog.createdAt).format('MMM DD, YYYY') }} . 2 min
                            read</span>
                    </div>
                </div>

                <div class="flex-row-center justify-start md:mt-0 mt-4 md:justify-end w-full">
                    <a href="https://twitter.com/habeepng" target="_blank" class="cursor-pointer">
                        <div class="social-media-box grid place-items-center px-10">
                            <img src="../../assets/icons/fb.svg" alt="Facebook page link">
                        </div>
                    </a>
                    <a href="https://twitter.com/habeepng" target="_blank" class="cursor-pointer">
                        <div class="social-media-box grid place-items-center px-10">
                            <img src="../../assets/icons/twitter.svg" alt="twitter page">
                        </div>
                    </a>
                    <a href="https://twitter.com/habeepng" target="_blank" class="cursor-pointer">
                        <div class="social-media-box grid place-items-center px-10">
                            <img src="../../assets/icons/whatsapp.svg" alt="whatsapp link">
                        </div>
                    </a>
                </div>
            </div>

            <div class="mt-10 content w-full text-black text-xl flex flex-col items-start">
                <v-md-preview :text="blog.content" class="text-left text-black text-xl  w-full"></v-md-preview>
            </div>


            <div class="mt-10 flex flex-col items-start text-black text-xl w-full">
                <span class="font-thin montserrat">Thanks for reading,</span>
                <span class="font-bold">{{ blog.username }}</span>
            </div>
        </div>

        <div class="flex flex-col w-full sm:w-5/6 md:w-3/5 items-center h-fit mt-5 px-4 pb-16" v-else>
            <div class="border-t-2 border-t-black w-full gap-4 py-5 justify-between md:flex-row flex-col flex items-center">
                <div class="flex-row-center w-full gap-x-3">
                    <Skeleton :type="'circle'" class="w-14 h-14" />
                    <div class="flex-col w-5/6 gap-y-1 flex items-start text-black">
                        <Skeleton class="w-4/5 h-4" />
                        <Skeleton class="w-3/5 h-3" />
                    </div>
                </div>

                <div class="flex-row-center justify-start md:mt-0 mt-4 md:justify-end w-full">
                    <Skeleton class="w-3/5 h-11" />
                </div>
            </div>

            <div class="mt-10 content w-full text-black text-xl flex flex-col items-start">
                <Skeleton class="w-full" style="height: 300px" />
            </div>


            <div class="mt-10 flex flex-col gap-y-1 items-start text-black text-xl w-full">
                <Skeleton class="w-56 h-4" />
                <Skeleton class="w-48 h-3" />
            </div>
        </div>
    </div>
</template>

<script setup>
import HomeNavbar from '../../components/HomeNavbar.vue'
import { ref } from 'vue'
import axios from '../../composables/axios.js'
import moment from 'moment'
import { useRoute } from 'vue-router'

const route = useRoute()
import { useHead } from '@vueuse/head'


const fetchingBlog = ref(false)
const blog = ref({
    title: '',
    content: '',
    subtitle: '',
    createdAt: '',
    imageCover: '',
    username: 'Habeep',
    imageLoaded: false
})

useHead({
    title: 'Habeep | Blog Page'
})

async function fetchBlog() {
    try {
        fetchingBlog.value = true
        const fetchBlog = await axios.get('/articles/blog/fetch/' + route.params.id)
        blog.value = fetchBlog.data.data

        useHead({
            title: 'Habeep | Blog - ' + blog.value.title,
            meta: [
                { charset: 'utf-8' },
                { name: 'description', content: blog.value.subtitle },
                { name: 'og:title', content: blog.value.title },
                { name: 'og:image', content: blog.value.imageCover },
                { name: 'og:url', content: 'https://habeep.org/blog/' + route.params.id },
                { name: 'og:website', content: 'website' },
                { name: 'og:description', content: blog.value.subtitle },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            link: [
                { rel: 'icon', href: blog.value.imageCover },
                { rel: 'shortcut icon', href: blog.value.imageCover },
                { rel: 'apple-touch-icon', href: blog.value.imageCover }
            ],
        })

        // set google seo
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": blog.value.title,
            "image": [blog.value.imageCover],
            "datePublished": blog.value.createdAt,
            "dateModified": blog.value.createdAt,
            "author": [{
                "@type": "Person",
                "name": "Habeep",
                "url": "https://habeep.org/Habeep",
                "jobTitle": "Company"
            }]
        }

        const script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);

        setTimeout(() => {
            fetchingBlog.value = false
        }, 1000);
    } catch (error) {
        fetchingBlog.value = false
    }
}
fetchBlog()

</script>

<style scoped>
.blog-image {
    height: 500px !important;
}

.social-media-box {
    border-radius: 4px;
    border: 1px solid #EAEAEA;
    background: #FFF;
    height: 44px;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.08);
}

@media screen and (max-width: 425px) {
    .blog-image {
        height: 240px !important;
    }
}
</style>