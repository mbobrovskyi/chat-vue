import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "quasar/src/css/index.sass";

import "@/assets/styles/main.scss";

import {createApp} from 'vue';
import {Quasar} from "quasar";
import {createPinia} from "pinia";
import {initPublicContext} from "@/infrastructure/context";
import {initAuthContext, initUserContext} from "@/user/infrastructure/context.ts";
import {initChatContext} from "./chat/infrastructure/context.ts";
import router from "@/infrastructure/router/index.ts";
import quasarConfig from "./infrastructure/quasar/config.ts";
import {BUILD_LOCAL_STORAGE_KEY} from "@/infrastructure/constants/localStorage.ts";

import App from '@/App.vue';

const localVersion = localStorage.getItem(BUILD_LOCAL_STORAGE_KEY);
if (!localVersion || APP_VERSION !== localVersion) {
  localStorage.clear();
  localStorage.setItem(BUILD_LOCAL_STORAGE_KEY, APP_VERSION);
}

const app = createApp(App);

app.use(Quasar, quasarConfig);
app.use(createPinia());
app.use(router);

initPublicContext();
initAuthContext();
initUserContext();
initChatContext();

app.mount('#app');
