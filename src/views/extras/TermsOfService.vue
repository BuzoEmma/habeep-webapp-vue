<template>
    <div
        class="w-screen min-w-full flex flex-col items-center justify-between bg-white h-full min-h-screen overflow-y-auto">
        <HomeNavbar />

        <div class="body px-6 2xl:px-44 md:px-20 w-full flex flex-col h-fit items-start gap-y-8">
            <div class="flex flex-col w-full items-start gap-y-4 mt-16">
                <p class="text-webapp text-3xl md:text-4xl font-medium w-full">Terms of service</p>
                <p class="text-sub-webapp text-xl xl:w-4/5 w-full ">Welcome to Habeep. These terms of service ("Terms") set
                    out the terms and conditions that govern your access to and use of Habeep, an online platform for real
                    estate management. By accessing or using Habeep, you agree to be bound by these Terms and our privacy
                    policy ("Privacy Policy"). If you disagree with these Terms or the Privacy Policy, you should not access
                    or use Habeep.
                </p>
            </div>


            <div class="flex flex-col w-full items-start gap-y-4 mt-10">
                <p class="text-webapp text-2xl md:text-3xl font-medium w-full">1. Use of Habeep</p>
                <p class="text-sub-webapp text-lg  w-full ">Habeep provides a platform for users to search for, list, and
                    manage real estate properties. You must be at least 18 years old to use Habeep.
                </p>
            </div>

            <div class="flex flex-col w-full items-start gap-y-4 mt-3">
                <p class="text-webapp text-2xl md:text-3xl font-medium w-full">2. User Roles</p>
                <p class="text-sub-webapp text-lg  w-full ">Habeep allows four types of users to access its platform:</p>

                <li class="text-sub-webapp text-lg  w-full ml-5">Agents: registered and licensed real estate agents
                    authorized to represent clients in real estate transactions.
                </li>
                <li class="text-sub-webapp text-lg  w-full ml-5">House seekers: individuals or families who are looking for properties to rent or buy.
                </li>
                <li class="text-sub-webapp text-lg  w-full ml-5">House owners: individuals or companies who own properties and want to list them for rent or sale.
                </li>
                <li class="text-sub-webapp text-lg  w-full ml-5">Real estate firms: companies that provide real estate services, such as property management, appraisal, or investment advice.
                </li>

                <p class="text-sub-webapp text-lg  w-full ">Each user type is subject to specific terms and conditions, which are detailed in the respective user agreement.</p>

            </div>
        </div>

        <div class="flex flex-row mt-10 md:mb-16 mb-12 items-center gap-x-4">
            <router-link to="/terms-of-service" class="underline text-primary font-semibold">Terms of service</router-link>
            <router-link to="/listings/search?name=Houses" class="underline text-webapp">Products</router-link>
            <router-link to="/help" class="underline text-webapp">Help</router-link>
        </div>
    </div>
</template>

<script setup>
import HomeNavbar from '../../components/HomeNavbar.vue'

</script>

<style></style>