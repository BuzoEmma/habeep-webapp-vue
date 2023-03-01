<template>

    <div class="flex flex-col xl:pt-10 lg:pt-7 pb-3 px-3 lg:px-5 xl:px-8 items-start lg:border lg:border-gray-200 rounded-2xl w-full lg:w-1/3 h-full">
        <p class="w-full font-bold text-lg md:text-xl lg:text-2xl text-webapp">
            Messages(0)
        </p>

        <div class="flex flex-row items-start chat justify-between mt-4  lg:mt-7 w-full py-2 lg:py-3 border-b cursor-pointer border-gray-200" @click="$emit('selectChat', chat)" v-for="chat in 4" :key="chat">
            <div class="flex flex-row items-start gap-x-3 w-fit">
                <div class="rounded-full w-11 h-11 grid place-items-center">
                    <img src="../../../assets/icons/model.svg" class="w-full h-full" alt="">
                </div>
                <div class="flex flex-col items-start">
                    <span class="md:text-lg text-sm text-left  text-webapp font-medium">Duke Carrick</span>
                    <span class="text-xs md:text-sm text-sub-webapp">No message yet</span>
                </div>
            </div>
            <div class="flex flex-col items-end gap-y-1">
                <span class="text-xs md:text-sm text-webapp" :class="{'text-primary': newMessage}">Mar 3</span>
                <span class="py-1 px-2 rounded-full bg-primary text-xs text-white" v-if="newMessage">1</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>