<template>
    <div class="product-share w-full h-full absolute flex flex-col items-center md:justify-center justify-end z-50 overflow-hidden backdrop-blur-md bg-black bg-opacity-10"
        v-if="onProductShare === true">
        <ShareModal class="md:flex hidden" v-motion-fade :product="product" @end-share="onProductShare = false" />
        <ShareModal class="flex md:hidden" v-motion-slide-bottom :product="product" @end-share="onProductShare = false" />
    </div>


    <div v-if="!onImageViewer"
        class="w-screen min-w-full flex flex-col items-center bg-white h-full min-h-screen overflow-y-auto scroll-smooth"
        @resize="changeWidth" :class="{ 'overflow-y-hidden h-screen': onProductShare }">
        <MainNavbar v-if="(screenWidth > 767)" />

        <loader :letters="['H', 'A', 'B', 'E', 'E', 'P']" v-if="!processingProduct || !product.price" class="m-auto"
            size="200px" color="#0A1045"></loader>
        <div v-else
            class="body px-0 2xl:px-44 xl:px-20 mb-16 w-full flex flex-col h-fit items-center pb-10 md:items-start gap-y-8 mt-0">

            <!-- product display images for desktop view -->
            <div class="product-img-grid desktop-view xl:flex flex-row items-center w-full mt-10 hidden">
                <div class="relative h-full display-img w-1/2" v-if="carouselImg.link">
                    <Skeleton v-if="!carouselImg.imageLoaded" class=" w-full h-full rounded-lg" style="width: 100%" />
                    <img :src="carouselImg.link" class=" h-full rounded-lg feed-image w-full"
                        @load="carouselImg.imageLoaded = true" :class="{ 'hidden': !carouselImg.imageLoaded }"
                        v-if="carouselImg.link.toString().includes('.mp4') == false" @click="enterImageViewer()"
                        :alt="product.title">
                    <video :poster="carouselImg.thumbnail" :src="carouselImg.link" @click="enterImageViewer()" loop
                        @loadedmetadata="carouselImg.imageLoaded = true" :class="{ 'hidden': !carouselImg.imageLoaded }"
                        class="w-full h-full rounded-lg feed-image" :alt="product.title" v-else autoplay muted></video>

                    <div class="w-full absolute flex flex-row top-5 items-center justify-between px-2">
                        <img src="../../assets/icons/back-img.svg" @click="$router.go(-1)" class="cursor-pointer" alt="">
                        <div class="flex flex-row gap-x-3 items-center">
                            <img @click="startProductShare" src="../../assets/icons/share.svg" class="cursor-pointer"
                                alt="">
                            <div class="grid place-items-center relative p-1" v-if="$store.state.isAuthenticated">
                                <img src="../../assets/icons/heart.svg" class="cursor-pointer" alt="">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6 absolute top-3 cursor-pointer transition-all"
                                    @click="saveAd(product._id)"
                                    :class="{ 'text-orange-400 scale-[1] opacity-100': $store.state.user.savedAds.includes(product._id), 'scale-[0.8] opacity-80 text-white': !$store.state.user.savedAds.includes(product._id) }">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex h-full flex-col w-1/2 pl-2 gap-y-2">
                    <div class="flex flex-row h-1/2 w-full items-center gap-2">
                        <div class="h-full w-1/2  cursor-pointer gap-2 overflow-hidden rounded-lg"
                            v-for="image in images.slice(1, 3)" :key="image">
                            <Skeleton v-if="!image.imageLoaded" class=" w-full h-full rounded-md" style="width: 100%" />
                            <img :alt="product.title" @load="image.imageLoaded = true"
                                :class="{ 'hidden': !image.imageLoaded }" :src="image.link"
                                class=" h-full w-full rounded-lg feed-image-short"
                                v-if="image.link && image.link.toString().includes('.mp4') === false"
                                @click="enterImageViewer()" :key="image">
                            <video :poster="image.thumbnail" @touchstart="playVideo" @touchend="pauseVideo"
                                @mouseenter="playVideo" @mouseout="pauseVideo" :alt="product.title"
                                @loadedmetadata="image.imageLoaded = true" :class="{ 'hidden': !image.imageLoaded }"
                                :src="image.link" @click="enterImageViewer()" loop
                                class="w-full rounded-lg feed-image-short" v-else muted preload="metadata"></video>
                        </div>
                    </div>
                    <div class=" flex flex-row h-1/2 w-full items-center gap-2">
                        <div class="w-1/2 cursor-pointer h-full overflow-hidden rounded-lg"
                            v-for="image in images.slice(3, 5)" :key="image">
                            <Skeleton v-if="!image.imageLoaded" class=" w-full h-full rounded-md" style="width: 100%" />
                            <img :src="image.link" @load="image.imageLoaded = true"
                                :class="{ 'hidden': !image.imageLoaded }" class=" h-full w-full rounded-md feed-image-short"
                                v-if="image.link && image.link.toString().includes('.mp4') == false"
                                @click="enterImageViewer()" :alt="product.title">
                            <video :poster="image.thumbnail" @touchstart="playVideo" @touchend="pauseVideo"
                                @mouseenter="playVideo" @mouseout="pauseVideo" :alt="product.title"
                                @loadedmetadata="image.imageLoaded = true" :class="{ 'hidden': !image.imageLoaded }"
                                :src="image.link" @click="enterImageViewer()" loop
                                class="w-full rounded-md feed-image-short" v-else muted preload="metadata"></video>
                        </div>
                    </div>
                </div>
            </div>

            <!-- product display images for mobile / carousel -->

            <div class="product-img-carousel mobile-view xl:hidden flex items-center w-full relative">

                <div class="w-full absolute flex flex-row top-5 items-center justify-between md:px-8 px-2 z-10">
                    <img src="../../assets/icons/back-img.svg" @click="$router.go(-1)" class="cursor-pointer" alt="">
                    <div class="flex flex-row gap-x-3 items-center">
                        <img @click="startProductShare" src="../../assets/icons/share.svg" class="cursor-pointer" alt="">

                        <div class="grid place-items-center relative" v-if="$store.state.isAuthenticated">
                            <img src="../../assets/icons/heart.svg" class="cursor-pointer" alt="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6 absolute top-3 cursor-pointer transition-all"
                                @click="saveAd(product._id)"
                                :class="{ 'text-orange-400 scale-[1] opacity-100': $store.state.user.savedAds.includes(product._id), 'scale-[0.8] opacity-80 text-white': !$store.state.user.savedAds.includes(product._id) }">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <Skeleton v-if="!carouselImg.imageLoaded" class=" w-full h-full" style="width: 100%" />
                <img :alt="product.title" :src="carouselImg.link" class=" h-full w-full feed-image"
                    @load="carouselImg.imageLoaded = true" :class="{ 'hidden': !carouselImg.imageLoaded }"
                    v-if="carouselImg.link && carouselImg.link.toString().includes('.mp4') == false"
                    @click="enterImageViewer()">
                <video :poster="carouselImg.thumbnail" :alt="product.title" :src="carouselImg.link" loop
                    class="w-full feed-image" @load="carouselImg.imageLoaded = true"
                    :class="{ 'hidden': !carouselImg.imageLoaded }" @click="enterImageViewer()" v-else autoplay muted
                    preload="metadata"></video>
                <!-- <img :src="images[activeCarouselImg - 1].link" class="h-full w-full new-img" :class="{'hidden': changeCarouselImg}"> -->

                <div class="flex flex-row items-center w-full absolute bottom-5 justify-between md:px-8 px-2">
                    <!-- just to take space 🤞 -->
                    <div class="px-6 py-2 rounded opacity-70 collapse" style="background: #161622;">
                        <span class="text-sm text-white font-medium">1/5</span>
                    </div>

                    <div class="flex flex-row items-center gap-x-1">
                        <div class="carousel-indicator md:w-4 md:h-4 h-3 w-3 rounded-full cursor-pointer"
                            @click="changeCarouselImg(indicator)"
                            :class="{ 'bg-white': indicator === activeCarouselImg, 'bg-gray-400': indicator !== activeCarouselImg }"
                            v-for="indicator in images.length" :key="indicator"></div>
                    </div>

                    <!-- main one now 😎 -->
                    <div class="px-6 py-2 rounded opacity-70" style="background: #161622;">
                        <span class="text-sm text-white font-medium">{{ (activeCarouselImg + '/' +
                            images.length)
                        }}</span>
                    </div>
                </div>
            </div>

            <!-- product details -->
            <div class="flex flex-col md:flex-row items-start w-full gap-x-4 h-fit justify-between px-6 sm:px-7 xl:px-0">
                <!-- product info -->
                <div class="flex flex-col items-start md:w-2/3 w-full xl:w-4/6 h-full pt-2">
                    <!-- top product info -->
                    <div class="flex flex-row main-info items-center w-full justify-between">
                        <div class="flex flex-col gap-y-2">
                            <p
                                class="text-webapp text-2xl md:text-xl xl:text-2xl font-semibold xl:font-medium product-name">
                                {{ product.title }}</p>
                            <p
                                class="text-sub-webapp text-lg md:text-sm xl:text-lg product-location flex flex-row items-center gap-x-2">
                                <img src="../../assets/icons/map-pin-blue.svg" alt="">{{
                                    product.location.address + ', ' +
                                    product.location.city
                                }}
                            </p>
                        </div>
                        <div class="md:flex hidden flex-col ">
                            <h2 class="text-webapp text-2xl md:text-xl xl:text-2xl font-medium product-price">
                                <PriceFormatter :from="product.priceCurrency" :to="country.currency"
                                    :amount="product.price" />
                            </h2>
                            <p v-if="product.for === 'rent'"
                                class="text-sm  xl:text-lg font-medium product-price text-webapp">Rent
                            </p>
                            <p v-else
                                class="text-sub-webapp text-sm xl:text-lg product-duration flex flex-row justify-start ">
                                Sale</p>
                        </div>
                    </div>

                    <div class="flex flex-row py-2 border-y mt-8 border-y-gray-200 w-full divide-x">
                        <div class="flex flex-col gap-y-2 items-center w-64 md:w-auto md:pr-20"
                            v-if="product.type !== 'land'">
                            <span class="text-2xl font-medium text-webapp">{{ product.bedrooms }}</span>
                            <span class="text-sm text-sub-webapp">Bedroom</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center w-64" v-if="product.type !== 'land'">
                            <span class="text-2xl font-medium text-webapp">{{ product.bedrooms }}</span>
                            <span class="text-sm text-sub-webapp">Bathroom</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center w-64" v-if="product.type === 'land'">
                            <span class="text-2xl font-medium text-webapp">{{ product.plots }}</span>
                            <span class="text-sm text-sub-webapp">Plots</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center w-64">
                            <span class="text-2xl font-medium text-webapp">{{ formatNumber(product.size) }}</span>
                            <span class="text-sm text-sub-webapp">Square feet</span>
                        </div>
                    </div>

                    <p class="text-xl font-medium mt-8 text-webapp">Features</p>
                    <div class="flex flex-row py-3 border-y mt-2 border-y-gray-200 w-full gap-x-3 overflow-x-auto flex-no-wrap"
                        v-if="product.type !== 'land'">
                        <div class="flex flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                            v-if="product.features.includes('electricity')">
                            <img src="../../assets/icons/light.svg" alt="">
                            <span class="text-sm text-sub-webapp">Electricity</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                            v-if="product.features.includes('water')">
                            <img src="../../assets/icons/water.svg" alt="">
                            <span class="text-sm text-sub-webapp">Water</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                            v-if="product.features.includes('parking')">
                            <img src="../../assets/icons/parking.svg" alt="">
                            <span class="text-sm text-sub-webapp">Parking</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                            v-if="product.features.includes('pool')">
                            <img src="../../assets/icons/pool.svg" alt="">
                            <span class="text-sm text-sub-webapp">Pool</span>
                        </div>
                    </div>
                    <div class="flex flex-row py-3 border-y mt-2 border-y-gray-200 w-full gap-x-3 overflow-x-auto flex-no-wrap"
                        v-else>
                        <div class="flex flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                            v-if="product.features.includes('access_road')">
                            <img src="../../assets/icons/listings/road.svg" class="w-5 h-5" alt="">
                            <span class="text-sm text-sub-webapp text-center">Access road</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                            v-if="product.features.includes('security')">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6 text-webapp">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                            <span class="text-sm text-sub-webapp">Security</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                            v-if="product.features.includes('surveyed')">
                            <img src="../../assets/icons/listings/surveyed.svg" class="w-6 h-6" alt="">
                            <span class="text-sm text-sub-webapp">Surveyed</span>
                        </div>
                        <div class="flex flex-col gap-y-2 items-center border border-gray-200 rounded-md w-28 h-20 justify-center"
                            v-if="product.features.includes('c-of-o')">
                            <img src="../../assets/icons/listings/certificate.svg" class="w-6 h-6" alt="">
                            <span class="text-sm text-sub-webapp">C of O</span>
                        </div>
                    </div>
                </div>

                <!-- agent info desktop -->
                <div
                    class="agent-info md:flex hidden p-4 bg-white flex-col w-2/3 xl:w-2/6 2xl:w-1/4 items-start ml-3 h-fit">
                    <h3 class="text-lg xl:text-xl font-medium  text-webapp">Description</h3>

                    <article class="text-sub-webapp text-lg text-left mt-1 xl:mt-3">
                        <pre class="w-full whitespace-pre-wrap"
                            v-if="!openFullDesc"><article>{{ product.description.slice(0, 250) }}<span class="text-primary cursor-pointer" v-if="product.description.length > 250" @click="openFullDesc = true">... Read more</span></article></pre>
                        <pre class="w-full whitespace-pre-wrap"
                            v-else> <article>{{ product.description }} </article> <span class="text-primary cursor-pointer" v-if="product.description.length > 250" @click="openFullDesc = false">..Hide</span></pre>
                    </article>

                    <hr class="my-3">

                    <div
                        class="agent-desktop flex flex-row items-center  md:justify-between w-full border-t pt-2 mt-2 border-t-gray-300">
                        <div class="flex flex-row gap-x-2 items-center">
                            <div class="rounded-full w-12 h-12 xl:w-16 xl:h-16 grid place-items-center">
                                <img :src="agentDetails.profileImg" class="w-12 h-12 xl:w-16 xl:h-16 rounded-full"
                                    v-if="agentDetails.profileImg !== 'https://i.ibb.co/gtpxMJz/21.png'" alt="">
                                <Avatar size="100%" v-else :fname="agentDetails.name.fname"
                                    :lname="agentDetails.name.surname" />
                            </div>
                            <div class="flex flex-col ">
                                <span class="text-sm xl:text-lg md:text-center text-left agent-name text-webapp font-medium"
                                    v-if="agentDetails.name">
                                    {{
                                        agentDetails.name.fname + ' ' + agentDetails.name.surname
                                    }}
                                </span>
                                <span
                                    class="text-sm agent-ads-count md:text-center xl:text-left text-left text-sub-webapp">{{
                                        agentDetails.ads.length
                                    }}
                                    ads</span>
                            </div>
                        </div>
                        <a class="cursor-pointer" :href="'tel:' + agentDetails.phoneNumber"><img
                                src="../../assets/icons/call-btn.svg" alt=""></a>
                    </div>

                    <div class="flex flex-col xl:flex-row items-center w-full gap-y-1 xl:justify-between mt-1 xl:mt-3">
                        <button @click="$router.push('/' + product.agentId)"
                            class="agent-btn hidden xl:flex flex-row items-center justify-center text-sm font-medium text-primary w-1/2  bg-white">Visit
                            Profile</button>
                        <button @click="$router.push('/login?redirect=' + $route.fullPath)"
                            v-if="!$store.state.isAuthenticated"
                            class="agent-btn cursor-pointer flex flex-row items-center justify-center text-sm font-medium w-full  text-white ml-2 bg-primary xl:w-1/2">
                            <span>Chat with agent</span>
                        </button>
                        <button @click="createChatRoom()" v-else-if="agentDetails.id !== $store.state.user._id"
                            class="agent-btn cursor-pointer flex flex-row items-center justify-center text-sm font-medium w-full text-white ml-2 bg-primary xl:w-1/2">
                            <Preloader v-if="creatingRoom" />
                            <span v-else>Chat with agent</span>
                        </button>
                        <button @click="$router.push('/listings/agent/products/' + product._id)" v-else
                            class="agent-btn cursor-pointer flex flex-row items-center justify-center text-sm font-medium w-full text-white ml-2 border border-blue-500 xl:w-1/2">
                            <span>Edit Listing</span>
                        </button>
                    </div>
                </div>

                <!-- agent info mobile -->
                <div class="flex md:hidden p-4 bg-white mt-4 flex-col  items-start w-full h-fit">
                    <p class="text-xl font-medium mt-8 text-webapp">Agent</p>

                    <div
                        class="agent flex flex-row items-center justify-between w-full border-b py-3 my-3 border-b-gray-300">
                        <div class="flex flex-row gap-x-2 items-center">
                            <div class="rounded-full w-12 h-12  grid place-items-center">
                                <img :src="agentDetails.profileImg" class="w-12 h-12 rounded-full"
                                    v-if="agentDetails.profileImg !== 'https://i.ibb.co/gtpxMJz/21.png'" alt="">
                                <Avatar size="100%" v-else :fname="agentDetails.name.fname"
                                    :lname="agentDetails.name.surname" />
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm xl:text-lg text-left agent-name text-webapp font-medium"
                                    v-if="agentDetails.name && agentDetails.name.fname">{{
                                        agentDetails.name.fname + ' ' + agentDetails.name.surname
                                    }}</span>
                                <span class="text-sm agent-ads-count text-left text-sub-webapp">{{
                                    agentDetails.ads.length
                                }} ads</span>
                            </div>
                        </div>
                        <a class="cursor-pointer" :href="'tel:' + agentDetails.phoneNumber"><img
                                src="../../assets/icons/call-btn.svg" alt=""></a>
                        <button
                            class="w-24 flex ml-2 flex-row border border-blue-700 h-8 rounded-sm items-center justify-center text-sm font-medium text-primary bg-white"
                            @click="$router.push('/' + product.agentId)">Visit
                            Profile</button>
                    </div>

                    <h3 class="text-lg font-medium text-webapp">Description</h3>

                    <article class="text-sub-webapp text-sm text-left mt-1 xl:mt-3">
                        <div v-if="!openFullDesc">
                            <pre class="w-full whitespace-pre-wrap">
                                {{ product.description.slice(0, 250) }}
                                <!-- <span class="inner-pre" style="font-size: 7px !important">{{ product.description.slice(0, 250) }}</span> -->
                            </pre>
                            <span class="text-primary" v-if="product.description.length > 250"
                                @click="openFullDesc = true">... Read more</span>
                        </div>
                        <div v-else>
                            <pre class="w-full whitespace-pre-wrap">{{ product.description }} </pre>
                            <span class="text-primary" v-if="product.description.length > 250"
                                @click="openFullDesc = false">..Hide</span>
                        </div>
                    </article>



                    <div
                        class="flex md:hidden py-5  flex-row items-center fixed bottom-0 px-4 z-10 left-0 bg-white w-screen justify-between mt-4 border-t pt-2 border-t-gray-300">
                        <div class="flex flex-col">
                            <h2 class="text-webapp text-xl xl:text-2xl font-medium product-price">
                                <PriceFormatter :from="product.priceCurrency" :to="country.currency"
                                    :amount="product.price" />
                            </h2>
                            <p v-if="product.for === 'rent'"
                                class="text-sm md:text-xl xl:text-2xl font-medium product-price text-webapp">Yearly
                            </p>
                            <p v-else
                                class="text-sub-webapp text-sm md:text-sm xl:text-lg product-duration flex flex-row justify-start ">
                                Forever</p>
                        </div>
                        <button @click="$router.push('/login?redirect=' + $route.fullPath)"
                            v-if="!$store.state.isAuthenticated"
                            class="agent-btn cursor-pointer flex flex-row items-center justify-center text-sm font-medium w-3/5 mr-2 text-white ml-2 bg-primary xl:w-1/2">
                            <span>Chat with agent</span>
                        </button>
                        <button @click="createChatRoom()" v-else-if="agentDetails.id !== $store.state.user._id"
                            class="agent-btn cursor-pointer flex flex-row items-center justify-center text-sm font-medium w-3/5 mr-2 text-white ml-2 bg-primary xl:w-1/2">
                            <Preloader v-if="creatingRoom" />
                            <span v-else>Chat with agent</span>
                        </button>
                        <button @click="$router.push('/listings/agent/products/' + product._id)" v-else
                            class="agent-btn cursor-pointer flex flex-row items-center justify-center text-sm font-medium w-3/5 mr-2 text-white ml-2 border border-blue-500 xl:w-1/2">
                            <span>Edit Listing</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- image viewer -->
    <div v-else class="view-img w-screen flex flex-col items-center h-screen lg:p-8 overflow-hidden xl:p-12"
        style="background: #161622;">
        <div class="flex flex-row items-center w-full justify-between lg:p-0 p-6">
            <img src="../../assets/icons/x-bg.svg" @click="exitImageViewer()" class="cursor-pointer" alt="">
            <p class="text-2xl font-medium text-white">{{ (activeCarouselImg + '/' + images.length) }}</p>
            <div class="collapse"></div>
        </div>

        <div class="mt-6 flex flex-row items-center justify-between w-full h-fit gap-x-2 relative">
            <img src="../../assets/icons/back-circle.svg" v-if="activeCarouselImg > 1"
                @click="changeCarouselImg(activeCarouselImg - 1)" class="cursor-pointer lg:block absolute left-3 z-10"
                alt="">
            <div class="image-container h-fit flex flex-col items-center justify-center w-full">
                <img :src="carouselImg.link" v-if="carouselImg && carouselImg.link.includes('mp4') == false"
                    class="w-full h-full feed-image" alt="">
                <video :poster="carouselImg.thumbnail" :src="carouselImg.link" loop
                    class="md:w-4/5 w-full rounded-lg feed-image" @click="enterImageViewer()" v-else controls
                    autoplay></video>
            </div>
            <img src="../../assets/icons/next-circle.svg" @click="changeCarouselImg(activeCarouselImg + 1)"
                v-if="activeCarouselImg < images.length" class="cursor-pointer lg:block absolute right-3 z-10" alt="">
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MainNavbar from '../../components/MainNavbar.vue'
import axios from "../../composables/axios";
import { useRoute, useRouter } from 'vue-router'
import formatNumber from "number_formatter"
import saveAd from '../../composables/saveAd'
import { useStore } from 'vuex';
import axiosDefault from 'axios'
import clm from 'country-locale-map'


