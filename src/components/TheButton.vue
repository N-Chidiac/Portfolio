<script setup>
defineProps({
  text: {
    type: String,
    default: "Click me",
  },
  color: {
    type: String,
    default: "#4e765d",
  },
  path: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <RouterLink :to="path">
    <button :style="{ backgroundColor: color }">{{ text }}</button>
  </RouterLink>
</template>
<style scoped>
button {
  width: 150px;
  height: 50px;

  color: var(--white);
  border: none;
  border-radius: 0;

  cursor: pointer;
}

@media (max-width: 1024px) {
  button {
    width: 140px;
    height: 46px;
    font-size: 14px;
  }
}

@media (max-width: 640px) {
  button {
    width: 300px;
    height: 50px;
  }
}
</style>
