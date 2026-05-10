<script setup>
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
import TheButton from "@/components/TheButton.vue";
import { facts } from "@/assets/facts/facts";

const images = import.meta.glob("@/assets/facts/*", { eager: true });

function getImage(path) {
  const key = path.replace("./facts/", "/src/assets/facts/");
  return images[key]?.default;
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
      <article v-for="fact in facts" :key="fact.id" class="fact-card">
        <img :src="getImage(fact.image)" :alt="fact.title" class="fact-image" />
        <div class="fact-content">
          <h3 class="fact-title">{{ fact.title }}</h3>
          <p class="fact-subtitle">{{ fact.subtitle }}</p>
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
  position: relative;
  width: 360px;
  height: 460px;
  border-radius: 30px 0 30px 0;
  overflow: hidden;
}

.fact-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.fact-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1;
}

.fact-content {
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  padding: 19px 30px 0 30px;
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
  line-height: 120%;
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
    border-radius: 20px 0 20px 0;
  }

  .fact-content {
    padding: 16px 18px 0 18px;
  }

  .fact-subtitle {
    font-size: 15px;
  }
}
</style>
