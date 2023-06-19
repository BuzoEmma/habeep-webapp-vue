<template>
  <div class="main flex flex-col md:h-64  z-10 overflow-hidden bg-white relative pb-10">
    <div class="flex flex-row items-center justify-between w-full px-4 py-4 border-b border-b-gray-100">
      <div class="flex flex-row items-center gap-x-2" @click="($emit('enterAgents'))">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0A1045"
          class="w-6 h-6 cursor-pointer md:hidden block" @click="$router.go(-1)">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg><span class="text-lg font-medium text-webapp">Suggested house type</span>
      </div>
      <img src="../../../assets/icons/x.svg" class="cursor-pointer md:block hidden" @click="$emit('close')" alt="">
    </div>

    <div class="suggestions flex  flex-wrap w-full flex-row items-start my-5 px-2">
      <div class="suggs rounded-md m-2 flex flex-row gap-x-3 p-2 items-center h-10 cursor-pointer"
        @click="selectSuggs(item, index)" :class="{ 'bg-primary text-white': item.isSelected }"
        v-for="(item, index) in suggestions" :key="(item, index)">
        <span class="text-webapp text-sm" :class="{ 'text-white': item.isSelected }">{{ item.name }}</span>
        <img src="../../../assets/icons/add.svg" v-if="!item.isSelected" alt="">
        <span class="text-lg text-white" v-else>-</span>
      </div>
    </div>

    <div class="bottom-5 absolute px-4 w-full">
      <button class="bg-primary w-full rounded-lg grid place-items-center h-14 text-white"
        @click="save()">Continue</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

let emit = defineEmits(['saveSuggs'])

let suggestions = reactive([
  {
    name: 'Bungalow',
    alias: 'bungalow',
    isSelected: false,
  },
  {
    name: 'Duplex',
    alias: 'duplex',
    isSelected: false,
  },
  {
    name: 'Apartment',
    alias: 'apartment',
    isSelected: false,
  },
  {
    name: 'Room and Parlor',
    alias: 'room_parlor',
    isSelected: false,
  },
  {
    name: 'Office',
    alias: 'office',
    isSelected: false,
  },
  {
    name: 'Flat',
    alias: 'flat',
    isSelected: false,
  },
]
)

function save() {
  let selectedSuggs = suggestions.filter(sugg => {
    return sugg.isSelected === true
  })

  let finalData = ref([])

  selectedSuggs.forEach(sel => {
    finalData.value.push(sel.alias)
  })

  let data = reactive({
    types: finalData.value
  })

  emit('saveSuggs', data)
}

const selectedSuggs = ref([])

const selectSuggs = (item, index) => {
  if (suggestions.includes(item) && suggestions[index].isSelected === false) {
    suggestions[index].isSelected = true
  } else {
    suggestions[index].isSelected = false
  }
  // if (suggestions.includes(item) && suggestions[index].isSelected === true) {
  // }

}
</script>

<style scoped>
.main {
  width: 450px;
  height: 460px;
  border-radius: 15px;
}

@media screen and (max-width: 767px) {
  .main {
    height: 100vh;
    width: 100vw;
    border-radius: 0px;
  }
}

.suggs {
  box-shadow: 0px 0.33px 10px 0.33px #EBEBEB;
}
</style>