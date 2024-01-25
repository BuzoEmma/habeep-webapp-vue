<template>
  <div class="p-3 h-fit message" style="max-width: 70%" v-motion-fade
    :class="{ 'bg-primary text-white float-right': props.data.userId === props.userId, 'bg-other text-webapp float-left': props.data.userId !== props.userId }">
    <div class="flex flex-col text-left h-fit items-end w-full" v-if="!props.data.deleted">
      <div class="w-full media" v-if="props.data.media && props.data.media.length > 0">
        <!-- audio player -->
        <div class="flex-row flex items-start gap-x-6 min-w-full w-56 rounded-full p-1 h-fit"
          v-if="props.data.media.includes('audioMessages') || props.data.media.includes('audio/')">
          <audio class="w-full" id="media-box" :src="props.data.media" controls controlsList="nodownload"></audio>
        </div>

        <!-- video player -->
        <div class="w-full h-full max-h-[250px] min-w-[150px]"
          v-else-if="props.data.media.includes('.mp4') || props.data.media.includes('video/')">
          <video id="media-box1" playsinline :src="props.data.media" class="main-media w-full"
            :class="{ 'hidden': !mediaLoaded || mediaLoaded === 'failed' }" controls @canplay="mediaLoaded = true"
            preload="metadata" :poster="getThumbnail(props.data.media)" controlsList="nodownload"></video>

          <Skeleton class="h-[250px] rounded-[16px] w-[150x]"
            :class="{ 'hidden': mediaLoaded === true || mediaLoaded === 'failed' }" />

          <img src="../../../assets/images/no-video-found.jpeg"
            class="h-[250px] rounded-[16px] w-[150x] object-cover object-center"
            :class="{ 'flex': mediaLoaded === 'failed', 'hidden': !mediaLoaded || mediaLoaded === true }" />
        </div>

        <!-- image viewer -->
        <div class="w-full h-full max-h-[250px] min-w-[150px]" v-else>
          <img :src="props.data.media" id="media-box2" class="main-media w-full"
            @click="emit('viewFullImage', props.data.media)"
            :class="{ 'hidden': !mediaLoaded || mediaLoaded === 'failed' }" @load="mediaLoaded = true">

          <Skeleton class="h-[250px] rounded-[16px] w-[150x]"
            :class="{ 'hidden': mediaLoaded === true || mediaLoaded === 'failed' }" />

          <img src="../../../assets/images/no-image-found.png" class="h-[250px] rounded-[16px] w-[150x] "
            :class="{ 'flex': mediaLoaded === 'failed', 'hidden': !mediaLoaded || mediaLoaded === true }" />
        </div>
      </div>

      <p class="text-left w-full text-sm font-medium h-full break-words mt-1" v-if="props.data.msg">
        {{ props.data.msg }}
      </p>
      <span class="text-xs text-left w-full mt-1 font-extralight" v-if="props.data.userId === props.userId">{{
        props.data.timeCreated }} . {{ props.data.read ? 'Read' : 'Not seen' }}</span>
      <span class="text-xs text-left w-full mt-1" v-else>{{ props.data.timeCreated }}</span>
    </div>

    <!-- deleted messages -->
    <div class="flex flex-col h-fit items-start w-full" v-else>
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
import { ref } from 'vue';

const emit = defineEmits(['viewFullImage'])

const props = defineProps({
  data: Object,
  userId: String
})


if (props.data.media && !props.data.media.includes('audio/') && !props.data.media.includes('audioMessages')) {
  setTimeout(() => {
    if (mediaLoaded.value === false) {
      mediaLoaded.value = 'failed'
    }
  }, 10000);
}

const mediaLoaded = ref(false)

function getThumbnail(link) {
  return link.slice(0, link.length - 3) + 'jpg'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Mulish&display=swap');

* {
  font-family: 'Mulish', sans-serif !important;
}

.message {
  border-radius: 16px 16px 0px 16px;
}

.media {
  border-radius: 16px;
}

.bg-other {
  background: #EBEEFF;
}

.main-media {
  object-fit: cover;
  height: 100%;
  border-radius: 16px;
  max-height: 250px;
  min-width: 150px;
  width: 100%;
}

/* audio::-webkit-media-controls-panel {
  background-color: #060147;
} */
</style>