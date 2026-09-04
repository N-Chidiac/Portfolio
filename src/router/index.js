import { createRouter, createWebHistory } from "vue-router";
import MenuView from "@/views/MenuView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "menu",
      component: MenuView,
      meta: { title: "Menu" },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        title: "Nour Chidiac — Web Developer",
        description: "Portfolio van Nour Chidiac, junior web developer. Projecten, vaardigheden en contactinfo.",
      },
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("@/views/AllProjects.vue"),
      meta: {
        title: "Projects",
        description: "Overzicht van alle projecten van Nour Chidiac, gesorteerd op datum.",
      },
    },
    {
      path: "/project/:id",
      name: "id",
      component: () => import("@/views/ProjectView.vue"),
      meta: { title: "Project" },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
      meta: {
        title: "About",
        description: "Achtergrond, hobby's en interesses van Nour Chidiac.",
      },
    },
    {
      path: "/facts",
      name: "fun-facts",
      component: () => import("@/views/FunFacts.vue"),
      meta: {
        title: "Fun Facts",
        description: "Persoonlijke weetjes over Nour Chidiac.",
      },
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("@/views/ContactView.vue"),
      meta: {
        title: "Contact",
        description: "Neem contact op met Nour Chidiac via e-mail, telefoon of LinkedIn.",
      },
    },

    {
      path: "/privacy",
      name: "privacy-policy",
      component: () => import("@/views/PrivacyPolicy.vue"),
      meta: { title: "Privacy Policy" },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/NotFoundView.vue"),
      meta: { title: "Pagina niet gevonden" },
    },
  ],
});

router.beforeEach((to, from) => {
  if (from.name && from.name !== "menu") {
    router.previousRoute = from.fullPath;
  }
});

router.afterEach((to) => {
  const baseTitle = "Nour Chidiac";
  document.title = to.meta.title && to.name !== "home" ? `${to.meta.title} — ${baseTitle}` : (to.meta.title ?? baseTitle);

  if (to.meta.description) {
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute("content", to.meta.description);
  }
});

export default router;
