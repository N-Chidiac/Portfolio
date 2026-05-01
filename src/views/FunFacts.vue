<script setup>
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
</script>

<template>
  <header>
    <TheHeader>
      <template #title>FUN FACTS</template>
      <template #subtitle>DID YOU KNOW...</template>
    </TheHeader>
  </header>
  <main><h1>Fun facts</h1></main>
  <footer>
    <TheFooter />
  </footer>
</template>
