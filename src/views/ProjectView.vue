<script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import { projects } from "@/assets/projects/projects";
import TheButton from "@/components/TheButton.vue";
import TheImage from "@/components/TheImage.vue";

const route = useRoute();
const project = computed(() => projects.find((p) => p.id === Number(route.params.id)));

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

const currentIndex = computed(() =>
  sortedProjects.value.findIndex((p) => p.id === project.value?.id),
);

const previousProject = computed(() =>
  currentIndex.value > 0 ? sortedProjects.value[currentIndex.value - 1] : null,
);

const nextProject = computed(() =>
  currentIndex.value !== -1 && currentIndex.value < sortedProjects.value.length - 1
    ? sortedProjects.value[currentIndex.value + 1]
    : null,
);

watch(
  project,
  (currentProject) => {
    document.title = currentProject
      ? `${currentProject.name.replace(/\n/g, " ")} — Nour Chidiac`
      : "Project niet gevonden — Nour Chidiac";
  },
  { immediate: true },
);

const projectImages = import.meta.glob("@/assets/projects/*", { eager: true });
function getImage(path) {
  const key = path.replace("./projects/", "/src/assets/projects/");
  return projectImages[key]?.default;
}

const skillImages = import.meta.glob("@/assets/Homepage/*", { eager: true });
function getSkillImage(name) {
  const key = `/src/assets/Homepage/${name}`;
  return skillImages[key]?.default;
}

const skillMap = {
  html: { label: "HTML", file: "HTML5-s.svg" },
  css: { label: "CSS", file: "CSS3.png" },
  javascript: { label: "JavaScript", file: "Javascript.png" },
  vue: { label: "VueJs", file: "vue.png" },
  nodejs: { label: "NodeJs", file: "Nodejs.png" },
  vscode: { label: "VSCode", file: "Visual Studio Code.png" },
  npm: { label: "NPM", file: "npm.png" },
  figma: { label: "Figma", file: "Figma.png" },
  illustrator: { label: "Illustrator", file: "illustrator.png" },
  photoshop: { label: "PhotoShop", file: "photoshop.png" },
  vite: { label: "Vite", file: "Vite.svg" },
  pinia: { label: "Pinia", file: "Pinia.svg" },
  express: { label: "Express", file: "Express.svg" },
  database: { label: "SQLite / Turso", file: "SQLite.svg" },
  docker: { label: "Docker", file: "Docker.svg" },
  jwt: { label: "JWT", file: "JWT.svg" },
};

const usedSkills = computed(() =>
  project.value
    ? Object.entries(project.value.tech)
        .filter(([, used]) => used)
        .map(([key]) => skillMap[key])
    : [],
);
</script>

<template>
  <header>
    <TheHeader>
      <template #title>{{ project?.name?.toUpperCase() }}</template>
      <template #subtitle>MADE WITH LOVE</template>
    </TheHeader>
  </header>

  <main v-if="project">
    <div class="project-detail">
      <div class="left">
        <div class="image-card">
          <div class="tech-list">
            <div v-for="skill in usedSkills" :key="skill.label" class="tech-item">
              <img :src="getSkillImage(skill.file)" :alt="skill.label" />
              <span>{{ skill.label }}</span>
            </div>
          </div>
          <TheImage
            :src="getImage(project.image)"
            :alt="project.name"
            ratio="360/460"
            loading="eager"
            fetchpriority="high"
            class="project-image"
          />
        </div>
      </div>

      <div class="right">
        <h2 class="project-title">{{ project.name }}</h2>
        <p v-for="(paragraph, i) in project.description" :key="i" class="description">
          {{ paragraph }}
        </p>

        <ul class="links">
          <li v-if="project.github">
            <a :href="project.github" target="_blank">
              <span class="dot one"></span>
              <img src="../assets/projects/github.png" alt="github" />
              GitHub Repository
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/nour-chidiac-41632a387/" target="_blank">
              <span class="dot two"></span>
              <img src="../assets/projects/linkedin.png" alt="linkedin" />
              LinkedIn
            </a>
          </li>
          <li>
            <RouterLink to="/contact">
              <span class="dot three"></span>
              <img src="../assets/projects/contact.png" alt="contact" />
              Contact me
            </RouterLink>
          </li>
        </ul>

        <div class="project-pagination">
          <RouterLink
            v-if="previousProject"
            :to="`/project/${previousProject.id}`"
            class="page-link prev"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Vorige</span>
          </RouterLink>
          <RouterLink v-if="nextProject" :to="`/project/${nextProject.id}`" class="page-link next">
            <span>Volgende</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </RouterLink>
        </div>

        <TheButton text="All projects" color="#4e765d" path="/projects" class="back-btn" />
      </div>
    </div>
  </main>

  <footer>
    <TheFooter />
  </footer>
