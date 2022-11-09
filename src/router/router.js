import MainPage from "@/pages/MainPage";
import PostsPage from "@/pages/PostsPage";
import AboutPage from "@/pages/AboutPage";
import PostIdPage from "@/pages/PostIdPage";
import PostsPageWithStore from "@/pages/PostsPageWithStore";
import PostsPageCompositionApi from "@/pages/PostsPageCompositionApi";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: MainPage },
  { path: "/posts", component: PostsPage },
  { path: "/about", component: AboutPage },
  { path: "/posts/:id", component: PostIdPage },
  { path: "/store", component: PostsPageWithStore },
  { path: "/api", component: PostsPageCompositionApi },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
