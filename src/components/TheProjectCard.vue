<script setup>
defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <RouterLink :to="`/project/${id}`" class="card-link">
    <div class="project-card">
      <img :src="image" :alt="title" class="card-image" />
      <div class="card-content">
        <h3 class="card-title">{{ title }}</h3>
        <p class="card-subtitle">{{ subtitle }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.card-link {
  text-decoration: none;
}

.project-card {
  position: relative;
  width: 360px;
  height: 460px;
  border-radius: 30px 0 30px 0;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.project-card:hover {
  transform: scale(1.02);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-content {
  position: absolute;
  top: 0;
  left: 0;
  padding: 19px 66px 0 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-title {
  color: var(--accent-color);
  margin: 0;
  font-family: var(--subtitle-font);
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
}

.card-subtitle {
  color: var(--white);
  margin: 0;
  font-family: var(--body-font);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
}

@media (max-width: 768px) {
  .project-card {
    width: 298px;
    height: 382px;
    border-radius: 20px 0 20px 0;
  }
}
</style>
