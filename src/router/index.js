import { createRouter, createWebHistory } from "vue-router";
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, truncate } from "@/seo";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/menu",
      name: "menu",
      component: () => import("@/views/MenuView.vue"),
      meta: { title: "Menu", noindex: true },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        title: "Nour Chidiac — Web Developer",
        description: DEFAULT_DESCRIPTION,
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
      beforeEnter: async (to) => {
        const { projects } = await import("@/assets/projects/projects");
        const project = projects.find((p) => p.id === Number(to.params.id));
        if (!project) {
          pendingProject = null;
          return { name: "not-found", params: { pathMatch: to.path.slice(1).split("/") } };
        }
        pendingProject = project;
        return true;
      },
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
      meta: {
        title: "Privacy Policy",
        description: "Privacybeleid van nourchidiac.netlify.app, conform de AVG/GDPR.",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/NotFoundView.vue"),
      meta: { title: "Pagina niet gevonden", noindex: true },
    },
  ],
});

// Door beforeEnter gezet zodat afterEach de projectmeta synchroon kan opbouwen.
let pendingProject = null;

router.beforeEach((to, from) => {
  if (from.name && from.name !== "menu") {
    router.previousRoute = from.fullPath;
  }
});

function setMeta(key, attr, content) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function staticMeta(to) {
  const metaTitle = to.meta.title;
  const title =
    metaTitle && to.name !== "home" ? `${metaTitle} — ${SITE_NAME}` : (metaTitle ?? SITE_NAME);
  return {
    title,
    description: to.meta.description ?? DEFAULT_DESCRIPTION,
    path: to.path,
    noindex: Boolean(to.meta.noindex),
  };
}

function applyMeta({ title, description, path, noindex }) {
  const url = `${SITE_URL}${path}`;
  document.title = title;
  setMeta("description", "name", description);
  setMeta("robots", "name", noindex ? "noindex, follow" : "index, follow");
  setCanonical(url);
  setMeta("og:title", "property", title);
  setMeta("og:description", "property", description);
  setMeta("og:url", "property", url);
  setMeta("og:image", "property", DEFAULT_OG_IMAGE);
  setMeta("twitter:title", "name", title);
  setMeta("twitter:description", "name", description);
  setMeta("twitter:image", "name", DEFAULT_OG_IMAGE);
}

router.afterEach((to) => {
  if (to.name === "id" && pendingProject && Number(to.params.id) === pendingProject.id) {
    const name = pendingProject.name.replace(/\n/g, " ");
    applyMeta({
      title: `${name} — ${SITE_NAME}`,
      description: truncate(pendingProject.description[0], 155),
      path: `/project/${pendingProject.id}`,
      noindex: false,
    });
    return;
  }
  applyMeta(staticMeta(to));
});

export default router;
