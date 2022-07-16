<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Topbar from "./components/Topbar.vue";
</script>

<template>
  <div class="page">
    <Navbar />
    <Topbar />
    <RouterView />
  </div>
</template>

<style scoped></style>
