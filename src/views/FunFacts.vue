<script setup>
import { ref } from "vue";
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
import TheButton from "@/components/TheButton.vue";
import TheImage from "@/components/TheImage.vue";
import { facts } from "@/assets/facts/facts";

const images = import.meta.glob("@/assets/facts/*", { eager: true });

function getImage(path) {
  const key = path.replace("./facts/", "/src/assets/facts/");
  return images[key]?.default;
}

// On touch devices there is no hover, so a tap toggles the flip instead.
const flippedId = ref(null);

function toggleFlip(id) {
  flippedId.value = flippedId.value === id ? null : id;
}
</script>

<template>
  <header>
    <TheHeader>
      <template #title>FUN FACTS</template>
      <template #subtitle>DID YOU KNOW...</template>
    </TheHeader>
  </header>
  <main>
    <div class="facts-grid">
      <article
        v-for="fact in facts"
        :key="fact.id"
        class="fact-card"
        :class="{ flipped: flippedId === fact.id }"
        tabindex="0"
        @click="toggleFlip(fact.id)"
        @keydown.enter="toggleFlip(fact.id)"
      >
        <div class="fact-flip">
          <div class="fact-face fact-front">
            <TheImage
              :src="getImage(fact.image)"
              :alt="fact.title"
              ratio="360/460"
              class="fact-image"
            />
            <h3 class="fact-title">{{ fact.title }}</h3>
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
          <div class="fact-face fact-back">
            <TheImage
              :src="getImage(fact.image)"
              :alt="fact.title"
              ratio="360/460"
              class="fact-image"
            />
            <div class="fact-back-content">
              <h3 class="fact-title">{{ fact.title }}</h3>
              <p class="fact-subtitle">{{ fact.subtitle }}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
    <div class="btns">
      <TheButton text="About me" color="#000000" path="/about" />
      <TheButton text="Contact me" color="#4e765d" path="/contact" />
    </div>
  </main>
  <footer>
    <TheFooter />
  </footer>
</template>

<style scoped>
main {
  padding: 110px;
}

.btns {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 110px;
}

.facts-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
  justify-content: center;
  margin: 50px;
}

.fact-card {
  width: 360px;
  height: 460px;
  perspective: 1400px;
  outline: none;
}

.fact-flip {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
}

.fact-card:focus-visible .fact-flip {
  transform: rotateY(180deg);
}

@media (hover: hover) and (pointer: fine) {
  .fact-card:hover .fact-flip {
    transform: rotateY(180deg);
  }
}

/* No hover on touch devices, so a tap toggles the flip instead. */
@media (hover: none) {
  .fact-card.flipped .fact-flip {
    transform: rotateY(180deg);
  }
}

.fact-face {
  position: absolute;
  inset: 0;
  border-radius: 30px 0 30px 0;
  overflow: hidden;
  backface-visibility: hidden;
}

.fact-image {
  width: 100%;
  height: 100%;
}

.fact-front::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.55);
}

.fact-front .fact-title {
  position: absolute;
  top: 19px;
  left: 30px;
  right: 30px;
  z-index: 2;
}

.flip-hint {
  position: absolute;
  bottom: 14px;
  right: 14px;
  z-index: 2;
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

.fact-back {
  transform: rotateY(180deg);
}

.fact-back::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.7);
}

.fact-back-content {
  position: absolute;
  inset: 0;
  z-index: 2;
  padding: 24px 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fact-title {
  margin: 0;
  color: var(--accent-color);
  font-family: var(--subtitle-font);
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
}

.fact-subtitle {
  margin: 0;
  color: var(--white);
  font-family: var(--body-font);
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
}

@media (max-width: 1024px) {
  main {
    padding: 72px 48px;
  }

  .btns {
    margin-top: 40px;
    margin-bottom: 72px;
  }

  .facts-grid {
    justify-content: center;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  main {
    padding: 40px 20px;
  }

  .btns {
    flex-wrap: wrap;
    margin-top: 32px;
    margin-bottom: 56px;
  }

  .facts-grid {
    gap: 24px;
  }

  .fact-card {
    width: 298px;
    height: 382px;
  }

  .fact-face {
    border-radius: 20px 0 20px 0;
  }

  .fact-front .fact-title {
    top: 16px;
    left: 18px;
    right: 18px;
  }

  .fact-back-content {
    padding: 20px 18px;
  }

  .fact-subtitle {
    font-size: 15px;
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
