import type {RouteRecordRaw} from "vue-router";

export default [
  {
    path: "sign-in",
    name: "sign-in",
    meta: {
      title: 'Sign In',
    },
    component: () => import("@/user/views/SignInPage/SignInPage.vue"),
  },
  {
    path: "sign-up",
    name: "sign-up",
    meta: {
      title: 'Sign Up',
    },
    component: () => import("@/user/views/SignUpPage/SignUpPage.vue"),
  },
] as RouteRecordRaw[];