</template>

<style scoped>
main {
  padding: 60px 120px;
  display: flex;
  justify-content: center;
}

.project-detail {
  display: flex;
  gap: 80px;
  align-items: flex-start;
}

.image-card {
  position: relative;
  width: 360px;
  height: 460px;
  border-radius: 20px 0 20px 0;
  overflow: hidden;
  flex-shrink: 0;
}

.project-image {
  width: 100%;
  height: 100%;
}

.tech-list {
  position: absolute;
  top: 40px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.tech-item img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.tech-item span {
  color: var(--white);
  font-size: 16px;
  font-family: var(--body-font);
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 0%;
}

.project-title {
  color: var(--accent-color);
  font-family: var(--subtitle-font);
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: 700;
  font-style: bold;
  line-height: 100%;
  letter-spacing: 0%;
}

.description {
  font-family: var(--body-font);
  font-size: 16px;
  letter-spacing: 0%;
  margin-bottom: 12px;
  color: var(--secondary-color);
  font-weight: 400;
  line-height: 100%;
  max-width: 720px;
}

.links {
  list-style: none;
  padding: 0;
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.links li a,
.links li a:visited {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text-color);
  font-family: var(--body-font);
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 20px 0 20px 0;
  padding: 10px 16px;
  width: fit-content;
  min-width: 220px;
}

li a:hover {
  box-shadow: var(--hover-shadow);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ccc;
  flex-shrink: 0;
}

.dot.one {
  background-color: var(--accent-color);
}

.dot.two {
  background-color: #5897ae;
}

.dot.three {
  background-color: #c7bd74;
}

.links li img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.project-pagination {
  display: flex;
  margin-bottom: 24px;
}

.page-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--secondary-color);
  font-family: var(--subtitle-font);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: color 0.2s ease;
}

.page-link:hover {
  color: var(--accent-color);
}

.page-link svg {
  width: 18px;
  height: 18px;
}

.page-link.next {
  margin-left: auto;
}

@media (max-width: 1024px) {
  main {
    padding: 48px 40px;
  }

  .project-detail {
    flex-direction: column;
    gap: 40px;
    align-items: center;
  }

  .right {
    width: 100%;
    max-width: 720px;
  }
}

@media (max-width: 768px) {
  main {
    padding: 32px 20px;
  }

  .image-card {
    width: 298px;
    height: 382px;
    border-radius: 20px 0 20px 0;
  }

  .tech-list {
    top: 20px;
    left: 14px;
    gap: 12px;
  }

  .tech-item {
    gap: 10px;
  }

  .tech-item span {
    font-size: 14px;
  }

  .project-title {
    font-size: 28px;
    margin-bottom: 16px;
  }

  .description {
    font-size: 15px;
  }

  .links li a,
  .links li a:visited {
    width: 100%;
    min-width: 0;
  }

  .back-btn {
    display: block;
    width: 100%;
  }

  .back-btn :deep(button) {
    width: 100%;
  }
}
</style>
