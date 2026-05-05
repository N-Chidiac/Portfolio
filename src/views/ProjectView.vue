<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import { projects } from "@/assets/projects/projects";
import TheButton from "@/components/TheButton.vue";

const route = useRoute();
const project = computed(() => projects.find((p) => p.id === Number(route.params.id)));

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
          <img :src="getImage(project.image)" :alt="project.name" class="project-image" />
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
  object-fit: cover;
  display: block;
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
}
</style>
