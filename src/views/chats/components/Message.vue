<template>
  <div class="p-3 flex flex-col items-end message bg-primary text-white float-right" :class="{'bg-gray-100 text-black float-left': props.data.user !== 'me'}">
    <p class="text-left w-full text-sm">
        {{props.data.msg}}
    </p>
    <span class="text-xs">{{props.data.time}} . {{props.data.status ? 'Read' : 'Not seen' }}</span>
  </div>
</template>

<script setup>

const props = defineProps({
    data: Object,
})
</script>

<style scoped>
.message {
    border-radius: 16px 16px 0px 16px;
}
</style>