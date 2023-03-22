<template>
    <div class="flex flex-col items-center justify-center md:border md:border-gray-200 rounded-2xl w-full lg:w-2/3 h-full">
        <div class="flex flex-col gap-y-2 h-fit">
            <img src="../../../assets/illustrations/no-conversation.svg" alt="">
            <p class="text-lg text-webapp">No conversation yet</p>
        </div>
    </div>
</template>
  
<script setup>

</script>
  
<style scoped>
.message-input::placeholder {
    color: #71759D;
    font-size: 14px;
}

.message-input {
    outline: none;
    border: 1px solid #D9DDEE;
}

.message-input:focus {
    border: 1px solid #1B49FF;
}
</style>