const route = useRoute()
const router = useRouter()
const store = useStore()


const title = ref('Habeep | ' + route.params.id + ' Product')
const content = ref('Property ID is' + route.params.id)

const img = ref('')
// https://logos.flamingtext.com/Word-Logos/property-design-sketch-name.png

import { useHead } from '@vueuse/head'
import ShareModal from './components/ShareModal.vue';

useHead({
    title: () => title.value,
    meta: [
        { charset: 'utf-8' },
        { name: 'description', content: () => content.value },
        { name: 'og:title', content: () => title.value },
        { name: 'og:image', content: () => img.value },
        { name: 'og:url', content: 'https://habeep.org/listings/product/' + route.params.id },
        { name: 'og:website', content: 'website' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
        { rel: 'icon', href: () => img.value },
        { rel: 'shortcut icon', href: () => img.value },
    ],
})


const url = '/listings/ads/get/';
const url2 = '/profile/get-agent/';

const carouselImg = ref({ imageLoaded: false, link: '', thumbnail: '' })


const processingProduct = ref(false)
const product = ref({})
const agentDetails = ref({ ads: [] })

const activeCarouselImg = ref(1)
const onImageViewer = ref(false)
const openFullDesc = ref(false)

const images = ref(null)

let country = ref({
    country: 'Nigeria',
    cc: 'NG',
    currency: 'NGN'
})

async function getResidence() {
    if (store.state.isAuthenticated) {
        country.value = {
            country: store.state.user.nationality,
            cc: store.state.user.countryShortName,
            currency: store.state.user.currency
        }
    } else {
        const getCountry = await axiosDefault.get('https://jsonip.com')
        country.value.country = clm.getCountryNameByAlpha2(getCountry.data.country)
        country.value.cc = getCountry.data.country
        country.value.currency = clm.getCountryByAlpha2(getCountry.data.country)
    }
}

const getProduct = async () => {
    try {
        processingProduct.value = true
        const getProduct = await axios.get(url + route.params.id)
        title.value = `Habeep | ${getProduct.data.product.title}`
        content.value = getProduct.data.product.description

        processingProduct.value = true

        product.value = getProduct.data.product
        if (product.value.status === 'CLOSED') {
            router.replace({ name: 'not-found' })
        }
        images.value = getProduct.data.product.images

        if (getProduct.data.product.images.length > 0) {
            getProduct.data.product.images.forEach(image => {
                if (image.link && image.link.length > 0 && image.link.toString().includes('mp4') === false) {
                    img.value = image.link
                    return;
                }
            })
        }
        useHead({
            link: [
                { rel: 'icon', href: () => img.value },
                { rel: 'shortcut icon', href: () => img.value },
            ],
            meta: [
                { name: 'og:image', content: () => img.value },
                { name: 'og:description', content: () => content.value },

            ]
        })
        carouselImg.value = getProduct.data.product.images[0]

        getAgent(product.value.agentId)
    } catch (error) {
        router.replace({ name: 'not-found-route' })
    }
}
async function getAgent(agentId) {
    try {
        const getAgent = await axios.get(url2 + agentId)
        agentDetails.value = getAgent.data.agent

        const images = []
        product.value.images.forEach(img => {
            if (!img.link.includes('.mp4')) {
                images.push(img.link)
            } else {
                images.push(img.thumbnail)
            }
        })
        // set google seo
        const structuredData = {
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.value.title,
            image: images,
            description: product.value.description,
            sku: product.value._id,
            mpn: product.value._id,
            brand: {
                "@type": "Brand",
                name: 'Habeep LLC'
            },
            "review": {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": 5,
                    "bestRating": 5
                },
                "author": {
                    "@type": "Person",
                    "name": agentDetails.value.name.fname + ' ' + agentDetails.value.name.surname
                }
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": 5,
                "reviewCount": 1
            },
            "offers": {
                "@type": "Offer",
                url: `https://habeep.org/listings/products/${product.value._id}`,
                "priceCurrency": "NGN",
                price: product.value.price,
                "itemCondition": "https://schema.org/NewCondition",
                "availability": "https://schema.org/InStock"
            }
        }

        useHead({
            script: [
                { type: 'application/ld+json', textContent: JSON.stringify(structuredData) }
            ]
        })


    } catch (error) {
        router.replace({ name: 'not-found-route' })
    }
}

