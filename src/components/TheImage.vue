<script setup>
import { ref } from "vue";

defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  ratio: {
    type: String,
    required: true,
  },
  loading: {
    type: String,
    default: "lazy",
  },
  fetchpriority: {
    type: String,
    default: undefined,
  },
});

const loaded = ref(false);
</script>

<template>
  <div class="image-wrap" :style="{ aspectRatio: ratio }">
    <div class="image-skeleton" v-show="!loaded" aria-hidden="true"></div>
    <img
      :src="src"
      :alt="alt"
      :loading="loading"
      :fetchpriority="fetchpriority"
      decoding="async"
      class="image-el"
      :class="{ 'is-loaded': loaded }"
      @load="loaded = true"
    />
  </div>
</template>

<style scoped>
.image-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.image-skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #d9d9d9 25%, #ececec 37%, #d9d9d9 63%);
  background-size: 400% 100%;
  animation: image-shimmer 1.4s ease infinite;
}

.image-el {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.image-el.is-loaded {
  opacity: 1;
}

@keyframes image-shimmer {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .image-skeleton {
    animation: none;
  }
}
</style>
