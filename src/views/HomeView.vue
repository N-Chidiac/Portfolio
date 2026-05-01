<script setup>
import { computed } from "vue";
import TheButton from "@/components/TheButton.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
import TheProjectCard from "@/components/TheProjectCard.vue";
import TheSkill from "@/components/TheSkill.vue";
import { projects } from "@/assets/projects/projects";

import html from "@/assets/Homepage/HTML5-s.svg";
import css from "@/assets/Homepage/CSS3.png";
import javascript from "@/assets/Homepage/Javascript.png";
import vue from "@/assets/Homepage/vue.png";
import nodejs from "@/assets/Homepage/Nodejs.png";
import vscode from "@/assets/Homepage/Visual Studio Code.png";
import npm from "@/assets/Homepage/npm.png";
import figma from "@/assets/Homepage/Figma.png";
import illustrator from "@/assets/Homepage/illustrator.png";
import photoshop from "@/assets/Homepage/photoshop.png";

const projectImages = import.meta.glob("@/assets/projects/*", { eager: true });

function getImage(path) {
  const key = path.replace("./projects/", "/src/assets/projects/");
  return projectImages[key]?.default;
}

function parseProjectDate(date) {
  const [day, month, year] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

const recentProjects = computed(() =>
  [...projects]
    .sort((a, b) => {
      const dateDiff = parseProjectDate(b.date) - parseProjectDate(a.date);
      if (dateDiff !== 0) return dateDiff;
      return b.id - a.id;
    })
    .slice(0, 3),
);
</script>

<template>
  <header>
    <TheHeader>
      <template #title>NOUR CHIDIAC</template>
      <template #subtitle>WEB-DEVELOPER</template>
    </TheHeader>
  </header>
  <main>
    <div class="about-me">
      <div class="profile-image">
        <img src="../assets/Homepage/about-me-homepage.png" alt="profile image" />
      </div>
      <div class="right-content">
        <div class="content-box">
          <div class="title">
            <h2>About me</h2>
          </div>
          <p>
            Ik heb een creatieve achtergrond in schilder- en decoratietechnieken en deed daarna
            ervaring op in een administratieve functie, waar ik mijn oog voor detail, structuur en
            organisatie verder ontwikkelde. Vanuit mijn groeiende interesse in technologie heb ik
            mij omgeschoold tot junior developer. Vandaag combineer ik creativiteit met logisch
            denken om ideeën om te zetten in gebruiksvriendelijke en visueel sterke digitale
            oplossingen, met een sterke focus op kwaliteit, precisie en continue groei.
          </p>
          <div class="buttons">
            <TheButton text="Fun Facts" color="#000000" path="/facts" />
            <TheButton text="About" color="#4e765d" path="/about" />
          </div>
        </div>
        <div class="skill-box">
          <div class="title">
            <h2>My skills</h2>
          </div>
          <div class="row">
            <TheSkill :image="html" alt="html logo" text="HTML" />
            <TheSkill :image="css" alt="css logo" text="CSS" />
            <TheSkill :image="javascript" alt="javascript logo" text="JavaScript" />
            <TheSkill :image="vue" alt="vue logo" text="VueJs" />
            <TheSkill :image="nodejs" alt="nodeJs logo" text="NodeJs" />
          </div>
          <div class="row">
            <TheSkill :image="vscode" alt="VsCode logo" text="VSCode" />
            <TheSkill :image="npm" alt="NPM logo" text="NPM" />
            <TheSkill :image="figma" alt="Figma logo" text="Figma" />
            <TheSkill :image="illustrator" alt="Illustrator logo" text="Illustrator" />
            <TheSkill :image="photoshop" alt="PhotoShop logo" text="PhotoShop" />
          </div>
        </div>
      </div>
    </div>
    <section class="recent-projects">
      <div class="recent-projects-content">
        <div class="title">
          <h2>Recent Projects</h2>
        </div>
        <div class="projects-grid">
          <TheProjectCard
            v-for="project in recentProjects"
            :key="project.id"
            :id="project.id"
            :title="project.name"
            :subtitle="project.type"
            :image="getImage(project.image)"
          />
        </div>
      </div>
    </section>
    <div class="btns">
      <TheButton text="All projects" color="#000000" path="/projects" />
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
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.about-me {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  justify-content: center;
}

.profile-image img {
  width: 100%;
  max-width: 298px;
  object-fit: cover;
}

.right-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1;
  max-width: 580px;
}

.content-box h2,
.skill-box h2 {
  color: var(--accent-color);
  margin-bottom: 12px;
}

.skill-box {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.buttons {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.btns {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  margin-bottom: 110px;
  justify-content: center;
}

.row {
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
}
p {
  font-family: var(--body-font);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0%;
}

.title {
  font-family: var(--subtitle-font);
  font-weight: 700;
  font-style: bold;
  font-size: 32px;
  line-height: 100%;
  letter-spacing: 0%;
  color: var(--accent-color);
}

.recent-projects {
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-top: 120px;
}

.recent-projects-content {
  width: fit-content;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.projects-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
  justify-content: center;
}

@media (max-width: 1024px) {
  main {
    padding: 72px 48px;
    gap: 64px;
  }

  .about-me {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  .right-content {
    max-width: 100%;
    width: 100%;
  }

  .row {
    flex-wrap: wrap;
    gap: 14px;
    margin-bottom: 0;
  }

  .recent-projects {
    margin-top: 40px;
  }

  .recent-projects-content {
    width: 100%;
    max-width: 780px;
    gap: 36px;
  }

  .projects-grid {
    gap: 32px;
  }
}

@media (max-width: 768px) {
  main {
    padding: 40px 20px;
    gap: 48px;
  }

  .title {
    font-size: 28px;
  }

  .buttons,
  .btns {
    flex-wrap: wrap;
    justify-content: center;
  }

  .btns {
    margin-top: 0;
    margin-bottom: 56px;
  }

  .profile-image img {
    max-width: 240px;
  }

  .recent-projects {
    margin-top: 20px;
    gap: 32px;
  }

  .recent-projects-content {
    max-width: 100%;
    gap: 24px;
  }

  .projects-grid {
    gap: 24px;
  }
}
</style>
