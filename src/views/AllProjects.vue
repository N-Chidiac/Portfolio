<script setup>
import { computed } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import TheProjectCard from "@/components/TheProjectCard.vue";
import { projects } from "@/assets/projects/projects";
import TheButton from "@/components/TheButton.vue";
import TheFooter from "@/components/TheFooter.vue";

const images = import.meta.glob("@/assets/projects/*", { eager: true });

function getImage(path) {
  const key = path.replace("./projects/", "/src/assets/projects/");
  return images[key]?.default;
}

function parseProjectDate(date) {
  const [day, month, year] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

const sortedProjects = computed(() =>
  [...projects].sort((a, b) => {
    const dateDiff = parseProjectDate(b.date) - parseProjectDate(a.date);
    if (dateDiff !== 0) return dateDiff;
    return b.id - a.id;
  }),
);
</script>

<template>
  <header>
    <TheHeader>
      <template #title>MY PROJECTS</template>
      <template #subtitle>MADE WITH LOVE</template>
    </TheHeader>
  </header>
  <main>
    <div class="projects-grid">
      <TheProjectCard
        v-for="project in sortedProjects"
        :key="project.id"
        :id="project.id"
        :title="project.name"
        :subtitle="project.type"
        :image="getImage(project.image)"
        class="project-card"
      />
    </div>
    <div class="btn">
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

.projects-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
}
.project-card:hover {
  box-shadow: 4px 4px 8px #4e765d;
}

.btn {
  display: flex;
  justify-content: center;
  margin-top: 80px;
}

@media (max-width: 1024px) {
  main {
    padding: 72px 48px;
  }

  .projects-grid {
    justify-content: center;
    gap: 32px;
  }

  .btn {
    margin-top: 56px;
  }
}

@media (max-width: 768px) {
  main {
    padding: 40px 20px;
  }

  .projects-grid {
    gap: 24px;
  }

  .btn {
    margin-top: 40px;
  }
}
</style>
