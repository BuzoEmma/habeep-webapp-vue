<template></template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter()

store.dispatch("unsetAuth");

router.push('/login?reloadApp=true')
</script>

<style></style>