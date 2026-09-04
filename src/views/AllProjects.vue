<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
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

const filters = [
  { key: "all", label: "Alles" },
  { key: "Student job project", label: "Student job project" },
  { key: "School project", label: "School project" },
  { key: "Personal project", label: "Personal project" },
];

const activeFilter = ref("all");

const filteredProjects = computed(() =>
  activeFilter.value === "all"
    ? sortedProjects.value
    : sortedProjects.value.filter((project) => project.type === activeFilter.value),
);

const showScrollTop = ref(false);

function handleScroll() {
  showScrollTop.value = window.scrollY > 400;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => window.addEventListener("scroll", handleScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <header>
    <TheHeader>
      <template #title>MY PROJECTS</template>
      <template #subtitle>MADE WITH LOVE</template>
    </TheHeader>
  </header>
  <main>
    <div class="filters" role="group" aria-label="Filter projecten op type">
      <button
        v-for="filter in filters"
        :key="filter.key"
        type="button"
        class="filter-chip"
        :class="{ active: activeFilter === filter.key }"
        :aria-pressed="activeFilter === filter.key"
        @click="activeFilter = filter.key"
      >
        {{ filter.label }}
      </button>
    </div>
    <div class="projects-grid">
      <TheProjectCard
        v-for="project in filteredProjects"
        :key="project.id"
        :id="project.id"
        :title="project.name"
        :subtitle="project.type"
        :description="project.description[0]"
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
  <Transition name="fade">
    <button
      v-if="showScrollTop"
      type="button"
      class="scroll-top"
      aria-label="Scroll naar boven"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    </button>
  </Transition>
</template>
<style scoped>
main {
  padding: 110px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 36px;
  margin-bottom: 56px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding-bottom: 16px;
}

.filter-chip {
  font-family: var(--subtitle-font);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--secondary-color);
  background: none;
  border: none;
  padding: 0 0 6px 0;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}

.filter-chip:hover {
  color: var(--accent-color);
}

.filter-chip.active {
  color: var(--accent-color);
  border-bottom-color: var(--accent-color);
}

.projects-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
  justify-content: center;
}

.btn {
  display: flex;
  justify-content: center;
  margin-top: 80px;
}

.scroll-top {
  position: fixed;
  right: 32px;
  bottom: 32px;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: var(--accent-color);
  color: var(--white);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 20;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.scroll-top svg {
  width: 22px;
  height: 22px;
}

.scroll-top:hover {
  transform: translateY(-3px);
  box-shadow: var(--hover-shadow);
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
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

  .filters {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 32px;
    padding-bottom: 12px;
  }

  .filter-chip {
    font-size: 12px;
  }

  .scroll-top {
    right: 20px;
    bottom: 20px;
    width: 46px;
    height: 46px;
  }

  .scroll-top svg {
    width: 20px;
    height: 20px;
  }

  .projects-grid {
    gap: 24px;
  }

  .btn {
    margin-top: 40px;
  }
}
</style>
