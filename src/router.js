import { createRouter, createWebHistory } from "vue-router";

import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import PropertiesView from "./views/PropertiesView.vue";
import NotFoundView from "./views/NotFoundView.vue";
import SinglePropertyView from "./views/SinglePropertyView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/properties/:slug",
      name: "single-property",
      component: SinglePropertyView,
    },
    {
      path: "/properties",
      name: "properties",
      component: PropertiesView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export { router };
