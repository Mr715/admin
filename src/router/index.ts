import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Edit from "../views/Edit.vue";

const routes = [
  { path: "/", name: "home", component: Home, meta: { withHeader: true } },
  { path: "/edit", name: "edit", component: Edit },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
