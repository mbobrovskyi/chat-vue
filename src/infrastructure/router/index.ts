import {
  createRouter,
  createWebHistory, RouteRecordRaw,
} from "vue-router";
import {useAuthStore} from "@/common/domain/authStore.ts";
import chatRoutes from "@/chat/infrastructure/chatRoutes.ts";
import authRoutes from "@/user/infrastructure/authRoutes.ts";

const BASE_URL = import.meta.env.BASE_URL

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/auth",
    name: "auth",
    redirect: { name: "sign-in" },
    meta: {
      isPublic: true,
    },
    component: () => import("@/layouts/AuthLayout.vue"),
    children: authRoutes,
  },
  {
    path: "/",
    name: "main",
    redirect: { name: "chats" },
    component: () => import("@/layouts/MainLayout.vue"),
    children: chatRoutes,
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "main" },
  },
];

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes: routes,
});

router.afterEach(async (to, from) => {
  const titleFromMeta = to.meta.title
  if (titleFromMeta) {
    document.title = titleFromMeta as string;
  }
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.isPublic) {
    next();
    return;
  }

  const authStore = useAuthStore();
  if (!authStore.user) {
    await authStore.getCurrentUser();
  }

  next();
});

export default router;