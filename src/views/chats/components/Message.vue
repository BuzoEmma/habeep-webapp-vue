<template>
  <div class="p-3 flex flex-col text-left h-fit items-end message bg-primary text-white float-right"
  style="max-width: 90%"
    :class="{ 'bg-gray-100 text-black float-left': props.data.userId !== props.userId }">
    <p class="text-left w-full text-sm font-medium h-full break-words">
      {{ props.data.msg }}
    </p>
    <span class="text-xs text-left w-full mt-1 font-extralight" v-if="props.data.userId === props.userId">{{ props.data.timeCreated }} . {{ props.data.read ? 'Read' : 'Not seen' }}</span>
    <span class="text-xs text-left w-full mt-1" v-else>{{ props.data.timeCreated }}</span>
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