const creatingRoom = ref(false)

async function createChatRoom() {
    try {
        if (store.state.isAuthenticated) {
            creatingRoom.value = true
            const create = await axios.post('/messaging/create-room', {
                users: [store.state.user._id, agentDetails.value.userId]
            })

            creatingRoom.value = false
            router.push('/chats?roomId=' + create.data.room._id)
        } else {
            router.push('/login?redirect=' + route.fullPath)
        }
    } catch (error) {
        creatingRoom.value = false
    }
}

function changeCarouselImg(value) {
    // changingCarousel.value = true
    if (images.value) {
        let image = images.value[value - 1]
        activeCarouselImg.value = value

        carouselImg.value = image
    }
}

// manage images viewer
function exitImageViewer() {
    onImageViewer.value = false

    carouselInt = setInterval(() => {
        let value = activeCarouselImg.value + 1
        if (images.value) {
            if (activeCarouselImg.value == images.value.length) {
                value = 1
            }
        }
        changeCarouselImg(value)
    }, 5000);
}

function enterImageViewer() {
    clearInterval(carouselInt)
    onImageViewer.value = true
}

let carouselInt = setInterval(() => {
    let value = activeCarouselImg.value + 1
    if (images.value) {
        if (activeCarouselImg.value == images.value.length) {
            value = 1
        }
    }
    changeCarouselImg(value)
}, 5000);

