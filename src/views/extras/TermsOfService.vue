<template>
    <div
        class="w-screen min-w-full flex flex-col items-center justify-between bg-white h-full min-h-screen overflow-y-auto">
        <HomeNavbar />

        <div class="body px-6 2xl:px-44 md:px-20 w-full flex flex-col h-fit items-start gap-y-8">
            <div class="flex flex-col w-full items-start gap-y-4 mt-16">
                <p class="text-webapp text-3xl md:text-4xl font-medium w-full">Terms of service</p>
                <p class="text-sub-webapp text-xl xl:w-4/5 w-full ">PlEASE NOTE THAT YOUR USE OF AND ACCESS TO THE
                    SERVICES (AS DEFINED BELOW) ARE SUBJECT TO THE FOLLOWING TERMS; IF YOU DO NOT AGREE TO ALL OF THESE
                    TERMS, YOU MAY NOT USE OR ACCESS THE SERVICES </p>
            </div>


            <div class="flex flex-col w-full items-start gap-y-4 mt-16">
                <p class="text-webapp text-2xl md:text-3xl font-medium w-full">Date of publication</p>
                <p class="text-sub-webapp text-lg  w-full ">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus porta interdum elementum, aenean sit
                    nisl posuere dui. Arcu vel dictumst faucibus nisi. A in proin urna senectus egestas fermentum,
                    dictumst purus ac. Enim, donec magna gravida ultrices nunc nibh pharetra accumsan vel. Nulla
                    volutpat, egestas cum nibh convallis nisi. Lectus ornare duis mauris nam euismod ipsum. Tortor
                    maecenas nunc, faucibus est faucibus ut. Pulvinar nulla tristique eu quis elementum tristique vel.
                    Auctor cum blandit massa luctus quis amet, arcu.

                    Malesuada eu id quam at sollicitudin. Nunc dui leo eget ante. Venenatis massa, egestas malesuada
                    quis eget amet augue sit auctor. Elementum tristique sit dui consectetur sit. Eget pretium dignissim
                    interdum erat pretium id mollis sed facilisi. In lectus faucibus facilisis purus. Aliquam tincidunt
                    id ipsum in ultrices non. Lectus vitae gravida morbi congue. Ipsum lorem dolor maecenas nibh viverra
                    pellentesque. Ipsum vulputate eu pharetra, integer varius aliquam urna, sapien quis. Ac suspendisse
                    dolor lorem ut. Mattis ullamcorper duis vel ultricies pretium mi ut vestibulum. Fermentum sapien
                    sagittis turpis sapien nisl venenatis diam.

                    Egestas morbi cursus et eget vitae pellentesque turpis. Faucibus euismod varius tempor at viverra
                    mus laoreet aenean. Nisi feugiat aliquam molestie praesent a ultrices. Nunc nisl, at non pretium
                    orci. Pellentesque etiam a mattis libero enim. Adipiscing quis ut pretium tempus. Egestas volutpat
                    purus et sit tincidunt ridiculus. Scelerisque hendrerit ultricies convallis nisi, consectetur sed
                    purus. Leo et, mattis adipiscing ac ut.
                    Molestie diam proin in maecenas sit vitae quis urna, in. At sagittis tempor, ut odio lectus nulla
                    commodo. Viverra habitasse congue erat metus et porttitor nec dolor dui.
                </p>
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

<style>

</style>