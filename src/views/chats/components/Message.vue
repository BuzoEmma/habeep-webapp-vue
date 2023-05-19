<template>
  <div class="p-3 flex flex-col text-left h-fit items-end message" style="max-width: 70%"
    :class="{ 'bg-primary text-white float-right': props.data.userId === props.userId, 'bg-gray-100 text-black float-left': props.data.userId !== props.userId }">
    <div class="w-full media" v-if="props.data.media && props.data.media.length > 0">
      <video :src="props.data.media" class="main-media w-full" v-if="props.data.media.includes('mp4')" controls
        preload="metadata"></video>
      <img :src="props.data.media" v-else class="main-media w-full">
    </div>

    <p class="text-left w-full flex flex-col text-sm font-medium h-full break-words mt-1" v-if="props.data.msg">
      {{ props.data.msg }}
    </p>
    <p class="flex flex-row items-center justify-end" :class="{'justify-start': props.data.userId !== props.userId}">
      <span class="text-xs text-right w-full mt-1 font-extralight" v-if="props.data.userId === props.userId">{{
      props.data.timeCreated }} . {{ props.data.read ? 'Read' : 'Not seen' }}</span>
    <span class="text-xs text-left w-full mt-1" v-else>{{ props.data.timeCreated }}</span>
    </p>
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

.media {
  border-radius: 16px;
}

.main-media {
  object-fit: cover;
  height: 100%;
  border-radius: 16px;
  max-height: 250px;
  min-width: 200px;
  width: 100%;
}
</style>