const screenWidth = ref(window.innerWidth)

function changeWidth() {
    screenWidth.value = window.innerWidth
}

// manage video

async function playVideo(e) {
    if (e.target) {
        await e.target.play()
    }
}
async function pauseVideo(e) {
    if (e.target) {
        await e.target.pause()
    }
}


// product share
const onProductShare = ref(false)

function startProductShare() {
    exitImageViewer()
    onProductShare.value = true
}

onMounted(() => {
    getResidence()
    getProduct()
})
</script>

<style scoped>
pre {
    font-family: 'Aeonik', sans-serif;
    white-space: pre-wrap;
    display: block;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: -0.01px;
}

.product-img-grid {
    max-height: 538px;
    height: 538px;
}

.product-img-carousel {
    max-height: 400px;
    height: 400px;
}

.agent-info {
    background: #FFFFFF;
    /* Habeep grey/grey 4 */

    border: 1px solid #EBEBEB;
    box-shadow: 0px 8px 30px -6px rgba(24, 39, 75, 0.12), 0px 14px 88px -4px rgba(24, 39, 75, 0.12);
    border-radius: 10px;
}

.agent-btn {
    border: 1px solid #3E64F9;
    border-radius: 5px;
    height: 50px;
}

.agent-btn-mobile {
    border: 1px solid #3E64F9;
    border-radius: 5px;
}

.image-container {
    height: 80vh;
}

.feed-image-short {
    width: 100% !important;
    object-fit: cover;
    height: 100% !important;
}

.feed-image {
    width: 100% !important;
    object-fit: cover;
    height: 100% !important;
}
</style>