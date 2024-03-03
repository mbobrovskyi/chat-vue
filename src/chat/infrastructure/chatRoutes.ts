import type {RouteRecordRaw} from "vue-router";

export default [
  {
    path: "/chats",
    name: "chats",
    redirect: { name: "chat-not-selected" },
    meta: {
      title: 'Chats',
    },
    component: () => import("@/chat/views/ChatsLayout.vue"),
    children: [
      {
        path: "",
        name: "chat-not-selected",
        component: () => import("@/chat/views/NotSelectedChatPage/NotSelectedChatPage.vue"),
      },
      {
        path: ":id",
        name: "chat",
        component: () => import("@/chat/views/SelectedChatPage/SelectedChatPage.vue"),
      },
    ]
  },
] as RouteRecordRaw[];