<template>
  <div class="rounded-full grid place-items-center text-white text-lg font-medium" v-motion-fade :delay="200"
    :style="`background-color: ${colorGenerator({ max: 100})}; width: ${props.size}; height: ${props.size};`">
    {{ extraxtInitial(props.fname, props.lname) }}
  </div>
</template>

<script setup>
import colorGenerator from 'random-color-rgb'
const props = defineProps({
  size: {
    type: String,
    default: '100%'
  },
  fname: {
    type: String
  },
  lname: {
    type: String
  }
})

function extraxtInitial(fname, lname) {
  if (fname && lname) {
    const firstLetter = fname.substring(0, 1)
    const secondLetter = lname.substring(0, 1)

    return firstLetter + secondLetter
  } else if(fname) {
    const firstLetter = fname.substring(0, 1)

    return firstLetter
  } else if(lname) {
    const secondLetter = lname.substring(0, 1)

    return secondLetter
  } else return 'NIL'
}
</script>

<style></style>