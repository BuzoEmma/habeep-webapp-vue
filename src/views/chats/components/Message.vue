<template>
  <div class="p-3 flex flex-col text-left h-fit items-end message" style="max-width: 70%"
    :class="{ 'bg-primary text-white float-right': props.data.userId === props.userId, 'bg-gray-100 text-black float-left': props.data.userId !== props.userId }">
    <div class="flex flex-col text-left h-fit items-end w-full" v-if="!props.data.deleted">
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

    <!-- deleted messages -->
    <div class="flex flex-col h-fit items-start w-full" v-motion-slide-bottom v-else>
      <div class="flex-row-center gap-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd"
            d="M5.965 4.904l9.131 9.131a6.5 6.5 0 00-9.131-9.131zm8.07 10.192L4.904 5.965a6.5 6.5 0 009.131 9.131zM4.343 4.343a8 8 0 1111.314 11.314A8 8 0 014.343 4.343z"
            clip-rule="evenodd" />
        </svg>

        <p class="text-xs opacity-60" v-if="props.data.userId === props.userId">You deleted this message</p>
        <p class="text-xs opacity-60" v-else>This message was deleted</p>
      </div>

      <span class="text-xs text-right w-full mt-1">{{ props.data.timeCreated }}</span>
    </div>
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