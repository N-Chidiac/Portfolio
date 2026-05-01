<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: undefined,
  },
});
</script>

<template>
  <div class="skill">
    <img :src="image" :alt="alt" />
    <p v-if="text">{{ text }}</p>
  </div>
</template>
<style scoped>
.skill {
  display: flex;
  align-items: center;
  gap: 5px;

  font-family: var(--body-font);
  font-weight: 400;
  font-style: regular;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0%;

  img {
    height: 14px;
  }
}

@media (max-width: 768px) {
  .skill {
    font-size: 14px;
    gap: 6px;
  }

  .skill img {
    height: 12px;
  }
}
</style>
