<template>
  <div class="p-3 flex flex-col items-end message bg-primary text-white float-right"
    :class="{ 'bg-gray-100 text-black float-left': props.data.userId !== props.userId }">
    <p class="text-left w-full text-sm font-medium">
      {{ props.data.msg }}
    </p>
    <span class="text-xs">{{ props.data.timeCreated }} . {{ props.data.read ? 'Read' : 'Not seen' }}</span>
  </div>
</template>

<script setup>

const props = defineProps({
  data: Object,
  userId: String
})
</script>

<style scoped>
.message {
  border-radius: 16px 16px 0px 16px;
}
</style>