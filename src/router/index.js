import { createRouter, createWebHistory } from "vue-router";
import HomeIndex from "@/views/HomeIndex.vue";
import TodosIndex from "@/views/TodosIndex.vue";
import TodosView from "@/views/TodosView.vue";
import Profile from "@/views/ProfileIndex.vue";
import AboutIndex from "@/views/AboutIndex.vue";
import TodoCreate from "@/views/TodoCreate.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeIndex,
  },
  {
    path: "/todos",
    name: "Todos",
    component: TodosIndex,
  },
  {
    path: "/todos/:id",
    name: "detail",
    component: TodosView,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/about",
    name: "About",
    component: AboutIndex,
  },
  {
    path: "/create",
    name: "Create",
    component: TodoCreate,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
