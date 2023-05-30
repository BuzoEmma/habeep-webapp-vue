<template>
  <div class="p-3 flex flex-col text-left h-fit items-end message" style="max-width: 70%"
    :class="{'bg-primary text-white float-right': props.data.userId === props.userId, 'bg-gray-100 text-black float-left': props.data.userId !== props.userId }">
    <div class="w-full media" v-if="props.data.media && props.data.media.length > 0">
      <!-- audio player -->
      <div class="flex-row flex items-start gap-x-6 min-w-full w-48 rounded-full p-1 h-fit"
        v-if="props.data.media.includes('audioMessages') || props.data.media.includes('audio/')">
        <audio class="w-full" :src="props.data.media" controls></audio>
      </div>

      <!-- video player -->
      <video :src="props.data.media" class="main-media w-full"
        v-else-if="props.data.media.includes('.mp4') || props.data.media.includes('video/')" controls preload="metadata"
        :poster="getThumbnail(props.data.media)"></video>

      <!-- image viewer -->
      <img :src="props.data.media" class="main-media w-full" @click="$emit('viewFullImage', props.data.media)" v-else>
    </div>

    <p class="text-left w-full text-sm font-medium h-full break-words mt-1" v-if="props.data.msg">
      {{ props.data.msg }}
    </p>
    <span class="text-xs text-left w-full mt-1 font-extralight" v-if="props.data.userId === props.userId">{{
      props.data.timeCreated }} . {{ props.data.read ? 'Read' : 'Not seen' }}</span>
    <span class="text-xs text-left w-full mt-1" v-else>{{ props.data.timeCreated }}</span>
  </div>
</template>

<script setup>
/* eslint-disable */

const props = defineProps({
  data: Object,
  userId: String
})
function getThumbnail(link) {
  return link.slice(0, link.length - 3) + 'jpg'
}
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
  min-width: 150px;
  width: 100%;
}
</style>