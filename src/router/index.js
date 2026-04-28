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
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("@/views/AllProjects.vue"),
    },
    {
      path: "/project/:id",
      name: "id",
      component: () => import("@/views/ProjectView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/facts",
      name: "fun-facts",
      component: () => import("@/views/FunFacts.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("@/views/ContactView.vue"),
    },
    {
      path: "/wpl",
      name: "wpl",
      component: () => import("@/views/WplView.vue"),
    },
  ],
});

export default router;
