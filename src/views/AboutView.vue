<script setup>
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
</script>

<template>
  <header>
    <TheHeader>
      <template #title>ABOUT ME</template>
      <template #subtitle>BALANCING CREATIVITY </template>
      <template #subtitle2>WITH PRECISION</template>
    </TheHeader>
  </header>
  <main>
    <h1>About</h1>
  </main>
  <footer>
    <TheFooter />
  </footer>
</template>
