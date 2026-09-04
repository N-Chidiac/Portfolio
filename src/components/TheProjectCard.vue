<script setup>
import TheImage from "@/components/TheImage.vue";

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
  description: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <RouterLink :to="`/project/${id}`" class="card-link" tabindex="0">
    <div class="project-card">
      <div class="card-flip">
        <div class="card-face card-front">
          <TheImage :src="image" :alt="title" ratio="360/460" class="card-image" />
          <div class="card-content">
            <h3 class="card-title">{{ title }}</h3>
            <p class="card-subtitle">{{ subtitle }}</p>
          </div>
          <div class="flip-hint" aria-hidden="true">
            <svg
              class="hint-icon hint-hover-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M17 2.1l4 4-4 4" />
              <path d="M3 12.6v-2a4 4 0 0 1 4-4h14" />
              <path d="M7 21.9l-4-4 4-4" />
              <path d="M21 11.4v2a4 4 0 0 1-4 4H3" />
            </svg>
            <svg class="hint-icon hint-touch-icon" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path
                d="M9.5 2.8c-.9 0-1.6.7-1.6 1.6v6.1c-.5-.4-1.2-.6-1.9-.4-1 .3-1.6 1.3-1.4 2.3l1.3 5.1c.6 2.4 2.8 4.1 5.3 4.1h1.9c3 0 5.5-2.5 5.5-5.5v-4.6c0-.9-.7-1.6-1.6-1.6-.3 0-.6.1-.8.2-.2-.7-.9-1.2-1.6-1.2-.3 0-.6.1-.9.2-.2-.6-.8-1.1-1.5-1.1-.3 0-.6.1-.8.2V4.4c0-.9-.7-1.6-1.6-1.6z"
              />
            </svg>
          </div>
        </div>
        <div class="card-face card-back">
          <TheImage :src="image" :alt="title" ratio="360/460" class="card-image" />
          <div class="card-back-content">
            <h3 class="card-title">{{ title }}</h3>
            <p class="card-description">{{ description }}</p>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.card-link {
  text-decoration: none;
  outline: none;
}

.project-card {
  width: 360px;
  height: 460px;
  flex-shrink: 0;
  cursor: pointer;
  perspective: 1400px;
}

.card-flip {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
}

.card-link:focus-visible .card-flip {
  transform: rotateY(180deg);
}

@media (hover: hover) and (pointer: fine) {
  .card-link:hover .card-flip {
    transform: rotateY(180deg);
  }
}

.card-face {
  position: absolute;
  inset: 0;
  border-radius: 30px 0 30px 0;
  overflow: hidden;
  backface-visibility: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
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
  white-space: pre-line;
}

.card-subtitle {
  color: var(--white);
  margin: 0;
  font-family: var(--body-font);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
}

.flip-hint {
  position: absolute;
  bottom: 14px;
  right: 14px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.35);
  color: var(--white);
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.hint-icon {
  width: 13px;
  height: 13px;
}

.hint-touch-icon {
  display: none;
}

/* No hover on touch devices: swap the "hover to flip" hint for a tap hint. */
@media (hover: none) {
  .hint-hover-icon {
    display: none;
  }

  .hint-touch-icon {
    display: block;
  }
}

.card-back {
  transform: rotateY(180deg);
}

.card-back::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.7);
}

.card-back-content {
  position: absolute;
  inset: 0;
  z-index: 2;
  padding: 24px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-description {
  margin: 0;
  color: var(--white);
  font-family: var(--body-font);
  font-weight: 400;
  font-size: 15px;
  line-height: 140%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 9;
  overflow: hidden;
}

@media (max-width: 768px) {
  .project-card {
    width: 298px;
    height: 382px;
  }

  .card-face {
    border-radius: 20px 0 20px 0;
  }

  .card-back-content {
    padding: 20px 18px;
  }

  .card-description {
    font-size: 14px;
    -webkit-line-clamp: 7;
  }

  .flip-hint {
    bottom: 10px;
    right: 10px;
    width: 22px;
    height: 22px;
  }

  .hint-icon {
    width: 11px;
    height: 11px;
  }
}
</style>
